/*
 * AI Film Academy - Homepage member social proof
 */

import { Quote } from "lucide-react";

const GOOGLE_STAR_GOLD = "#fbbc04";

const MEMBER_PROOF = [
  ["30,000+", "Global learners"],
  ["5.0", "On Google (33 reviews)"],
  ["1,100+", "Private community members"],
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

function GoogleStars() {
  return (
    <div className="flex gap-1" aria-label="Five-star Google review rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className="h-5 w-5" style={{ color: GOOGLE_STAR_GOLD }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProofSection() {
  return (
    <section id="member-reviews" className="relative overflow-hidden bg-[#0D0D0D] py-20 md:py-28 grain-overlay">
      <div className="container relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-4xl text-[clamp(3.4rem,7vw,6.4rem)] leading-[0.88] text-white">
            What members are <span style={{ color: "var(--afa-red)" }}>saying.</span>
          </h2>
          <div className="flex items-center gap-4 rounded-sm border border-white/20 bg-white/[0.04] px-5 py-4 text-[1.12rem] font-bold text-white">
            <GoogleStars />
            <span>5.0 on Google</span>
          </div>
        </div>

        <div className="mt-12 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {MEMBER_PROOF.map(([number, label]) => (
            <article key={label} className="flex min-h-[190px] flex-col justify-center bg-[#111111] p-8 md:p-10">
              <p className="stat-number text-[clamp(4.7rem,7vw,7rem)] text-white">{number}</p>
              <p className="mt-4 text-[1.15rem] font-semibold leading-7 text-white/90 md:text-[1.28rem]">{label}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <article key={review.name} className="relative flex min-h-[285px] flex-col bg-[#0A0A0A] p-7 md:p-8">
              <Quote className="absolute right-7 top-7 h-8 w-8" style={{ color: "color-mix(in srgb, var(--afa-red) 55%, transparent)" }} aria-hidden="true" />
              <GoogleStars />
              <blockquote className="mt-5 flex-1 pr-2 text-[1.05rem] leading-7 text-white/90">“{review.quote}”</blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-[0.95rem] font-bold text-white" style={{ background: "var(--afa-red)" }}>{review.initials}</span>
                <div>
                  <p className="text-[1.04rem] font-bold text-white">{review.name}</p>
                  <p className="text-[1rem] text-white/85">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
