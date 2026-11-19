import ShowcaseGrid from "@/components/ShowcaseGrid";

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
            <ShowcaseGrid />

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
