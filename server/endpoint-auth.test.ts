import { createServer, type Server } from "http";
import fs from "fs";
import type { AddressInfo } from "net";
import path from "path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const PASSCODE = "test-archive-passcode";
const SESSION_SECRET = "test-archive-session";
const TWENTY_KEY = "test-twenty-key";
const RAILWAY_KEY = "test-railway-token";
const SLIDE_PATH = path.resolve("dist/public/slides/week1/zz_auth_probe.html");

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    isAxiosError: () => false,
  },
}));

type JsonResponse = { status: number; json: Record<string, unknown> | null; response: Response };

async function readJson(response: Response): Promise<JsonResponse> {
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  if (text) {
    json = JSON.parse(text) as Record<string, unknown>;
  }
  return { status: response.status, json, response };
}

async function postJson(base: string, pathname: string, body: unknown, headers: Record<string, string> = {}): Promise<JsonResponse> {
  const response = await fetch(`${base}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    redirect: "manual",
  });
  return readJson(response);
}

function cookieHeader(response: Response): string {
  const cookies = response.headers.getSetCookie?.() ?? [];
  const pair = cookies
    .map((cookie) => cookie.split(";")[0] ?? "")
    .find((cookie) => cookie.startsWith("aifa_archive_access="));
  if (!pair) throw new Error("archive session cookie was not set");
  return pair;
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

async function boot(env: Record<string, string>) {
  vi.resetModules();
  for (const key of [
    "AIFA_ARCHIVE_PASSCODE",
    "AIFA_ARCHIVE_SESSION_SECRET",
    "TWENTY_API_KEY",
    "RAILWAY_TOKEN",
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_WEBHOOK_SECRET_PREVIOUS",
    "TURNSTILE_SECRET_KEY",
    "AIFA_INQUIRY_WEBHOOK_URL",
    "AIFA_INQUIRY_WEBHOOK_SECRET",
  ]) {
    delete process.env[key];
  }
  Object.assign(process.env, env);
  const axios = (await import("axios")).default as unknown as { post: ReturnType<typeof vi.fn> };
  axios.post.mockReset();
  axios.post.mockRejectedValue(new Error("unexpected outbound request"));
  const { createApp } = await import("./index.ts");
  const running = await listen(createApp);
  return { ...running, post: axios.post };
}

const slideBody = { deck: "week1", slideId: "zz_auth_probe", html: "<p>saved by auth check</p>" };

describe("endpoint auth when CRM and Railway keys are absent", () => {
  let ctx: Awaited<ReturnType<typeof boot>>;

  beforeAll(async () => {
    ctx = await boot({
      AIFA_ARCHIVE_PASSCODE: PASSCODE,
      AIFA_ARCHIVE_SESSION_SECRET: SESSION_SECRET,
    });
    await fs.promises.mkdir(path.dirname(SLIDE_PATH), { recursive: true });
    await fs.promises.writeFile(SLIDE_PATH, "original", "utf8");
  });

  afterAll(async () => {
    await ctx.close();
    await fs.promises.rm(SLIDE_PATH, { force: true });
  });

  it("rejects an unauthenticated slide save and leaves the file untouched", async () => {
    const result = await postJson(ctx.base, "/api/slides/save", slideBody);
    expect(result.status).toBe(401);
    expect(result.json).toEqual({ error: "Authentication required." });
    expect(await fs.promises.readFile(SLIDE_PATH, "utf8")).toBe("original");
    expect(ctx.post).not.toHaveBeenCalled();
  });

  it("rejects a wrong bearer token", async () => {
    const result = await postJson(ctx.base, "/api/slides/save", slideBody, { Authorization: "Bearer wrong-passcode" });
    expect(result.status).toBe(401);
    expect(await fs.promises.readFile(SLIDE_PATH, "utf8")).toBe("original");
  });

  it("saves a slide for a bearer token that matches the archive passcode", async () => {
    const result = await postJson(ctx.base, "/api/slides/save", slideBody, { Authorization: `Bearer ${PASSCODE}` });
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ ok: true });
    expect(await fs.promises.readFile(SLIDE_PATH, "utf8")).toBe(slideBody.html);
    await fs.promises.writeFile(SLIDE_PATH, "original", "utf8");
  });

  it("saves a slide for an archive session cookie", async () => {
    const unlock = await postJson(ctx.base, "/api/archive/unlock", { passcode: PASSCODE });
    expect(unlock.status).toBe(200);
    const result = await postJson(ctx.base, "/api/slides/save", { ...slideBody, html: "<p>cookie save</p>" }, {
      Cookie: cookieHeader(unlock.response),
    });
    expect(result.status).toBe(200);
    expect(await fs.promises.readFile(SLIDE_PATH, "utf8")).toBe("<p>cookie save</p>");
  });

  it("rejects an unauthenticated certification recheck before any outbound call", async () => {
    ctx.post.mockClear();
    const result = await postJson(ctx.base, "/api/recheck-certification-eligibility", { email: "member@example.com" });
    expect(result.status).toBe(401);
    expect(result.json).toEqual({ error: "Authentication required." });
    expect(ctx.post).not.toHaveBeenCalled();
  });

  it("fails closed for an authenticated recheck when Railway or CRM keys are missing", async () => {
    ctx.post.mockClear();
    const result = await postJson(
      ctx.base,
      "/api/recheck-certification-eligibility",
      { email: "member@example.com" },
      { Authorization: `Bearer ${PASSCODE}` }
    );
    expect(result.status).toBe(503);
    expect(result.json).toMatchObject({ error: "Recheck is not configured." });
    expect(ctx.post).not.toHaveBeenCalled();
  });

  it("fails closed for the public eligibility check when the CRM key is missing", async () => {
    const result = await postJson(ctx.base, "/api/check-certification-eligibility", { email: "member@example.com" });
    expect(result.status).toBe(503);
    expect(result.json).toMatchObject({ eligible: false });
    expect(result.json?.eligible).not.toBe(true);
  });

  it("keeps unrelated routes on their previous responses", async () => {
    const missingEmail = await postJson(ctx.base, "/api/check-certification-eligibility", { email: "not-an-email" });
    expect(missingEmail.status).toBe(400);
    expect(missingEmail.json).toEqual({ error: "Valid email is required." });

    const checkout = await postJson(ctx.base, "/api/create-membership-checkout", {});
    expect(checkout.status).toBe(410);
    expect(checkout.json).toEqual({
      error: "The AI Film Academy community is free to join on Skool. This site does not take payment.",
    });

    const health = await readJson(await fetch(`${ctx.base}/health`));
    expect(health.status).toBe(200);
    expect(health.json).toEqual({ status: "ok" });

    const session = await readJson(await fetch(`${ctx.base}/api/archive/session`));
    expect(session.status).toBe(200);
    expect(session.json).toEqual({ authorized: false });

    const wrongUnlock = await postJson(ctx.base, "/api/archive/unlock", { passcode: "nope" });
    expect(wrongUnlock.status).toBe(401);

    const membership = await fetch(`${ctx.base}/membership`, { redirect: "manual" });
    expect(membership.status).toBe(302);
    expect(membership.headers.get("location")).toContain("https://www.skool.com/aifilmacademy/about");
  });
});

describe("endpoint auth when CRM and Railway keys are configured", () => {
  let ctx: Awaited<ReturnType<typeof boot>>;

  beforeAll(async () => {
    process.env.AIFA_RECHECK_POLL_INTERVAL_MS = "0";
    process.env.AIFA_RECHECK_MAX_POLLS = "1";
    ctx = await boot({
      AIFA_ARCHIVE_PASSCODE: PASSCODE,
      AIFA_ARCHIVE_SESSION_SECRET: SESSION_SECRET,
      TWENTY_API_KEY: TWENTY_KEY,
      RAILWAY_TOKEN: RAILWAY_KEY,
    });
  });

  afterAll(async () => {
    delete process.env.AIFA_RECHECK_POLL_INTERVAL_MS;
    delete process.env.AIFA_RECHECK_MAX_POLLS;
    await ctx.close();
  });

  it("still refuses an unauthenticated recheck", async () => {
    ctx.post.mockClear();
    const result = await postJson(ctx.base, "/api/recheck-certification-eligibility", { email: "member@example.com" });
    expect(result.status).toBe(401);
    expect(ctx.post).not.toHaveBeenCalled();
  });

  it("runs the recheck for an authenticated caller without granting eligibility on a CRM failure", async () => {
    ctx.post.mockImplementation(async (_url: string, body: { query?: string }) => {
      if (String(body?.query ?? "").includes("serviceInstanceDeploy")) {
        return { data: { data: { serviceInstanceDeploy: true } } };
      }
      return { data: { data: { people: { edges: [] } } } };
    });
    const result = await postJson(
      ctx.base,
      "/api/recheck-certification-eligibility",
      { email: "member@example.com" },
      { Authorization: `Bearer ${PASSCODE}` }
    );
    expect(result.status).toBe(200);
    expect(result.json).toMatchObject({
      eligible: false,
      reason: "not_found",
      rechecked: true,
      syncTriggered: true,
    });
    const railwayCall = ctx.post.mock.calls.find((call) => String(call[1]?.query ?? "").includes("serviceInstanceDeploy"));
    expect(railwayCall?.[2]?.headers?.Authorization).toBe(`Bearer ${RAILWAY_KEY}`);
  });

  it("returns an active member from the public eligibility check", async () => {
    ctx.post.mockResolvedValue({
      data: {
        data: {
          people: {
            edges: [{
              node: {
                afaSubscriptionPlan: "Annual",
                membershipStatus: "ANNUAL_PAYING",
                fastPassGranted: false,
              },
            }],
          },
        },
      },
    });
    const result = await postJson(ctx.base, "/api/check-certification-eligibility", { email: "member@example.com" });
    expect(result.status).toBe(200);
    expect(result.json).toEqual({ eligible: true });
    const authHeader = ctx.post.mock.calls.at(-1)?.[2]?.headers?.Authorization;
    expect(authHeader).toBe(`Bearer ${TWENTY_KEY}`);
  });

  it("fails closed when the CRM lookup throws", async () => {
    ctx.post.mockRejectedValue(new Error("crm down"));
    const result = await postJson(ctx.base, "/api/check-certification-eligibility", { email: "member@example.com" });
    expect(result.status).toBe(503);
    expect(result.json).toMatchObject({ eligible: false });
    expect(result.json?.eligible).not.toBe(true);
  });
});
