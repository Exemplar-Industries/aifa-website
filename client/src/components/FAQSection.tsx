/*
 * FAQSection — Address objections before they kill the sale
 * Design: "The Director's Cut" — accordion style, dark bg
 */
import { useState } from "react";
import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";

const faqs = [
  {
    q: "Do I need any prior filmmaking or AI experience?",
    a: "No. The AIFA is built for creators at all levels — from complete beginners to experienced filmmakers looking to add AI to their workflow. We start with the fundamentals and build up from there.",
  },
  {
    q: "What tools will I need? Are they expensive?",
    a: "We cover a range of tools, including free options. The stack guide tells you which tools are worth using and which you can skip. Most members can start with free tools.",
  },
  {
    q: "How is this different from free YouTube tutorials?",
    a: "YouTube gives you scattered information with no structure. AIFA gives you a complete, step-by-step system — the workflow, the stack, the community, and the certification — all in one place. You also get community access, direct feedback, and a structured path from beginner to certified AI filmmaker.",
  },
  {
    q: "How often is the content updated?",
    a: "Regularly. The AI space moves fast, and so do we. New lessons are added as tools evolve so your skills stay current. The community is also constantly sharing the latest developments and discoveries.",
  },
  {
    q: "What is the LinkedIn certification?",
    a: "Upon completing the AIFA curriculum, you earn a verifiable 'Certified AI Filmmaker' credential that you can add to your LinkedIn profile. It's recognized by the AI creative community and signals to clients and employers that you have professional-level skills.",
  },
  {
    q: "Does it cost anything to join?",
    a: "No. The AI Film Academy community and course are free to join on Skool.",
  },
  {
    q: "Who is Brandon Patino?",
    a: "Brandon is a Google-certified AI educator, filmmaker, and the founder of AI Film Academy (AIFA). He's been at the forefront of AI filmmaking since the technology emerged and has helped thousands of creators build professional-grade AI workflows.",
  },
  {
    q: "Where do I join?",
    a: "Join on Skool. The Join button on this site opens the free AI Film Academy community page.",
  },
];

export default function FAQSection() {
  const skoolUrl = useSkoolUrl();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#0D0D0D]">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left: Header */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="section-label mb-5">FAQ</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                lineHeight: "1",
                letterSpacing: "0.01em",
                color: "#F5F5F0",
              }}
            >
              Got
              <br />
              Questions?
              <br />
              <span style={{ color: "oklch(0.48 0.22 25)" }}>
                We've Got
                <br />
                Answers.
              </span>
            </h2>
            <p className="mt-5 text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Still on the fence? Here are the most common questions we get from new members.
            </p>
            <a
              href={skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 px-6 py-3 text-sm font-semibold inline-flex"
            >
              Join Now →
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden transition-colors"
                style={{
                  borderColor: openIndex === i ? "oklch(0.48 0.22 25 / 0.4)" : "oklch(0.22 0 0)",
                  background: openIndex === i ? "oklch(0.12 0.005 25)" : "oklch(0.10 0 0)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span
                    className="text-sm font-medium text-white/85"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: "oklch(0.48 0.22 25)",
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
