/*
 * AI Film Academy — Machine Cinema GenJam alumni page
 * Route: /genjam-offer
 * Purpose: Invite GenJam alumni to the free community on Skool.
 *
 * Structure:
 *   1. Hero
 *   2. Community showcase
 *   3. What's included
 *   4. Free join
 */
const SKOOL_COMMUNITY_URL = "https://www.skool.com/aifilmacademy/about";

const GENJAM_OFFER_CSS = `
  .genjam-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; }
  .genjam-stat { min-width: 0; }
  .genjam-pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .genjam-public-card, .genjam-partner-card { min-width: 0; }
  @media (max-width: 640px) {
    .genjam-stats { border-radius: 18px; }
    .genjam-stat { padding: 1.5rem 0.5rem !important; }
    .genjam-stat-number { font-size: 2.35rem !important; }
    .genjam-stat-label { font-size: 0.82rem !important; letter-spacing: 0.055em !important; line-height: 1.3 !important; }
    .genjam-pricing-grid { grid-template-columns: 1fr; gap: 1rem; }
    .genjam-partner-card { order: -1; }
    .genjam-public-card { opacity: 0.75 !important; }
  }
`;

const INCLUDED = [
  { icon: "🎬", label: "Master AI Filmmaking in 30 Days", desc: "The complete AI filmmaking course, from concept to final cut, updated August 2026" },
  { icon: "🤖", label: "AIFA Workflow System", desc: "The exact AI tool stack and production process used by AFA members to ship real films" },
  { icon: "🏆", label: "Industry Certification", desc: "LinkedIn-ready AI Media Specialist certification that signals your skills to clients and employers" },
  { icon: "🎥", label: "Monthly 5-Hour GenJams", desc: "Live collaborative filmmaking sessions every month, the same experience you just had" },
  { icon: "📋", label: "Weekly Creative Exercises", desc: "Structured weekly practice to build real skills and a portfolio you can show clients" },
  { icon: "🎤", label: "Personalized Video Feedback", desc: "Get your work reviewed with Loom feedback from instructors and working creators" },
  { icon: "💼", label: "Curated Job Listings", desc: "Hand-picked AI filmmaking opportunities, freelance gigs, and industry contests" },
  { icon: "👥", label: "Private Community", desc: "1,100+ community members. Get feedback, find collaborators, and keep up with the tools." },
];

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ size = "lg" }: { size?: "lg" | "xl" }) {
  const pad = size === "xl" ? "22px 56px" : "18px 40px";
  const fs = size === "xl" ? "clamp(1.1rem,3vw,1.3rem)" : "clamp(1rem,2.5vw,1.1rem)";
  return (
    <a href={SKOOL_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", background: "linear-gradient(135deg,#ef4444,#b91c1c)", borderRadius: "14px", padding: pad, color: "#fff", fontWeight: 800, fontSize: fs, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", boxShadow: "0 0 60px rgba(239,68,68,0.45)", transition: "transform 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 80px rgba(239,68,68,0.65)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(239,68,68,0.45)"; }}>
      Join the community
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GenJamOffer() {
  return (
    <div style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{GENJAM_OFFER_CSS}</style>

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
          The community is free to join. Keep going with the course, exercises, and GenJam sessions,
          plus job listings, certification, and new trainings.
        </p>
      </section>

      {/* ── SECTION 2: COMMUNITY SHOWCASE ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#111", padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem,8vw,5.5rem)", lineHeight: 1, letterSpacing: "0.02em", color: "#F5F5F0", marginBottom: "1.5rem" }}>
            As a GenJam Alumni,<br />
            <span style={{ color: "#ef4444" }}>You're Invited To An Exclusive Community.</span>
          </h2>

          {/* Big stats row */}
          <div className="genjam-stats" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden", marginBottom: "3rem" }}>
            {[
              { num: "1,100+", label: "Community members" },
              { num: "5.0★", label: "Google Rating", detail: "33 reviews" },
              { num: "30k+", label: "Learners in live education", detail: "trained" },
            ].map((s, i) => (
              <div key={i} className="genjam-stat" style={{ background: "rgba(255,255,255,0.03)", padding: "clamp(1.5rem,4vw,2.5rem) 1rem", textAlign: "center" }}>
                <p className="genjam-stat-number" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,7vw,4rem)", color: "#ef4444", lineHeight: 1, marginBottom: "0.55rem", textShadow: "0 0 40px rgba(239,68,68,0.3)" }}>{s.num}</p>
                <p className="genjam-stat-label" style={{ fontSize: "clamp(0.82rem,1.8vw,0.95rem)", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, margin: 0 }}>{s.label}</p>
                {s.detail && <p className="genjam-stat-label" style={{ fontSize: "clamp(0.72rem,1.5vw,0.82rem)", color: "rgba(255,255,255,0.52)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, margin: "0.22rem 0 0" }}>{s.detail}</p>}
              </div>
            ))}
          </div>

          {/* Skool community screenshot */}
          <div style={{ marginBottom: "3rem", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(239,68,68,0.08)" }}>
            <img
              src="/assets/skool_about_screenshot.png"
              alt="AI Film Academy community on Skool"
              style={{ width: "100%", display: "block" }}
            />
          </div>

          {/* What's inside heading */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: "0.04em", color: "#F5F5F0", textAlign: "center", marginBottom: "1.5rem", lineHeight: 1 }}>
            What's included
          </h3>

          {/* Benefits grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
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

      {/* ── SECTION 4: FREE JOIN ── */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <h2 id="join" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.04em", color: "#F5F5F0", marginBottom: "1rem", lineHeight: 1 }}>
            Free to Join
          </h2>
          <p style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: "0 auto 2rem" }}>
            The AI Film Academy community and course are free. GenJam alumni can join or request to join on Skool.
          </p>
          <CTAButton size="xl" />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>
          © 2026 AI Film Academy™ (AIFA). All rights reserved. The community is free to join.
        </p>
      </footer>
    </div>
  );
}
