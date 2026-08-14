import PageMeta from "@/components/PageMeta";

const FORMATS = [
  ["GenJam", "A live creative challenge where people make, share, and learn together."],
  ["Workshop", "A practical session that brings AI into your team’s real creative workflow."],
  ["Keynote", "A focused talk that gives your room a useful point of view and a clear next step."],
];

const OUTCOMES = [
  ["Shared language", "A practical way to talk about creative AI beyond hype, fear, or disconnected tool demos."],
  ["Real participation", "Exercises that move people from watching to making and reveal what the process feels like."],
  ["Useful momentum", "A stronger creative point of view and a next step that fits the work your organization actually does."],
];

export default function EducationEvents() {
  return (
    <main className="education-page" style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="AI GenJams, Workshops & Keynotes | AI Film Academy"
        description="Bring practical creative-AI education to your organization through hands-on GenJams, workshops, and keynotes from AI Film Academy."
        path="/education-events"
      />
      <style>{`
        .education-page * { min-width: 0; }
        .education-title, .education-heading { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .015em; line-height: .86; text-transform: uppercase; }
        .education-title { font-size: clamp(3.75rem, 8vw, 8.25rem); }
        .education-title span, .education-heading span { display: block; }
        .education-title span { white-space: nowrap; }
        .education-title span:last-child, .education-heading span { color: #ef4444; }
        .education-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; }
        .education-card { border: 1px solid rgba(255,255,255,.18); border-radius: 8px; background: #111; padding: 1.35rem; }
        .education-card h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.1rem, 3.2vw, 3rem); font-weight: 400; letter-spacing: .015em; line-height: .9; margin: 0 0 .8rem; text-transform: uppercase; }
        .education-card p { color: rgba(255,255,255,.86); font-size: 1rem; line-height: 1.6; margin: 0; }
        .education-outcomes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; margin-top: 2rem; }
        .education-outcomes article { border-top: 2px solid #ef4444; padding-top: 1rem; }
        .education-outcomes h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 400; letter-spacing: .015em; line-height: .9; margin: 0 0 .75rem; text-transform: uppercase; }
        .education-outcomes p { color: rgba(255,255,255,.86); font-size: 1rem; line-height: 1.6; margin: 0; }
        @media (max-width: 760px) {
          .education-page section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .education-title { font-size: clamp(2.9rem, 10.6vw, 4.2rem); }
          .education-grid, .education-outcomes { grid-template-columns: 1fr; }
          .education-card { padding: 1.15rem; }
        }
      `}</style>

      <section style={{ padding: "clamp(6.5rem, 12vw, 10rem) 1.5rem clamp(4rem, 8vw, 6.5rem)", background: "radial-gradient(ellipse at 10% 15%, rgba(182,28,28,.32), transparent 38%), #080808", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <a href="/contact" style={{ color: "#F5F5F0", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← Contact Us</a>
          <h1 className="education-title" style={{ margin: "2.4rem 0 1.45rem" }}><span>Make AI feel</span><span>useful in the room.</span></h1>
          <p style={{ maxWidth: "700px", color: "rgba(255,255,255,.88)", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.65, margin: 0 }}>GenJams, workshops, and keynotes that help people make with creative AI instead of simply hearing about it.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "56px", marginTop: "1.7rem", padding: "0 1.35rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none" }}>Plan a Gen AI workshop →</a>
          <p style={{ color: "rgba(255,255,255,.84)", fontSize: "1rem", lineHeight: 1.55, margin: "1rem 0 0" }}>Organizational education engagements typically begin at $5,000.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <h2 className="education-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: "0 0 1.5rem" }}>Choose the right <span>way to make.</span></h2>
        <div className="education-grid">
          {FORMATS.map(([title, copy]) => <article key={title} className="education-card"><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(145deg, rgba(119,17,17,.25), #0b0b0b 65%)", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="education-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: 0 }}>Leave with more <span>than a tool list.</span></h2>
          <div className="education-outcomes">
            {OUTCOMES.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "56px", marginTop: "2rem", padding: "0 1.35rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none" }}>Tell us about your team →</a>
        </div>
      </section>
    </main>
  );
}
