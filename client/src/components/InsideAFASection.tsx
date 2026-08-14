/*
 * AI Film Academy - Homepage creative-process section
 */

const PILLARS = [
  {
    title: "Learn the workflow",
    description: "Stop collecting disconnected tools. Build a repeatable process from first idea to final film.",
  },
  {
    title: "Make real work",
    description: "Practice through creative briefs, GenJams, and projects designed to become part of your portfolio.",
  },
  {
    title: "Get better faster",
    description: "Use feedback, community, and a clear quality bar to turn experiments into work you are proud to show.",
  },
];

export default function InsideAFASection() {
  return (
    <section id="why-aifa" className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 grain-overlay">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 88% 22%, oklch(0.32 0.18 25 / 0.18), transparent 34%)" }}
      />
      <div className="container relative z-10">
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(3.5rem,7vw,6.4rem)] leading-[0.88] text-[#F5F5F0]">
            More tools do not make <span className="text-[oklch(0.62_0.24_25)]">better films.</span>
          </h2>
          <div className="max-w-xl space-y-5">
            <p className="text-[1.12rem] font-semibold leading-8 text-white md:text-[1.28rem]">
              Built for filmmakers, artists, and marketers who want a process they can use long after the next model release.
            </p>
            <p className="text-[1.06rem] leading-8 text-white/90 md:text-[1.16rem]">
              The difference is a complete creative process: a way to develop an idea, direct the production, finish the work, and get it in front of people who can respond to it.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="bg-[#111111] p-8 md:p-10">
              <h3 className="text-[clamp(2.5rem,4vw,4rem)] leading-[0.92] text-white">{pillar.title}</h3>
              <p className="mt-6 text-[1.06rem] leading-8 text-white/90 md:text-[1.16rem]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
