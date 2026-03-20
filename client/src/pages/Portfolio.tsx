/*
 * Portfolio — Private client-facing portfolio page
 * Design: "The Director's Cut" — same cinematic dark aesthetic as the main site
 * Access: /portfolio (not linked from main nav — share directly with clients)
 * Inspired by: brandonpatino.framer.website/portfolio
 */

import { useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-logo-long_9672f3eb.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-hero-bg-kCkktLY3hquHjRqwTxUHRg.webp";

// Portfolio work items — update with real project data
const projects = [
  {
    id: 1,
    category: "AI FILM",
    title: "Prometheus Unbound",
    description: "Full AI-generated short film. Concept to final export using Midjourney, Kling AI, and Runway. Cinematic color grade in CapCut.",
    tags: ["Midjourney", "Kling AI", "Runway", "CapCut"],
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "BRAND CAMPAIGN",
    title: "AI Film Academy — Launch Campaign",
    description: "Full brand identity and video campaign for AIFA's 2025 launch. 1,100+ members acquired in first 90 days.",
    tags: ["Brand Strategy", "Video Production", "Meta Ads"],
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    category: "AI COMMERCIAL",
    title: "Product Spot — AI Generated",
    description: "30-second product commercial created entirely with AI tools. From storyboard to final delivery in 48 hours.",
    tags: ["Google Veo", "Midjourney", "ElevenLabs"],
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    category: "EDUCATION",
    title: "AI Filmmaking Curriculum",
    description: "50+ video lessons covering the complete AI filmmaker workflow. Developed for 1,100+ students across 40+ countries.",
    tags: ["Curriculum Design", "Video Production", "Skool"],
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    category: "AI MUSIC VIDEO",
    title: "Neon Requiem",
    description: "AI-generated music video for an independent artist. Full visual direction and production using the AIFA workflow.",
    tags: ["Midjourney", "Runway", "Kling AI", "CapCut"],
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    category: "CONSULTING",
    title: "Enterprise AI Integration",
    description: "Consulting engagement helping a media company integrate AI tools into their production pipeline. 60% cost reduction achieved.",
    tags: ["AI Strategy", "Workflow Design", "Training"],
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    featured: false,
  },
];

const stats = [
  { number: "1,100+", label: "Students Trained" },
  { number: "50+", label: "AI Films Produced" },
  { number: "40+", label: "Countries Reached" },
  { number: "5.0★", label: "Google Rating" },
];

const services = [
  {
    icon: "🎬",
    title: "AI Film Production",
    description: "End-to-end AI film production — from concept and storyboard to final delivery. Cinematic quality at a fraction of traditional cost.",
  },
  {
    icon: "📡",
    title: "Brand Video Campaigns",
    description: "AI-powered video campaigns for brands and startups. Fast turnaround, premium output, measurable results.",
  },
  {
    icon: "🤖",
    title: "AI Workflow Consulting",
    description: "Help your team integrate AI tools into your production pipeline. Custom training, workflow design, and ongoing support.",
  },
  {
    icon: "🎓",
    title: "Custom Training Programs",
    description: "Bespoke AI filmmaking training for corporate teams, agencies, and media companies. In-person or remote.",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const categories = ["ALL", "AI FILM", "BRAND CAMPAIGN", "AI COMMERCIAL", "EDUCATION", "AI MUSIC VIDEO", "CONSULTING"];

  const filtered = activeFilter === "ALL"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-x-hidden">
      {/* Minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="AI Film Academy"
              className="h-8 w-auto object-contain"
              style={{ maxWidth: '160px', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <div className="flex items-center gap-4">
            <span
              className="text-xs text-white/30 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
            >
              Private Portfolio
            </span>
            <a
              href="mailto:hello@aifilmacademy.com"
              className="btn-primary px-4 py-2 text-sm font-semibold"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 100% 50%, oklch(0.48 0.22 25 / 0.08) 0%, transparent 70%)" }}
        />

        <div className="container relative z-10 pb-16 md:pb-24">
          <div
            className="text-xs uppercase tracking-widest text-white/30 mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
          >
            — Brandon Patino / AI Film Academy
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              lineHeight: "0.92",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
            }}
          >
            Director.
            <br />
            Educator.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>AI Pioneer.</span>
          </h1>
          <p
            className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Google-certified AI educator and filmmaker. Founder of AI Film Academy (AIFA). Helping brands, creators, and enterprises harness the power of AI filmmaking.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-10">
            {stats.map((stat, i) => (
              <div key={i}>
                <p
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: i === 0 ? "oklch(0.48 0.22 25)" : "#F5F5F0",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-xs text-white/40 mt-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="section-label mb-3">Selected Work</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: "1",
                  color: "#F5F5F0",
                }}
              >
                Recent Projects
              </h2>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {["ALL", "AI FILM", "BRAND CAMPAIGN", "CONSULTING"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    background: activeFilter === cat ? "oklch(0.48 0.22 25)" : "oklch(0.14 0 0)",
                    color: activeFilter === cat ? "#F5F5F0" : "oklch(0.5 0 0)",
                    border: `1px solid ${activeFilter === cat ? "oklch(0.48 0.22 25)" : "oklch(0.22 0 0)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className={`group relative rounded-xl overflow-hidden border border-white/8 cursor-pointer transition-all duration-300 hover:border-white/20 ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ background: "oklch(0.10 0 0)" }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ paddingBottom: project.featured ? "60%" : "65%" }}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: 0.75 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        background: "oklch(0.48 0.22 25)",
                        color: "#F5F5F0",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-white/40 text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-white font-semibold text-lg mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded text-xs border"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.06em",
                          borderColor: "oklch(0.22 0 0)",
                          color: "oklch(0.55 0 0)",
                          background: "oklch(0.12 0 0)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="max-w-xl mb-12">
            <div className="section-label mb-4">Services</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: "1",
                color: "#F5F5F0",
              }}
            >
              What I Can
              <br />
              <span style={{ color: "oklch(0.48 0.22 25)" }}>Do For You</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="afa-card rounded-xl p-6 flex gap-4"
              >
                <span className="text-2xl shrink-0">{service.icon}</span>
                <div>
                  <h3
                    className="text-white font-semibold mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, oklch(0.48 0.22 25 / 0.07) 0%, transparent 70%)" }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-label mb-6 justify-center">Let's Work Together</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: "0.95",
              color: "#F5F5F0",
            }}
          >
            Ready to Start
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>Your Project?</span>
          </h2>
          <p
            className="mt-6 text-white/55 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Whether you need AI film production, brand video content, or enterprise AI training — let's talk about what's possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="mailto:hello@aifilmacademy.com"
              className="btn-primary pulse-cta px-10 py-4 text-lg font-bold"
            >
              Email Brandon →
            </a>
            <a
              href="/"
              className="btn-outline px-8 py-4 text-base font-semibold"
            >
              View AIFA Academy
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060606] border-t border-white/5 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
          <img
            src={LOGO_URL}
            alt="AI Film Academy"
            className="h-7 w-auto object-contain"
            style={{ maxWidth: '130px', filter: 'brightness(0) invert(1) opacity(0.4)' }}
          />
          <p className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} Brandon Patino / AI Film Academy™ (AIFA). Private portfolio — not for public distribution.
          </p>
        </div>
      </footer>
    </div>
  );
}
