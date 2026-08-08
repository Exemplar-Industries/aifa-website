/*
 * AI Film Academy — GenJam Freebie Landing Page
 * Route: /genjam-freebie
 * Purpose: 150 complimentary AFA memberships for Machine Cinema GenJam attendees
 *          Distributed via email blast — first 150 to claim get free access
 *
 * Architecture: Reuses Anthum invite infrastructure
 *   - Supabase: slot tracking (invite_claims table) + duplicate prevention
 *   - Skool webhook: auto-invites claimant into AFA community at 100% free
 *   - 150 slots (up from 100 on Anthum page)
 *   - Source tag: "genjam_freebie" for analytics separation
 */
import { useState, useEffect, useCallback } from "react";
import { supabase, SUPABASE_URL } from "@/lib/supabase";

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_SLOTS = 150;

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error" | "duplicate" | "full";
type WaitlistState = "idle" | "loading" | "success" | "error" | "duplicate";

// ─── Animated Slot Counter ────────────────────────────────────────────────────
function SlotCounter({ value, total }: { value: number; total: number }) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (displayed === value) return;
    const step = displayed > value ? -1 : 1;
    const timer = setInterval(() => {
      setDisplayed((prev) => {
        if (prev === value) { clearInterval(timer); return prev; }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  const claimed = total - displayed;
  const pct = Math.max(0, Math.min(100, (claimed / total) * 100));
  const isLow = displayed <= 20;

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-end justify-center gap-2 mb-3">
        <span
          className="font-black tabular-nums leading-none"
          style={{
            fontSize: "clamp(3rem, 12vw, 5rem)",
            color: isLow ? "#f97316" : "#ef4444",
            textShadow: isLow ? "0 0 40px rgba(249,115,22,0.6)" : "0 0 40px rgba(239,68,68,0.5)",
            transition: "color 0.5s, text-shadow 0.5s",
          }}
        >
          {displayed}
        </span>
        <span className="text-gray-400 text-xl font-semibold mb-3">/ {total}</span>
      </div>
      <p className="text-gray-400 text-sm uppercase tracking-widest mb-4 text-center">
        spots remaining
      </p>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: isLow
              ? "linear-gradient(90deg, #f97316, #ef4444)"
              : "linear-gradient(90deg, #ef4444, #b91c1c)",
          }}
        />
      </div>
      {isLow && displayed > 0 && (
        <p className="text-orange-400 text-xs text-center mt-3 font-semibold animate-pulse">
          Almost gone — claim yours now
        </p>
      )}
    </div>
  );
}

// ─── Waitlist Form (shown when slots are full) ────────────────────────────────
function WaitlistForm() {
  const [wState, setWState] = useState<WaitlistState>("idle");
  const [wError, setWError] = useState("");
  const [wFirst, setWFirst] = useState("");
  const [wEmail, setWEmail] = useState("");

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wState === "loading") return;
    const trimFirst = wFirst.trim();
    const trimEmail = wEmail.trim().toLowerCase();
    if (!trimFirst || !trimEmail) return;
    setWState("loading");
    setWError("");
    try {
      const { error } = await supabase.from("anthum_waitlist").insert({
        name: trimFirst,
        email: trimEmail,
        source: "genjam_freebie_waitlist",
      });
      if (error) {
        if (error.code === "23505" || error.message?.toLowerCase().includes("unique")) {
          setWState("duplicate");
          return;
        }
        throw error;
      }
      setWState("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setWError(msg);
      setWState("error");
    }
  };

  if (wState === "success") {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-4">📬</div>
        <h3 className="text-xl font-bold text-white mb-2">You're on the list.</h3>
        <p className="text-gray-400 text-sm">
          We'll notify you if a spot opens up or when the next round launches.
        </p>
      </div>
    );
  }

  if (wState === "duplicate") {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400 text-sm">
          You're already on the waitlist. We'll reach out when spots open.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleWaitlist} className="w-full max-w-md mx-auto space-y-3">
      <p className="text-gray-400 text-sm text-center mb-4">
        All 150 spots have been claimed. Join the waitlist to be notified when more open up.
      </p>
      <input
        type="text"
        required
        placeholder="First Name"
        value={wFirst}
        onChange={(e) => setWFirst(e.target.value)}
        disabled={wState === "loading"}
        className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none"
        style={inputStyle}
      />
      <input
        type="email"
        required
        placeholder="Email Address"
        value={wEmail}
        onChange={(e) => setWEmail(e.target.value)}
        disabled={wState === "loading"}
        className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none"
        style={inputStyle}
      />
      {wState === "error" && <p className="text-red-400 text-sm text-center">{wError}</p>}
      <button
        type="submit"
        disabled={wState === "loading" || !wFirst.trim() || !wEmail.trim()}
        className="w-full rounded-xl py-4 font-bold text-white text-base uppercase tracking-wider transition-all duration-200"
        style={{
          background: "rgba(239,68,68,0.3)",
          border: "1px solid rgba(239,68,68,0.4)",
        }}
      >
        {wState === "loading" ? "Joining waitlist..." : "Join Waitlist →"}
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GenJamFreebie() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [slotsRemaining, setSlotsRemaining] = useState<number>(TOTAL_SLOTS);
  const [slotsLoaded, setSlotsLoaded] = useState(false);

  const showWaitlist = slotsLoaded && slotsRemaining <= 0;

  // ── Fetch slot count ────────────────────────────────────────────────────────
  const fetchSlots = useCallback(async () => {
    try {
      const { count, error } = await supabase
        .from("invite_claims")
        .select("*", { count: "exact", head: true })
        .eq("source", "genjam_freebie");
      if (!error) {
        setSlotsRemaining(Math.max(0, TOTAL_SLOTS - (count ?? 0)));
      }
    } catch {
      // fail silently — don't block the page
    } finally {
      setSlotsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
    // Real-time slot updates
    const channel = supabase
      .channel("genjam_freebie_claims")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "invite_claims", filter: "source=eq.genjam_freebie" },
        () => { fetchSlots(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchSlots]);

  // ── Form submission ─────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading") return;

    const trimFirst = firstName.trim();
    const trimEmail = email.trim().toLowerCase();
    if (!trimFirst || !trimEmail) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      // 1. Re-check slots server-side
      const { count } = await supabase
        .from("invite_claims")
        .select("*", { count: "exact", head: true })
        .eq("source", "genjam_freebie");

      if ((count ?? 0) >= TOTAL_SLOTS) {
        setSlotsRemaining(0);
        setFormState("full");
        return;
      }

      // 2. Insert claim
      const { error: insertError } = await supabase.from("invite_claims").insert({
        name: trimFirst,
        email: trimEmail,
        source: "genjam_freebie",
      });

      if (insertError) {
        if (insertError.code === "23505" || insertError.message?.toLowerCase().includes("unique")) {
          setFormState("duplicate");
          return;
        }
        throw insertError;
      }

      // 3. Fire Skool invite via edge function
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/send-skool-invite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimEmail }),
        });
        if (res.ok) {
          await supabase
            .from("invite_claims")
            .update({ zapier_triggered: true, zapier_triggered_at: new Date().toISOString() })
            .eq("email", trimEmail);
        }
      } catch {
        console.warn("Skool invite edge function failed — claim saved, invite may need manual follow-up");
      }

      // 4. Refresh counter
      await fetchSlots();
      setFormState("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setFormState("error");
    }
  }, [formState, firstName, email, fetchSlots]);

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.border = "1px solid rgba(239,68,68,0.5)";
    e.target.style.background = "rgba(255,255,255,0.06)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
    e.target.style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A0A", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="border-b border-white/5 py-5 px-6 flex justify-center">
        <img
          src="/assets/aifa-white-flask-film-academy-180.png"
          alt="AI Film Academy"
          style={{ height: "40px", width: "auto" }}
        />
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center px-4 py-12 md:py-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#ef4444" }}
          />
          Exclusive GenJam Offer
        </div>

        {/* Headline */}
        <h1
          className="text-center font-black mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: "1.0",
            letterSpacing: "0.02em",
            maxWidth: "800px",
          }}
        >
          Congratulations on
          <br />
          <span style={{ color: "#ef4444" }}>Finishing a GenJam.</span>
        </h1>

        <p
          className="text-center text-gray-400 mb-10"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", maxWidth: "560px", lineHeight: "1.6" }}
        >
          As an exclusive thank-you for attending live, the first{" "}
          <strong className="text-white">150 people</strong> to claim this offer get full access to
          AI Film Academy — completely free.
        </p>

        {/* Slot counter */}
        {slotsLoaded && !showWaitlist && (
          <div className="mb-10">
            <SlotCounter value={slotsRemaining} total={TOTAL_SLOTS} />
          </div>
        )}

        {/* ── Form states ── */}
        {formState === "success" ? (
          <div
            className="w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-3">You're in.</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Check your inbox — your Skool invite is on its way.{" "}
              <strong className="text-white">It may take up to 15 minutes.</strong>
              <br /><br />
              Welcome to AI Film Academy. See you inside.
            </p>
          </div>
        ) : formState === "duplicate" ? (
          <div
            className="w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-gray-400 text-sm">
              This email has already been registered. Check your inbox for the invite, or reach out
              if you need help.
            </p>
          </div>
        ) : formState === "full" || showWaitlist ? (
          <div
            className="w-full max-w-md rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-center mb-6">
              <p
                className="font-black text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem" }}
              >
                All 150 Spots Claimed
              </p>
            </div>
            <WaitlistForm />
          </div>
        ) : (
          /* ── Claim form ── */
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2rem",
            }}
          >
            <h2
              className="text-center font-bold text-white mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.05em" }}
            >
              Claim Your Free Membership
            </h2>

            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                required
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={formState === "loading"}
                className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formState === "loading"}
                className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {formState === "error" && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={formState === "loading" || !firstName.trim() || !email.trim()}
              className="w-full rounded-xl py-4 font-bold text-white text-base uppercase tracking-wider transition-all duration-200"
              style={{
                background:
                  formState === "loading" || !firstName.trim() || !email.trim()
                    ? "rgba(239,68,68,0.4)"
                    : "linear-gradient(135deg, #ef4444, #b91c1c)",
                cursor:
                  formState === "loading" || !firstName.trim() || !email.trim()
                    ? "not-allowed"
                    : "pointer",
                boxShadow:
                  formState === "loading" || !firstName.trim() || !email.trim()
                    ? "none"
                    : "0 0 30px rgba(239,68,68,0.35)",
              }}
            >
              {formState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: "white", borderTopColor: "transparent" }}
                  />
                  Claiming your spot...
                </span>
              ) : (
                "Claim My Free Membership →"
              )}
            </button>

            <p className="text-center text-xs text-gray-600">
              One claim per email. No credit card required. Invite delivered within 15 minutes.
            </p>
          </form>
        )}

        {/* ── What's included ── */}
        {!showWaitlist && formState !== "success" && (
          <div
            className="w-full max-w-md mt-12 rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5 text-center">
              What you get with full access
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Course Access", desc: "Full AI Film Academy curriculum — 50+ video lessons" },
                { label: "AI Media Specialist Certificate", desc: "LinkedIn-ready certification badge" },
                { label: "Monthly GenJams", desc: "Live collaborative AI filmmaking sessions every month" },
                { label: "Private Community", desc: "1,100+ active AI creators — ask questions, share work" },
                { label: "AIFA Workflow System", desc: "The exact tool stack and process used by AFA members" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <span>
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                    <span className="text-xs text-gray-500 block">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-xs text-gray-700">
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This offer is exclusively for
          Machine Cinema GenJam attendees.
        </p>
      </footer>
    </div>
  );
}
