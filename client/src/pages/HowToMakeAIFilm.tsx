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

export default function HowToMakeAIFilm() {
  return (
    <main style={{ background: dark, color: copy, minHeight: "100vh", paddingTop: "4.5rem" }}>
      <section style={{ background: "radial-gradient(circle at 76% 16%, rgba(199,46,46,.28), transparent 32%), linear-gradient(180deg, #111 0%, #0A0A0A 100%)", borderBottom: `1px solid ${border}`, padding: "clamp(4.5rem, 9vw, 8rem) 1.5rem clamp(3.25rem, 7vw, 6rem)" }}>
        <div style={{ margin: "0 auto", maxWidth: "1160px" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 1.15rem" }}>AIFA FILMMAKING FIELD GUIDE 01</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8.4rem)", letterSpacing: ".015em", lineHeight: 0.82, margin: 0, maxWidth: "12ch", textTransform: "uppercase" }}>
            Make an AI short film.<br />Actually finish it.
          </h1>
          <p style={{ color: muted, fontSize: "clamp(1.18rem, 2.2vw, 1.48rem)", lineHeight: 1.5, margin: "2rem 0 0", maxWidth: "720px" }}>
            The AIFA workflow is not “write a prompt and hope.” You build the film in three jobs: pre-production creates the plan, production turns the plan into footage, and post-production turns footage into a finished cut.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2rem" }}>
            {[
              "CHARACTER SHEET",
              "LOCATION DESIGN",
              "SHOT LIST",
              "GOOGLE FLOW FOOTAGE",
              "EDIT + SOUND + VOICEOVER",
            ].map((label) => (
              <span key={label} style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".55rem .7rem" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: `1px solid ${border}`, padding: "1.1rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", margin: "0 auto", maxWidth: "1160px" }}>
          {[
            ["01", "PRE-PRODUCTION", "Decide what the film is and build the assets that keep it coherent."],
            ["02", "PRODUCTION", "Turn reference art into deliberate shots and video footage."],
            ["03", "POST-PRODUCTION", "Edit the story, then build the sound, music, and voiceover around it."],
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
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>START WITH A REAL PROJECT</p>
          <h2 style={stageTitle}>Do not open Flow first.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 0", maxWidth: "760px" }}>
            Open a concept document first. For a first project, make a 30 to 60 second film with one clear turn. The goal is not a massive world. The goal is a short sequence you can actually direct, finish, and learn from.
          </p>
          <div style={{ ...card, marginTop: "2rem", overflow: "hidden" }}>
            <div style={{ borderBottom: `1px solid ${border}`, display: "grid", gridTemplateColumns: "minmax(90px, .6fr) 1.2fr 2fr", padding: "1rem 1.25rem" }}>
              <strong style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>BEAT</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>YOUR JOB</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>WHAT YOU WRITE</strong>
            </div>
            {[
              ["01", "Crisis + goal", "Who is the character, what do they need, and what is in their way?"],
              ["02", "Pressure", "What gets worse if the character does nothing?"],
              ["03", "Breaking point", "What choice or action forces the story forward?"],
              ["04", "Climax", "What is the visual moment the audience came to see?"],
              ["05", "Transformation", "What has changed in the final frame?"],
            ].map(([beat, job, prompt]) => (
              <div key={beat} style={{ borderBottom: `1px solid ${border}`, display: "grid", gap: ".75rem", gridTemplateColumns: "minmax(90px, .6fr) 1.2fr 2fr", padding: "1rem 1.25rem" }}>
                <span style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem" }}>{beat}</span>
                <strong style={{ fontSize: ".98rem" }}>{job}</strong>
                <span style={{ color: muted, fontSize: ".95rem", lineHeight: 1.45 }}>{prompt}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>01 / PRE-PRODUCTION</p>
          <h2 style={stageTitle}>Build the world before you animate it.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            This is where most of the work happens. Before you generate moving footage, you need a character reference, a location plan, and a shot list. These are not optional extras. They are the source of truth that lets every shot belong to the same film.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="A" title="Build the character sheet">
              <p style={{ color: muted, margin: 0 }}>Create one page that locks the choices you do not want the model to forget.</p>
              <Checklist items={[
                "Front, three-quarter, side, and back views of the character.",
                "Wardrobe, silhouette, color palette, accessories, age range, and key facial details.",
                "A short expression set: neutral, tension, reaction, and one story-specific emotion.",
                "A written master prompt that names the subject, action, environment, shot size, lens, lighting, and style.",
              ]} />
            </NumberedStep>
            <NumberedStep number="B" title="Design the locations">
              <p style={{ color: muted, margin: 0 }}>Treat every important location as a repeatable set, not a one-off pretty image.</p>
              <Checklist items={[
                "Create an establishing frame that tells us where we are.",
                "Create a performance frame where the character can actually move through the scene.",
                "Define the time of day, practical light sources, weather, palette, production design, and texture.",
                "Keep each location board next to the character sheet while you plan shots.",
              ]} />
            </NumberedStep>
            <NumberedStep number="C" title="Write the shot list">
              <p style={{ color: muted, margin: 0 }}>Turn the concept into six to ten shots for a short first film. Each shot must earn its place in the edit.</p>
              <Checklist items={[
                "Start with a wide shot that establishes the world and gives the audience orientation.",
                "Use medium shots for most performance and story information.",
                "Use close-ups only when you need emotion, a decision, or a detail to land.",
                "For every shot, write: image reference, framing, action, camera move, duration, and what it cuts to next.",
              ]} />
            </NumberedStep>
          </div>
          <div style={{ ...card, marginTop: "1.5rem", padding: "1.4rem" }}>
            <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".76rem", fontWeight: 800, letterSpacing: ".1em", margin: 0 }}>SHOT LIST EXAMPLE</p>
            <div style={{ marginTop: "1rem", overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", minWidth: "760px", width: "100%" }}>
                <thead>
                  <tr>{["#", "FRAMING", "WHAT HAPPENS", "REFERENCE", "CAMERA", "CUT TO"].map((heading) => <th key={heading} style={{ borderBottom: `1px solid ${border}`, color: muted, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", padding: ".65rem", textAlign: "left" }}>{heading}</th>)}</tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: ".72rem .65rem" }}>01</td><td>Wide</td><td>Character enters the location</td><td>Location board A</td><td>Locked or slow push-in</td><td>Medium performance shot</td></tr>
                  <tr><td style={{ padding: ".72rem .65rem" }}>02</td><td>Medium</td><td>Character notices the problem</td><td>Character sheet + location board A</td><td>Subtle push-in</td><td>Detail or reaction</td></tr>
                  <tr><td style={{ padding: ".72rem .65rem" }}>03</td><td>Close-up</td><td>Decision lands on the face or prop</td><td>Character expression reference</td><td>Minimal movement</td><td>Action shot</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ ...card, borderLeft: `4px solid ${red}`, marginTop: "1.5rem", padding: "1.2rem 1.35rem" }}>
            <strong style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", letterSpacing: ".08em" }}>NEXT FIELD GUIDE</strong>
            <p style={{ color: muted, lineHeight: 1.55, margin: ".55rem 0 0" }}>Your character sheet becomes useful only when you can carry it through the next scene. Use the character-consistency guide to build the reference pack, continuity brief, and approved-frame loop.</p>
            <Link href="/resources/workflows/ai-character-consistency" style={{ color: copy, display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: ".8rem", fontWeight: 800, letterSpacing: ".05em", marginTop: ".9rem", textDecorationColor: red }}>KEEP AI CHARACTERS CONSISTENT →</Link>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>02 / PRODUCTION</p>
          <h2 style={stageTitle}>Turn your art into footage.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            Google Flow is the production environment. Your job is to turn the character sheet, location design, and shot list into a sequence of usable video clips. Generate image references first, then use those decisions to make video. Do not ask one prompt to make your entire film.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="1" title="Create the hero frame">
              <p style={{ color: muted, margin: 0 }}>For each shot, start with the still image you want to animate. Match the character sheet, location board, framing, lighting, and lens choice before asking for motion.</p>
              <Checklist items={[
                "Use the same character and environment references repeatedly.",
                "Keep the action simple enough for one short clip.",
                "Generate two strong options for important shots instead of burning credits on endless variation.",
                "Reject frames that lose the character’s defining details, continuity, or lighting logic.",
              ]} />
            </NumberedStep>
            <NumberedStep number="2" title="Animate one shot">
              <p style={{ color: muted, margin: 0 }}>Bring the approved image into Google Flow and give the clip one clear job. A clean shot is easier to cut than a complicated shot that tries to do everything.</p>
              <Checklist items={[
                "Name the shot size: wide, medium, close-up, or detail.",
                "Name one character action and one camera movement, such as a slow push-in.",
                "Use the frame-based workflow when you need tighter control over composition and sequence.",
                "Use ingredient or reference-based workflows when you need the character and world choices to carry forward.",
              ]} />
            </NumberedStep>
            <NumberedStep number="3" title="Carry continuity forward">
              <p style={{ color: muted, margin: 0 }}>A good output creates the reference for the next output. Save the useful frame, then use it to keep the next shot from drifting away from the film.</p>
              <Checklist items={[
                "Save reference frames from your strongest outputs.",
                "Re-prompt the specific failure instead of restarting the whole scene.",
                "Reduce overly dynamic actions when a model starts breaking anatomy, hands, or motion.",
                "If a style swap changes the lighting or character, bring the reference back before moving on.",
              ]} />
            </NumberedStep>
          </div>
          <div style={{ ...card, borderLeft: `4px solid ${red}`, marginTop: "1.5rem", padding: "1.25rem 1.4rem" }}>
            <strong style={{ display: "block", fontSize: "1.1rem" }}>The practical production prompt structure</strong>
            <p style={{ color: muted, lineHeight: 1.55, margin: ".5rem 0 0" }}>
              <span style={{ color: copy }}>Subject + action + environment + shot size + lens + lighting + style.</span> Keep the shot brief enough to cut. The prompt is not the film. The shot list is the film.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>03 / POST-PRODUCTION</p>
          <h2 style={stageTitle}>Build the cut, then build the feeling.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            Production gives you raw footage. Post-production makes it a film. Bring the clips into CapCut or DaVinci Resolve, cut the story first, then add music, sound, and voiceover to support the pacing instead of hiding weak footage.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="A" title="Make the first cut">
              <Checklist items={[
                "Set the format before editing: 9:16 for vertical social work or 16:9 for a film or trailer.",
                "Use a 24 FPS timeline when you want a cinematic cadence.",
                "Place the strongest version of each planned shot on the timeline before adding effects.",
                "Cut on a story beat, an action, a camera change, or a sound cue. Do not leave every clip at full length.",
              ]} />
            </NumberedStep>
            <NumberedStep number="B" title="Control pacing">
              <Checklist items={[
                "Use the wide shot to orient the viewer, then move into medium and close shots as the story gets more specific.",
                "Remove dead frames, pauses, and transitions that stop the energy.",
                "Use camera-angle changes or motivated motion instead of relying on default blend transitions.",
                "Do not slow footage below 0.7x just to make it last longer. Generate or cut a better solution.",
              ]} />
            </NumberedStep>
            <NumberedStep number="C" title="Finish the sound">
              <Checklist items={[
                "Write or refine the final narration after the visual cut exists.",
                "Generate voiceover with ElevenLabs, then align it to the beat changes in the edit.",
                "Add music from a licensed source or a generated track, then make room for the voiceover.",
                "As a starting mix, keep the voice clearly above the music. Review the final result on speakers and headphones before export.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ ...card, background: "linear-gradient(135deg, #1B1B1B, #101010)", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: 0 }}>FINAL EXPORT CHECK</p>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.2rem, 4vw, 3.65rem)", marginTop: ".7rem" }}>Before you call it finished</h2>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: "1.5rem" }}>
            <Checklist items={[
              "The character looks like the same character across the cut.",
              "Every shot has a clear story job.",
              "The music supports the cut without swallowing the voiceover.",
            ]} />
            <Checklist items={[
              "The pacing gets to the point and does not stall on generated footage.",
              "You have watched the full cut, not just individual pretty clips.",
              "The final export is 1080p MP4 using H.264 and has a clear destination for publishing.",
            ]} />
          </div>
        </section>

        <section style={{ borderTop: `1px solid ${border}`, marginTop: "clamp(4rem, 8vw, 7rem)", paddingTop: "clamp(2.2rem, 5vw, 4rem)" }}>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.3rem, 5vw, 4.25rem)", maxWidth: "15ch" }}>Want help applying this to your own film?</h2>
          <p style={{ color: muted, fontSize: "1.14rem", lineHeight: 1.6, margin: "1rem 0 1.6rem", maxWidth: "680px" }}>
            Start with the free training for the workflow foundation. Then use the membership when you want feedback, live learning, and a system for finishing work instead of staying stuck in the tool loop.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".9rem" }}>
            <Link href="/free-video-training" className="btn-primary" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>WATCH FREE TRAINING</Link>
            <Link href="/membership" className="btn-outline" style={{ minHeight: "3.25rem", padding: ".75rem 1.2rem", textDecoration: "none" }}>EXPLORE MEMBERSHIP</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
