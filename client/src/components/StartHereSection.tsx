/*
 * AI Film Academy - Homepage final pathways
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
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2">
          <article className="flex min-h-[320px] flex-col bg-[#0C0C0C] p-8 md:p-10">
            <h3 className="text-[clamp(2.8rem,4vw,4.6rem)] leading-[0.9] text-[#ff7068]">Ready to build your portfolio?</h3>
            <p className="mt-6 max-w-md text-[1.08rem] leading-8 text-white/90 md:text-[1.18rem]">
              Learn the workflow, build finished work, get feedback, and use the full AIFA curriculum, live practice, and community to grow a portfolio worth sharing.
            </p>
            <a href="/membership" className="btn-primary mt-auto min-h-13 px-7 py-4 text-[1rem] font-bold">
              Explore Membership <ArrowUpRight className="h-5 w-5" />
            </a>
          </article>

          <article className="flex min-h-[320px] flex-col bg-[#101010] p-8 md:p-10">
            <h3 className="text-[clamp(2.8rem,4vw,4.6rem)] leading-[0.9] text-[#ff7068]">Try for free.</h3>
            <p className="mt-6 max-w-md text-[1.08rem] leading-8 text-white/90 md:text-[1.18rem]">
              Watch the free training to learn how the AIFA production system turns an idea into polished AI video without getting trapped in tool overwhelm.
            </p>
            <a href="/free-video-training" className="btn-outline mt-auto min-h-13 px-7 py-4 text-[1rem] font-bold">
              <Play className="h-5 w-5 fill-current" /> Watch the Free Training
            </a>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-3 text-center text-[1.04rem] font-semibold text-white/90 md:text-[1.12rem]">
          <span>One clear workflow</span>
          <span className="text-[#ff7068]" aria-hidden="true">•</span>
          <span>Ongoing feedback</span>
          <span className="text-[#ff7068]" aria-hidden="true">•</span>
          <span>Portfolio-ready projects</span>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
          <a href="/productions" className="flex min-h-16 items-center justify-center border border-white/30 bg-white/[0.04] px-5 text-center text-[1rem] font-bold text-white transition-colors hover:border-[#ff7068] hover:text-[#ff7068]">
            Need a custom production?
          </a>
          <a href="/education-events" className="flex min-h-16 items-center justify-center border border-white/30 bg-white/[0.04] px-5 text-center text-[1rem] font-bold text-white transition-colors hover:border-[#ff7068] hover:text-[#ff7068]">
            Host a Gen AI workshop
          </a>
          <a href="/contact" className="flex min-h-16 items-center justify-center border border-white/30 bg-white/[0.04] px-5 text-center text-[1rem] font-bold text-white transition-colors hover:border-[#ff7068] hover:text-[#ff7068]">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
