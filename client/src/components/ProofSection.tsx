/*
 * AI Film Academy — Proof of Practice
 * Homepage role: Demonstrate that AIFA is active in real creative rooms and valued by members.
 * Detailed event, testimonial, and portfolio material stays on dedicated pages.
 */

import { Quote } from "lucide-react";

const STATS = [
  ["30,000+", "Global learners reached"],
  ["5+", "Educational partnerships"],
  ["1,100+", "Creators in community"],
];

const TESTIMONIALS = [
  {
    quote: "The members are knowledgeable, supportive, and always ready to share insights, resources, and feedback. The courses are clear, practical, and packed with real value.",
    name: "Karim Essafri",
    role: "AIFA Member",
    initials: "KE",
  },
  {
    quote: "The start-from-zero approach has been incredibly helpful. Brandon and his team are responsive, helpful and supportive, no matter where you are in the filmmaking journey.",
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
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">Proof in the work</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(3.4rem,7vw,6.25rem)] leading-[0.88] text-[#F5F5F0]">
              Built in the room, not just <span className="text-[oklch(0.62_0.24_25)]">on a timeline.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/57 md:text-lg">
            AIFA is built around live creative practice, shared feedback, and the kind of work that gains momentum when it is made alongside other people who care about the outcome.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="group relative min-h-[430px] overflow-hidden bg-black md:min-h-[520px]">
            <img
              src="/assets/afa-featured-event-charart3.png"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85";
              }}
              alt="A collaborative AI filmmaking team reviewing creative work together"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/68 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
            <div className="relative z-10 flex min-h-[430px] max-w-2xl flex-col justify-end p-7 md:min-h-[520px] md:p-10">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#ff7068]">Live creative practice</p>
              <h3 className="mt-4 text-4xl leading-[0.91] text-white md:text-6xl">Film gets better when it gets made with other people in the room.</h3>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/67 md:text-base md:leading-7">
                From collaborative GenJams to the Directors Cup with Machine Cinema, AIFA brings creators together to make under a real brief, a real deadline, and a real quality bar.
              </p>
            </div>
          </article>

          <aside className="flex flex-col bg-[#111111] p-7 md:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/36">AIFA by the numbers</p>
            <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {STATS.map(([number, label]) => (
                <div key={label} className="py-5 first:pt-5 last:pb-5">
                  <p className="stat-number text-4xl text-white md:text-5xl">{number}</p>
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/38">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-auto pt-8 text-sm leading-6 text-white/49">A clear workflow is more useful when it is backed by an active creative environment.</p>
          </aside>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">What members say</p>
              <h3 className="mt-4 text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.9] text-white">The right support changes the work.</h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/45"><Stars /><span>5.0 · 33 reviews</span></div>
          </div>
          <div className="mt-7 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
            {TESTIMONIALS.map((review) => (
              <article key={review.name} className="relative flex min-h-[255px] flex-col bg-[#0A0A0A] p-6 md:p-7">
                <Quote className="absolute right-6 top-6 h-7 w-7 text-white/8" aria-hidden="true" />
                <Stars />
                <blockquote className="mt-5 flex-1 text-sm leading-6 text-white/68">“{review.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-4">
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
