/*
 * AI Film Academy — GenJam Freebie Landing Page
 * Route: /genjam-freebie
 * Purpose: 150 complementary AFA memberships for Machine Cinema GenJam attendees
 * Design: Full-width, cinematic dark, massive text, dark card grid for benefits
 */
import { useState, useEffect, useCallback } from "react";
import { supabase, SUPABASE_URL } from "@/lib/supabase";

const TOTAL_SLOTS = 150;

type FormState = "idle" | "loading" | "success" | "error" | "duplicate" | "full";
type WaitlistState = "idle" | "loading" | "success" | "error" | "duplicate";

// ─── Slot Counter ─────────────────────────────────────────────────────────────
function SlotCounter({ value, total }: { value: number; total: number }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    if (displayed === value) return;
    const step = displayed > value ? -1 : 1;
    const timer = setInterval(() => {
      setDisplayed((prev) => { if (prev === value) { clearInterval(timer); return prev; } return prev + step; });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  const claimed = total - displayed;
  const pct = Math.max(0, Math.min(100, (claimed / total) * 100));
  const isLow = displayed <= 20;
  return (
    <div style={{ textAlign: "center", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(5rem, 16vw, 9rem)",
          lineHeight: 1,
          color: isLow ? "#f97316" : "#ef4444",
          textShadow: isLow ? "0 0 80px rgba(249,115,22,0.5)" : "0 0 80px rgba(239,68,68,0.4)",
          transition: "color 0.5s",
        }}>{displayed}</span>
        <span style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: "1rem" }}>/ {total}</span>
      </div>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>spots remaining</p>
      <div style={{ width: "100%", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: "4px", background: isLow ? "linear-gradient(90deg,#f97316,#ef4444)" : "linear-gradient(90deg,#ef4444,#b91c1c)", transition: "width 0.7s" }} />
      </div>
      {isLow && displayed > 0 && <p style={{ color: "#f97316", fontWeight: 700, marginTop: "0.75rem", fontSize: "0.95rem" }}>Almost gone — claim yours now</p>}
    </div>
  );
}

// ─── Waitlist Form ────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [wState, setWState] = useState<WaitlistState>("idle");
  const [wError, setWError] = useState("");
  const [wFirst, setWFirst] = useState("");
  const [wEmail, setWEmail] = useState("");
  const inp: React.CSSProperties = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", fontSize: "1.05rem", padding: "14px 18px", color: "#fff", width: "100%", outline: "none", boxSizing: "border-box" };
  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wState === "loading") return;
    const tf = wFirst.trim(), te = wEmail.trim().toLowerCase();
    if (!tf || !te) return;
    setWState("loading"); setWError("");
    try {
      const { error } = await supabase.from("anthum_waitlist").insert({ name: tf, email: te, source: "genjam_freebie_waitlist" });
      if (error) { if (error.code === "23505" || error.message?.toLowerCase().includes("unique")) { setWState("duplicate"); return; } throw error; }
      setWState("success");
    } catch (err: unknown) { setWError(err instanceof Error ? err.message : "Something went wrong."); setWState("error"); }
  };
  if (wState === "success") return <div style={{ textAlign: "center", padding: "2rem 0" }}><div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📬</div><h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>You're on the list.</h3><p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>We'll notify you if a spot opens up.</p></div>;
  if (wState === "duplicate") return <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", padding: "1.5rem 0" }}>You're already on the waitlist.</p>;
  return (
    <form onSubmit={handleWaitlist} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", textAlign: "center" }}>All 150 spots have been claimed. Join the waitlist below.</p>
      <input type="text" required placeholder="First Name" value={wFirst} onChange={e => setWFirst(e.target.value)} disabled={wState === "loading"} style={inp} />
      <input type="email" required placeholder="Email Address" value={wEmail} onChange={e => setWEmail(e.target.value)} disabled={wState === "loading"} style={inp} />
      {wState === "error" && <p style={{ color: "#f87171", textAlign: "center", fontSize: "0.85rem" }}>{wError}</p>}
      <button type="submit" disabled={wState === "loading" || !wFirst.trim() || !wEmail.trim()} style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "10px", padding: "14px", color: "#fff", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}>
        {wState === "loading" ? "Joining..." : "Join Waitlist →"}
      </button>
    </form>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: "🎬", label: "Full Course Library", desc: "50+ video lessons covering every stage of AI filmmaking — concept, production, post" },
  { icon: "🤖", label: "AIFA Workflow System", desc: "The exact AI tool stack and production process used by AFA members to ship real films" },
  { icon: "🏆", label: "AI Media Specialist Certificate", desc: "LinkedIn-ready certification that signals your skills to clients and employers" },
  { icon: "🎥", label: "Monthly GenJams", desc: "Live collaborative filmmaking sessions every month — the same experience you just had" },
  { icon: "👥", label: "Private Community", desc: "1,100+ active AI creators — get feedback, find collaborators, stay ahead of the tools" },
  { icon: "🔄", label: "Continuous Updates", desc: "New lessons added monthly as AI tools evolve — your membership never goes stale" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GenJamFreebie() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [slotsRemaining, setSlotsRemaining] = useState<number>(TOTAL_SLOTS);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const showWaitlist = slotsLoaded && slotsRemaining <= 0;

  const fetchSlots = useCallback(async () => {
    try {
      const { count, error } = await supabase.from("invite_claims").select("*", { count: "exact", head: true }).eq("source", "genjam_freebie");
      if (!error) setSlotsRemaining(Math.max(0, TOTAL_SLOTS - (count ?? 0)));
    } catch { /* silent */ } finally { setSlotsLoaded(true); }
  }, []);

  useEffect(() => {
    fetchSlots();
    const ch = supabase.channel("genjam_freebie_claims").on("postgres_changes", { event: "INSERT", schema: "public", table: "invite_claims", filter: "source=eq.genjam_freebie" }, () => fetchSlots()).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [fetchSlots]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading") return;
    const tf = firstName.trim(), te = email.trim().toLowerCase();
    if (!tf || !te) return;
    setFormState("loading"); setErrorMsg("");
    try {
      const { count } = await supabase.from("invite_claims").select("*", { count: "exact", head: true }).eq("source", "genjam_freebie");
      if ((count ?? 0) >= TOTAL_SLOTS) { setSlotsRemaining(0); setFormState("full"); return; }
      const { error: ie } = await supabase.from("invite_claims").insert({ name: tf, email: te, source: "genjam_freebie" });
      if (ie) { if (ie.code === "23505" || ie.message?.toLowerCase().includes("unique")) { setFormState("duplicate"); return; } throw ie; }
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/send-skool-invite`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: te }) });
        if (res.ok) await supabase.from("invite_claims").update({ zapier_triggered: true, zapier_triggered_at: new Date().toISOString() }).eq("email", te);
      } catch { console.warn("Skool invite edge function failed — claim saved"); }
      await fetchSlots();
      setFormState("success");
    } catch (err: unknown) { setErrorMsg(err instanceof Error ? err.message : "Something went wrong."); setFormState("error"); }
  }, [formState, firstName, email, fetchSlots]);

  const inp: React.CSSProperties = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", fontSize: "1.1rem", padding: "16px 20px", color: "#fff", width: "100%", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(3.5rem,9vw,7rem) clamp(1.5rem,5vw,3rem) clamp(2rem,5vw,4rem)", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "clamp(0.8rem,2vw,0.95rem)", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "1.75rem" }}>
          Machine Cinema × AI Film Academy
        </p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,11vw,7.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#F5F5F0", margin: "0 0 0.25rem" }}>
          Congratulations on
        </h1>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,11vw,7.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#ef4444", margin: "0 0 2rem" }}>
          Finishing a GenJam.
        </h1>
        <p style={{ fontSize: "clamp(1.1rem,3vw,1.45rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: "680px", margin: "0 auto 3.5rem" }}>
          As an exclusive thank-you for attending live, the first{" "}
          <strong style={{ color: "#fff" }}>150 people</strong> to claim this offer receive
          complementary access to AI Film Academy.
        </p>

        {/* Slot counter */}
        {slotsLoaded && !showWaitlist && (
          <div style={{ marginBottom: "3.5rem" }}>
            <SlotCounter value={slotsRemaining} total={TOTAL_SLOTS} />
          </div>
        )}

        {/* ── FORM STATES ── */}
        {formState === "success" ? (
          <div style={{ maxWidth: "560px", margin: "0 auto", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "20px", padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎬</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", color: "#fff", marginBottom: "1rem", letterSpacing: "0.02em" }}>You're in.</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", lineHeight: 1.65 }}>
              Check your inbox — your Skool invite is on its way.<br />
              <strong style={{ color: "#fff" }}>It may take up to 15 minutes.</strong><br /><br />
              Welcome to AI Film Academy. See you inside.
            </p>
          </div>
        ) : formState === "duplicate" ? (
          <div style={{ maxWidth: "560px", margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2.5rem", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>This email has already been registered. Check your inbox for the invite.</p>
          </div>
        ) : formState === "full" || showWaitlist ? (
          <div style={{ maxWidth: "560px", margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "#fff", textAlign: "center", marginBottom: "1.5rem", letterSpacing: "0.02em" }}>All 150 Spots Claimed</h2>
            <WaitlistForm />
          </div>
        ) : (
          /* ── CLAIM FORM ── */
          <form onSubmit={handleSubmit} style={{ maxWidth: "560px", margin: "0 auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "clamp(1.75rem,4vw,2.5rem)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.6rem,4vw,2.1rem)", letterSpacing: "0.05em", color: "#fff", textAlign: "center", marginBottom: "0.25rem" }}>
              Claim Your Complementary Access
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <label style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em" }}>First Name</label>
              <input type="text" required placeholder="Your first name" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={formState === "loading"} style={inp}
                onFocus={e => { e.target.style.border = "1px solid rgba(239,68,68,0.55)"; }}
                onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.12)"; }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <label style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Email Address</label>
              <input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={formState === "loading"} style={inp}
                onFocus={e => { e.target.style.border = "1px solid rgba(239,68,68,0.55)"; }}
                onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.12)"; }} />
            </div>
            {formState === "error" && <p style={{ color: "#f87171", textAlign: "center", fontSize: "0.88rem" }}>{errorMsg}</p>}
            <button type="submit" disabled={formState === "loading" || !firstName.trim() || !email.trim()}
              style={{
                background: formState === "loading" || !firstName.trim() || !email.trim() ? "rgba(239,68,68,0.3)" : "linear-gradient(135deg,#ef4444,#b91c1c)",
                border: "none", borderRadius: "12px", padding: "18px", color: "#fff", fontWeight: 800,
                fontSize: "clamp(1rem,2.5vw,1.1rem)", textTransform: "uppercase", letterSpacing: "0.08em",
                cursor: formState === "loading" || !firstName.trim() || !email.trim() ? "not-allowed" : "pointer",
                boxShadow: formState === "loading" || !firstName.trim() || !email.trim() ? "none" : "0 0 40px rgba(239,68,68,0.35)",
              }}>
              {formState === "loading" ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                  <span style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Claiming your spot...
                </span>
              ) : "Claim My Complementary Access →"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
              One claim per email. No credit card required. Invite delivered within 15 minutes.
            </p>
          </form>
        )}
      </section>

      {/* ── EVERYTHING INCLUDED ── */}
      {!showWaitlist && formState !== "success" && (
        <section style={{ padding: "clamp(3rem,7vw,5rem) clamp(1.5rem,5vw,3rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.04em", color: "#F5F5F0", textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)", lineHeight: 1 }}>
              Everything Included in Your Membership
            </h2>

            {/* 2-col dark card grid — matches screenshot */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
              {BENEFITS.map((b) => (
                <div key={b.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "clamp(1.25rem,3vw,1.75rem)", display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
                  <span style={{ fontSize: "1.75rem", flexShrink: 0, marginTop: "2px" }}>{b.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "#F5F5F0", marginBottom: "0.4rem", lineHeight: 1.2 }}>{b.label}</p>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECOND CTA ── */}
      {!showWaitlist && formState !== "success" && (
        <section style={{ textAlign: "center", padding: "clamp(3rem,7vw,5rem) clamp(1.5rem,5vw,3rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "0.02em", color: "#F5F5F0", marginBottom: "0.5rem", lineHeight: 1.05 }}>
            {slotsLoaded ? `${slotsRemaining} spots left.` : "Limited spots."}{" "}
            <span style={{ color: "#ef4444" }}>Claim yours now.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(1rem,2.5vw,1.2rem)", marginBottom: "2rem" }}>
            This offer is exclusively for Machine Cinema GenJam attendees.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)", border: "none", borderRadius: "12px", padding: "18px 48px", color: "#fff", fontWeight: 800, fontSize: "clamp(1rem,2.5vw,1.1rem)", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 50px rgba(239,68,68,0.4)" }}>
            Claim My Complementary Access →
          </button>
          <p style={{ marginTop: "1rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>No credit card required. Invite delivered within 15 minutes.</p>
        </section>
      )}

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This offer is exclusively for Machine Cinema GenJam attendees.
        </p>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
