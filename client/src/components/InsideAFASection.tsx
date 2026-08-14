/*
 * AI Film Academy — Why AIFA
 * Homepage role: Establish the mechanism before detailed membership proof.
 * The full value stack belongs on /membership, not above the fold on the home page.
 */

const PILLARS = [
  {
    number: "01",
    title: "Learn the workflow",
    description: "Stop collecting disconnected tools. Build a repeatable process from first idea to final film.",
  },
  {
    number: "02",
    title: "Make real work",
    description: "Practice through creative briefs, GenJams, and projects designed to become part of your portfolio.",
  },
  {
    number: "03",
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
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">Why AI Film Academy</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(3.4rem,7vw,6.25rem)] leading-[0.88] text-[#F5F5F0]">
              More tools do not make <span className="text-[oklch(0.62_0.24_25)]">better films.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/57 md:text-lg">
            The difference is a complete creative process: a way to develop an idea, direct the production, finish the work, and get it in front of people who can respond to it.
          </p>
        </div>

        <div className="mt-8 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.number} className="bg-[#111111] p-7 md:p-9">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-[#E63329]">{pillar.number}</p>
              <h3 className="mt-10 text-3xl leading-[0.95] text-white md:text-4xl">{pillar.title}</h3>
              <p className="mt-5 text-sm leading-6 text-white/54 md:text-base md:leading-7">{pillar.description}</p>
            </article>
          ))}
        </div>

        <p className="mt-7 max-w-3xl font-mono text-[0.62rem] uppercase leading-5 tracking-[0.12em] text-white/29">
          Built for filmmakers, artists, and marketers who want a process they can use long after the next model release.
        </p>
      </div>
    </section>
  );
}
