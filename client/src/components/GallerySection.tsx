/*
 * GallerySection — AI Film Gallery
 * Design: "The Director's Cut" — Cinematic Dark
 * Showcases community-created AI films in a masonry-style grid
 */

import { useSkoolCta } from "@/contexts/AffiliateLinkContext";

const galleryItems = [
  {
    title: "Prometheus Unbound",
    creator: "Bruno Saki",
    category: "Sci-Fi Short",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    aspect: "tall",
  },
  {
    title: "Neon Requiem",
    creator: "TeeCee",
    category: "Cyberpunk",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    aspect: "wide",
  },
  {
    title: "The Last Signal",
    creator: "Shahine",
    category: "Drama",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    aspect: "square",
  },
  {
    title: "Fracture",
    creator: "Mark Kobayashi",
    category: "Action",
    img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    aspect: "square",
  },
  {
    title: "Echoes of Light",
    creator: "Gentrit Brahimi",
    category: "Experimental",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    aspect: "wide",
  },
  {
    title: "Iron Bloom",
    creator: "AIFA Member",
    category: "Nature / AI",
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
    aspect: "tall",
  },
];

export default function GallerySection() {
  const { skoolUrl, trackCtaClick } = useSkoolCta();

  return (
    <section className="py-24 bg-[#0A0A0A]" id="gallery">
      <div className="container">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs uppercase tracking-[0.25em] text-white/30 mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Community Showcase
          </p>
          <h2
            className="text-5xl md:text-6xl font-black uppercase leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
          >
            The AI Film{" "}
            <span style={{ color: "oklch(0.48 0.22 25)" }}>Gallery</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl text-sm leading-relaxed">
            Real work from real members. Every frame made with the AIFA workflow — no prior filmmaking experience required.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${
                item.aspect === "tall" ? "row-span-2" : ""
              }`}
              style={{
                aspectRatio: item.aspect === "tall" ? "3/4" : item.aspect === "wide" ? "16/9" : "1/1",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "oklch(0.48 0.22 25)",
                  }}
                >
                  {item.category}
                </p>
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-white/50 text-xs">{item.creator}</p>
              </div>
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/30"
                  style={{ background: "oklch(0.48 0.22 25 / 0.8)" }}
                >
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <p className="text-white/70 text-sm">
              Want your work featured here?{" "}
              <span className="text-white font-medium">Join the Academy and start creating.</span>
            </p>
          </div>
          <a
            href={skoolUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick("Gallery CTA")}
            className="shrink-0 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:opacity-80"
            style={{
              background: "oklch(0.48 0.22 25)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.15em",
            }}
          >
            Join the Academy →
          </a>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-white/20 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          * Gallery currently shows sample work. Community submissions open to all active members.
        </p>
      </div>
    </section>
  );
}
