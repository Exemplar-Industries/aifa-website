/*
 * AI Film Academy — Machine Cinema Partner Rate Offer Page
 * Route: /genjam-offer
 * Purpose: Post-GenJam premium conversion — $399/yr Machine Cinema Partner Rate
 *
 * Design: Premium exclusive offer — cinematic, wide, bold, high contrast
 * Structure:
 *   1. Full-width hero — congratulations + exclusive framing
 *   2. The offer reveal — "Machine Cinema Partner Rate" with strong visual hierarchy
 *   3. What's inside — dark card grid (2-col)
 *   4. Pricing comparison — $79/mo public vs $399/yr partner (saves $549/yr)
 *   5. Final CTA — single bold button
 *   6. Post-payment success state
 *
 * Stripe:
 *   Payment Link: https://buy.stripe.com/fZu8wO3Ji2pyeoTe2c7Vm03
 *   Public rate: $79/mo (raising) → $948/yr
 *   Partner rate: $399/yr → $33/mo equiv → saves $549/yr
 */
import { useEffect, useState } from "react";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/fZu8wO3Ji2pyeoTe2c7Vm03";
const PUBLIC_MONTHLY = 79;
const PUBLIC_ANNUAL = PUBLIC_MONTHLY * 12; // $948
const PARTNER_ANNUAL = 399;
const PARTNER_MONTHLY_EQUIV = Math.round(PARTNER_ANNUAL / 12); // $33
const SAVINGS = PUBLIC_ANNUAL - PARTNER_ANNUAL; // $549

const INCLUDED = [
  { icon: "🎬", label: "Full Course Library", desc: "50+ video lessons covering every stage of AI filmmaking — concept, production, post" },
  { icon: "🤖", label: "AIFA Workflow System", desc: "The exact AI tool stack and production process used by AFA members to ship real films" },
  { icon: "🏆", label: "AI Media Specialist Certificate", desc: "LinkedIn-ready certification that signals your skills to clients and employers" },
  { icon: "🎥", label: "Monthly 5-Hour GenJams", desc: "Live collaborative filmmaking sessions every month — the same experience you just had" },
  { icon: "👥", label: "Private Community", desc: "1,100+ active AI creators — get feedback, find collaborators, stay ahead of the tools" },
  { icon: "🔄", label: "Continuous Updates", desc: "New lessons and courses added monthly as AI tools evolve — never goes stale" },
];

// ─── Post-Payment Success ─────────────────────────────────────────────────────
function PaymentSuccess() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "520px", width: "100%", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "24px", padding: "clamp(2rem,5vw,3.5rem)", textAlign: "center" }}>
        <div style={{ fontSize: "4.5rem", marginBottom: "1.25rem" }}>🎬</div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,7vw,3.5rem)", color: "#fff", letterSpacing: "0.02em", marginBottom: "1rem", lineHeight: 1 }}>
          Welcome to the Academy.
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", lineHeight: 1.65, marginBottom: "2rem" }}>
          Your Machine Cinema Partner Rate membership is confirmed.{" "}
          <strong style={{ color: "#fff" }}>Check your inbox</strong> — your Skool invite is on its way within 15 minutes.
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.5rem", textAlign: "left" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>What happens next</p>
          {["You'll receive a Skool invite email within 15 minutes", "Accept the invite to access the full AI Film Academy community", "Your first monthly GenJam is already on the calendar", "Start with the AIFA Workflow System in the course library"].map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: i < 3 ? "0.85rem" : 0 }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "0.75rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{i + 1}</span>
              <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
          Questions? <a href="mailto:hello@aifilmacademy.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline" }}>hello@aifilmacademy.com</a>
        </p>
      </div>
    </div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ size = "lg" }: { size?: "lg" | "xl" }) {
  const pad = size === "xl" ? "22px 56px" : "18px 40px";
  const fs = size === "xl" ? "clamp(1.1rem,3vw,1.3rem)" : "clamp(1rem,2.5vw,1.1rem)";
  return (
    <a href={STRIPE_PAYMENT_LINK} style={{ display: "inline-block", background: "linear-gradient(135deg,#ef4444,#b91c1c)", borderRadius: "14px", padding: pad, color: "#fff", fontWeight: 800, fontSize: fs, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", boxShadow: "0 0 60px rgba(239,68,68,0.45)", transition: "transform 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 80px rgba(239,68,68,0.6)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(239,68,68,0.45)"; }}>
      Join at the Partner Rate — ${PARTNER_ANNUAL}/yr →
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GenJamOffer() {
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("payment") === "success") setIsSuccess(true);
  }, []);
  if (isSuccess) return <PaymentSuccess />;

  return (
    <div style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* ── SECTION 1: HERO ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(4rem,9vw,7rem) clamp(1.5rem,5vw,3rem) clamp(2rem,5vw,3rem)", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "clamp(0.8rem,2vw,0.95rem)", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "1.75rem" }}>
          Machine Cinema × AI Film Academy
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,11vw,7.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#F5F5F0", margin: "0 0 0.25rem" }}>
          Congratulations on
        </h1>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,11vw,7.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#ef4444", margin: "0 0 2.5rem" }}>
          Finishing a GenJam.
        </h1>
        <p style={{ fontSize: "clamp(1.1rem,3vw,1.45rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: "720px", margin: "0 auto" }}>
          You just experienced what it feels like to make AI films with a community behind you.
          Here's your exclusive offer to continue — and stay in the loop with monthly GenJam experiences.
        </p>
      </section>

      {/* ── SECTION 2: THE OFFER REVEAL ── */}
      <section style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #111 40%, #0A0A0A 100%)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(4rem,9vw,7rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          {/* Exclusive label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "100px", padding: "0.5rem 1.25rem", marginBottom: "2rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Exclusive to GenJam Alumni</span>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem,8vw,6rem)", lineHeight: 1, letterSpacing: "0.02em", color: "#F5F5F0", marginBottom: "1.5rem" }}>
            The Machine Cinema<br />
            <span style={{ color: "#ef4444" }}>Partner Rate</span>
          </h2>

          <p style={{ fontSize: "clamp(1.05rem,2.5vw,1.3rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 3rem" }}>
            This pricing tier is not available to the public. It exists only for people who have
            attended a GenJam and experienced the AFA methodology firsthand.{" "}
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>You've earned it.</strong>
          </p>

          <CTAButton size="xl" />
          <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            Secure checkout via Stripe. Skool invite delivered automatically after payment.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: WHAT'S INSIDE ── */}
      <section style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.04em", color: "#F5F5F0", textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)", lineHeight: 1 }}>
            Everything Included in Your Membership
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {INCLUDED.map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "clamp(1.25rem,3vw,1.75rem)", display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "#F5F5F0", marginBottom: "0.4rem", lineHeight: 1.2 }}>{item.label}</p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.55 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PRICING COMPARISON ── */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.04em", color: "#F5F5F0", textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)", lineHeight: 1 }}>
            Your Exclusive Rate
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {/* Public rate — muted */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(1.5rem,4vw,2.25rem)", opacity: 0.55 }}>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Public Rate</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,7vw,4rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1, marginBottom: "0.25rem", textDecoration: "line-through" }}>
                ${PUBLIC_MONTHLY}<span style={{ fontSize: "1.2rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>/mo</span>
              </p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>${PUBLIC_ANNUAL}/yr — and raising</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>Available to anyone who finds the community</p>
            </div>

            {/* Partner rate — highlighted */}
            <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(185,28,28,0.05) 100%)", border: "2px solid rgba(239,68,68,0.35)", borderRadius: "16px", padding: "clamp(1.5rem,4vw,2.25rem)", position: "relative", overflow: "hidden" }}>
              {/* Glow effect */}
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(239,68,68,0.12)", filter: "blur(40px)", pointerEvents: "none" }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.72rem", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Machine Cinema Partner Rate</p>
                <span style={{ background: "#ef4444", color: "#fff", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "100px" }}>Exclusive</span>
              </div>

              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,5rem)", color: "#fff", lineHeight: 1, marginBottom: "0.25rem" }}>
                ${PARTNER_ANNUAL}<span style={{ fontSize: "1.4rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>/yr</span>
              </p>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem" }}>
                Just <strong style={{ color: "#fff" }}>${PARTNER_MONTHLY_EQUIV}/month</strong> — save <strong style={{ color: "#ef4444" }}>${SAVINGS}/year</strong>
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Full access — no upsells, no paywalls", "Monthly GenJams included", "Renews annually at this rate", "Cancel anytime — no contracts"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <CTAButton size="lg" />
            </div>
          </div>

          {/* Savings callout */}
          <div style={{ marginTop: "1.5rem", textAlign: "center", padding: "1.25rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "12px" }}>
            <p style={{ fontSize: "clamp(0.95rem,2.5vw,1.1rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              At the public rate of <strong style={{ color: "rgba(255,255,255,0.8)" }}>${PUBLIC_MONTHLY}/month</strong>, you'd pay{" "}
              <strong style={{ color: "rgba(255,255,255,0.8)" }}>${PUBLIC_ANNUAL}/year</strong>. The Machine Cinema Partner Rate saves you{" "}
              <strong style={{ color: "#ef4444" }}>${SAVINGS} every year</strong> — locked in as long as you stay a member.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SCARCITY + FINAL CTA ── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.02em", color: "#F5F5F0", lineHeight: 1.05, marginBottom: "1.25rem" }}>
          This rate is only available<br />
          <span style={{ color: "#ef4444" }}>to GenJam alumni.</span>
        </h2>
        <p style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 2.5rem" }}>
          It will not be offered again at this price after this window closes. The next time someone joins AFA, they pay <strong style={{ color: "rgba(255,255,255,0.75)" }}>${PUBLIC_MONTHLY}/month</strong>.
        </p>
        <CTAButton size="xl" />
        <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
          Secure checkout via Stripe. Skool invite delivered automatically after payment.
        </p>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This offer is exclusively for Machine Cinema GenJam alumni.
        </p>
      </footer>
    </div>
  );
}
