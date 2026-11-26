import { createServer, type Server } from "http";
import fs from "fs";
import type { AddressInfo } from "net";
import path from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { handleInquiry, resetInquiryRateLimits } from "./inquiry";

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
    formType: "Author animation inquiry",
    fields: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We need a short book trailer.",
    },
    turnstileToken: "token-ada",
    honeypot: "",
    elapsedMs: 4000,
    ...overrides,
  };
}

describe("POST /api/inquiry", () => {
  const originalFetch = globalThis.fetch;
  const outbound = vi.fn();
  let running: { base: string; close: () => Promise<void> };
  const envKeys = ["TURNSTILE_SECRET_KEY", "AIFA_INQUIRY_WEBHOOK_URL", "AIFA_INQUIRY_WEBHOOK_SECRET"] as const;
  const previousEnv: Record<string, string | undefined> = {};

  async function post(body: unknown, headers: Record<string, string> = {}) {
    const response = await originalFetch(`${running.base}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    return readJson(response);
  }

  beforeEach(async () => {
    resetInquiryRateLimits();
    for (const key of envKeys) {
      previousEnv[key] = process.env[key];
      delete process.env[key];
    }
    process.env.AIFA_INQUIRY_WEBHOOK_URL = "https://webhook.test/inquiry";
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
    app.post("/api/inquiry", handleInquiry);
    running = await listen(app);
  });

  afterEach(async () => {
    await running.close();
    globalThis.fetch = originalFetch;
    for (const key of envKeys) {
      if (previousEnv[key] === undefined) delete process.env[key];
      else process.env[key] = previousEnv[key];
    }
    resetInquiryRateLimits();
  });

  it("forwards a valid inquiry to the webhook and hides the webhook URL from the response", async () => {
    const result = await post(validBody());
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ success: true });
    expect(JSON.stringify(result.json)).not.toMatch(/n8n|webhook\.test/);
    expect(outbound).toHaveBeenCalledTimes(1);
    const [url, init] = outbound.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://webhook.test/inquiry");
    expect(JSON.parse(String(init.body))).toEqual({
      formType: "Author animation inquiry",
      fields: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "We need a short book trailer.",
      },
    });
  });

  it("returns 503 and logs an error when the inquiry webhook URL is not configured", async () => {
    delete process.env.AIFA_INQUIRY_WEBHOOK_URL;
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await post(validBody());
    expect(result.status).toBe(503);
    expect(result.json).toEqual({
      success: false,
      error: "We could not send your inquiry right now. Please try again shortly.",
    });
    expect(outbound).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
    const logged = error.mock.calls.map((call) => call.map(String).join(" ")).join("\n");
    expect(logged).toMatch(/AIFA_INQUIRY_WEBHOOK_URL is not set/);
    expect(logged).not.toMatch(/n8n\.cloud/);
    error.mockRestore();
  });

  it("does not keep a hardcoded inquiry webhook path in the repo", () => {
    const needle = "aifa-website-form-" + "inquiry";
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
    const inquirySource = fs.readFileSync(path.resolve("server/inquiry.ts"), "utf8");
    expect(inquirySource).not.toMatch(/n8n\.cloud/);
    expect(inquirySource).not.toContain("DEFAULT_INQUIRY_WEBHOOK_URL");
  });

  it("rejects chat-probe payloads that omit name and email", async () => {
    const result = await post({
      action: "sendMessage",
      sessionId: "abc",
      chatInput: "What is 17*23?",
      formType: "Website inquiry",
    });
    expect(result.status).toBe(400);
    expect(result.json?.success).toBe(false);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without forwarding", async () => {
    const result = await post(validBody({ honeypot: "https://spam.example" }));
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
          fields: { name: "Ada Lovelace", email: `ada${i}@example.com`, message: "Hello there." },
        }),
        { "x-forwarded-for": "198.51.100.10" },
      );
      expect(result.status).toBe(200);
    }
    const limited = await post(
      validBody({
        fields: { name: "Ada Lovelace", email: "other@example.com", message: "Hello there." },
      }),
      { "x-forwarded-for": "198.51.100.10" },
    );
    expect(limited.status).toBe(429);
    expect(limited.json?.error).toMatch(/too many inquiries/i);
  });

  it("rate limits the same email across different IPs", async () => {
    for (let i = 0; i < 2; i += 1) {
      const result = await post(validBody(), { "x-forwarded-for": `198.51.100.${20 + i}` });
      expect(result.status).toBe(200);
    }
    const limited = await post(validBody(), { "x-forwarded-for": "198.51.100.30" });
    expect(limited.status).toBe(429);
  });

  it("rejects names that contain URLs and messages with too many links", async () => {
    const named = await post(validBody({
      fields: { name: "Visit www.spam.com", email: "ada@example.com", message: "Hello there." },
    }));
    expect(named.status).toBe(400);
    const manyLinks = await post(validBody({
      fields: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "See https://a.com https://b.com https://c.com",
      },
    }));
    expect(manyLinks.status).toBe(400);
    expect(outbound).not.toHaveBeenCalled();
  });

  it("allows a Masterclass registration without a message", async () => {
    const result = await post(validBody({
      formType: "Masterclass registration",
      fields: { name: "Ada Lovelace", email: "ada@example.com", source: "Masterclass page" },
    }));
    expect(result.status).toBe(200);
    expect(outbound).toHaveBeenCalledTimes(1);
  });

  it("sends the optional webhook secret header and returns 502 when forwarding fails", async () => {
    process.env.AIFA_INQUIRY_WEBHOOK_SECRET = "shared-secret";
    outbound.mockResolvedValueOnce(new Response("nope", { status: 500 }));
    const result = await post(validBody());
    expect(result.status).toBe(502);
    expect(result.json?.success).toBe(false);
    const [, init] = outbound.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["X-AIFA-Webhook-Secret"]).toBe("shared-secret");
  });

  it("accepts the formType strings used on both main and PR 24", async () => {
    for (const formType of [
      "Animation inquiry",
      "Consulting inquiry",
      "Animation or consulting inquiry",
      "Events inquiry",
    ]) {
      resetInquiryRateLimits();
      const result = await post(validBody({ formType }));
      expect(result.status, formType).toBe(200);
    }
  });
});
