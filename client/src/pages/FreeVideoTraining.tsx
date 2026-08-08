/*
 * AI Film Academy — Free Video Training
 * Route: /free-video-training
 *
 * Structure (Kristen Lumiere model — 4 sections max, massive text, minimal copy):
 *   SECTION 1 — Hero: Big headline + photo + CTA button (no form yet)
 *   SECTION 2 — Who This Is For: 3 bold checkmarks + CTA
 *   SECTION 3 — 3 Secrets: Title + one line each + CTA
 *   SECTION 4 — Hi I'm Brandon + Registration Form
 *
 * Rules:
 *   - NO pricing
 *   - NO value stack
 *   - NO walls of paragraph text
 *   - Every headline is HUGE
 *   - Max 1-2 sentences of body copy per item
 *   - About Brandon is LAST (Kristen model)
 */

import { useState, useCallback } from "react";

const FORM_WEBHOOK_URL = "";

type FormState = "idle" | "loading" | "success" | "error";

function scrollToForm() {
  document.getElementById("fvt-form")?.scrollIntoView({ behavior: "smooth" });
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick || scrollToForm}
      style={{
        background: "#c8102e",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "18px 48px",
        fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
        fontWeight: 900,
        cursor: "pointer",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {text}
    </button>
  );
}

// ─── SECTION 1: Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ background: "#080808" }}>
      {/* Eyebrow bar */}
      <div
        style={{
          background: "#c8102e",
          textAlign: "center",
          padding: "10px 16px",
          color: "#fff",
          fontWeight: 800,
          fontSize: "clamp(11px, 2vw, 13px)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Free Video Training for Creators, Filmmakers &amp; Complete Beginners
      </div>

      {/* 2-col hero */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "64px 32px 56px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
          gap: "56px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: copy */}
        <div>
          <p
            style={{
              color: "#c8102e",
              fontWeight: 800,
              fontSize: "clamp(12px, 1.8vw, 14px)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Free Video Training — AI Film System™
          </p>

          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Stop Feeling Overwhelmed by AI Tools.{" "}
            <span style={{ color: "#c8102e" }}>Start Creating Premium Videos That Get You Paid.</span>
          </h1>

          <p
            style={{
              color: "#bbb",
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              lineHeight: 1.6,
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            I'll show you the exact AI Film System™ I used to build a 6-figure production business
            and train 30,000+ creators worldwide.
          </p>

          <CTAButton text="Watch the Free Training →" />
        </div>

        {/* Right: photo */}
        <div>
          <img
            src="https://statics.myclickfunnels.com/workspace/JzaYQV/image/23028402/file/6f2b11b01b08a1abc0fba38aee72e853.jpg"
            alt="Brandon Patino — AI Film Academy"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "8px",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2: Who This Is For ───────────────────────────────────────────────
function WhoThisIsFor() {
  const checks = [
    {
      bold: "Build a Client-Ready Portfolio",
      rest: " so you can show real work to brands, clients, and employers.",
    },
    {
      bold: "Master the AI Video Workflow",
      rest: " and stop chasing every new tool that gets released.",
    },
    {
      bold: "Land Freelance and Business Clients",
      rest: " by creating films that get recognized.",
    },
  ];

  const nopes = [
    "You want a magic button that makes films for you",
    "You aren't willing to practice and create consistently",
  ];

  return (
    <section
      style={{
        background: "#fff",
        padding: "72px 32px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            color: "#111",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            lineHeight: 1.1,
            marginBottom: "48px",
            letterSpacing: "-0.02em",
          }}
        >
          This Free Training Is for Creators Who Want to:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
          {checks.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: "2px" }}>✅</span>
              <p
                style={{
                  color: "#111",
                  fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                <strong>{c.bold}</strong>
                {c.rest}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "44px" }}>
          {nopes.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", textAlign: "left" }}>
              <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "2px" }}>❌</span>
              <p
                style={{
                  color: "#888",
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {n}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#111",
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "36px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            If you're a green check — tap below and I'll show you the system that turns AI
            filmmaking into paid creative work.
          </p>
        </div>

        <CTAButton text="I'm Ready to Watch the Training →" />
      </div>
    </section>
  );
}

// ─── SECTION 3: 3 Secrets ─────────────────────────────────────────────────────
function Secrets() {
  const secrets = [
    {
      num: "Secret #1",
      headline: "Why Great AI Films Have Almost Nothing to Do With the AI Tools You Use",
      sub: "The interfaces change. The model names change. The creative job stays the same.",
    },
    {
      num: "Secret #2",
      headline: "Why Complete Beginners Are Creating Better AI Content Than Experienced Creators",
      sub: "AI changed who is allowed to create. What matters now is the system, not the software.",
    },
    {
      num: "Secret #3",
      headline: "The Filmmaking Skills That Stay Valuable No Matter Which AI Tool Comes Out Next",
      sub: "Storytelling. Camera language. Design. Editing. These never become obsolete.",
    },
  ];

  return (
    <section
      style={{
        background: "#080808",
        padding: "72px 32px",
        borderTop: "4px solid #c8102e",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <p
          style={{
            color: "#c8102e",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Here's What You'll Discover
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "56px",
            letterSpacing: "-0.02em",
          }}
        >
          The 3 Secrets Behind the AI Film System™
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {secrets.map((s, i) => (
            <div
              key={i}
              style={{
                borderLeft: "4px solid #c8102e",
                paddingLeft: "28px",
                paddingTop: "28px",
                paddingBottom: "28px",
                marginBottom: "8px",
              }}
            >
              <p
                style={{
                  color: "#c8102e",
                  fontWeight: 800,
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {s.num}
              </p>
              <h3
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  lineHeight: 1.15,
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.headline}
              </h3>
              <p
                style={{
                  color: "#777",
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <CTAButton text="Send Me The Free Training →" />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4: About + Form ──────────────────────────────────────────────────
function AboutAndForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formState === "loading") return;
      const name = firstName.trim();
      const emailVal = email.trim().toLowerCase();
      if (!name || !emailVal) return;
      setFormState("loading");
      if (!FORM_WEBHOOK_URL) {
        setTimeout(() => setFormState("success"), 700);
        return;
      }
      try {
        await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: name, email: emailVal, source: "free_video_training", group: "Free Video Training" }),
        });
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, firstName, email]
  );

  return (
    <section style={{ background: "#fff", padding: "72px 32px" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "64px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left: About Brandon */}
        <div>
          <p
            style={{
              color: "#c8102e",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Hi, I'm Brandon
          </p>
          <h2
            style={{
              color: "#111",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            I Built a Six-Figure Video Business Teaching Creators How to Stop Watching Tutorials and
            Start Creating.
          </h2>

          <p
            style={{
              color: "#444",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            I've trained <strong>30,000+ students globally</strong>, built a private community of
            over 1,000 AI filmmakers, and host live AI workshops for companies worldwide.
          </p>

          <p
            style={{
              color: "#444",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            In this free training, I'll show you the exact system I use to take any idea and turn it
            into a premium AI film — without needing 12 different tools or a film school background.
          </p>

          {/* Credibility row */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { n: "30k+", l: "Global Students" },
              { n: "1,000+", l: "Community Members" },
              { n: "5.0 ★", l: "Google Reviews" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div
                  style={{
                    color: "#c8102e",
                    fontWeight: 900,
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div id="fvt-form">
          <h3
            style={{
              color: "#111",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              lineHeight: 1.15,
              marginBottom: "8px",
              letterSpacing: "-0.01em",
            }}
          >
            Watch the Free AI Filmmaking Training Now
          </h3>
          <p
            style={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            Enter your info and I'll send it straight to your inbox. Watch on your own schedule.
          </p>

          {formState === "success" ? (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "8px",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#166534", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                You're in. Check your inbox for the free training.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{
                    border: "2px solid #e5e5e5",
                    borderRadius: "4px",
                    padding: "15px 18px",
                    fontSize: "1rem",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    color: "#111",
                  }}
                />
                <input
                  type="email"
                  placeholder="Best Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    border: "2px solid #e5e5e5",
                    borderRadius: "4px",
                    padding: "15px 18px",
                    fontSize: "1rem",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    color: "#111",
                  }}
                />
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  style={{
                    background: formState === "loading" ? "#8a0b20" : "#c8102e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "17px",
                    fontSize: "1rem",
                    fontWeight: 900,
                    cursor: formState === "loading" ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {formState === "loading" ? "Sending..." : "I'm Ready to Watch the Training ✅"}
                </button>
                {formState === "error" && (
                  <p style={{ color: "#dc2626", fontSize: "0.85rem", textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}
                <p style={{ color: "#bbb", fontSize: "0.78rem", textAlign: "center", lineHeight: 1.5 }}>
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/aifa-white-flask-film-academy-180.png"
        alt="AI Film Academy"
        style={{ height: "26px", opacity: 0.5, marginBottom: "10px" }}
      />
      <p style={{ color: "#333", fontSize: "0.75rem" }}>
        © {new Date().getFullYear()} AI Film Academy · Exemplar Industries LLC
      </p>
    </footer>
  );
}

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const CSS = `
  @media (max-width: 720px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-grid > div:last-child { order: -1; max-width: 320px; margin: 0 auto; }
    .about-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FreeVideoTraining() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "inherit" }}>
        <Hero />
        <WhoThisIsFor />
        <Secrets />
        <AboutAndForm />
        <Footer />
      </div>
    </>
  );
}
