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

const sixShotTemplate = `SHOT 01\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:\n\nSHOT 02\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:\n\nSHOT 03\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:\n\nSHOT 04\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:\n\nSHOT 05\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:\n\nSHOT 06\nCamera angle or movement:\nWhat the audience sees:\nImage reference:\nAction:\nHow long it needs to play:\nWhat it cuts to next:\nVoiceover / sound note, only if needed:`;

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

export default function AIStoryboardTemplate() {
  const [copied, setCopied] = useState(false);

  async function copyTemplate() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(sixShotTemplate);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = sixShotTemplate;
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
      window.prompt("Copy this six-shot template:", sixShotTemplate);
    }
  }

  return (
    <main style={{ background: dark, color: copy, minHeight: "100vh", paddingTop: "4.5rem" }}>
      <section style={{ background: "radial-gradient(circle at 74% 18%, rgba(199,46,46,.30), transparent 34%), linear-gradient(180deg, #111 0%, #0A0A0A 100%)", borderBottom: `1px solid ${border}`, padding: "clamp(4.5rem, 9vw, 8rem) 1.5rem clamp(3.25rem, 7vw, 6rem)" }}>
        <div style={{ margin: "0 auto", maxWidth: "1160px" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 1.15rem" }}>AIFA PRE-PRODUCTION TEMPLATE</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8.4rem)", letterSpacing: ".015em", lineHeight: 0.82, margin: 0, maxWidth: "11.5ch", textTransform: "uppercase" }}>
            Build the shot list.<br />Then make the film.
          </h1>
          <p style={{ color: muted, fontSize: "clamp(1.18rem, 2.2vw, 1.48rem)", lineHeight: 1.5, margin: "2rem 0 0", maxWidth: "760px" }}>
            A storyboard is not a collage of pretty images. It is the plan that tells you what the audience sees, where the camera goes, and what each shot cuts to before you create a second of Google Flow footage.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2rem" }}>
            {["GOOGLE DOCS", "SIX SHOTS", "CAMERA FIRST", "CANVA WHITEBOARD", "FLOW AFTER THE PLAN"].map((label) => (
              <span key={label} style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".55rem .7rem" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: `1px solid ${border}`, padding: "1.1rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", margin: "0 auto", maxWidth: "1160px" }}>
          {[
            ["01", "SCRIPT", "Know the scene and the turn before you ask for an image."],
            ["02", "SHOT LIST", "Make the sequence and camera decisions in Google Docs."],
            ["03", "BOARD", "Arrange approved frames in Canva Whiteboard before video."],
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
          <h2 style={stageTitle}>The prompt is not the film.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 0", maxWidth: "760px" }}>
            The shot list is the film. It gives every frame a job. Start with a small scene, decide what the audience needs to see, and find the holes while the project is still cheap to change. Do not open Google Flow until the sequence works on the page.
          </p>
          <div style={{ ...card, borderLeft: `4px solid ${red}`, marginTop: "2rem", padding: "1.25rem 1.4rem" }}>
            <strong style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: ".8rem", letterSpacing: ".08em" }}>START SMALL</strong>
            <p style={{ color: muted, lineHeight: 1.55, margin: ".55rem 0 0" }}>For a first 30 to 60 second concept, start with exactly six shots. You can grow the board to roughly 6 to 10 images when the story and pace actually need more coverage.</p>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>01 / GOOGLE DOCS</p>
          <h2 style={stageTitle}>Write the list before you generate anything.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            Paste the script or scene into a Google Doc. Read it line by line. Your first job is not to describe every pixel. Your job is to decide the order of information: where we are, what changes, what the character does, and what the audience needs to feel.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="A" title="Start every line with the camera">
              <p style={{ color: muted, margin: 0 }}>Do not begin with a paragraph of world-building. Begin with the camera angle or camera movement, then state what the audience sees.</p>
              <Checklist items={[
                "Use a wide shot to establish a place or isolate a character.",
                "Use medium coverage when the audience needs to read performance or action.",
                "Use a close-up or insert only when a face, object, or decision needs to land.",
                "Write the cut target so every shot leads somewhere instead of becoming a standalone image.",
              ]} />
            </NumberedStep>
            <NumberedStep number="B" title="Decide before you expand">
              <p style={{ color: muted, margin: 0 }}>Keep the first version rough. When the creative decisions are clear, use your prompt-expansion workflow to add image-generation detail. Do not outsource the story decision to the expansion tool.</p>
              <Checklist items={[
                "Lock the character and location references before you write detailed image prompts.",
                "Name one clear action per shot.",
                "Keep complicated action out of a single short clip if you need clean edits later.",
                "Add voiceover or sound notes only where they help you plan the final cut.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>COPY THE FORMAT</p>
          <h2 style={stageTitle}>Your first six shots.</h2>
          <p style={{ color: muted, fontSize: "1.15rem", lineHeight: 1.6, margin: "1.35rem 0 1.5rem", maxWidth: "760px" }}>
            Copy this into Google Docs. Fill the six boxes before you generate your storyboard images. If you cannot explain what a shot is doing, it probably does not belong in the cut yet.
          </p>
          <div style={{ ...card, overflow: "hidden" }}>
            <div style={{ alignItems: "center", borderBottom: `1px solid ${border}`, display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", padding: "1rem 1.25rem" }}>
              <strong style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", letterSpacing: ".08em" }}>AIFA SIX-SHOT STARTING TEMPLATE</strong>
              <button type="button" onClick={copyTemplate} style={{ background: copied ? "#F5F5F0" : red, border: "none", color: copied ? dark : copy, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", fontWeight: 900, letterSpacing: ".06em", padding: ".7rem .85rem" }}>
                {copied ? "COPIED" : "COPY TEMPLATE"}
              </button>
            </div>
            <div style={{ display: "grid", gap: "1rem", padding: "1.25rem" }}>
              {["Shot 01: [camera angle or movement] — [what the audience sees]", "Image reference: [character sheet, location board, or approved frame]", "Action: [one readable action]", "How long it needs to play: [short enough to cut]", "What it cuts to next: [the next piece of information]", "Voiceover / sound note: [only if needed]"].map((line, index) => (
                <div key={line} style={{ borderBottom: index === 5 ? "none" : `1px solid ${border}`, color: index === 0 ? copy : muted, fontFamily: "'JetBrains Mono', monospace", fontSize: ".86rem", lineHeight: 1.5, paddingBottom: index === 5 ? 0 : ".8rem" }}>{line}</div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>02 / CANVA WHITEBOARD</p>
          <h2 style={stageTitle}>Build the visual board after the decisions are made.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            Once you have generated approved image references, open Canva and choose <strong style={{ color: copy }}>Create → Whiteboard</strong>. Drag your images onto the infinite canvas. Use Auto-lineup to put them in story order. Now you can see the film before you make the footage.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="1" title="Put the approved frames in order">
              <Checklist items={[
                "Use the character sheet and world references to reject frames that do not belong to the same film.",
                "Place the establishing shot first, then arrange coverage around the turn in the scene.",
                "Keep the board in the order the audience will experience it, not the order you generated it.",
              ]} />
            </NumberedStep>
            <NumberedStep number="2" title="Review story flow, not image quality">
              <Checklist items={[
                "Can someone understand the scene with no explanation?",
                "Does each image reveal new information or repeat the shot before it?",
                "Is there a visible beginning, escalation, and ending?",
                "Would the cut still make sense before you add music, sound design, or voiceover?",
              ]} />
            </NumberedStep>
            <NumberedStep number="3" title="Move into production">
              <Checklist items={[
                "Take the approved frame, character reference, and exact shot decision into Google Flow.",
                "Give each video clip one job: one action and one camera move.",
                "Save the strongest output frame when it helps guide the next shot.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>WHEN THE BOARD IS NOT WORKING</p>
          <h2 style={stageTitle}>Fix the plan. Do not generate your way out of it.</h2>
          <div style={{ ...card, marginTop: "1.5rem", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(160px, 1fr) 2fr" }}>
              <strong style={{ borderBottom: `1px solid ${border}`, color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", padding: "1rem 1.2rem" }}>IF THIS HAPPENS</strong>
              <strong style={{ borderBottom: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", padding: "1rem 1.2rem" }}>DO THIS INSTEAD</strong>
              {[
                ["Every frame is pretty but nothing changes", "Remove repetitions and write the story turn. Make one shot establish, one shot apply pressure, and one shot land the result."],
                ["The board jumps between unrelated places", "Return to the location board. Add a transition shot or keep the scene in one clear environment."],
                ["The character changes from one image to the next", "Go back to the character sheet and use the approved frame as a reference before you animate anything."],
                ["You need more than ten images to explain one minute", "Your scene is probably doing too much. Cut it into a smaller beat before you make more coverage."],
              ].flatMap(([problem, fix], index) => [
                <span key={`${problem}-problem`} style={{ borderBottom: index === 3 ? "none" : `1px solid ${border}`, color: copy, fontWeight: 700, lineHeight: 1.45, padding: "1rem 1.2rem" }}>{problem}</span>,
                <span key={`${problem}-fix`} style={{ borderBottom: index === 3 ? "none" : `1px solid ${border}`, color: muted, lineHeight: 1.45, padding: "1rem 1.2rem" }}>{fix}</span>,
              ])}
            </div>
          </div>
        </section>

        <section style={{ ...card, background: "linear-gradient(135deg, #1B1B1B, #101010)", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: 0 }}>THE NEXT TWO PROBLEMS</p>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.2rem, 4vw, 3.65rem)", marginTop: ".7rem", maxWidth: "14ch" }}>Plan the shots. Then protect the film.</h2>
          <p style={{ color: muted, fontSize: "1.08rem", lineHeight: 1.6, margin: "1rem 0 1.6rem", maxWidth: "680px" }}>
            Your board becomes useful only when the character and world survive from shot to shot. Then the plan has to become a finished cut. Use these guides in that order.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".9rem" }}>
            <Link href="/resources/workflows/how-to-make-an-ai-film" className="btn-outline" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>MAKE THE FILM →</Link>
            <Link href="/resources/workflows/ai-character-consistency" className="btn-outline" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>KEEP CHARACTERS CONSISTENT →</Link>
            <Link href="/free-video-training" className="btn-primary" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>WATCH FREE TRAINING</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
