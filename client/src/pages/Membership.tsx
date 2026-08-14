import { useState } from "react";

import PageMeta from "@/components/PageMeta";
import { Instagram, Linkedin, UsersRound } from "lucide-react";

type BillingCycle = "monthly" | "annual";

const MEMBERSHIP_BENEFITS = [
  {
    icon: "🎬",
    title: "Master AI Filmmaking in 30 Days",
    description:
      "The complete AI filmmaking course—from concept to final cut—built to help you finish work, not just collect tutorials.",
  },
  {
    icon: "🤖",
    title: "AIFA Workflow System",
    description:
      "The AI tool stack and production system AIFA members use to develop, direct, and deliver real films.",
  },
  {
    icon: "🏆",
    title: "Industry Certification",
    description:
      "Earn the AI Media Specialist certification you can add to LinkedIn, your portfolio, and client conversations.",
  },
  {
    icon: "🎥",
    title: "Monthly 5-Hour GenJams",
    description:
      "Make a film alongside the community during collaborative, deadline-driven creative sessions every month.",
  },
  {
    icon: "📋",
    title: "Weekly Creative Exercises",
    description:
      "Build a consistent creative practice and a body of work you are proud to show.",
  },
  {
    icon: "🎤",
    title: "Personalized Video Feedback",
    description:
      "Get direct Loom feedback from instructors and working creators so you know exactly how to improve the work.",
  },
  {
    icon: "💼",
    title: "Curated Opportunities",
    description:
      "See hand-picked AI filmmaking jobs, freelance opportunities, industry contests, and relevant calls for creators.",
  },
  {
    icon: "👥",
    title: "Private Creator Community",
    description:
      "Build alongside a global network of creators, find collaborators, share progress, and stay ahead of the tools.",
  },
];

const MEMBERSHIP_COMPARISON_ROWS = [
  { label: "$701 annual savings", monthly: false, annual: true, annualOnly: true },
  { label: "Instant certification access", monthly: false, annual: true, annualOnly: true },
  { label: "Full AI filmmaking curriculum", monthly: true, annual: true },
  { label: "AIFA production system", monthly: true, annual: true },
  { label: "Weekly creative exercises", monthly: true, annual: true },
  { label: "Monthly GenJams", monthly: true, annual: true },
  { label: "Personalized video feedback", monthly: true, annual: true },
  { label: "Industry certification", monthly: true, annual: true },
  { label: "Curated paid opportunities", monthly: true, annual: true },
  { label: "Private creator community", monthly: true, annual: true },
];

const FAQS = [
  {
    question: "Who is AI Film Academy for?",
    answer:
      "AIFA is for creators, filmmakers, editors, artists, freelancers, and ambitious beginners who want a clear AI filmmaking workflow and the accountability to finish real work.",
  },
  {
    question: "How much time do I need each week?",
    answer:
      "You can move through the foundational workflow at your own pace. The strongest results come from using the lessons and exercises to ship projects consistently, then bringing your work into feedback and GenJam sessions.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "Once Stripe confirms your payment, your membership access workflow starts automatically and your community invite is sent right away. Your welcome email will explain the first steps.",
  },
  {
    question: "Can I cancel my membership?",
    answer:
      "Yes. Your plan renews automatically until you cancel. You have easy access to manage billing through Stripe.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. Every new membership includes a 7-day, no-questions-asked refund window. See the full Refund & Cancellation Policy for the complete terms before you purchase.",
  },
];

const PLANS = {
  monthly: {
    name: "Monthly",
    amount: "$125",
    cadence: "/ month",
    priceQualifier: "(billed monthly)",
    billingLine: "Cancel Anytime.",
    cta: "Start Monthly Membership",
  },
  annual: {
    name: "Annual",
    amount: "$799",
    cadence: "/ year",
    priceQualifier: "(billed annually)",
    billingLine: "That is $66.58 per month. Save $701 versus monthly billing.",
    cta: "Start Annual Membership",
  },
} as const;

function PurchaseCta({
  cycle,
  className = "",
  onCheckout,
  isLoading = false,
  label,
}: {
  cycle: BillingCycle;
  className?: string;
  onCheckout: (cycle: BillingCycle) => void;
  isLoading?: boolean;
  label?: string;
}) {
  const plan = PLANS[cycle];

  return (
    <button
      type="button"
      onClick={() => onCheckout(cycle)}
      disabled={isLoading}
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        minHeight: "54px",
        borderRadius: "10px",
        background: "var(--afa-red)",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 800,
        fontSize: "0.95rem",
        letterSpacing: "0.03em",
        textDecoration: "none",
        border: 0,
        cursor: isLoading ? "wait" : "pointer",
        opacity: isLoading ? 0.72 : 1,
        boxShadow: "0 0 36px color-mix(in srgb, var(--afa-red) 28%, transparent)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
        event.currentTarget.style.boxShadow = "0 0 50px color-mix(in srgb, var(--afa-red) 48%, transparent)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 0 36px color-mix(in srgb, var(--afa-red) 28%, transparent)";
      }}
    >
      {isLoading ? "Opening secure checkout…" : label ?? plan.cta}
    </button>
  );
}

export default function Membership() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);

  async function startCheckout(cycle: BillingCycle) {
    if (checkingOut) return;
    setCheckingOut(true);
    setCheckoutError("");
    try {
      const response = await fetch("/api/create-membership-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billingCycle: cycle }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Secure checkout is temporarily unavailable. Please try again shortly.");
      }
      window.location.assign(payload.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Secure checkout is temporarily unavailable. Please try again shortly.");
      setCheckingOut(false);
    }
  }

  return (
    <main style={{ background: "#080808", color: "#F5F5F0", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="AI Film Academy Membership | Build Films, Get Feedback & Grow Your Portfolio"
        description="Join AI Film Academy for the filmmaking workflow, feedback, GenJams, certification, creative community, and portfolio momentum to finish stronger AI films."
        path="/membership"
      />
      <style>{`
        @media (max-width: 760px) {
          .membership-pricing-shell { display: flex !important; flex-direction: column !important; }
          .membership-plan-grid { order: 2 !important; grid-template-columns: 1fr !important; }
          .membership-plan-annual { order: -1; }
          .membership-comparison { order: 1 !important; }
          .membership-proof-grid { grid-template-columns: 1fr !important; }
          .membership-benefit-grid { grid-template-columns: 1fr !important; }
          .membership-process-grid { grid-template-columns: 1fr !important; }
          .membership-gallery-grid { grid-template-columns: 1fr !important; }
          .membership-comparison-header, .membership-comparison-row { grid-template-columns: minmax(0, 1.45fr) 0.65fr 0.65fr !important; gap: 0.35rem !important; }
          .membership-comparison-header { display: grid !important; font-size: 0.9rem !important; }
          .membership-comparison-feature { grid-column: auto; font-size: 1rem !important; line-height: 1.3 !important; }
          .membership-comparison-value { font-size: 1.15rem !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(6rem, 12vw, 10rem) 1.5rem clamp(5rem, 10vw, 8rem)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 15% 35%, rgba(190,24,24,0.23) 0%, transparent 40%), radial-gradient(ellipse at 85% 80%, rgba(127,29,29,0.16) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1180px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              color: "#F5F5F0",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.35rem, 7.7vw, 7.3rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              margin: "0 auto 1.75rem",
              maxWidth: "1180px",
            }}
          >
            <span className="block md:whitespace-nowrap">Build a Portfolio</span>
            <span className="block md:whitespace-nowrap">that <span style={{ color: "var(--afa-red)" }}>gets you hired.</span></span>
          </h1>
          <p
            style={{
              color: "rgba(245,245,240,0.94)",
              fontSize: "clamp(1.22rem, 2.25vw, 1.55rem)",
              lineHeight: 1.5,
              fontWeight: 600,
              margin: "0 auto 2.5rem",
              maxWidth: "800px",
            }}
          >
            Learn the production system, build a premium portfolio, and get the feedback and live creative practice to turn stronger work into paid opportunities.
          </p>
          <a href="#membership-includes" className="inline-flex min-h-[54px] items-center justify-center px-8" style={{ borderRadius: "10px", background: "var(--afa-red)", color: "#fff", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.02em", textDecoration: "none", boxShadow: "0 0 36px color-mix(in srgb, var(--afa-red) 28%, transparent)" }}>What’s Included?</a>
        </div>
      </section>


      <section id="membership-includes" style={{ padding: "clamp(5rem, 10vw, 8rem) 1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#F5F5F0", fontSize: "clamp(2.8rem, 7vw, 5.4rem)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: "1.25rem" }}>
            What Your Membership Includes.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(1.16rem, 1.8vw, 1.4rem)", lineHeight: 1.55, fontWeight: 600, marginBottom: "3.5rem" }}>
            Everything you need to build premium work, strengthen your portfolio, and show up with more confidence for paid creative opportunities.
          </p>
        </div>

        <div className="membership-benefit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          {MEMBERSHIP_BENEFITS.map((benefit) => (
            <article key={benefit.title} style={{ border: "1px solid rgba(255,255,255,0.14)", background: "#151515", borderRadius: "16px", padding: "clamp(1.65rem, 3.5vw, 2.25rem)" }}>
              <span style={{ display: "block", fontSize: "2.3rem", marginBottom: "1.2rem" }}>{benefit.icon}</span>
              <h3 style={{ color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em", fontSize: "clamp(1.8rem, 3vw, 2.35rem)", lineHeight: 0.98, marginBottom: "0.9rem" }}>{benefit.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(1.06rem, 1.5vw, 1.2rem)", lineHeight: 1.58, fontWeight: 500 }}>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" style={{ padding: "clamp(5rem, 10vw, 8rem) 1.5rem", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.25rem" }}>
          <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: "1rem" }}>Membership <span style={{ color: "var(--afa-red)" }}>Pricing.</span></h2>
          <p style={{ color: "rgba(255,255,255,0.94)", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)", fontWeight: 600, lineHeight: 1.5 }}>Access the full AIFA ecosystem for only $125/mo. Save $701 when you choose annual.</p>
        </div>

        <div className="membership-pricing-shell" style={{ maxWidth: "1060px", margin: "0 auto", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "22px", overflow: "hidden", background: "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))", display: "flex", flexDirection: "column" }}>
          <div className="membership-plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0, order: 1 }}>
            {(Object.keys(PLANS) as BillingCycle[]).map((cycle) => {
              const plan = PLANS[cycle];
              const isAnnual = cycle === "annual";
              return (
                <article key={cycle} className={isAnnual ? "membership-plan-annual" : "membership-plan-monthly"} style={{ position: "relative", padding: "clamp(2rem, 5vw, 3rem)", borderLeft: isAnnual ? "1px solid rgba(255,255,255,0.14)" : "none", background: isAnnual ? "linear-gradient(160deg, color-mix(in srgb, var(--afa-red) 20%, transparent), rgba(20,20,20,0.92) 42%)" : "rgba(14,14,14,0.88)" }}>
                  {isAnnual && <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", padding: "0.5rem 0.8rem", borderRadius: "999px", background: "var(--afa-red)", color: "#fff", fontSize: "1rem", fontWeight: 800 }}>Best value</span>}
                  <p style={{ color: isAnnual ? "var(--afa-red)" : "#F5F5F0", fontSize: "1.18rem", fontWeight: 800, marginBottom: "1.25rem" }}>{plan.name} Membership</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", fontSize: "clamp(3.45rem, 6vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.045em", fontWeight: 800, marginBottom: "0.85rem" }}>{plan.amount}<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.24rem", color: "rgba(255,255,255,0.86)", fontWeight: 700, letterSpacing: 0, marginLeft: "0.28rem" }}>{plan.cadence}</span></p>
                  <p style={{ color: "rgba(255,255,255,0.94)", fontSize: "1.14rem", lineHeight: 1.55, fontWeight: 600, minHeight: "80px", marginBottom: "2rem" }}>{plan.billingLine}</p>
                  <PurchaseCta cycle={cycle} className="w-full px-6" onCheckout={startCheckout} isLoading={checkingOut} />
                </article>
              );
            })}
          </div>

          <div className="membership-comparison" style={{ order: 2, borderTop: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.2)" }}>
          <div className="membership-comparison-header" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr 0.9fr", gap: "1rem", padding: "1.25rem clamp(1.25rem, 3vw, 2.5rem)", color: "rgba(255,255,255,0.7)", fontWeight: 800, fontSize: "1rem" }}>
            <span>What’s included</span>
            <span style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.18rem" }}>
              <span>Monthly</span>
              <span style={{ color: "#F5F5F0", fontSize: "1.06rem" }}>$125/mo</span>
              <span style={{ color: "rgba(255,255,255,0.66)", fontSize: "0.85rem" }}>{PLANS.monthly.priceQualifier}</span>
            </span>
            <span style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.18rem" }}>
              <span>Annual</span>
              <span style={{ color: "#F5F5F0", fontSize: "1.06rem" }}>$799/yr</span>
              <span style={{ color: "rgba(255,255,255,0.66)", fontSize: "0.85rem" }}>{PLANS.annual.priceQualifier}</span>
            </span>
          </div>
          <div style={{ padding: "0 clamp(1.25rem, 3vw, 2.5rem) 1.25rem" }}>
            {MEMBERSHIP_COMPARISON_ROWS.map((feature, index) => (
              <div key={feature.label} className="membership-comparison-row" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr 0.9fr", gap: "1rem", alignItems: "center", padding: "1rem 0", borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.1)", background: feature.annualOnly ? "color-mix(in srgb, var(--afa-red) 8%, transparent)" : "transparent" }}>
                <span className="membership-comparison-feature" style={{ color: "#F5F5F0", fontSize: "1.08rem", fontWeight: 700 }}>{feature.label}{feature.annualOnly && <span style={{ display: "block", color: "var(--afa-red)", fontSize: "0.88rem", marginTop: "0.25rem" }}>Annual advantage</span>}</span>
                <span className="membership-comparison-value" style={{ color: feature.monthly ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)", textAlign: "center", fontSize: "1.35rem", fontWeight: 900 }}>{feature.monthly ? "✓" : "×"}</span>
                <span className="membership-comparison-value" style={{ color: feature.annual ? "var(--afa-red)" : "rgba(255,255,255,0.45)", textAlign: "center", fontSize: "1.35rem", fontWeight: 900 }}>{feature.annual ? "✓" : "×"}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
        {checkoutError && <p role="alert" style={{ color: "#fca5a5", fontSize: "1rem", lineHeight: 1.5, margin: "1rem auto 0", textAlign: "center", maxWidth: "580px" }}>{checkoutError}</p>}
      </section>

      <section style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "clamp(5rem, 10vw, 7rem) 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5rem)", lineHeight: 0.95, letterSpacing: "0.02em" }}>FAQ’s</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", textAlign: "left", padding: "1.25rem 0", background: "transparent", border: 0, color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1rem" }}>
                    {faq.question}<span style={{ color: "var(--afa-red)", fontSize: "1.45rem", fontWeight: 400 }}>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p style={{ margin: "0 0 1.35rem", color: "rgba(255,255,255,0.86)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "720px" }}>{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(5rem, 10vw, 7.5rem) 1.5rem", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--afa-red) 17%, transparent), transparent 54%), #0A0A0A", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <h2 style={{ margin: "0 auto 1.15rem", color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 7.8vw, 6rem)", lineHeight: 0.9, letterSpacing: "0.02em" }}>The AIFA <span style={{ color: "var(--afa-red)" }}>Promise.</span></h2>
          <p style={{ color: "rgba(255,255,255,0.96)", fontSize: "clamp(1.35rem, 2.1vw, 1.7rem)", fontWeight: 700, lineHeight: 1.48, maxWidth: "700px", margin: "0 auto 2.25rem" }}>We want AIFA to earn its place in your creative practice. If it is not right for you within your first seven days, request a full refund. No questions asked.</p>
          <PurchaseCta cycle="annual" label="Get Access" className="min-w-[250px] px-8" onCheckout={startCheckout} isLoading={checkingOut} />
          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", marginTop: "3.25rem" }}>
            <a href="https://www.instagram.com/theaifilmacademy/" target="_blank" rel="noreferrer" aria-label="Follow AI Film Academy on Instagram" style={{ width: "48px", height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "10px", color: "#F5F5F0", background: "rgba(255,255,255,0.04)" }}><Instagram size={24} strokeWidth={2} /></a>
            <a href="https://www.linkedin.com/in/exemplar7" target="_blank" rel="noreferrer" aria-label="Follow AI Film Academy on LinkedIn" style={{ width: "48px", height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "10px", color: "#F5F5F0", background: "rgba(255,255,255,0.04)" }}><Linkedin size={24} strokeWidth={2} /></a>
            <a href="https://www.skool.com/aifilmacademy" target="_blank" rel="noreferrer" aria-label="Join the AI Film Academy Skool community" style={{ width: "48px", height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "10px", color: "#F5F5F0", background: "rgba(255,255,255,0.04)" }}><UsersRound size={24} strokeWidth={2} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
