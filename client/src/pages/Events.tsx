import { useMemo, useState } from "react";
import PageMeta from "@/components/PageMeta";

type EventCategory = "Festival" | "Conference" | "Workshop & Meetup";
type EventRegion = "Americas" | "Europe" | "Global";

type EventRecord = {
  id: string;
  title: string;
  category: EventCategory;
  region: EventRegion;
  location: string;
  startDate: string;
  endDate?: string;
  dateLabel?: string;
  summary: string;
  host: string;
  sourceUrl: string;
  note?: string;
};

const EVENTS: EventRecord[] = [
  {
    id: "reply-ai-film-festival-2026",
    title: "Reply AI Film Festival",
    category: "Festival",
    region: "Europe",
    location: "Venice, Italy",
    startDate: "2026-09-02",
    endDate: "2026-09-08",
    summary: "A creative-AI film-festival premiere in Venice celebrating the intersection of AI and video production, with finalist screenings and awards.",
    host: "Reply and Mastercard",
    sourceUrl: "https://filmfreeway.com/ReplyAIFilmFestival",
    note: "Entries are closed for 2026; the event dates remain listed on the official festival profile.",
  },
  {
    id: "phoenix-rising-2026",
    title: "Phoenix Rising: AI Entertainment Con 2026",
    category: "Festival",
    region: "Americas",
    location: "Arizona, USA",
    startDate: "2026-09-17",
    endDate: "2026-09-19",
    summary: "A three-day AI entertainment convention with screenings, art and fashion, workshops, masterclasses, panels, and creator networking.",
    host: "AI Film 3",
    sourceUrl: "https://aifilm3.com/events",
  },
  {
    id: "waiff-argentina-2026",
    title: "WAIFF Argentina",
    category: "Festival",
    region: "Americas",
    location: "Buenos Aires, Argentina",
    startDate: "2026-10-30",
    summary: "An international edition of the World A.I. Film Festival’s Road to Cannes program for AI-driven film and creative work.",
    host: "World A.I. Film Festival",
    sourceUrl: "https://worldaifilmfestival.com/",
  },
  {
    id: "waiff-turkey-2026",
    title: "WAIFF Turkey",
    category: "Festival",
    region: "Europe",
    location: "Turkey",
    startDate: "2026-11-04",
    summary: "A World A.I. Film Festival international edition connecting local creative-AI work to the global Road to Cannes program.",
    host: "World A.I. Film Festival",
    sourceUrl: "https://worldaifilmfestival.com/istanbul/",
  },
  {
    id: "ai-creative-summit-2026",
    title: "AI Creative Summit 2026",
    category: "Conference",
    region: "Europe",
    location: "BFI Southbank, London, UK",
    startDate: "2026-11-11",
    summary: "A media and entertainment summit focused on production workflows, storytelling, workforce skills, rights, ethics, and practical creative-AI adoption.",
    host: "Broadcast, Broadcast Tech and Screen International",
    sourceUrl: "https://www.aicreativesummit.co.uk/",
  },
  {
    id: "waiff-uk-2026",
    title: "WAIFF UK",
    category: "Festival",
    region: "Europe",
    location: "United Kingdom",
    startDate: "2026-11-24",
    summary: "A United Kingdom stop in the World A.I. Film Festival’s international Road to Cannes program for AI cinema and creative technology.",
    host: "World A.I. Film Festival",
    sourceUrl: "https://worldaifilmfestival.com/",
  },
];

const CATEGORY_OPTIONS: Array<"All" | EventCategory> = ["All", "Festival", "Conference", "Workshop & Meetup"];
const REGION_OPTIONS: Array<"All" | EventRegion> = ["All", "Americas", "Europe", "Global"];

function formatEventDate(event: EventRecord) {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(`${event.startDate}T12:00:00`);
  if (!event.endDate) return start.toLocaleDateString("en-US", options);
  const end = new Date(`${event.endDate}T12:00:00`);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const sameYear = start.getFullYear() === end.getFullYear();
  if (sameMonth) return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–${end.getDate()}, ${start.getFullYear()}`;
  if (sameYear) return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  return `${start.toLocaleDateString("en-US", options)}–${end.toLocaleDateString("en-US", options)}`;
}

function isPast(event: EventRecord) {
  const end = new Date(`${event.endDate ?? event.startDate}T23:59:59`);
  return end.getTime() < Date.now();
}

export default function Events() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | EventCategory>("All");
  const [region, setRegion] = useState<"All" | EventRegion>("All");
  const [showArchive, setShowArchive] = useState(false);

  const eventStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": EVENTS.filter((event) => !isPast(event)).map((event) => ({
      "@type": "Event",
      name: event.title,
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: event.location,
        address: event.location,
      },
      organizer: { "@type": "Organization", name: event.host },
      description: event.summary,
      url: event.sourceUrl,
    })),
  }), []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return EVENTS.filter((event) => {
      const matchesSearch = !normalizedQuery || [event.title, event.location, event.host, event.summary, event.category].join(" ").toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "All" || event.category === category;
      const matchesRegion = region === "All" || event.region === region;
      const matchesDate = showArchive || !isPast(event);
      return matchesSearch && matchesCategory && matchesRegion && matchesDate;
    }).sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [category, query, region, showArchive]);

  return (
    <main style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="AI Film Events | Festivals, Conferences & Creative-AI Gatherings | AI Film Academy"
        description="Discover source-linked AI film festivals, media conferences, creative-AI gatherings, workshops, and filmmaker opportunities around the world."
        path="/events"
        structuredData={eventStructuredData}
      />
      <style>{`
        .events-filter-grid { display: grid; grid-template-columns: 1.45fr .78fr .78fr; gap: .75rem; }
        .events-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: rgba(255,255,255,.1); }
        .events-card { position: relative; display: flex; min-height: 328px; flex-direction: column; background: #101010; padding: 1.7rem; transition: background 180ms ease, transform 180ms ease; }
        .events-card:hover { background: #161616; transform: translateY(-3px); }
        .events-chip { border: 1px solid rgba(255,255,255,.15); border-radius: 999px; background: transparent; color: rgba(255,255,255,.56); font-family: 'DM Sans', sans-serif; font-size: .76rem; font-weight: 700; padding: .55rem .82rem; transition: background 150ms ease, color 150ms ease, border-color 150ms ease; }
        .events-chip[data-active='true'] { border-color: #ef4444; background: rgba(239,68,68,.13); color: #fff; }
        @media (max-width: 840px) { .events-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .events-filter-grid, .events-grid { grid-template-columns: 1fr; } .events-card { min-height: 280px; } }
        @media (prefers-reduced-motion: reduce) { .events-card, .events-chip { transition: none; } }
      `}</style>

      <section style={{ position: "relative", padding: "clamp(6.5rem, 13vw, 10rem) 1.5rem 4.6rem", borderBottom: "1px solid rgba(255,255,255,.08)", background: "radial-gradient(ellipse at 88% 16%, rgba(190,24,24,.30), transparent 40%), radial-gradient(ellipse at 10% 78%, rgba(100,15,15,.18), transparent 36%), #080808" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,.46)", fontSize: ".82rem", textDecoration: "none" }}>← AI Film Academy</a>
          <p style={{ color: "#ef4444", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".17em", textTransform: "uppercase", margin: "3rem 0 1.1rem" }}>AI Film Events</p>
          <h1 style={{ maxWidth: "1040px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.3rem, 11vw, 10rem)", fontWeight: 400, letterSpacing: ".015em", lineHeight: ".80", margin: 0 }}>Find the rooms where the future of film is <span style={{ color: "#ef4444" }}>being made.</span></h1>
          <p style={{ maxWidth: "680px", marginTop: "1.8rem", color: "rgba(255,255,255,.63)", fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.72 }}>A source-linked directory of AI film festivals, media conferences, workshops, and gatherings worth knowing about. We prioritize verified public listings, not hype.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "3.2rem 1.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".65rem" }}>Explore the directory</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.35rem, 4vw, 3.9rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".9", margin: 0 }}>Filter for the <span style={{ color: "#ef4444" }}>right next move.</span></h2>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: ".6rem", color: "rgba(255,255,255,.54)", fontSize: ".8rem", cursor: "pointer" }}>
            <input type="checkbox" checked={showArchive} onChange={(event) => setShowArchive(event.target.checked)} style={{ accentColor: "#ef4444" }} />
            Include past / archived events
          </label>
        </div>
        <div className="events-filter-grid">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search event, city, organization, or format" aria-label="Search events" style={{ width: "100%", minHeight: "50px", boxSizing: "border-box", border: "1px solid rgba(255,255,255,.14)", borderRadius: "9px", background: "rgba(255,255,255,.045)", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", fontSize: ".92rem", padding: "0 .95rem", outline: "none" }} />
          <select value={category} onChange={(event) => setCategory(event.target.value as "All" | EventCategory)} aria-label="Filter by event type" style={{ minHeight: "50px", border: "1px solid rgba(255,255,255,.14)", borderRadius: "9px", background: "#151515", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", fontSize: ".88rem", padding: "0 .75rem", outline: "none" }}>
            {CATEGORY_OPTIONS.map((option) => <option key={option} value={option}>{option === "All" ? "All event types" : option}</option>)}
          </select>
          <select value={region} onChange={(event) => setRegion(event.target.value as "All" | EventRegion)} aria-label="Filter by region" style={{ minHeight: "50px", border: "1px solid rgba(255,255,255,.14)", borderRadius: "9px", background: "#151515", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", fontSize: ".88rem", padding: "0 .75rem", outline: "none" }}>
            {REGION_OPTIONS.map((option) => <option key={option} value={option}>{option === "All" ? "All regions" : option}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: ".55rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {CATEGORY_OPTIONS.map((option) => <button key={option} type="button" className="events-chip" data-active={category === option} onClick={() => setCategory(option)}>{option === "All" ? "All events" : option}</button>)}
        </div>
      </section>

      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "1.5rem 1.5rem 4.7rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
          <p style={{ color: "rgba(255,255,255,.42)", fontSize: ".82rem", margin: 0 }}>{filtered.length} verified {filtered.length === 1 ? "listing" : "listings"} shown</p>
          <p style={{ color: "rgba(255,255,255,.27)", fontSize: ".73rem", margin: 0 }}>Always confirm the latest details with the organizer.</p>
        </div>
        {filtered.length ? (
          <div className="events-grid">
            {filtered.map((event) => {
              const past = isPast(event);
              return (
                <article key={event.id} className="events-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: ".7rem", marginBottom: "2.65rem" }}>
                    <span style={{ color: "#f87171", fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>{event.category}</span>
                    <span style={{ border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, color: past ? "rgba(255,255,255,.36)" : "rgba(255,255,255,.65)", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".08em", padding: ".35rem .5rem", textTransform: "uppercase" }}>{past ? "Archived" : "Upcoming"}</span>
                  </div>
                  <p style={{ color: "#F5F5F0", fontSize: ".9rem", fontWeight: 800, lineHeight: 1.3, marginBottom: ".65rem" }}>{formatEventDate(event)}</p>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 3.2vw, 2.75rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".9", marginBottom: ".8rem" }}>{event.title}</h3>
                  <p style={{ color: "rgba(255,255,255,.43)", fontSize: ".76rem", fontWeight: 700, letterSpacing: ".04em", marginBottom: ".85rem" }}>{event.location}</p>
                  <p style={{ color: "rgba(255,255,255,.54)", fontSize: ".88rem", lineHeight: 1.6, margin: 0 }}>{event.summary}</p>
                  {event.note && <p style={{ color: "rgba(255,255,255,.35)", fontSize: ".74rem", fontStyle: "italic", lineHeight: 1.5, marginTop: ".8rem" }}>{event.note}</p>}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".8rem", marginTop: "auto", paddingTop: "1.3rem" }}>
                    <span style={{ color: "rgba(255,255,255,.3)", fontSize: ".71rem" }}>{event.host}</span>
                    <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#f87171", fontSize: ".78rem", fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>Official source ↗</a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{ border: "1px solid rgba(255,255,255,.12)", background: "#101010", padding: "3.5rem 1.5rem", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: ".85rem" }}>No exact match yet</p>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.55rem", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".9", marginBottom: ".85rem" }}>Try another location, category, or search term.</h3>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); setRegion("All"); }} style={{ border: 0, background: "transparent", color: "#f87171", fontSize: ".85rem", fontWeight: 800, textDecoration: "underline" }}>Reset filters</button>
          </div>
        )}
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", background: "#0d0d0d", padding: "4.4rem 1.5rem" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "1px", background: "rgba(255,255,255,.1)" }}>
          <div style={{ padding: "clamp(1.8rem, 4vw, 3.1rem)", background: "#111" }}>
            <p style={{ color: "#f87171", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".85rem" }}>Know an event?</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".9", marginBottom: ".9rem" }}>Help creators find the next <span style={{ color: "#ef4444" }}>good room.</span></h2>
            <p style={{ color: "rgba(255,255,255,.53)", fontSize: ".9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>Send an official listing, date, location, and link. We will review source details before adding an event to the directory.</p>
            <a href="mailto:hello@aifilmacademy.com?subject=AI%20Film%20Event%20Submission" style={{ color: "#f87171", fontSize: ".84rem", fontWeight: 800, textDecoration: "none" }}>Submit an event for review →</a>
          </div>
          <div style={{ padding: "clamp(1.8rem, 4vw, 3.1rem)", background: "linear-gradient(145deg, rgba(132,19,19,.30), #101010 65%)" }}>
            <p style={{ color: "rgba(255,255,255,.42)", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".85rem" }}>Make your own work</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 400, letterSpacing: ".02em", lineHeight: ".9", marginBottom: ".9rem" }}>The best networking starts with <span style={{ color: "#ef4444" }}>work to show.</span></h2>
            <p style={{ color: "rgba(255,255,255,.53)", fontSize: ".9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>Build the filmmaking workflow, practice, feedback, and portfolio momentum that make the right rooms more valuable.</p>
            <a href="/membership" style={{ color: "#f87171", fontSize: ".84rem", fontWeight: 800, textDecoration: "none" }}>Explore AIFA membership →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
