/*
 * WorkflowSection — The 3-step AIFA workflow
 * Design: "The Director's Cut" — dark bg with workflow bg image, numbered steps
 */

import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";
const WORKFLOW_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-workflow-bg-6UmrxWz82CBtUXpwjvKm59.webp";
const TOOLS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-tools-bg-E2JfjK4Jy5LoG9XDfEifZ7.webp";


const steps = [
  {
    number: "01",
    title: "Learn the Stack",
    description:
      "Get the curated AI tool stack that pros actually use. No fluff, no hype — just the exact tools for image generation, video synthesis, audio, and editing that work together seamlessly.",
    tools: ["Midjourney", "Kling AI", "Runway", "Google Veo", "CapCut"],
  },
  {
    number: "02",
    title: "Master the Workflow",
    description:
      "Follow the AIFA Workflow System — a step-by-step process from concept to final cut. Every lesson builds on the last. You'll know exactly what to do and in what order.",
    tools: ["Storyboarding", "AI Image Gen", "Video Synthesis", "Sound Design", "Color Grade"],
  },
  {
    number: "03",
    title: "Get Certified & Get Paid",
    description:
      "Complete the curriculum, earn your LinkedIn certification, and join a community of working AI filmmakers. Use your new skills to land clients, grow your channel, or build your brand.",
    tools: ["LinkedIn Badge", "Portfolio Review", "Community Access", "Live Coaching", "Career Support"],
  },
];

export default function WorkflowSection() {
  const skoolUrl = useSkoolUrl();
  return (
    <section id="workflow" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${WORKFLOW_BG})`, opacity: 0.12 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <div className="section-label mb-5">The System</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
            }}
          >
            One Workflow.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>Three Steps.</span>
            <br />
            Infinite Films.
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-8 md:left-12 top-[5.5rem] bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, oklch(0.48 0.22 25 / 0.4), transparent)" }}
                />
              )}
              <div className="flex gap-6 md:gap-10 pb-12 md:pb-16">
                {/* Step number */}
                <div className="shrink-0">
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full border flex items-center justify-center"
                    style={{
                      borderColor: "oklch(0.48 0.22 25 / 0.5)",
                      background: "oklch(0.48 0.22 25 / 0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                        color: "oklch(0.48 0.22 25)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3 md:pt-5">
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                      lineHeight: "1",
                      letterSpacing: "0.02em",
                      color: "#F5F5F0",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-base leading-relaxed max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {step.description}
                  </p>
                  {/* Tool tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {step.tools.map((tool, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded text-xs border"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          borderColor: "oklch(0.22 0 0)",
                          color: "oklch(0.65 0 0)",
                          background: "oklch(0.12 0 0)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools showcase */}
        <div className="mt-8 rounded-xl overflow-hidden border border-white/8 relative">
          <img
            src={TOOLS_BG}
            alt="AI filmmaking tools interface"
            className="w-full h-48 md:h-72 object-cover"
            style={{ opacity: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p
                className="text-white font-semibold text-lg"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                The Complete AI Filmmaker's Toolkit
              </p>
              <p className="text-white/50 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Midjourney · Kling AI · Runway · Google Veo · CapCut · and more
              </p>
            </div>
            <a
              href={skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 text-sm font-semibold shrink-0"
            >
              Access the Stack →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
