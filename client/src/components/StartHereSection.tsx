/*
 * AI Film Academy — Start Here
 * Design: "The Director's Cut" — one decisive close, two levels of intent.
 * Conversion: Skool is primary; the free workshop is the lower-commitment path.
 */

import { ArrowUpRight, Play } from "lucide-react";

export default function StartHereSection() {
  return (
    <section id="start" className="relative overflow-hidden bg-[#080808] py-20 md:py-28 grain-overlay">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 30%, oklch(0.38 0.2 25 / 0.20), transparent 34%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.055), transparent 32%)",
        }}
      />
      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.86] text-[#F5F5F0]">
            Take Your
            <br />
            <span className="text-[oklch(0.55_0.22_25)]">Next Step</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
            Join the community when you are ready to build with feedback and support, or attend the next free workshop to experience the production method first.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          <article className="flex min-h-[310px] flex-col bg-[#0C0C0C] p-7 md:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">Ready to build your portfolio?</p>
            <h3 className="mt-5 text-4xl text-white md:text-5xl">Join The Program.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/54 md:text-base">
              Enter the working community for structured practice, portfolio feedback, live support, events, certification, and creative opportunities.
            </p>
            <a
              href="https://www.skool.com/aifilmacademy/about"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-auto px-7 py-4 text-base font-bold"
            >
              Join the AI Film Academy <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>

          <article className="flex min-h-[310px] flex-col bg-[#101010] p-7 md:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">Want to see the method first?</p>
            <h3 className="mt-5 text-4xl text-white md:text-5xl">Attend The Next Free Workshop.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/54 md:text-base">
              Learn how the AIFA production system turns an idea into polished AI video without getting trapped in tool overwhelm.
            </p>
            <a
              href="https://workshop.aifilmacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-auto px-7 py-4 text-base font-semibold"
            >
              <Play className="h-4 w-4 fill-current" /> Attend the Next Free Workshop
            </a>
          </article>
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/25">
          One clear workflow · ongoing feedback · portfolio-ready projects
        </p>
      </div>
    </section>
  );
}
