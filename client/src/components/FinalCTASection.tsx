/*
 * FinalCTASection — Last chance conversion push
 * Design: "The Director's Cut" — full-bleed dark section, massive headline, single CTA
 */

import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-hero-bg-kCkktLY3hquHjRqwTxUHRg.webp";

export default function FinalCTASection() {
  const skoolUrl = useSkoolUrl();
  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      {/* Red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.48 0.22 25 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 text-center">
        <div className="section-label mb-6 justify-center">
          The Decision
        </div>

        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: "0.95",
            letterSpacing: "0.01em",
            color: "#F5F5F0",
          }}
        >
          The AI Film Revolution
          <br />
          Is Happening{" "}
          <span style={{ color: "oklch(0.48 0.22 25)" }}>Right Now.</span>
          <br />
          Are You In?
        </h2>

        <p
          className="mt-8 text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Every week you wait is a week your competitors are getting ahead. For $19/month — or just $149/year — you get the workflow, the tools, the community, and the certification to become a professional AI filmmaker.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={skoolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary pulse-cta px-12 py-5 text-xl font-bold"
          >
            Join the Academy — From $19/mo
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[
            "Cancel anytime",
            "Instant access",
            "1,100+ members",
            "Google Certified Educator",
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
