import { Link } from "wouter";

const red = "#C72E2E";
const dark = "#0A0A0A";
const panel = "#141414";
const border = "#343434";
const copy = "#F5F5F0";
const muted = "#C9C9C2";

const resources = [
  {
    number: "01",
    label: "START WITH THE FILM",
    title: "Make an AI short film. Actually finish it.",
    description: "Use AIFA’s full pre-production, production, and post-production workflow: define the character and location, make the shot plan, create footage in Google Flow, then cut the story, sound, music, and voiceover.",
    action: "MAKE THE FILM →",
    href: "/resources/workflows/how-to-make-an-ai-film",
    detail: "Character sheet · location design · Google Docs · Canva Whiteboard · Google Flow · edit",
  },
  {
    number: "02",
    label: "PLAN THE COVERAGE",
    title: "Build the shot list. Then make the film.",
    description: "Start with a small six-shot sequence in Google Docs. Make the camera decision, action, duration, and cut target clear before you generate images or open Google Flow.",
    action: "BUILD THE SHOT LIST →",
    href: "/resources/templates/ai-storyboard-template",
    detail: "Six shots · camera first · approved frames · Canva Whiteboard · one clear job per clip",
  },
  {
    number: "03",
    label: "PROTECT THE CONTINUITY",
    title: "Keep your AI character. The same person.",
    description: "Build clean character and world references, direct one intentional change per shot, and make a continuity pass before a beautiful clip enters the edit.",
    action: "KEEP CHARACTERS CONSISTENT →",
    href: "/resources/workflows/ai-character-consistency",
    detail: "Character sheet · world reference · Google Flow Ingredients · approved frames · continuity pass",
  },
];

export default function ResourceLibrary() {
  return (
    <main style={{ background: dark, color: copy, minHeight: "100vh", paddingTop: "4.5rem" }}>
      <section style={{ borderBottom: `1px solid ${border}`, overflow: "hidden", padding: "clamp(4.5rem, 10vw, 8.5rem) 1.5rem clamp(4rem, 8vw, 6.5rem)", position: "relative" }}>
        <div aria-hidden="true" style={{ background: "radial-gradient(circle, rgba(199,46,46,.28), transparent 68%)", height: "min(58vw, 720px)", opacity: .8, pointerEvents: "none", position: "absolute", right: "-12%", top: "-25%", width: "min(58vw, 720px)" }} />
        <div style={{ margin: "0 auto", maxWidth: "1160px", position: "relative" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 1.25rem" }}>AIFA FREE FILMMAKING RESOURCES</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.4rem, 11vw, 9.5rem)", letterSpacing: ".015em", lineHeight: .84, margin: 0, maxWidth: "10ch" }}>
            Build the plan.<br />Then make the film.
          </h1>
          <p style={{ color: muted, fontSize: "clamp(1.15rem, 2vw, 1.42rem)", lineHeight: 1.55, margin: "2rem 0 0", maxWidth: "42rem" }}>
            Start with the exact problem in front of you. These AIFA field guides give you a practical production system—not a pile of random prompts or another generic tool list.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2.15rem" }}>
            <span style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".65rem .75rem" }}>PRE-PRODUCTION</span>
            <span style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".65rem .75rem" }}>PRODUCTION</span>
            <span style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".65rem .75rem" }}>POST-PRODUCTION</span>
          </div>
        </div>
      </section>

      <section style={{ margin: "0 auto", maxWidth: "1160px", padding: "clamp(3.5rem, 7vw, 6rem) 1.5rem clamp(4rem, 8vw, 7rem)" }}>
        <div style={{ borderBottom: `1px solid ${border}`, display: "flex", gap: "1rem", justifyContent: "space-between", paddingBottom: "1.2rem" }}>
          <p style={{ color: muted, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", letterSpacing: ".08em", margin: 0 }}>THE WORKFLOW LIBRARY</p>
          <p style={{ color: muted, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", letterSpacing: ".08em", margin: 0 }}>START SMALL. FINISH SOMETHING.</p>
        </div>

        <div style={{ display: "grid", gap: "1.15rem", marginTop: "1.15rem" }}>
          {resources.map((resource) => (
            <article key={resource.href} style={{ background: panel, border: `1px solid ${border}`, borderLeft: `4px solid ${red}`, display: "grid", gap: "1.35rem", padding: "clamp(1.5rem, 3.5vw, 2.6rem)" }}>
              <div style={{ alignItems: "baseline", display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
                <span style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", fontWeight: 800 }}>{resource.number}</span>
                <span style={{ color: muted, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".1em" }}>{resource.label}</span>
              </div>
              <div style={{ display: "grid", gap: "1.15rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
                <div>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.2rem)", letterSpacing: ".02em", lineHeight: .92, margin: 0, maxWidth: "13ch" }}>{resource.title}</h2>
                  <p style={{ color: muted, fontSize: "1.05rem", lineHeight: 1.58, margin: "1.15rem 0 0", maxWidth: "39rem" }}>{resource.description}</p>
                </div>
                <div style={{ alignSelf: "end", display: "grid", gap: "1.1rem" }}>
                  <p style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", lineHeight: 1.7, margin: 0 }}>{resource.detail}</p>
                  <Link href={resource.href} style={{ alignItems: "center", background: red, color: copy, display: "inline-flex", fontSize: ".82rem", fontWeight: 900, justifyContent: "center", letterSpacing: ".08em", minHeight: "3.25rem", padding: ".8rem 1rem", textDecoration: "none", width: "fit-content" }}>
                    {resource.action}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: "#121212", borderTop: `1px solid ${border}`, padding: "clamp(3.5rem, 7vw, 6rem) 1.5rem" }}>
        <div style={{ margin: "0 auto", maxWidth: "1160px" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".76rem", fontWeight: 800, letterSpacing: ".12em", margin: 0 }}>WHEN YOU WANT FEEDBACK, NOT MORE TABS</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 6.25rem)", letterSpacing: ".02em", lineHeight: .86, margin: "1rem 0 0", maxWidth: "12ch" }}>Use the system. Then get the work seen.</h2>
          <p style={{ color: muted, fontSize: "1.12rem", lineHeight: 1.58, margin: "1.25rem 0 0", maxWidth: "42rem" }}>The free training gives you the foundation. The AIFA community gives you live learning, feedback, and a place to keep finishing projects.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".9rem", marginTop: "1.8rem" }}>
            <Link href="/free-video-training" style={{ alignItems: "center", background: red, color: copy, display: "inline-flex", fontSize: ".82rem", fontWeight: 900, justifyContent: "center", letterSpacing: ".08em", minHeight: "3.25rem", padding: ".8rem 1rem", textDecoration: "none" }}>WATCH FREE TRAINING</Link>
            <a href="https://www.skool.com/aifilmacademy/about" style={{ alignItems: "center", border: `1px solid ${copy}`, color: copy, display: "inline-flex", fontSize: ".82rem", fontWeight: 900, justifyContent: "center", letterSpacing: ".08em", minHeight: "3.25rem", padding: ".8rem 1rem", textDecoration: "none" }}>EXPLORE MEMBERSHIP</a>
          </div>
        </div>
      </section>
    </main>
  );
}
