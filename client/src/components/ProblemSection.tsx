/*
 * ProblemSection — Agitate the pain, then pivot to solution
 * Design: "The Director's Cut" — dark bg, asymmetric layout, red accents on pain points
 */

const painPoints = [
  "You've tried Runway, Kling, Pika, Sora, Veo, Midjourney — but nothing connects into a real workflow",
  "You spend more time researching tools than actually creating films",
  "Your AI-generated content looks amateur compared to what the pros are making",
  "You don't know which tools are worth your money and which are just hype",
  "You're creating in isolation with no community, no feedback, no direction",
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Problem */}
          <div>
            <div className="section-label mb-5">The Problem</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: "1",
                letterSpacing: "0.01em",
                color: "#F5F5F0",
              }}
            >
              AI Filmmaking Is
              <br />
              <span style={{ color: "oklch(0.48 0.22 25)" }}>
                Overwhelming.
              </span>
              <br />
              We Fixed That.
            </h2>
            <p className="mt-5 text-white/60 text-base leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The AI video space moves fast. New tools drop every week. Most creators are drowning in options — experimenting endlessly, getting nowhere. Sound familiar?
            </p>
          </div>

          {/* Right: Pain points */}
          <div className="flex flex-col gap-3">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="afa-card rounded-md p-4 flex items-start gap-4"
              >
                <span
                  className="shrink-0 mt-0.5"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "oklch(0.48 0.22 25)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-white/65 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
