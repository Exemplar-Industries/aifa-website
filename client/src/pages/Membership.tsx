import { useState } from "react";

import PageMeta from "@/components/PageMeta";

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
      "The AI tool stack and production process AFA members use to develop, direct, and deliver real films.",
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
      "Yes. Your plan renews automatically until you cancel. You will have easy access to manage billing and cancel through Stripe before the next renewal date.",
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
    billingLine: "Billed monthly. Cancel before your next renewal.",
    cta: "Start Monthly Membership",
  },
  annual: {
    name: "Annual",
    amount: "$799",
    cadence: "/ year",
    billingLine: "Billed annually. That is $66.58 per month—save $701 versus monthly billing.",
    cta: "Get Annual Access",
  },
} as const;

function PurchaseCta({
  cycle,
  className = "",
  onCheckout,
  isLoading = false,
}: {
  cycle: BillingCycle;
  className?: string;
  onCheckout: (cycle: BillingCycle) => void;
  isLoading?: boolean;
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
        background: "linear-gradient(135deg, #ef4444, #b91c1c)",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 800,
        fontSize: "0.95rem",
        letterSpacing: "0.03em",
        textDecoration: "none",
        border: 0,
        cursor: isLoading ? "wait" : "pointer",
        opacity: isLoading ? 0.72 : 1,
        boxShadow: "0 0 36px rgba(239,68,68,0.28)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
        event.currentTarget.style.boxShadow = "0 0 50px rgba(239,68,68,0.48)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 0 36px rgba(239,68,68,0.28)";
      }}
    >
      {isLoading ? "Opening secure checkout…" : plan.cta}
    </button>
  );
}

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState<BillingCycle>("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const selected = PLANS[selectedPlan];

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
          .membership-plan-grid { grid-template-columns: 1fr !important; }
          .membership-proof-grid { grid-template-columns: 1fr !important; }
          .membership-benefit-grid { grid-template-columns: 1fr !important; }
          .membership-process-grid { grid-template-columns: 1fr !important; }
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
        <div style={{ position: "relative", maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "#ef4444",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            AI Film Academy Membership
          </p>
          <h1
            style={{
              color: "#F5F5F0",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              margin: "0 auto 1.75rem",
              maxWidth: "940px",
            }}
          >
            Build the portfolio that <span style={{ color: "#ef4444" }}>gets you hired.</span>
          </h1>
          <p
            style={{
              color: "rgba(245,245,240,0.68)",
              fontSize: "clamp(1.05rem, 2.3vw, 1.25rem)",
              lineHeight: 1.7,
              margin: "0 auto 2.25rem",
              maxWidth: "670px",
            }}
          >
            Stop collecting tools and unfinished ideas. Get the workflow, feedback, practice, and creator network that help you turn ambitious ideas into finished AI films.
          </p>
          <PurchaseCta cycle="annual" className="px-8" onCheckout={startCheckout} isLoading={checkingOut} />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "1rem", lineHeight: 1.5 }}>
            Choose monthly or annual access. Automatic invite delivery begins after verified Stripe payment.
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem, 7vw, 5rem) 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0D0D0D" }}>
        <div className="membership-proof-grid" style={{ maxWidth: "980px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
          {[
            ["30K+", "Global students trained"],
            ["5.0★", "Google rating"],
            ["1,100+", "Creators in the community"],
          ].map(([stat, label]) => (
            <div key={label} style={{ padding: "2rem 1rem", background: "#111", textAlign: "center" }}>
              <p style={{ color: "#ef4444", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.6rem, 6vw, 4rem)", lineHeight: 1, marginBottom: "0.5rem" }}>{stat}</p>
              <p style={{ color: "rgba(255,255,255,0.43)", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(5rem, 10vw, 8rem) 1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#ef4444", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>What changes inside AIFA</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#F5F5F0", fontSize: "clamp(2.8rem, 7vw, 5.4rem)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: "1.25rem" }}>
            More than a course. <span style={{ color: "#ef4444" }}>A creative practice.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.06rem", lineHeight: 1.75, marginBottom: "3.5rem" }}>
            The difference is not another model release. It is knowing how to develop an idea, direct the production, finish the edit, and show your work to people who can hire you.
          </p>
        </div>

        <div className="membership-benefit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
          {MEMBERSHIP_BENEFITS.map((benefit) => (
            <article key={benefit.title} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#151515", borderRadius: "16px", padding: "clamp(1.5rem, 3.5vw, 2rem)" }}>
              <span style={{ display: "block", fontSize: "2rem", marginBottom: "1.1rem" }}>{benefit.icon}</span>
              <h3 style={{ color: "#fff", fontSize: "1.13rem", lineHeight: 1.25, fontWeight: 800, marginBottom: "0.65rem" }}>{benefit.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.65 }}>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(5rem, 10vw, 8rem) 1.5rem", background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto 3.5rem", textAlign: "center" }}>
            <p style={{ color: "#ef4444", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>Your membership path</p>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5.4rem)", lineHeight: 0.95, letterSpacing: "0.02em" }}>Learn it. Make it. <span style={{ color: "#ef4444" }}>Show it.</span></h2>
          </div>
          <div className="membership-process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              ["01", "Learn the workflow", "Get the structure to take an idea from brief to final cut without losing momentum in the tools."],
              ["02", "Finish real projects", "Use exercises, GenJams, and your own briefs to build a portfolio of work that demonstrates your taste and process."],
              ["03", "Get better in public", "Use feedback, community, certification, and opportunities to turn finished projects into professional visibility."],
            ].map(([number, title, copy]) => (
              <article key={number} style={{ borderTop: "2px solid #ef4444", padding: "1.5rem 0.5rem 0" }}>
                <p style={{ color: "#ef4444", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", lineHeight: 1, marginBottom: "1rem" }}>{number}</p>
                <h3 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.65rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.7, fontSize: "0.92rem" }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="checkout" style={{ padding: "clamp(5rem, 10vw, 8rem) 1.5rem", maxWidth: "1060px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "710px", margin: "0 auto 3rem" }}>
          <p style={{ color: "#ef4444", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>Choose your access</p>
          <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: "1rem" }}>Make your next film <span style={{ color: "#ef4444" }}>the one you finish.</span></h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.03rem", lineHeight: 1.7 }}>Choose the membership plan that matches how you want to build. Both plans include the complete AIFA experience.</p>
        </div>

        <div className="membership-plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem", maxWidth: "860px", margin: "0 auto" }}>
          {(Object.keys(PLANS) as BillingCycle[]).map((cycle) => {
            const plan = PLANS[cycle];
            const isSelected = selectedPlan === cycle;
            const isAnnual = cycle === "annual";
            return (
              <button
                key={cycle}
                type="button"
                onClick={() => setSelectedPlan(cycle)}
                style={{
                  position: "relative",
                  textAlign: "left",
                  border: isSelected ? "2px solid rgba(239,68,68,0.7)" : "1px solid rgba(255,255,255,0.10)",
                  background: isAnnual ? "linear-gradient(145deg, rgba(127,29,29,0.25), #171717 35%)" : "#151515",
                  borderRadius: "18px",
                  padding: "clamp(1.5rem, 4vw, 2.25rem)",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 0 44px rgba(239,68,68,0.12)" : "none",
                }}
              >
                {isAnnual && <span style={{ position: "absolute", top: "-12px", right: "20px", padding: "5px 10px", borderRadius: "999px", background: "#ef4444", color: "#fff", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase" }}>Best Value</span>}
                <span style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.25rem" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", border: isSelected ? "6px solid #ef4444" : "2px solid rgba(255,255,255,0.35)", boxSizing: "border-box", display: "inline-block" }} />
                  <span style={{ color: isAnnual ? "#ef4444" : "rgba(255,255,255,0.65)", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>{plan.name} Membership</span>
                </span>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", fontSize: "clamp(3.6rem, 8vw, 5rem)", lineHeight: 0.9, marginBottom: "0.25rem" }}>{plan.amount}<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.52)", fontWeight: 500 }}>{plan.cadence}</span></p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.55, minHeight: "48px", marginBottom: "1.5rem" }}>{plan.billingLine}</p>
                <span style={{ display: "block", color: "rgba(255,255,255,0.67)", fontSize: "0.88rem", lineHeight: 1.7 }}>✓ Full curriculum and workflow system<br />✓ GenJams, feedback, community, and certification<br />✓ Curated opportunities and ongoing training</span>
              </button>
            );
          })}
        </div>

        <div id={`checkout-${selectedPlan}`} style={{ maxWidth: "860px", margin: "1.25rem auto 0", border: "1px solid rgba(239,68,68,0.24)", background: "rgba(239,68,68,0.06)", borderRadius: "14px", padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "0.93rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            Selected: <strong style={{ color: "#fff" }}>{selected.name} Membership — {selected.amount}{selected.cadence}</strong>
          </p>
          <PurchaseCta cycle={selectedPlan} className="w-full sm:w-auto px-8" onCheckout={startCheckout} isLoading={checkingOut} />
          {checkoutError && <p role="alert" style={{ color: "#fca5a5", fontSize: "0.82rem", lineHeight: 1.5, margin: "0.85rem auto 0", maxWidth: "580px" }}>{checkoutError}</p>}
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.77rem", lineHeight: 1.55, marginTop: "1rem" }}>
            Secure checkout through Stripe. Membership renews automatically until cancelled. New members are protected by a 7-day, no-questions-asked refund policy.
          </p>
        </div>
      </section>

      <section style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "clamp(5rem, 10vw, 7rem) 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: "#ef4444", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>Questions, answered</p>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5rem)", lineHeight: 0.95, letterSpacing: "0.02em" }}>You bring the idea. <span style={{ color: "#ef4444" }}>We build the system.</span></h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", textAlign: "left", padding: "1.25rem 0", background: "transparent", border: 0, color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1rem" }}>
                    {faq.question}<span style={{ color: "#ef4444", fontSize: "1.45rem", fontWeight: 400 }}>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p style={{ margin: "0 0 1.35rem", color: "rgba(255,255,255,0.55)", fontSize: "0.94rem", lineHeight: 1.7, maxWidth: "720px" }}>{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(5rem, 12vw, 8rem) 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>Your next project starts here</p>
        <h2 style={{ maxWidth: "820px", margin: "0 auto 1.25rem", color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 6.2rem)", lineHeight: 0.9, letterSpacing: "0.02em" }}>Finish work you are <span style={{ color: "#ef4444" }}>proud to show.</span></h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto 2rem" }}>Join a serious creative practice built around making better work—and getting it seen.</p>
        <PurchaseCta cycle="annual" className="px-8" onCheckout={startCheckout} isLoading={checkingOut} />
      </section>
    </main>
  );
}
