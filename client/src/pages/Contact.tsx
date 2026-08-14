import { useMemo, useState } from "react";
import PageMeta from "@/components/PageMeta";

type Intent = "education" | "production" | "events" | "collaboration";
type FormState = "idle" | "qualified" | "not_a_fit";

const CALENDLY_URL = "https://calendly.com/llcexemplar/strategy-call-w-brandon";

const PATHS: Array<{ id: Intent; eyebrow: string; title: string; description: string; accent?: boolean }> = [
  {
    id: "education",
    eyebrow: "For creators",
    title: "Learn AI filmmaking",
    description: "Build your own process, finish stronger work, and get feedback inside AI Film Academy.",
  },
  {
    id: "production",
    eyebrow: "For ambitious campaigns",
    title: "Have it produced for you",
    description: "Commission premium AI film, campaign, or visual-storytelling work built around your creative brief.",
    accent: true,
  },
  {
    id: "events",
    eyebrow: "For organizations",
    title: "Bring AI education to your team",
    description: "GenJams, hands-on workshops, and keynote experiences that turn curiosity into capability.",
  },
];

const PRODUCTION_SCOPES = ["A 30–60 second AI film or spot", "A 1–3 minute film or campaign piece", "A multi-asset campaign or content system", "I need help defining the right scope"];
const EVENT_SCOPES = ["A hands-on GenJam", "A team workshop", "A keynote or speaking engagement", "A custom education program"];
const PRODUCTION_BUDGETS = ["Under $5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000+"];
const EVENT_BUDGETS = ["Under $5,000", "$5,000–$15,000", "$15,000–$35,000", "$35,000+"];

export default function Contact() {
  const [intent, setIntent] = useState<Intent>("production");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [scope, setScope] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const isServiceInquiry = intent === "production" || intent === "events";
  const scopeOptions = intent === "production" ? PRODUCTION_SCOPES : EVENT_SCOPES;
  const budgetOptions = intent === "production" ? PRODUCTION_BUDGETS : EVENT_BUDGETS;
  const calendarHref = useMemo(() => {
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (email.trim()) params.set("email", email.trim());
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [name, email]);

  function choosePath(path: Intent) {
    setIntent(path);
    setScope("");
    setBudget("");
    setFormState("idle");
    requestAnimationFrame(() => document.getElementById("qualification")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isServiceInquiry) return;
    const isQualified = budget !== "Under $5,000";
    setFormState(isQualified ? "qualified" : "not_a_fit");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "9px",
    background: "rgba(255,255,255,0.045)",
    color: "#F5F5F0",
    padding: "0.95rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.86)",
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
  };

  return (
    <main style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Contact AI Film Academy | Production, GenJams & Creative-AI Education"
        description="Start a qualified inquiry for done-for-you AI film production, organizational GenJams, hands-on workshops, or creative-AI keynotes from AI Film Academy."
        path="/contact"
      />
      <style>{`
        .work-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: rgba(255,255,255,0.12); }
        .work-path { border: 0; background: #101010; color: #F5F5F0; padding: 2rem; text-align: left; transition: background 180ms ease, transform 180ms ease; }
        .work-path:hover { background: #171717; transform: translateY(-3px); }
        .work-path:active { transform: scale(0.98); }
        .work-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .work-form-shell { display: grid; grid-template-columns: 0.86fr 1.14fr; gap: 1px; background: rgba(255,255,255,0.12); }
        .work-option { display: flex; align-items: flex-start; gap: .7rem; border: 1px solid rgba(255,255,255,.11); border-radius: 9px; background: rgba(255,255,255,.025); color: rgba(255,255,255,.72); padding: .85rem .9rem; text-align: left; transition: border-color 160ms ease, background 160ms ease; }
        .work-option:hover { border-color: rgba(239,68,68,.55); background: rgba(239,68,68,.06); }
        @media (max-width: 760px) { .work-grid, .work-form-shell, .work-field-grid { grid-template-columns: 1fr; } .work-path { padding: 1.5rem; } }
        @media (prefers-reduced-motion: reduce) { .work-path, .work-option { transition: none; } }
      `}</style>

      <section style={{ position: "relative", padding: "clamp(6.5rem, 12vw, 10rem) 1.5rem 5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 85% 15%, rgba(190,24,24,0.28), transparent 38%), radial-gradient(ellipse at 16% 80%, rgba(99,16,16,0.18), transparent 32%), #080808" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ maxWidth: "900px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8.8rem)", fontWeight: 400, letterSpacing: "0.02em", lineHeight: 0.84, margin: 0 }}>
            Start a conversation <span style={{ color: "#ef4444" }}>worth having.</span>
          </h1>
          <p style={{ maxWidth: "640px", marginTop: "1.7rem", color: "rgba(255,255,255,0.64)", fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.7 }}>Questions about the Academy, a production brief, a GenJam, a workshop, or a thoughtful partnership? Choose the reason you are reaching out and we will point you to the right next step.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "4.5rem 1.5rem" }}>
        <h2 style={{ maxWidth: "700px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5.1rem)", fontWeight: 400, letterSpacing: "0.02em", lineHeight: 0.92, margin: "0 0 2.4rem" }}>A clear question deserves a clear <span style={{ color: "#ef4444" }}>next step.</span></h2>
        <div className="work-grid">
          {PATHS.map((path, index) => (
            <button key={path.id} type="button" className="work-path" onClick={() => choosePath(path.id)} style={{ boxShadow: intent === path.id ? "inset 0 0 0 1px #ef4444" : undefined }}>
              <h3 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", fontWeight: 400, letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: "1rem" }}>{path.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.65, margin: 0 }}>{path.description}</p>
              <span style={{ display: "block", color: "#f87171", fontSize: "1rem", fontWeight: 800, marginTop: "2rem" }}>Explore this path →</span>
            </button>
          ))}
        </div>
      </section>

      <section id="qualification" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0d0d0d", scrollMarginTop: "2rem" }}>
        <div className="work-form-shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <aside style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)", background: "linear-gradient(145deg, rgba(131,24,24,.34), rgba(8,8,8,.96) 62%)" }}>
            {intent === "education" && <>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 5vw, 4.7rem)", lineHeight: 0.88, letterSpacing: "0.02em", marginBottom: "1.2rem" }}>Build your own <span style={{ color: "#ef4444" }}>creative practice.</span></h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7 }}>AI Film Academy membership is the best first move if you want the workflow, feedback, community, GenJams, and finished work that move a personal portfolio forward.</p>
            </>}
            {intent === "production" && <>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 5vw, 4.7rem)", lineHeight: 0.88, letterSpacing: "0.02em", marginBottom: "1.2rem" }}>A serious brief deserves <span style={{ color: "#ef4444" }}>serious craft.</span></h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7 }}>We work best with brands, founders, and creative teams that value original direction, strong visual storytelling, and a clear commercial purpose.</p>
              <a href="/productions" style={{ display: "inline-block", color: "#f87171", fontSize: "1rem", fontWeight: 800, marginTop: "1.35rem", textDecoration: "none" }}>View the production approach →</a>
            </>}
            {intent === "events" && <>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 5vw, 4.7rem)", lineHeight: 0.88, letterSpacing: "0.02em", marginBottom: "1.2rem" }}>Give your people an AI experience they will <span style={{ color: "#ef4444" }}>actually use.</span></h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7 }}>GenJams, workshops, and keynotes are designed to turn passive interest into creative momentum, with practical, memorable exercises that make the technology real.</p>
              <a href="/education-events" style={{ display: "inline-block", color: "#f87171", fontSize: "1rem", fontWeight: 800, marginTop: "1.35rem", textDecoration: "none" }}>View the education formats →</a>
            </>}
            {intent === "collaboration" && <>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 5vw, 4.7rem)", lineHeight: 0.88, letterSpacing: "0.02em", marginBottom: "1.2rem" }}>Have a thoughtful collaboration in mind?</h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7 }}>For media, partnership, and collaboration ideas that do not fit a production or organization engagement, send a concise note with the opportunity and why AIFA is the right fit.</p>
            </>}
          </aside>

          <div style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)", background: "#101010" }}>
            {intent === "education" ? (
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1rem" }}>Start with the <span style={{ color: "#ef4444" }}>membership.</span></h3>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7, maxWidth: "560px", marginBottom: "1.8rem" }}>You do not need a sales call to begin learning. Explore the membership, see what is included, and choose the path that fits how you want to build.</p>
                <a href="/membership" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", borderRadius: "9px", padding: "0 1.35rem", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "0.9rem", fontWeight: 800, textDecoration: "none", boxShadow: "0 0 30px rgba(239,68,68,.25)" }}>Explore AI Film Academy Membership</a>
              </div>
            ) : intent === "collaboration" ? (
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1rem" }}>Keep it concise. Make it <span style={{ color: "#ef4444" }}>relevant.</span></h3>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7, maxWidth: "560px", marginBottom: "1.8rem" }}>Include your name, organization, the opportunity, relevant timing, and why the collaboration is a fit. The team will review aligned inquiries.</p>
                <a href="mailto:hello@aifilmacademy.com?subject=Collaboration%20Inquiry%20for%20AI%20Film%20Academy" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", borderRadius: "9px", padding: "0 1.35rem", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: "0.9rem", fontWeight: 800, textDecoration: "none" }}>Send a collaboration inquiry</a>
              </div>
            ) : formState === "qualified" ? (
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1rem" }}>Let’s talk about the <span style={{ color: "#ef4444" }}>brief.</span></h3>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7, maxWidth: "560px", marginBottom: "1.7rem" }}>Your project appears aligned for a strategy call. Choose a time that works and we will use the conversation to confirm objectives, scope, timing, and the smartest next move.</p>
                <a href={calendarHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", borderRadius: "9px", padding: "0 1.35rem", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "0.9rem", fontWeight: 800, textDecoration: "none", boxShadow: "0 0 30px rgba(239,68,68,.25)" }}>Choose a strategy-call time →</a>
                <button type="button" onClick={() => setFormState("idle")} style={{ display: "block", marginTop: "1rem", border: 0, background: "transparent", color: "rgba(255,255,255,.82)", fontSize: "1rem", fontWeight: 700, textDecoration: "underline" }}>Edit your answers</button>
              </div>
            ) : formState === "not_a_fit" ? (
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1rem" }}>This engagement may not be the right fit <span style={{ color: "#ef4444" }}>yet.</span></h3>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.06rem", lineHeight: 1.7, maxWidth: "560px", marginBottom: "1.7rem" }}>Custom production and organizational education engagements begin at $5,000. If you are building your own capabilities or planning a future project, the membership is a strong place to start.</p>
                <a href="/membership" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "52px", borderRadius: "9px", padding: "0 1.35rem", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: "0.9rem", fontWeight: 800, textDecoration: "none" }}>Explore membership instead</a>
                <button type="button" onClick={() => setFormState("idle")} style={{ display: "block", marginTop: "1rem", border: 0, background: "transparent", color: "rgba(255,255,255,.82)", fontSize: "1rem", fontWeight: 700, textDecoration: "underline" }}>Edit your answers</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1.6rem" }}>{intent === "production" ? "Tell us about the production." : "Tell us about the experience."}</h3>
                <div className="work-field-grid" style={{ marginBottom: "1rem" }}>
                  <label><span style={labelStyle}>Name</span><input required value={name} onChange={(event) => setName(event.target.value)} style={inputStyle} placeholder="Your name" /></label>
                  <label><span style={labelStyle}>Work email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} style={inputStyle} placeholder="you@company.com" /></label>
                </div>
                <label style={{ display: "block", marginBottom: "1rem" }}><span style={labelStyle}>{intent === "production" ? "Brand or organization" : "Organization"}</span><input required value={organization} onChange={(event) => setOrganization(event.target.value)} style={inputStyle} placeholder={intent === "production" ? "Brand, company, or project" : "Organization or institution"} /></label>
                <label style={{ display: "block", marginBottom: "1rem" }}><span style={labelStyle}>What best describes the scope?</span><select required value={scope} onChange={(event) => setScope(event.target.value)} style={{ ...inputStyle, appearance: "auto" }}><option value="" disabled>Select one</option>{scopeOptions.map((option) => <option key={option} value={option} style={{ color: "#111" }}>{option}</option>)}</select></label>
                <label style={{ display: "block", marginBottom: "1rem" }}><span style={labelStyle}>Planned budget</span><select required value={budget} onChange={(event) => setBudget(event.target.value)} style={{ ...inputStyle, appearance: "auto" }}><option value="" disabled>Select one</option>{budgetOptions.map((option) => <option key={option} value={option} style={{ color: "#111" }}>{option}</option>)}</select></label>
                <label style={{ display: "block", marginBottom: "1.4rem" }}><span style={labelStyle}>Anything else we should know? <span style={{ color: "rgba(255,255,255,.78)", fontWeight: 600 }}>(Optional)</span></span><textarea value={details} onChange={(event) => setDetails(event.target.value)} style={{ ...inputStyle, minHeight: "112px", resize: "vertical" }} placeholder={intent === "production" ? "Goals, audience, launch date, references, or creative direction." : "Audience, location, desired outcomes, timing, or team context."} /></label>
                <button type="submit" style={{ minHeight: "54px", width: "100%", border: 0, borderRadius: "9px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem", fontWeight: 800, boxShadow: "0 0 30px rgba(239,68,68,.22)" }}>See your next step →</button>
                <p style={{ color: "rgba(255,255,255,.82)", fontSize: "1rem", lineHeight: 1.55, marginTop: "1rem", textAlign: "center" }}>Custom production and organizational education engagements begin at $5,000.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "4.5rem 1.5rem 5.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 400, letterSpacing: "0.02em", lineHeight: 0.88, marginBottom: "1.4rem" }}>The goal is not more AI content. It is <span style={{ color: "#ef4444" }}>better creative work.</span></h2>
        <a href="/" style={{ color: "rgba(255,255,255,.84)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>Back to AI Film Academy</a>
      </section>
    </main>
  );
}
