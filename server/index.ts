import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── STRIPE CONFIG ───────────────────────────────────────────────────────────
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const FAST_PASS_PRODUCT_ID = "prod_UZGwA0tsMGTOR2";

// ─── RAILWAY SYNC TRIGGER CONFIG ────────────────────────────────────────────
const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN || "9a2f81cf-8c46-44e0-85ae-9baeb78e7183";
const RAILWAY_SYNC_SERVICE_ID = process.env.RAILWAY_SYNC_SERVICE_ID || "fcf6db96-29b5-4019-b016-829b850a4eb4";
const RAILWAY_SYNC_ENVIRONMENT_ID = process.env.RAILWAY_SYNC_ENVIRONMENT_ID || "8d58f4c4-64a4-40cb-9180-2bf5df9beff0";

// ─── TWENTY CRM CONFIG ────────────────────────────────────────────────────────
const TWENTY_API_KEY =
  process.env.TWENTY_API_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOTk2ZDE5Ni05YzI4LTRhODUtOTE3Yi1mNzE1Y2U2YWQ4NzciLCJ0eXBlIjoiQVBJX0tFWSIsIndvcmtzcGFjZUlkIjoiYTk5NmQxOTYtOWMyOC00YTg1LTkxN2ItZjcxNWNlNmFkODc3IiwiaWF0IjoxNzc3NDM5MTQ4LCJleHAiOjQ5MzEwMzkxNDcsImp0aSI6ImU3YWFiZDFhLTYzZjctNDcwNy05M2U2LTFlOTUxMmVjNDhhZiJ9.ImbLg6H5WvD79YIHe1w8-0B2dvFQ7L5PEfP-0AFz9gs";
const TWENTY_GRAPHQL_URL =
  "https://twenty-server-production-5cd9.up.railway.app/graphql";

// Returns the number of days between a date string (YYYY-MM-DD) and today
function daysSince(dateStr: string): number {
  const joined = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - joined.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

type EligibilityResult =
  | { eligible: true; warning?: string }
  | {
      eligible: false;
      reason: "tenure_too_short" | "not_found" | "not_active_member";
      daysRemaining?: number;
      daysCompleted?: number;
    };

async function checkEligibility(email: string): Promise<EligibilityResult> {
  const query = `
    query CheckMember($email: String!) {
      people(filter: { emails: { primaryEmail: { eq: $email } } }, first: 1) {
        edges {
          node {
            id
            afaSubscriptionPlan
            membershipStatus
            dateJoined
            fastPassGranted
          }
        }
      }
    }
  `;

  const response = await axios.post(
    TWENTY_GRAPHQL_URL,
    { query, variables: { email: email.toLowerCase().trim() } },
    {
      headers: {
        Authorization: `Bearer ${TWENTY_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }
  );

  const edges = response.data?.data?.people?.edges ?? [];

  // Not found in CRM
  if (edges.length === 0) {
    return { eligible: false, reason: "not_found" };
  }

  const person = edges[0].node;
  const plan: string = person.afaSubscriptionPlan ?? "";
  const status: string = person.membershipStatus ?? "";
  const dateJoined: string | null = person.dateJoined ?? null;
  const fastPassGranted: boolean = person.fastPassGranted === true;

  // ALLOW: Fast-Pass purchased via Stripe — check this first
  if (fastPassGranted) {
    return { eligible: true };
  }

  // ALLOW: Annual members (any price point)
  if (status === "ANNUAL_PAYING" || plan.toLowerCase().includes("annual")) {
    return { eligible: true };
  }

  // ALLOW: Lifetime members
  if (plan.toLowerCase().includes("lifetime")) {
    return { eligible: true };
  }

  // ALLOW: Free members
  if (status === "FREE_MEMBER" || plan.toLowerCase() === "free") {
    return { eligible: true };
  }

  // MONTHLY: Apply the 90-day tenure gate
  if (status === "MONTHLY_PAYING" || plan.toLowerCase().includes("monthly")) {
    if (!dateJoined) {
      // No join date on a monthly member — CRM sync bug. Block them.
      // The sync fix (defaulting to today) will populate this on next run.
      return {
        eligible: false,
        reason: "tenure_too_short",
        daysRemaining: 90,
        daysCompleted: 0,
      };
    }
    const tenure = daysSince(dateJoined);
    if (tenure >= 90) {
      return { eligible: true };
    }
    return {
      eligible: false,
      reason: "tenure_too_short",
      daysRemaining: 90 - tenure,
      daysCompleted: tenure,
    };
  }

  // Churned or unknown — block
  return { eligible: false, reason: "not_active_member" };
}

// ─── CRM HELPERS ─────────────────────────────────────────────────────────────
async function grantFastPass(email: string): Promise<boolean> {
  // Find the person in CRM
  const query = `
    query FindPerson($email: String!) {
      people(filter: { emails: { primaryEmail: { eq: $email } } }, first: 1) {
        edges { node { id } }
      }
    }
  `;
  const findResp = await axios.post(
    TWENTY_GRAPHQL_URL,
    { query, variables: { email: email.toLowerCase().trim() } },
    { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
  );
  const edges = findResp.data?.data?.people?.edges ?? [];

  if (edges.length === 0) {
    // Person not in CRM yet — create a minimal record so the Fast-Pass is tracked
    await axios.post(
      `${TWENTY_GRAPHQL_URL.replace("/graphql", "/rest/people")}`,
      {
        emails: { primaryEmail: email.toLowerCase().trim() },
        fastPassGranted: true,
        fastPassGrantedAt: new Date().toISOString().split("T")[0],
        source: "Stripe",
      },
      { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
    );
    return true;
  }

  const personId = edges[0].node.id;
  const patchResp = await axios.patch(
    `${TWENTY_GRAPHQL_URL.replace("/graphql", `/rest/people/${personId}`)}`,
    {
      fastPassGranted: true,
      fastPassGrantedAt: new Date().toISOString().split("T")[0],
    },
    { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
  );
  return patchResp.status === 200;
}

// ─── SERVER ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const server = createServer(app);

  // Raw body needed for Stripe webhook signature verification
  app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

  // Parse JSON bodies for all other API routes
  app.use(express.json());

  // ── CERTIFICATION ELIGIBILITY CHECK ──────────────────────────────────────
  app.post("/api/check-certification-eligibility", async (req, res) => {
    const { email } = req.body ?? {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "Valid email is required." });
      return;
    }

    try {
      const result = await checkEligibility(email);
      res.json(result);
    } catch (err: unknown) {
      console.error("[cert-gate] CRM lookup failed:", err);
      // Fail open: if CRM is unreachable, let the user through rather than
      // blocking legitimate members due to a backend outage.
      res.json({ eligible: true, warning: "crm_unavailable" });
    }
  });

  // ── STRIPE FAST-PASS WEBHOOK ─────────────────────────────────────────────
  // Stripe sends checkout.session.completed when a Fast-Pass is purchased.
  // We verify the signature, confirm the product matches, then tag the CRM.
  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const rawBody = req.body as Buffer;

    // Verify webhook signature if secret is configured
    if (STRIPE_WEBHOOK_SECRET) {
      try {
        const timestamp = sig.split(",").find((p) => p.startsWith("t="))?.slice(2);
        const v1 = sig.split(",").find((p) => p.startsWith("v1="))?.slice(3);
        if (!timestamp || !v1) {
          res.status(400).json({ error: "Invalid signature format" });
          return;
        }
        const payload = `${timestamp}.${rawBody.toString("utf8")}`;
        const expected = crypto
          .createHmac("sha256", STRIPE_WEBHOOK_SECRET)
          .update(payload)
          .digest("hex");
        if (expected !== v1) {
          console.error("[stripe-webhook] Signature mismatch");
          res.status(400).json({ error: "Signature verification failed" });
          return;
        }
      } catch (err) {
        console.error("[stripe-webhook] Signature error:", err);
        res.status(400).json({ error: "Signature error" });
        return;
      }
    }

    let event: { type: string; data: { object: Record<string, unknown> } };
    try {
      event = JSON.parse(rawBody.toString("utf8"));
    } catch {
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email =
        (session.customer_email as string) ??
        ((session.customer_details as Record<string, unknown>)?.email as string) ??
        "";

      // Confirm this is a Fast-Pass purchase by checking line items via Stripe API
      // (We check product ID to avoid tagging unrelated purchases)
      let isFastPass = false;
      try {
        if (STRIPE_SECRET_KEY && session.id) {
          const lineResp = await axios.get(
            `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items`,
            {
              headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
              timeout: 10000,
            }
          );
          const items = lineResp.data?.data ?? [];
          isFastPass = items.some(
            (item: Record<string, unknown>) =>
              (item.price as Record<string, unknown>)?.product === FAST_PASS_PRODUCT_ID
          );
        } else {
          // No Stripe key configured — trust the webhook event (less secure)
          isFastPass = true;
        }
      } catch (err) {
        console.error("[stripe-webhook] Line item check failed:", err);
        // Fail open — if we can't verify the product, still grant access
        isFastPass = true;
      }

      if (isFastPass && email) {
        try {
          const granted = await grantFastPass(email);
          console.log(`[stripe-webhook] Fast-Pass granted for ${email}: ${granted}`);
        } catch (err) {
          console.error(`[stripe-webhook] CRM update failed for ${email}:`, err);
        }
      } else {
        console.log(`[stripe-webhook] Skipping — not a Fast-Pass or no email. isFastPass=${isFastPass}, email=${email}`);
      }
    }

    res.json({ received: true });
  });

  // ── MANUAL RE-CHECK ("I just upgraded on Skool") ─────────────────────────
  // When a user clicks "I just upgraded on Skool", this endpoint:
  // 1. Triggers the Railway cron job to run the full Skool→CRM sync immediately
  // 2. Polls the CRM every 10 seconds for up to 3 minutes waiting for the plan to flip
  // 3. Returns eligible=true as soon as the CRM shows Annual/Lifetime, or the
  //    current gate result if the sync completes but plan hasn't changed.
  app.post("/api/recheck-certification-eligibility", async (req, res) => {
    const { email } = req.body ?? {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "Valid email is required." });
      return;
    }

    // Step 1: Trigger the Railway sync job immediately
    let syncTriggered = false;
    try {
      const railwayMutation = `
        mutation TriggerSync($serviceId: String!, $environmentId: String!) {
          serviceInstanceDeploy(serviceId: $serviceId, environmentId: $environmentId)
        }
      `;
      const railwayResp = await axios.post(
        "https://backboard.railway.app/graphql/v2",
        {
          query: railwayMutation,
          variables: {
            serviceId: RAILWAY_SYNC_SERVICE_ID,
            environmentId: RAILWAY_SYNC_ENVIRONMENT_ID,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${RAILWAY_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );
      syncTriggered = railwayResp.data?.data?.serviceInstanceDeploy === true;
      console.log(`[recheck] Railway sync triggered for ${email}: ${syncTriggered}`);
    } catch (err) {
      console.error("[recheck] Railway trigger failed:", err);
      // Non-fatal — fall through to CRM poll
    }

    // Step 2: Poll CRM every 10 seconds for up to 3 minutes (18 attempts)
    // The sync takes ~60-90 seconds on Railway. We poll until it flips or we time out.
    const MAX_POLLS = 18;
    const POLL_INTERVAL_MS = 10000;

    for (let attempt = 0; attempt < MAX_POLLS; attempt++) {
      // Wait before polling (give sync time to start on first attempt)
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      try {
        const result = await checkEligibility(email);
        console.log(`[recheck] Poll ${attempt + 1}/${MAX_POLLS} for ${email}: eligible=${result.eligible}`);

        if (result.eligible) {
          // Plan has flipped — return success immediately
          res.json({ ...result, rechecked: true, syncTriggered, pollAttempts: attempt + 1 });
          return;
        }

        // If this is the last attempt, return whatever we have
        if (attempt === MAX_POLLS - 1) {
          res.json({
            ...result,
            rechecked: true,
            syncTriggered,
            pollAttempts: MAX_POLLS,
            message: syncTriggered
              ? "Sync ran but plan hasn't updated yet. Please allow a few more minutes and try again."
              : "Could not trigger sync. Please try again in a few minutes.",
          });
          return;
        }
      } catch (err) {
        console.error(`[recheck] Poll ${attempt + 1} CRM lookup failed:`, err);
        // Continue polling
      }
    }

    // Fallback (should not reach here)
    res.json({ eligible: false, reason: "not_active_member", rechecked: true, syncTriggered });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
