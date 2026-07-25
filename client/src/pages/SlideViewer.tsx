import { useState, useEffect, useRef, useCallback } from "react";
import { useRoute } from "wouter";

const DECK_DATA: Record<string, { title: string; slides: string[]; folder: string }> = {
  "week-1": {
    title: "Week 1: The State of AI Media",
    folder: "week1",
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
    slides: [
      "slide_1","slide_2","slide_3","slide_4","slide_5",
      "slide_6","slide_7","slide_8","slide_9"
    ],
  },
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SlideViewer() {
  const [, params] = useRoute("/lessons/:week");
  const week = params?.week ?? "";
  const deck = DECK_DATA[week];
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorReadyRef = useRef(false);

  useEffect(() => { setCurrent(0); setEditMode(false); setHasChanges(false); }, [week]);

  // Keyboard nav — only when not in edit mode
  useEffect(() => {
    if (!deck || editMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
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
  }, [deck, editMode]);

  // Scroll thumbnail panel to current slide
  useEffect(() => {
    if (!panelRef.current) return;
    const thumb = panelRef.current.querySelector(`[data-index="${current}"]`) as HTMLElement;
    if (thumb) thumb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [current]);

  // Reset editor ready state when slide changes
  useEffect(() => {
    editorReadyRef.current = false;
    setHasChanges(false);
    setSaveState("idle");
    if (editMode) {
      // Will re-enable once iframe sends editor_ready
    }
  }, [current]);

  // Listen for messages from the slide iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "editor_ready") {
        editorReadyRef.current = true;
        if (editMode) {
          iframeRef.current?.contentWindow?.postMessage({ action: "enable_edit" }, "*");
        }
      }
      if (e.data.type === "slide_changed" || e.data.type === "edit_enabled") {
        setHasChanges(true);
      }
      if (e.data.type === "slide_html") {
        // Received HTML from iframe — save it
        saveSlideHTML(e.data.html);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [editMode, current, week]);

  const toggleEditMode = useCallback(() => {
    if (!editMode) {
      setEditMode(true);
      if (editorReadyRef.current) {
        iframeRef.current?.contentWindow?.postMessage({ action: "enable_edit" }, "*");
      }
    } else {
      setEditMode(false);
      iframeRef.current?.contentWindow?.postMessage({ action: "disable_edit" }, "*");
    }
  }, [editMode]);

  const requestSave = useCallback(() => {
    if (!hasChanges) return;
    setSaveState("saving");
    // Ask iframe for its current HTML
    iframeRef.current?.contentWindow?.postMessage({ action: "get_html" }, "*");
  }, [hasChanges]);

  const saveSlideHTML = async (html: string) => {
    if (!deck) return;
    const slideId = deck.slides[current];
    try {
      const res = await fetch("/api/slides/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck: deck.folder, slideId, html }),
      });
      if (res.ok) {
        setSaveState("saved");
        setHasChanges(false);
        setTimeout(() => setSaveState("idle"), 2500);
      } else {
        setSaveState("error");
      }
    } catch {
      setSaveState("error");
    }
  };

  if (!deck) {
    return (
      <div style={{ background: "#0a0a0a", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#E31E24", fontSize: 14, letterSpacing: 4, marginBottom: 12 }}>404</div>
          <div style={{ color: "#fff", fontSize: 32, fontWeight: 900 }}>DECK NOT FOUND</div>
          <a href="/internal/lessons" style={{ color: "#E31E24", marginTop: 24, display: "block", fontSize: 12, letterSpacing: 3 }}>← BACK TO LIBRARY</a>
        </div>
      </div>
    );
  }

  const slideId = deck.slides[current];
  const slideUrl = `/slides/${deck.folder}/${slideId}.html`;
  const total = deck.slides.length;

  if (isFullscreen) {
    return (
      <div tabIndex={0} style={{ background: "#000", position: "fixed", inset: 0, display: "flex", flexDirection: "column", zIndex: 9999, outline: "none" }}
        onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}>
        <iframe key={slideUrl} src={slideUrl} style={{ flex: 1, border: "none", width: "100%", height: "100%" }} title={`Slide ${current + 1}`} />
        <div style={{ position: "fixed", top: 16, right: 16, display: "flex", gap: 8, zIndex: 100 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Montserrat, sans-serif", letterSpacing: 2, padding: "6px 12px" }}>{current + 1} / {total}</span>
          <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            style={{ background: "rgba(0,0,0,0.7)", color: "#fff", border: "1px solid #444", padding: "6px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>EXIT</button>
        </div>
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "Montserrat, sans-serif", letterSpacing: 2 }}>CLICK OR ← → TO NAVIGATE · ESC TO EXIT</div>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
      <style>{`html, body, #root { height: 100%; overflow: hidden; margin: 0; padding: 0; }`}</style>

      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", fontFamily: "Montserrat, sans-serif", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{ height: 48, minHeight: 48, background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <a href="/internal/lessons" style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 3, textDecoration: "none" }}>← LIBRARY</a>
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{deck.title}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "#444", fontSize: 11, letterSpacing: 2 }}>{current + 1} / {total}</span>

            {/* Save button — only visible when there are changes */}
            {hasChanges && (
              <button onClick={requestSave} disabled={saveState === "saving"}
                style={{ background: saveState === "saving" ? "#333" : "#27ae60", color: "#fff", border: "none", padding: "6px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 2, cursor: saveState === "saving" ? "wait" : "pointer", fontFamily: "Montserrat, sans-serif" }}>
                {saveState === "saving" ? "SAVING..." : saveState === "saved" ? "SAVED ✓" : "SAVE"}
              </button>
            )}
            {saveState === "saved" && !hasChanges && (
              <span style={{ color: "#27ae60", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>SAVED ✓</span>
            )}
            {saveState === "error" && (
              <span style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>SAVE FAILED</span>
            )}

            {/* Edit toggle */}
            <button onClick={toggleEditMode}
              style={{ background: editMode ? "#E31E24" : "#1a1a1a", color: "#fff", border: editMode ? "none" : "1px solid #333", padding: "6px 18px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
              {editMode ? "EDITING" : "EDIT"}
            </button>

            {/* Present */}
            <button onClick={() => setIsFullscreen(true)}
              style={{ background: "#1a1a1a", color: "#ccc", border: "1px solid #333", padding: "6px 18px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
              PRESENT
            </button>
          </div>
        </div>

        {/* Edit mode hint bar */}
        {editMode && (
          <div style={{ background: "#1a0000", borderBottom: "1px solid #3a0000", padding: "6px 20px", fontSize: 11, color: "#E31E24", letterSpacing: 2, textAlign: "center", flexShrink: 0 }}>
            EDIT MODE — CLICK ANY TEXT TO EDIT · HIT SAVE WHEN DONE
          </div>
        )}

        {/* Body */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

          {/* Left thumbnail strip */}
          <div ref={panelRef} style={{ width: 176, minWidth: 176, background: "#0d0d0d", borderRight: "1px solid #1a1a1a", overflowY: "auto", overflowX: "hidden", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
            {deck.slides.map((sid, i) => (
              <button key={sid} data-index={i} onClick={() => { if (editMode && hasChanges) { if (!window.confirm("You have unsaved changes. Switch slide anyway?")) return; } setCurrent(i); }}
                style={{ background: "none", border: `2px solid ${i === current ? "#E31E24" : "transparent"}`, cursor: "pointer", padding: 0, display: "block", width: "100%", flexShrink: 0 }}>
                <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", overflow: "hidden", background: "#111" }}>
                  <iframe src={`/slides/${deck.folder}/${sid}.html`}
                    style={{ position: "absolute", top: 0, left: 0, width: 900, height: 506, transform: "scale(0.18)", transformOrigin: "top left", pointerEvents: "none", border: "none" }}
                    title={`Slide ${i + 1}`} loading="lazy" />
                </div>
                <div style={{ background: i === current ? "#E31E24" : "#111", color: i === current ? "#fff" : "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 0", textAlign: "center" }}>
                  {i + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Slide viewer */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", padding: "20px", overflow: "hidden", minHeight: 0 }}>
              <div style={{ width: "100%", maxWidth: "calc((100vh - 48px - 56px) * 16 / 9)", aspectRatio: "16/9", position: "relative" }}>
                <iframe
                  ref={iframeRef}
                  key={`${slideUrl}-${editMode}`}
                  src={`${slideUrl}?editor=1`}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  title={`Slide ${current + 1}`}
                  onLoad={() => {
                    // Inject editor script into iframe
                    try {
                      const iwin = iframeRef.current?.contentWindow;
                      if (!iwin) return;
                      const script = iwin.document.createElement("script");
                      script.src = "/slide-editor.js";
                      iwin.document.head.appendChild(script);
                    } catch {
                      // cross-origin guard — won't happen since same origin
                    }
                  }}
                />
              </div>
            </div>

            {/* Bottom nav */}
            <div style={{ height: 56, minHeight: 56, background: "#0a0a0a", borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexShrink: 0 }}>
              <button onClick={() => setCurrent((c) => Math.max(c - 1, 0))} disabled={current === 0}
                style={{ background: current === 0 ? "#161616" : "#E31E24", color: current === 0 ? "#444" : "#fff", border: "none", padding: "8px 24px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: current === 0 ? "not-allowed" : "pointer", fontFamily: "Montserrat, sans-serif" }}>
                ← PREV
              </button>
              <span style={{ color: "#444", fontSize: 11, letterSpacing: 2, minWidth: 70, textAlign: "center" }}>{current + 1} of {total}</span>
              <button onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))} disabled={current === total - 1}
                style={{ background: current === total - 1 ? "#161616" : "#E31E24", color: current === total - 1 ? "#444" : "#fff", border: "none", padding: "8px 24px", fontSize: 11, fontWeight: 700, letterSpacing: 3, cursor: current === total - 1 ? "not-allowed" : "pointer", fontFamily: "Montserrat, sans-serif" }}>
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
