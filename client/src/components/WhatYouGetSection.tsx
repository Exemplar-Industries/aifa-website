/*
 * WhatYouGetSection — Value stack breakdown
 * Design: "The Director's Cut" — dark cards, red accent numbers, staggered grid
 */

const SKOOL_URL = "https://www.skool.com/aifilmacademy";
const CERT_BADGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-cert-badge-WbXWXDQ3q6yeo59xfJsrEm.webp";

const features = [
  {
    tag: "CORE",
    icon: "🎬",
    title: "The AIFA Workflow System",
    value: "$297 value",
    description:
      "One proven, repeatable workflow for creating cinematic AI films — from concept to final export. No more tool chaos.",
  },
  {
    tag: "TRAINING",
    icon: "📚",
    title: "50+ Video Lessons",
    value: "$197 value",
    description:
      "Step-by-step tutorials covering Midjourney, Kling, Runway, Veo, CapCut, and more — updated as tools evolve.",
  },
  {
    tag: "AI TOOLS",
    icon: "🤖",
    title: "Custom AI Agents",
    value: "$79 value",
    description:
      "Personal AI assistants that help you prompt faster, fix errors, and generate better results — built specifically for the AIFA workflow.",
  },
  {
    tag: "COMMUNITY",
    icon: "👥",
    title: "Private Creator Community",
    value: "$97 value",
    description:
      "Connect with 1,100+ AI filmmakers. Share work, get feedback, find collaborators, and stay ahead of the curve.",
  },
  {
    tag: "TOOLS",
    icon: "🛠",
    title: "Curated AI Tool Stack",
    value: "$27 value",
    description:
      "We've tested hundreds of tools so you don't have to. Get the exact stack pros use — organized by use case and budget. Stop paying for tools you don't need.",
  },
  {
    tag: "CREDENTIAL",
    icon: "🏆",
    title: "LinkedIn Certification",
    value: "$497 value",
    description:
      "Earn a verifiable AI Filmmaker certification you can add to your LinkedIn profile and portfolio. Stand out in the market.",
  },
];

export default function WhatYouGetSection() {
  const totalValue = 1194;

  return (
    <section id="what-you-get" className="py-20 md:py-28 bg-[#0D0D0D]">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="section-label mb-5">What You Get</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
            }}
          >
            Everything You Need.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>
              Nothing You Don't.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The AI Film Academy is a complete system — not just a course. You get the workflow, the training, the community, and the credential. All included in one membership.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="afa-card rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="text-2xl">{feature.icon}</span>
                <span
                  className="label-tag"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}
                >
                  {feature.tag}
                </span>
              </div>
              <div>
                <h3
                  className="text-lg text-white font-semibold mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0" }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs text-white/35 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {feature.value}
                </p>
                <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Value summary + CTA */}
        <div className="mt-12 border border-white/10 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0A0A0A]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={CERT_BADGE}
              alt="Certified AI Filmmaker Badge"
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="text-white/50 text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Total value if purchased separately
              </p>
              <p
                className="stat-number text-4xl text-white/30 line-through"
              >
                ${totalValue}
              </p>
              <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your price today:
              </p>
              <p
                className="stat-number text-5xl"
                style={{ color: "oklch(0.48 0.22 25)" }}
              >
                $19/mo or $149/yr
              </p>
            </div>
          </div>
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary pulse-cta px-10 py-4 text-lg font-bold text-center shrink-0"
          >
            Get Instant Access
          </a>
        </div>
      </div>
    </section>
  );
}
