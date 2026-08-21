/*
 * AI Film Academy — Free Video Training
 * Route: /free-video-training
 * v6 — animation fix, S3 headline, mobile
 */

import { useState, useCallback } from "react";

const FORM_WEBHOOK_URL = "https://exemplar.app.n8n.cloud/webhook/free-video-training-signup";
const HEADSHOT_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032668673/WKJclrZibZNeINxP.jpeg";
const GUINNESS_URL = "https://statics.myclickfunnels.com/workspace/JzaYQV/image/23028402/file/6f2b11b01b08a1abc0fba38aee72e853.jpg";

type FormState = "idle" | "loading" | "success" | "error";

function scrollToForm() {
  document.getElementById("fvt-form")?.scrollIntoView({ behavior: "smooth" });
}

function CTAButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick || scrollToForm}
      style={{
        background: "#c8102e",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "20px 52px",
        fontSize: "clamp(1rem, 2vw, 1.1rem)",
        fontWeight: 900,
        cursor: "pointer",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        display: "inline-block",
      }}
    >
      {text}
    </button>
  );
}

// ─── Hero Inline Form ────────────────────────────────────────────────────────
function HeroForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formState === "loading") return;
      const name = firstName.trim();
      const emailVal = email.trim().toLowerCase();
      if (!name || !emailVal || !marketingConsent) return;
      setFormState("loading");
      try {
        const response = await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: name,
            email: emailVal,
            source: "free_video_training",
            group: "Free Video Training",
            marketingConsent: true,
            companyWebsite,
            submittedAt: new Date().toISOString(),
            elapsedMs: Date.now() - formStartedAt,
          }),
        });
        if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, firstName, email, marketingConsent, companyWebsite, formStartedAt]
  );

  if (formState === "success") {
    return (
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", margin: 0 }}>
          You're on the Free Training list. We'll email your access shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "5px",
            padding: "14px 18px",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            width: "100%",
            boxSizing: "border-box" as const,
          }}
        />
        <input
          type="email"
          placeholder="Best Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "5px",
            padding: "14px 18px",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            width: "100%",
            boxSizing: "border-box" as const,
          }}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
        />
        <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", color: "#ddd", fontSize: "0.78rem", lineHeight: 1.4 }}>
          <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} required />
          <span>I agree to receive the free training and occasional AI Film Academy emails. I can unsubscribe anytime.</span>
        </label>
        <button
          type="submit"
          disabled={formState === "loading"}
          style={{
            background: formState === "loading" ? "#8a0b20" : "#c8102e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "15px",
            fontSize: "0.95rem",
            fontWeight: 900,
            cursor: formState === "loading" ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          {formState === "loading" ? "Sending..." : "Send Me the Free Training ✅"}
        </button>
        {formState === "error" && (
          <p style={{ color: "#f87171", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>Something went wrong. Try again.</p>
        )}
      </div>
    </form>
  );
}

// ─── SECTION 1: Hero with animated background ─────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#0d0d0d" }}>
      {/* Animated canvas-style background via CSS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "transparent",
          overflow: "hidden",
        }}
      >
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="grid-overlay" />
      </div>

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "#c8102e",
          textAlign: "center",
          padding: "18px 24px",
          color: "#fff",
          fontWeight: 900,
          fontSize: "clamp(15px, 2.5vw, 20px)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Free Video Training for Creators, Filmmakers &amp; Complete Beginners
      </div>

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "72px 32px 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
          gap: "56px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(2.25rem, 4.35vw, 3.55rem)",
              lineHeight: 1.16,
              letterSpacing: "0.028em",
              textTransform: "uppercase",
              margin: "0 auto 28px",
              maxWidth: "640px",
            }}
          >
            <span style={{ display: "block" }}>How To Create a Premium</span>
            <span style={{ display: "block" }}>AI Film Portfolio and Start Charging</span>
            <span style={{ color: "#c8102e", display: "block", marginTop: "8px" }}>High Ticket in 30 Days</span>
          </h1>
          <p
            style={{
              color: "#ccc",
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              lineHeight: 1.75,
              margin: "0 auto 40px",
              maxWidth: "575px",
            }}
          >
            I'll show you the exact AI Film System™ my students use to master AI Filmmaking, build
            premium portfolios, and start charging high ticket for paid creative work without a film
            school background or dozens of tools.
          </p>
          {/* Hero inline mini-form — button removed, form is the CTA */}
          <div style={{ margin: "28px auto 0", maxWidth: "480px" }}>
            <HeroForm />
          </div>
        </div>
        <div>
          <img
            src={GUINNESS_URL}
            alt="Brandon Patino — AI Film Academy"
            style={{ width: "100%", display: "block", borderRadius: "8px" }}
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
      bold: "Master the AI Film Production System",
      rest: " and stop chasing every new tool that gets released.",
    },
    {
      bold: "Land Freelance and Business Clients",
      rest: " by creating films that get recognized.",
    },
  ];
  const nopes = [
    "This is not for you if you want a magic button that makes films for you.",
    "This is not for you if you're going to watch the training and do nothing with it.",
    "This is not for you if you're not serious about building a portfolio and attracting paid work.",
  ];

  return (
    <section style={{ background: "#fff", padding: "88px 32px" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            color: "#c8102e",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            lineHeight: 1.1,
            marginBottom: "56px",
            letterSpacing: "-0.02em",
          }}
        >
          This Free Training Is for Creators Who Want to:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "44px" }}>
          {checks.map((c, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start", textAlign: "left" }}
            >
              <span style={{ fontSize: "1.9rem", flexShrink: 0, lineHeight: 1.25 }}>✅</span>
              <p
                style={{
                  color: "#111",
                  fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <strong>{c.bold}</strong>
                {c.rest}
              </p>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div
          style={{
            background: "#fff",
            border: "2px solid #e8e8e8",
            borderRadius: "10px",
            padding: "30px 36px",
            marginBottom: "44px",
            textAlign: "center",
            boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
          }}
        >
          <p
            style={{
              color: "#111",
              fontWeight: 700,
              fontSize: "clamp(1.05rem, 2.3vw, 1.3rem)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            If you're a green check — tap below and I'll show you the system that turns any idea
            into premium videos.
          </p>
        </div>

        <CTAButton text="Yes, Show Me the System →" />

        {/* ❌ Not for you — below CTA */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "40px" }}
        >
          {nopes.map((n, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "16px", alignItems: "flex-start", textAlign: "left" }}
            >
              <span style={{ fontSize: "1.6rem", flexShrink: 0, lineHeight: 1.3 }}>❌</span>
              <p
                style={{
                  color: "#444",
                  fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {n}
              </p>
            </div>
          ))}
        </div>
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
    },
    {
      num: "Secret #2",
      headline: "Why Complete Beginners Are Creating Better AI Content Than Experienced Creators",
    },
    {
      num: "Secret #3",
      headline: "The Filmmaking Skills That Stay Valuable No Matter Which AI Tool Comes Out Next",
    },
  ];

  return (
    <section
      style={{
        background: "#1a1a1a",
        padding: "88px 32px",
        borderTop: "4px solid #c8102e",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* No eyebrow label — deleted "Here's What You'll Discover" */}
        <h2
          style={{
            color: "#c8102e",
            fontWeight: 900,
            fontSize: "clamp(1.4rem, 3.2vw, 2.4rem)",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "72px",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap" as const,
          }}
          className="secrets-headline"
        >
          Discover 3 Secrets That Unlock High Ticket Creative Work
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          {secrets.map((s, i) => (
            <div
              key={i}
              style={{
                borderLeft: "5px solid #c8102e",
                paddingLeft: "40px",
              }}
            >
              <p
                style={{
                  color: "#c8102e",
                  fontWeight: 800,
                  fontSize: "clamp(13px, 2vw, 15px)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {s.num}
              </p>
              <h3
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.7rem, 3.8vw, 2.6rem)",
                  lineHeight: 1.25,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.headline}
              </h3>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "72px" }}>
          <CTAButton text="I Want to Discover the 3 AI Filmmaking Secrets →" />
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
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formState === "loading") return;
      const name = firstName.trim();
      const emailVal = email.trim().toLowerCase();
      if (!name || !emailVal || !marketingConsent) return;
      setFormState("loading");
      try {
        const response = await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: name,
            email: emailVal,
            source: "free_video_training",
            group: "Free Video Training",
            marketingConsent: true,
            companyWebsite,
            submittedAt: new Date().toISOString(),
            elapsedMs: Date.now() - formStartedAt,
          }),
        });
        if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, firstName, email, marketingConsent, companyWebsite, formStartedAt]
  );

  return (
    <section style={{ background: "#f9f9f9", padding: "88px 32px" }}>
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "72px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left: About Brandon — NO big headline */}
        <div>
          <img
            src={HEADSHOT_URL}
            alt="Brandon Patino"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #c8102e",
              marginBottom: "28px",
              display: "block",
            }}
          />
          <p
            style={{
              color: "#c8102e",
              fontWeight: 800,
              fontSize: "clamp(13px, 2vw, 15px)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Hi, I'm Brandon
          </p>
          <p
            style={{
              color: "#333",
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              lineHeight: 1.85,
              marginBottom: "22px",
            }}
          >
            I've trained <strong>30,000+ students globally</strong>, built a private community of
            over 1,000 AI filmmakers, and host live AI workshops for companies worldwide.
          </p>
          <p
            style={{
              color: "#333",
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              lineHeight: 1.85,
              marginBottom: "40px",
            }}
          >
            In this free training, I'll show you the exact system I use to take any idea and turn it
            into a premium AI film — without needing 12 different tools or a film school background.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
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
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div style={{ color: "#888", fontSize: "0.88rem", marginTop: "7px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form card — bigger */}
        <div
          id="fvt-form"
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "56px 52px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.11)",
            border: "1px solid #eee",
          }}
        >
          <h3
            style={{
              color: "#111",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              lineHeight: 1.2,
              marginBottom: "12px",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            Get the Free AI Filmmaking Training
          </h3>
          <p
            style={{
              color: "#666",
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
              marginBottom: "36px",
              textAlign: "center",
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
                padding: "40px",
                textAlign: "center",
              }}
            >
              <p
                style={{ color: "#166534", fontWeight: 800, fontSize: "1.15rem", margin: 0 }}
              >
                You're on the Free Training list. We'll email your access shortly.
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
                    border: "2px solid #e0e0e0",
                    borderRadius: "5px",
                    padding: "17px 20px",
                    fontSize: "1.05rem",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    color: "#111",
                    background: "#fafafa",
                  }}
                />
                <input
                  type="email"
                  placeholder="Best Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    border: "2px solid #e0e0e0",
                    borderRadius: "5px",
                    padding: "17px 20px",
                    fontSize: "1.05rem",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    color: "#111",
                    background: "#fafafa",
                  }}
                />
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
                />
                <label style={{ display: "flex", gap: "9px", alignItems: "flex-start", color: "#555", fontSize: "0.82rem", lineHeight: 1.45 }}>
                  <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} required />
                  <span>I agree to receive the free training and occasional AI Film Academy emails. I can unsubscribe anytime.</span>
                </label>
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  style={{
                    background: formState === "loading" ? "#8a0b20" : "#c8102e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "19px",
                    fontSize: "1.05rem",
                    fontWeight: 900,
                    cursor: formState === "loading" ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {formState === "loading" ? "Sending..." : "Send Me the Free Training ✅"}
                </button>
                {formState === "error" && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "0.88rem",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Responsive + Animation CSS ───────────────────────────────────────────────
const CSS = `
  @media (max-width: 720px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 36px 20px 44px !important; }
    /* On mobile: photo first, copy second (matches ClickFunnels layout) */
    .hero-grid > div:first-child { order: 2; }
    .hero-grid > div:last-child { order: 1; max-width: 280px; margin: 0 auto; }
    .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .about-grid > div:first-child { text-align: center; }
    .about-grid > div:first-child img { margin: 0 auto 24px; }
    .about-grid > div:first-child > div { justify-content: center; }
    .hero-grid > div:first-child { text-align: center; }
    .hero-grid > div:first-child p { margin-left: auto; margin-right: auto; }
    .hero-grid > div:first-child form { text-align: left; }
    .secrets-headline { white-space: normal !important; font-size: clamp(1.5rem, 6vw, 2rem) !important; }
  }
  @media (max-width: 480px) {
    .hero-grid { padding: 28px 16px 36px !important; }
  }

  /* Animated orb backgrounds for hero */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: orbFloat 12s ease-in-out infinite;
  }
  .orb1 {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(200,16,46,0.5) 0%, transparent 65%);
    top: -80px;
    left: -60px;
    animation-delay: 0s;
    animation-duration: 14s;
  }
  .orb2 {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(138,11,32,0.4) 0%, transparent 65%);
    bottom: -60px;
    right: 8%;
    animation-delay: -5s;
    animation-duration: 18s;
  }
  .orb3 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(200,16,46,0.3) 0%, transparent 65%);
    top: 40%;
    left: 48%;
    animation-delay: -9s;
    animation-duration: 22s;
  }
  @keyframes orbFloat {
    0%   { transform: translate(0px, 0px) scale(1); }
    33%  { transform: translate(40px, -50px) scale(1.06); }
    66%  { transform: translate(-25px, 25px) scale(0.96); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  /* Subtle dot grid overlay */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* Animated particles */
  .particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(200,16,46,0.7);
    animation: particleDrift linear infinite;
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-120px) translateX(var(--drift, 20px)); opacity: 0; }
  }

  /* Secrets headline — allow wrap on mobile */
  .secrets-headline {
    white-space: normal !important;
  }
`;

export default function FreeVideoTraining() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "inherit" }}>
        <Hero />
        <WhoThisIsFor />
        <Secrets />
        <AboutAndForm />
      </div>
    </>
  );
}
