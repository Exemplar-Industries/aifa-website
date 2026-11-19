/*
 * WhatYouGetSection — Value stack breakdown
 * Design: "The Director's Cut" — dark cards, red accent numbers, staggered grid
 */


import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";
const CERT_BADGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-cert-badge-WbXWXDQ3q6yeo59xfJsrEm.webp";

const features = [
  {
    tag: "CORE",
    icon: "🎬",
    title: "The AIFA Workflow System",
    description:
      "One proven, repeatable workflow for creating cinematic AI films, from concept to final export. No more tool chaos.",
  },
  {
    tag: "TRAINING",
    icon: "📚",
    title: "50+ Video Lessons",
    description:
      "Step-by-step tutorials covering Midjourney, Kling, Runway, Veo, CapCut, and more, updated as tools evolve.",
  },
  {
    tag: "AI TOOLS",
    icon: "🤖",
    title: "Custom AI Agents",
    description:
      "Personal AI assistants that help you prompt faster, fix errors, and generate better results, built specifically for the AIFA workflow.",
  },
  {
    tag: "COMMUNITY",
    icon: "👥",
    title: "Private Creator Community",
    description:
      "Share work, get feedback, find collaborators, and stay ahead of the curve.",
  },
  {
    tag: "TOOLS",
    icon: "🛠",
    title: "Curated AI Tool Stack",
    description:
      "We've tested hundreds of tools so you don't have to. Get the exact stack pros use, organized by use case. Skip the tools you do not need.",
  },
  {
    tag: "CREDENTIAL",
    icon: "🏆",
    title: "LinkedIn Certification",
    description:
      "Community members can earn a verifiable AI Filmmaker certification to add to a LinkedIn profile and portfolio.",
  },
];

export default function WhatYouGetSection() {
  const skoolUrl = useSkoolUrl();

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
            The AI Film Academy is a complete system. You get the workflow, the training, the community, and the credential. Joining is free.
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
                Community membership
              </p>
              <p
                className="stat-number text-5xl"
                style={{ color: "oklch(0.48 0.22 25)" }}
              >
                Free
              </p>
              <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Join on Skool.
              </p>
            </div>
          </div>
          <a
            href={skoolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary pulse-cta px-10 py-4 text-lg font-bold text-center shrink-0"
          >
            Join the community
          </a>
        </div>
      </div>
    </section>
  );
}
