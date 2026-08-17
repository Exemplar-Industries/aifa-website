import { FormEvent, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const HOW_WE_DO_IT = [
  {
    number: "01",
    title: "We design characters and art styles.",
    copy: "We define the visual language, character identity, and creative standard that make the world feel intentional.",
    image: "/assets/santiago-character-sheet-comic.png",
  },
  {
    number: "02",
    title: "We design worlds and storyboards.",
    copy: "We shape environments, key moments, pacing, and the visual route before production starts moving.",
    image: "/assets/storyboard-act-1-comic.png",
  },
  {
    number: "03",
    title: "We animate images into real footage.",
    copy: "We turn the visual system into motion, performance, and footage that carries the story forward.",
    video: "/assets/aifa-world-cup-short.mp4",
  },
  {
    number: "04",
    title: "We splice it together in post production.",
    copy: "We refine the edit, sound, pacing, and delivery so the final work lands as one complete piece.",
    image: "/assets/production-post-timeline.png",
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
        .productions-section--what { background: #0B0B0B; border-bottom: 1px solid rgba(255,255,255,.1); }
        .productions-section--inquiry { background: radial-gradient(ellipse at 22% 14%, color-mix(in srgb, var(--afa-red) 22%, transparent), transparent 42%), #080808; }
        .productions-section-heading { max-width: 900px; margin: 0; font-size: clamp(3.4rem, 7vw, 6.8rem); }
        .productions-section-heading span { color: var(--afa-red); }
        .productions-section-copy { max-width: 760px; margin: 1.25rem 0 0; color: rgba(255,255,255,.92); font-size: clamp(1.22rem, 1.85vw, 1.45rem); line-height: 1.55; font-weight: 650; }
        .productions-method-number { color: var(--afa-red); font-size: 1rem; font-weight: 900; letter-spacing: .08em; }
        .productions-method-list { display: grid; gap: 1rem; margin-top: 3rem; }
        .productions-method { display: grid; grid-template-columns: minmax(250px, .82fr) minmax(0, 1.18fr); overflow: hidden; min-height: 290px; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; background: linear-gradient(110deg, color-mix(in srgb, var(--afa-red) 12%, transparent), rgba(255,255,255,.025)); }
        .productions-method:nth-child(even), .productions-method:first-child { grid-template-columns: minmax(0, 1.18fr) minmax(250px, .82fr); }
        .productions-method:nth-child(even) .productions-method-media, .productions-method:first-child .productions-method-media { order: 2; }
        .productions-method-media { position: relative; overflow: hidden; min-height: 290px; background: #151515; }
        .productions-method:first-child .productions-method-media img { object-position: 18% center; }
        .productions-method:nth-child(2) .productions-method-media img { object-fit: contain; object-position: center; }
        .productions-method-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.08), rgba(0,0,0,.45)); pointer-events: none; }
        .productions-method-media img, .productions-method-media video { display: block; width: 100%; height: 100%; min-height: 290px; object-fit: cover; filter: saturate(.82) contrast(1.1); }
        .productions-method-watermark { position: absolute; z-index: 2; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; color: color-mix(in srgb, var(--afa-red) 78%, #111); font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 5vw, 5.2rem); font-weight: 400; letter-spacing: .12em; line-height: .86; opacity: .34; pointer-events: none; text-align: center; text-shadow: 0 1px 0 rgba(255,255,255,.28), 0 0 14px rgba(255,255,255,.36); transform: rotate(-24deg) scale(1.12); }
        .productions-method-copy { display: flex; flex-direction: column; justify-content: center; padding: clamp(1.7rem, 4vw, 4rem); }
        .productions-method h3 { max-width: 650px; margin: 1rem 0; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.9rem, 5vw, 5.8rem); line-height: .88; letter-spacing: .02em; text-transform: uppercase; }
        .productions-method p { max-width: 620px; margin: 0; color: rgba(255,255,255,.9); font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.58; font-weight: 650; }
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
          .productions-method, .productions-method:nth-child(even), .productions-method:first-child { grid-template-columns: 1fr; }
          .productions-method:nth-child(even) .productions-method-media { order: 0; }
          .productions-method:first-child .productions-method-media { order: 2; }
          .productions-method-media, .productions-method-media img, .productions-method-media video { min-height: 230px; }
        }
        @media (max-width: 540px) {
          .productions-hero { padding-top: 6rem; }
          .productions-title { font-size: clamp(3.35rem, 15vw, 4.8rem); }
          .productions-hero-copy, .productions-section-copy { font-size: 1.17rem; }
          .productions-primary { width: 100%; }
          .productions-form-grid { grid-template-columns: 1fr; }
          .productions-field--full { grid-column: auto; }
          .productions-method-media, .productions-method-media img, .productions-method-media video { min-height: 200px; }
        }
      `}</style>

      <section className="productions-hero">
        <div className="productions-shell">
          <p className="productions-kicker">AIFA Production Studio</p>
          <h1 className="productions-display productions-title"><span>No more gatekeepers.</span><span>Bring Any idea to life.</span></h1>
          <p className="productions-hero-copy">Work with our in house production studio for ambitious animations, commercials, and trailers.</p>
          <div className="productions-actions"><a className="productions-primary" href="#production-inquiry">Start a Production Conversation <ArrowRight size={20} /></a></div>
        </div>
      </section>

      <section className="productions-section productions-section--what">
        <div className="productions-shell">
          <h2 className="productions-display productions-section-heading">What <span>we do.</span></h2>
          <p className="productions-section-copy">Animations, commercials, and trailers that carry a clear point of view.</p>
          <div className="productions-method-list">
            {HOW_WE_DO_IT.map(({ number, title, copy, image, video }) => (
              <article key={number} className="productions-method">
                <div className="productions-method-media">
                  {image && <img src={image} alt="" />}
                  {video && <video src={number === "03" ? `${video}#t=6` : video} autoPlay muted playsInline onLoadedMetadata={(event) => { if (number === "03") event.currentTarget.currentTime = 6; }} onEnded={(event) => { if (number === "03") { event.currentTarget.currentTime = 6; void event.currentTarget.play(); } }} />}
                  {(number === "01" || number === "02") && <span className="productions-method-watermark" aria-hidden="true">AIFA<br />{number === "01" ? "CHARACTER SHEET" : "STORYBOARD"}</span>}
                </div>
                <div className="productions-method-copy">
                  <span className="productions-method-number">{number}</span>
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
