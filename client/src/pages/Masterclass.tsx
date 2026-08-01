/*
 * AI Film Academy — AI Filmmaking Masterclass Registration Page
 * Route: /masterclass
 * Purpose: Free live masterclass registration funnel — replaces ClickFunnels
 * Structure (Kristen Lumiere model):
 *   1. Urgency bar
 *   2. Hero — Headline + subheadline + CTA button (scrolls to form)
 *   3. "Hi, I'm Brandon" — personal story section
 *   4. What You'll Discover — 5 Secrets/Shifts
 *   5. Is This For You? — qualification checklist
 *   6. Registration Form — name + email capture
 *   7. Footer
 *
 * Form: Stores lead in state. Webhook URL is a placeholder — swap in
 *       MailerLite embed URL or n8n webhook when ready.
 */

import { useState, useRef, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
// Replace this with your MailerLite embed action URL or n8n webhook URL
const FORM_WEBHOOK_URL = "";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

// ─── Scroll helper ────────────────────────────────────────────────────────────
function scrollToForm() {
  document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Urgency Bar ─────────────────────────────────────────────────────────────
function UrgencyBar() {
  return (
    <div
      style={{
        background: "#c8102e",
        color: "#fff",
        textAlign: "center",
        padding: "10px 16px",
        fontSize: "clamp(13px, 2.5vw, 15px)",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      FREE LIVE MASTERCLASS &nbsp;·&nbsp; THURSDAYS 5PM PST &nbsp;·&nbsp; LIMITED SEATS
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        background: "#080808",
        padding: "80px 24px 72px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          color: "#c8102e",
          fontWeight: 700,
          fontSize: "clamp(12px, 2vw, 14px)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        Free Online Masterclass for Aspiring AI Filmmakers
      </p>

      {/* Main Headline */}
      <h1
        style={{
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          lineHeight: 1.1,
          maxWidth: "820px",
          margin: "0 auto 24px",
          letterSpacing: "-0.02em",
        }}
      >
        You Don't Need Film School or a Big Budget to Make{" "}
        <span style={{ color: "#c8102e" }}>Professional AI Films</span>
      </h1>

      {/* Subheadline */}
      <p
        style={{
          color: "#b0b0b0",
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          maxWidth: "600px",
          margin: "0 auto 40px",
          lineHeight: 1.6,
        }}
      >
        Discover why most creators stay stuck — and the exact AI Production System™
        that lets complete beginners create cinematic content in days, not years.
      </p>

      {/* CTA Button */}
      <button
        onClick={scrollToForm}
        style={{
          background: "#c8102e",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "18px 48px",
          fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
          fontWeight: 800,
          cursor: "pointer",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "#a50d25")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "#c8102e")}
      >
        Save My Free Seat →
      </button>
    </section>
  );
}

// ─── About Brandon Section ────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      style={{
        background: "#0f0f0f",
        padding: "80px 24px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
          gap: "56px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Photo placeholder — swap with real Brandon headshot */}
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            aspectRatio: "4/5",
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <img
            src="/assets/aifa-original-flask-mark-180.png"
            alt="AI Film Academy"
            style={{ width: "80px", opacity: 0.4 }}
          />
        </div>

        {/* Copy */}
        <div>
          <p
            style={{
              color: "#c8102e",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Hi, I'm Brandon
          </p>
          <h2
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            I Built AI Film Academy Because I Was Tired of Watching Talented Creators Stay Stuck
          </h2>
          <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "16px", fontSize: "1rem" }}>
            When AI video tools first exploded, I watched creators spend hundreds of hours chasing
            every new tool — Runway, Kling, Sora, Pika — and still producing content that looked
            amateur. The problem was never the tools.
          </p>
          <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "16px", fontSize: "1rem" }}>
            <strong style={{ color: "#fff" }}>The problem was the system.</strong> Without a
            production framework, more tools just means more chaos.
          </p>
          <p style={{ color: "#aaa", lineHeight: 1.8, fontSize: "1rem" }}>
            I built the AI Production System™ and taught it to hundreds of creators inside AI Film
            Academy. In this free masterclass, I'm going to show you exactly what it is — and why
            it's the only thing standing between you and professional-quality AI content.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Secrets / Shifts Section ─────────────────────────────────────────────────
const SECRETS = [
  {
    number: "01",
    title: "Why Learning More AI Tools Is Secretly Keeping You Stuck",
    body: "The creators producing the best AI content aren't using more tools — they're using fewer tools with a better system. I'll show you exactly what that system looks like.",
  },
  {
    number: "02",
    title: "The AI Production System™ That Turns Beginners Into Professionals",
    body: "A step-by-step framework that removes the guesswork from AI filmmaking. You'll understand how to go from idea to finished content in a single session.",
  },
  {
    number: "03",
    title: "How to Create Cinematic AI Content Without a Film Background",
    body: "You don't need to know cinematography, color grading, or editing theory. I'll show you how the system handles all of that automatically.",
  },
  {
    number: "04",
    title: "Why AI Changes Don't Have to Scare You Anymore",
    body: "Every time a new tool drops, most creators panic and restart. I'll show you how to future-proof your skills so you're never starting over again.",
  },
  {
    number: "05",
    title: "The One Decision That Separates Creators Who Grow From Those Who Don't",
    body: "It has nothing to do with talent, budget, or equipment. Once you see it, you can't unsee it — and it will change how you approach every piece of content you make.",
  },
];

function SecretsSection() {
  return (
    <section
      style={{
        background: "#080808",
        padding: "80px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <p
          style={{
            color: "#c8102e",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          What You'll Discover
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            textAlign: "center",
            marginBottom: "56px",
            lineHeight: 1.2,
          }}
        >
          In This Free 60-Minute Masterclass
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {SECRETS.map((s) => (
            <div
              key={s.number}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(200,16,46,0.12)",
                  border: "2px solid rgba(200,16,46,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c8102e",
                  fontWeight: 900,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {s.number}
              </div>
              <div>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    marginBottom: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "#888", lineHeight: 1.7, fontSize: "0.95rem" }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <button
            onClick={scrollToForm}
            style={{
              background: "#c8102e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "16px 40px",
              fontSize: "1rem",
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            I'm Ready — Save My Seat →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Is This For You Section ──────────────────────────────────────────────────
const QUALIFIERS = [
  "You've tried AI video tools but your content still doesn't look professional",
  "You're spending hours on content that should take minutes",
  "You feel like you're always behind because new tools keep dropping",
  "You want to create content for your brand, business, or creative vision — but don't know where to start",
  "You're ready to stop experimenting and start executing with a real system",
];

function QualifierSection() {
  return (
    <section
      style={{
        background: "#0f0f0f",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            textAlign: "center",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Is This Masterclass For You?
        </h2>
        <p
          style={{
            color: "#888",
            textAlign: "center",
            marginBottom: "48px",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Yes — if any of these sound like you:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {QUALIFIERS.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#c8102e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ color: "#ccc", lineHeight: 1.6, fontSize: "1rem", margin: 0 }}>{q}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button
            onClick={scrollToForm}
            style={{
              background: "#c8102e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "16px 40px",
              fontSize: "1rem",
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            I'm Ready for This →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Registration Form Section ────────────────────────────────────────────────
function RegistrationForm() {
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

      // If no webhook URL is configured, just show success (form is ready to wire up)
      if (!FORM_WEBHOOK_URL) {
        setTimeout(() => setFormState("success"), 600);
        return;
      }

      try {
        await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: name, email: emailVal, source: "masterclass_page" }),
        });
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, firstName, email]
  );

  return (
    <section
      id="registration-form"
      style={{
        background: "#080808",
        padding: "80px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            color: "#c8102e",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          One Last Thing Before You Go
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          Save Your Free Seat in the AI Filmmaking Masterclass
        </h2>
        <p
          style={{
            color: "#888",
            marginBottom: "40px",
            lineHeight: 1.6,
            fontSize: "1rem",
          }}
        >
          Enter your info below and I'll send you everything you need — including the Zoom link,
          date, and time — straight to your inbox.
        </p>

        {formState === "success" ? (
          <div
            style={{
              background: "rgba(200,16,46,0.08)",
              border: "1px solid rgba(200,16,46,0.3)",
              borderRadius: "10px",
              padding: "40px 32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#c8102e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <path d="M2 10L9 17L22 3" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "1.4rem",
                marginBottom: "12px",
              }}
            >
              You're In!
            </h3>
            <p style={{ color: "#aaa", lineHeight: 1.6 }}>
              Check your inbox for the Zoom link and session details. See you at the masterclass.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "16px 20px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "16px 20px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                disabled={formState === "loading"}
                style={{
                  background: formState === "loading" ? "#7a0a1c" : "#c8102e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "18px",
                  fontSize: "1rem",
                  fontWeight: 800,
                  cursor: formState === "loading" ? "not-allowed" : "pointer",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
              >
                {formState === "loading" ? "Saving Your Seat..." : "Save My Free Seat Now →"}
              </button>
            </div>
            {formState === "error" && (
              <p style={{ color: "#f87171", marginTop: "12px", fontSize: "0.9rem" }}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <p
              style={{
                color: "#555",
                fontSize: "0.8rem",
                marginTop: "16px",
                lineHeight: 1.5,
              }}
            >
              No spam. Unsubscribe anytime. Your info is safe.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Simple Footer ────────────────────────────────────────────────────────────
function MasterclassFooter() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/aifa-white-flask-film-academy-180.png"
        alt="AI Film Academy"
        style={{ height: "32px", opacity: 0.7, marginBottom: "16px" }}
      />
      <p style={{ color: "#444", fontSize: "0.8rem" }}>
        © {new Date().getFullYear()} AI Film Academy · Exemplar Industries LLC
      </p>
    </footer>
  );
}

// ─── Responsive style injection ───────────────────────────────────────────────
const RESPONSIVE_CSS = `
  @media (max-width: 640px) {
    .about-grid {
      grid-template-columns: 1fr !important;
    }
    .about-grid > div:first-child {
      max-width: 220px;
      margin: 0 auto;
    }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Masterclass() {
  return (
    <>
      <style>{RESPONSIVE_CSS}</style>
      <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "inherit" }}>
        <UrgencyBar />
        <HeroSection />
        <AboutSection />
        <SecretsSection />
        <QualifierSection />
        <RegistrationForm />
        <MasterclassFooter />
      </div>
    </>
  );
}
