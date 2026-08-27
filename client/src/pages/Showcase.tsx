type ShowcasePiece = {
  title: string;
  kind: "video" | "youtube";
  src: string;
  poster?: string;
};

const SHOWCASE_PIECES: ShowcasePiece[] = [
  {
    title: "Animation",
    kind: "video",
    src: "/assets/showcase-animation.mp4",
    poster: "/assets/showcase-animation-poster.jpg",
  },
  {
    title: "Commercial",
    kind: "video",
    src: "/assets/showcase-commercial.mp4",
    poster: "/assets/showcase-commercial-poster.jpg",
  },
  {
    title: "Music Video",
    kind: "youtube",
    src: "https://www.youtube-nocookie.com/embed/QK0XY9aCcSM?rel=0&modestbranding=1",
  },
  {
    title: "Movie Trailer",
    kind: "video",
    src: "/assets/showcase-movie-trailer.mp4",
    poster: "/assets/showcase-movie-trailer-poster.jpg",
  },
  {
    title: "Story Video",
    kind: "video",
    src: "/assets/showcase-story.mp4",
    poster: "/assets/showcase-story-poster.jpg",
  },
  {
    title: "Horror",
    kind: "video",
    src: "/assets/showcase-horror.mp4",
    poster: "/assets/showcase-horror-poster.jpg",
  },
  {
    title: "Comedy",
    kind: "video",
    src: "/assets/showcase-comedy.mp4",
    poster: "/assets/showcase-comedy-poster.jpg",
  },
  {
    title: "Commercial",
    kind: "video",
    src: "/assets/showcase-commercial-original.mp4",
    poster: "/assets/showcase-commercial-original-poster.jpg",
  },
];

function ShowcaseMedia({ piece }: { piece: ShowcasePiece }) {
  if (piece.kind === "youtube") {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={piece.src}
        title={`${piece.title} showcase film`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      controls
      playsInline
      preload="metadata"
      poster={piece.poster}
      aria-label={`${piece.title} showcase film`}
    >
      <source src={piece.src} type="video/mp4" />
      Your browser does not support this video.
    </video>
  );
}

export default function Showcase() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <main className="grain-overlay relative overflow-hidden pt-16 md:pt-[4.5rem]">
        <section className="relative flex min-h-[52svh] items-start overflow-hidden border-b border-white/10 md:min-h-[62vh] md:items-end">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 74% 28%, color-mix(in oklch, var(--afa-red) 28%, transparent), transparent 31%), linear-gradient(135deg, #080808 0%, #111 58%, #080808 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-[12%] w-px bg-white/10" />
          <div className="pointer-events-none absolute bottom-[18%] right-0 h-px w-[52%] bg-afa-red/35" />

          <div className="container relative z-10 mx-auto py-10 text-center md:py-24">
            <h1 className="mx-auto max-w-6xl text-[clamp(4rem,11vw,10rem)] leading-[0.84] text-afa-red">
              See Whats Possible
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/85 md:text-2xl md:leading-9">
              A first look at the work creators are making through AI Film Academy training, live events, and creative practice. Each piece is here to show the range of ideas, genres, and visual worlds this work can hold.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-7 md:grid-cols-2 md:gap-9">
              {SHOWCASE_PIECES.map((piece) => (
                <article
                  key={piece.title}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <ShowcaseMedia piece={piece} />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                  </div>
                  <div className="px-6 py-5 md:px-7">
                    <h3 className="text-[clamp(2.2rem,4vw,3.3rem)] leading-none text-white">
                      {piece.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 border-t border-white/10 pt-10 text-center md:mt-16 md:pt-12">
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                More films, commercials, and live-event work are being added as the library grows.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
