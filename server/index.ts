import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      // No join date — fail open to avoid blocking legitimate members
      return { eligible: true };
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

// ─── SERVER ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies for API routes
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
