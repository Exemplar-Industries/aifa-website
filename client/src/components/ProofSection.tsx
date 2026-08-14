/*
 * AI Film Academy - Homepage proof section
 * Purpose: show the creative-practice environment, outcomes, and member reviews.
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
  {
    quote: "The AI Film Academy not only provides high-quality content, but it is also run by one of the best: Brandon Patino.",
    name: "P Moren",
    role: "AIFA Member",
    initials: "PM",
  },
  {
    quote: "This is a 5-star service. The communication, quality, and final product are awesome and always on time, with the value added of cooperation and insights.",
    name: "Rodrigo J. Gonzalez",
    role: "Video Creator",
    initials: "RG",
  },
  {
    quote: "Working with Brandon and his team was nothing less than amazing. Their attention to detail and commitment to providing top quality is unmatchable.",
    name: "Noor Fiad",
    role: "Client",
    initials: "NF",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Five-star review">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(3.5rem,7vw,6.4rem)] leading-[0.88] text-[#F5F5F0]">
            Build a portfolio through <span className="text-[oklch(0.62_0.24_25)]">creative practice.</span>
          </h2>
          <p className="max-w-2xl text-[1.12rem] leading-8 text-white/90 md:text-[1.28rem]">
            Live events, GenJams, workshops, and creative practice help you build real work with other creators.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-[1.18fr_0.82fr]">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="relative z-10 flex min-h-[430px] max-w-2xl flex-col justify-end p-7 md:min-h-[520px] md:p-10">
              <h3 className="max-w-xl text-[clamp(3rem,5vw,5.8rem)] leading-[0.9] text-white">Build real work with other creators.</h3>
              <p className="mt-5 max-w-xl text-[1.06rem] leading-7 text-white/90 md:text-[1.18rem] md:leading-8">
                We host live events, GenJams, workshops, and creative practice to help you build portfolio-ready work with other people.
              </p>
            </div>
          </article>

          <aside className="flex flex-col bg-[#111111] p-7 md:p-10">
            <h3 className="text-[clamp(2.7rem,4vw,4.6rem)] leading-[0.9] text-white">Results <span className="text-[#ff7068]">by the numbers.</span></h3>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {STATS.map(([number, label]) => (
                <div key={label} className="py-6 first:pt-6 last:pb-6">
                  <p className="stat-number text-[clamp(3.4rem,5vw,5.2rem)] text-[#ff7068]">{number}</p>
                  <p className="mt-2 text-[1.06rem] font-semibold leading-7 text-white/90">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-white/15 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h3 className="max-w-4xl text-[clamp(3rem,5vw,5.2rem)] leading-[0.9] text-white">The right support changes <span className="text-[#ff7068]">the work.</span></h3>
            <div className="flex items-center gap-3 text-[1rem] font-semibold text-white/90"><Stars /><span>5.0 from 33 reviews</span></div>
          </div>
          <div className="mt-8 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
            {TESTIMONIALS.map((review) => (
              <article key={review.name} className="relative flex min-h-[285px] flex-col bg-[#0A0A0A] p-7 md:p-8">
                <Quote className="absolute right-7 top-7 h-8 w-8 text-[#ff7068]/45" aria-hidden="true" />
                <Stars />
                <blockquote className="mt-5 flex-1 pr-2 text-[1.02rem] leading-7 text-white/90">“{review.quote}”</blockquote>
                <div className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E63329] text-[0.95rem] font-bold text-white">{review.initials}</span>
                  <div>
                    <p className="text-[1.04rem] font-bold text-white">{review.name}</p>
                    <p className="text-[1rem] text-white/85">{review.role}</p>
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
