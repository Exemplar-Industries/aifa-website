/*
 * AI Film Academy - Homepage creative system section
 */

const CREATIVE_SYSTEM_STEPS = [
  {
    title: "Learn the workflow",
    description: "Discover a repeatable system to turn any creative idea into premium video.",
  },
  {
    title: "Finish real projects",
    description: "Practice through exercises, projects, and events designed to help you build your portfolio.",
  },
  {
    title: "Get better in public",
    description: "Use feedback, community, and curated events to create work you feel confident showing.",
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
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <h2 className="max-w-4xl text-[clamp(3.1rem,6.2vw,5.85rem)] leading-[0.9] text-[#F5F5F0]">
            Join the Future of <span style={{ color: "var(--afa-red)" }}>Creative Work.</span>
          </h2>
          <p className="creative-system-statement max-w-3xl text-[clamp(1.55rem,2.35vw,2.08rem)] font-semibold leading-[1.42] text-white">
            Most AI resources leave creators and freelancers overwhelmed. AIFA gives you one production system to move from idea to final piece, build a premium portfolio, and land more paid work.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3 md:gap-8">
          {CREATIVE_SYSTEM_STEPS.map((step) => (
            <article key={step.title} className="border-t-2 pt-7" style={{ borderColor: "var(--afa-red)" }}>
              <h3
                className="flex min-h-[3.55rem] items-start text-[clamp(1.62rem,2.35vw,2.14rem)] font-extrabold leading-[1.08] tracking-[-0.015em] text-[#F5F5F0]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="creative-system-card-copy mt-6 max-w-md text-[clamp(1.28rem,1.8vw,1.52rem)] font-medium leading-[1.5] text-white">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
