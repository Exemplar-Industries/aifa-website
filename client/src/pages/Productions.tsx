import { FormEvent, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const PROCESS = [
  {
    number: "01",
    title: "You bring the idea.",
    copy: "Bring us the story, product, or campaign you want to see on screen. A real starting point is all we need.",
    mediaLabel: "Concept",
    image: "/assets/afa-outcome-charart1.png",
  },
  {
    number: "02",
    title: "We align on the vision.",
    copy: "We listen to the style, audience, runtime, intended use, and references that will define the work.",
    mediaLabel: "Vision",
    image: "/assets/afa-featured-event-charart3.png",
  },
  {
    number: "03",
    title: "We bring it to life.",
    copy: "Our AI-native production studio builds the characters, worlds, motion, footage, and final edit around your idea.",
    mediaLabel: "Final frame",
    video: "/assets/aifa-world-cup-short.mp4",
  },
];

export default function Productions() {
  const [submitted, setSubmitted] = useState(false);

  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Production inquiry: ${form.get("whatToMake") || "New AIFA production"}`;
    const body = [
      `Name: ${form.get("name") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Company / brand: ${form.get("company") || ""}`,
      `What they want to make: ${form.get("whatToMake") || ""}`,
      `Estimated runtime: ${form.get("runtime") || ""}`,
      `Budget: ${form.get("budget") || ""}`,
      `Target timeline: ${form.get("timeline") || ""}`,
      `References: ${form.get("references") || ""}`,
      "",
      "Idea brief:",
      `${form.get("brief") || ""}`,
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:hello@aifilmacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="productions-page">
      <PageMeta
        title="AI Production Studio | Animation, Commercials & Trailers | AI Film Academy"
        description="AIFA is an AI-native production studio for ambitious animation, commercials, and trailers. Bring us the idea. We bring it to life."
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
        .productions-hero-copy { max-width: 700px; margin: 1.7rem 0 0; color: rgba(255,255,255,.94); font-size: clamp(1.25rem, 2vw, 1.55rem); line-height: 1.52; font-weight: 650; }
        .productions-actions { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-top: 2rem; }
        .productions-primary { display: inline-flex; align-items: center; justify-content: center; gap: .7rem; min-height: 60px; padding: 0 1.5rem; border: 0; border-radius: 8px; background: var(--afa-red); color: #fff; font: inherit; font-size: 1.08rem; font-weight: 800; text-decoration: none; cursor: pointer; }
        .productions-primary:hover { background: #df0000; }
        .productions-section { padding: clamp(4.75rem, 9vw, 7.5rem) 1.5rem; }
        .productions-section--process { background: #0B0B0B; border-bottom: 1px solid rgba(255,255,255,.1); }
        .productions-section--inquiry { background: radial-gradient(ellipse at 22% 14%, color-mix(in srgb, var(--afa-red) 22%, transparent), transparent 42%), #080808; }
        .productions-section-heading { max-width: 870px; margin: 0; font-size: clamp(3.4rem, 7vw, 6.8rem); }
        .productions-section-heading span { color: var(--afa-red); }
        .productions-section-copy { max-width: 760px; margin: 1.25rem 0 0; color: rgba(255,255,255,.92); font-size: clamp(1.22rem, 1.85vw, 1.45rem); line-height: 1.55; font-weight: 650; }
        .productions-process { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 3rem; }
        .productions-step { overflow: hidden; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; background: #101010; }
        .productions-media { position: relative; min-height: 250px; overflow: hidden; background: #171717; border-bottom: 1px solid rgba(255,255,255,.14); }
        .productions-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,.46) 100%); pointer-events: none; }
        .productions-media img, .productions-media video { display: block; width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center; }
        .productions-media img { filter: saturate(.82) contrast(1.08); transform: scale(1.03); }
        .productions-media video { filter: saturate(.78) contrast(1.12); }
        .productions-media-label { position: absolute; z-index: 1; left: 1.15rem; bottom: 1.05rem; color: #fff; font-size: 1rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .productions-step-content { display: flex; flex: 1; flex-direction: column; padding: clamp(1.35rem, 3vw, 2.1rem); }
        .productions-step-number { color: var(--afa-red); font-size: 1rem; font-weight: 900; letter-spacing: .08em; }
        .productions-step h3 { margin: 1rem 0 .9rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 4vw, 3.7rem); line-height: .9; letter-spacing: .02em; text-transform: uppercase; }
        .productions-step p { margin: 0; color: rgba(255,255,255,.9); font-size: 1.08rem; line-height: 1.58; font-weight: 600; }
        .productions-inquiry { display: block; max-width: 850px; margin: 0 auto; }
        .productions-inquiry-heading { margin-bottom: 2rem; }
        .productions-form { display: grid; gap: 1rem; padding: clamp(1.5rem, 3vw, 2.4rem); border: 1px solid rgba(255,255,255,.22); border-radius: 12px; background: rgba(255,255,255,.04); }
        .productions-form h3 { margin: 0 0 .35rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.6rem, 4.2vw, 4rem); line-height: .9; letter-spacing: .02em; text-transform: uppercase; }
        .productions-form-intro { margin: 0 0 .55rem; color: rgba(255,255,255,.88); font-size: 1.14rem; line-height: 1.55; font-weight: 650; }
        .productions-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        .productions-field { display: grid; gap: .5rem; }
        .productions-field--full { grid-column: 1 / -1; }
        .productions-field label { color: #F5F5F0; font-size: 1rem; font-weight: 800; }
        .productions-field small { color: rgba(255,255,255,.72); font-size: .9rem; line-height: 1.45; font-weight: 600; }
        .productions-field input, .productions-field textarea, .productions-field select { width: 100%; border: 1px solid rgba(255,255,255,.26); border-radius: 7px; background: #101010; color: #F5F5F0; padding: .85rem .95rem; font: inherit; font-size: 1rem; font-weight: 600; outline: none; }
        .productions-field textarea { min-height: 128px; resize: vertical; }
        .productions-field input:focus, .productions-field textarea:focus, .productions-field select:focus { border-color: var(--afa-red); box-shadow: 0 0 0 3px color-mix(in srgb, var(--afa-red) 22%, transparent); }
        .productions-note { margin: 0; color: rgba(255,255,255,.72); font-size: .98rem; line-height: 1.5; font-weight: 600; }
        .productions-success { margin: 0; color: #F5F5F0; font-size: 1rem; font-weight: 750; }
        @media (max-width: 820px) {
          .productions-page section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .productions-title { font-size: clamp(3.55rem, 14.5vw, 5.6rem); }
          .productions-title span { white-space: normal; }
          .productions-process { grid-template-columns: 1fr; }
          .productions-media { min-height: 235px; }
        }
        @media (max-width: 540px) {
          .productions-hero { padding-top: 6rem; }
          .productions-title { font-size: clamp(3.35rem, 15vw, 4.8rem); }
          .productions-hero-copy, .productions-section-copy { font-size: 1.17rem; }
          .productions-primary { width: 100%; }
          .productions-form-grid { grid-template-columns: 1fr; }
          .productions-field--full { grid-column: auto; }
          .productions-media { min-height: 220px; }
        }
      `}</style>

      <section className="productions-hero">
        <div className="productions-shell">
          <p className="productions-kicker">AIFA Production Studio</p>
          <h1 className="productions-display productions-title"><span>No more gatekeepers.</span><span>Any idea brought to life.</span></h1>
          <p className="productions-hero-copy">AIFA is an AI-native production studio for ambitious animations, commercials, and trailers. Bring us the idea. We bring it to life.</p>
          <div className="productions-actions"><a className="productions-primary" href="#production-inquiry">Start a Production Conversation <ArrowRight size={20} /></a></div>
        </div>
      </section>

      <section className="productions-section productions-section--process">
        <div className="productions-shell">
          <h2 className="productions-display productions-section-heading">From idea to <span>final frame.</span></h2>
          <p className="productions-section-copy">We are always excited to work on animation, commercials, and trailers that push the boundaries of creativity.</p>
          <div className="productions-process">
            {PROCESS.map(({ number, title, copy, mediaLabel, image, video }) => (
              <article key={number} className="productions-step">
                <div className="productions-media" aria-label={`${mediaLabel} visual frame`}>
                  {image && <img src={image} alt="" />}
                  {video && <video src={video} autoPlay muted loop playsInline />}
                  <span className="productions-media-label">{mediaLabel}</span>
                </div>
                <div className="productions-step-content">
                  <span className="productions-step-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="production-inquiry" className="productions-section productions-section--inquiry">
        <div className="productions-shell productions-inquiry">
          <div className="productions-inquiry-heading">
            <h2 className="productions-display productions-section-heading">Have an idea <span>in mind?</span></h2>
          </div>
          <form className="productions-form" onSubmit={sendInquiry}>
            <h3>Contact us.</h3>
            <p className="productions-form-intro">Bring the idea. We will take it from here.</p>
            <div className="productions-form-grid">
              <div className="productions-field"><label htmlFor="production-name">Name</label><input id="production-name" name="name" required /></div>
              <div className="productions-field"><label htmlFor="production-email">Email</label><input id="production-email" name="email" type="email" required /></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-company">Company or brand</label><input id="production-company" name="company" /></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-what">What do you want to make?</label><select id="production-what" name="whatToMake" required defaultValue=""><option value="" disabled>Select one</option><option>Animation</option><option>Commercial</option><option>Story trailer</option><option>Other custom production</option></select></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-runtime">Estimated runtime</label><select id="production-runtime" name="runtime" defaultValue=""><option value="" disabled>Select one</option><option>Under 60 seconds</option><option>1 to 3 minutes</option><option>3 to 5 minutes</option><option>Over 5 minutes</option><option>Not sure yet</option></select></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-budget">Budget</label><select id="production-budget" name="budget" required defaultValue=""><option value="" disabled>Select one</option><option>$5,000 to $15,000</option><option>$15,000 to $30,000</option><option>$30,000+</option></select></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-timeline">Target timeline</label><input id="production-timeline" name="timeline" placeholder="Example: October launch" /></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-references">Reference links</label><small>Links only. For Google Drive, set sharing to anyone with the link can view.</small><input id="production-references" name="references" placeholder="Paste links here" /></div>
              <div className="productions-field productions-field--full"><label htmlFor="production-brief">Tell us about the idea</label><textarea id="production-brief" name="brief" required placeholder="Tell us about the idea." /></div>
            </div>
            <button className="productions-primary" type="submit">Send Your Production Brief <Send size={19} /></button>
            <p className="productions-note">Production briefs go directly to hello@aifilmacademy.com.</p>
            {submitted && <p className="productions-success">Your email draft is ready. If it did not open, email hello@aifilmacademy.com directly.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
