import { createServer, type Server } from "http";
import fs from "fs";
import type { AddressInfo } from "net";
import path from "path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const TEST_WEBHOOK_URL = "https://example.test/skool-invite-webhook";

type JsonResponse = { status: number; json: Record<string, unknown> | null };

async function readJson(response: Response): Promise<JsonResponse> {
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  if (text) {
    json = JSON.parse(text) as Record<string, unknown>;
  }
  return { status: response.status, json };
}

async function postJson(base: string, pathname: string, body: unknown): Promise<JsonResponse> {
  const response = await fetch(`${base}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return readJson(response);
}

async function listen(createApp: () => import("express").Express): Promise<{ base: string; close: () => Promise<void> }> {
  const app = createApp();
  const server: Server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address() as AddressInfo;
  return {
    base: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}

async function boot(env: Record<string, string> = {}) {
  vi.resetModules();
  delete process.env.SKOOL_INVITE_WEBHOOK_URL;
  Object.assign(process.env, env);
  const { createApp } = await import("./index.ts");
  return listen(createApp);
}

const realFetch = globalThis.fetch;

describe("POST /api/skool-invite", () => {
  const outbound = vi.fn();

  beforeAll(() => {
    vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("127.0.0.1") || url.includes("localhost")) {
        return realFetch(input, init);
      }
      return outbound(input, init);
    });
  });

  afterEach(() => {
    outbound.mockReset();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("fails closed when SKOOL_INVITE_WEBHOOK_URL is not set", async () => {
    const ctx = await boot({});
    try {
      const result = await postJson(ctx.base, "/api/skool-invite", { email: "member@example.com" });
      expect(result.status).toBe(503);
      expect(result.json).toEqual({ success: false, error: "Skool invite is not configured" });
      expect(outbound).not.toHaveBeenCalled();
    } finally {
      await ctx.close();
    }
  });

  it("rejects a missing or invalid email before calling Skool", async () => {
    const ctx = await boot({ SKOOL_INVITE_WEBHOOK_URL: TEST_WEBHOOK_URL });
    try {
      const missing = await postJson(ctx.base, "/api/skool-invite", {});
      expect(missing.status).toBe(400);
      const invalid = await postJson(ctx.base, "/api/skool-invite", { email: "not-an-email" });
      expect(invalid.status).toBe(400);
      expect(outbound).not.toHaveBeenCalled();
    } finally {
      await ctx.close();
    }
  });

  it("proxies a valid email to the configured webhook and hides the URL in the response", async () => {
    outbound.mockResolvedValue(new Response("ok", { status: 200 }));
    const ctx = await boot({ SKOOL_INVITE_WEBHOOK_URL: TEST_WEBHOOK_URL });
    try {
      const result = await postJson(ctx.base, "/api/skool-invite", { email: "Member@Example.com" });
      expect(result.status).toBe(200);
      expect(result.json).toEqual({ success: true });
      expect(JSON.stringify(result.json)).not.toContain(TEST_WEBHOOK_URL);
      expect(outbound).toHaveBeenCalledTimes(1);
      const calledUrl = new URL(String(outbound.mock.calls[0]?.[0]));
      expect(calledUrl.origin + calledUrl.pathname).toBe(TEST_WEBHOOK_URL);
      expect(calledUrl.searchParams.get("email")).toBe("member@example.com");
    } finally {
      await ctx.close();
    }
  });

  it("returns 502 when Skool rejects the invite, without exposing the webhook URL", async () => {
    outbound.mockResolvedValue(new Response("nope", { status: 500 }));
    const ctx = await boot({ SKOOL_INVITE_WEBHOOK_URL: TEST_WEBHOOK_URL });
    try {
      const result = await postJson(ctx.base, "/api/skool-invite", { email: "member@example.com" });
      expect(result.status).toBe(502);
      expect(result.json).toEqual({ success: false, error: "Could not send the Skool invite." });
      expect(JSON.stringify(result.json)).not.toContain(TEST_WEBHOOK_URL);
    } finally {
      await ctx.close();
    }
  });

  it("rate-limits repeated invites from the same client", async () => {
    outbound.mockResolvedValue(new Response("ok", { status: 200 }));
    const ctx = await boot({ SKOOL_INVITE_WEBHOOK_URL: TEST_WEBHOOK_URL });
    try {
      const statuses: number[] = [];
      for (let i = 0; i < 6; i += 1) {
        const result = await postJson(ctx.base, "/api/skool-invite", { email: `member${i}@example.com` });
        statuses.push(result.status);
      }
      expect(statuses.slice(0, 5).every((status) => status === 200)).toBe(true);
      expect(statuses[5]).toBe(429);
    } finally {
      await ctx.close();
    }
  });
});

describe("Skool invite secret regression", () => {
  const root = path.resolve(".");
  const skip = new Set([".git", "node_modules", "dist"]);

  function walk(dir: string, files: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full, files);
      else files.push(full);
    }
    return files;
  }

  it("does not keep the Skool invite webhook URL in the public source tree", () => {
    const hits: string[] = [];
    for (const file of walk(root)) {
      if (!/\.(ts|tsx|js|jsx|mjs|cjs|json|md|env|txt)$/i.test(file)) continue;
      const text = fs.readFileSync(file, "utf8");
      const leakedHost = ["api2", "skool", "com"].join(".");
      if (text.includes(leakedHost)) {
        hits.push(path.relative(root, file));
      }
    }
    expect(hits).toEqual([]);
  });
});
