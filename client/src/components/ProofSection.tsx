/*
 * AI Film Academy — Results Section
 * Design: "The Director's Cut" — a compact festival dossier of events, scale, reviews, and outcomes.
 * Integrity: every review below already exists in the production testimonial inventory; World Cup ownership is explicitly attributed.
 */

import { ArrowUpRight, Quote } from "lucide-react";

const googleReviews = [
  {
    quote: "The members are knowledgeable, supportive, and always ready to share insights, resources, and feedback. The courses are clear, practical, and packed with real value.",
    name: "Karim Essafri",
    role: "AIFA Member",
    initials: "KE",
  },
  {
    quote: "I'm an old dog trying to learn a few new tricks, so the AI Film Academy's start-from-zero approach has been incredibly helpful. Brandon and his team are responsive, helpful and supportive, no matter where you are in the film making journey.",
    name: "Todd Alan",
    role: "AIFA Member",
    initials: "TA",
  },
  {
    quote: "AI Film Academy is an amazing collection of courses and community, very inclusive and easy to navigate. Lots of support. I'm a huge fan!",
    name: "Max Gibson",
    role: "AIFA Member",
    initials: "MG",
  },
  {
    quote: "The AI Film Academy not only provides high quality content, but it's also run by one of the best: Brandon Patino.",
    name: "P Moren",
    role: "AIFA Member",
    initials: "PM",
  },
  {
    quote: "This is a 5 star service. The communication, quality, and final product are just awesome — and more importantly always on time with the value added of the cooperation and insights.",
    name: "Rodrigo J. Gonzalez",
    role: "Video Creator",
    initials: "RG",
  },
  {
    quote: "Working with Brandon & his team was nothing less than amazing. Their attention to detail & commitment to providing top-quality is unmatchable by anyone I've met so far.",
    name: "Noor Fiad",
    role: "Client",
    initials: "NF",
  },
];

const stats = [
  ["30,000+", "Global learners reached"],
  ["5+", "B2B Educational Partnerships"],
  ["1,100+", "Private Community Members"],
  ["40+", "Countries represented"],
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Five-star review">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProofSection() {
  return (
    <section id="proof" className="relative overflow-hidden bg-[#0D0D0D] py-20 md:py-28 grain-overlay">
      <div className="container relative z-10">
        <div className="border-b border-white/10 pb-10">
          <h2 className="max-w-5xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.9] text-[oklch(0.62_0.24_25)]">
            LIVE CREATION EVENTS
          </h2>
        </div>

        <article className="group relative mt-10 min-h-[540px] overflow-hidden border border-white/10 bg-black md:min-h-[620px]">
          <img
            src="/assets/afa-featured-event-charart3.png"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85";
            }}
            alt="A collaborative AI filmmaking team reviewing creative work together"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="relative z-10 flex min-h-[540px] max-w-3xl flex-col justify-end p-7 md:min-h-[620px] md:p-12 lg:p-16">
            <h3 className="text-5xl leading-[0.9] text-white md:text-7xl lg:text-8xl">
              <span className="block">FEATURED EVENT:</span>
              <span className="block">AI FILM WORLD CUP</span>
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/67 md:text-base md:leading-7">
              AI Film Academy helped run the Directors Cup with Machine Cinema, bringing creators and films together inside a broader global filmmaking event. Creators showed up live and put their skills to the test with a four-hour time limit.
            </p>
            <a
              href="https://hub.machinecinema.ai/directors-cup/replay"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 w-fit px-6 py-4 text-sm font-bold md:px-7 md:py-4"
              aria-label="Watch the full Directors Cup replay on Machine Cinema"
            >
              Watch the Full Replay on Machine Cinema <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>

        <div className="mt-12">
          <div className="border-b border-white/10 pb-10">
            <h3 className="max-w-5xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.9] text-[oklch(0.62_0.24_25)]">
              RESULTS BY THE NUMBERS
            </h3>
            <p className="mt-6 max-w-3xl text-sm leading-6 text-white/58 md:text-base md:leading-7">
              AI Film Academy has supported workshops, curriculum, mentorship, and AI media events across more than five Southern California organizations—reaching over 30,000 learners through live education in addition to the global Academy community.
            </p>
          </div>
          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([number, label]) => (
              <div key={label} className="bg-[#0A0A0A] p-6 md:p-8">
                <p className="stat-number text-4xl text-white md:text-5xl">{number}</p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/35">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div>
            <h3 className="max-w-5xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.9] text-[oklch(0.62_0.24_25)]">
              WHAT MEMBERS SAY
            </h3>
            <div className="mt-5 flex items-center gap-3 text-sm text-white/45"><Stars /><span>5.0 · 33 reviews</span></div>
          </div>
          <div className="mt-7 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
            {googleReviews.map((review) => (
              <article key={review.name} className="relative flex flex-col bg-[#0A0A0A] p-6 md:p-8">
                <Quote className="absolute right-6 top-6 h-7 w-7 text-white/8" aria-hidden="true" />
                <Stars />
                <blockquote className="mt-5 flex-1 text-sm leading-6 text-white/68 md:text-base md:leading-7">“{review.quote}”</blockquote>
                <div className="mt-7 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E63329] text-[0.62rem] font-bold text-white">{review.initials}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-white/38">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
