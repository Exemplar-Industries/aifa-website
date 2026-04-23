/*
 * AI Film Academy — Anthum Community Free Invite Page
 * Route: /invite
 * Purpose: 100 free membership slots for Anthum community members
 * Backend: Supabase (slot tracking + duplicate prevention) → Skool direct webhook invite
 */

import { useState, useEffect, useCallback } from "react";
import { supabase, SUPABASE_URL, TOTAL_INVITE_SLOTS } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error" | "duplicate" | "full";

// ─── Animated Counter Component ───────────────────────────────────────────────
function AnimatedCounter({ value, total }: { value: number; total: number }) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (displayed === value) return;
    const step = displayed > value ? -1 : 1;
    const timer = setInterval(() => {
      setDisplayed((prev) => {
        if (prev === value) {
          clearInterval(timer);
          return prev;
        }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  const pct = Math.max(0, Math.min(100, ((total - value) / total) * 100));

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Slot count */}
      <div className="flex items-end justify-center gap-2 mb-3">
        <span
          className="font-black tabular-nums leading-none"
          style={{
            fontSize: "clamp(3rem, 12vw, 5rem)",
            color: displayed > 10 ? "#ef4444" : "#f97316",
            textShadow: displayed > 10 ? "0 0 40px rgba(239,68,68,0.5)" : "0 0 40px rgba(249,115,22,0.6)",
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

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #ef4444, #b91c1c)",
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>0 left</span>
        <span>{total} total</span>
      </div>
    </div>
  );
}

// ─── Main Invite Page ─────────────────────────────────────────────────────────
export default function Invite() {
  const [slotsRemaining, setSlotsRemaining] = useState<number | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");

  // ── Fetch live slot count ──────────────────────────────────────────────────
  const fetchSlots = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_invite_slots_remaining");
      if (error) throw error;
      setSlotsRemaining(data as number);
    } catch {
      // Fallback: count rows directly
      const { count, error: countError } = await supabase
        .from("invite_claims")
        .select("*", { count: "exact", head: true });
      if (!countError) {
        setSlotsRemaining(Math.max(0, TOTAL_INVITE_SLOTS - (count ?? 0)));
      }
    }
  }, []);

  useEffect(() => {
    fetchSlots();
    // Poll every 10 seconds for live updates
    const interval = setInterval(fetchSlots, 10000);
    return () => clearInterval(interval);
  }, [fetchSlots]);

  // ── Real-time subscription for instant counter updates ────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("invite_claims_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "invite_claims" },
        () => {
          fetchSlots();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSlots]);

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading") return;

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedDiscord = discord.trim();
    const fullName = `${trimmedFirst} ${trimmedLast}`.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      // 1. Re-check slots before claiming
      const { data: slots } = await supabase.rpc("get_invite_slots_remaining");
      if ((slots as number) <= 0) {
        setFormState("full");
        return;
      }

      // 2. Insert claim (UNIQUE constraint on email prevents duplicates)
      const { error: insertError } = await supabase
        .from("invite_claims")
        .insert({
          name: fullName,
          email: trimmedEmail,
          ...(trimmedDiscord ? { discord_username: trimmedDiscord } : {}),
        });

      if (insertError) {
        if (
          insertError.code === "23505" ||
          insertError.message?.toLowerCase().includes("unique")
        ) {
          setFormState("duplicate");
          return;
        }
        throw insertError;
      }

      // 3. Trigger Skool invite via Supabase Edge Function (server-side, no CORS issues)
      try {
        const edgeFnUrl = `${SUPABASE_URL}/functions/v1/send-skool-invite`;
        const res = await fetch(edgeFnUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });
        if (res.ok) {
          // Mark invite triggered in DB (best-effort)
          await supabase
            .from("invite_claims")
            .update({ zapier_triggered: true, zapier_triggered_at: new Date().toISOString() })
            .eq("email", trimmedEmail);
        } else {
          console.warn("Edge function returned non-OK:", res.status);
        }
      } catch {
        // Non-blocking — claim is already saved in DB
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
  };

  const isFull = slotsRemaining !== null && slotsRemaining <= 0;

  // Shared input style
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: "1rem",
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(239,68,68,0.5)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0a0a0a", color: "#ffffff" }}
    >
      {/* ── Minimal nav ── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="AI Film Academy"
            className="h-8 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-bold text-sm tracking-wide text-white/80">
            AI Film Academy™
          </span>
        </a>
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Anthum Community Exclusive
        </span>
      </nav>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#ef4444" }}
          />
          Limited Time — Anthum Members Only
        </div>

        {/* Headline */}
        <h1
          className="text-center font-black leading-none mb-4"
          style={{ fontSize: "clamp(2.2rem, 8vw, 4.5rem)", letterSpacing: "-0.02em" }}
        >
          Get Free Access to
          <br />
          <span style={{ color: "#ef4444" }}>AI Film Academy</span>
        </h1>

        <p className="text-gray-400 text-center max-w-lg mb-2" style={{ fontSize: "1.05rem" }}>
          Brandon is giving away <strong className="text-white">100 free memberships</strong> to
          the Anthum community. Learn how to create high-quality AI videos with an easy workflow,
          no tool overwhelm, and real skill certification.
        </p>
        <p className="text-gray-600 text-sm text-center mb-10">
          Normally $19/month — yours free, permanently.
        </p>

        {/* Live counter */}
        <div
          className="w-full max-w-sm rounded-2xl p-6 mb-8 text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {slotsRemaining === null ? (
            <div className="flex items-center justify-center h-24">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "#ef4444", borderTopColor: "transparent" }}
              />
            </div>
          ) : (
            <AnimatedCounter value={slotsRemaining} total={TOTAL_INVITE_SLOTS} />
          )}
        </div>

        {/* ── Form / State panels ── */}
        {formState === "success" ? (
          <div
            className="w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <div className="text-4xl mb-3">🎬</div>
            <h2 className="text-xl font-bold text-white mb-2">You're in!</h2>
            <p className="text-gray-400 text-sm">
              Check your inbox — your Skool invite is on its way. It may take up to 15 minutes.
              Once you accept, you'll have full access to every course in the Academy.
            </p>
          </div>
        ) : formState === "duplicate" ? (
          <div
            className="w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.25)",
            }}
          >
            <div className="text-4xl mb-3">📬</div>
            <h2 className="text-xl font-bold text-white mb-2">Already claimed</h2>
            <p className="text-gray-400 text-sm">
              This email has already been registered. Check your inbox for the invite, or reach
              out if you need help.
            </p>
          </div>
        ) : formState === "full" || isFull ? (
          <div
            className="w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <div className="text-4xl mb-3">🔒</div>
            <h2 className="text-xl font-bold text-white mb-2">All spots claimed</h2>
            <p className="text-gray-400 text-sm">
              All 100 free memberships have been claimed. Join at{" "}
              <a
                href="https://aifilmacademy.com"
                className="underline text-red-400"
              >
                aifilmacademy.com
              </a>{" "}
              to get notified of future offers.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-4"
          >
            {/* First + Last name row */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={formState === "loading"}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={formState === "loading"}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">
                Email Address
              </label>
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

            {/* Discord (optional) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">
                Discord Username{" "}
                <span className="normal-case text-gray-600 tracking-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="yourname#0000 or @yourname"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
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
              disabled={
                formState === "loading" ||
                !firstName.trim() ||
                !lastName.trim() ||
                !email.trim()
              }
              className="w-full rounded-xl py-4 font-bold text-white text-base uppercase tracking-wider transition-all duration-200 relative overflow-hidden"
              style={{
                background:
                  formState === "loading" || !firstName.trim() || !lastName.trim() || !email.trim()
                    ? "rgba(239,68,68,0.4)"
                    : "linear-gradient(135deg, #ef4444, #b91c1c)",
                cursor:
                  formState === "loading" || !firstName.trim() || !lastName.trim() || !email.trim()
                    ? "not-allowed"
                    : "pointer",
                boxShadow:
                  formState === "loading" || !firstName.trim() || !lastName.trim() || !email.trim()
                    ? "none"
                    : "0 0 30px rgba(239,68,68,0.35)",
              }}
            >
              {formState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
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

        {/* What's included */}
        <div
          className="w-full max-w-md mt-12 rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">
            What you get with full access
          </h3>
          <ul className="space-y-3">
            {[
              "Step-by-step AI video workflow — concept to final cut",
              "No tool overwhelm — a curated stack that actually works (Kling, Veo, Midjourney)",
              "Real skill certification — LinkedIn-ready badge",
              "Private community — 1,100+ active AI creators",
              "Project-based learning — make real videos, not just watch tutorials",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                <span style={{ color: "#ef4444", flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-xs text-gray-700">
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This offer is exclusively for
          Anthum community members.
        </p>
      </footer>
    </div>
  );
}
