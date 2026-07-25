import { useState, useEffect } from "react";
import { useRoute } from "wouter";

const DECKS: Record<string, { title: string; subtitle: string; slides: string[] }> = {
  "week-1": {
    title: "Week 1: The State of AI Media",
    subtitle: "39 Slides",
    slides: [
      "slide_1","slide_2","slide_4","slide_timeline_1","slide_timeline_2",
      "slide_6","slide_5","slide_7","slide_8","slide_workflow_bridge",
      "slide_9","slide_10","slide_11","slide_12","slide_13","slide_14",
      "slide_15","slide_16","slide_17","slide_18","slide_19","slide_20",
      "slide_21","slide_22","slide_23","slide_25","slide_24","slide_26",
      "slide_27","slide_28","slide_29","slide_31","slide_30","slide_32",
      "slide_33","slide_34","slide_35","slide_41","slide_42"
    ],
    folder: "week1",
  },
  "week-4": {
    title: "Week 4: Cinematic Editing",
    subtitle: "Pacing & Pattern Interrupts · 9 Slides",
    slides: [
      "slide_1","slide_2","slide_3","slide_4","slide_5",
      "slide_6","slide_7","slide_8","slide_9"
    ],
    folder: "week4",
  },
} as any;

export default function SlideViewer() {
  const [, params] = useRoute("/lessons/:week");
  const week = params?.week ?? "";
  const deck = (DECKS as any)[week];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [week]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!deck) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => Math.min(c + 1, deck.slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deck]);

  if (!deck) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#fff", fontFamily: "Montserrat, sans-serif", textAlign: "center" }}>
          <div style={{ color: "#E31E24", fontSize: 14, letterSpacing: 4, marginBottom: 12 }}>404</div>
          <div style={{ fontSize: 32, fontWeight: 900 }}>DECK NOT FOUND</div>
          <a href="/internal/lessons" style={{ color: "#E31E24", marginTop: 24, display: "block", fontSize: 14, letterSpacing: 2 }}>← BACK TO LIBRARY</a>
        </div>
      </div>
    );
  }

  const folder = (deck as any).folder;
  const slideId = deck.slides[current];
  const slideUrl = `/slides/${folder}/${slideId}.html`;
  const total = deck.slides.length;

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{
        background: "#0a0a0a",
        borderBottom: "1px solid #1a1a1a",
        padding: "12px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Montserrat, sans-serif",
      }}>
        <a href="/internal/lessons" style={{ color: "#E31E24", fontSize: 12, fontWeight: 700, letterSpacing: 3, textDecoration: "none" }}>
          ← LIBRARY
        </a>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          {deck.title}
        </div>
        <div style={{ color: "#666", fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
          {current + 1} / {total}
        </div>
      </div>

      {/* Slide iframe */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 0" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 1280 }}>
          <iframe
            key={slideUrl}
            src={slideUrl}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              border: "none",
              display: "block",
            }}
            title={`Slide ${current + 1}`}
          />
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "Montserrat, sans-serif",
      }}>
        <button
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          style={{
            background: current === 0 ? "#1a1a1a" : "#E31E24",
            color: "#fff",
            border: "none",
            padding: "10px 28px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 3,
            cursor: current === 0 ? "not-allowed" : "pointer",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          ← PREV
        </button>

        {/* Slide dots (max 20 shown) */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {deck.slides.slice(0, 20).map((_: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                background: i === current ? "#E31E24" : "#333",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
          {total > 20 && (
            <span style={{ color: "#555", fontSize: 11, marginLeft: 4 }}>+{total - 20}</span>
          )}
        </div>

        <button
          onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
          disabled={current === total - 1}
          style={{
            background: current === total - 1 ? "#1a1a1a" : "#E31E24",
            color: "#fff",
            border: "none",
            padding: "10px 28px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 3,
            cursor: current === total - 1 ? "not-allowed" : "pointer",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          NEXT →
        </button>
      </div>

      {/* Keyboard hint */}
      <div style={{ textAlign: "center", padding: "8px 0 16px", color: "#333", fontSize: 11, fontFamily: "Montserrat, sans-serif", letterSpacing: 2 }}>
        USE ← → ARROW KEYS TO NAVIGATE
      </div>
    </div>
  );
}
