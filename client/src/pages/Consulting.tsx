/*
 * Portfolio — Brandon Patino | Creative AI Consultant
 * Design: Exact match to brandonpatino.framer.website/portfolio
 * - Pure black bg (#000)
 * - Centered layout, small all-caps name/title header
 * - Big white headline (Bebas Neue)
 * - Full-width YouTube hero video embed
 * - 3 large stat numbers (50,000+ / 10,000+ / 1,000+)
 * - About Me: left text + right photo
 * - Project entries: full-width video + title + description below
 * - Large centered testimonial quotes
 * - "Book Your Consultation" CTA + "Request a Call" button
 * - Footer: © 2020–2026
 */

export default function Consulting() {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ textAlign: "center", padding: "3.5rem 2rem 2.5rem" }}>
        <p style={{
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          AI FILM ACADEMY | BRANDON PATINO
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          letterSpacing: "0.01em",
          lineHeight: "1.05",
          color: "#fff",
          margin: "0 auto 1.25rem",
          maxWidth: "680px",
        }}>
          Future-Proof Your Creative Teams.
        </h1>
        <p style={{
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "460px",
          margin: "0 auto",
          lineHeight: "1.65",
        }}>
          Helping forward-thinking organizations master Generative AI workflows for media, art, and video storytelling.
        </p>
      </header>

      {/* ── HERO VIDEO ── */}
      <section style={{ padding: "1rem 2rem 3rem" }}>
        <div style={{
          maxWidth: "860px",
          margin: "0 auto",
          borderRadius: "6px",
          overflow: "hidden",
          background: "#0d0d0d",
          aspectRatio: "16/9",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Placeholder — swap videoId below with real YouTube video ID */}
          <iframe
            src="https://www.youtube.com/embed/ivhWLYfxBGk"
            title="Brandon Patino — Creative AI Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "2rem 2rem 4.5rem" }}>
        <div style={{
          maxWidth: "860px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          textAlign: "center",
        }}>
          {[
            { number: "50,000+", label: "AI Voice Users via Eleven Labs" },
            { number: "10,000+", label: "Live Workshop Students" },
            { number: "1,000+", label: "AI Film Academy Students" },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                lineHeight: "1",
              color: i === 1 ? "#E63329" : "#fff",
          margin: "0 0 0.4rem",
        }}
              >
                {stat.number}              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.4" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section style={{
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          maxWidth: "860px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          {/* Left: Text */}
          <div>
            <p style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}>
              About Me
            </p>
            {[
              "My career is built on the intersection of design and innovation. Over the last 15 years—from graphic design and web dev to leading complex media projects—I've focused on one goal: leveraging technology to elevate creative output.",
              "For over 5 years, I built and scaled my own video editing agency, delivering high-impact media for a global client base. This honed my skills in storytelling, visual creativity, and managing diverse production teams. In the last 2 years, I have focused on creative AI as a mentor, workshop host, educator, and consultant—empowering professionals and organizations to leverage AI for breakthrough results.",
              "I bring the mindset of an elite athlete to everything I do. My deep commitment to excellence, discipline, and elite performance was recognized with a Guinness World Record in 2025, reflecting my relentless drive toward peak performance in everything I pursue.",
            ].map((para, i) => (
              <p key={i} style={{
                fontSize: "0.93rem",
                color: "rgba(255,255,255,0.68)",
                lineHeight: "1.85",
                marginBottom: "1.25rem",
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Right: Photo */}
          <div>
            <div style={{
              borderRadius: "4px",
              overflow: "hidden",
              background: "#111",
              aspectRatio: "4/5",
            }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/brandon-guinness_4043d965.webp"
                alt="Brandon Patino — Guinness World Record 2025"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
              Guinness World Record — 2025
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ padding: "4.5rem 2rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {[
            {
              title: "AI-Powered 3D Cartoon Animation",
              description: "Generated studio-quality 3D character animation entirely through AI. Achieved a cohesive, vibrant cartoon aesthetic while cutting traditional animation production cycles by 80%.",
              videoId: "REPLACE_WITH_VIDEO_ID_1",
            },
            {
              title: "AI-Powered Realism Ad Campaigns",
              description: "Photorealistic cinematography for a wellness brand launch — zero camera crew required. Delivered broadcast-ready product advertisement using generative video models.",
              videoId: "REPLACE_WITH_VIDEO_ID_2",
            },
            {
              title: "Live Creative AI Trainings",
              description: "Empowering artists worldwide to master the AI video pipeline. From storyboard to final render, I break down complex workflows into actionable steps that ignite creative confidence.",
              videoId: "REPLACE_WITH_VIDEO_ID_3",
            },
          ].map((project, i) => (
            <div key={i} style={{ marginBottom: "5rem" }}>
              <div style={{
                borderRadius: "6px",
                overflow: "hidden",
                background: "#0d0d0d",
                aspectRatio: "16/9",
                marginBottom: "1.5rem",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${project.videoId}`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.55rem",
                letterSpacing: "0.03em",
                color: "#fff",
                marginBottom: "0.6rem",
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: "1.75",
                maxWidth: "540px",
              }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "5rem 2rem",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {[
            {
              quote: "Brandon's leadership gave our team the push we needed. The fear of AI is gone, replaced by a genuine excitement to build better work, faster.",
              name: "Jacob Brakins",
            },
            {
              quote: "Brandon's leadership gave our team the push we needed. The fear of AI is gone, replaced by a genuine excitement to build better work, faster.",
              name: "Lucas C. Cooper",
            },
          ].map((t, i) => (
            <div key={i} style={{
              textAlign: "center",
              padding: "4rem 0",
              borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)",
                lineHeight: "1.3",
                color: "#fff",
                marginBottom: "1.75rem",
                letterSpacing: "0.01em",
              }}>
                "{t.quote}"
              </p>
              <p style={{
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
              }}>
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "5rem 2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          letterSpacing: "0.01em",
          color: "#fff",
          marginBottom: "0.75rem",
        }}
      >
        Book a Strategy Call
      </h2>
        <p style={{
          fontSize: "0.93rem",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "2.25rem",
        }}>
          Unlock creative potential through AI strategies.
        </p>
        <a
          href="https://calendly.com/llcexemplar/strategy-call-w-brandon" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.8rem 2.25rem",
            border: "1px solid #E63329",
            borderRadius: "3px",
            color: "#fff",
            fontSize: "0.88rem",
            letterSpacing: "0.06em",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            background: "#E63329",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#E63329";
            el.style.borderColor = "#E63329";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.borderColor = "rgba(255,255,255,0.35)";
            el.style.color = "#fff";
          }}
        >
          Book a Strategy Call
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "2rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", marginBottom: "0.2rem" }}>
          © 2020–2026
        </p>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
          All Rights Reserved
        </p>
      </footer>

    </div>
  );
}
