/*
 * AI Film Academy - Homepage final action panel
 */

export default function StartHereSection() {
  return (
    <section id="start" className="relative overflow-hidden bg-[#080808] py-20 md:py-28">
      <div className="container">
        <div className="final-action-panel relative overflow-hidden px-6 py-16 text-center sm:px-10 md:px-16 md:py-24">
          <div className="final-action-glow pointer-events-none absolute inset-0" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <h2 className="text-[clamp(3.4rem,7vw,7.25rem)] leading-[0.88] text-white">
              Your AI filmmaking
              <br />
              <span style={{ color: "var(--afa-red)" }}>journey starts here.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-4xl text-[clamp(1.15rem,2vw,1.48rem)] leading-8 text-white/92 md:leading-9">
              Master one production system, create a premium portfolio, and land high ticket creative work.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/membership" className="btn-primary min-h-14 min-w-[220px] px-8 py-4 text-[1rem] font-bold">
                Join the Membership
              </a>
              <a href="/free-video-training" className="btn-outline final-action-outline min-h-14 min-w-[180px] px-8 py-4 text-[1rem] font-bold">
                Try Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
