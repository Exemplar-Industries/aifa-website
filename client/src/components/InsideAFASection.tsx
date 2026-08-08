/*
 * AI Film Academy — What's Inside Your Membership
 * Design: "The Director's Cut" — single-column dark card stack.
 * Purpose: Show every membership benefit clearly, matching the GenJam offer page card style.
 */

const INCLUDED = [
  { icon: "🎬", label: "Master AI Filmmaking in 30 Days", desc: "The complete AI filmmaking course — concept to final cut, updated August 2026" },
  { icon: "🤖", label: "AIFA Workflow System", desc: "The exact AI tool stack and production process used by AFA members to ship real films" },
  { icon: "🏆", label: "Industry Certification", desc: "LinkedIn-ready AI Media Specialist certification that signals your skills to clients and employers" },
  { icon: "🎥", label: "Monthly 5-Hour GenJams", desc: "Live collaborative filmmaking sessions every month — build a real film alongside the community" },
  { icon: "📋", label: "Weekly Creative Exercises", desc: "Structured weekly practice to build real skills and a portfolio you can show clients" },
  { icon: "🎤", label: "Personalized Video Feedback", desc: "Get your work reviewed with Loom feedback from instructors and working creators" },
  { icon: "💼", label: "Curated Job Listings", desc: "Hand-picked AI filmmaking opportunities, freelance gigs, and industry contests" },
  { icon: "👥", label: "Private Community", desc: "1,100+ active AI creators — get feedback, find collaborators, stay ahead of the tools" },
];

export default function InsideAFASection() {
  return (
    <section
      id="inside"
      className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 grain-overlay"
    >
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl">

          {/* Section heading */}
          <h2
            className="text-center text-[#F5F5F0] mb-10 md:mb-14"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem,6vw,3.2rem)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            What's Inside Your Membership
          </h2>

          {/* Single-column card stack */}
          <div className="flex flex-col gap-4">
            {INCLUDED.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "18px",
                  padding: "clamp(1.4rem,4vw,2rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "2.4rem", lineHeight: 1 }}>{item.icon}</span>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(1.05rem,3vw,1.2rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.9rem,2.2vw,1rem)",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: "480px",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
