/*
 * TestimonialsSection — Social proof from real members
 * Design: "The Director's Cut" — dark card grid, star ratings, member photos
 */

const testimonials = [
  {
    name: "Marcus T.",
    role: "Freelance Video Editor",
    initials: "MT",
    color: "oklch(0.48 0.22 25)",
    stars: 5,
    text: "I went from spending 3 hours trying to figure out which AI tool to use, to having a complete short film done in a weekend. The workflow system is a game changer.",
  },
  {
    name: "Priya S.",
    role: "YouTube Creator",
    initials: "PS",
    color: "oklch(0.55 0.18 200)",
    stars: 5,
    text: "The live calls alone are worth 10x the price. Brandon and the team actually review your work and give real feedback. My channel went from 2k to 18k subscribers in 4 months.",
  },
  {
    name: "Jordan K.",
    role: "Motion Designer",
    initials: "JK",
    color: "oklch(0.55 0.15 140)",
    stars: 5,
    text: "I was skeptical at $19/mo — thought it would be surface-level stuff. Wrong. The curriculum is deep, the community is active, and the certification actually got me a client.",
  },
  {
    name: "Aaliyah M.",
    role: "Content Creator",
    initials: "AM",
    color: "oklch(0.55 0.18 60)",
    stars: 5,
    text: "Finally someone who explains Midjourney + Kling + Runway in a way that actually makes sense together. I've tried 4 other courses. This is the only one that stuck.",
  },
  {
    name: "Derek W.",
    role: "Indie Filmmaker",
    initials: "DW",
    color: "oklch(0.55 0.15 280)",
    stars: 5,
    text: "The AI tool stack guide saved me hundreds of dollars on subscriptions I didn't need. Now I know exactly what to pay for and what to skip.",
  },
  {
    name: "Sofia R.",
    role: "Brand Strategist",
    initials: "SR",
    color: "oklch(0.55 0.18 320)",
    stars: 5,
    text: "I use AFA to create cinematic content for my clients' brands. The ROI is insane — I charge $2,000 per video and spend maybe 6 hours total. Best $19 I spend every month.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#0D0D0D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="section-label mb-5">Social Proof</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: "1",
                letterSpacing: "0.01em",
                color: "#F5F5F0",
              }}
            >
              1,100+ Creators
              <br />
              <span style={{ color: "oklch(0.48 0.22 25)" }}>
                Can't Be Wrong.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["MT", "PS", "JK", "AM", "DW"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0D0D0D] flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `hsl(${i * 60}, 60%, 40%)`, fontSize: "0.55rem" }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                4.9/5 average rating
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="afa-card rounded-lg p-6 flex flex-col gap-4">
              <StarRating count={t.stars} />
              <p className="text-white/75 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: t.color, fontSize: "0.6rem" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
