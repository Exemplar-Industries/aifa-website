import { useState } from "react";

const WEEKS = [
  { week: 1, title: "The State of AI Media", slides: 39, status: "ready" as const, path: "/lessons/week-1" },
  { week: 2, title: "Pre-Production", slides: 15, status: "soon" as const, path: null },
  { week: 3, title: "Google Flow Masterclass", slides: 15, status: "soon" as const, path: null },
  { week: 4, title: "Cinematic Editing", slides: 9, status: "ready" as const, path: "/lessons/week-4" },
];

export default function InternalLessons() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === "Brandon777") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!unlocked) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", width: 320 }}>
          <div style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 5, marginBottom: 16 }}>AI FILM ACADEMY</div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, letterSpacing: 2, marginBottom: 32 }}>INTERNAL ACCESS</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter passcode"
              autoFocus
              style={{ width: "100%", background: "#111", border: error ? "1px solid #E31E24" : "1px solid #333", color: "#fff", padding: "14px 16px", fontSize: 14, fontFamily: "Montserrat, sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box" }}
            />
            {error && <div style={{ color: "#E31E24", fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>INCORRECT PASSCODE</div>}
            <button type="submit" style={{ width: "100%", background: "#E31E24", color: "#fff", border: "none", padding: "14px", fontSize: 12, fontWeight: 700, letterSpacing: 4, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>ENTER</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "Montserrat, sans-serif", color: "#fff", padding: "60px 48px", maxWidth: 860, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
      <div style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 5, marginBottom: 8 }}>INTERNAL</div>
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginBottom: 48 }}>LESSON LIBRARY</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {WEEKS.map((w) => (
          <div key={w.week} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <div style={{ color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 3, width: 52 }}>WK {w.week}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>{w.title}</div>
                <div style={{ color: "#555", fontSize: 11, letterSpacing: 2, marginTop: 4 }}>{w.slides} SLIDES</div>
              </div>
            </div>
            <div>
              {w.status === "ready" && w.path ? (
                <a href={w.path} style={{ background: "#E31E24", color: "#fff", padding: "10px 24px", fontSize: 11, fontWeight: 700, letterSpacing: 3, textDecoration: "none", display: "inline-block" }}>VIEW →</a>
              ) : (
                <span style={{ color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>COMING SOON</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
