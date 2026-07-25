import { useState } from "react";

const LESSONS = [
  {
    week: 1,
    title: "The State of AI Media",
    description:
      "The full introduction module: history of AI media, the tool landscape, the Manifesto, the Three Draft System, and the Professional 3-Step Workflow.",
    slideLink: "https://manus.im/share/tX2hiTuAEWxgoVbWHB6wuq",
    slideCount: 41,
    status: "ready",
    tags: ["Intro", "Mindset", "Workflow"],
  },
  {
    week: 2,
    title: "Pre-Production",
    description:
      "Script writing, character sheets, storyboarding, location scouting, and style references. Everything you need before you touch Google Flow.",
    slideLink: null,
    slideCount: 15,
    status: "coming-soon",
    tags: ["Pre-Production", "Storyboard", "Script"],
  },
  {
    week: 3,
    title: "Google Flow Masterclass",
    description:
      "Nano Banana Pro for images, Veo 3 for video, simultaneous audio generation, Fast vs Quality mode, 1080p to 4K, Frames vs Ingredients. This is where you create your footage.",
    slideLink: null,
    slideCount: 15,
    status: "coming-soon",
    tags: ["Production", "Google Flow", "Veo 3"],
  },
  {
    week: 4,
    title: "Cinematic Editing: Pacing & Pattern Interrupts",
    description:
      "The psychology of the cut, the 3-5 second rule, hard cuts, no transitions as the best transition, and the full technical foundation for CapCut and After Effects.",
    slideLink: "https://manus.im/share/QEbpItkdSSH4f0N0zzgIXS",
    slideCount: 11,
    status: "ready",
    tags: ["Post-Production", "Editing", "CapCut"],
  },
];

const STATUS_STYLES: Record<string, string> = {
  ready: "bg-red-600 text-white",
  "coming-soon": "bg-zinc-700 text-zinc-300",
};

const STATUS_LABELS: Record<string, string> = {
  ready: "Ready to Record",
  "coming-soon": "Coming Soon",
};

export default function InternalLessons() {
  const [filter, setFilter] = useState<"all" | "ready" | "coming-soon">("all");

  const filtered =
    filter === "all" ? LESSONS : LESSONS.filter((l) => l.status === filter);

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="min-h-screen bg-black text-white"
    >
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div className="border-b border-zinc-900 bg-black">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="text-red-600 text-xs font-bold tracking-widest uppercase mb-1">
              Internal
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wide">
              AI Film Academy — Lesson Library
            </h1>
          </div>
          <div className="text-zinc-600 text-sm">
            {LESSONS.filter((l) => l.status === "ready").length} of{" "}
            {LESSONS.length} decks ready
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-4 flex gap-3">
        {(["all", "ready", "coming-soon"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
              filter === f
                ? "border-red-600 bg-red-600 text-white"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {f === "all" ? "All Weeks" : f === "ready" ? "Ready" : "Coming Soon"}
          </button>
        ))}
      </div>

      {/* Lesson Cards */}
      <div className="max-w-6xl mx-auto px-8 pb-16 grid grid-cols-1 gap-6 pt-4">
        {filtered.map((lesson) => (
          <div
            key={lesson.week}
            className="border border-zinc-800 bg-zinc-950 flex"
          >
            {/* Week Number */}
            <div className="w-24 flex-shrink-0 flex flex-col items-center justify-center border-r border-zinc-800 py-8">
              <div className="text-red-600 text-xs font-bold tracking-widest uppercase mb-1">
                Week
              </div>
              <div className="text-5xl font-black text-white leading-none">
                {lesson.week}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">
                    {lesson.title}
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {lesson.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-500 border border-zinc-700 px-2 py-0.5 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-1 flex-shrink-0 ${STATUS_STYLES[lesson.status]}`}
                >
                  {STATUS_LABELS[lesson.status]}
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-2xl">
                {lesson.description}
              </p>

              <div className="flex items-center gap-6">
                <span className="text-zinc-600 text-xs uppercase tracking-widest">
                  {lesson.slideCount} Slides
                </span>
                {lesson.slideLink ? (
                  <a
                    href={lesson.slideLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-red-700 transition-colors"
                  >
                    View Slide Deck →
                  </a>
                ) : (
                  <span className="text-zinc-700 text-xs uppercase tracking-widest">
                    Slides in progress
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-900 max-w-6xl mx-auto px-8 py-6 text-zinc-700 text-xs">
        AI Film Academy Internal — Lesson Library · Last updated July 2026
      </div>
    </div>
  );
}
