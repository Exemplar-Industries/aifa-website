/*
 * PricingSection — Free community join block.
 * The old monthly and annual prices have been removed.
 */
import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";

const included = [
  "Video lessons, updated as the tools change",
  "The AIFA Workflow System",
  "Curated AI tool stack guide",
  "Community feedback and events",
  "Certification for community members",
  "Free to join on Skool",
];

export default function PricingSection() {
  const skoolUrl = useSkoolUrl();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <div className="section-label mb-5">Community</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
            }}
          >
            Free to Join.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>
              Everything Included.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The AI Film Academy community and course are free to join on Skool. The lessons, feedback, events, and certification are included.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div
            className="rounded-xl p-8 border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.12 0 0) 0%, oklch(0.10 0.01 25) 100%)",
              borderColor: "oklch(0.48 0.22 25 / 0.5)",
            }}
          >
            <div className="mb-6">
              <p className="text-white/40 text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Community membership
              </p>
              <div className="flex items-end gap-2">
                <span
                  className="stat-number"
                  style={{
                    fontSize: "5rem",
                    lineHeight: "1",
                    color: "#F5F5F0",
                  }}
                >
                  Free
                </span>
              </div>
              <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Join or request to join on Skool.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.48 0.22 25)" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/75" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary pulse-cta w-full py-4 text-lg font-bold text-center block"
            >
              Join the community
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="afa-card rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What you get
              </h3>
              <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A clear workflow, practice, feedback, and a place to finish films with other creators. Join on Skool, then come back to the site for the free training and resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
