import PageMeta from "@/components/PageMeta";

const FORMATS = [
  ["GenJam", "A collaborative, deadline-driven creative session", "Participants use the current AI filmmaking process to make, share, and learn in the room. It is part workshop, part live creative challenge, and entirely designed for energy."],
  ["Workshop", "A practical upskilling experience for your team", "A guided session that brings AI from abstract possibility into the actual creative workflow, campaign work, production thinking, and decision-making your people face."],
  ["Keynote", "A future-facing talk that creates useful momentum", "A visually rich, strategically grounded presentation on creative AI, filmmaking, media, and the opportunities teams can use right now—not someday."],
];

const OUTCOMES = [
  ["01", "Shared language", "Give people a clear way to talk about creative AI beyond hype, fear, or disconnected tool demos."],
  ["02", "Real participation", "Move the room from watching to making through exercises that reveal how the process actually feels."],
  ["03", "Usable momentum", "Leave with concrete creative possibilities, a stronger point of view, and a next step that fits your organization."],
];

export default function EducationEvents() {
  return (
    <main style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="AI GenJams, Workshops & Keynotes | AI Film Academy"
        description="Bring practical creative-AI education to your organization through hands-on GenJams, workshops, and keynotes from AI Film Academy."
        path="/education-events"
      />
      <style>{`
        .education-format-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: rgba(255,255,255,.1); }
        .education-outcome-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; }
        .education-card { background: #101010; padding: 2rem; }
        @media (max-width: 760px) { .education-format-grid, .education-outcome-grid { grid-template-columns: 1fr; } .education-card { padding: 1.5rem; } }
      `}</style>

      <section style={{ position: "relative", padding: "clamp(6.5rem, 13vw, 10rem) 1.5rem 5rem", borderBottom: "1px solid rgba(255,255,255,.08)", background: "radial-gradient(ellipse at 10% 15%, rgba(182,28,28,.30), transparent 38%), radial-gradient(ellipse at 88% 75%, rgba(112,16,16,.22), transparent 34%), #080808" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <a href="/contact" style={{ color: "rgba(255,255,255,.45)", fontSize: ".82rem", textDecoration: "none" }}>← Contact AI Film Academy</a>
          <p style={{ color: "#ef4444", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".17em", textTransform: "uppercase", margin: "3rem 0 1.1rem" }}>Education experiences</p>
          <h1 style={{ maxWidth: "1060px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.2rem, 10vw, 9.4rem)", fontWeight: 400, letterSpacing: ".015em", lineHeight: ".82", margin: 0 }}>Give your people an AI experience they will <span style={{ color: "#ef4444" }}>actually use.</span></h1>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 640px) minmax(0, 1fr)", gap: "2rem", marginTop: "2rem", alignItems: "end" }}>
            <p style={{ color: "rgba(255,255,255,.64)", fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.72, margin: 0 }}>GenJams, hands-on workshops, and keynotes that turn creative AI from a spectator topic into a memorable, practical experience. Your audience does not just hear what is changing. They make with it.</p>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".82rem", lineHeight: 1.65, margin: 0 }}>Built for creative teams, universities, organizations, conferences, and brands that want their people to leave with more than a list of tools.</p>
          </div>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", marginTop: "2rem", padding: "0 1.45rem", borderRadius: "9px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontWeight: 800, fontSize: ".92rem", textDecoration: "none", boxShadow: "0 0 36px rgba(239,68,68,.25)" }}>Plan an education experience →</a>
          <p style={{ color: "rgba(255,255,255,.33)", fontSize: ".75rem", lineHeight: 1.55, marginTop: ".85rem" }}>Organizational education engagements begin at $5,000.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "4.75rem 1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".9rem" }}>Pick the format</p>
        <h2 style={{ maxWidth: "760px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5.8rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", margin: "0 0 2.2rem" }}>Built for the moment your audience needs to <span style={{ color: "#ef4444" }}>move.</span></h2>
        <div className="education-format-grid">
          {FORMATS.map(([title, subtitle, copy], index) => (
            <article key={title} className="education-card">
              <p style={{ color: "#ef4444", fontSize: ".75rem", fontWeight: 800, letterSpacing: ".12em", marginBottom: "3rem" }}>0{index + 1}</p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".88", marginBottom: ".8rem" }}>{title}</h3>
              <p style={{ color: "#F5F5F0", fontSize: ".94rem", fontWeight: 700, lineHeight: 1.5, marginBottom: ".95rem" }}>{subtitle}</p>
              <p style={{ color: "rgba(255,255,255,.51)", fontSize: ".9rem", lineHeight: 1.7, margin: 0 }}>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", background: "#0d0d0d", padding: "4.9rem 1.5rem" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, .9fr) minmax(0, 1.1fr)", gap: "clamp(2rem, 8vw, 7rem)", alignItems: "start", marginBottom: "3rem" }}>
            <div>
              <p style={{ color: "#f87171", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".9rem" }}>What people leave with</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 5.7vw, 5.5rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", margin: 0 }}>Less AI theater.<br />More <span style={{ color: "#ef4444" }}>creative confidence.</span></h2>
            </div>
            <p style={{ color: "rgba(255,255,255,.57)", fontSize: "1rem", lineHeight: 1.75, margin: 0 }}>The strongest learning experiences do not make everyone an expert in one afternoon. They help people understand what matters, use a meaningful process, and see a credible next step in their own work.</p>
          </div>
          <div className="education-outcome-grid">
            {OUTCOMES.map(([number, title, copy]) => (
              <article key={title} style={{ borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "1.15rem" }}>
                <p style={{ color: "#ef4444", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".12em", marginBottom: "1.8rem" }}>{number}</p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.05rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".95", marginBottom: ".8rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,.52)", fontSize: ".9rem", lineHeight: 1.68, margin: 0 }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, .95fr)", gap: "2px", background: "rgba(255,255,255,.1)" }}>
          <div style={{ padding: "clamp(2rem, 5vw, 4rem)", background: "#101010" }}>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1rem" }}>AIFA in the room</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 5.3vw, 5.2rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", marginBottom: "1.25rem" }}>The format should fit the <span style={{ color: "#ef4444" }}>room.</span></h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".98rem", lineHeight: 1.72, margin: 0 }}>AIFA shapes each engagement around the people, context, time available, and creative outcome. A conference keynote, a university studio session, and a team offsite can each be memorable—but they should not feel like the same deck in a different room.</p>
          </div>
          <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#050505" }}>
            <iframe src="https://www.youtube.com/embed/jtfgf685-7M" title="AIFA live creative AI training" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", background: "linear-gradient(145deg, rgba(119,17,17,.31), #080808 62%)", padding: "5.5rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#f87171", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".95rem" }}>Bring the experience to your people</p>
        <h2 style={{ maxWidth: "860px", margin: "0 auto 1.2rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 7vw, 6.5rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".86" }}>Make AI feel <span style={{ color: "#ef4444" }}>possible.</span></h2>
        <p style={{ maxWidth: "580px", color: "rgba(255,255,255,.56)", fontSize: "1rem", lineHeight: 1.7, margin: "0 auto 1.8rem" }}>Tell us about the people you are bringing together, what you want the moment to achieve, and when it needs to happen. We will help you shape the right format.</p>
        <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", padding: "0 1.45rem", borderRadius: "9px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontWeight: 800, fontSize: ".92rem", textDecoration: "none", boxShadow: "0 0 36px rgba(239,68,68,.25)" }}>Plan an education experience →</a>
      </section>
    </main>
  );
}
