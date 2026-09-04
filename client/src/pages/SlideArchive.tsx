import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, Film, FolderArchive, Loader2, LockKeyhole, LogOut, Plus, Send, Upload, UserPlus, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  archiveCategories,
  archiveCategoryClass,
  claimArchiveAccess,
  createSignedArchiveUrls,
  getArchiveDeck,
  getArchiveDecks,
  getArchiveInvites,
  getArchiveMembership,
  inviteArchiveUser,
  type ArchiveCategory,
  type ArchiveInvite,
  type ArchiveMembership,
  type SlideDeckRecord,
} from "@/lib/slideArchive";
import "../slide-archive.css";

type AccessState = "loading" | "anonymous" | "denied" | "granted" | "setup";

const OWNER_ARCHIVE_EMAIL = "llcexemplar@gmail.com";

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
  const [membership, setMembership] = useState<ArchiveMembership | null>(null);

  useEffect(() => {
    let active = true;

    async function resolveAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      if (!session?.user) {
        setMembership(null);
        setAccess("anonymous");
        return;
      }
      if (session.user.email?.trim().toLowerCase() === OWNER_ARCHIVE_EMAIL) {
        setMembership({ user_id: session.user.id, role: "admin", status: "active" });
        setAccess("granted");
        return;
      }
      try {
        await claimArchiveAccess();
        const record = await getArchiveMembership(session.user.id);
        if (!active) return;
        setMembership(record);
        setAccess(record?.status === "active" ? "granted" : "denied");
      } catch {
        if (active) setAccess("setup");
      }
    }

    resolveAccess();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => resolveAccess());
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return { access, membership };
}

function ArchiveLoading() {
  return <main className="archive-shell archive-loading"><Loader2 aria-label="Loading archive" className="archive-spinner" /></main>;
}

function ArchiveSignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/internal/slide-archive` },
    });
    setBusy(false);
    if (signInError) {
      setError("The secure sign-in link could not be sent. Please try again or confirm your internal email is approved.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <main className="archive-shell archive-auth">
      <section className="archive-auth-panel">
        <div className="archive-mark"><Film size={18} aria-hidden="true" /> AI Film Academy</div>
        <p className="archive-kicker">Private system</p>
        <h1>Slide archive</h1>
        <p className="archive-lede">A secure internal library for interactive course lessons, presentations, and reusable visual systems.</p>
        {submitted ? (
          <div className="archive-notice"><Send size={19} aria-hidden="true" /><span>Secure sign-in link sent. Open it in this browser to enter the archive.</span></div>
        ) : (
          <form onSubmit={handleSubmit} className="archive-signin-form">
            <label htmlFor="archive-email">Approved internal email</label>
            <input id="archive-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" />
            {error && <p className="archive-error" role="alert">{error}</p>}
            <button className="archive-button archive-button-primary" disabled={busy} type="submit">{busy ? "Sending secure link…" : "Email secure sign-in link"}<ArrowRight size={17} /></button>
          </form>
        )}
        <p className="archive-footnote"><LockKeyhole size={14} /> Deck records and media are available only to approved archive users.</p>
      </section>
    </main>
  );
}

function ArchiveDenied() {
  return (
    <main className="archive-shell archive-auth">
      <section className="archive-auth-panel">
        <div className="archive-mark"><Film size={18} aria-hidden="true" /> AI Film Academy</div>
        <p className="archive-kicker">Access restricted</p>
        <h1>This archive is private.</h1>
        <p className="archive-lede">Your account is signed in but has not been approved for the internal slide archive.</p>
        <button className="archive-button archive-button-secondary" type="button" onClick={() => supabase.auth.signOut()}><LogOut size={17} /> Sign out</button>
      </section>
    </main>
  );
}

function ArchiveSetupNotice() {
  return (
    <main className="archive-shell archive-auth">
      <section className="archive-auth-panel">
        <div className="archive-mark"><Film size={18} aria-hidden="true" /> AI Film Academy</div>
        <p className="archive-kicker">Secure setup in progress</p>
        <h1>Archive is not provisioned yet.</h1>
        <p className="archive-lede">The app shell is ready, but its database table and private storage policies still need the included Supabase migration applied before any deck information can be loaded.</p>
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

function ImportPanel({ onImported }: { onImported: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArchiveCategory>("Course Lessons");
  const [description, setDescription] = useState("");
  const [route, setRoute] = useState("");
  const [bundle, setBundle] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const slug = useMemo(() => title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), [title]);

  async function uploadFile(file: File, key: string) {
    const { error } = await supabase.storage.from("aifa-slide-archive").upload(key, file, { upsert: false, contentType: file.type || undefined });
    if (error) throw error;
    return key;
  }

  async function handleImport(event: React.FormEvent) {
    event.preventDefault();
    if (!slug || !route) return;
    setBusy(true);
    setStatus("");
    try {
      const mediaManifest: Record<string, string> = {};
      for (const file of media) {
        const key = `decks/${slug}/media/${file.name}`;
        mediaManifest[file.name] = await uploadFile(file, key);
      }
      const thumbnailPath = thumbnail ? await uploadFile(thumbnail, `decks/${slug}/thumbnail/${thumbnail.name}`) : null;
      const bundlePath = bundle ? await uploadFile(bundle, `decks/${slug}/source/${bundle.name}`) : null;
      const { error } = await supabase.from("slide_decks").insert({
        slug,
        title,
        category,
        description,
        thumbnail_path: thumbnailPath,
        source_bundle_path: bundlePath,
        presentation_route: route,
        presentation_mode: "native",
        media_manifest: mediaManifest,
        tags: [],
        status: "draft",
      });
      if (error) throw error;
      setStatus("Deck draft stored privately. Build its presentation route, then mark it ready in Supabase.");
      setTitle(""); setDescription(""); setRoute(""); setBundle(null); setThumbnail(null); setMedia([]);
      onImported();
    } catch {
      setStatus("Import could not complete. Confirm that the Supabase archive migration and private storage policies are applied for your admin account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="archive-import">
      <button type="button" className="archive-import-trigger" onClick={() => setIsOpen((value) => !value)}><Plus size={18} /> Import future deck</button>
      {isOpen && <form className="archive-import-form" onSubmit={handleImport}>
        <div className="archive-import-heading"><div><p>Admin import</p><h2>Register a private deck</h2></div><FolderArchive size={24} /></div>
        <div className="archive-import-grid">
          <label>Deck title<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Creative strategy sprint" /></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value as ArchiveCategory)}>{archiveCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="archive-import-full">Description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What the deck is for and who should use it." /></label>
          <label className="archive-import-full">Presentation route<input required value={route} onChange={(event) => setRoute(event.target.value)} placeholder="/internal/slide-archive/your-deck" /></label>
          <label>Source bundle (.zip)<input type="file" accept=".zip,application/zip" onChange={(event) => setBundle(event.target.files?.[0] ?? null)} /></label>
          <label>Thumbnail<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)} /></label>
          <label className="archive-import-full">Media assets<input type="file" multiple accept="video/mp4,image/png,image/jpeg,image/webp" onChange={(event) => setMedia(Array.from(event.target.files ?? []))} /></label>
        </div>
        {status && <p className="archive-import-status">{status}</p>}
        <button className="archive-button archive-button-primary" type="submit" disabled={busy}>{busy ? "Importing…" : "Store private deck draft"}<Upload size={17} /></button>
      </form>}
    </section>
  );
}

function AccessPanel() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "viewer">("viewer");
  const [invites, setInvites] = useState<ArchiveInvite[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadInvites() {
    try { setInvites(await getArchiveInvites()); } catch { setStatus("The access list will appear once the private archive migration is active."); }
  }

  useEffect(() => { if (open) loadInvites(); }, [open]);

  async function handleInvite(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await inviteArchiveUser(email, role);
      setEmail("");
      setStatus("Internal user approved. They can sign in with this email to claim access.");
      await loadInvites();
    } catch {
      setStatus("Approval could not be saved. Confirm the private archive migration is active for this AIFA account.");
    } finally { setBusy(false); }
  }

  return (
    <section className="archive-import archive-access-panel">
      <button type="button" className="archive-import-trigger" onClick={() => setOpen((value) => !value)}><Users size={18} /> Manage internal access</button>
      {open && <div className="archive-import-form">
        <div className="archive-import-heading"><div><p>Admin access</p><h2>Approve an internal user</h2></div><UserPlus size={24} /></div>
        <form onSubmit={handleInvite} className="archive-access-form">
          <label>Internal email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="team@aifilmacademy.com" /></label>
          <label>Permission<select value={role} onChange={(event) => setRole(event.target.value as "admin" | "viewer")}><option value="viewer">Viewer</option><option value="admin">Admin</option></select></label>
          <button className="archive-button archive-button-primary" type="submit" disabled={busy}>{busy ? "Approving…" : "Approve access"}<UserPlus size={17} /></button>
        </form>
        {status && <p className="archive-import-status">{status}</p>}
        {invites.length > 0 && <div className="archive-invite-list">{invites.map((invite) => <div key={invite.email}><span>{invite.email}</span><em>{invite.role}</em><small>{invite.status}</small></div>)}</div>}
      </div>}
    </section>
  );
}

function ArchiveIndex({ membership }: { membership: ArchiveMembership | null }) {
  const [, navigate] = useLocation();
  const [decks, setDecks] = useState<SlideDeckRecord[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory | "All">("All");
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  async function loadDecks() {
    setLoading(true);
    try {
      const records = await getArchiveDecks();
      setDecks(records);
      setDataError(false);
    } catch {
      setDecks([cameraMotionFallback, betterYouthFallback]);
      setDataError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadDecks(); }, []);
  const visibleDecks = decks.filter((deck) => selectedCategory === "All" || deck.category === selectedCategory);

  return (
    <main className="archive-shell archive-index">
      <header className="archive-topbar">
        <Link href="/" className="archive-wordmark"><Film size={17} /> AIFA <span>Internal</span></Link>
        <div className="archive-topbar-actions"><span className="archive-user-state"><LockKeyhole size={15} /> {membership?.role === "admin" ? "Admin" : "Internal access"}</span><button type="button" onClick={() => supabase.auth.signOut()}><LogOut size={16} /> Sign out</button></div>
      </header>
      <section className="archive-library" aria-label="Slide deck archive">
        <div className="archive-library-head"><div><p>Library</p><h2>Deck archive</h2></div><span>{visibleDecks.length} {visibleDecks.length === 1 ? "deck" : "decks"}</span></div>
        <div className="archive-filters" role="tablist" aria-label="Deck categories">
          <button role="tab" aria-selected={selectedCategory === "All"} className={selectedCategory === "All" ? "is-active" : ""} onClick={() => setSelectedCategory("All")}>All decks</button>
          {archiveCategories.map((category) => <button key={category} role="tab" aria-selected={selectedCategory === category} className={selectedCategory === category ? "is-active" : ""} onClick={() => setSelectedCategory(category)}>{category}</button>)}
        </div>
        {dataError && <div className="archive-provisioning-note">Archive records are using the locked local registry until the included Supabase migration is applied. No private media is being served until that secure backend is active.</div>}
        {loading ? <div className="archive-card-skeletons"><div /><div /></div> : <div className="archive-grid">{visibleDecks.map((deck) => <DeckCard key={deck.slug} deck={deck} onOpen={() => navigate(deck.presentation_route)} />)}</div>}
      </section>
      {membership?.role === "admin" && <><AccessPanel /><ImportPanel onImported={loadDecks} /></>}
    </main>
  );
}

type CameraSlide = { label: string; title: string; copy: string; detail?: string; prompt?: string; media?: keyof typeof cameraMotionFallback.media_manifest };

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

function CameraMotionViewer({ deck }: { deck: SlideDeckRecord }) {
  const [, navigate] = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    let active = true;
    createSignedArchiveUrls(deck.media_manifest).then((urls) => { if (active) setVideoUrls(urls); }).catch(() => { if (active) setMediaError(true); });
    return () => { active = false; };
  }, [deck.media_manifest]);

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
  const mediaUrl = slide.media ? videoUrls[slide.media] : undefined;
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
          {mediaUrl ? <video key={mediaUrl} src={mediaUrl} autoPlay loop muted playsInline preload="auto" /> : <div className="camera-media-wait">{mediaError ? "Private media is not provisioned yet." : "Loading secure motion clip…"}</div>}
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

function LegacyDeckViewer({ deck }: { deck: SlideDeckRecord }) {
  useEffect(() => { window.location.replace(deck.presentation_route); }, [deck.presentation_route]);
  return <ArchiveLoading />;
}

function ArchiveDeckRoute({ membership }: { membership: ArchiveMembership | null }) {
  const [, params] = useRoute("/internal/slide-archive/:slug");
  const [deck, setDeck] = useState<SlideDeckRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = params?.slug;

  useEffect(() => {
    let active = true;
    if (!slug) return;
    getArchiveDeck(slug).then((record) => {
      if (active) setDeck(record ?? (slug === "camera-motion" ? cameraMotionFallback : slug === "better-youth-genjam" ? betterYouthFallback : null));
    }).catch(() => {
      if (active) setDeck(slug === "camera-motion" ? cameraMotionFallback : slug === "better-youth-genjam" ? betterYouthFallback : null);
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <ArchiveLoading />;
  if (!deck) return <main className="archive-shell archive-auth"><section className="archive-auth-panel"><h1>Deck not found.</h1><Link href="/internal/slide-archive" className="archive-button archive-button-secondary">Return to archive</Link></section></main>;
  if (deck.presentation_mode === "legacy") return <LegacyDeckViewer deck={deck} />;
  return <CameraMotionViewer deck={deck} />;
}

export default function SlideArchive() {
  const { access, membership } = useArchiveAccess();
  const [isDeckRoute] = useRoute("/internal/slide-archive/:slug");
  if (access === "loading") return <ArchiveLoading />;
  if (access === "anonymous") return <ArchiveSignIn />;
  if (access === "denied") return <ArchiveDenied />;
  if (access === "setup") return <ArchiveSetupNotice />;
  return isDeckRoute ? <ArchiveDeckRoute membership={membership} /> : <ArchiveIndex membership={membership} />;
}
