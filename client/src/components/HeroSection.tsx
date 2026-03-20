/*
 * HeroSection — Full-screen cinematic hero
 * Design: "The Director's Cut" — dark bg, oversized headline, video placeholder, red CTA
 * Goal: Immediate conversion impulse — headline + CTA above the fold
 */

const SKOOL_URL = "https://www.skool.com/aifilmacademy";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-hero-bg-kCkktLY3hquHjRqwTxUHRg.webp";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay"
      style={{
        background: `linear-gradient(135deg, #0A0A0A 0%, #0F0A0A 40%, #150808 100%)`,
      }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.18,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />

      {/* Red accent glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 100%, oklch(0.48 0.22 25 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="section-label mb-6 animate-fade-up">
            The Professional Standard for AI Video
          </div>

          {/* Main headline */}
          <h1
            className="animate-fade-up-delay-1"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              lineHeight: "0.95",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            Master AI Filmmaking.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>
              Upgrade Your Career.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed animate-fade-up-delay-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Stop drowning in 12 different tools. Get{" "}
            <strong className="text-white/90">one clear workflow</strong>, a
            proven tech stack, and a{" "}
            <strong className="text-white/90">LinkedIn certification</strong> —
            all for less than a Netflix subscription.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up-delay-3">
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary pulse-cta px-8 py-4 text-lg font-bold text-center"
              style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}
            >
              Join the Academy — $19/mo
            </a>
            <a
              href="#what-you-get"
              className="btn-outline px-8 py-4 text-base font-semibold text-center"
            >
              See What's Inside
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 animate-fade-up-delay-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="flex items-center gap-2 text-sm text-white/50">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              1,100+ active creators
            </span>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Google Certified AI Educator
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}
