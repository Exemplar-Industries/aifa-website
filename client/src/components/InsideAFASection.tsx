/*
 * AI Film Academy - Homepage production-system section
 */

const PRINCIPLES = [
  {
    title: "Right tools",
    description: "Use the tools that move the work forward instead of chasing every new release.",
  },
  {
    title: "Right order",
    description: "Follow one clear production system from first idea to a finished piece of work.",
  },
  {
    title: "No overwhelm",
    description: "Build the confidence to direct, finish, and share work you are proud to put your name on.",
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
            <p className="text-[clamp(1.3rem,2.1vw,1.85rem)] font-semibold leading-[1.42] text-white">
              Stop chasing every shiny tool. AIFA gives you the <strong className="font-extrabold text-white">right tools</strong>, in the <strong className="font-extrabold text-white">right order</strong>, with <strong className="font-extrabold" style={{ color: "var(--afa-red)" }}>no overwhelm</strong>.
            </p>
            <p className="mt-6 text-[clamp(1.12rem,1.7vw,1.35rem)] leading-8 text-white/90">
              Build the confidence to direct your ideas, finish your work, and turn a premium portfolio into more paid creative opportunities.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article key={principle.title} className="bg-[#111111] p-8 md:p-10">
              <h3 className="text-[clamp(2.65rem,4.5vw,4.45rem)] leading-[0.9] text-white">
                {principle.title.split(" ").map((word, index) => (
                  <span key={word} style={index === principle.title.split(" ").length - 1 ? { color: "var(--afa-red)" } : undefined}>
                    {word}{index < principle.title.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </h3>
              <p className="mt-6 text-[1.1rem] leading-8 text-white/90 md:text-[1.2rem]">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
