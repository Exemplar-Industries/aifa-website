import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Turnstile from "@/components/Turnstile";
import { deliverAifaForm } from "@/lib/formDelivery";
import { LearnerRedirectNote } from "@/components/SharedInquiryFields";

const CALENDLY_URL = "https://calendly.com/llcexemplar/strategy-call-w-brandon";
const CONTACT_EMAIL = "brandon@aifilmacademy.com";

const WAYS = [
  {
    title: "Author animation",
    copy: "Animations for authors and storytellers, from character design and storyboards to the final edit, sound, and voiceover. You send the brief, I run the production.",
  },
  {
    title: "Edtech consulting",
    copy: "Help for schools and learning programs that want creative AI in the classroom: curriculum, workshops, and a workflow the team can keep using.",
  },
  {
    title: "Business consulting",
    copy: "Help for marketing and creative teams starting with AI video: a team intensive, ongoing advising, and custom workflow builds.",
  },
];

const QUOTES = [
  {
    quote: "This is a 5-star service. The communication, quality, and final product are awesome and always on time, with the value added of cooperation and insights.",
    name: "Rodrigo J. Gonzalez, production client",
  },
  {
    quote: "Working with Brandon and his team was nothing less than amazing. Their attention to detail and commitment to providing top quality is unmatchable.",
    name: "Noor Fiad, production client",
  },
];

const NEEDS = ["Author animation", "Edtech consulting", "Business consulting"];

export default function WorkWithBrandon() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const sendInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!turnstileToken) return;
    const form = new FormData(event.currentTarget);
    try {
      await deliverAifaForm("Author animation or consulting inquiry", {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        organization: String(form.get("organization") || ""),
        need: String(form.get("need") || ""),
        timeline: String(form.get("timeline") || ""),
        message: String(form.get("message") || ""),
      });
      setSubmitted(true);
      setSubmitError("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : `We could not send your note. Please email ${CONTACT_EMAIL} directly.`);
      setSubmitted(false);
    }
  };

  return (
    <main className="work-page">
      <PageMeta
        title="Work with Brandon Patino | AI Film Academy"
        description="Author animation and edtech or business consulting with Brandon Patino. Inquiries go to brandon@aifilmacademy.com."
        path="/work-with-brandon"
      />
      <style>{`
        .work-page { min-height: 100vh; background: #080808; color: #F5F5F0; font-family: 'DM Sans', sans-serif; }
        .work-page * { box-sizing: border-box; }
        .work-display { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .02em; line-height: .9; text-transform: uppercase; }
        .work-shell { width: min(1080px, 100%); margin: 0 auto; }
        .work-hero { padding: clamp(7rem, 13vw, 10rem) 1.5rem clamp(4rem, 8vw, 6rem); background: radial-gradient(ellipse at 85% 8%, color-mix(in srgb, var(--afa-red) 32%, transparent), transparent 42%), #080808; border-bottom: 1px solid rgba(255,255,255,.1); text-align: center; }
        .work-hero h1 { margin: 0 auto; max-width: 16ch; font-size: clamp(3.4rem, 8vw, 6.6rem); }
        .work-hero p { max-width: 42rem; margin: 1.4rem auto 0; color: rgba(255,255,255,.92); font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 650; line-height: 1.5; }
        .work-primary { display: inline-flex; align-items: center; justify-content: center; min-height: 58px; margin-top: 1.8rem; padding: 0 1.4rem; border-radius: 8px; background: var(--afa-red); color: #fff; font-weight: 800; text-decoration: none; }
        .work-primary:hover { background: #df0000; }
        .work-section { padding: clamp(4rem, 8vw, 6.5rem) 1.5rem; }
        .work-section h2 { margin: 0; text-align: center; font-size: clamp(2.8rem, 6vw, 4.8rem); }
        .work-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 2rem; }
        .work-card, .work-proof, .work-step { border: 1px solid rgba(255,255,255,.18); border-radius: 12px; background: rgba(255,255,255,.04); padding: 1.4rem; }
        .work-card h3, .work-proof h3 { margin: 0 0 .7rem; font-size: clamp(1.8rem, 3vw, 2.4rem); }
        .work-card p, .work-proof p, .work-about p, .work-step p { margin: 0; color: rgba(255,255,255,.9); line-height: 1.6; font-weight: 600; }
        .work-proofs { display: grid; gap: 1rem; margin-top: 2rem; }
        .work-video { width: 100%; margin-top: 1rem; border-radius: 10px; background: #000; }
        .work-quotes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .work-quotes blockquote { margin: 0; }
        .work-quotes footer { margin-top: .8rem; color: rgba(255,255,255,.7); font-size: .95rem; }
        .work-about { max-width: 44rem; margin: 1.4rem auto 0; text-align: center; }
        .work-steps { display: grid; gap: .8rem; margin-top: 1.6rem; }
        .work-step { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: start; }
        .work-step span { color: var(--afa-red); font-family: 'Bebas Neue', sans-serif; font-size: 2rem; line-height: 1; }
        .work-form-wrap { max-width: 760px; margin: 0 auto; }
        .work-form { display: grid; gap: 1rem; margin-top: 1.6rem; padding: 1.4rem; border: 1px solid rgba(255,255,255,.2); border-radius: 12px; background: rgba(255,255,255,.04); }
        .work-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .work-field { display: grid; gap: .45rem; }
        .work-field--full { grid-column: 1 / -1; }
        .work-field label { font-weight: 800; }
        .work-field input, .work-field select, .work-field textarea { width: 100%; border: 1px solid rgba(255,255,255,.26); border-radius: 7px; background: #101010; color: #F5F5F0; padding: .85rem .95rem; font: inherit; font-weight: 600; }
        .work-field textarea { min-height: 140px; resize: vertical; }
        .work-submit { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; min-height: 56px; border: 0; border-radius: 8px; background: var(--afa-red); color: #fff; font: inherit; font-weight: 800; cursor: pointer; }
        .work-submit:disabled { opacity: .55; cursor: not-allowed; }
        .work-note { color: rgba(255,255,255,.74); font-weight: 650; }
        .work-calendly { margin-top: 1.4rem; text-align: center; }
        .work-calendly a { color: #fff; font-weight: 800; }
        @media (max-width: 800px) {
          .work-grid, .work-quotes, .work-fields { grid-template-columns: 1fr; }
          .work-field--full { grid-column: auto; }
        }
      `}</style>

      <section className="work-hero">
        <div className="work-shell">
          <h1 className="work-display">Work with Brandon Patino</h1>
          <p>Author animation, plus edtech and business consulting, for authors, schools, and companies.</p>
          <a className="work-primary" href="#project-form">Tell me about your project</a>
        </div>
      </section>

      <section className="work-section">
        <div className="work-shell">
          <h2 className="work-display">Three ways to work together</h2>
          <div className="work-grid">
            {WAYS.map((way) => (
              <article className="work-card" key={way.title}>
                <h3 className="work-display">{way.title}</h3>
                <p>{way.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section" style={{ background: "#0B0B0B", borderTop: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div className="work-shell">
          <h2 className="work-display">Recent work</h2>
          <div className="work-proofs">
            <article className="work-proof">
              <h3 className="work-display">BetterYouth GenJam, El Segundo, CA</h3>
              <p>BetterYouth wanted to explore how new technology could support a creative process while keeping human ideas at the center. AI Film Academy ran a six-hour pilot using Machine Cinema's GenJam format. Teams went from story prompts to character references, storyboards, and visual generation, with live coaching along the way. A follow-up session built on the pilot.</p>
              <p style={{ marginTop: ".8rem" }}>Photos by Jonathan Waas.</p>
            </article>
            <article className="work-proof">
              <h3 className="work-display">Machine Cinema Director's Cup, July 14</h3>
              <video className="work-video" controls playsInline preload="metadata">
                <source src="/assets/aifa-world-cup-short.mp4" type="video/mp4" />
              </video>
            </article>
            <div className="work-quotes">
              {QUOTES.map((item) => (
                <article className="work-proof" key={item.name}>
                  <blockquote>
                    <p>"{item.quote}"</p>
                    <footer>{item.name}</footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work-section">
        <div className="work-shell">
          <h2 className="work-display">About Brandon</h2>
          <div className="work-about">
            <p>I have spent 15 years in design and media, including more than five years running my own video editing agency. For the last two years I have worked in creative AI as a producer, workshop host, and educator. I run AI Film Academy, a community of 1,100+ AI filmmakers, and I facilitate GenJams with Machine Cinema.</p>
          </div>
        </div>
      </section>

      <section className="work-section" style={{ background: "#0B0B0B" }}>
        <div className="work-shell">
          <h2 className="work-display">How it starts</h2>
          <div className="work-steps">
            <article className="work-step"><span>1</span><p>Send the form with the animation or consulting work you need, and your timeline.</p></article>
            <article className="work-step"><span>2</span><p>I reply within two business days with the right next step.</p></article>
            <article className="work-step"><span>3</span><p>We agree on scope and a quote, then get to work.</p></article>
          </div>
        </div>
      </section>

      <section className="work-section" id="project-form">
        <div className="work-form-wrap">
          <h2 className="work-display" style={{ textAlign: "center" }}>Author animation and consulting</h2>
          <p className="work-note" style={{ marginTop: "1rem", textAlign: "center" }}>This form is for an author animation project or for edtech and business consulting.</p>
          <LearnerRedirectNote />
          <form className="work-form" onSubmit={sendInquiry}>
            <div className="work-fields">
              <div className="work-field">
                <label htmlFor="work-name">Name</label>
                <input id="work-name" name="name" required />
              </div>
              <div className="work-field">
                <label htmlFor="work-email">Email</label>
                <input id="work-email" name="email" type="email" required />
              </div>
              <div className="work-field work-field--full">
                <label htmlFor="work-organization">Organization</label>
                <input id="work-organization" name="organization" />
              </div>
              <div className="work-field work-field--full">
                <label htmlFor="work-need">What do you need?</label>
                <select id="work-need" name="need" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  {NEEDS.map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
              <div className="work-field work-field--full">
                <label htmlFor="work-timeline">Timeline</label>
                <input id="work-timeline" name="timeline" placeholder="When do you want to start?" />
              </div>
              <div className="work-field work-field--full">
                <label htmlFor="work-message">Message</label>
                <textarea id="work-message" name="message" required placeholder="What animation do you want made, or what consulting help do you need?" />
              </div>
            </div>
            <Turnstile action="work-with-brandon" theme="dark" onTokenChange={setTurnstileToken} />
            <button className="work-submit" type="submit" disabled={!turnstileToken}>Send the form <Send size={18} /></button>
            <p className="work-note">Goes straight to {CONTACT_EMAIL}.</p>
            {submitted && <p className="work-note">Your note has been received. Check your inbox for a confirmation.</p>}
            {submitError && <p className="work-note">{submitError}</p>}
          </form>
          <p className="work-calendly">
            If you already know the scope, you can also <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">book a call</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
