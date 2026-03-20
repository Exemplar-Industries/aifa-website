/*
 * Consulting — Brandon Patino | AI Film Academy
 * Design: Exact match to brandonpatino.framer.website/portfolio
 * - Pure black bg (#000)
 * - Centered layout
 * - Header: bold white DM Sans "BRANDON PATINO | CREATIVE AI CONSULTANT"
 * - Large bold headline (DM Sans bold, not Bebas Neue — matches Framer)
 * - Full-width YouTube hero video embed
 * - 3 large stat numbers (50,000+ / 10,000+ / 1,000+)
 * - About Me: left text + right photo (Guinness)
 * - Project entries: full-width video + title + description
 * - Services section (lead gen focused)
 * - Large centered testimonial quotes
 * - "Book Your Consultation" CTA + "Request a Call" button
 * - Footer: © 2020–2026
 */

export default function Consulting() {
  const CALENDLY = "https://calendly.com/llcexemplar/strategy-call-w-brandon";

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── matches Framer exactly */}
      <header style={{ textAlign: "center", padding: "3.5rem 2rem 2.5rem" }}>
        <p style={{
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: "#fff",
          textTransform: "uppercase",
          marginBottom: "1.1rem",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          BRANDON PATINO | CREATIVE AI CONSULTANT
        </p>
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
          letterSpacing: "-0.02em",
          lineHeight: "1.08",
          color: "#fff",
          margin: "0 auto 1.25rem",
          maxWidth: "720px",
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
        <style>{`
          @media (max-width: 600px) {
            .consulting-stats { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .consulting-about { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .consulting-stat-num { font-size: 3.5rem !important; }
          }
        `}</style>
        <div className="consulting-stats" style={{
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
              <p className="consulting-stat-num" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                lineHeight: "1",
                color: i === 1 ? "#E63329" : "#fff",
                margin: "0 0 0.4rem",
              }}>
                {stat.number}
              </p>
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
        <div className="consulting-about" style={{
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
              videoId: "bUFRQ5CrHBQ",
            },
            {
              title: "AI-Powered Realism Ad Campaigns",
              description: "Photorealistic cinematography for a wellness brand launch — zero camera crew required. Delivered broadcast-ready product advertisement using generative video models.",
              videoId: "zeLO8qGbEfk",
            },
            {
              title: "Live Creative AI Trainings",
              description: "Empowering artists worldwide to master the AI video pipeline. From storyboard to final render, I break down complex workflows into actionable steps that ignite creative confidence.",
              videoId: "jtfgf685-7M",
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
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                letterSpacing: "-0.01em",
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

      {/* ── SERVICES ── */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "5rem 2rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: "1rem",
            textAlign: "center",
          }}>
            What I Offer
          </p>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            letterSpacing: "-0.02em",
            color: "#fff",
            marginBottom: "0.75rem",
            textAlign: "center",
          }}>
            AI Strategy for Creative Organizations
          </h2>
          <p style={{
            fontSize: "0.93rem",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            marginBottom: "3.5rem",
            maxWidth: "480px",
            margin: "0 auto 3.5rem",
          }}>
            From one-day intensives to ongoing advisory — built around your team's workflow and goals.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}>
            {[
              {
                title: "Team AI Workshop",
                desc: "A full-day intensive that takes your creative team from AI-curious to AI-capable. Hands-on, workflow-specific, and immediately applicable to your production pipeline.",
                tag: "1 Day Intensive",
              },
              {
                title: "Marketing Team AI Upskilling",
                desc: "Advising marketing teams on how to start using AI video tools, upskilling their team, and guiding them through creating their first AI-generated concepts and campaigns.",
                tag: "Advisory",
              },
              {
                title: "Curriculum Design & Education",
                desc: "Long-form AI curriculum design for schools and organizations — from 10-month programs to structured course modules. Includes live instruction, lesson planning, and ongoing support.",
                tag: "Education",
              },
              {
                title: "Custom AI Builds",
                desc: "End-to-end custom AI workflow and tool builds for creative teams — from automated video pipelines to branded AI agents tailored to your organization's specific needs.",
                tag: "Custom",
              },
            ].map((service, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                padding: "2rem",
              }}>
                <span style={{
                  display: "inline-block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#E63329",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}>
                  {service.tag}
                </span>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: "0.75rem",
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: "1.7",
                }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ── */}
      <section style={{
        padding: "5rem 2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          letterSpacing: "-0.02em",
          color: "#fff",
          marginBottom: "0.75rem",
        }}>
          Book Your Consultation
        </h2>
        <p style={{
          fontSize: "0.93rem",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "2.25rem",
        }}>
          Unlock creative potential through AI strategies.
        </p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "3px",
            color: "#fff",
            fontSize: "0.88rem",
            letterSpacing: "0.04em",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            background: "transparent",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#E63329";
            el.style.borderColor = "#E63329";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.borderColor = "rgba(255,255,255,0.35)";
          }}
        >
          Request a Call
        </a>
      </section>

      {/* ── STUDENT TESTIMONIALS ── */}
      <section style={{
        padding: "5rem 2rem 4rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "0.6rem",
        }}>Student Results</p>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          letterSpacing: "-0.02em",
          color: "#fff",
          textAlign: "center",
          marginBottom: "0.75rem",
        }}>What Members Are Saying</h2>
        <p style={{
          fontSize: "0.93rem",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: "480px",
          margin: "0 auto 3rem",
        }}>Real posts from the AI Film Academy community on Skool.</p>

        {/* Testimonial image grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}>
          {/* Mark K */}
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111",
          }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/testimonial_mark_k_aee3533a.jpeg"
              alt="Mark K testimonial — AIFA course was a turning point"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
          {/* Jae Lee */}
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111",
          }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/testimonial_jae_lee_13b2196a.jpeg"
              alt="Jae Lee — selected in 4 film festivals with zero prior experience"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
          {/* Tamer Osman */}
          <div style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111",
          }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/testimonial_tamer_osman_d3a2b3d7.jpeg"
              alt="Tamer Osman — earned Generative AI Media Specialist certification"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Pull quote */}
        <blockquote style={{
          borderLeft: "3px solid #E63329",
          paddingLeft: "1.5rem",
          margin: "0 auto",
          maxWidth: "680px",
          textAlign: "left",
        }}>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.75)",
            lineHeight: "1.65",
            marginBottom: "0.75rem",
          }}>
            "Finding your AIFA course was a turning point for me. The important points are easy to understand right away, and the explanations are clear, specific, and practical. Nothing feels vague or overcomplicated — it just makes sense."
          </p>
          <cite style={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
            fontStyle: "normal",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>— Mark K., AI Film Academy Member</cite>
        </blockquote>
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
