import { FormEvent, useState } from "react";
import { ArrowRight, Check, Clapperboard, Film, Send, Sparkles } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const WORK_TYPES = [
  "Animation",
  "Commercials",
  "Product Films",
  "Book Trailers",
  "Visual Effects",
  "Campaign Creative",
];

const PROCESS = [
  {
    number: "01",
    title: "You bring the idea.",
    copy: "A story, product, campaign, or visual world you already want to make. You do not need every answer. You need a real starting point.",
    icon: Clapperboard,
  },
  {
    number: "02",
    title: "We align on the vision.",
    copy: "We talk through the style, audience, runtime, intended use, references, and the creative standard the work needs to meet.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "We bring it to life.",
    copy: "Our AI-native production studio builds the characters, worlds, motion, footage, and final edit around your idea.",
    icon: Film,
  },
];

export default function Productions() {
  const [submitted, setSubmitted] = useState(false);

  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Production inquiry: ${form.get("project") || "New AIFA production"}`;
    const body = [
      `Name: ${form.get("name") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Company / brand: ${form.get("company") || ""}`,
      `Project: ${form.get("project") || ""}`,
      `What do you want made: ${form.get("deliverable") || ""}`,
      `Budget range: ${form.get("budget") || ""}`,
      `Target timeline: ${form.get("timeline") || ""}`,
      `Reference links: ${form.get("references") || ""}`,
      "",
      "Brief:",
      `${form.get("brief") || ""}`,
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:hello@aifilmacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="productions-page">
      <PageMeta
        title="AI Production Studio | Animation, Commercials & Trailers | AI Film Academy"
        description="AIFA is an AI-native production studio for story-driven animation, commercials, trailers, product films, and visual-effects-forward work."
        path="/productions"
      />

      <style>{`
        .productions-page { min-height: 100vh; overflow-x: hidden; background: #080808; color: #F5F5F0; font-family: 'DM Sans', sans-serif; }
        .productions-page * { min-width: 0; box-sizing: border-box; }
        .productions-display { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .018em; line-height: .88; text-transform: uppercase; }
        .productions-hero { padding: clamp(7rem, 13vw, 11rem) 1.5rem clamp(5rem, 9vw, 7rem); background: radial-gradient(ellipse at 85% 6%, color-mix(in srgb, var(--afa-red) 34%, transparent), transparent 41%), linear-gradient(145deg, #090909, #090909 65%, #180606); border-bottom: 1px solid rgba(255,255,255,.1); }
        .productions-shell { width: min(1120px, 100%); margin: 0 auto; }
        .productions-kicker { display: inline-flex; align-items: center; gap: .65rem; color: rgba(255,255,255,.9); font-size: 1.08rem; font-weight: 800; margin-bottom: 1.8rem; }
        .productions-kicker::before { content: ''; width: 34px; height: 2px; background: var(--afa-red); }
        .productions-title { margin: 0; max-width: 1000px; font-size: clamp(4.15rem, 9vw, 9.8rem); }
        .productions-title span { display: block; white-space: nowrap; }
        .productions-title span:last-child { color: var(--afa-red); }
        .productions-hero-copy { max-width: 750px; margin: 1.7rem 0 0; color: rgba(255,255,255,.94); font-size: clamp(1.25rem, 2vw, 1.55rem); line-height: 1.52; font-weight: 650; }
        .productions-actions { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-top: 2rem; }
        .productions-primary { display: inline-flex; align-items: center; justify-content: center; gap: .7rem; min-height: 60px; padding: 0 1.5rem; border: 0; border-radius: 8px; background: var(--afa-red); color: #fff; font: inherit; font-size: 1.08rem; font-weight: 800; text-decoration: none; cursor: pointer; }
        .productions-primary:hover { background: #df0000; }
        .productions-secondary { display: inline-flex; align-items: center; gap: .55rem; min-height: 60px; color: #F5F5F0; font-size: 1.05rem; font-weight: 800; text-decoration: none; }
        .productions-qualifier { max-width: 660px; margin: 1.25rem 0 0; color: rgba(255,255,255,.8); font-size: 1.08rem; line-height: 1.55; font-weight: 650; }
        .productions-qualifier strong { color: #F5F5F0; }
        .productions-section { padding: clamp(4.75rem, 9vw, 7.5rem) 1.5rem; }
        .productions-section--work { background: #0B0B0B; border-bottom: 1px solid rgba(255,255,255,.1); }
        .productions-section--inquiry { background: radial-gradient(ellipse at 22% 14%, color-mix(in srgb, var(--afa-red) 22%, transparent), transparent 42%), #080808; }
        .productions-section-heading { max-width: 870px; margin: 0; font-size: clamp(3.4rem, 7vw, 6.8rem); }
        .productions-section-heading span { color: var(--afa-red); }
        .productions-section-copy { max-width: 780px; margin: 1.25rem 0 0; color: rgba(255,255,255,.92); font-size: clamp(1.22rem, 1.85vw, 1.45rem); line-height: 1.55; font-weight: 650; }
        .productions-work-types { display: flex; flex-wrap: wrap; gap: .75rem; margin: 2rem 0 0; }
        .productions-work-types span { border: 1px solid rgba(255,255,255,.22); border-radius: 999px; padding: .7rem 1rem; background: rgba(255,255,255,.04); color: #F5F5F0; font-size: 1rem; font-weight: 750; }
        .productions-process { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 3rem; }
        .productions-step { min-height: 360px; display: flex; flex-direction: column; padding: clamp(1.5rem, 3vw, 2.35rem); border: 1px solid rgba(255,255,255,.2); border-radius: 12px; background: linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025)); }
        .productions-step:nth-child(2) { background: linear-gradient(145deg, color-mix(in srgb, var(--afa-red) 18%, transparent), rgba(255,255,255,.03)); }
        .productions-step-number { color: var(--afa-red); font-size: 1rem; font-weight: 900; letter-spacing: .08em; }
        .productions-step-icon { width: 48px; height: 48px; display: grid; place-items: center; margin: 1.35rem 0 auto; border: 1px solid rgba(255,255,255,.28); border-radius: 9px; color: #F5F5F0; }
        .productions-step h3 { margin: 2rem 0 .9rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 4vw, 3.7rem); line-height: .9; letter-spacing: .02em; text-transform: uppercase; }
        .productions-step p { margin: 0; color: rgba(255,255,255,.9); font-size: 1.08rem; line-height: 1.58; font-weight: 600; }
        .productions-showcase-link { display: inline-flex; align-items: center; gap: .55rem; margin-top: 1.75rem; color: #F5F5F0; font-size: 1.05rem; font-weight: 800; text-decoration: none; }
        .productions-showcase-link:hover { color: var(--afa-red); }
        .productions-inquiry-grid { display: grid; grid-template-columns: .86fr 1.14fr; gap: clamp(2rem, 6vw, 5rem); align-items: start; }
        .productions-range { margin: 2rem 0 0; border-top: 1px solid rgba(255,255,255,.18); }
        .productions-range p { margin: 0; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.9); font-size: 1.08rem; line-height: 1.5; font-weight: 650; }
        .productions-range strong { color: var(--afa-red); }
        .productions-form { display: grid; gap: 1rem; padding: clamp(1.5rem, 3vw, 2.4rem); border: 1px solid rgba(255,255,255,.22); border-radius: 12px; background: rgba(255,255,255,.04); }
        .productions-form h3 { margin: 0 0 .3rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.6rem, 4.2vw, 4rem); line-height: .9; letter-spacing: .02em; text-transform: uppercase; }
        .productions-form-intro { margin: 0 0 .55rem; color: rgba(255,255,255,.88); font-size: 1.08rem; line-height: 1.55; font-weight: 600; }
        .productions-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        .productions-field { display: grid; gap: .5rem; }
        .productions-field--full { grid-column: 1 / -1; }
        .productions-field label { color: #F5F5F0; font-size: 1rem; font-weight: 800; }
        .productions-field input, .productions-field textarea, .productions-field select { width: 100%; border: 1px solid rgba(255,255,255,.26); border-radius: 7px; background: #101010; color: #F5F5F0; padding: .85rem .95rem; font: inherit; font-size: 1rem; font-weight: 600; outline: none; }
        .productions-field textarea { min-height: 128px; resize: vertical; }
        .productions-field input:focus, .productions-field textarea:focus, .productions-field select:focus { border-color: var(--afa-red); box-shadow: 0 0 0 3px color-mix(in srgb, var(--afa-red) 22%, transparent); }
        .productions-note { margin: 0; color: rgba(255,255,255,.72); font-size: .98rem; line-height: 1.5; font-weight: 600; }
        .productions-success { margin: 0; color: #F5F5F0; font-size: 1rem; font-weight: 750; }
        @media (max-width: 820px) {
          .productions-page section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .productions-title { font-size: clamp(3.55rem, 14.5vw, 5.6rem); }
          .productions-title span { white-space: normal; }
          .productions-process, .productions-inquiry-grid { grid-template-columns: 1fr; }
          .productions-step { min-height: 0; }
          .productions-step-icon { margin-bottom: 1rem; }
          .productions-step h3 { margin-top: 1rem; }
        }
        @media (max-width: 540px) {
          .productions-hero { padding-top: 6rem; }
          .productions-title { font-size: clamp(3.35rem, 15vw, 4.8rem); }
          .productions-hero-copy, .productions-section-copy { font-size: 1.17rem; }
          .productions-actions { align-items: stretch; }
          .productions-primary { width: 100%; }
          .productions-secondary { min-height: auto; padding: .55rem 0; }
          .productions-form-grid { grid-template-columns: 1fr; }
          .productions-field--full { grid-column: auto; }
        }
      `}</style>

      <section className="productions-hero">
        <div className="productions-shell">
          <p className="productions-kicker">AIFA Production Studio</p>
          <h1 className="productions-display productions-title"><span>No more gatekeepers.</span><span>Any idea brought to life.</span></h1>
          <p className="productions-hero-copy">AIFA is an AI-native production studio for ambitious animation, commercials, trailers, and visual-effects-forward work. Bring us the story, product, or campaign. We build the visual world around it.</p>
          <div className="productions-actions">
            <a className="productions-primary" href="#production-inquiry">Start a Production Conversation <ArrowRight size={20} /></a>
            <a className="productions-secondary" href="/showcase">See what’s possible <ArrowRight size={18} /></a>
          </div>
          <p className="productions-qualifier"><strong>Production engagements typically range from $5,000 to $15,000 for work up to roughly three minutes.</strong> Longer or more complex productions are scoped through a custom quote.</p>
        </div>
      </section>

      <section className="productions-section productions-section--work">
        <div className="productions-shell">
          <h2 className="productions-display productions-section-heading">Bring the story. <span>We build the world.</span></h2>
          <p className="productions-section-copy">We are always excited to work on animation and commercials that push the boundaries of creativity. We work best with filmmakers, producers, authors, brands, and creators who already have a story, idea, product, or audience in mind.</p>
          <div className="productions-work-types">{WORK_TYPES.map((type) => <span key={type}>{type}</span>)}</div>
          <div className="productions-process">
            {PROCESS.map(({ number, title, copy, icon: Icon }) => (
              <article key={number} className="productions-step">
                <span className="productions-step-number">{number}</span>
                <div className="productions-step-icon"><Icon size={25} strokeWidth={2} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <a className="productions-showcase-link" href="/showcase">See selected work in the Showcase <ArrowRight size={18} /></a>
        </div>
      </section>

      <section id="production-inquiry" className="productions-section productions-section--inquiry">
        <div className="productions-shell productions-inquiry-grid">
          <div>
            <h2 className="productions-display productions-section-heading">Have a story worth <span>bringing to life?</span></h2>
            <p className="productions-section-copy">Tell us what you want to make, where it will live, and the creative standard it needs to meet. We will review the brief for fit, scope, and next steps.</p>
            <div className="productions-range">
              <p><strong>$5,000 to $15,000</strong><br />Most productions up to roughly three minutes.</p>
              <p><strong>Custom quote</strong><br />Longer, multi-asset, or higher-complexity productions.</p>
            </div>
          </div>

          <form className="productions-form" onSubmit={sendInquiry}>
            <h3>Start the conversation.</h3>
            <p className="productions-form-intro">Bring the idea. We will take it from here.</p>
            <div className="productions-form-grid">
              <div className="productions-field"><label htmlFor="production-name">Name</label><input id="production-name" name="name" required /></div>
              <div className="productions-field"><label htmlFor="production-email">Email</label><input id="production-email" name="email" type="email" required /></div>
              <div className="productions-field"><label htmlFor="production-company">Company or brand</label><input id="production-company" name="company" /></div>
              <div className="productions-field"><label htmlFor="production-project">Project name</label><input id="production-project" name="project" required /></div>
              <div className="productions-field"><label htmlFor="production-deliverable">What do you want made?</label><select id="production-deliverable" name="deliverable" defaultValue=""><option value="" disabled>Select one</option><option>Animation</option><option>Commercial or product film</option><option>Trailer or visual story</option><option>Visual effects or campaign creative</option><option>Other custom production</option></select></div>
              <div className="productions-field"><label htmlFor="production-budget">Budget range</label><select id="production-budget" name="budget" defaultValue=""><option value="" disabled>Select one</option><option>$5,000 to $15,000</option><option>$15,000 to $30,000</option><option>$30,000+</option></select></div>
              <div className="productions-field"><label htmlFor="production-timeline">Target timeline</label><input id="production-timeline" name="timeline" placeholder="Example: October launch" /></div>
              <div className="productions-field"><label htmlFor="production-references">Reference links</label><input id="production-references" name="references" placeholder="Optional" /></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-brief">Tell us about the idea</label><textarea id="production-brief" name="brief" required placeholder="What is the story, product, or campaign? Who is it for, and what should the final work accomplish?" /></div>
            </div>
            <button className="productions-primary" type="submit">Send Your Production Brief <Send size={19} /></button>
            <p className="productions-note">Submitting opens a pre-filled email to hello@aifilmacademy.com with your brief.</p>
            {submitted && <p className="productions-success">Your email draft is ready. If it did not open, email hello@aifilmacademy.com directly.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
