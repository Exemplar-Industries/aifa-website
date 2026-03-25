/*
 * AI Film Academy — Home Page (Landing Page)
 * Design: "The Director's Cut" — Cinematic Dark
 * Hero: Fullscreen video background — video IS the hero, text overlaid
 * Goal: Convert cold Meta Ads traffic → $19/month Skool subscription
 *
 * CONVERSION-OPTIMIZED SECTION ORDER:
 * 1. Hero          — Fullscreen video background, headline, CTA
 * 2. StatsBar      — Quick credibility numbers
 * 3. Testimonials  — Google reviews while attention is highest
 * 4. Problem       — "AI filmmaking is overwhelming. We fixed that."
 * 5. Workflow      — "One Workflow. Three Steps." — the solution
 * 6. Pricing       — The close
 * 7. FinalCTA      — "The Decision" — last push
 * 8. FAQ           — Objection handling for those who scroll past the close
 * 9. Footer        — Links, legal, copyright
 */

import Navbar from "@/components/Navbar";
import StatsBar from "@/components/StatsBar";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProblemSection from "@/components/ProblemSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";
import { useRef, useEffect, useState } from "react";

const HERO_VIDEO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/LPV2BG_601839be.mp4";

function FullscreenHero() {
  const skoolUrl = useSkoolUrl();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Fullscreen video background */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          transform: "scale(0.88)",
          zIndex: 0,
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.50)",
          zIndex: 1,
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.35) 35%, transparent 65%, rgba(8,8,8,0.25) 100%)",
          zIndex: 2,
        }}
      />

      {/* Left red studio key light */}
      <div
        style={{
          position: "absolute",
          left: "-5%",
          top: "10%",
          width: "50vw",
          height: "80vh",
          background:
            "radial-gradient(ellipse at 0% 40%, oklch(0.32 0.18 25 / 0.22) 0%, transparent 65%)",
          filter: "blur(60px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Right fill light */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "20%",
          width: "40vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse at 100% 30%, oklch(0.20 0.12 355 / 0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* Content overlay */}
      <div
        className="relative flex flex-col items-center justify-center text-center h-full"
        style={{ zIndex: 10, padding: "0 1.5rem" }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "oklch(0.60 0.22 25)",
            marginBottom: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "fade-up 0.5s ease 0.2s both",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "28px",
              height: "1.5px",
              background: "oklch(0.58 0.22 25)",
            }}
          />
          The Professional Standard for AI Video
          <span
            style={{
              display: "inline-block",
              width: "28px",
              height: "1.5px",
              background: "oklch(0.58 0.22 25)",
            }}
          />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.6rem, 9vw, 9.5rem)",
            lineHeight: "0.92",
            letterSpacing: "0.01em",
            color: "#F5F5F0",
            textShadow:
              "0 4px 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
            marginBottom: "0.2em",
            animation: "fade-up 0.6s ease 0.3s both",
          }}
        >
          Master AI Filmmaking.
          <br />
          <span
            style={{
              color: "oklch(0.62 0.24 25)",
              textShadow:
                "0 0 80px oklch(0.48 0.22 25 / 0.6), 0 4px 40px rgba(0,0,0,0.9)",
              display: "block",
            }}
          >
            Upgrade Your Career.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: "rgba(245,245,240,0.70)",
            lineHeight: "1.6",
            maxWidth: "560px",
            marginBottom: "2.2rem",
            marginTop: "1.2rem",
            animation: "fade-up 0.6s ease 0.45s both",
          }}
        >
          Stop drowning in 12 different tools. Get{" "}
          <strong style={{ color: "rgba(245,245,240,0.95)" }}>
            one clear workflow
          </strong>
          , a proven tech stack, and a{" "}
          <strong style={{ color: "rgba(245,245,240,0.95)" }}>
            LinkedIn certification
          </strong>{" "}
          — all for less than a Netflix subscription.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: "fade-up 0.6s ease 0.55s both" }}
        >
          <a
            href={skoolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary pulse-cta px-8 py-4 text-base font-bold"
            style={{ fontSize: "1rem", letterSpacing: "0.03em" }}
          >
            Join the Academy — From $19/mo
          </a>
          <a
            href="#workflow"
            className="btn-outline px-8 py-4 text-base font-semibold"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            See What's Inside
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            animation: "fade-up 0.6s ease 0.65s both",
          }}
        >
          {[
            "Cancel anytime",
            "1,100+ active creators",
            "Google Certified AI Educator",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(245,245,240,0.45)" }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "oklch(0.55 0.22 25)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "fade-up 0.6s ease 0.8s both",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.3)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(245,245,240,0.3), transparent)",
            animation: "pulse 2s ease infinite",
          }}
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      <FullscreenHero />
      <StatsBar />
      <TestimonialsSection />
      <ProblemSection />
      <WorkflowSection />
      <PricingSection />
      <FinalCTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}
