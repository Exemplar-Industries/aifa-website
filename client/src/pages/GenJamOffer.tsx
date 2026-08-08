/*
 * AI Film Academy — Machine Cinema Partner Rate Offer Page
 * Route: /genjam-offer
 * Purpose: Post-GenJam conversion page — exclusive $399/yr partner rate for GenJam alumni
 *
 * Funnel flow:
 *   1. Congratulations hero — acknowledge the GenJam experience
 *   2. Exclusive offer framing — "Machine Cinema Partner Rate" (not a discount, an inner circle)
 *   3. Value stack — what's included at this rate
 *   4. Pricing anchor — show $49/mo public rate vs $399/yr partner rate ($33/mo, save $189)
 *   5. CTA → Stripe payment link (https://buy.stripe.com/fZu8wO3Ji2pyeoTe2c7Vm03)
 *   6. Post-payment success state — shows when ?payment=success in URL
 *      (n8n webhook fires Skool invite on Stripe payment.succeeded event)
 *
 * Stripe:
 *   Product: prod_V24MSfcUuUygm8 — AI Film Academy — Machine Cinema Partner Rate
 *   Price:   price_1U20EFAtNs5zyUU7lMW5sExe — $399/year recurring
 *   Link:    https://buy.stripe.com/fZu8wO3Ji2pyeoTe2c7Vm03
 *
 * Post-payment Skool invite: handled by n8n workflow listening on Stripe webhook
 *   (payment_intent.succeeded / checkout.session.completed for product prod_V24MSfcUuUygm8)
 */
import { useEffect, useState } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/fZu8wO3Ji2pyeoTe2c7Vm03";
const PUBLIC_MONTHLY_PRICE = 49;
const PARTNER_ANNUAL_PRICE = 399;
const PARTNER_MONTHLY_EQUIV = Math.round(PARTNER_ANNUAL_PRICE / 12); // $33
const ANNUAL_SAVINGS = PUBLIC_MONTHLY_PRICE * 12 - PARTNER_ANNUAL_PRICE; // $189

// ─── Value items ──────────────────────────────────────────────────────────────
const VALUE_ITEMS = [
  {
    icon: "🎬",
    label: "Full Course Library",
    desc: "50+ video lessons covering every stage of AI filmmaking — concept, production, post",
  },
  {
    icon: "🤖",
    label: "AIFA Workflow System",
    desc: "The exact AI tool stack and production process used by AFA members to ship real films",
  },
  {
    icon: "🏆",
    label: "AI Media Specialist Certificate",
    desc: "LinkedIn-ready certification that signals your skills to clients and employers",
  },
  {
    icon: "🎥",
    label: "Monthly GenJams",
    desc: "Live collaborative filmmaking sessions every month — the same experience you just had",
  },
  {
    icon: "👥",
    label: "Private Community",
    desc: "1,100+ active AI creators — get feedback, find collaborators, stay ahead of the tools",
  },
  {
    icon: "🔄",
    label: "Continuous Updates",
    desc: "New lessons added monthly as AI tools evolve — your membership never goes stale",
  },
];

// ─── Success State ─────────────────────────────────────────────────────────────
function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <header className="absolute top-0 left-0 right-0 border-b border-white/5 py-5 px-6 flex justify-center">
        <img
          src="/assets/aifa-white-flask-film-academy-180.png"
          alt="AI Film Academy"
          style={{ height: "40px", width: "auto" }}
        />
      </header>
      <div
        className="w-full max-w-md rounded-2xl p-10 text-center mt-20"
        style={{
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <div className="text-6xl mb-5">🎬</div>
        <h1
          className="font-black text-white mb-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", letterSpacing: "0.02em" }}
        >
          Welcome to the Academy.
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-6">
          Your Machine Cinema Partner Rate membership is confirmed.{" "}
          <strong className="text-white">Check your inbox</strong> — your Skool invite is on its
          way within 15 minutes.
        </p>
        <div
          className="rounded-xl p-4 text-left space-y-2 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">What happens next</p>
          {[
            "You'll receive a Skool invite email within 15 minutes",
            "Accept the invite to access the full AI Film Academy community",
            "Your first monthly GenJam is already on the calendar",
            "Start with the AIFA Workflow System in the course library",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-gray-300">{step}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600">
          Questions? Email us at{" "}
          <a href="mailto:hello@aifilmacademy.com" className="text-gray-400 hover:text-white transition-colors">
            hello@aifilmacademy.com
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── Main Offer Page ──────────────────────────────────────────────────────────
export default function GenJamOffer() {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setIsSuccess(true);
    }
  }, []);

  if (isSuccess) return <PaymentSuccess />;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="border-b border-white/5 py-5 px-6 flex justify-center">
        <img
          src="/assets/aifa-white-flask-film-academy-180.png"
          alt="AI Film Academy"
          style={{ height: "40px", width: "auto" }}
        />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12 md:py-20">

        {/* ── Section 1: Congratulations Hero ── */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444",
          }}
        >
          Machine Cinema × AI Film Academy
        </div>

        <h1
          className="text-center font-black mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: "1.0",
            letterSpacing: "0.02em",
            maxWidth: "820px",
          }}
        >
          Congratulations on
          <br />
          <span style={{ color: "#ef4444" }}>Finishing a GenJam.</span>
        </h1>

        <p
          className="text-center text-gray-400 mb-6"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", maxWidth: "600px", lineHeight: "1.7" }}
        >
          You just experienced what it feels like to make AI films with a community behind you.
          Here's your exclusive offer to continue mastering AI filmmaking — and stay in the loop
          with monthly GenJam experiences.
        </p>

        {/* ── Section 2: Offer framing ── */}
        <div
          className="w-full max-w-2xl rounded-2xl p-8 mb-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(185,28,28,0.04) 100%)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#ef4444" }}
          >
            Exclusive to GenJam Alumni
          </p>
          <h2
            className="font-black text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "0.02em" }}
          >
            The Machine Cinema Partner Rate
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
            This pricing tier is not available to the public. It exists only for people who have
            attended a GenJam and experienced the AFA methodology firsthand. You've earned it.
          </p>
        </div>

        {/* ── Section 3: Value Stack ── */}
        <div className="w-full max-w-2xl mb-12">
          <h3
            className="text-center font-black text-white mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "0.02em" }}
          >
            Everything Included in Your Membership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUE_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-5 flex items-start gap-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Pricing ── */}
        <div className="w-full max-w-md mb-10">
          <h3
            className="text-center font-black text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "0.02em" }}
          >
            Your Exclusive Rate
          </h3>

          {/* Public price (crossed out) */}
          <div
            className="rounded-xl p-4 mb-3 flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: 0.6,
            }}
          >
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Public Rate</p>
              <p className="text-sm text-gray-400">Monthly membership</p>
            </div>
            <div className="text-right">
              <p
                className="font-bold text-gray-500 line-through"
                style={{ fontSize: "1.4rem" }}
              >
                ${PUBLIC_MONTHLY_PRICE}<span className="text-sm font-normal">/mo</span>
              </p>
              <p className="text-xs text-gray-600">${PUBLIC_MONTHLY_PRICE * 12}/yr</p>
            </div>
          </div>

          {/* Partner rate (highlighted) */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(185,28,28,0.06) 100%)",
              border: "2px solid rgba(239,68,68,0.4)",
            }}
          >
            {/* Best value badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: "#ef4444", color: "white" }}
            >
              Partner Rate
            </div>

            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#ef4444" }}>
              Machine Cinema Exclusive
            </p>
            <p className="text-sm text-gray-400 mb-4">Annual membership — billed once per year</p>

            <div className="flex items-end gap-2 mb-1">
              <span
                className="font-black text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", lineHeight: 1 }}
              >
                ${PARTNER_ANNUAL_PRICE}
              </span>
              <span className="text-gray-400 text-lg mb-2">/year</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Just <strong className="text-white">${PARTNER_MONTHLY_EQUIV}/month</strong> — save{" "}
              <strong className="text-white">${ANNUAL_SAVINGS}</strong> vs public monthly pricing
            </p>

            <ul className="space-y-2 mb-6">
              {[
                "Full access to everything — no upsells",
                "Monthly GenJams included",
                "Cancel anytime — no contracts",
                "Renews annually at this rate",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span style={{ color: "#ef4444" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={STRIPE_PAYMENT_LINK}
              className="block w-full text-center rounded-xl py-4 font-bold text-white text-base uppercase tracking-wider transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                boxShadow: "0 0 40px rgba(239,68,68,0.4)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(239,68,68,0.6)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(239,68,68,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Join at the Partner Rate — ${PARTNER_ANNUAL_PRICE}/yr →
            </a>

            <p className="text-center text-xs text-gray-600 mt-3">
              Secure checkout via Stripe. Your Skool invite is delivered automatically after payment.
            </p>
          </div>
        </div>

        {/* ── Section 5: Urgency / closing copy ── */}
        <div
          className="w-full max-w-md rounded-xl p-5 text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-gray-400 text-sm leading-relaxed">
            This rate is only available to people who attended a Machine Cinema GenJam.{" "}
            <strong className="text-white">
              It will not be offered again at this price after this window closes.
            </strong>{" "}
            The next time someone joins AFA, they pay $49/month.
          </p>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-xs text-gray-700">
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This offer is exclusively for
          Machine Cinema GenJam alumni.
        </p>
      </footer>
    </div>
  );
}
