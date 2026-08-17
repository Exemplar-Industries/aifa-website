import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { deliverAifaForm } from "@/lib/formDelivery";

type InquiryTopic = "production" | "event" | "membership" | "other";

const TOPIC_DETAILS: Record<InquiryTopic, { label: string; messageLabel: string; messagePlaceholder: string }> = {
  production: {
    label: "Production project",
    messageLabel: "Tell us about the idea",
    messagePlaceholder: "Tell us about the idea, where it will live, and what a strong final result looks like.",
  },
  event: {
    label: "Workshop, GenJam, or keynote",
    messageLabel: "Tell us about the event",
    messagePlaceholder: "Share the audience, goals, and what you want people to leave with.",
  },
  membership: {
    label: "AIFA membership",
    messageLabel: "How can we help?",
    messagePlaceholder: "Tell us what you would like to know about the membership, training, or community.",
  },
  other: {
    label: "Something else",
    messageLabel: "Message",
    messagePlaceholder: "Tell us what you are reaching out about.",
  },
};

export default function Contact() {
  const [topic, setTopic] = useState<InquiryTopic>("production");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const sendInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topicDetails = TOPIC_DETAILS[topic];

    try {
      await deliverAifaForm("Contact inquiry", {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        topic: topicDetails.label,
        company: topic === "production" ? String(form.get("company") || "") : "",
        projectType: topic === "production" ? String(form.get("projectType") || "") : "",
        delivery: topic === "event" ? String(form.get("delivery") || "") : "",
        location: topic === "event" ? String(form.get("location") || "") : "",
        budget: topic === "production" || topic === "event" ? String(form.get("budget") || "") : "",
        message: String(form.get("message") || ""),
      });
      setSubmitted(true);
      setSubmitError(false);
    } catch {
      setSubmitError(true);
      setSubmitted(false);
    }
  };

  return (
    <main className="contact-page">
      <PageMeta
        title="Contact AI Film Academy | Productions, Events & Membership"
        description="Contact AI Film Academy about a production project, a workshop or keynote, AIFA membership, or another creative inquiry."
        path="/contact"
      />

      <style>{`
        .contact-page { min-height: 100vh; overflow-x: hidden; background: #080808; color: #F5F5F0; font-family: 'DM Sans', sans-serif; }
        .contact-page * { min-width: 0; box-sizing: border-box; }
        .contact-display { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .018em; line-height: .9; text-transform: uppercase; }
        .contact-shell { width: min(930px, 100%); margin: 0 auto; }
        .contact-section { min-height: 100vh; display: flex; align-items: center; padding: clamp(7.5rem, 13vw, 11rem) 1.5rem clamp(5rem, 9vw, 7rem); background: radial-gradient(ellipse at 84% 10%, color-mix(in srgb, var(--afa-red) 28%, transparent), transparent 43%), linear-gradient(145deg, #090909, #080808 68%, #160606); }
        .contact-form { display: grid; gap: 1rem; padding: clamp(1.35rem, 3.3vw, 2.5rem); border: 1px solid rgba(255,255,255,.2); border-radius: 14px; background: linear-gradient(135deg, color-mix(in srgb, var(--afa-red) 9%, transparent), rgba(255,255,255,.035)); }
        .contact-form h2 { margin: 0 0 .1rem; font-size: clamp(2.55rem, 5vw, 4.25rem); color: #F5F5F0; }
        .contact-form-intro { max-width: 660px; margin: 0 0 .7rem; color: rgba(255,255,255,.9); font-size: 1.12rem; font-weight: 600; line-height: 1.55; }
        .contact-field { display: grid; gap: .5rem; }
        .contact-field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        .contact-field label { color: #F5F5F0; font-size: 1rem; font-weight: 800; }
        .contact-field small { color: rgba(255,255,255,.74); font-size: .93rem; font-weight: 600; line-height: 1.45; }
        .contact-field input, .contact-field select, .contact-field textarea { width: 100%; border: 1px solid rgba(255,255,255,.28); border-radius: 7px; outline: none; background: #101010; color: #F5F5F0; padding: .9rem .95rem; font: inherit; font-size: 1rem; font-weight: 600; }
        .contact-field textarea { min-height: 138px; resize: vertical; }
        .contact-field input:focus, .contact-field select:focus, .contact-field textarea:focus { border-color: var(--afa-red); box-shadow: 0 0 0 3px color-mix(in srgb, var(--afa-red) 22%, transparent); }
        .contact-submit { display: inline-flex; min-height: 60px; align-items: center; justify-content: center; gap: .7rem; border: 0; border-radius: 8px; background: var(--afa-red); color: #fff; font: inherit; font-size: 1.08rem; font-weight: 800; cursor: pointer; }
        .contact-submit:hover { background: #df0000; }
        .contact-note, .contact-success { margin: 0; color: rgba(255,255,255,.76); font-size: .98rem; font-weight: 600; line-height: 1.5; }
        .contact-success { color: #F5F5F0; }
        @media (max-width: 680px) {
          .contact-page section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .contact-field-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="contact-section">
        <div className="contact-shell">
          <form className="contact-form" onSubmit={sendInquiry}>
            <h2 className="contact-display">Contact Us.</h2>
            <p className="contact-form-intro">Tell us what you are looking to create, learn, or bring to your team. We will make sure the right conversation starts.</p>

            <div className="contact-field">
              <label htmlFor="contact-topic">What are you reaching out about?</label>
              <select id="contact-topic" value={topic} onChange={(event) => setTopic(event.target.value as InquiryTopic)}>
                {(Object.keys(TOPIC_DETAILS) as InquiryTopic[]).map((key) => <option key={key} value={key}>{TOPIC_DETAILS[key].label}</option>)}
              </select>
            </div>

            <div className="contact-field-grid">
              <div className="contact-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required /></div>
              <div className="contact-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required /></div>
            </div>

            {topic === "production" && <>
              <div className="contact-field"><label htmlFor="contact-company">Company or brand</label><input id="contact-company" name="company" /></div>
              <div className="contact-field-grid">
                <div className="contact-field"><label htmlFor="contact-project-type">What do you want to make?</label><select id="contact-project-type" name="projectType" required defaultValue=""><option value="" disabled>Select one</option><option>Animation</option><option>Commercial</option><option>Story trailer</option><option>Other custom production</option></select></div>
                <div className="contact-field"><label htmlFor="contact-production-budget">Budget</label><select id="contact-production-budget" name="budget" required defaultValue=""><option value="" disabled>Select one</option><option>$5,000 to $15,000</option><option>$15,000 to $30,000</option><option>$30,000+</option></select></div>
              </div>
            </>}

            {topic === "event" && <div className="contact-field-grid">
              <div className="contact-field"><label htmlFor="contact-delivery">How should it happen?</label><select id="contact-delivery" name="delivery" required defaultValue=""><option value="" disabled>Select one</option><option>In person</option><option>Online</option><option>Hybrid</option></select></div>
              <div className="contact-field"><label htmlFor="contact-location">City and state</label><input id="contact-location" name="location" placeholder="Example: Austin, TX" required /></div>
              <div className="contact-field"><label htmlFor="contact-event-budget">Budget</label><select id="contact-event-budget" name="budget" required defaultValue=""><option value="" disabled>Select one</option><option>Under $5,000</option><option>$5,000 to $15,000</option><option>$15,000+</option></select></div>
            </div>}

            <div className="contact-field">
              <label htmlFor="contact-message">{TOPIC_DETAILS[topic].messageLabel}</label>
              <textarea id="contact-message" name="message" required placeholder={TOPIC_DETAILS[topic].messagePlaceholder} />
            </div>

            <button className="contact-submit" type="submit">Send Inquiry <Send size={19} /></button>
            <p className="contact-note">Inquiries go directly to brandon@aifilmacademy.com.</p>
            {submitted && <p className="contact-success">Your inquiry has been sent. We will be in touch soon.</p>}
            {submitError && <p className="contact-success">We could not send your inquiry. Please email brandon@aifilmacademy.com directly.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
