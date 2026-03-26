/*
 * AI Film Academy — LPV3 Test Landing Page
 * Funnel Flow (Reorganized for cold traffic conversion):
 *
 * 1. Hero          — Fullscreen video background, headline, CTA (same as home)
 * 2. StatsBar      — Quick credibility numbers
 * 3. Gallery       — "Show, Don't Tell" — student work gallery builds visual desire
 * 4. Problem       — Agitate the pain: AI tools are overwhelming, figuring it out alone wastes time
 * 5. WhatYouGet    — The offer stack: courses, calls, workflows, community — make value >> cost
 * 6. Pricing       — The logical close with monthly/annual toggle
 * 7. Testimonials  — Social proof after they already want the results
 * 8. FinalCTA      — Risk reversal, FAQ, final high-contrast CTA
 * 9. Footer
 */

import Navbar from "@/components/Navbar";
import StatsBar from "@/components/StatsBar";
import GallerySection from "@/components/GallerySection";
import ProblemSection from "@/components/ProblemSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import FAQSection from "@/components/FAQSection";
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

      {/* Gradient fade at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background:
            "linear-gradient(to bottom, transparent, rgba(8,8,8,0.95))",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-4"
        style={{ height: "100%", zIndex: 10 }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{ animation: "fade-up 0.6s ease 0.1s both" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "oklch(0.62 0.24 25)",
            }}
          >
            AI Film Academy
          </span>
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
            href="#gallery"
            className="btn-outline px-8 py-4 text-base font-semibold"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            See What's Possible
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

export default function LPV3() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      {/* 1. Hero — Fullscreen video, headline, CTA */}
      <FullscreenHero />
      {/* 2. StatsBar — Quick credibility numbers */}
      <StatsBar />
      {/* 3. Gallery — Show, Don't Tell: student work builds visual desire before any pitch */}
      <GallerySection />
      {/* 4. Problem — Agitate the pain: AI tools are overwhelming, figuring it out alone wastes time */}
      <ProblemSection />
      {/* 5. WhatYouGet — The offer stack: make value heavily outweigh the $19 cost */}
      <WhatYouGetSection />
      {/* 6. Pricing — The logical close with monthly/annual toggle + annual upsell seed */}
      <PricingSection />
      {/* 7. Testimonials — Social proof after they already want the results and understand the offer */}
      <TestimonialsSection />
      {/* 8. FinalCTA — Risk reversal + FAQ + final high-contrast CTA for bottom-scrollers */}
      <FinalCTASection />
      <FAQSection />
      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
