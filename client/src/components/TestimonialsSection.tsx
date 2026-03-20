/*
 * TestimonialsSection — Real member reviews from Google Business Profile (5.0 ★, 33 reviews)
 * Design: "The Director's Cut" — dark card grid, star ratings, Google badge
 */

const testimonials = [
  {
    name: "Karim Essafri",
    role: "AIFA Member",
    initials: "KE",
    color: "oklch(0.48 0.22 25)",
    stars: 5,
    source: "Google",
    text: "Being part of the AI film making academy has been an incredible experience. The members are knowledgeable, supportive, and always ready to share insights, resources, and feedback. The courses are clear, practical, and packed with real value — they've really helped me improve my AI video skills and stay ahead of new trends.",
  },
  {
    name: "Todd Alan",
    role: "AIFA Member",
    initials: "TA",
    color: "oklch(0.55 0.18 200)",
    stars: 5,
    source: "Google",
    text: "I'm an old dog trying to learn a few new tricks, so the AI Film Academy's start-from-zero approach has been incredibly helpful. Brandon and his team are responsive, helpful and supportive, no matter where you are in the film making journey.",
  },
  {
    name: "Max Gibson",
    role: "AIFA Member",
    initials: "MG",
    color: "oklch(0.55 0.15 140)",
    stars: 5,
    source: "Google",
    text: "AI Film Academy is an amazing collection of courses and community, very inclusive and easy to navigate. Lots of support. I'm a huge fan!",
  },
  {
    name: "P Moren",
    role: "AIFA Member",
    initials: "PM",
    color: "oklch(0.55 0.18 60)",
    stars: 5,
    source: "Google",
    text: "The Ai Film Academy not only provides high quality content, but it's also run by one of the best: Brandon Patino.",
  },
  {
    name: "Rodrigo J. Gonzalez",
    role: "Video Creator",
    initials: "RG",
    color: "oklch(0.55 0.15 280)",
    stars: 5,
    source: "Google",
    text: "This is a 5 star service. The communication, quality, and final product are just awesome — and more importantly always on time with the value added of the cooperation and insights.",
  },
  {
    name: "Noor Fiad",
    role: "Client",
    initials: "NF",
    color: "oklch(0.55 0.18 320)",
    stars: 5,
    source: "Google",
    text: "Working with Brandon & his team was nothing less than amazing. Their attention to detail & commitment to providing top-quality is unmatchable by anyone I've met so far.",
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

function GoogleIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
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
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 afa-card rounded-lg px-4 py-3">
              <GoogleIcon />
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  5.0 · 33 Google reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="afa-card rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <StarRating count={t.stars} />
                <div className="flex items-center gap-1 text-white/25">
                  <GoogleIcon />
                  <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Google</span>
                </div>
              </div>
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
