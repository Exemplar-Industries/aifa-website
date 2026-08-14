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
  summary: string;
  host: string;
  sourceUrl: string;
};

const EVENTS: EventRecord[] = [
  { id: "reply-ai-film-festival-2026", title: "Reply AI Film Festival", category: "Festival", region: "Europe", location: "Venice, Italy", startDate: "2026-09-02", endDate: "2026-09-08", summary: "A creative-AI film festival with finalist screenings and awards in Venice.", host: "Reply and Mastercard", sourceUrl: "https://filmfreeway.com/ReplyAIFilmFestival" },
  { id: "phoenix-rising-2026", title: "Phoenix Rising: AI Entertainment Con 2026", category: "Festival", region: "Americas", location: "Arizona, USA", startDate: "2026-09-17", endDate: "2026-09-19", summary: "A three-day AI entertainment gathering with screenings, workshops, panels, and creator networking.", host: "AI Film 3", sourceUrl: "https://aifilm3.com/events" },
  { id: "waiff-argentina-2026", title: "WAIFF Argentina", category: "Festival", region: "Americas", location: "Buenos Aires, Argentina", startDate: "2026-10-30", summary: "A World A.I. Film Festival Road to Cannes edition for AI-driven film and creative work.", host: "World A.I. Film Festival", sourceUrl: "https://worldaifilmfestival.com/" },
  { id: "waiff-turkey-2026", title: "WAIFF Turkey", category: "Festival", region: "Europe", location: "Turkey", startDate: "2026-11-04", summary: "An international creative-AI film event connected to the Road to Cannes program.", host: "World A.I. Film Festival", sourceUrl: "https://worldaifilmfestival.com/istanbul/" },
  { id: "ai-creative-summit-2026", title: "AI Creative Summit 2026", category: "Conference", region: "Europe", location: "BFI Southbank, London, UK", startDate: "2026-11-11", summary: "A media and entertainment summit on production workflows, storytelling, and practical creative-AI adoption.", host: "Broadcast, Broadcast Tech and Screen International", sourceUrl: "https://www.aicreativesummit.co.uk/" },
  { id: "waiff-uk-2026", title: "WAIFF UK", category: "Festival", region: "Europe", location: "United Kingdom", startDate: "2026-11-24", summary: "A United Kingdom stop in the World A.I. Film Festival’s international AI cinema program.", host: "World A.I. Film Festival", sourceUrl: "https://worldaifilmfestival.com/" },
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

  const eventStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": EVENTS.filter((event) => !isPast(event)).map((event) => ({
      "@type": "Event",
      name: event.title,
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "Place", name: event.location, address: event.location },
      organizer: { "@type": "Organization", name: event.host },
      description: event.summary,
      url: event.sourceUrl,
    })),
  }), []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return EVENTS.filter((event) => {
      const searchable = [event.title, event.location, event.host, event.summary, event.category].join(" ").toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery)) && (category === "All" || event.category === category) && (region === "All" || event.region === region) && !isPast(event);
    }).sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [category, query, region]);

  const fieldStyle: React.CSSProperties = {
    width: "100%", minHeight: "54px", boxSizing: "border-box", border: "1px solid rgba(255,255,255,.22)", borderRadius: "8px", background: "#141414", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", padding: "0 .95rem",
  };

  return (
    <main className="events-page" style={{ minHeight: "100vh", overflowX: "hidden", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta title="AI Film Events | Festivals, Conferences & Creative-AI Gatherings | AI Film Academy" description="Discover source-linked AI film festivals, media conferences, creative-AI gatherings, workshops, and filmmaker opportunities around the world." path="/events" structuredData={eventStructuredData} />
      <style>{`
        .events-page * { min-width: 0; }
        .events-title, .events-heading, .event-card h3 { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: .015em; line-height: .86; text-transform: uppercase; }
        .events-title { font-size: clamp(3.75rem, 8vw, 8.4rem); }
        .events-title span, .events-heading span { display: block; }
        .events-title span { white-space: nowrap; }
        .events-title span:last-child, .events-heading span { color: #ef4444; }
        .events-filter-grid { display: grid; grid-template-columns: 1.4fr .8fr .8fr; gap: .75rem; }
        .events-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: 1.25rem; }
        .event-card { display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.18); border-radius: 8px; background: #111; padding: 1.25rem; }
        .event-date { color: #ef4444; font-size: 1rem; font-weight: 800; line-height: 1.35; margin: 0 0 .8rem; }
        .event-card h3 { font-size: clamp(2rem, 3vw, 2.7rem); margin: 0 0 .75rem; }
        .event-location, .event-summary { color: rgba(255,255,255,.86); font-size: 1rem; line-height: 1.55; margin: 0; }
        .event-location { font-weight: 800; margin-bottom: .65rem; }
        .event-source { display: inline-block; color: #f87171; font-size: 1rem; font-weight: 800; margin-top: 1rem; text-decoration: none; }
        @media (max-width: 840px) { .events-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 760px) {
          .events-page section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .events-title { font-size: clamp(3rem, 11.5vw, 4.5rem); }
          .events-filter-grid, .events-grid { grid-template-columns: 1fr; }
          .event-card { padding: 1.15rem; }
        }
      `}</style>

      <section style={{ padding: "clamp(6.5rem, 12vw, 10rem) 1.5rem clamp(4rem, 8vw, 6.5rem)", background: "radial-gradient(ellipse at 88% 16%, rgba(190,24,24,.32), transparent 40%), #080808", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <a href="/" style={{ color: "#F5F5F0", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 className="events-title" style={{ margin: "2.4rem 0 1.45rem" }}><span>Find the next</span><span>room to grow.</span></h1>
          <p style={{ maxWidth: "720px", color: "rgba(255,255,255,.88)", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.65, margin: 0 }}>A curated, source-linked list of AI film festivals to enter, events to attend, and creators to meet.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <h2 className="events-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: "0 0 1.5rem" }}>Find your next <span>creative room.</span></h2>
        <div className="events-filter-grid">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events or cities" aria-label="Search events" style={fieldStyle} />
          <select value={category} onChange={(event) => setCategory(event.target.value as "All" | EventCategory)} aria-label="Filter by event type" style={fieldStyle}>{CATEGORY_OPTIONS.map((option) => <option key={option} value={option}>{option === "All" ? "All event types" : option}</option>)}</select>
          <select value={region} onChange={(event) => setRegion(event.target.value as "All" | EventRegion)} aria-label="Filter by region" style={fieldStyle}>{REGION_OPTIONS.map((option) => <option key={option} value={option}>{option === "All" ? "All regions" : option}</option>)}</select>
        </div>
        {filtered.length ? <div className="events-grid">{filtered.map((event) => <article key={event.id} className="event-card"><p className="event-date">{formatEventDate(event)}</p><h3>{event.title}</h3><p className="event-location">{event.location}</p><p className="event-summary">{event.summary}</p><a className="event-source" href={event.sourceUrl} target="_blank" rel="noopener noreferrer">Official event page →</a></article>)}</div> : <div style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: "8px", background: "#111", padding: "2rem", marginTop: "1.25rem" }}><h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", fontWeight: 400, letterSpacing: ".015em", lineHeight: ".9", margin: "0 0 .75rem" }}>Try another search.</h3><button type="button" onClick={() => { setQuery(""); setCategory("All"); setRegion("All"); }} style={{ border: 0, background: "transparent", color: "#f87171", fontSize: "1rem", fontWeight: 800, padding: 0, textDecoration: "underline" }}>Reset filters</button></div>}
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", background: "linear-gradient(145deg, rgba(119,17,17,.25), #0b0b0b 65%)", padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="events-heading" style={{ fontSize: "clamp(3rem, 6vw, 5.8rem)", margin: 0 }}>Know a room we <span>should add?</span></h2>
          <p style={{ maxWidth: "650px", color: "rgba(255,255,255,.88)", fontSize: "1.05rem", lineHeight: 1.65, margin: "1.25rem 0 1.5rem" }}>Send the official event page, date, and location. We review every listing before it appears in the directory.</p>
          <a href="mailto:hello@aifilmacademy.com?subject=AI%20Film%20Event%20Submission" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "56px", padding: "0 1.35rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none" }}>Submit an event →</a>
        </div>
      </section>
    </main>
  );
}
