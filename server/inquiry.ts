import type { Request, Response } from "express";

const ALLOWED_FORM_TYPES = new Set([
  "Author animation inquiry",
  "Animation inquiry",
  "Author animation or consulting inquiry",
  "Consulting inquiry",
  "Animation or consulting inquiry",
  "Events inquiry",
  "Masterclass registration",
]);

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

const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number[]>();
let loggedMissingTurnstileSecret = false;
let lastPrunedAt = 0;

export function resetInquiryRateLimits() {
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

function countUrls(value: string): number {
  return value.match(/https?:\/\/|www\./gi)?.length ?? 0;
}

type InquiryFields = Record<string, string>;

type ValidInquiry = {
  formType: string;
  fields: InquiryFields;
  turnstileToken: string;
  honeypot: string;
  elapsedMs: number | undefined;
};

function parseInquiry(body: unknown): { ok: true; value: ValidInquiry } | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Invalid inquiry." };
  }

  const formType = body.formType;
  if (typeof formType !== "string" || !ALLOWED_FORM_TYPES.has(formType)) {
    return { ok: false, error: "Invalid inquiry." };
  }

  if (!isPlainObject(body.fields)) {
    return { ok: false, error: "Invalid inquiry." };
  }

  const fields: InquiryFields = {};
  for (const [key, value] of Object.entries(body.fields)) {
    if (typeof value !== "string" || value.length > MAX_FIELD_LENGTH) {
      return { ok: false, error: "Invalid inquiry." };
    }
    fields[key] = value;
  }

  const name = fields.name?.trim() ?? "";
  const email = fields.email?.trim() ?? "";
  const message = fields.message?.trim() ?? "";
  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Please enter your name and a valid email." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter your name and a valid email." };
  }
  if (formType !== "Masterclass registration" && message.length === 0) {
    return { ok: false, error: "Please include a short message." };
  }

  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const honeypot = typeof body.honeypot === "string" ? body.honeypot : "";
  const elapsedMs = typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs) ? body.elapsedMs : undefined;

  return { ok: true, value: { formType, fields, turnstileToken, honeypot, elapsedMs } };
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

async function forwardToN8n(formType: string, fields: InquiryFields): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const webhookUrl = process.env.AIFA_INQUIRY_WEBHOOK_URL?.trim() || "";
  if (!webhookUrl) {
    console.error("[inquiry] AIFA_INQUIRY_WEBHOOK_URL is not set.");
    return { ok: false, status: 503, error: "We could not send your inquiry right now. Please try again shortly." };
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const webhookSecret = process.env.AIFA_INQUIRY_WEBHOOK_SECRET?.trim();
  if (webhookSecret) {
    headers["X-AIFA-Webhook-Secret"] = webhookSecret;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ formType, fields }),
      signal: AbortSignal.timeout(N8N_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`[inquiry] Webhook forwarding failed with status ${response.status}`);
      return { ok: false, status: 502, error: "We could not send your inquiry right now. Please try again shortly." };
    }
    return { ok: true };
  } catch (error) {
    console.error("[inquiry] Webhook forwarding failed:", error);
    return { ok: false, status: 502, error: "We could not send your inquiry right now. Please try again shortly." };
  }
}

export async function handleInquiry(req: Request, res: Response) {
  const parsed = parseInquiry(req.body);
  if (!parsed.ok) {
    res.status(400).json({ success: false, error: parsed.error });
    return;
  }

  const { formType, fields, turnstileToken, honeypot, elapsedMs } = parsed.value;

  if (honeypot.trim().length > 0) {
    res.status(200).json({ success: true });
    return;
  }

  if (typeof elapsedMs === "number" && elapsedMs < MIN_ELAPSED_MS) {
    res.status(400).json({ success: false, error: "Please wait a moment and submit again." });
    return;
  }

  const ip = clientIp(req);
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() || "";
  if (!secret) {
    if (!loggedMissingTurnstileSecret) {
      loggedMissingTurnstileSecret = true;
      console.warn("[inquiry] TURNSTILE_SECRET_KEY is not set. Submissions will be accepted with honeypot and rate-limit checks only.");
    }
  } else {
    if (!turnstileToken) {
      res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
      return;
    }
    try {
      const verified = await verifyTurnstile(turnstileToken, ip, secret);
      if (!verified) {
        res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
        return;
      }
    } catch (error) {
      console.error("[inquiry] Turnstile verification failed:", error);
      res.status(400).json({ success: false, error: "Bot verification failed. Please refresh and try again." });
      return;
    }
  }

  const now = Date.now();
  pruneAll(now);
  const emailKey = fields.email.trim().toLowerCase();
  if (
    isLimited(ipHits, ip, IP_LIMIT, IP_WINDOW_MS, now) ||
    isLimited(emailHits, emailKey, EMAIL_LIMIT, EMAIL_WINDOW_MS, now)
  ) {
    res.status(429).json({ success: false, error: "Too many inquiries. Please try again later." });
    return;
  }

  if (URL_PATTERN.test(fields.name) || URL_PATTERN.test(fields.organization ?? "")) {
    res.status(400).json({ success: false, error: "Invalid inquiry." });
    return;
  }
  if (countUrls(fields.message ?? "") > 2) {
    res.status(400).json({ success: false, error: "Invalid inquiry." });
    return;
  }
  if (looksLikeGibberish(fields.name) || looksLikeGibberish(fields.message ?? "")) {
    res.status(400).json({ success: false, error: "Invalid inquiry." });
    return;
  }

  const forwarded = await forwardToN8n(formType, fields);
  if (!forwarded.ok) {
    res.status(forwarded.status).json({ success: false, error: forwarded.error });
    return;
  }

  res.status(200).json({ success: true });
}
