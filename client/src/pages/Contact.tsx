import { useState } from "react";
import PageMeta from "@/components/PageMeta";

type InquiryType = "Production" | "Gen AI workshop" | "Something else";

const INQUIRY_TYPES: Array<{ title: InquiryType; description: string }> = [
  { title: "Production", description: "Commission an AI film, campaign, or visual story." },
  { title: "Gen AI workshop", description: "Bring a GenJam, workshop, or keynote to your team." },
  { title: "Something else", description: "Ask a question about AIFA, a partnership, or an idea." },
];

export default function Contact() {
  const [type, setType] = useState<InquiryType>("Production");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitInquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${type} inquiry for AI Film Academy`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${type}\n\n${message}`);
    window.location.href = `mailto:hello@aifilmacademy.com?subject=${subject}&body=${body}`;
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255,255,255,0.24)",
    borderRadius: "8px",
    background: "#141414",
    color: "#F5F5F0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1rem",
    lineHeight: 1.4,
    padding: "0.95rem 1rem",
  };

  return (
    <main className="contact-page" style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Contact AI Film Academy | Productions & Gen AI Workshops"
        description="Contact AI Film Academy about done-for-you AI film production, Gen AI workshops, GenJams, keynotes, and partnerships."
        path="/contact"
      />
      <style>{`
        .contact-page * { min-width: 0; }
        .contact-hero-title, .contact-form-title { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .015em; line-height: .86; text-transform: uppercase; }
        .contact-hero-title { max-width: 100%; font-size: clamp(3.75rem, 8vw, 8rem); }
        .contact-hero-title span, .contact-form-title span { display: block; }
        .contact-hero-title span { white-space: nowrap; }
        .contact-hero-title span:last-child, .contact-form-title span { color: #ef4444; }
        .contact-option-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; }
        .contact-option { min-height: 150px; border: 1px solid rgba(255,255,255,.18); border-radius: 8px; background: #111; color: #F5F5F0; padding: 1.3rem; text-align: left; transition: border-color 160ms ease, background 160ms ease; }
        .contact-option:hover, .contact-option[data-active='true'] { border-color: #ef4444; background: rgba(239,68,68,.09); }
        .contact-option strong { display: block; font-size: 1.2rem; line-height: 1.25; }
        .contact-option span { display: block; color: rgba(255,255,255,.84); font-size: 1rem; line-height: 1.5; margin-top: .55rem; }
        .contact-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .contact-form label { display: block; color: #F5F5F0; font-size: 1rem; font-weight: 700; line-height: 1.35; }
        .contact-form label span { display: block; margin-bottom: .5rem; }
        .contact-form textarea { min-height: 132px; resize: vertical; }
        @media (max-width: 760px) {
          .contact-page section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .contact-hero-title { max-width: 100%; font-size: clamp(3rem, 12vw, 4.5rem); }
          .contact-option-grid, .contact-form-grid { grid-template-columns: 1fr; }
          .contact-option { min-height: 0; padding: 1.15rem; }
        }
      `}</style>

      <section style={{ padding: "clamp(6.5rem, 12vw, 10rem) 1.5rem clamp(4rem, 8vw, 6.5rem)", background: "radial-gradient(ellipse at 88% 14%, rgba(190,24,24,.32), transparent 40%), #080808", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <a href="/" style={{ color: "#F5F5F0", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 className="contact-hero-title" style={{ margin: "2.4rem 0 1.45rem" }}><span>Talk to us</span><span>about the work.</span></h1>
          <p style={{ maxWidth: "650px", color: "rgba(255,255,255,.88)", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.65, margin: 0 }}>Whether you need a finished AI film, a Gen AI workshop, or the right next conversation, tell us what you are building and we will point you in the right direction.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <h2 className="contact-form-title" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: "0 0 1.5rem" }}>Tell us what you <span>need.</span></h2>
        <div className="contact-option-grid" style={{ marginBottom: "2rem" }}>
          {INQUIRY_TYPES.map((option) => (
            <button key={option.title} type="button" className="contact-option" data-active={type === option.title} onClick={() => setType(option.title)}>
              <strong>{option.title}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
        <form className="contact-form" onSubmit={submitInquiry} style={{ maxWidth: "760px" }}>
          <div className="contact-form-grid" style={{ marginBottom: "1rem" }}>
            <label><span>Name</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" style={fieldStyle} /></label>
            <label><span>Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" style={fieldStyle} /></label>
          </div>
          <label><span>What are you trying to make happen?</span><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Share a little context, timing, and what a good outcome looks like." style={{ ...fieldStyle, marginBottom: "1.1rem" }} /></label>
          <button type="submit" style={{ minHeight: "56px", width: "100%", border: 0, borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 800 }}>Send your inquiry →</button>
          <p style={{ color: "rgba(255,255,255,.84)", fontSize: "1rem", lineHeight: 1.55, margin: "1rem 0 0" }}>Production and organizational education engagements typically begin at $5,000.</p>
        </form>
      </section>
    </main>
  );
}
