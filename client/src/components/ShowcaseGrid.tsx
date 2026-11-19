export type ShowcasePiece = {
  title: string;
  kind: "video" | "youtube";
  src: string;
  poster?: string;
};

export const SHOWCASE_PIECES: ShowcasePiece[] = [
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

export default function ShowcaseGrid() {
  return (
    <div className="grid gap-7 md:grid-cols-2 md:gap-9">
      {SHOWCASE_PIECES.map((piece) => (
        <article
          key={piece.src}
          className="group overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        >
          <div className="relative aspect-video overflow-hidden bg-black">
            <ShowcaseMedia piece={piece} />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <div className="px-6 py-5 md:px-7">
            <h3 className="text-[clamp(2.2rem,4vw,3.3rem)] leading-none text-white">{piece.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
