/*
 * AI Film Academy — AI Filmmaking Masterclass Registration Page
 * Route: /masterclass
 * Purpose: Free live masterclass registration — replaces ClickFunnels page
 *
 * Layout mirrors the original ClickFunnels page exactly:
 *   1. Top bar — audience targeting line
 *   2. Hero — 2-col: Brandon photo left, headline + countdown + form right
 *   3. 3 Secrets — horizontal 3-col cards below hero
 *   4. "In This FREE AI Creator Workshop" — dark section, bullet teasers + AI film images
 *   5. Bottom CTA button
 *
 * Form: FORM_WEBHOOK_URL is a placeholder — swap in MailerLite or n8n URL when ready.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { deliverAifaForm } from "@/lib/formDelivery";
import Turnstile from "@/components/Turnstile";

// Webinar date: next Thursday at 5pm PST — update this to the actual date
// Set to next Thursday from now
function getNextThursdayAt5PST() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 4=Thu
  const daysUntilThursday = (4 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilThursday);
  next.setHours(17, 0, 0, 0); // 5pm local — adjust for PST offset if needed
  return next;
}

const WEBINAR_DATE = getNextThursdayAt5PST();

// ─── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

// ─── Top Audience Bar ─────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div
      style={{
        background: "#1a1a2e",
        color: "#fff",
        textAlign: "center",
        padding: "10px 16px",
        fontSize: "clamp(13px, 2.2vw, 15px)",
        fontWeight: 600,
        lineHeight: 1.4,
      }}
    >
      <strong>FREE Live Workshop for Brand Owners,</strong> Authors, Writers, Copywriters &amp;
      Creators Who Want to Create Professional AI Content
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEBINAR_DATE);
  const [formState, setFormState] = useState<FormState>("idle");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formState === "loading") return;
      const name = fullName.trim();
      const emailVal = email.trim().toLowerCase();
      if (!name || !emailVal || !turnstileToken) return;
      setFormState("loading");
      try {
        await deliverAifaForm("Masterclass registration", {
          name,
          email: emailVal,
          source: "Masterclass page",
        });
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, fullName, email, turnstileToken]
  );

  return (
    <section style={{ background: "#fff", padding: "32px 24px 0" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "32px",
          alignItems: "start",
        }}
        className="hero-grid"
      >
        {/* Left: Brandon photo */}
        <div>
          <img
            src="https://statics.myclickfunnels.com/workspace/JzaYQV/image/23028402/file/6f2b11b01b08a1abc0fba38aee72e853.jpg"
            alt="Brandon Patino — AI Film Academy"
            style={{ width: "100%", display: "block", borderRadius: "4px" }}
            onError={(e) => {
              // Fallback to local asset if external image fails
              (e.target as HTMLImageElement).src = "/assets/aifa-original-flask-mark-180.png";
              (e.target as HTMLImageElement).style.padding = "60px";
              (e.target as HTMLImageElement).style.background = "#f5f5f5";
            }}
          />
        </div>

        {/* Right: headline + countdown + form */}
        <div
          style={{
            background: "#1a1a2e",
            borderRadius: "8px",
            padding: "32px 28px",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              lineHeight: 1.1,
              marginBottom: "12px",
              color: "#fff",
            }}
          >
            How To Create Professional AI Ads &amp; Content In Just 10 min
          </h1>
          <p
            style={{
              color: "#e05c5c",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Without Hiring a Creative Team Or Mastering Dozens of AI Tools
          </p>

          {/* Countdown */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              padding: "12px 0",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#aaa",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              REGISTER NOW — STARTS IN
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                alignItems: "baseline",
              }}
            >
              {[
                { val: days, label: "Days" },
                { val: hours, label: "Hours" },
                { val: minutes, label: "Minutes" },
                { val: seconds, label: "Seconds" },
              ].map(({ val, label }, i) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {i === 0 ? val : String(val).padStart(2, "0")}
                  </span>
                  {i < 3 && (
                    <span style={{ fontWeight: 900, fontSize: "1.8rem", color: "#fff", margin: "0 4px" }}>
                      :
                    </span>
                  )}
                  <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {formState === "success" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ color: "#4ade80", fontWeight: 800, fontSize: "1.1rem" }}>
                You're registered! Check your inbox for the Zoom link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px 16px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: "#fff",
                  color: "#333",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px 16px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: "#fff",
                  color: "#333",
                }}
              />
              <Turnstile action="masterclass-registration" theme="dark" onTokenChange={setTurnstileToken} />
              <button
                type="submit"
                disabled={formState === "loading" || !turnstileToken}
                style={{
                  display: "block",
                  width: "100%",
                  background: formState === "loading" ? "#a00" : "#c8102e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "16px",
                  fontSize: "1rem",
                  fontWeight: 800,
                  cursor: formState === "loading" ? "not-allowed" : "pointer",
                  lineHeight: 1.3,
                }}
              >
                {formState === "loading" ? "Saving..." : (
                  <>
                    Save My Seat Now!
                    <br />
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>
                      Save My Seat For The AI Creator Workshop Now!
                    </span>
                  </>
                )}
              </button>
              {formState === "error" && (
                <p style={{ color: "#f87171", marginTop: "8px", fontSize: "0.85rem" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── 3 Secrets Section ────────────────────────────────────────────────────────
const SECRETS = [
  {
    title: "Secret #1",
    bold: "The Secret Behind",
    rest: " Professional AI Content That Has Nothing to Do With Learning More AI Tools",
  },
  {
    title: "Secret #2",
    bold: "Why Complete Beginners",
    rest: " Are Creating Better AI Content Than Experienced Creators",
  },
  {
    title: "Secret #3",
    bold: "How to Stay Ahead",
    rest: " of AI Without Chasing Every New Tool That Gets Released",
  },
];

function SecretsSection() {
  return (
    <section style={{ background: "#fff", padding: "32px 24px" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          border: "1px solid #e5e5e5",
        }}
        className="secrets-grid"
      >
        {SECRETS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "24px 20px",
              borderRight: i < 2 ? "1px solid #e5e5e5" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>🔒</span>
              <h3
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "#111",
                  margin: 0,
                }}
              >
                {s.title}
              </h3>
            </div>
            <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>
              <strong>{s.bold}</strong>
              {s.rest}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── "You'll Discover" Section ────────────────────────────────────────────────
const TEASERS = [
  {
    bold: "🔥 Detail / Teaser #1:",
    text: " Why learning more AI tools is actually slowing your progress—and the simple AI Production System™ professional creators use to produce better content faster.",
  },
  {
    bold: "🔥 Detail / Teaser #2:",
    text: " How complete beginners are creating professional AI ads, trailers, and brand content in days—even if they've never considered themselves creative or technical.",
  },
  {
    bold: "🔥 Detail / Teaser #3:",
    text: " The biggest mistake almost every creator makes when AI changes—and how to future-proof your skills so you never have to start over every time a new tool is released.",
  },
];

function DiscoverSection() {
  return (
    <section style={{ background: "#1a1a2e", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          In This <span style={{ textDecoration: "underline" }}>FREE</span> AI Creator Workshop
        </h2>
        <p
          style={{
            color: "#e05c5c",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          You'll Discover...
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)",
            gap: "40px",
            alignItems: "start",
          }}
          className="discover-grid"
        >
          {/* Bullet teasers */}
          <div>
            {TEASERS.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "20px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background: "#c8102e",
                    borderRadius: "4px",
                    flexShrink: 0,
                    marginTop: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ color: "#fff", lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>
                  <strong>{t.bold}</strong>
                  {t.text}
                </p>
              </div>
            ))}
          </div>

          {/* AI film images */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <img
              src="https://statics.myclickfunnels.com/workspace/JzaYQV/image/23053356/file/70ebc3f87f6b25a9df9b8fc15bea0ec0.png"
              alt="AI Film Example"
              style={{ width: "100%", borderRadius: "6px", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <img
              src="https://statics.myclickfunnels.com/workspace/JzaYQV/image/23053264/file/793f44c87dc422d87e174e9efd5c9145.png"
              alt="AI Film Example 2"
              style={{ width: "100%", borderRadius: "6px", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              display: "inline-block",
              background: "#c8102e",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "4px",
              padding: "18px 48px",
              fontWeight: 800,
              fontSize: "1rem",
              lineHeight: 1.3,
              cursor: "pointer",
            }}
          >
            Save My FREE Seat Right Now! →
            <br />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>
              Save My Seat For The FREE AI Workshop Now!
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const RESPONSIVE_CSS = `
  @media (max-width: 680px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
    }
    .secrets-grid {
      grid-template-columns: 1fr !important;
    }
    .secrets-grid > div {
      border-right: none !important;
      border-bottom: 1px solid #e5e5e5;
    }
    .secrets-grid > div:last-child {
      border-bottom: none;
    }
    .discover-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Masterclass() {
  return (
    <>
      <style>{RESPONSIVE_CSS}</style>
      <div id="top" style={{ fontFamily: "inherit" }}>
        <TopBar />
        <HeroSection />
        <SecretsSection />
        <DiscoverSection />
      </div>
    </>
  );
}
