/*
 * AI Film Academy - Homepage creative system section
 */

type CardVisual =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

const CREATIVE_SYSTEM_STEPS: Array<{
  title: string;
  description: string;
  visual: CardVisual;
}> = [
  {
    title: "Learn the workflow",
    description: "Discover a repeatable system to turn any creative idea into premium video.",
    visual: {
      type: "image",
      src: "/assets/aifa-workflow-card.webp",
      alt: "AIFA production workflow from idea through final cut",
    },
  },
  {
    title: "Finish real projects",
    description: "Practice through exercises, projects, and events designed to help you build your portfolio.",
    visual: {
      type: "video",
      src: "/assets/aifa-finished-projects-card.mp4",
      poster: "/assets/aifa-finished-projects-poster.jpg",
      alt: "Finished AIFA film project",
    },
  },
  {
    title: "Get curated opportunities",
    description: "Use community, live events, and creative briefs to keep making work worth showing.",
    visual: {
      type: "image",
      src: "/assets/aifa-creative-opportunities-card.webp",
      alt: "Creative opportunities shared inside AI Film Academy",
    },
  },
];

export default function InsideAFASection() {
  return (
    <section id="how-aifa-helps" className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 grain-overlay">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 88% 22%, color-mix(in srgb, var(--afa-red) 17%, transparent), transparent 34%)" }}
      />
      <div className="container relative z-10">
        <div className="grid gap-10 text-center lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <h2 className="mx-auto max-w-4xl text-[clamp(3.1rem,6.2vw,5.85rem)] leading-[0.9] text-[#F5F5F0]">
            Join the Future of <span style={{ color: "var(--afa-red)" }}>Creative Work.</span>
          </h2>
          <p className="creative-system-statement mx-auto max-w-3xl text-[clamp(1.42rem,2.15vw,1.88rem)] font-semibold leading-[1.42] text-white">
            Most AI resources leave creators and freelancers overwhelmed. AIFA gives you one production system to move from idea to final piece, build a premium portfolio, and land more paid work.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {CREATIVE_SYSTEM_STEPS.map((step) => (
            <article
              key={step.title}
              className="relative flex min-h-[465px] flex-col overflow-hidden rounded-[18px] border p-7 md:min-h-[480px] md:p-8"
              style={{
                borderColor: "rgba(255,255,255,0.18)",
                borderTop: "3px solid var(--afa-red)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
                boxShadow: "0 20px 46px rgba(0,0,0,0.2)",
              }}
            >
              <h3
                className="min-h-[4.8rem] text-[clamp(2.15rem,3.2vw,3rem)] uppercase leading-[0.92] text-[#F5F5F0]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.035em" }}
              >
                {step.title}
              </h3>
              <p className="creative-system-card-copy mt-6 text-[clamp(1.16rem,1.55vw,1.34rem)] font-semibold leading-[1.48] text-white">
                {step.description}
              </p>

              <div className="relative mt-auto overflow-hidden rounded-[12px] border border-white/15 bg-[#111]" style={{ aspectRatio: "2.05 / 1" }}>
                {step.visual.type === "video" ? (
                  <video
                    src={step.visual.src}
                    poster={step.visual.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    aria-label={step.visual.alt}
                  />
                ) : (
                  <img
                    src={step.visual.src}
                    alt={step.visual.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
