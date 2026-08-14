/*
 * AI Film Academy - Homepage creative-process section
 */

const PROCESS_STEPS = [
  {
    title: "Learn the workflow",
    description: "Build a repeatable process from the first idea to the final film instead of collecting disconnected tools.",
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
    <section id="how-aifa-helps" className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 grain-overlay">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 88% 22%, color-mix(in srgb, var(--afa-red) 17%, transparent), transparent 34%)" }}
      />
      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <h2 className="max-w-4xl text-[clamp(3.25rem,7vw,6.4rem)] leading-[0.88] text-[#F5F5F0]">
            More tools do not make <span style={{ color: "var(--afa-red)" }}>better films.</span>
          </h2>
          <div className="max-w-2xl">
            <p className="text-[clamp(1.28rem,2.05vw,1.8rem)] font-semibold leading-[1.42] text-white">
              For creators, filmmakers, and freelancers ready to grow their creative career and land more paid work.
            </p>
            <p className="mt-6 text-[clamp(1.12rem,1.7vw,1.35rem)] leading-8 text-white/90">
              The difference is a complete creative process: a way to develop an idea, direct the production, finish the work, and get it in front of people who can respond to it.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <article key={step.title} className="bg-[#111111] p-8 md:p-10">
              <h3 className="text-[clamp(2.45rem,4.35vw,4.2rem)] leading-[0.9] text-white">
                {step.title.split(" ").map((word, index) => (
                  <span key={word} style={index === step.title.split(" ").length - 1 ? { color: "var(--afa-red)" } : undefined}>
                    {word}{index < step.title.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </h3>
              <p className="mt-6 text-[1.1rem] leading-8 text-white/90 md:text-[1.2rem]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
