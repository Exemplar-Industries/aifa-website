import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── STRIPE CONFIG ───────────────────────────────────────────────────────────
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const FAST_PASS_PRODUCT_ID = "prod_UZGwA0tsMGTOR2";

// ─── PAID-SUBSCRIBER INVITE CLAIM CONFIG ──────────────────────────────────────
// The Skool invite edge function authorizes an email only after an invite_claims
// record exists. These values are provided through Railway, never source fallbacks.
const AIFA_SUPABASE_URL = process.env.AIFA_SUPABASE_URL || "";
const AIFA_SUPABASE_ANON_KEY = process.env.AIFA_SUPABASE_ANON_KEY || "";

// ─── RAILWAY SYNC TRIGGER CONFIG ────────────────────────────────────────────
const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN || "";
const RAILWAY_SYNC_SERVICE_ID = process.env.RAILWAY_SYNC_SERVICE_ID || "fcf6db96-29b5-4019-b016-829b850a4eb4";
const RAILWAY_SYNC_ENVIRONMENT_ID = process.env.RAILWAY_SYNC_ENVIRONMENT_ID || "8d58f4c4-64a4-40cb-9180-2bf5df9beff0";

// ─── TWENTY CRM CONFIG ────────────────────────────────────────────────────────
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || "";
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

// ─── PAID MEMBERSHIP CONFIGURATION ───────────────────────────────────────────
type MembershipBillingCycle = "monthly" | "annual";

const AIFA_MEMBERSHIP_MONTHLY_PRICE_ID = process.env.AIFA_MEMBERSHIP_MONTHLY_PRICE_ID ?? "price_1U3n1qAtNs5zyUU7yqfNuVrg";
const AIFA_MEMBERSHIP_ANNUAL_PRICE_ID = process.env.AIFA_MEMBERSHIP_ANNUAL_PRICE_ID ?? "price_1U3n22AtNs5zyUU7RW9EP9V2";
const AIFA_SKOOL_INVITE_FUNCTION_URL = process.env.AIFA_SKOOL_INVITE_FUNCTION_URL ?? "https://mdjjmanqnlfgttwtlufx.supabase.co/functions/v1/send-skool-invite";
const AIFA_PAID_PURCHASE_FULFILLMENT_URL = process.env.AIFA_PAID_PURCHASE_FULFILLMENT_URL ?? "";

function getMembershipPlanFromPrice(priceId: string): MembershipBillingCycle | null {
  if (priceId === AIFA_MEMBERSHIP_MONTHLY_PRICE_ID) return "monthly";
  if (priceId === AIFA_MEMBERSHIP_ANNUAL_PRICE_ID) return "annual";
  return null;
}

async function upsertPaidMembership(
  email: string,
  billingCycle: MembershipBillingCycle
): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const plan = billingCycle === "annual" ? "Annual" : "Monthly";
  const status = billingCycle === "annual" ? "ANNUAL_PAYING" : "MONTHLY_PAYING";
  const joinedAt = new Date().toISOString().split("T")[0];
  const query = `
    query FindPaidMember($email: String!) {
      people(filter: { emails: { primaryEmail: { eq: $email } } }, first: 1) {
        edges { node { id } }
      }
    }
  `;
  const findResponse = await axios.post(
    TWENTY_GRAPHQL_URL,
    { query, variables: { email: normalizedEmail } },
    { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
  );
  const edges = findResponse.data?.data?.people?.edges ?? [];
  const payload = {
    afaSubscriptionPlan: plan,
    membershipStatus: status,
    dateJoined: joinedAt,
    source: "Stripe",
  };

  if (edges.length === 0) {
    await axios.post(
      `${TWENTY_GRAPHQL_URL.replace("/graphql", "/rest/people")}`,
      { emails: { primaryEmail: normalizedEmail }, ...payload },
      { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
    );
    return;
  }

  await axios.patch(
    `${TWENTY_GRAPHQL_URL.replace("/graphql", `/rest/people/${edges[0].node.id}`)}`,
    payload,
    { headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, "Content-Type": "application/json" }, timeout: 10000 }
  );
}

async function createPaidMemberInviteClaim(input: {
  email: string;
  customerName: string;
}): Promise<void> {
  if (!AIFA_SUPABASE_URL || !AIFA_SUPABASE_ANON_KEY) {
    throw new Error("AIFA Supabase invite-claim configuration is incomplete");
  }

  try {
    await axios.post(
      `${AIFA_SUPABASE_URL}/rest/v1/invite_claims`,
      {
        name: input.customerName.trim() || input.email,
        email: input.email.toLowerCase().trim(),
      },
      {
        headers: {
          apikey: AIFA_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${AIFA_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        timeout: 10000,
      }
    );
  } catch (err: unknown) {
    // A paid member can legitimately re-enter the webhook path after a Stripe retry.
    // The existing claim authorizes the invite, so duplicate claims are safe to ignore.
    if (axios.isAxiosError(err) && err.response?.status === 409) return;
    throw err;
  }
}

async function sendPaidMemberSkoolInvite(email: string): Promise<void> {
  if (!AIFA_SKOOL_INVITE_FUNCTION_URL) {
    throw new Error("AIFA_SKOOL_INVITE_FUNCTION_URL is not configured");
  }
  await axios.post(
    AIFA_SKOOL_INVITE_FUNCTION_URL,
    { email: email.toLowerCase().trim(), source: "stripe_paid_membership" },
    { headers: { "Content-Type": "application/json" }, timeout: 15000 }
  );
}

async function sendPaidPurchasePostProcessing(input: {
  email: string;
  customerName: string;
  billingCycle: MembershipBillingCycle;
  sessionId: string;
}): Promise<void> {
  if (!AIFA_PAID_PURCHASE_FULFILLMENT_URL) {
    throw new Error("AIFA_PAID_PURCHASE_FULFILLMENT_URL is not configured");
  }

  const amountCents = input.billingCycle === "annual" ? 79900 : 12500;
  await axios.post(
    AIFA_PAID_PURCHASE_FULFILLMENT_URL,
    {
      customerEmail: input.email.toLowerCase().trim(),
      customerName: input.customerName,
      billingCycle: input.billingCycle,
      amountCents,
      offer: "AI Film Academy Membership",
      sessionId: input.sessionId,
      source: "stripe_website_membership",
    },
    { headers: { "Content-Type": "application/json" }, timeout: 15000 }
  );
}

type ServerSeoPage = {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
};

const SEO_SITE_ORIGIN = "https://www.aifilmacademy.com";
const SEO_SITE_NAME = "AI Film Academy";
const SEO_DEFAULT_IMAGE = `${SEO_SITE_ORIGIN}/assets/afa-icon-180.png`;
const SEO_DEFAULT_PAGE: ServerSeoPage = {
  title: "AI Film Academy™ | Learn AI Filmmaking and Build Your Portfolio",
  description: "Learn a director-led AI filmmaking workflow to create films, ads, trailers, and animation with practical feedback, portfolio support, events, and certification.",
  canonicalPath: "/",
};

const SEO_PUBLIC_PAGES: Record<string, ServerSeoPage> = {
  "/": SEO_DEFAULT_PAGE,
  "/membership": {
    title: "AI Filmmaking Membership | AI Film Academy",
    description: "Join AI Film Academy to learn a practical AI filmmaking workflow, get feedback, build portfolio-ready work, and create alongside a global community.",
  },
  "/resources/workflows/how-to-make-an-ai-film": {
    title: "How to Make an AI Short Film: The AIFA Workflow | AI Film Academy",
    description: "Make an AI short film with AIFA’s practical workflow: character sheets, location design, shot lists, Google Flow footage, editing, music, sound, and voiceover.",
  },
  "/resources/workflows/ai-character-consistency": {
    title: "How to Keep AI Characters Consistent Across Scenes | AI Film Academy",
    description: "Keep AI characters consistent with AIFA’s practical system: character bible, world reference, Google Flow Ingredients, approved frames, and a continuity pass before editing.",
  },
  "/free-video-training": {
    title: "Free AI Filmmaking Training | AI Film Academy",
    description: "Watch free AI filmmaking training and learn the practical workflow behind portfolio-ready AI films, trailers, ads, and animation.",
  },
  "/masterclass": {
    title: "AI Filmmaking Masterclass | AI Film Academy",
    description: "Explore an AI filmmaking masterclass built for creators who want a clear director-led workflow from idea to finished visual story.",
  },
  "/certification": {
    title: "AI Filmmaking Certification | AI Film Academy",
    description: "Explore AI Film Academy certification and the portfolio-ready creative standards it is designed to help members demonstrate.",
  },
  "/showcase": {
    title: "AI Filmmaking Showcase | AI Film Academy",
    description: "Explore original AI filmmaking work, creator projects, and portfolio-ready visual storytelling from the AI Film Academy community.",
  },
  "/productions": {
    title: "AI Video Production for Brands | AI Film Academy",
    description: "Work with AI Film Academy on director-led AI video production for brands, campaigns, trailers, and visual storytelling projects.",
  },
  "/consulting": {
    title: "AI Filmmaking Consulting | AI Film Academy",
    description: "Get focused AI filmmaking consulting for creative workflow, production strategy, tools, and portfolio-ready execution.",
  },
  "/education-events": {
    title: "AI Filmmaking Education and Events | AI Film Academy",
    description: "Explore AI filmmaking education, events, and creative-learning experiences from AI Film Academy.",
  },
  "/faq": {
    title: "AI Film Academy FAQs | Membership, Workflow, and Certification",
    description: "Find answers to common questions about AI Film Academy membership, AI filmmaking workflow, certification, feedback, and the creator community.",
  },
  "/contact": {
    title: "Contact AI Film Academy | Education and Production Inquiries",
    description: "Contact AI Film Academy for education, membership, certification, consulting, and AI video production inquiries.",
  },
  "/work-with-us": {
    title: "Contact AI Film Academy | Education and Production Inquiries",
    description: "Contact AI Film Academy for education, membership, certification, consulting, and AI video production inquiries.",
    canonicalPath: "/contact",
  },
};

function escapeSeoHtml(value: string): string {
  return value.replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character] || character);
}

function routeSeoHead(pathname: string): string {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
  const privateRoute = normalizedPath === "/connect" || normalizedPath.startsWith("/lessons/") || normalizedPath.startsWith("/genjam") || normalizedPath.startsWith("/internal/slide-archive") || ["/lpv3", "/anthum-exclusive", "/live-exclusive", "/refund-policy", "/terms", "/privacy", "/membership/success", "/internal/lessons"].includes(normalizedPath);
  const page = SEO_PUBLIC_PAGES[normalizedPath] ?? (privateRoute
    ? { title: "AI Film Academy", description: "AI Film Academy creator experience.", noindex: true }
    : { title: "Page Not Found | AI Film Academy", description: "The requested AI Film Academy page could not be found.", noindex: true });
  const canonicalPath = page.canonicalPath ?? normalizedPath;
  const canonicalUrl = `${SEO_SITE_ORIGIN}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const robots = page.noindex ? "noindex,follow" : "index,follow";
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SEO_SITE_ORIGIN}/#organization`, name: SEO_SITE_NAME, url: SEO_SITE_ORIGIN, logo: SEO_DEFAULT_IMAGE, description: SEO_DEFAULT_PAGE.description },
      canonicalPath === "/"
        ? { "@type": "WebSite", "@id": `${SEO_SITE_ORIGIN}/#website`, url: SEO_SITE_ORIGIN, name: SEO_SITE_NAME, publisher: { "@id": `${SEO_SITE_ORIGIN}/#organization` } }
        : { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: page.title, description: page.description, isPartOf: { "@id": `${SEO_SITE_ORIGIN}/#website` }, about: { "@id": `${SEO_SITE_ORIGIN}/#organization` } },
    ],
  }).replace(/</g, "\\u003c");
  return [
    `<title>${escapeSeoHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeSeoHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:title" content="${escapeSeoHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeSeoHtml(page.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:site_name" content="${SEO_SITE_NAME}" />`,
    `<meta property="og:image" content="${SEO_DEFAULT_IMAGE}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeSeoHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeSeoHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${SEO_DEFAULT_IMAGE}" />`,
    `<script id="aifa-seo-structured-data" type="application/ld+json">${structuredData}</script>`,
  ].join("\n    ");
}

// ─── SERVER ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const server = createServer(app);

  // Redirect non-www to www, preserving full path and query string
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (host === "aifilmacademy.com" || host === "aifilmacademy.com:443") {
      const redirectUrl = `https://www.aifilmacademy.com${req.originalUrl}`;
      res.redirect(301, redirectUrl);
      return;
    }
    next();
  });

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

  // ── MEMBERSHIP CHECKOUT SESSION ──────────────────────────────────────────
  // The browser sends only the approved billing cycle. The server determines the
  // corresponding Stripe Price ID and creates the hosted subscription checkout.
  app.post("/api/create-membership-checkout", async (req, res) => {
    const billingCycle = req.body?.billingCycle as MembershipBillingCycle | undefined;
    if (billingCycle !== "monthly" && billingCycle !== "annual") {
      res.status(400).json({ error: "Choose a valid membership plan." });
      return;
    }

    const priceId = billingCycle === "monthly" ? AIFA_MEMBERSHIP_MONTHLY_PRICE_ID : AIFA_MEMBERSHIP_ANNUAL_PRICE_ID;
    if (!STRIPE_SECRET_KEY || !priceId) {
      console.error("[membership-checkout] Stripe membership price configuration is incomplete");
      res.status(503).json({ error: "Secure checkout is not configured yet. Please try again shortly." });
      return;
    }

    try {
      const siteUrl = "https://www.aifilmacademy.com";
      const form = new URLSearchParams({
        mode: "subscription",
        success_url: `${siteUrl}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/membership?checkout=cancelled`,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "metadata[aifa_product]": "membership",
        "metadata[aifa_billing_cycle]": billingCycle,
        "subscription_data[metadata][aifa_product]": "membership",
        "subscription_data[metadata][aifa_billing_cycle]": billingCycle,
      });
      const stripeResponse = await axios.post(
        "https://api.stripe.com/v1/checkout/sessions",
        form.toString(),
        {
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 15000,
        }
      );
      const checkoutUrl = stripeResponse.data?.url;
      if (!checkoutUrl || typeof checkoutUrl !== "string") {
        throw new Error("Stripe did not return a hosted checkout URL");
      }
      res.json({ url: checkoutUrl });
    } catch (error) {
      console.error("[membership-checkout] Checkout session creation failed:", error);
      res.status(502).json({ error: "Secure checkout is temporarily unavailable. Please try again shortly." });
    }
  });

  // ── STRIPE FAST-PASS + PAID MEMBERSHIP WEBHOOK ─────────────────────────────
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

    let event: { id?: string; type: string; data: { object: Record<string, unknown> } };
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
      const customerName =
        ((session.customer_details as Record<string, unknown>)?.name as string) ??
        "";

      // Confirm the exact purchased product through Stripe line items. Payment
      // fulfillment must never rely on browser-provided price or product details.
      let isFastPass = false;
      let paidMembershipCycle: MembershipBillingCycle | null = null;
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
          for (const item of items as Record<string, unknown>[]) {
            const priceId = (item.price as Record<string, unknown>)?.id as string | undefined;
            if (priceId) {
              const cycle = getMembershipPlanFromPrice(priceId);
              if (cycle) paidMembershipCycle = cycle;
            }
          }
        } else {
          // Existing Fast-Pass legacy behavior. Paid memberships never fail open.
          isFastPass = true;
        }
      } catch (err) {
        console.error("[stripe-webhook] Line item check failed:", err);
        // Existing Fast-Pass legacy behavior. Paid memberships never fail open.
        isFastPass = true;
      }

      if (paidMembershipCycle && email) {
        try {
          await upsertPaidMembership(email, paidMembershipCycle);
          await createPaidMemberInviteClaim({
            email,
            customerName,
          });
          await sendPaidMemberSkoolInvite(email);
          await sendPaidPurchasePostProcessing({
            email,
            customerName,
            billingCycle: paidMembershipCycle,
            sessionId: String(session.id ?? ""),
          });
          console.log(`[stripe-webhook] ${paidMembershipCycle} membership fulfilled for ${email}`);
        } catch (err) {
          console.error(`[stripe-webhook] Paid membership fulfillment failed for ${email}:`, err);
          res.status(500).json({ error: "Membership fulfillment failed; Stripe will retry this event." });
          return;
        }
      } else if (isFastPass && email) {
        try {
          const granted = await grantFastPass(email);
          console.log(`[stripe-webhook] Fast-Pass granted for ${email}: ${granted}`);
        } catch (err) {
          console.error(`[stripe-webhook] CRM update failed for ${email}:`, err);
        }
      } else {
        console.log(`[stripe-webhook] Skipping — not a configured membership, not a Fast-Pass, or no email. isFastPass=${isFastPass}, membership=${paidMembershipCycle}, email=${email}`);
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

  // Save edited slide HTML back to disk
  app.post("/api/slides/save", async (req, res) => {
    const { deck, slideId, html } = req.body ?? {};
    const ALLOWED_DECKS = ["week1", "week4"];
    if (!deck || !slideId || !html || !ALLOWED_DECKS.includes(deck)) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }
    // Sanitize slideId — only allow alphanumeric, underscore, hyphen
    if (!/^[a-zA-Z0-9_-]+$/.test(slideId)) {
      res.status(400).json({ error: "Invalid slideId" });
      return;
    }
    const staticPath =
      process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "public")
        : path.resolve(__dirname, "..", "dist", "public");
    const slidePath = path.join(staticPath, "slides", deck, `${slideId}.html`);
    try {
      await fs.promises.writeFile(slidePath, html, "utf8");
      console.log(`[slide-save] Saved ${deck}/${slideId}.html`);
      res.json({ ok: true });
    } catch (err) {
      console.error("[slide-save] Error:", err);
      res.status(500).json({ error: "Failed to save slide" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexTemplatePath = path.join(staticPath, "index.html");
  const indexTemplate = await fs.promises.readFile(indexTemplatePath, "utf8");

  // Keep asset responses static, while route documents receive canonical metadata before JavaScript executes.
  app.use(express.static(staticPath, { index: false }));

  // Handle client-side routing with route-aware server-rendered SEO metadata.
// Lightweight readiness endpoint for external uptime checks.
// No authentication, customer data, configuration, or internal details are exposed.
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

  app.get("*", (req, res) => {
    const pageHtml = indexTemplate.replace(
      /<!-- AIFA_SEO_HEAD_START -->[\s\S]*?<!-- AIFA_SEO_HEAD_END -->/,
      `<!-- AIFA_SEO_HEAD_START -->\n    ${routeSeoHead(req.path)}\n    <!-- AIFA_SEO_HEAD_END -->`
    );
    res.type("html").send(pageHtml);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
