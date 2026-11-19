/*
 * AI Film Academy - Homepage
 * Guided path: hero, learn-by-doing system, proof/member reviews, final decision, contact.
 */

import FreeTrainingSignup from "@/components/FreeTrainingSignup";
import InsideAFASection from "@/components/InsideAFASection";
import ProofSection from "@/components/ProofSection";
import ShowcaseGrid from "@/components/ShowcaseGrid";
import StartHereSection from "@/components/StartHereSection";
import { useSkoolCta } from "@/contexts/AffiliateLinkContext";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/LPV2BG_601839be.mp4";

function FullscreenHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { skoolUrl, trackCtaClick } = useSkoolCta();

  useEffect(() => {
    const timer = window.setTimeout(() => setVideoLoaded(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="homepage-hero relative overflow-hidden" style={{ minHeight: "100svh" }}>
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className="homepage-hero-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 44%",
          transform: "scale(1.035)",
          zIndex: 0,
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      />

      <div className="homepage-hero-overlay absolute inset-0" />
      <div className="homepage-hero-bottom-gradient absolute inset-0" />
      <div className="homepage-hero-vignette absolute inset-0" />
      <div className="homepage-hero-grain absolute inset-0" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center">
        <h1
          className="homepage-hero-title max-w-none text-[#F5F5F0]"
          style={{ fontSize: "clamp(3.15rem, 6.1vw, 6.7rem)" }}
        >
          <span className="sm:whitespace-nowrap">Turn Impossible Ideas Into</span>
          <span className="block text-afa-red">Premium Video.</span>
        </h1>

        <p
          className="homepage-hero-copy mt-7 max-w-3xl text-center font-semibold text-white"
          style={{
            fontSize: "clamp(1.15rem, 4.8vw, 1.72rem)",
            lineHeight: 1.36,
            textShadow: "0 2px 18px rgba(0,0,0,0.78)",
          }}
        >
          Join the free community, or get the free video training. For a paid project, see author animation and consulting.
        </p>

        <div className="mt-9 flex w-full max-w-5xl flex-col items-center justify-center gap-5 lg:flex-row lg:items-start">
          <a
            href={skoolUrl}
            className="btn-primary pulse-cta min-h-14 shrink-0 px-8 py-4 text-[1rem] font-bold"
            onClick={() => trackCtaClick("Homepage Join AI Film Academy")}
          >
            Join the AI Film Academy community for free
          </a>
          <FreeTrainingSignup />
        </div>
        <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-bold text-white">
          <a href="/productions#starter-package" className="underline decoration-[var(--afa-red)] underline-offset-4">Author animation</a>
          <a href="/work-with-brandon#project-form" className="underline decoration-[var(--afa-red)] underline-offset-4">Consulting</a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="homepage-shell min-h-screen bg-[#080808]">
      <FullscreenHero />
      <InsideAFASection />
      <section className="bg-[#080808] py-20 md:py-24">
        <div className="container">
          <h2 className="text-center text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-[#F5F5F0]">
            What creators have <span style={{ color: "var(--afa-red)" }}>made.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center font-semibold text-white">
            A first look at the work creators are making through AI Film Academy training, live events, and creative practice. Each piece is here to show the range of ideas, genres, and visual worlds this work can hold.
          </p>
          <div className="mt-10">
            <ShowcaseGrid />
          </div>
          <p className="mt-8 text-center">
            <a href="/showcase" className="btn-outline inline-flex min-h-12 items-center px-6 py-3 text-[1rem] font-bold">Open the showcase</a>
          </p>
        </div>
      </section>
      <ProofSection />
      <StartHereSection />
    </div>
  );
}
