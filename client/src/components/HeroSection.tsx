/*
 * HeroSection — Cinematic Video-First Hero
 * Design: "The Director's Cut" — Video center stage, film studio atmosphere
 * Layout: Anthum.ai inspired — headline above, full-width video player, CTA below
 * Video: YouTube embed (ivhWLYfxBGk) as placeholder — swap for actual trailer
 * Atmosphere: Deep black, dramatic red/amber studio lighting, film grain, lens flares
 */

import { useRef, useEffect, useState } from "react";
import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";

const PLACEHOLDER_VIDEO_ID = "ivhWLYfxBGk";

export default function HeroSection() {
  const skoolUrl = useSkoolUrl();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── STUDIO ATMOSPHERE LAYERS ── */}

      {/* Base film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />

      {/* Left studio key light — deep red/amber */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          left: "-10%",
          top: "10%",
          width: "55vw",
          height: "80vh",
          background: "radial-gradient(ellipse at 0% 40%, oklch(0.32 0.18 25 / 0.28) 0%, oklch(0.22 0.14 20 / 0.12) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Right fill light — cooler dark crimson */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          right: "-8%",
          top: "20%",
          width: "45vw",
          height: "70vh",
          background: "radial-gradient(ellipse at 100% 30%, oklch(0.20 0.12 355 / 0.20) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top overhead light — subtle warm amber, like a studio overhead */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-5%",
          left: "30%",
          width: "40vw",
          height: "50vh",
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.40 0.15 40 / 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Bottom ground bounce — deep red glow under the video */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "0",
          left: "15%",
          width: "70vw",
          height: "40vh",
          background: "radial-gradient(ellipse at 50% 100%, oklch(0.38 0.20 25 / 0.22) 0%, transparent 65%)",
          filter: "blur(35px)",
        }}
      />

      {/* Vignette edges — cinematic letterbox feel */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%),
            linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 15%, transparent 75%, rgba(8,8,8,0.9) 100%)
          `,
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-20 w-full">

        {/* Top label + headline */}
        <div className="container pt-28 pb-6 md:pt-32 md:pb-8">
          <div className="text-center">
            {/* Eyebrow label */}
            <div
              className="inline-flex items-center gap-3 mb-5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.58 0.22 25)",
                animation: "fade-up 0.5s ease forwards",
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

            {/* Main headline */}
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.2rem, 9vw, 8rem)",
                lineHeight: "0.92",
                letterSpacing: "0.01em",
                color: "#F5F5F0",
                textShadow: "0 4px 80px rgba(0,0,0,0.95)",
                animation: "fade-up 0.6s ease 0.1s both",
              }}
            >
              Master AI Filmmaking.
              <br />
              <span
                style={{
                  color: "oklch(0.60 0.24 25)",
                  textShadow: "0 0 60px oklch(0.48 0.22 25 / 0.5), 0 4px 80px rgba(0,0,0,0.95)",
                  display: "block",
                }}
              >
                Upgrade Your Career.
              </span>
            </h1>
          </div>
        </div>

        {/* ── VIDEO PLAYER — CENTER STAGE ── */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: "1100px",
            width: "92%",
            animation: "fade-up 0.7s ease 0.2s both",
          }}
        >
          {/* Outer glow frame — studio monitor look */}
          <div
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, oklch(0.45 0.20 25 / 0.6), oklch(0.20 0.10 355 / 0.3), oklch(0.45 0.20 25 / 0.4))",
              filter: "blur(1px)",
              zIndex: 0,
            }}
          />

          {/* Glow bloom behind the player */}
          <div
            style={{
              position: "absolute",
              inset: "-30px",
              borderRadius: "20px",
              background: "radial-gradient(ellipse at 50% 50%, oklch(0.35 0.18 25 / 0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />

          {/* Video container */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "16/9",
              background: "#0d0d0d",
              boxShadow: "0 30px 100px rgba(0,0,0,0.8), 0 0 0 1px oklch(0.35 0.15 25 / 0.4)",
            }}
          >
            {/* Film strip top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "28px",
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                gap: "6px",
                zIndex: 10,
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Film perforations */}
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "14px",
                    height: "10px",
                    borderRadius: "2px",
                    border: "1px solid oklch(0.40 0.18 25 / 0.5)",
                    background: "oklch(0.12 0 0)",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Film strip bottom bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "28px",
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                gap: "6px",
                zIndex: 10,
                backdropFilter: "blur(4px)",
              }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "14px",
                    height: "10px",
                    borderRadius: "2px",
                    border: "1px solid oklch(0.40 0.18 25 / 0.5)",
                    background: "oklch(0.12 0 0)",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Loading state */}
            {!videoLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0d0d0d",
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "2px solid oklch(0.48 0.22 25 / 0.3)",
                    borderTopColor: "oklch(0.58 0.22 25)",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            )}

            {/* YouTube iframe */}
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${PLACEHOLDER_VIDEO_ID}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&loop=1&playlist=${PLACEHOLDER_VIDEO_ID}&controls=1&origin=${encodeURIComponent(window.location.origin)}`}
              title="AI Film Academy — Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
              style={{
                position: "absolute",
                top: "28px",
                left: 0,
                width: "100%",
                height: "calc(100% - 56px)",
                border: "none",
                display: "block",
              }}
            />

            {/* Corner accent — top right */}
            <div
              style={{
                position: "absolute",
                top: "28px",
                right: 0,
                width: "80px",
                height: "80px",
                background: "radial-gradient(ellipse at 100% 0%, oklch(0.50 0.22 25 / 0.15) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 8,
              }}
            />
          </div>

          {/* Side accent lines — studio monitor frame */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "-16px",
              width: "2px",
              height: "calc(100% - 56px)",
              background: "linear-gradient(to bottom, transparent, oklch(0.48 0.22 25 / 0.6), transparent)",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "-16px",
              width: "2px",
              height: "calc(100% - 56px)",
              background: "linear-gradient(to bottom, transparent, oklch(0.48 0.22 25 / 0.6), transparent)",
              zIndex: 2,
            }}
          />
        </div>

        {/* ── BELOW VIDEO: Subheadline + CTAs ── */}
        <div className="container pt-8 pb-16 md:pt-10 md:pb-20">
          <div className="text-center max-w-2xl mx-auto">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                color: "rgba(245,245,240,0.65)",
                lineHeight: "1.6",
                marginBottom: "2rem",
                animation: "fade-up 0.6s ease 0.35s both",
              }}
            >
              Stop drowning in 12 different tools. Get{" "}
              <strong style={{ color: "rgba(245,245,240,0.9)" }}>one clear workflow</strong>, a
              proven tech stack, and a{" "}
              <strong style={{ color: "rgba(245,245,240,0.9)" }}>LinkedIn certification</strong> —
              all for less than a Netflix subscription.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: "fade-up 0.6s ease 0.45s both" }}
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
                href="#what-you-get"
                className="btn-outline px-8 py-4 text-base font-semibold"
              >
                See What's Inside
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                animation: "fade-up 0.6s ease 0.55s both",
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
                  <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ opacity: 0.35 }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F5F5F0",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "rgba(245,245,240,0.4)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
