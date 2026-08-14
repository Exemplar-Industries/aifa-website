/*
 * AI Film Academy - Homepage learn-by-doing system section
 */

const PILLARS = [
  {
    title: "Learn the system",
    description: "Follow a clear production process that takes you from the first idea to a finished AI video.",
  },
  {
    title: "Build your portfolio",
    description: "Turn creative exercises, briefs, and GenJams into work you can confidently show to clients.",
  },
  {
    title: "Improve with feedback",
    description: "Use expert feedback, community, and a higher quality bar to make stronger work every time.",
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
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(3.25rem,7vw,6.4rem)] leading-[0.88] text-[#F5F5F0]">
            More tools do not make <span style={{ color: "var(--afa-red)" }}>better films.</span>
          </h2>
          <div className="max-w-xl space-y-5">
            <p className="text-[1.12rem] font-semibold leading-8 text-white md:text-[1.28rem]">
              For creators, filmmakers, and freelancers ready to grow their creative career and land more paid work.
            </p>
            <p className="text-[1.06rem] leading-8 text-white/90 md:text-[1.16rem]">
              Most AI resources teach every shiny tool. AIFA teaches the right tools in the right order, so you can feel more confident, less overwhelmed, and create repeatable work.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <h3 className="text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] text-[#F5F5F0]">
            Learn by <span style={{ color: "var(--afa-red)" }}>doing.</span>
          </h3>
          <p className="max-w-xl text-[1.06rem] leading-8 text-white/90 md:text-[1.16rem]">
            Three practical ways AIFA helps you turn an idea into work worth showing.
          </p>
        </div>

        <div className="mt-8 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="bg-[#111111] p-8 md:p-10">
              <h3 className="text-[clamp(2.45rem,4vw,4rem)] leading-[0.92] text-white">{pillar.title}</h3>
              <p className="mt-6 text-[1.06rem] leading-8 text-white/90 md:text-[1.16rem]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
