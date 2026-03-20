/*
 * StatsBar — Horizontal proof strip
 * Design: "The Director's Cut" — dark card strip with key numbers
 */

const stats = [
  { number: "1,100+", label: "Active Creators" },
  { number: "$19", label: "Per Month" },
  { number: "50+", label: "Lessons & Tutorials" },
  { number: "1", label: "Proven Workflow" },
  { number: "5.0★", label: "Google Rating" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0D0D0D] border-y border-white/5">
      <div className="container py-6">
        <div className="flex flex-wrap items-center justify-between gap-y-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center flex-1 min-w-[100px] px-4"
            >
              <span
                className="stat-number text-3xl md:text-4xl text-white"
                style={{ color: i === 0 ? "oklch(0.48 0.22 25)" : "#F5F5F0" }}
              >
                {stat.number}
              </span>
              <span
                className="text-xs text-white/40 mt-1 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
