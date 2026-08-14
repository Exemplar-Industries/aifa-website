import PageMeta from "@/components/PageMeta";

const SHOWCASE = [
  {
    tag: "Brand film",
    title: "AI-powered 3D character animation",
    description: "A cohesive character world and cinematic visual language created for work that needs to feel designed—not merely generated.",
    videoId: "bUFRQ5CrHBQ",
  },
  {
    tag: "Campaign creative",
    title: "Photorealistic AI advertising",
    description: "Premium image-making and motion direction for concepts, product stories, and brand campaigns with an ambitious visual point of view.",
    videoId: "zeLO8qGbEfk",
  },
];

const DELIVERABLES = [
  ["01", "Campaign films", "High-impact launch films, paid-social assets, brand stories, and advertising creative that makes an idea immediately easier to see."],
  ["02", "Visual worlds", "A stronger creative universe for an existing product, IP, or campaign—art direction, frames, motion, and a consistent aesthetic system."],
  ["03", "Concept proof", "A visual prototype that helps founders, agencies, and internal teams align around the creative before production gets expensive."],
];

const PROCESS = [
  ["Define", "We clarify the audience, commercial objective, creative references, format, and decisions that make the work matter."],
  ["Direct", "We develop the visual approach, use the right AI production tools, and direct the work toward a clear creative standard."],
  ["Deliver", "You receive finished, polished assets built for the platforms, launch moment, and attention your project deserves."],
];

export default function Productions() {
  return (
    <main style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Done-for-You AI Film Production | AI Film Academy"
        description="Commission cinematic AI films, campaign creative, and visual concepts from AI Film Academy for launches, brands, agencies, and ambitious creative teams."
        path="/productions"
      />
      <style>{`
        .production-reel { display: grid; grid-template-columns: 1.08fr .92fr; gap: 1px; background: rgba(255,255,255,.10); }
        .production-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,.1); }
        .production-process { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .production-card { background: #101010; padding: 2rem; }
        @media (max-width: 760px) { .production-reel, .production-services, .production-process { grid-template-columns: 1fr; } .production-card { padding: 1.5rem; } }
        @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
      `}</style>

      <section style={{ position: "relative", padding: "clamp(6.5rem, 13vw, 10rem) 1.5rem 5rem", borderBottom: "1px solid rgba(255,255,255,.08)", background: "radial-gradient(ellipse at 85% 15%, rgba(193,27,27,.32), transparent 38%), radial-gradient(ellipse at 7% 85%, rgba(116,16,16,.20), transparent 36%), #080808" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <a href="/contact" style={{ color: "rgba(255,255,255,.45)", fontSize: ".82rem", textDecoration: "none" }}>← Contact AI Film Academy</a>
          <p style={{ color: "#ef4444", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".17em", textTransform: "uppercase", margin: "3rem 0 1.1rem" }}>Done-for-you production</p>
          <h1 style={{ maxWidth: "1000px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.2rem, 10vw, 9.5rem)", fontWeight: 400, letterSpacing: ".015em", lineHeight: ".82", margin: 0 }}>Make the work people <span style={{ color: "#ef4444" }}>stop for.</span></h1>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 620px) minmax(0, 1fr)", gap: "2rem", marginTop: "2rem", alignItems: "end" }}>
            <p style={{ color: "rgba(255,255,255,.64)", fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.72, margin: 0 }}>AIFA creates cinematic AI films, campaign creative, and visual concepts for people who need more than a prompt experiment. We combine story, visual taste, and emerging production tools to make ambitious ideas feel real.</p>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".82rem", lineHeight: 1.65, margin: 0 }}>Best for brands, founders, agencies, and creative teams with a clear outcome, a real launch moment, and the appetite to make something distinct.</p>
          </div>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", marginTop: "2rem", padding: "0 1.45rem", borderRadius: "9px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontWeight: 800, fontSize: ".92rem", textDecoration: "none", boxShadow: "0 0 36px rgba(239,68,68,.25)" }}>Start a production inquiry →</a>
          <p style={{ color: "rgba(255,255,255,.33)", fontSize: ".75rem", lineHeight: 1.55, marginTop: ".85rem" }}>Custom production engagements begin at $5,000.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "4.75rem 1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".9rem" }}>Selected direction</p>
        <h2 style={{ maxWidth: "760px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5.9rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", margin: "0 0 2.2rem" }}>AI can make anything.<br />The point is to make something <span style={{ color: "#ef4444" }}>worth remembering.</span></h2>
        <div className="production-reel">
          {SHOWCASE.map((item) => (
            <article key={item.title} className="production-card" style={{ padding: 0 }}>
              <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", background: "#050505" }}>
                <iframe src={`https://www.youtube.com/embed/${item.videoId}`} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
              </div>
              <div style={{ padding: "1.55rem" }}>
                <p style={{ color: "#f87171", fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: ".8rem" }}>{item.tag}</p>
                <h3 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.15rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".95", marginBottom: ".85rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".9rem", lineHeight: 1.65, margin: 0 }}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", background: "#0d0d0d", padding: "4.75rem 1.5rem" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <p style={{ color: "#f87171", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".9rem" }}>What we make</p>
          <h2 style={{ maxWidth: "680px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5.6rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", margin: "0 0 2.25rem" }}>Built around the idea, not a <span style={{ color: "#ef4444" }}>template.</span></h2>
          <div className="production-services">
            {DELIVERABLES.map(([number, title, copy]) => (
              <article key={title} className="production-card">
                <p style={{ color: "#ef4444", fontSize: ".75rem", fontWeight: 800, letterSpacing: ".12em", marginBottom: "3.5rem" }}>{number}</p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.35rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".95", marginBottom: ".9rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,.52)", fontSize: ".92rem", lineHeight: 1.7, margin: 0 }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, .8fr) minmax(0, 1.2fr)", gap: "clamp(2rem, 8vw, 8rem)", alignItems: "start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".9rem" }}>How an engagement works</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 5.5vw, 5.4rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".87", margin: 0 }}>Good work begins with a good <span style={{ color: "#ef4444" }}>brief.</span></h2>
          </div>
          <div className="production-process">
            {PROCESS.map(([title, copy], index) => (
              <article key={title} style={{ borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "1.15rem" }}>
                <p style={{ color: "#ef4444", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".12em", marginBottom: "1.8rem" }}>0{index + 1}</p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".95", marginBottom: ".8rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,.52)", fontSize: ".9rem", lineHeight: 1.68, margin: 0 }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", background: "linear-gradient(145deg, rgba(119,17,17,.31), #080808 62%)", padding: "5.5rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#f87171", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".95rem" }}>Start the conversation</p>
        <h2 style={{ maxWidth: "820px", margin: "0 auto 1.2rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 7vw, 6.5rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".86" }}>If the work matters, <span style={{ color: "#ef4444" }}>let’s make it matter.</span></h2>
        <p style={{ maxWidth: "560px", color: "rgba(255,255,255,.56)", fontSize: "1rem", lineHeight: 1.7, margin: "0 auto 1.8rem" }}>Tell us where you are headed, what you need to accomplish, and the production you have in mind. We will point you to the smartest next step.</p>
        <a href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "54px", padding: "0 1.45rem", borderRadius: "9px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontWeight: 800, fontSize: ".92rem", textDecoration: "none", boxShadow: "0 0 36px rgba(239,68,68,.25)" }}>Start a production inquiry →</a>
      </section>
    </main>
  );
}
