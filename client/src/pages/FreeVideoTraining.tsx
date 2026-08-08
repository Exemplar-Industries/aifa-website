/*
 * AI Film Academy — Free Video Training Registration Page
 * Route: /free-video-training
 * Purpose: On-demand video training lead capture — feeds MailerLite "Free Video Training" group
 *
 * Structure (Kristen Lumiere model, black/red AFA brand):
 *   1. Top bar — audience qualifier
 *   2. Hero — Brandon photo + headline + form (dark, 2-col)
 *   3. "You Are In The Right Room If..." — qualification section
 *   4. "Hi, I'm Brandon" — credibility / origin story
 *   5. 3 Secrets — what they'll learn in the training
 *   6. Student proof — Tamer, Theresa, Jacob
 *   7. What's inside AFA — the offer teaser
 *   8. Final CTA form repeat
 *   9. Footer
 *
 * Form: Posts to FORM_WEBHOOK_URL — swap in MailerLite embed action URL when ready.
 * Copy source: Webinar script V4, Slides V3, live webinar transcript.
 */

import { useState, useCallback, useRef } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
// Swap this with MailerLite embedded form action URL when ready
const FORM_WEBHOOK_URL = "";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

// ─── Shared scroll-to-form helper ─────────────────────────────────────────────
function scrollToForm() {
  document.getElementById("fvt-form")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Shared form logic ────────────────────────────────────────────────────────
function useRegistrationForm() {
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
          body: JSON.stringify({
            firstName: name,
            email: emailVal,
            source: "free_video_training",
            group: "Free Video Training",
          }),
        });
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [formState, firstName, email]
  );

  return { formState, firstName, setFirstName, email, setEmail, handleSubmit };
}

// ─── Reusable Form Block ──────────────────────────────────────────────────────
function FormBlock({
  formState,
  firstName,
  setFirstName,
  email,
  setEmail,
  handleSubmit,
  ctaText = "Send Me The Free Training →",
}: {
  formState: FormState;
  firstName: string;
  setFirstName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  ctaText?: string;
}) {
  if (formState === "success") {
    return (
      <div
        style={{
          background: "rgba(200,16,46,0.1)",
          border: "1px solid rgba(200,16,46,0.4)",
          borderRadius: "8px",
          padding: "36px 28px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#c8102e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M1 9L8 16L21 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem", marginBottom: "10px" }}>
          You're In. Check Your Inbox.
        </h3>
        <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.95rem" }}>
          The free video training is on its way. Watch it on your own schedule.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "5px",
            padding: "15px 18px",
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
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "5px",
            padding: "15px 18px",
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
            background: formState === "loading" ? "#8a0b20" : "#c8102e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "17px",
            fontSize: "1rem",
            fontWeight: 800,
            cursor: formState === "loading" ? "not-allowed" : "pointer",
            letterSpacing: "0.03em",
            transition: "background 0.2s",
          }}
        >
          {formState === "loading" ? "Sending..." : ctaText}
        </button>
        {formState === "error" && (
          <p style={{ color: "#f87171", fontSize: "0.85rem", textAlign: "center" }}>
            Something went wrong. Please try again.
          </p>
        )}
        <p style={{ color: "#555", fontSize: "0.78rem", textAlign: "center", lineHeight: 1.5 }}>
          No spam. Unsubscribe anytime. Your info is safe.
        </p>
      </div>
    </form>
  );
}

// ─── 1. Top Bar ───────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div
      style={{
        background: "#c8102e",
        color: "#fff",
        textAlign: "center",
        padding: "10px 16px",
        fontSize: "clamp(12px, 2.2vw, 14px)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      Free Video Training for Creators, Filmmakers, Brand Owners &amp; Complete Beginners
    </div>
  );
}

// ─── 2. Hero ──────────────────────────────────────────────────────────────────
function HeroSection({ form }: { form: ReturnType<typeof useRegistrationForm> }) {
  return (
    <section style={{ background: "#080808", padding: "56px 24px 48px" }}>
      <div
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
          gap: "48px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: Brandon photo */}
        <div>
          <img
            src="https://statics.myclickfunnels.com/workspace/JzaYQV/image/23028402/file/6f2b11b01b08a1abc0fba38aee72e853.jpg"
            alt="Brandon Patino — AI Film Academy"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              border: "2px solid rgba(200,16,46,0.3)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Right: copy + form */}
        <div>
          <p
            style={{
              color: "#c8102e",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Free Video Training — AI Film System™
          </p>
          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              lineHeight: 1.1,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            How I Create Premium AI Films From Any Idea And{" "}
            <span style={{ color: "#c8102e" }}>Charge High-Ticket Prices</span>{" "}
            Without Needing 12 Different AI Tools
          </h1>
          <p
            style={{
              color: "#999",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              lineHeight: 1.65,
              marginBottom: "28px",
            }}
          >
            Master the fundamentals. Build a quality portfolio. Attract paid client work — even if
            you've never made a video before.
          </p>

          {/* Form */}
          <div id="fvt-form">
            <FormBlock {...form} ctaText="Send Me The Free Training →" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. Right Room / Qualification ───────────────────────────────────────────
const RIGHT_ROOM = [
  "Creators & Filmmakers who want to produce premium AI content",
  "YouTubers & Freelancers looking to attract high-ticket clients",
  "Brand Owners & Marketers who want better content without expensive agencies",
  "Complete Beginners who have never made a video but want to start",
];

const NOT_FOR = [
  "People who want a magic button that makes films for them",
  "People who aren't willing to practice and build their skills",
  "People who aren't interested in creating content consistently",
];

function QualificationSection() {
  return (
    <section style={{ background: "#0d0d0d", padding: "64px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
        className="qual-grid"
      >
        {/* Right room */}
        <div>
          <h2
            style={{
              color: "#c8102e",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "24px",
            }}
          >
            You Are In The Right Room If...
          </h2>
          {RIGHT_ROOM.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#c8102e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ color: "#ccc", lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Not for */}
        <div>
          <h2
            style={{
              color: "#555",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "24px",
            }}
          >
            This Is Not For You If...
          </h2>
          {NOT_FOR.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#2a2a2a",
                  border: "1px solid #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2L8 8M8 2L2 8" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ color: "#666", lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. About Brandon ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section style={{ background: "#080808", padding: "72px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <p
          style={{
            color: "#c8102e",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          Hi, I'm Brandon
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            textAlign: "center",
            marginBottom: "40px",
            lineHeight: 1.2,
          }}
        >
          I Didn't Wake Up One Morning Making Premium AI Videos
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "40px" }} className="stats-grid">
          {[
            { stat: "15+", label: "Years in digital media" },
            { stat: "30k+", label: "Global learners taught" },
            { stat: "1,000+", label: "Member private community" },
            { stat: "$1k/min", label: "Client production rate" },
          ].map(({ stat, label }) => (
            <div
              key={label}
              style={{
                background: "rgba(200,16,46,0.07)",
                border: "1px solid rgba(200,16,46,0.2)",
                borderRadius: "8px",
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#c8102e", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: "6px" }}>
                {stat}
              </div>
              <div style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "16px", fontSize: "1rem" }}>
          I started where most of you are right now. I was running a 6-figure video production agency,
          charging clients $1,000 for 30 seconds of 3D-modeled footage that took my team{" "}
          <strong style={{ color: "#fff" }}>45 days to deliver.</strong> That was just normal.
        </p>
        <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "16px", fontSize: "1rem" }}>
          Around 2022, I went deep into early AI animation. The tools were terrible — ComfyUI, Stable
          Diffusion, nodes and pipelines that made me feel like I needed to become an engineer instead
          of a creator. Morphing characters, missing fingers, no lip sync. I spent two years in the
          rabbit hole so you don't have to.
        </p>
        <p style={{ color: "#aaa", lineHeight: 1.8, fontSize: "1rem" }}>
          By 2024 the quality finally reached a real client. He said:{" "}
          <em style={{ color: "#ddd" }}>"You've been doing great work for a long time. I trust you. Let's take the bet."</em>{" "}
          We charged $1,000 per finished minute. The system was working. That became the foundation of
          the AI Film System™ — and everything I teach inside AI Film Academy.
        </p>
      </div>
    </section>
  );
}

// ─── 5. 3 Secrets ─────────────────────────────────────────────────────────────
const SECRETS = [
  {
    num: "01",
    title: "Great AI Films Have Almost Nothing to Do With the AI Tools You Use",
    body: "Every AI platform does one of three things: generate images, generate video, or aggregate models. The interfaces change. The model names change. The creative job stays the same. What separates premium work from slop is the production system behind it — not the tool.",
    slide: "SECRET #1",
  },
  {
    num: "02",
    title: "Complete Beginners Can Earn Income Fast With AI Filmmaking",
    body: "AI changed who is allowed to create. You no longer need years of 3D modeling, specialized hardware, a studio, or millions of dollars. What matters now is your ability to communicate an idea, make creative decisions, and follow a repeatable system. The barrier has completely collapsed.",
    slide: "SECRET #2",
  },
  {
    num: "03",
    title: "The Filmmaking Skills That Stay Valuable No Matter Which AI Tool Comes Out Next",
    body: "Storytelling. Camera language. Design and style. Editing and pacing. These skills never become obsolete. When a new tool drops, you don't panic and restart — you evaluate whether it adds value to the workflow you've already mastered. The system lasts. The tools evolve.",
    slide: "SECRET #3",
  },
];

function SecretsSection() {
  return (
    <section style={{ background: "#0d0d0d", padding: "72px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
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
          What You'll Learn in the Free Training
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            textAlign: "center",
            marginBottom: "52px",
            lineHeight: 1.2,
          }}
        >
          The 3 Secrets Behind the AI Film System™
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          {SECRETS.map((s) => (
            <div
              key={s.num}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: "24px",
                alignItems: "start",
                padding: "28px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(200,16,46,0.12)",
                    border: "2px solid rgba(200,16,46,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c8102e",
                    fontWeight: 900,
                    fontSize: "15px",
                    margin: "0 auto",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    color: "#c8102e",
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    marginTop: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.slide}
                </div>
              </div>
              <div>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    marginBottom: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "#888", lineHeight: 1.75, fontSize: "0.95rem", margin: 0 }}>{s.body}</p>
              </div>
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
              letterSpacing: "0.03em",
            }}
          >
            Send Me The Free Training →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Student Proof ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    handle: "@Tamer Osman",
    quote:
      "I thought I needed to master every AI tool before I could create professional films. The AI Film Production System™ showed me that mastering the process matters more than mastering the tools.",
  },
  {
    handle: "@Theresa Marshall",
    quote:
      "Before joining AI Film Academy, I had never created a professional AI film. I thought I wasn't creative enough and that all the AI tools were too overwhelming. Once I followed Brandon's system, everything finally clicked. I created films I never thought I was capable of.",
  },
  {
    handle: "@Jacob Atisha",
    quote:
      "Before joining, I felt like there was a new AI tool I had to learn every single week. Brandon's system completely changed the way I look at AI. Instead of chasing every new tool, I learned the filmmaking process behind great videos. Now when a new tool comes out, I don't panic.",
  },
];

function TestimonialsSection() {
  return (
    <section style={{ background: "#080808", padding: "72px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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
          The System Worked For Them Too
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            textAlign: "center",
            marginBottom: "48px",
            lineHeight: 1.2,
          }}
        >
          Creators Just Like You
        </h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.handle}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <p
                style={{
                  color: "#ccc",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                  marginBottom: "16px",
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>
              <p style={{ color: "#c8102e", fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>{t.handle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. What's Inside AFA ─────────────────────────────────────────────────────
const OFFER_ITEMS = [
  {
    title: "AI Film System™ Curriculum",
    desc: "A proven step-by-step system. From idea to script, storyboard, animation, and finished film. Master AI filmmaking in 30 days.",
    value: "$2,000 Value",
  },
  {
    title: "Live Creative GenJam Events",
    desc: "5-hour live creation competitions. Organizations pay $10,000 for one. You get access monthly as part of the community.",
    value: "$10,000 Value",
  },
  {
    title: "1-on-1 Support & Personal Film Reviews",
    desc: "Personal Loom reviews with real creative direction you can apply immediately. The same way I review my own production team.",
    value: "$2,000 Value",
  },
  {
    title: "AI Film Academy Certification",
    desc: "Proof you can produce professional AI films. A credential that stands out to clients, brands, and employers.",
    value: "$1,000 Value",
  },
];

function OfferSection() {
  return (
    <section style={{ background: "#0d0d0d", padding: "72px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
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
          After You Watch the Free Training
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            textAlign: "center",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          The Main Outcome: Build a Real Portfolio That Attracts Paid Client Work
        </h2>
        <p
          style={{
            color: "#777",
            textAlign: "center",
            marginBottom: "44px",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Everything inside AI Film Academy is built around one goal — finished work that proves you
          can take any idea through pre-production, production, and post-production.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
          {OFFER_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "16px",
                alignItems: "center",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
              }}
            >
              <div>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", marginBottom: "6px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
              <div
                style={{
                  color: "#c8102e",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(200,16,46,0.07)",
            border: "1px solid rgba(200,16,46,0.25)",
            borderRadius: "8px",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "4px" }}>Total Value</p>
            <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.6rem", margin: 0 }}>$15,000</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "4px" }}>Join Today For</p>
            <p style={{ color: "#c8102e", fontWeight: 900, fontSize: "1.6rem", margin: 0 }}>
              $499 <span style={{ fontSize: "1rem", color: "#888" }}>or $79/month</span>
            </p>
          </div>
        </div>

        <p
          style={{
            color: "#666",
            textAlign: "center",
            fontSize: "0.85rem",
            lineHeight: 1.6,
          }}
        >
          Watch the free training first. The offer will make complete sense after you see the system.
          Price increases after August 31. 30-day money-back guarantee.
        </p>
      </div>
    </section>
  );
}

// ─── 8. Final CTA Form ────────────────────────────────────────────────────────
function FinalCTA({ form }: { form: ReturnType<typeof useRegistrationForm> }) {
  return (
    <section
      style={{
        background: "#080808",
        padding: "72px 24px",
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
          Get Instant Access
        </p>
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)",
            marginBottom: "14px",
            lineHeight: 1.2,
          }}
        >
          Watch the Free AI Filmmaking Training Now
        </h2>
        <p
          style={{
            color: "#777",
            marginBottom: "32px",
            lineHeight: 1.65,
            fontSize: "1rem",
          }}
        >
          Enter your info below and I'll send you the free video training on demand. Watch it on your
          own schedule.
        </p>
        <FormBlock {...form} ctaText="Send Me The Free Training →" />
      </div>
    </section>
  );
}

// ─── 9. Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 24px",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/aifa-white-flask-film-academy-180.png"
        alt="AI Film Academy"
        style={{ height: "28px", opacity: 0.6, marginBottom: "12px" }}
      />
      <p style={{ color: "#333", fontSize: "0.78rem" }}>
        © {new Date().getFullYear()} AI Film Academy · Exemplar Industries LLC
      </p>
    </footer>
  );
}

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const CSS = `
  @media (max-width: 700px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-grid > div:first-child { max-width: 340px; margin: 0 auto; }
    .qual-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .testimonials-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FreeVideoTraining() {
  const form = useRegistrationForm();

  return (
    <>
      <style>{CSS}</style>
      <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "inherit" }}>
        <TopBar />
        <HeroSection form={form} />
        <QualificationSection />
        <AboutSection />
        <SecretsSection />
        <TestimonialsSection />
        <OfferSection />
        <FinalCTA form={form} />
        <Footer />
      </div>
    </>
  );
}
