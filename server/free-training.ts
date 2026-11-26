import type { Request, Response } from "express";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /https?:\/\/|www\./i;
const MAX_FIELD_LENGTH = 5000;
const IP_LIMIT = 5;
const IP_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_LIMIT = 2;
const EMAIL_WINDOW_MS = 10 * 60 * 1000;
const MIN_ELAPSED_MS = 2000;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const N8N_TIMEOUT_MS = 15000;
const EXPECTED_SOURCE = "free_video_training";
const EXPECTED_GROUP = "Free Video Training";

const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number[]>();
let loggedMissingTurnstileSecret = false;
let lastPrunedAt = 0;

export function resetFreeTrainingRateLimits() {
  ipHits.clear();
  emailHits.clear();
  loggedMissingTurnstileSecret = false;
  lastPrunedAt = 0;
}

function clientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (typeof raw === "string" && raw.trim()) {
    return raw.split(",")[0]!.trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function prune(times: number[], windowMs: number, now: number): number[] {
  return times.filter((time) => now - time < windowMs);
}

function pruneAll(now: number) {
  if (now - lastPrunedAt < 60_000) return;
  lastPrunedAt = now;
  ipHits.forEach((times, key) => {
    const next = prune(times, IP_WINDOW_MS, now);
    if (next.length) ipHits.set(key, next);
    else ipHits.delete(key);
  });
  emailHits.forEach((times, key) => {
    const next = prune(times, EMAIL_WINDOW_MS, now);
    if (next.length) emailHits.set(key, next);
    else emailHits.delete(key);
  });
}

function isLimited(map: Map<string, number[]>, key: string, max: number, windowMs: number, now: number): boolean {
  const next = prune(map.get(key) ?? [], windowMs, now);
  if (next.length >= max) {
    map.set(key, next);
    return true;
  }
  next.push(now);
  map.set(key, next);
  return false;
}

function looksLikeGibberish(value: string): boolean {
  if (/(.)\1{10,}/.test(value)) return true;
  if (value.length > 0) {
    let controls = 0;
    for (const ch of value) {
      const code = ch.charCodeAt(0);
      if (code < 32 || (code >= 127 && code < 160)) controls += 1;
    }
    if (controls / value.length > 0.4) return true;
  }
  const tokens = value.trim().split(/\s+/);
  if (
    tokens.length === 1 &&
    tokens[0]!.length > 18 &&
    /^[a-z]+$/i.test(tokens[0]!) &&
    !/[aeiou]/i.test(tokens[0]!)
  ) {
    return true;
  }
  return false;
}

type FreeTrainingPayload = {
  firstName: string;
  email: string;
  source: string;
  group: string;
  marketingConsent: true;
  turnstileToken: string;
  companyWebsite: string;
  submittedAt: string;
  elapsedMs: number | undefined;
};

function parseFreeTraining(body: unknown): { ok: true; value: FreeTrainingPayload } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Invalid request." };
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (firstName.length < 1 || firstName.length > 120 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter your first name and a valid email." };
  }
  if (email.length > MAX_FIELD_LENGTH) {
    return { ok: false, error: "Please enter your first name and a valid email." };
  }

  if (body.marketingConsent !== true) {
    return { ok: false, error: "Please agree to receive the free training." };
  }

  const source = typeof body.source === "string" ? body.source : EXPECTED_SOURCE;
  const group = typeof body.group === "string" ? body.group : EXPECTED_GROUP;
  if (source !== EXPECTED_SOURCE || group !== EXPECTED_GROUP) {
    return { ok: false, error: "Invalid request." };
  }

  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const companyWebsite = typeof body.companyWebsite === "string" ? body.companyWebsite : "";
  const elapsedMs = typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs) ? body.elapsedMs : undefined;
  const submittedAt =
    typeof body.submittedAt === "string" && body.submittedAt.trim() && body.submittedAt.length <= 40
      ? body.submittedAt
      : new Date().toISOString();

  return {
    ok: true,
    value: {
      firstName,
      email,
      source: EXPECTED_SOURCE,
      group: EXPECTED_GROUP,
      marketingConsent: true,
      turnstileToken,
      companyWebsite,
      submittedAt,
      elapsedMs,
    },
  };
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  const payload = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload,
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return false;
  const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return data?.success === true;
}

async function forwardToN8n(payload: FreeTrainingPayload): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const webhookUrl = process.env.AIFA_FREE_TRAINING_WEBHOOK_URL?.trim() || "";
  if (!webhookUrl) {
    console.error("[free-training] AIFA_FREE_TRAINING_WEBHOOK_URL is not set.");
    return { ok: false, status: 503, error: "We could not send your request right now. Please try again shortly." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: payload.firstName,
        email: payload.email,
        source: payload.source,
        group: payload.group,
        marketingConsent: payload.marketingConsent,
        turnstileToken: payload.turnstileToken,
        companyWebsite: payload.companyWebsite,
        submittedAt: payload.submittedAt,
        elapsedMs: payload.elapsedMs,
      }),
      signal: AbortSignal.timeout(N8N_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`[free-training] Webhook forwarding failed with status ${response.status}`);
      return { ok: false, status: 502, error: "We could not send your request right now. Please try again shortly." };
    }
    return { ok: true };
  } catch (error) {
    console.error("[free-training] Webhook forwarding failed:", error);
    return { ok: false, status: 502, error: "We could not send your request right now. Please try again shortly." };
  }
}

export async function handleFreeTraining(req: Request, res: Response) {
  const parsed = parseFreeTraining(req.body);
  if (!parsed.ok) {
    res.status(400).json({ success: false, error: parsed.error });
    return;
  }

  const payload = parsed.value;

  if (payload.companyWebsite.trim().length > 0) {
    res.status(200).json({ success: true });
    return;
  }

  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < MIN_ELAPSED_MS) {
    res.status(400).json({ success: false, error: "Please wait a moment and submit again." });
    return;
  }

  const ip = clientIp(req);
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() || "";
  if (!secret) {
    if (!loggedMissingTurnstileSecret) {
      loggedMissingTurnstileSecret = true;
      console.warn("[free-training] TURNSTILE_SECRET_KEY is not set. Submissions will be accepted with honeypot and rate-limit checks only.");
    }
  } else {
    if (!payload.turnstileToken) {
      res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
      return;
    }
    try {
      const verified = await verifyTurnstile(payload.turnstileToken, ip, secret);
      if (!verified) {
        res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
        return;
      }
    } catch (error) {
      console.error("[free-training] Turnstile verification failed:", error);
      res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
      return;
    }
  }

  const now = Date.now();
  pruneAll(now);
  if (
    isLimited(ipHits, ip, IP_LIMIT, IP_WINDOW_MS, now) ||
    isLimited(emailHits, payload.email, EMAIL_LIMIT, EMAIL_WINDOW_MS, now)
  ) {
    res.status(429).json({ success: false, error: "Too many requests. Please try again later." });
    return;
  }

  if (URL_PATTERN.test(payload.firstName) || looksLikeGibberish(payload.firstName)) {
    res.status(400).json({ success: false, error: "Invalid request." });
    return;
  }

  const forwarded = await forwardToN8n(payload);
  if (!forwarded.ok) {
    res.status(forwarded.status).json({ success: false, error: forwarded.error });
    return;
  }

  res.status(200).json({ success: true });
}
