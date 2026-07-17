/*
 * AI Film Academy — What Happens Inside AIFA
 * Design: "The Director's Cut" — compact cinematic editorial progression.
 * Purpose: explain the portfolio outcome without extending the homepage.
 */

import { CalendarDays, Clapperboard, Hammer, MessageSquareText } from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Create",
    icon: Clapperboard,
    copy: "Follow one clear production workflow and learn only the tools your project actually needs.",
    detail: "Films · ads · trailers · animation",
  },
  {
    number: "02",
    title: "Improve",
    icon: MessageSquareText,
    copy: "Get peer review, live expert feedback, and personalized Loom guidance while the work is still in progress.",
    detail: "Live reviews · Loom support · office hours",
  },
  {
    number: "03",
    title: "Build",
    icon: Hammer,
    copy: "Use weekly exercises, practice briefs, and creative challenges to finish portfolio-ready work one project at a time.",
    detail: "Practice · challenges · portfolio",
  },
  {
    number: "04",
    title: "Participate",
    icon: CalendarDays,
    copy: "Join live events, pursue certification, discover festivals, and step into curated creative opportunities with the community.",
    detail: "Events · certification · opportunities",
  },
];

export default function InsideAFASection() {
  return (
    <section id="inside" className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 grain-overlay">
      <div className="container relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="section-label mb-5">What happens inside</div>
            <h2 className="max-w-3xl text-[clamp(3rem,7vw,6.4rem)] leading-[0.9] text-[#F5F5F0]">
              Master The Workflow.
              <br />
              <span className="text-[oklch(0.55_0.22_25)]">Build Your Portfolio.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg">
              AI Film Academy (AIFA) is a community ecosystem built to help you turn ideas into finished films, ads, trailers, and animated content you feel confident sharing online.
            </p>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-md border border-white/10 bg-[#111]">
            <img
              src="/assets/afa-outcome-charart1.png"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&w=1600&q=85";
              }}
              alt="AI creator developing a cinematic character project at a laptop"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">The outcome</p>
              <p className="mt-2 max-w-md text-lg font-medium leading-7 text-white md:text-xl">
                Finish work that proves what you can do—not just lessons that say what you watched.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article
                key={stage.title}
                className="group relative bg-[#0A0A0A] px-6 py-8 md:px-8 md:py-10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-white/32">{stage.number}</span>
                  <Icon className="h-5 w-5 text-[#E63329] transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
                <h3 className="text-4xl text-white md:text-5xl">{stage.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/58 md:text-base">{stage.copy}</p>
                <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-white/30">{stage.detail}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
