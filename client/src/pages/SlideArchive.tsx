import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, Film, Loader2, LockKeyhole, LogOut } from "lucide-react";
import {
  archiveCategories,
  archiveCategoryClass,
  privateStoryboardAssets,
  type ArchiveCategory,
  type SlideDeckRecord,
} from "@/lib/slideArchive";
import "../slide-archive.css";

type AccessState = "loading" | "locked" | "granted";

const cameraMotionFallback: SlideDeckRecord = {
  id: "camera-motion",
  slug: "camera-motion",
  title: "Camera Motion",
  category: "Course Lessons",
  description: "A concise visual foundation for push-ins, pull-outs, tracking, pans, orbits, and crane moves.",
  thumbnail_path: null,
  source_bundle_path: null,
  presentation_route: "/internal/slide-archive/camera-motion",
  presentation_mode: "native",
  media_manifest: {
    pushIn: "private/camera-motion/push_in_guitar_tuning.mp4",
    pullOut: "private/camera-motion/pull_out_guitar_fireplace.mp4",
    tracking: "private/camera-motion/tracking_car_driving_away.mp4",
    pan: "private/camera-motion/pan_neon_market.mp4",
    orbit: "private/camera-motion/orbit_option_b_first4.mp4",
    crane: "private/camera-motion/crane_neon_market_trimmed.mp4",
  },
  tags: ["Camera", "Motion", "Course lesson"],
  status: "ready",
  sort_order: 10,
  created_at: "2026-09-04T00:00:00.000Z",
  updated_at: "2026-09-04T00:00:00.000Z",
};

const whyCameraMotionFallback: SlideDeckRecord = {
  id: "why-camera-motion-matters",
  slug: "why-camera-motion-matters",
  title: "Why Camera Motion Matters",
  category: "Free Training Funnel",
  description: "A free visual primer on why intentional motion makes AI films feel more cinematic and emotionally clear.",
  thumbnail_path: null,
  source_bundle_path: null,
  presentation_route: "/internal/slide-archive/why-camera-motion-matters",
  presentation_mode: "native",
  media_manifest: cameraMotionFallback.media_manifest,
  tags: ["Free training", "Camera motion", "Story"],
  status: "ready",
  sort_order: 15,
  created_at: "2026-09-05T00:00:00.000Z",
  updated_at: "2026-09-05T00:00:00.000Z",
};

const whyCameraAnglesFallback: SlideDeckRecord = {
  id: "why-camera-angles-matter",
  slug: "why-camera-angles-matter",
  title: "Why Camera Angles Matter",
  category: "Free Training Funnel",
  description: "A free visual primer on how intentional angles direct emotion, pacing, and viewer attention.",
  thumbnail_path: null,
  source_bundle_path: null,
  presentation_route: "/internal/slide-archive/why-camera-angles-matter",
  presentation_mode: "native",
  media_manifest: cameraMotionFallback.media_manifest,
  tags: ["Free training", "Camera angles", "Retention"],
  status: "ready",
  sort_order: 16,
  created_at: "2026-09-05T00:00:00.000Z",
  updated_at: "2026-09-05T00:00:00.000Z",
};

const betterYouthFallback: SlideDeckRecord = {
  id: "better-youth-genjam",
  slug: "better-youth-genjam",
  title: "Better Youth GenJam",
  category: "Workshops & Events",
  description: "The interactive Machine Cinema live workshop system for Better Youth GenJam.",
  thumbnail_path: null,
  source_bundle_path: null,
  presentation_route: "/genjam/better-youth-0829",
  presentation_mode: "legacy",
  media_manifest: {},
  tags: ["GenJam", "Workshop", "Interactive"],
  status: "ready",
  sort_order: 20,
  created_at: "2026-09-04T00:00:00.000Z",
  updated_at: "2026-09-04T00:00:00.000Z",
};

function useArchiveAccess() {
  const [access, setAccess] = useState<AccessState>("loading");

  async function refresh() {
    try {
      const response = await fetch("/api/archive/session", { credentials: "include" });
      const payload = await response.json() as { authorized?: boolean };
      setAccess(payload.authorized ? "granted" : "locked");
    } catch {
      setAccess("locked");
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return { access, refresh };
}

function ArchiveLoading() {
  return <main className="archive-shell archive-loading"><Loader2 aria-label="Loading archive" className="archive-spinner" /></main>;
}

function ArchiveSignIn({ onUnlocked }: { onUnlocked: () => void }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/archive/unlock", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });
    setBusy(false);
    if (!response.ok) {
      setError("That passcode is not correct.");
      return;
    }
    setPasscode("");
    onUnlocked();
  }

  return (
    <main className="archive-shell archive-auth">
      <section className="archive-auth-panel">
        <div className="archive-mark"><Film size={18} aria-hidden="true" /> AI Film Academy</div>
        <p className="archive-kicker">Private system</p>
        <h1>Slide archive</h1>
        <p className="archive-lede">Enter the internal archive passcode to access course decks and interactive presentations.</p>
        <form onSubmit={handleSubmit} className="archive-signin-form">
          <label htmlFor="archive-passcode">Archive passcode</label>
          <input id="archive-passcode" type="password" autoComplete="current-password" required value={passcode} onChange={(event) => setPasscode(event.target.value)} placeholder="Enter passcode" />
          {error && <p className="archive-error" role="alert">{error}</p>}
          <button className="archive-button archive-button-primary" disabled={busy} type="submit">{busy ? "Opening archive…" : "Open archive"}<ArrowRight size={17} /></button>
        </form>
        <p className="archive-footnote"><LockKeyhole size={14} /> Access creates a private browser session for this archive.</p>
      </section>
    </main>
  );
}

function DeckCard({ deck, onOpen }: { deck: SlideDeckRecord; onOpen: () => void }) {
  return (
    <button type="button" className="archive-deck-card" onClick={onOpen}>
      <div className={`archive-deck-art archive-deck-art-${archiveCategoryClass(deck.category)}`}>
        <div className="archive-card-lines" aria-hidden="true" />
        <span>{deck.category}</span>
        <strong>{deck.title}</strong>
        <i>{deck.presentation_mode === "native" ? "Native interactive deck" : "Archived live presentation"}</i>
      </div>
      <div className="archive-deck-meta">
        <div>
          <p>{deck.category}</p>
          <h2>{deck.title}</h2>
        </div>
        <span className="archive-open-mark" aria-hidden="true"><ArrowRight size={18} /></span>
      </div>
      <div className="archive-tags">{deck.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
    </button>
  );
}

function ArchiveIndex() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | "All">("All");
  const decks = [cameraMotionFallback, whyCameraMotionFallback, whyCameraAnglesFallback, betterYouthFallback];
  const visibleDecks = decks.filter((deck) => selectedCategory === "All" || deck.category === selectedCategory);

  async function logout() {
    await fetch("/api/archive/logout", { method: "POST", credentials: "include" });
    window.location.reload();
  }

  return (
    <main className="archive-shell archive-index">
      <header className="archive-topbar">
        <Link href="/" className="archive-wordmark"><Film size={17} /> AIFA <span>Internal</span></Link>
        <div className="archive-topbar-actions"><span className="archive-user-state"><LockKeyhole size={15} /> Internal access</span><button type="button" onClick={logout}><LogOut size={16} /> Lock archive</button></div>
      </header>
      <section className="archive-library" aria-label="Slide deck archive">
        <div className="archive-library-head"><div><p>Library</p><h2>Deck archive</h2></div><span>{visibleDecks.length} {visibleDecks.length === 1 ? "deck" : "decks"}</span></div>
        <div className="archive-filters" role="tablist" aria-label="Deck categories">
          <button role="tab" aria-selected={selectedCategory === "All"} className={selectedCategory === "All" ? "is-active" : ""} onClick={() => setSelectedCategory("All")}>All decks</button>
          {archiveCategories.map((category) => <button key={category} role="tab" aria-selected={selectedCategory === category} className={selectedCategory === category ? "is-active" : ""} onClick={() => setSelectedCategory(category)}>{category}</button>)}
        </div>
        <div className="archive-grid">{visibleDecks.map((deck) => <DeckCard key={deck.slug} deck={deck} onOpen={() => navigate(deck.presentation_route)} />)}</div>
      </section>
    </main>
  );
}

const storyboardAssets = {
  football: { asset: privateStoryboardAssets[0], alt: "Football storyboard showing a progression from an establishing shot to a close-up." },
  forest: { asset: privateStoryboardAssets[1], alt: "Forest storyboards showing a visual sequence from environment to character reaction." },
  creator: { asset: privateStoryboardAssets[2], alt: "Creator storyboard showing a planned progression of scenes and framing choices." },
} as const;

type CameraSlide = { label: string; title: string; copy: string; detail?: string; prompt?: string; media?: keyof typeof cameraMotionFallback.media_manifest };
type FreeTrainingSlide = { label: string; title: string; copy: string; detail?: string; media?: keyof typeof cameraMotionFallback.media_manifest; storyboard?: keyof typeof storyboardAssets };

const cameraSlides: CameraSlide[] = [
  { label: "AI Film Academy · Course Lesson", title: "Camera motion", copy: "Make the viewer feel something." },
  { label: "Why it matters", title: "Motion gives the shot a job.", copy: "A camera move should change how a scene feels—not simply decorate the frame." },
  { label: "The foundation", title: "The five moves to know.", copy: "Push in. Pull out. Tracking. Pan. Orbit. Crane / boom." },
  { label: "Push in", title: "Push in", copy: "Intimacy. Momentum. A thought getting closer.", detail: "The camera physically travels toward the subject.", prompt: "Slow push in as she tunes the guitar, bringing us closer to the decision.", media: "pushIn" },
  { label: "Pull out", title: "Pull out", copy: "Release. Distance. The end of a beat.", detail: "The camera physically travels away from the subject.", prompt: "Slow pull out from the guitarist to reveal the full warmth of the room.", media: "pullOut" },
  { label: "Tracking", title: "Tracking", copy: "Momentum. Pursuit. A subject moving through the world.", detail: "The camera physically follows the subject as it travels.", prompt: "Tracking shot following the car as it drives away down the motel road.", media: "tracking" },
  { label: "Pan", title: "Pan", copy: "Curiosity. Discovery. A controlled reveal.", detail: "The camera stays planted and turns.", prompt: "Slow pan right to reveal the warmth of the cabin fireplace.", media: "pan" },
  { label: "Orbit", title: "Orbit", copy: "Tension. Attraction. A moment turning.", detail: "The camera physically moves around the subject.", prompt: "Fast clockwise orbit around the red convertible, keeping it centered as the desert station sweeps behind it.", media: "orbit" },
  { label: "Crane / boom", title: "Crane / boom", copy: "Awe. Scale. A final release.", detail: "The camera physically rises or descends.", prompt: "Smooth crane up to reveal the full rain-soaked market.", media: "crane" },
  { label: "Practice", title: "Pick the feeling. Then choose the move.", copy: "Use one clear motion at a time. Make it earn its place in the story." },
];

const whyCameraMotionSlides: FreeTrainingSlide[] = [
  { label: "AI Film Academy · Free Training", title: "Why motion matters", copy: "The difference between a moving image and a cinematic moment." },
  { label: "The gap", title: "Give motion a job", copy: "Without intention, movement is decoration. With intention, it tells the audience what to feel." },
  { label: "Attention", title: "Direct the eye", copy: "A push in tells us exactly where to lean in—and why the moment matters.", media: "pushIn" },
  { label: "Emotion", title: "Change the feeling", copy: "A pull out can create distance and release. A tracking shot can create momentum and pursuit.", media: "pullOut" },
  { label: "The pairing", title: "Perspective plus energy", copy: "Choose the angle that frames the story. Then choose the move that gives the frame energy.", media: "tracking" },
  { label: "The standard", title: "Make it deliberate", copy: "The audience may not name the move. They will feel whether the camera had a reason to move." },
  { label: "The good news", title: "Start sooner", copy: "You need enough visual language to make a clear choice—then the reps to turn instinct into taste." },
  { label: "The foundation", title: "Learn five moves", copy: "Push in. Pull out. Tracking. Pan. Orbit. Crane / boom.", media: "orbit" },
  { label: "Your first sequence", title: "Choose the feeling", copy: "Build one short moment around one emotional decision. One clear move is already a major upgrade." },
  { label: "Inside AI Film Academy", title: "Make better stories", copy: "We teach the core camera-motion fundamentals, give you practical resources, and show you how to experiment with confidence." },
];

const whyCameraAnglesSlides: FreeTrainingSlide[] = [
  { label: "AI Film Academy · Free Training", title: "Why angles matter", copy: "The frame changes what the audience knows, feels, and follows." },
  { label: "The truth", title: "Every frame decides", copy: "An angle always makes a choice about power, distance, attention, and point of view.", storyboard: "football" },
  { label: "Emotion", title: "Frame the feeling", copy: "A close frame brings us inward. A wider frame gives the subject context. The right angle tells us how to feel.", media: "pushIn" },
  { label: "Attention", title: "Show what matters", copy: "A wide shot introduces the world. A medium carries action. A close shot makes the reaction impossible to miss." },
  { label: "Story", title: "Guide the story", copy: "Introduce the place, reveal the object, then land on the response—so the viewer always knows what matters.", storyboard: "forest" },
  { label: "Pacing", title: "Build the rhythm", copy: "Changes in size, height, and perspective create rhythm. Random changes just feel random." },
  { label: "Retention", title: "Interrupt with purpose", copy: "A new angle can reset attention when it reveals something the story needs.", media: "crane" },
  { label: "The pairing", title: "Perspective plus motion", copy: "Choose the perspective first. Then choose how the camera should move through that perspective.", media: "orbit" },
  { label: "Your first sequence", title: "Plan before you animate", copy: "Set the scene. Show the action. Land on the reaction. Reveal the detail.", storyboard: "creator" },
  { label: "Inside AI Film Academy", title: "Stop guessing", copy: "We teach five core angle fundamentals, retention sequences, and the visual tools that make AI films feel intentional." },
];

function CameraMotionViewer({ deck }: { deck: SlideDeckRecord }) {
  const [, navigate] = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") setSlideIndex((index) => Math.min(cameraSlides.length - 1, index + 1));
      if (event.key === "ArrowLeft") setSlideIndex((index) => Math.max(0, index - 1));
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      if (event.key === "Escape" && !document.fullscreenElement) navigate("/internal/slide-archive");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  const slide = cameraSlides[slideIndex];
  const mediaFile = slide.media ? deck.media_manifest[slide.media] : undefined;
  const mediaUrl = mediaFile ? `/api/archive/media/${encodeURIComponent(mediaFile.split("/").pop() || "")}` : undefined;
  return (
    <main className="camera-deck" onClick={() => setSlideIndex((index) => Math.min(cameraSlides.length - 1, index + 1))}>
      <div className="camera-deck-chrome" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => navigate("/internal/slide-archive")} aria-label="Back to archive"><ArrowLeft size={18} /></button>
        <span>{String(slideIndex + 1).padStart(2, "0")} / {String(cameraSlides.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Fullscreen presentation"><Expand size={18} /></button>
      </div>
      <section className={`camera-slide ${slide.media ? "camera-slide-media" : ""}`}>
        <div className="camera-slide-copy">
          <p className="camera-slide-label">{slide.label}</p>
          <h1>{slide.title}</h1>
          <div className="camera-slide-rule" />
          <p className="camera-slide-primary">{slide.copy}</p>
          {slide.detail && <div className="camera-slide-detail"><span>The rule</span><p>{slide.detail}</p></div>}
          {slide.prompt && <div className="camera-slide-prompt"><span>Prompt</span><p>{slide.prompt}</p></div>}
        </div>
        {slide.media && <div className="camera-slide-media-frame">
          {mediaUrl ? <video key={mediaUrl} src={mediaUrl} autoPlay loop muted playsInline preload="auto" onError={() => setMediaError(true)} /> : <div className="camera-media-wait">{mediaError ? "Private media is not available." : "Loading secure motion clip…"}</div>}
        </div>}
      </section>
      <div className="camera-deck-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" disabled={slideIndex === 0} onClick={() => setSlideIndex((index) => Math.max(0, index - 1))}><ChevronLeft size={20} /> Previous</button>
        <div>{cameraSlides.map((_, index) => <button key={index} type="button" className={index === slideIndex ? "is-active" : ""} aria-label={`Go to slide ${index + 1}`} onClick={() => setSlideIndex(index)} />)}</div>
        <button type="button" disabled={slideIndex === cameraSlides.length - 1} onClick={() => setSlideIndex((index) => Math.min(cameraSlides.length - 1, index + 1))}>Next <ChevronRight size={20} /></button>
      </div>
    </main>
  );
}

function FreeTrainingViewer({ deck, slides }: { deck: SlideDeckRecord; slides: FreeTrainingSlide[] }) {
  const [, navigate] = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);
  const [mediaError, setMediaError] = useState(false);
  const slide = slides[slideIndex];
  const storyboard = slide.storyboard ? storyboardAssets[slide.storyboard] : undefined;
  const hasVisual = Boolean(slide.media || storyboard);
  const mediaFile = slide.media ? deck.media_manifest[slide.media] : storyboard?.asset;
  const mediaUrl = mediaFile ? `/api/archive/media/${encodeURIComponent(mediaFile.split("/").pop() || "")}` : undefined;

  useEffect(() => {
    setMediaError(false);
  }, [slideIndex]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") setSlideIndex((index) => Math.min(slides.length - 1, index + 1));
      if (event.key === "ArrowLeft") setSlideIndex((index) => Math.max(0, index - 1));
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      if (event.key === "Escape" && !document.fullscreenElement) navigate("/internal/slide-archive");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, slides.length]);

  return (
    <main className="camera-deck free-training-deck" onClick={() => setSlideIndex((index) => Math.min(slides.length - 1, index + 1))}>
      <div className="camera-deck-chrome" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => navigate("/internal/slide-archive")} aria-label="Back to archive"><ArrowLeft size={18} /></button>
        <span>{String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Fullscreen presentation"><Expand size={18} /></button>
      </div>
      <section className={`camera-slide free-training-slide ${hasVisual ? "camera-slide-media" : ""}`}>
        <div className="camera-slide-copy">
          <p className="camera-slide-label">{slide.label}</p>
          <h1>{slide.title}</h1>
          <div className="camera-slide-rule" />
          <p className="camera-slide-primary">{slide.copy}</p>
          {slide.detail && <div className="camera-slide-detail"><span>Keep in mind</span><p>{slide.detail}</p></div>}
        </div>
        {hasVisual && <div className={`camera-slide-media-frame ${storyboard ? "camera-slide-storyboard-frame" : ""}`}>
          {mediaUrl && !mediaError
            ? slide.media
              ? <video key={mediaUrl} src={mediaUrl} autoPlay loop muted playsInline preload="auto" onError={() => setMediaError(true)} />
              : <img key={mediaUrl} src={mediaUrl} alt={storyboard?.alt ?? "Private storyboard reference"} onError={() => setMediaError(true)} />
            : <div className="camera-media-wait">{mediaError ? "Private media is not available." : "Loading secure visual…"}</div>}
        </div>}
      </section>
      <div className="camera-deck-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" disabled={slideIndex === 0} onClick={() => setSlideIndex((index) => Math.max(0, index - 1))}><ChevronLeft size={20} /> Previous</button>
        <div>{slides.map((_, index) => <button key={index} type="button" className={index === slideIndex ? "is-active" : ""} aria-label={`Go to slide ${index + 1}`} onClick={() => setSlideIndex(index)} />)}</div>
        <button type="button" disabled={slideIndex === slides.length - 1} onClick={() => setSlideIndex((index) => Math.min(slides.length - 1, index + 1))}>Next <ChevronRight size={20} /></button>
      </div>
    </main>
  );
}

function LegacyDeckViewer({ deck }: { deck: SlideDeckRecord }) {
  useEffect(() => { window.location.replace(deck.presentation_route); }, [deck.presentation_route]);
  return <ArchiveLoading />;
}

function ArchiveDeckRoute() {
  const [, params] = useRoute("/internal/slide-archive/:slug");
  const slug = params?.slug ?? window.location.pathname.split("/").filter(Boolean).at(-1);
  const deck = slug === "camera-motion" ? cameraMotionFallback : slug === "why-camera-motion-matters" ? whyCameraMotionFallback : slug === "why-camera-angles-matter" ? whyCameraAnglesFallback : slug === "better-youth-genjam" ? betterYouthFallback : null;
  if (!deck) return <main className="archive-shell archive-auth"><section className="archive-auth-panel"><h1>Deck not found.</h1><Link href="/internal/slide-archive" className="archive-button archive-button-secondary">Return to archive</Link></section></main>;
  if (deck.presentation_mode === "legacy") return <LegacyDeckViewer deck={deck} />;
  if (deck.slug === "why-camera-motion-matters") return <FreeTrainingViewer deck={deck} slides={whyCameraMotionSlides} />;
  if (deck.slug === "why-camera-angles-matter") return <FreeTrainingViewer deck={deck} slides={whyCameraAnglesSlides} />;
  return <CameraMotionViewer deck={deck} />;
}

export default function SlideArchive() {
  const { access, refresh } = useArchiveAccess();
  const [isDeckRoute] = useRoute("/internal/slide-archive/:slug");
  if (access === "loading") return <ArchiveLoading />;
  if (access === "locked") return <ArchiveSignIn onUnlocked={refresh} />;
  return isDeckRoute ? <ArchiveDeckRoute /> : <ArchiveIndex />;
}
