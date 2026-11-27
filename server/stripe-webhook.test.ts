import crypto from "crypto";
import { createServer, type Server } from "http";
import type { AddressInfo } from "net";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const WEBHOOK_SECRET = "whsec_test_current";
const FULFILLMENT_URL = "https://example.test/paid-purchase-fulfillment";
const FULFILLMENT_TOKEN = "fulfillment-test-token";
const MONTHLY_PRICE_ID = "price_1U3n1qAtNs5zyUU7yqfNuVrg";
const TEST_SKOOL_WEBHOOK_URL = "https://example.test/skool-invite-webhook";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    isAxiosError: () => false,
  },
}));

type JsonResponse = { status: number; json: Record<string, unknown> | null };

async function readJson(response: Response): Promise<JsonResponse> {
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  if (text) {
    json = JSON.parse(text) as Record<string, unknown>;
  }
  return { status: response.status, json };
}

function sign(payload: string, secret: string, timestamp: string): string {
  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return `t=${timestamp},v1=${expected}`;
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
  for (const key of [
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_WEBHOOK_SECRET_PREVIOUS",
    "STRIPE_SECRET_KEY",
    "SKOOL_INVITE_WEBHOOK_URL",
    "AIFA_PAID_PURCHASE_FULFILLMENT_URL",
    "AIFA_PAID_PURCHASE_FULFILLMENT_TOKEN",
    "AIFA_SUPABASE_URL",
    "AIFA_SUPABASE_ANON_KEY",
    "TWENTY_API_KEY",
  ]) {
    delete process.env[key];
  }
  Object.assign(process.env, env);
  const axios = (await import("axios")).default as unknown as {
    post: ReturnType<typeof vi.fn>;
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };
  axios.post.mockReset();
  axios.get.mockReset();
  axios.patch.mockReset();
  axios.post.mockResolvedValue({ data: { data: { people: { edges: [] } } } });
  axios.patch.mockResolvedValue({ data: {} });
  axios.get.mockResolvedValue({
    data: { data: [{ price: { id: MONTHLY_PRICE_ID } }] },
  });
  const { createApp } = await import("./index.ts");
  const running = await listen(createApp);
  return { ...running, axios };
}

const realFetch = globalThis.fetch;

describe("POST /api/stripe-webhook", () => {
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

  const baseEnv = {
    STRIPE_WEBHOOK_SECRET: WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: "sk_test_dummy",
    AIFA_PAID_PURCHASE_FULFILLMENT_URL: FULFILLMENT_URL,
    AIFA_PAID_PURCHASE_FULFILLMENT_TOKEN: FULFILLMENT_TOKEN,
    AIFA_SUPABASE_URL: "https://example.test",
    AIFA_SUPABASE_ANON_KEY: "anon-test",
    TWENTY_API_KEY: "twenty-test",
    SKOOL_INVITE_WEBHOOK_URL: TEST_SKOOL_WEBHOOK_URL,
  };

  function completedSessionPayload() {
    return JSON.stringify({
      id: "evt_test_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_1",
          customer_email: "Member@Example.com",
          customer_details: { email: "Member@Example.com", name: "Test Member" },
        },
      },
    });
  }

  async function postSigned(base: string, payload: string, secret = WEBHOOK_SECRET, timestamp = "1700000000") {
    const response = await fetch(`${base}/api/stripe-webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": sign(payload, secret, timestamp),
      },
      body: payload,
    });
    return readJson(response);
  }

  it("rejects an invalid signature", async () => {
    const ctx = await boot(baseEnv);
    try {
      const payload = completedSessionPayload();
      const response = await fetch(`${ctx.base}/api/stripe-webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "stripe-signature": sign(payload, "wrong-secret", "1700000000"),
        },
        body: payload,
      });
      const result = await readJson(response);
      expect(result.status).toBe(400);
      expect(result.json).toEqual({ error: "Signature verification failed" });
      expect(ctx.axios.post).not.toHaveBeenCalled();
    } finally {
      await ctx.close();
    }
  });

  it("returns 2xx for a leftover paid membership without calling Skool, and still posts n8n fulfillment", async () => {
    const ctx = await boot(baseEnv);
    try {
      const result = await postSigned(ctx.base, completedSessionPayload());
      expect(result.status).toBe(200);
      expect(result.json).toEqual({ received: true });
      expect(outbound).not.toHaveBeenCalled();

      const fulfillmentCalls = ctx.axios.post.mock.calls.filter((call) => call[0] === FULFILLMENT_URL);
      expect(fulfillmentCalls).toHaveLength(1);
      expect(fulfillmentCalls[0]?.[1]).toMatchObject({
        customerEmail: "member@example.com",
        customerName: "Test Member",
        billingCycle: "monthly",
        sessionId: "cs_test_1",
        source: "stripe_website_membership",
      });
      expect(fulfillmentCalls[0]?.[2]).toMatchObject({
        headers: {
          "Content-Type": "application/json",
          "X-AIFA-Fulfillment-Token": FULFILLMENT_TOKEN,
        },
      });
    } finally {
      await ctx.close();
    }
  });

  it("returns 2xx for an unrelated signed event without fulfillment", async () => {
    const ctx = await boot(baseEnv);
    try {
      const payload = JSON.stringify({
        id: "evt_test_2",
        type: "customer.subscription.updated",
        data: { object: { id: "sub_test_1" } },
      });
      const result = await postSigned(ctx.base, payload);
      expect(result.status).toBe(200);
      expect(result.json).toEqual({ received: true });
      const fulfillmentCalls = ctx.axios.post.mock.calls.filter((call) => call[0] === FULFILLMENT_URL);
      expect(fulfillmentCalls).toHaveLength(0);
      expect(outbound).not.toHaveBeenCalled();
    } finally {
      await ctx.close();
    }
  });
});
