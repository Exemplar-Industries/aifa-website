import PageMeta from "@/components/PageMeta";

const SERVICES = [
  ["Campaign films", "Launch films, brand stories, and paid creative that give an idea a visual world people remember."],
  ["Visual worlds", "Art direction, frames, motion, and a consistent visual system for a product, IP, or campaign."],
  ["Concept proof", "A sharp visual prototype that helps your team align before a bigger production commitment."],
];

const PROCESS = [
  ["Start with the brief", "We clarify the audience, outcome, references, format, and what the work needs to accomplish."],
  ["Direct the work", "We build the visual approach and direct every decision toward a clear creative standard."],
  ["Finish with purpose", "You receive polished assets built for the right platform, moment, and audience."],
];

export default function Productions() {
  return (
    <main className="offer-page" style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Done-for-You AI Film Production | AI Film Academy"
        description="Commission cinematic AI films, campaign creative, and visual concepts from AI Film Academy for launches, brands, agencies, and ambitious creative teams."
        path="/productions"
      />
      <style>{`
        .offer-page * { min-width: 0; }
        .offer-title, .offer-heading { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .015em; line-height: .86; text-transform: uppercase; }
        .offer-title { font-size: clamp(3.75rem, 8.2vw, 8.5rem); }
        .offer-title span, .offer-heading span { display: block; }
        .offer-title span { white-space: nowrap; }
        .offer-title span:last-child, .offer-heading span { color: #ef4444; }
        .offer-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; }
        .offer-card { border: 1px solid rgba(255,255,255,.18); border-radius: 8px; background: #111; padding: 1.35rem; }
        .offer-card h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.1rem, 3.2vw, 3rem); font-weight: 400; letter-spacing: .015em; line-height: .9; margin: 0 0 .8rem; text-transform: uppercase; }
        .offer-card p { color: rgba(255,255,255,.86); font-size: 1rem; line-height: 1.6; margin: 0; }
        .offer-process { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; margin-top: 2rem; }
        .offer-process article { border-top: 2px solid #ef4444; padding-top: 1rem; }
        .offer-process h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 400; letter-spacing: .015em; line-height: .9; margin: 0 0 .75rem; text-transform: uppercase; }
        .offer-process p { color: rgba(255,255,255,.86); font-size: 1rem; line-height: 1.6; margin: 0; }
        @media (max-width: 760px) {
          .offer-page section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .offer-title { font-size: clamp(3rem, 11.5vw, 4.5rem); }
          .offer-grid, .offer-process { grid-template-columns: 1fr; }
          .offer-card { padding: 1.15rem; }
        }
      `}</style>

      <section style={{ padding: "clamp(6.5rem, 12vw, 10rem) 1.5rem clamp(4rem, 8vw, 6.5rem)", background: "radial-gradient(ellipse at 88% 14%, rgba(190,24,24,.34), transparent 40%), #080808", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <a href="/contact" style={{ color: "#F5F5F0", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← Contact Us</a>
          <h1 className="offer-title" style={{ margin: "2.4rem 0 1.45rem" }}><span>Make the work</span><span>worth watching.</span></h1>
          <p style={{ maxWidth: "680px", color: "rgba(255,255,255,.88)", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.65, margin: 0 }}>AIFA creates cinematic AI films, campaign creative, and visual concepts for brands and teams that need more than a prompt experiment.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "56px", marginTop: "1.7rem", padding: "0 1.35rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none" }}>Start a production inquiry →</a>
          <p style={{ color: "rgba(255,255,255,.84)", fontSize: "1rem", lineHeight: 1.55, margin: "1rem 0 0" }}>Custom production engagements typically begin at $5,000.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <h2 className="offer-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: "0 0 1.5rem" }}>Strong ideas need <span>strong finishes.</span></h2>
        <div className="offer-grid">
          {SERVICES.map(([title, copy]) => <article key={title} className="offer-card"><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <a href="/showcase" style={{ display: "inline-block", color: "#f87171", fontSize: "1rem", fontWeight: 800, marginTop: "1.4rem", textDecoration: "none" }}>See selected work in the Showcase →</a>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(145deg, rgba(119,17,17,.25), #0b0b0b 65%)", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="offer-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: 0 }}>From brief to <span>finished film.</span></h2>
          <div className="offer-process">
            {PROCESS.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "56px", marginTop: "2rem", padding: "0 1.35rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none" }}>Tell us about the brief →</a>
        </div>
      </section>
    </main>
  );
}
