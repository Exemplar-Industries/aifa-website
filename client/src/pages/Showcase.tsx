/*
 * AI Film Academy — Showcase Page
 * Design: "The Director's Cut" — cinematic editorial with one direct headline and supporting sentence.
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Showcase() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <Navbar />
      <main className="grain-overlay relative overflow-hidden pt-16 md:pt-[4.5rem]">
        <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 74% 28%, oklch(0.38 0.2 25 / 0.24), transparent 31%), linear-gradient(135deg, #080808 0%, #111 58%, #080808 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-[12%] w-px bg-white/10" />
          <div className="pointer-events-none absolute bottom-[18%] right-0 h-px w-[52%] bg-[#E63329]/35" />

          <div className="container relative z-10 py-20 md:py-28">
            <h1 className="max-w-6xl text-[clamp(4rem,11vw,10rem)] leading-[0.84] text-[#E63329]">
              See Whats Possible
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-2xl md:leading-9">
              Watch some of the strongest creations that have come from the AI Film Academy students, ecosystem, & live events.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
