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

export default function CharacterConsistencyGuide() {
  return (
    <main style={{ background: dark, color: copy, minHeight: "100vh", paddingTop: "4.5rem" }}>
      <section style={{ background: "radial-gradient(circle at 76% 16%, rgba(199,46,46,.28), transparent 32%), linear-gradient(180deg, #111 0%, #0A0A0A 100%)", borderBottom: `1px solid ${border}`, padding: "clamp(4.5rem, 9vw, 8rem) 1.5rem clamp(3.25rem, 7vw, 6rem)" }}>
        <div style={{ margin: "0 auto", maxWidth: "1160px" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 1.15rem" }}>AIFA FILMMAKING FIELD GUIDE 02</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8.4rem)", letterSpacing: ".015em", lineHeight: 0.82, margin: 0, maxWidth: "13ch", textTransform: "uppercase" }}>
            Keep your AI character.<br />The same person.
          </h1>
          <p style={{ color: muted, fontSize: "clamp(1.18rem, 2.2vw, 1.48rem)", lineHeight: 1.5, margin: "2rem 0 0", maxWidth: "760px" }}>
            Character consistency is not a magic prompt. It is a production system: create a reference pack, carry it through every shot, change one story variable at a time, and reject anything that does not belong in the same film.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2rem" }}>
            {["CHARACTER BIBLE", "CLEAN INGREDIENTS", "WORLD REFERENCE", "APPROVED FRAMES", "CONTINUITY LOG"].map((label) => (
              <span key={label} style={{ border: `1px solid ${border}`, color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".08em", padding: ".55rem .7rem" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: `1px solid ${border}`, padding: "1.1rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", margin: "0 auto", maxWidth: "1160px" }}>
          {[
            ["01", "PRE-PRODUCTION", "Build the assets that define the person and their world."],
            ["02", "PRODUCTION", "Reference those assets while you direct one shot at a time."],
            ["03", "POST-PRODUCTION", "Check continuity before a beautiful clip gets into the cut."],
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
          <h2 style={stageTitle}>Do not rebuild the character every shot.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 0", maxWidth: "780px" }}>
            If every scene starts from a fresh text description, you are asking the model to remember details it cannot see. Build a small library of approved character and world references first. Those references become the source of truth for the film, not a prompt you rewrite from memory.
          </p>
          <div style={{ ...card, marginTop: "2rem", overflow: "hidden" }}>
            <div style={{ borderBottom: `1px solid ${border}`, display: "grid", gridTemplateColumns: "1fr 1.2fr 2fr", padding: "1rem 1.25rem" }}>
              <strong style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>ASSET</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>LOCK THIS</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>YOU MAY CHANGE THIS</strong>
            </div>
            {[
              ["Character sheet", "Face, hair, silhouette, wardrobe, key prop", "Expression, action, shot size"],
              ["World reference", "Location texture, palette, light logic, production design", "Camera position, time of day when planned"],
              ["Shot brief", "Who is in the shot and its story job", "One action or one camera move"],
              ["Approved frame", "The best continuity decision from the last shot", "The next beat in the story"],
            ].map(([asset, lock, change]) => (
              <div key={asset} style={{ borderBottom: `1px solid ${border}`, display: "grid", gap: ".75rem", gridTemplateColumns: "1fr 1.2fr 2fr", padding: "1rem 1.25rem" }}>
                <strong style={{ fontSize: ".95rem" }}>{asset}</strong>
                <span style={{ color: muted, fontSize: ".92rem", lineHeight: 1.45 }}>{lock}</span>
                <span style={{ color: muted, fontSize: ".92rem", lineHeight: 1.45 }}>{change}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>01 / PRE-PRODUCTION</p>
          <h2 style={stageTitle}>Build a character bible you can direct from.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            The point of the character sheet is not decoration. It lets you compare every new result to a defined person. Build the character and the world separately before asking them to perform together.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="A" title="Create the multi-view character sheet">
              <p style={{ color: muted, margin: 0 }}>Use a clean original character, not a real person or a third-party property. Give yourself multiple useful angles and a clear identity check.</p>
              <Checklist items={[
                "Front, three-quarter, profile, and back views of the same original character.",
                "Hair, face shape, wardrobe, silhouette, color decisions, and any key prop.",
                "A compact expression range: neutral, tension, reaction, and the emotion your story needs.",
                "Simple labels for the angles you will reference when planning coverage.",
              ]} />
            </NumberedStep>
            <NumberedStep number="B" title="Create the world reference">
              <p style={{ color: muted, margin: 0 }}>Consistency breaks when the character lands in a new visual universe every time. Build the set before you start coverage.</p>
              <Checklist items={[
                "One establishing image that defines the place, texture, mood, and light.",
                "One performance frame where the character can move and be photographed.",
                "A named palette, time of day, practical light source, and atmosphere.",
                "No unrelated people or background clutter in the reference unless it is intentional.",
              ]} />
            </NumberedStep>
            <NumberedStep number="C" title="Write the continuity brief">
              <p style={{ color: muted, margin: 0 }}>Before a shot is generated, write down the thing you are protecting and the one thing you are deliberately changing.</p>
              <Checklist items={[
                "The approved character and world reference names.",
                "The shot size, action, camera move, and story purpose.",
                "The identity detail that cannot drift in this shot.",
                "The next shot this one must cut into.",
              ]} />
            </NumberedStep>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>02 / PRODUCTION</p>
          <h2 style={stageTitle}>Direct one controlled change at a time.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            In Google Flow, keep the approved character and visual references available as Ingredients, then describe how they should be used in the shot. The tool works best when the visual inputs are clean and your prompt adds direction instead of contradicting them. <a href="https://support.google.com/flow/answer/16353334?hl=en&co=GENIE.Platform%3DDesktop" rel="noreferrer" style={{ color: copy, textDecorationColor: red }} target="_blank">See Google’s current Flow reference guidance.</a>
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <NumberedStep number="1" title="Add clean Ingredients">
              <p style={{ color: muted, margin: 0 }}>Bring in the approved character and relevant world reference. Keep the subject clear and remove unrelated details from the input wherever possible.</p>
              <Checklist items={[
                "Name project assets so you can find the same approved inputs again.",
                "Use the same character reference and key world reference across related shots.",
                "Use an approved frame from a previous shot when it is the best continuity anchor.",
                "Do not mix references with incompatible lighting, style, or extra characters by accident.",
              ]} />
            </NumberedStep>
            <NumberedStep number="2" title="Give the shot one job">
              <p style={{ color: muted, margin: 0 }}>The prompt is a direction for this shot, not a replacement for your production plan.</p>
              <Checklist items={[
                "State the shot framing and camera movement.",
                "State one character action and its emotional beat.",
                "State the approved location, light, and style without fighting the reference images.",
                "Keep the motion simple enough to evaluate and cut.",
              ]} />
            </NumberedStep>
            <NumberedStep number="3" title="Create coverage, then choose">
              <p style={{ color: muted, margin: 0 }}>For an important moment, explore a small set of camera treatments, select the strongest one, and carry that decision forward.</p>
              <Checklist items={[
                "Try a small coverage grid: wide, medium, close, and a detail or reverse angle.",
                "Choose the frame that best preserves the character and serves the edit.",
                "Save the approved result with the shot number and what it solves.",
                "If a result drifts, fix the reference decision first instead of generating endless random variations.",
              ]} />
            </NumberedStep>
          </div>
          <div style={{ ...card, borderLeft: `4px solid ${red}`, marginTop: "1.5rem", padding: "1.25rem 1.4rem" }}>
            <strong style={{ display: "block", fontSize: "1.1rem" }}>The continuity prompt structure</strong>
            <p style={{ color: muted, lineHeight: 1.55, margin: ".5rem 0 0" }}>
              <span style={{ color: copy }}>Approved character + approved world + framing + action + camera move + lighting + style.</span> The references define who and where. The prompt directs what happens now.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: "0 0 .75rem" }}>03 / POST-PRODUCTION</p>
          <h2 style={stageTitle}>Catch drift before it infects the edit.</h2>
          <p style={{ color: muted, fontSize: "1.2rem", lineHeight: 1.6, margin: "1.35rem 0 2rem", maxWidth: "780px" }}>
            A pretty frame is not automatically a usable frame. Before a shot reaches the timeline, compare it against the reference pack. The edit gets faster when you reject broken continuity before you build around it.
          </p>
          <div style={{ ...card, overflow: "hidden" }}>
            <div style={{ borderBottom: `1px solid ${border}`, display: "grid", gridTemplateColumns: "1fr 1.7fr 1.4fr", padding: "1rem 1.25rem" }}>
              <strong style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>CHECK</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>IF IT DRIFTS</strong>
              <strong style={{ color: copy, fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem" }}>FIX THE DECISION</strong>
            </div>
            {[
              ["Face or hair", "The person no longer reads as the same person.", "Return to the clean character sheet and simplify the shot change."],
              ["Wardrobe or prop", "A signature item disappears or changes shape.", "Keep the approved character reference attached and name the item in the brief."],
              ["World or light", "The location feels like a different project.", "Bring back the world reference and change only time, camera, or action."],
              ["Edit fit", "The shot cannot cut into its neighbor.", "Use the approved previous frame or plan a bridge shot with a clear camera transition."],
            ].map(([check, drift, fix]) => (
              <div key={check} style={{ borderBottom: `1px solid ${border}`, display: "grid", gap: ".75rem", gridTemplateColumns: "1fr 1.7fr 1.4fr", padding: "1rem 1.25rem" }}>
                <strong style={{ fontSize: ".95rem" }}>{check}</strong>
                <span style={{ color: muted, fontSize: ".92rem", lineHeight: 1.45 }}>{drift}</span>
                <span style={{ color: muted, fontSize: ".92rem", lineHeight: 1.45 }}>{fix}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...card, background: "linear-gradient(135deg, #1B1B1B, #101010)", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p style={{ color: red, fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", fontWeight: 800, letterSpacing: ".13em", margin: 0 }}>CONTINUITY PASS</p>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.2rem, 4vw, 3.65rem)", marginTop: ".7rem" }}>Before you add the shot to the cut</h2>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: "1.5rem" }}>
            <Checklist items={[
              "The character reads as the same person from the last usable shot.",
              "The wardrobe, key prop, and silhouette still support the story world.",
              "The location, light, and visual texture connect to the approved world reference.",
            ]} />
            <Checklist items={[
              "The action is simple enough to understand and cut.",
              "The shot either continues the previous frame or deliberately changes the coverage.",
              "You saved the chosen output as a new continuity reference for the next shot.",
            ]} />
          </div>
        </section>

        <section style={{ borderTop: `1px solid ${border}`, marginTop: "clamp(4rem, 8vw, 7rem)", paddingTop: "clamp(2.2rem, 5vw, 4rem)" }}>
          <h2 style={{ ...stageTitle, fontSize: "clamp(2.3rem, 5vw, 4.25rem)", maxWidth: "16ch" }}>Want help building a film that holds together?</h2>
          <p style={{ color: muted, fontSize: "1.14rem", lineHeight: 1.6, margin: "1rem 0 1.6rem", maxWidth: "680px" }}>
            Start with the free training for the complete AIFA workflow. Join the membership when you want feedback on the assets, coverage, and edit decisions that turn separate generations into a finished film.
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
