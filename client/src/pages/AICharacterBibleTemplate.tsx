import { useState } from "react";
import { Link } from "wouter";

const red = "#C72E2E";
const dark = "#0A0A0A";
const panel = "#141414";
const border = "#343434";
const copy = "#F5F5F0";
const muted = "#C9C9C2";

const stageTitle = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "clamp(2.4rem, 5vw, 4.65rem)",
  letterSpacing: ".02em",
  lineHeight: 0.95,
  margin: 0,
};

const card = {
  background: panel,
  border: `1px solid ${border}`,
  borderRadius: "4px",
};

const characterBibleTemplate = `AIFA CHARACTER BIBLE\n\n01 / CHARACTER LOCK\nProject / character name:\nFace, hair, and distinguishing features:\nBody shape and proportions:\nWardrobe, colors, and recurring props:\nVisual style, materials, and texture:\n\n02 / REFERENCE PACK\nOriginal front-view reference:\nOriginal three-quarter-view reference:\nOriginal full-body reference:\nReference sheet filename or link:\n\n03 / FIXED DESCRIPTION\nWrite one reusable description using the character-lock details above:\n\n04 / CONTROLLED SHOT CHANGE\nShot number / reference asset:\nAction and expression:\nFraming and camera angle:\nSetting and lighting:\nStory-approved changes that must carry into the next shot:\n\n05 / BEFORE YOU GENERATE\n[ ] Face, hair, and distinguishing features match the references.\n[ ] Body proportions, wardrobe colors, and props stay consistent.\n[ ] Art style and texture match the surrounding shots.\n[ ] Intentional story changes carry through to the next shot.\n[ ] Hands, props, and visible details are usable at full size.\n\nSaved take / correction needed:`;

function NumberedStep({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <article style={{ ...card, padding: "clamp(1.3rem, 3vw, 2rem)" }}>
      <div style={{ alignItems: "center", display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <span style={{ alignItems: "center", background: red, borderRadius: "50%", color: copy, display: "inline-flex", fontFamily: "'JetBrains Mono', monospace", fontSize: ".8rem", fontWeight: 800, height: "2.35rem", justifyContent: "center", width: "2.35rem" }}>{number}</span>
        <h3 style={{ color: copy, fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: ".03em", lineHeight: 1, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </article>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "grid", gap: ".75rem", listStyle: "none", margin: "1.25rem 0 0", padding: 0 }}>
      {items.map((item) => (
        <li key={item} style={{ alignItems: "flex-start", color: copy, display: "flex", gap: ".75rem", lineHeight: 1.52 }}>
          <span aria-hidden="true" style={{ color: red, fontWeight: 900, marginTop: ".06rem" }}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AICharacterBibleTemplate() {
  const [copied, setCopied] = useState(false);

  async function copyTemplate() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(characterBibleTemplate);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = characterBibleTemplate;
        textarea.style.left = "-9999px";
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const copiedWithFallback = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!copiedWithFallback) throw new Error("Clipboard copy was unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      window.prompt("Copy this AIFA character bible template:", characterBibleTemplate);
    }
  }

  return (
    <main style={{ background: dark, color: copy, minHeight: "100vh", paddingTop: "4.5rem" }}>
      <section style={{ background: "radial-gradient(circle at 74% 18%, rgba(199,46,46,.30), transparent 34%), linear-gradient(180deg, #111 0%, #0A0A0A 100%)", borderBottom: `1px solid ${border}`, padding: "clamp(4.5rem, 9vw, 8rem) 1.5rem clamp(3.25rem, 7vw, 6rem)" }}>
        <div style={{ margin: "0 auto", maxWidth: "1160px" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 1.15rem" }}>AIFA CHARACTER BIBLE TEMPLATE</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8.4rem)", letterSpacing: ".015em", lineHeight: 0.82, margin: 0, maxWidth: "10.5ch", textTransform: "uppercase" }}>
            Lock the character.<br />Then direct the shot.
          </h1>
          <p style={{ color: muted, fontSize: "clamp(1.18rem, 2.2vw, 1.48rem)", lineHeight: 1.5, margin: "2rem 0 0", maxWidth: "760px" }}>
            Do not reinvent the person every time you make a frame. Use this character bible to define what must stay true, choose clean original references, and carry one controlled change into each shot.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2rem" }}>
            {["CHARACTER LOCK", "ORIGINAL REFERENCES", "CONTROLLED CHANGES", "FLOW READY"].map((label) => (
              <span key={label} style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".55rem .7rem" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: `1px solid ${border}`, padding: "1.1rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", margin: "0 auto", maxWidth: "1160px" }}>
          {[
            ["01", "DEFINE", "Make a source of truth for the character before you make coverage."],
            ["02", "PROTECT", "Keep the reference pack and fixed details available from shot to shot."],
            ["03", "DIRECT", "Change the action, framing, or light without changing who the character is."],
          ].map(([number, title, description]) => (
            <div key={number} style={{ alignItems: "center", display: "flex", gap: ".85rem" }}>
              <span style={{ color: red, fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", lineHeight: 1 }}>{number}</span>
              <div>
                <strong style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: ".94rem", letterSpacing: ".04em" }}>{title}</strong>
                <span style={{ color: muted, display: "block", fontSize: ".83rem", lineHeight: 1.35, marginTop: ".18rem" }}>{description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <article style={{ margin: "0 auto", maxWidth: "1160px", padding: "clamp(3.25rem, 7vw, 6rem) 1.5rem" }}>
        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>THE RULE</p>
          <h2 style={stageTitle}>A prompt cannot remember a person you never defined.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 0", maxWidth: "780px" }}>
            The character bible is not another place to write a long prompt. It is a compact set of decisions you can check against every image and every clip: the face, silhouette, wardrobe, key prop, materials, and visual logic that make the same person readable from one scene to the next.
          </p>
          <div style={{ ...card, borderLeft: `4px solid ${red}`, marginTop: "2rem", padding: "1.25rem 1.4rem" }}>
            <strong style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: ".8rem", letterSpacing: ".08em" }}>USE ORIGINAL CHARACTERS</strong>
            <p style={{ color: muted, lineHeight: 1.55, margin: ".55rem 0 0" }}>Build this around a character and reference assets you have the right to use. Do not base the sheet on a real person or a third-party property.</p>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>COPY THE TEMPLATE</p>
          <h2 style={stageTitle}>Define the person once.</h2>
          <p style={{ color: muted, fontSize: "1.15rem", lineHeight: 1.6, margin: "1.35rem 0 1.5rem", maxWidth: "760px" }}>
            Copy this into a Google Doc before you plan scenes or generate images. Keep it open beside your storyboard so you can compare every new decision with the character you already approved.
          </p>
          <div style={{ ...card, overflow: "hidden" }}>
            <div style={{ alignItems: "center", borderBottom: `1px solid ${border}`, display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", padding: "1rem 1.25rem" }}>
              <strong style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", letterSpacing: ".08em" }}>AIFA CHARACTER BIBLE STARTING TEMPLATE</strong>
              <button type="button" onClick={copyTemplate} style={{ background: copied ? "#F5F5F0" : red, border: "none", color: copied ? dark : copy, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", fontWeight: 900, letterSpacing: ".06em", padding: ".7rem .85rem" }}>
                {copied ? "COPIED" : "COPY TEMPLATE"}
              </button>
            </div>
            <div style={{ display: "grid", gap: "1rem", padding: "1.25rem" }}>
              {[
                ["01 / CHARACTER LOCK", "Project / character name; face, hair, distinguishing features; body shape; wardrobe, colors, recurring props; visual materials and texture."],
                ["02 / REFERENCE PACK", "Original front, three-quarter, and full-body references; the filename or link to the approved sheet."],
                ["03 / FIXED DESCRIPTION", "One reusable visual description built from the choices you already made. Do not rewrite the character from scratch per shot."],
                ["04 / CONTROLLED SHOT CHANGE", "Shot number; action and expression; framing and camera angle; setting and light; any story-approved change that must carry forward."],
                ["05 / BEFORE YOU GENERATE", "Check identity, proportions, wardrobe, props, art style, intentional changes, and visible details before you animate the shot."],
              ].map(([label, description], index) => (
                <div key={label} style={{ borderBottom: index === 4 ? "none" : `1px solid ${border}`, display: "grid", gap: ".4rem", paddingBottom: index === 4 ? 0 : ".9rem" }}>
                  <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", letterSpacing: ".04em" }}>{label}</strong>
                  <span style={{ color: muted, lineHeight: 1.55 }}>{description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>01 / BUILD THE REFERENCE PACK</p>
          <h2 style={stageTitle}>Give yourself something real to check.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            Before the character performs, make a clean reference sheet for the character and a separate world reference for the location. A reference pack gives you a visual source of truth; a prompt should direct the shot, not replace that source of truth.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="A" title="Build the character sheet">
              <Checklist items={[
                "Use a clear front view, three-quarter view, and full-body view of the same original design.",
                "Make the face, hair, wardrobe, silhouette, colors, and key prop easy to see.",
                "Keep the reference clean enough that a useful subject is obvious at a glance.",
              ]} />
            </NumberedStep>
            <NumberedStep number="B" title="Build the world separately">
              <Checklist items={[
                "Create one reference that establishes the place, palette, materials, atmosphere, and light logic.",
                "Keep unrelated people and accidental visual clutter out unless the story needs them.",
                "Name the reference assets so you can find the approved versions again during production.",
              ]} />
            </NumberedStep>
            <NumberedStep number="C" title="Write what cannot change">
              <Checklist items={[
                "Choose the details that make the character readable even at a new camera angle.",
                "Write one reusable description from those decisions.",
                "Keep the description specific enough to check, but leave the shot action and camera decision for the shot brief.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>02 / DIRECT THE CHANGE</p>
          <h2 style={stageTitle}>One shot should change one clear thing.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            When you move into Google Flow, bring the approved character and relevant world references into the clip as visual references where available. Then write the direction for this moment: the action, framing, camera movement, setting, light, and the one thing that is deliberately different. <a href="https://support.google.com/flow/answer/16353334?hl=en&co=GENIE.Platform%3DDesktop" rel="noreferrer" style={{ color: copy, textDecorationColor: red }} target="_blank">See Google’s current Flow reference guidance.</a>
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="1" title="Start from approved assets">
              <Checklist items={[
                "Bring in the same approved character reference for connected shots.",
                "Use the world reference that matches the planned scene.",
                "Use an approved frame from the preceding shot when it is the clearest continuity anchor.",
              ]} />
            </NumberedStep>
            <NumberedStep number="2" title="Give the clip one job">
              <Checklist items={[
                "State one readable character action and the emotional beat.",
                "State the framing and one camera move.",
                "Describe the light and setting without contradicting the approved visual references.",
              ]} />
            </NumberedStep>
            <NumberedStep number="3" title="Save the decision">
              <Checklist items={[
                "Choose the strongest usable take rather than keeping every variation.",
                "Save the shot with its number and the continuity problem it solved.",
                "Carry the approved decision forward before generating the next shot.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>BEFORE YOU ANIMATE</p>
          <h2 style={stageTitle}>Catch the mismatch before it reaches the edit.</h2>
          <div style={{ ...card, marginTop: "1.5rem", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(160px, 1fr) 2fr" }}>
              <strong style={{ borderBottom: `1px solid ${border}`, color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", padding: "1rem 1.2rem" }}>CHECK THIS</strong>
              <strong style={{ borderBottom: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", padding: "1rem 1.2rem" }}>IF IT IS WRONG, FIX THIS FIRST</strong>
              {[
                ["Face, hair, silhouette", "Return to the clean character sheet. Simplify the change you are asking the shot to make."],
                ["Wardrobe or key prop", "Attach the approved character reference again and name the detail in the controlled-change brief."],
                ["World, light, or texture", "Return to the world reference. Change the action, camera, or time only when the story calls for it."],
                ["The cut into the next shot", "Use the approved previous frame or plan a bridge shot before adding more random coverage."],
              ].flatMap(([problem, fix], index) => [
                <span key={`${problem}-problem`} style={{ borderBottom: index === 3 ? "none" : `1px solid ${border}`, color: copy, fontWeight: 700, lineHeight: 1.45, padding: "1rem 1.2rem" }}>{problem}</span>,
                <span key={`${problem}-fix`} style={{ borderBottom: index === 3 ? "none" : `1px solid ${border}`, color: muted, lineHeight: 1.45, padding: "1rem 1.2rem" }}>{fix}</span>,
              ])}
            </div>
          </div>
        </section>

        <section style={{ ...card, background: "linear-gradient(135deg, #1B1B1B, #101010)", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: 0 }}>NEXT: PLAN THE COVERAGE</p>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.2rem, 4vw, 3.65rem)", marginTop: ".7rem", maxWidth: "14ch" }}>Lock the character. Then make the sequence work.</h2>
          <p style={{ color: muted, fontSize: "1.08rem", lineHeight: 1.6, margin: "1rem 0 1.6rem", maxWidth: "680px" }}>
            The character bible protects the person. The storyboard decides what the audience sees. Then Google Flow footage and the final edit turn those decisions into a film.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".9rem" }}>
            <Link href="/resources/templates/ai-storyboard-template" className="btn-outline" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>BUILD THE SHOT LIST →</Link>
            <Link href="/resources/workflows/ai-character-consistency" className="btn-outline" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>KEEP CHARACTERS CONSISTENT →</Link>
            <Link href="/free-video-training" className="btn-primary" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>WATCH FREE TRAINING</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
