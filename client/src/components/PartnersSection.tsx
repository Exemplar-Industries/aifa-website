/*
 * PartnersSection — Trusted Partners / Ecosystem
 * Design: "The Director's Cut" — Cinematic Dark
 * Partners: Anthum.ai (AI creative platform) + Outskill (AI upskilling)
 */

const partners = [
  {
    name: "Anthum",
    logo: null,
    logoText: "Anthum",
    tagline: "Smarter creative built for growth",
    description: "AI-powered creative production platform connecting brands with top video creators. AIFA members get priority access.",
    url: "https://anthum.ai",
    badge: "Creative Partner",
  },
  {
    name: "Outskill",
    logo: null,
    logoText: "Outskill",
    tagline: "AI Upskilling for Modern Careers",
    description: "The world's leading AI upskilling platform — 10M+ learners across 160 countries. AIFA is the AI filmmaking track.",
    url: "https://www.outskill.com",
    badge: "Education Partner",
  },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-[#0D0D0D] border-t border-white/5">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-[0.25em] text-white/30 mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Ecosystem
          </p>
          <h2
            className="text-4xl md:text-5xl font-black uppercase leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
          >
            Trusted{" "}
            <span style={{ color: "oklch(0.48 0.22 25)" }}>Partners</span>
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-lg">
            We partner with the best platforms in AI to give AIFA members an unfair advantage.
          </p>
        </div>

        {/* Partner cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 border border-white/8 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              style={{ background: "oklch(0.12 0.005 285)" }}
            >
              {/* Subtle red glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, oklch(0.48 0.22 25 / 0.06), transparent 60%)" }}
              />

              {/* Badge */}
              <span
                className="inline-block text-xs uppercase tracking-widest px-2 py-1 mb-6"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "oklch(0.48 0.22 25)",
                  border: "1px solid oklch(0.48 0.22 25 / 0.4)",
                }}
              >
                {partner.badge}
              </span>

              {/* Logo / Name */}
              <div className="mb-3">
                <span
                  className="text-3xl font-black text-white group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  {partner.logoText}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-white/50 text-xs uppercase tracking-wider mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {partner.tagline}
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {partner.description}
              </p>

              {/* Link */}
              <span
                className="text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "oklch(0.48 0.22 25)",
                }}
              >
                Visit {partner.name}
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        {/* Partner inquiry */}
        <p className="mt-8 text-white/20 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Interested in partnering with AIFA?{" "}
          <a
            href="mailto:llcexemplar@gmail.com"
            className="underline hover:text-white/40 transition-colors"
          >
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  );
}
