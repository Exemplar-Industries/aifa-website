import { createServer, type Server } from "http";
import fs from "fs";
import type { AddressInfo } from "net";
import path from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { handleFreeTraining, resetFreeTrainingRateLimits } from "./free-training";

type JsonResponse = { status: number; json: Record<string, unknown> | null };

async function readJson(response: Response): Promise<JsonResponse> {
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  if (text) {
    try {
      json = JSON.parse(text) as Record<string, unknown>;
    } catch {
      json = { raw: text };
    }
  }
  return { status: response.status, json };
}

async function listen(app: express.Express): Promise<{ base: string; close: () => Promise<void> }> {
  const server: Server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address() as AddressInfo;
  return {
    base: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    firstName: "Ada",
    email: "ada@example.com",
    source: "free_video_training",
    group: "Free Video Training",
    marketingConsent: true,
    turnstileToken: "token-ada",
    companyWebsite: "",
    submittedAt: "2026-11-26T17:00:00.000Z",
    elapsedMs: 4000,
    ...overrides,
  };
}

describe("POST /api/free-training", () => {
  const originalFetch = globalThis.fetch;
  const outbound = vi.fn();
  let running: { base: string; close: () => Promise<void> };
  const envKeys = ["TURNSTILE_SECRET_KEY", "AIFA_FREE_TRAINING_WEBHOOK_URL"] as const;
  const previousEnv: Record<string, string | undefined> = {};

  async function post(body: unknown, headers: Record<string, string> = {}) {
    const response = await originalFetch(`${running.base}/api/free-training`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    return readJson(response);
  }

  beforeEach(async () => {
    resetFreeTrainingRateLimits();
    for (const key of envKeys) {
      previousEnv[key] = process.env[key];
      delete process.env[key];
    }
    process.env.AIFA_FREE_TRAINING_WEBHOOK_URL = "https://webhook.test/free-training";
    outbound.mockReset();
    outbound.mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } }),
    );
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("127.0.0.1") || url.includes("localhost")) {
        return originalFetch(input, init);
      }
      return outbound(url, init);
    }) as typeof fetch;

    const app = express();
    app.use(express.json());
    app.post("/api/free-training", handleFreeTraining);
    running = await listen(app);
  });

  afterEach(async () => {
    await running.close();
    globalThis.fetch = originalFetch;
    for (const key of envKeys) {
      if (previousEnv[key] === undefined) delete process.env[key];
      else process.env[key] = previousEnv[key];
    }
    resetFreeTrainingRateLimits();
  });

  it("forwards a valid signup to the webhook and hides the webhook URL from the response", async () => {
    const body = validBody();
    const result = await post(body);
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ success: true });
    expect(JSON.stringify(result.json)).not.toMatch(/n8n|webhook\.test/);
    expect(outbound).toHaveBeenCalledTimes(1);
    const [url, init] = outbound.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://webhook.test/free-training");
    expect(JSON.parse(String(init.body))).toEqual({
      firstName: "Ada",
      email: "ada@example.com",
      source: "free_video_training",
      group: "Free Video Training",
      marketingConsent: true,
      turnstileToken: "token-ada",
      companyWebsite: "",
      submittedAt: "2026-11-26T17:00:00.000Z",
      elapsedMs: 4000,
    });
  });

  it("returns 503 and logs an error when the free training webhook URL is not configured", async () => {
    delete process.env.AIFA_FREE_TRAINING_WEBHOOK_URL;
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await post(validBody());
    expect(result.status).toBe(503);
    expect(result.json).toEqual({
      success: false,
      error: "We could not send your request right now. Please try again shortly.",
    });
    expect(outbound).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
    const logged = error.mock.calls.map((call) => call.map(String).join(" ")).join("\n");
    expect(logged).toMatch(/AIFA_FREE_TRAINING_WEBHOOK_URL is not set/);
    expect(logged).not.toMatch(/n8n\.cloud/);
    error.mockRestore();
  });

  it("does not keep a hardcoded free training webhook path in the repo", () => {
    const needle = "n8n.cloud/" + "webhook";
    const root = path.resolve(".");
    const skip = new Set(["node_modules", "dist", ".git", ".manus-logs"]);
    const hits: string[] = [];

    function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (skip.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }
        if (!entry.isFile()) continue;
        const text = fs.readFileSync(full);
        if (text.includes(needle)) hits.push(path.relative(root, full));
      }
    }

    walk(root);
    expect(hits).toEqual([]);
    const source = fs.readFileSync(path.resolve("server/free-training.ts"), "utf8");
    expect(source).not.toMatch(/n8n\.cloud/);
    expect(source).toContain("AIFA_FREE_TRAINING_WEBHOOK_URL");
    const formSource = fs.readFileSync(path.resolve("client/src/pages/FreeVideoTraining.tsx"), "utf8");
    expect(formSource).toContain('"/api/free-training"');
    expect(formSource).not.toMatch(/n8n\.cloud/);
    expect(formSource).not.toMatch(/https:\/\/.*webhook/);
  });

  it("rejects payloads that omit a name or a valid email", async () => {
    const missingName = await post(validBody({ firstName: "" }));
    expect(missingName.status).toBe(400);
    expect(missingName.json?.success).toBe(false);
    const badEmail = await post(validBody({ email: "not-an-email" }));
    expect(badEmail.status).toBe(400);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("rejects submissions without marketing consent", async () => {
    const result = await post(validBody({ marketingConsent: false }));
    expect(result.status).toBe(400);
    expect(result.json?.error).toMatch(/agree to receive/i);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without forwarding", async () => {
    const result = await post(validBody({ companyWebsite: "https://spam.example" }));
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ success: true });
    expect(outbound).not.toHaveBeenCalled();
  });

  it("rejects submissions completed in under two seconds", async () => {
    const result = await post(validBody({ elapsedMs: 500 }));
    expect(result.status).toBe(400);
    expect(result.json?.error).toMatch(/wait a moment/i);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("accepts submissions without a Turnstile token when the secret is unset", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await post(validBody({ turnstileToken: "" }));
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ success: true });
    expect(outbound).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("verifies the Turnstile token when the secret is set", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-turnstile-secret";
    outbound.mockImplementation(async (url: string) => {
      if (String(url).includes("siteverify")) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    });

    const result = await post(validBody({ turnstileToken: "site-token" }), { "x-forwarded-for": "203.0.113.9, 10.0.0.1" });
    expect(result.status).toBe(200);
    expect(outbound).toHaveBeenCalledTimes(2);

    const verifyCall = outbound.mock.calls.find(([url]) => String(url).includes("siteverify"));
    expect(verifyCall).toBeTruthy();
    const verifyBody = new URLSearchParams(String((verifyCall![1] as RequestInit).body));
    expect(verifyBody.get("secret")).toBe("test-turnstile-secret");
    expect(verifyBody.get("response")).toBe("site-token");
    expect(verifyBody.get("remoteip")).toBe("203.0.113.9");
  });

  it("rejects a missing or invalid Turnstile token when the secret is set", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-turnstile-secret";
    const missing = await post(validBody({ turnstileToken: "" }));
    expect(missing.status).toBe(400);
    expect(missing.json?.error).toMatch(/bot verification failed/i);

    outbound.mockResolvedValueOnce(new Response(JSON.stringify({ success: false }), { status: 200 }));
    const invalid = await post(validBody({ turnstileToken: "bad-token" }));
    expect(invalid.status).toBe(400);
    expect(invalid.json?.error).toMatch(/bot verification failed/i);
    const forwarded = outbound.mock.calls.filter(([url]) => !String(url).includes("siteverify"));
    expect(forwarded).toHaveLength(0);
  });

  it("rate limits repeated submissions from the same IP and email", async () => {
    for (let i = 0; i < 5; i += 1) {
      const result = await post(
        validBody({
          email: `ada${i}@example.com`,
        }),
        { "x-forwarded-for": "198.51.100.10" },
      );
      expect(result.status).toBe(200);
    }
    const limited = await post(
      validBody({
        email: "other@example.com",
      }),
      { "x-forwarded-for": "198.51.100.10" },
    );
    expect(limited.status).toBe(429);
    expect(limited.json?.error).toMatch(/too many requests/i);
  });

  it("rate limits the same email across different IPs", async () => {
    for (let i = 0; i < 2; i += 1) {
      const result = await post(validBody(), { "x-forwarded-for": `198.51.100.${20 + i}` });
      expect(result.status).toBe(200);
    }
    const limited = await post(validBody(), { "x-forwarded-for": "198.51.100.30" });
    expect(limited.status).toBe(429);
  });

  it("rejects first names that contain URLs", async () => {
    const named = await post(validBody({ firstName: "Visit www.spam.com" }));
    expect(named.status).toBe(400);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("returns 502 when forwarding fails", async () => {
    outbound.mockResolvedValueOnce(new Response("nope", { status: 500 }));
    const result = await post(validBody());
    expect(result.status).toBe(502);
    expect(result.json?.success).toBe(false);
    expect(outbound).toHaveBeenCalledTimes(1);
  });

  it("normalizes the email and keeps the n8n field set intact", async () => {
    const result = await post(validBody({ email: "  Ada@Example.COM  " }));
    expect(result.status).toBe(200);
    const [, init] = outbound.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(init.body)).email).toBe("ada@example.com");
  });
});
