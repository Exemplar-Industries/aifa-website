/*
 * TrustedBySection — Compact "Trusted By" partner strip
 * Design: "The Director's Cut" — sits directly under FinalCTA / "The Decision"
 * Purpose: Last-second credibility before FAQ and Footer
 * Partners: Anthum (Creative Partner) + Outskill (Education Partner)
 */

const partners = [
  { name: "Anthum", badge: "Creative Partner", url: "https://anthum.ai" },
  { name: "Outskill", badge: "Education Partner", url: "https://www.outskill.com" },
];

export default function TrustedBySection() {
  return (
    <section
      className="py-12 border-t border-white/5"
      style={{ background: "#080808" }}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          {/* Label */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.25)",
            }}
          >
            Trusted By
          </p>

          {/* Partner logos */}
          <div className="flex flex-wrap items-center justify-center gap-10">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 transition-opacity opacity-40 hover:opacity-80"
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.6rem",
                    letterSpacing: "0.08em",
                    color: "#F5F5F0",
                    lineHeight: 1,
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.20 25)",
                  }}
                >
                  {p.badge}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
