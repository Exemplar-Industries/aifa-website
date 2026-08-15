import { FormEvent, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const SERVICES = [
  ["GenJam", "A live six-hour creative challenge where teams make, share, learn, and build together."],
  ["Workshop", "A practical one-to-two-hour collaborative session that makes creative AI useful in the work your team already does."],
  ["Keynote", "A focused talk for teams that need a better creative-AI conversation than a tool list."],
];

const OUTCOMES = [
  ["Shared language", "A human-centered way to talk about creative AI beyond hype or fear, including the policy, safety, and ethical questions that matter to your organization."],
  ["Real participation", "Guided exercises that move people from watching to making, so creative AI becomes a human experience instead of a presentation."],
  ["Expert Support", "A stronger creative point of view and a next step that fits the work your organization actually does."],
];

export default function EducationEvents() {
  const [submitted, setSubmitted] = useState(false);

  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Events inquiry: ${form.get("service") || "AIFA event"}`;
    const body = [
      `Name: ${form.get("name") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Organization: ${form.get("organization") || ""}`,
      `Service interest: ${form.get("service") || ""}`,
      `Location format: ${form.get("format") || ""}`,
      `City / state: ${form.get("location") || ""}`,
      `Budget range: ${form.get("budget") || ""}`,
      "",
      "Team and event brief:",
      `${form.get("brief") || ""}`,
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:hello@aifilmacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="events-page">
      <PageMeta
        title="GenJams, Workshops & Keynotes | AI Film Academy"
        description="Human-centered creative AI experiences that help people create together, safely and responsibly, through GenJams, workshops, and keynotes from AI Film Academy."
        path="/education-events"
      />
      <style>{`
        .events-page { min-height: 100vh; overflow-x: hidden; background: #080808; color: #F5F5F0; font-family: 'DM Sans', sans-serif; }
        .events-page * { min-width: 0; box-sizing: border-box; }
        .events-display { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .018em; line-height: .88; text-transform: uppercase; }
        .events-shell { width: min(1120px, 100%); margin: 0 auto; }
        .events-hero { padding: clamp(7rem, 13vw, 11rem) 1.5rem clamp(5rem, 9vw, 7rem); background: radial-gradient(ellipse at 10% 15%, color-mix(in srgb, var(--afa-red) 31%, transparent), transparent 40%), linear-gradient(145deg, #090909, #090909 67%, #180606); border-bottom: 1px solid rgba(255,255,255,.1); }
        .events-kicker { display: inline-flex; align-items: center; gap: .65rem; color: rgba(255,255,255,.9); font-size: 1.08rem; font-weight: 800; margin-bottom: 1.8rem; }
        .events-kicker::before { content: ''; width: 34px; height: 2px; background: var(--afa-red); }
        .events-title { margin: 0; font-size: clamp(4.15rem, 9vw, 9.6rem); max-width: 970px; }
        .events-title span { display: block; white-space: nowrap; }
        .events-title span:last-child { color: var(--afa-red); }
        .events-hero-copy { max-width: 760px; margin: 1.7rem 0 0; color: rgba(255,255,255,.94); font-size: clamp(1.25rem, 2vw, 1.55rem); font-weight: 650; line-height: 1.52; }
        .events-primary { display: inline-flex; align-items: center; justify-content: center; gap: .7rem; min-height: 60px; margin-top: 2rem; padding: 0 1.5rem; border: 0; border-radius: 8px; background: var(--afa-red); color: #fff; font: inherit; font-size: 1.08rem; font-weight: 800; text-decoration: none; cursor: pointer; }
        .events-primary:hover { background: #df0000; }
        .events-section { padding: clamp(4.75rem, 9vw, 7.5rem) 1.5rem; }
        .events-section--services { background: #0B0B0B; border-bottom: 1px solid rgba(255,255,255,.1); }
        .events-section--outcomes { background: radial-gradient(ellipse at 88% 12%, color-mix(in srgb, var(--afa-red) 20%, transparent), transparent 38%), #080808; }
        .events-heading { max-width: 900px; margin: 0; font-size: clamp(3.4rem, 7vw, 6.8rem); }
        .events-heading span { color: var(--afa-red); }
        .events-intro { max-width: 760px; margin: 1.25rem 0 0; color: rgba(255,255,255,.92); font-size: clamp(1.2rem, 1.85vw, 1.45rem); font-weight: 650; line-height: 1.55; }
        .events-services { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 3rem; }
        .events-service { display: flex; flex-direction: column; min-height: 310px; padding: clamp(1.4rem, 3vw, 2.2rem); border: 1px solid rgba(255,255,255,.2); border-radius: 12px; background: linear-gradient(145deg, color-mix(in srgb, var(--afa-red) 18%, transparent), rgba(255,255,255,.03)); }
        .events-service-index { color: var(--afa-red); font-size: 1rem; font-weight: 900; letter-spacing: .09em; }
        .events-service h3 { margin: 2.6rem 0 .9rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.2vw, 4rem); font-weight: 400; letter-spacing: .018em; line-height: .9; text-transform: uppercase; }
        .events-service p { margin: 0; color: rgba(255,255,255,.9); font-size: 1.08rem; line-height: 1.58; font-weight: 600; }
        .events-outcomes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.2rem; margin-top: 2.6rem; }
        .events-outcome { border-top: 2px solid var(--afa-red); padding-top: 1rem; }
        .events-outcome h3 { margin: 0 0 .8rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.3rem, 3.5vw, 3.35rem); line-height: .9; letter-spacing: .018em; text-transform: uppercase; }
        .events-outcome p { margin: 0; color: rgba(255,255,255,.9); font-size: 1.08rem; font-weight: 600; line-height: 1.58; }
        .events-inquiry { max-width: 860px; margin: clamp(4rem, 8vw, 6.25rem) auto 0; padding-top: clamp(4rem, 7vw, 5.8rem); border-top: 1px solid rgba(255,255,255,.15); }
        .events-inquiry-heading { margin-bottom: 2rem; }
        .events-form { display: grid; gap: 1rem; padding: clamp(1.5rem, 3vw, 2.4rem); border: 1px solid rgba(255,255,255,.22); border-radius: 12px; background: rgba(255,255,255,.04); }
        .events-form h3 { margin: 0 0 .35rem; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.6rem, 4.2vw, 4rem); font-weight: 400; letter-spacing: .018em; line-height: .9; text-transform: uppercase; }
        .events-form-intro { margin: 0 0 .55rem; color: rgba(255,255,255,.88); font-size: 1.08rem; line-height: 1.55; font-weight: 600; }
        .events-form-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .events-field { display: grid; gap: .5rem; }
        .events-field--full { grid-column: 1 / -1; }
        .events-field label { color: #F5F5F0; font-size: 1rem; font-weight: 800; }
        .events-field input, .events-field textarea, .events-field select { width: 100%; border: 1px solid rgba(255,255,255,.26); border-radius: 7px; background: #101010; color: #F5F5F0; padding: .85rem .95rem; font: inherit; font-size: 1rem; font-weight: 600; outline: none; }
        .events-field textarea { min-height: 128px; resize: vertical; }
        .events-field input:focus, .events-field textarea:focus, .events-field select:focus { border-color: var(--afa-red); box-shadow: 0 0 0 3px color-mix(in srgb, var(--afa-red) 22%, transparent); }
        .events-note { margin: 0; color: rgba(255,255,255,.72); font-size: .98rem; font-weight: 600; line-height: 1.5; }
        .events-success { margin: 0; color: #F5F5F0; font-size: 1rem; font-weight: 750; }
        @media (max-width: 820px) {
          .events-page section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .events-title { font-size: clamp(3.55rem, 14.5vw, 5.6rem); }
          .events-title span { white-space: normal; }
          .events-services, .events-outcomes { grid-template-columns: 1fr; }
          .events-service { min-height: 0; }
          .events-service h3 { margin-top: 2rem; }
        }
        @media (max-width: 540px) {
          .events-hero { padding-top: 6rem; }
          .events-title { font-size: clamp(3.35rem, 15vw, 4.8rem); }
          .events-hero-copy, .events-intro { font-size: 1.17rem; }
          .events-primary { width: 100%; }
          .events-form-grid { grid-template-columns: 1fr; }
          .events-field--full { grid-column: auto; }
        }
      `}</style>

      <section className="events-hero">
        <div className="events-shell">
          <h1 className="events-display events-title"><span>Make creative AI</span><span>feel human.</span></h1>
          <p className="events-hero-copy">GenJams, Workshops, and Keynotes that help people create together with AI, safely, responsibly, and without losing the human part.</p>
          <a className="events-primary" href="#event-inquiry">Plan an event with AIFA <ArrowRight size={20} /></a>
        </div>
      </section>

      <section className="events-section events-section--services">
        <div className="events-shell">
          <h2 className="events-display events-heading">Our <span>Services.</span></h2>
          <p className="events-intro">Bring your people together for a practical, creative-AI experience built around participation, conversation, and work they can carry forward.</p>
          <div className="events-services">
            {SERVICES.map(([title, copy], index) => <article className="events-service" key={title}><span className="events-service-index">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="events-section events-section--outcomes">
        <div className="events-shell">
          <h2 className="events-display events-heading">Leave with more than <span>a tool list.</span></h2>
          <div className="events-outcomes">
            {OUTCOMES.map(([title, copy]) => <article className="events-outcome" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>

          <div id="event-inquiry" className="events-inquiry">
            <div className="events-inquiry-heading">
              <h2 className="events-display events-heading">Contact <span>Us.</span></h2>
            </div>
            <form className="events-form" onSubmit={sendInquiry}>
              <div className="events-form-grid">
                <div className="events-field"><label htmlFor="event-name">Name</label><input id="event-name" name="name" required /></div>
                <div className="events-field"><label htmlFor="event-email">Email</label><input id="event-email" name="email" type="email" required /></div>
                <div className="events-field events-field--full"><label htmlFor="event-organization">Organization</label><input id="event-organization" name="organization" /></div>
                <div className="events-field"><label htmlFor="event-service">What would you like to host?</label><select id="event-service" name="service" required defaultValue=""><option value="" disabled>Select one</option><option>GenJam</option><option>Workshop</option><option>Keynote</option></select></div>
                <div className="events-field"><label htmlFor="event-format">Location format</label><select id="event-format" name="format" required defaultValue=""><option value="" disabled>Select one</option><option>In person</option><option>Online</option><option>Hybrid</option></select></div>
                <div className="events-field"><label htmlFor="event-budget">Budget</label><select id="event-budget" name="budget" defaultValue=""><option value="" disabled>Select one</option><option>$5,000 to $15,000</option><option>$15,000 to $30,000</option><option>$30,000+</option></select></div>
                <div className="events-field"><label htmlFor="event-location">City / state</label><input id="event-location" name="location" placeholder="Example: Austin, Texas" /></div>
                <div className="events-field"><label htmlFor="event-brief">Message</label><textarea id="event-brief" name="brief" required placeholder="Tell us what you are planning." /></div>
              </div>
              <button className="events-primary" type="submit">Send Your Event Brief <Send size={19} /></button>
              <p className="events-note">Event briefs go directly to hello@aifilmacademy.com.</p>
              {submitted && <p className="events-success">Your email draft is ready. If it did not open, email hello@aifilmacademy.com directly.</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
