import { Link } from "wouter";

const sectionLabelStyle = {
  color: "#FF3B5C",
  fontSize: ".78rem",
  fontWeight: 900,
  letterSpacing: ".12em",
  textTransform: "uppercase" as const,
};

const cardStyle = {
  background: "#fff",
  border: "3px solid #141B34",
  boxShadow: "6px 6px 0 #141B34",
  padding: "1.2rem",
};

export default function HowToMakeAIFilm() {
  return (
    <main style={{ background: "#FAF3E3", color: "#141B34", minHeight: "100vh", padding: "7.5rem 1.5rem 5rem" }}>
      <article style={{ margin: "0 auto", maxWidth: "900px" }}>
        <p style={sectionLabelStyle}>AI Film Academy Resource</p>
        <h1 style={{ fontSize: "clamp(2.65rem, 7vw, 5.6rem)", fontWeight: 900, letterSpacing: "-.055em", lineHeight: ".9", margin: ".75rem 0 1.5rem", maxWidth: "15ch" }}>
          How to Make an AI Short Film: A 3-Step Workflow
        </h1>
        <p style={{ fontSize: "clamp(1.1rem, 2.1vw, 1.42rem)", lineHeight: 1.5, margin: "0 0 2.2rem", maxWidth: "46rem" }}>
          A practical pre-production, production, and post-production process for creators who want to finish an AI short film instead of collecting disconnected generations.
        </p>

        <section style={{ ...cardStyle, background: "#CCFF33", marginBottom: "3.5rem" }}>
          <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: ".45rem" }}>The short version</strong>
          <p style={{ lineHeight: 1.55, margin: 0 }}>
            Build the story and references before you generate. Create one intentional shot at a time. Then finish a cut that gives the work a real beginning, middle, and end.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <p style={sectionLabelStyle}>Step 1</p>
          <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 3rem)", letterSpacing: "-.035em", lineHeight: 1, margin: ".55rem 0 1rem" }}>Pre-production: decide what the film is before you generate it.</h2>
          <p style={{ lineHeight: 1.65, maxWidth: "44rem" }}>
            Most AI short films lose their shape because generation starts before the creative decisions are made. Start by defining who is on screen, what changes, and why that change matters. Then decide the format, setting, wardrobe, mood, and visual references that each scene must follow.
          </p>
          <ol style={{ lineHeight: 1.75, maxWidth: "44rem", paddingLeft: "1.35rem" }}>
            <li>Write a one-sentence creative brief.</li>
            <li>Choose the format and where the finished film will be watched.</li>
            <li>Define the character, setting, wardrobe, mood, and visual references.</li>
            <li>Turn the idea into a short scene outline.</li>
            <li>Build a six to twelve shot plan before generating footage.</li>
          </ol>
          <div style={{ ...cardStyle, marginTop: "1.75rem" }}>
            <h3 style={{ fontSize: "1.25rem", margin: "0 0 .55rem" }}>Build a character reference first</h3>
            <p style={{ lineHeight: 1.55, margin: 0 }}>
              A character reference is the source of truth for a recurring person on screen. Record the silhouette, clothing, color choices, accessories, facial expressions, and useful angles. Keep it visible while you plan every shot.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <p style={sectionLabelStyle}>Step 2</p>
          <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 3rem)", letterSpacing: "-.035em", lineHeight: 1, margin: ".55rem 0 1rem" }}>Production: generate one intentional shot at a time.</h2>
          <p style={{ lineHeight: 1.65, maxWidth: "44rem" }}>
            Treat each generated clip as coverage for the edit. Give it a clear framing, defined subject, one action, a mood, and a point where it can cut to the next moment. Google Flow can be a useful production environment when its current features fit the job, but the directing decisions stay the same even as tools change.
          </p>
          <p style={{ lineHeight: 1.65, maxWidth: "44rem" }}>
            Keep your character and world references close. If a shot fails, diagnose the specific problem. Is the framing wrong? Did the character lose a defining detail? Is too much action happening inside one clip? Simplify the instruction or revise the shot plan before generating more options.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <p style={sectionLabelStyle}>Step 3</p>
          <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 3rem)", letterSpacing: "-.035em", lineHeight: 1, margin: ".55rem 0 1rem" }}>Post-production: finish a cut, not a folder of clips.</h2>
          <p style={{ lineHeight: 1.65, maxWidth: "44rem" }}>
            A film becomes a film in the edit. Select the shots that serve the story, assemble a first version, and then improve the pacing, sound, and transitions. A completed version gives you something to review, a portfolio artifact to improve, and a clearer directing instinct for the next project.
          </p>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", marginTop: "1.75rem" }}>
            {[
              ["Select", "Choose the clip that communicates the moment most clearly."],
              ["Cut", "Build a coherent sequence instead of keeping every impressive generation."],
              ["Finish", "Use sound, music, and transitions with a clear purpose."],
            ].map(([title, copy]) => (
              <div key={title} style={cardStyle}>
                <h3 style={{ fontSize: "1.15rem", margin: "0 0 .5rem" }}>{title}</h3>
                <p style={{ lineHeight: 1.5, margin: 0 }}>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...cardStyle, background: "#FF3B5C", color: "#FAF3E3", marginBottom: "3.5rem" }}>
          <p style={{ fontWeight: 900, margin: "0 0 .55rem", textTransform: "uppercase", letterSpacing: ".09em" }}>A first-film checklist</p>
          <ul style={{ lineHeight: 1.7, margin: 0, paddingLeft: "1.25rem" }}>
            <li>You can state the story in one sentence.</li>
            <li>You have a short list of the shots the story actually needs.</li>
            <li>Each shot has a clear job and a reference to follow.</li>
            <li>You have selected the strongest clips and exported a version to review.</li>
          </ul>
        </section>

        <section style={{ borderTop: "3px solid #141B34", paddingTop: "2rem" }}>
          <h2 style={{ fontSize: "clamp(1.65rem, 3vw, 2.35rem)", letterSpacing: "-.03em", lineHeight: 1, margin: "0 0 .8rem" }}>Want the guided version?</h2>
          <p style={{ lineHeight: 1.65, margin: "0 0 1.25rem", maxWidth: "42rem" }}>
            Start with the free AI filmmaking training to apply the workflow with a clearer creative process, then explore the AIFA membership when you want feedback and a structured learning environment.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
            <Link href="/free-video-training" style={{ background: "#141B34", border: "3px solid #141B34", boxShadow: "4px 4px 0 #FF3B5C", color: "#FAF3E3", fontSize: ".82rem", fontWeight: 900, letterSpacing: ".08em", padding: ".82rem 1rem", textDecoration: "none" }}>WATCH FREE TRAINING</Link>
            <Link href="/membership" style={{ background: "transparent", border: "3px solid #141B34", color: "#141B34", fontSize: ".82rem", fontWeight: 900, letterSpacing: ".08em", padding: ".82rem 1rem", textDecoration: "none" }}>EXPLORE MEMBERSHIP</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
