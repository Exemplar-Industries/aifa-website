import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";

const DECK_DATA: Record<string, { title: string; slides: string[]; folder: string; editBase: string }> = {
  "week-1": {
    title: "Week 1: The State of AI Media",
    folder: "week1",
    editBase: "https://manus.im/app",
    slides: [
      "slide_1","slide_2","slide_4","slide_timeline_1","slide_timeline_2",
      "slide_6","slide_5","slide_7","slide_8","slide_workflow_bridge",
      "slide_9","slide_10","slide_11","slide_12","slide_13","slide_14",
      "slide_15","slide_16","slide_17","slide_18","slide_19","slide_20",
      "slide_21","slide_22","slide_23","slide_25","slide_24","slide_26",
      "slide_27","slide_28","slide_29","slide_31","slide_30","slide_32",
      "slide_33","slide_34","slide_35","slide_41","slide_42"
    ],
  },
  "week-4": {
    title: "Week 4: Cinematic Editing",
    folder: "week4",
    editBase: "https://manus.im/app",
    slides: [
      "slide_1","slide_2","slide_3","slide_4","slide_5",
      "slide_6","slide_7","slide_8","slide_9"
    ],
  },
};

export default function SlideViewer() {
  const [, params] = useRoute("/lessons/:week");
  const week = params?.week ?? "";
  const deck = DECK_DATA[week];
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setCurrent(0); }, [week]);

  // Keyboard navigation — attached to window so it always fires
  useEffect(() => {
    if (!deck) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setCurrent((c) => Math.min(c + 1, deck.slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setCurrent((c) => Math.max(c - 1, 0));
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deck]);

  // Scroll the thumbnail panel to keep current slide visible
  useEffect(() => {
    if (!panelRef.current) return;
    const thumb = panelRef.current.querySelector(`[data-index="${current}"]`) as HTMLElement;
    if (thumb) thumb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [current]);

  if (!deck) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#E31E24", fontSize: 14, letterSpacing: 4, marginBottom: 12 }}>404</div>
          <div style={{ color: "#fff", fontSize: 32, fontWeight: 900 }}>DECK NOT FOUND</div>
          <a href="/internal/lessons" style={{ color: "#E31E24", marginTop: 24, display: "block", fontSize: 12, letterSpacing: 3 }}>← BACK TO LIBRARY</a>
        </div>
      </div>
    );
  }

  const slideUrl = `/slides/${deck.folder}/${deck.slides[current]}.html`;
  const total = deck.slides.length;

  // Fullscreen present mode
  if (isFullscreen) {
    return (
      <div
        ref={containerRef}
        tabIndex={0}
        style={{ background: "#000", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", outline: "none" }}
        onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
      >
        <iframe
          key={slideUrl}
          src={slideUrl}
          style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
          title={`Slide ${current + 1}`}
        />
        <div style={{ position: "fixed", top: 16, right: 16, display: "flex", gap: 8, zIndex: 100 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Montserrat, sans-serif", letterSpacing: 2, padding: "6px 12px" }}>
            {current + 1} / {total}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid #333", padding: "6px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}
          >
            EXIT
          </button>
        </div>
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "Montserrat, sans-serif", letterSpacing: 2 }}>
          CLICK OR ← → TO NAVIGATE · ESC TO EXIT
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Montserrat, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <a href="/internal/lessons" style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 3, textDecoration: "none" }}>← LIBRARY</a>
        <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{deck.title}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#555", fontSize: 11, letterSpacing: 2, marginRight: 8 }}>{current + 1} / {total}</span>
          <a
            href={`https://manus.im/app`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#1a1a1a", color: "#fff", border: "1px solid #333", padding: "8px 20px", fontSize: 11, fontWeight: 700, letterSpacing: 3, textDecoration: "none", display: "inline-block" }}
          >
            EDIT
          </a>
          <button
            onClick={() => setIsFullscreen(true)}
            style={{ background: "#E31E24", color: "#fff", border: "none", padding: "8px 20px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}
          >
            PRESENT
          </button>
        </div>
      </div>

      {/* Main layout: left panel + slide area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left thumbnail panel */}
        <div
          ref={panelRef}
          style={{ width: 200, background: "#0d0d0d", borderRight: "1px solid #1a1a1a", overflowY: "auto", flexShrink: 0, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 8 }}
        >
          {deck.slides.map((slideId, i) => (
            <button
              key={slideId}
              data-index={i}
              onClick={() => setCurrent(i)}
              style={{
                background: "none",
                border: i === current ? "2px solid #E31E24" : "2px solid transparent",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Thumbnail via iframe scaled down */}
              <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", overflow: "hidden", background: "#111" }}>
                <iframe
                  src={`/slides/${deck.folder}/${slideId}.html`}
                  style={{ position: "absolute", top: 0, left: 0, width: 1280, height: 720, transform: "scale(0.142)", transformOrigin: "top left", pointerEvents: "none", border: "none" }}
                  title={`Slide ${i + 1}`}
                  loading="lazy"
                />
              </div>
              {/* Slide number */}
              <div style={{ background: i === current ? "#E31E24" : "#1a1a1a", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 6px", textAlign: "center" }}>
                {i + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Slide viewer */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Slide iframe */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#111" }}>
            <div style={{ width: "100%", maxWidth: 1100, aspectRatio: "16/9", position: "relative" }}>
              <iframe
                key={slideUrl}
                src={slideUrl}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                title={`Slide ${current + 1}`}
              />
            </div>
          </div>

          {/* Bottom navigation */}
          <div style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexShrink: 0 }}>
            <button
              onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
              disabled={current === 0}
              style={{ background: current === 0 ? "#1a1a1a" : "#E31E24", color: current === 0 ? "#444" : "#fff", border: "none", padding: "10px 28px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: current === 0 ? "not-allowed" : "pointer", fontFamily: "Montserrat, sans-serif" }}
            >
              ← PREV
            </button>
            <span style={{ color: "#444", fontSize: 11, letterSpacing: 2, minWidth: 80, textAlign: "center" }}>{current + 1} of {total}</span>
            <button
              onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
              disabled={current === total - 1}
              style={{ background: current === total - 1 ? "#1a1a1a" : "#E31E24", color: current === total - 1 ? "#444" : "#fff", border: "none", padding: "10px 28px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: current === total - 1 ? "not-allowed" : "pointer", fontFamily: "Montserrat, sans-serif" }}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
