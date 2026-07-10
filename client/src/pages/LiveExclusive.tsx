/*
 * AI Film Academy — Live Session Exclusive Free Membership Page
 * Route: /live-exclusive
 * Purpose: Free full membership for live session attendees — no slot cap
 * Value framing: $49/month offer given free to live attendees
 * Backend: Supabase (duplicate prevention) → Skool direct webhook invite
 */

import { useState, useEffect, useCallback } from "react";
import { supabase, SUPABASE_URL } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error" | "duplicate";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LiveExclusive() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");

  // Pulse the "LIVE" badge
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(t);
  }, []);

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      // 1. Insert claim (no slot check — open access)
      const { error: insertError } = await supabase.from("invite_claims").insert({
        name: fullName,
        email: trimmedEmail,
        ...(trimmedDiscord ? { discord_username: trimmedDiscord } : {}),
        source: "live_exclusive",
      });

      if (insertError) {
        if (insertError.code === "23505" || insertError.message?.toLowerCase().includes("unique")) {
          setFormState("duplicate");
          return;
        }
        throw insertError;
      }

      // 2. Trigger Skool invite via Edge Function
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/send-skool-invite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });
        if (res.ok) {
          await supabase
            .from("invite_claims")
            .update({ zapier_triggered: true, zapier_triggered_at: new Date().toISOString() })
            .eq("email", trimmedEmail);
        }
      } catch {
        console.warn("Skool invite edge function failed — claim saved, invite may need manual follow-up");
      }

      setFormState("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setFormState("error");
    }
  }, [formState, firstName, lastName, email, discord]);

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

  // ── What's Inside items (from Skool about page) ───────────────────────────
  const whatsInside = [
    {
      emoji: "🛠️",
      label: "Clear 3-Step Workflow",
      detail: "Follow a simple process from idea to finished video — no guessing, no wasted time.",
    },
    {
      emoji: "⚡",
      label: "No Tool Overwhelm",
      detail: "Learn only the tools that matter. Kling, Veo, Midjourney — curated and sequenced.",
    },
    {
      emoji: "🎓",
      label: "Professional Skill Certification",
      detail: "Earn a credential you can show clients, brands, and agencies. LinkedIn-ready badge.",
    },
    {
      emoji: "🖥️",
      label: "Build Your Portfolio",
      detail: "Weekly challenges that produce real work — not just tutorials you forget.",
    },
    {
      emoji: "🎥",
      label: "Personalized Feedback",
      detail: "Weekly live feedback sessions and personalized Loom reviews on your actual work.",
    },
    {
      emoji: "🎬",
      label: "Creative Opportunities",
      detail: "Curated festivals, events, and challenges to get your work seen.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0a", color: "#ffffff" }}>

      {/* ── Minimal nav ── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="AI Film Academy"
            className="h-8 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span className="font-bold text-sm tracking-wide text-white/80">AI Film Academy™</span>
        </a>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#ef4444",
              boxShadow: pulse ? "0 0 8px 2px rgba(239,68,68,0.7)" : "none",
              transition: "box-shadow 0.4s",
            }}
          />
          <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Live Session Exclusive</span>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12">

        {/* Live badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.35)",
            color: "#ef4444",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ef4444",
              boxShadow: pulse ? "0 0 6px 2px rgba(239,68,68,0.8)" : "none",
              transition: "box-shadow 0.4s",
            }}
          />
          Live Session Bonus — Claim Now
        </div>

        {/* Value callout */}
        <div
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="text-gray-500 line-through text-sm">$49/month</span>
          <span className="text-white font-black text-lg">FREE</span>
          <span className="text-gray-400 text-sm">— for being here today</span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-black leading-none mb-5"
          style={{ fontSize: "clamp(2.2rem, 8vw, 4.8rem)", letterSpacing: "-0.02em" }}
        >
          Full Access to
          <br />
          <span style={{ color: "#ef4444" }}>AI Film Academy</span>
          <br />
          <span className="text-white">On Us.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-gray-400 text-center max-w-xl mb-2" style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          You have ideas. We give you the tool stack, workflow, feedback, and certification to turn them into{" "}
          <strong className="text-white">high-quality AI films, ads, trailers, and animated content</strong>{" "}
          you feel confident sharing — without getting overwhelmed.
        </p>
        <p className="text-gray-600 text-sm text-center mb-12">
          This is the same membership everyone else pays $49/month for. Yours free — because you showed up live.
        </p>

        {/* ── What's Inside — ABOVE the form ── */}
        <div className="w-full max-w-2xl mb-12">
          <h2
            className="text-center font-black mb-8"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", letterSpacing: "-0.01em" }}
          >
            What's Inside
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatsInside.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 flex gap-4 items-start"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Outcome promises */}
          <div
            className="mt-6 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3 text-center">
              What you'll be able to make
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "AI ads for your brand",
                "Book or movie trailers",
                "YouTube animation series",
                "Premium-looking content",
              ].map((outcome) => (
                <span
                  key={outcome}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                  }}
                >
                  {outcome}
                </span>
              ))}
            </div>
          </div>

          {/* Value reminder */}
          <div
            className="mt-4 rounded-xl px-4 py-3 text-center"
            style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <p className="text-xs text-gray-400">
              Regular members pay{" "}
              <span className="text-white font-bold">$49/month</span> for everything above.
              You're getting it free — today only.
            </p>
          </div>
        </div>

        {/* ── Form / State panels ── */}
        {formState === "success" ? (
          <div
            className="w-full max-w-md rounded-2xl p-10 text-center"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-2xl font-black text-white mb-3">You're in. Welcome to the Academy.</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your Skool invite is on its way — check your inbox within 15 minutes.
              Once you accept, you'll have full access to every course, certification, live event, and the community.
            </p>
          </div>
        ) : formState === "duplicate" ? (
          <div
            className="w-full max-w-md rounded-2xl p-10 text-center"
            style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.25)" }}
          >
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-2xl font-black text-white mb-3">Already claimed</h2>
            <p className="text-gray-400 text-sm">
              This email is already registered. Check your inbox for the Skool invite, or reach out if you need help getting in.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h2
              className="text-center font-black mb-6"
              style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)", letterSpacing: "-0.01em" }}
            >
              Claim Your Free Membership
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* First + Last name row */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">First Name</label>
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
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Last Name</label>
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
                disabled={formState === "loading" || !firstName.trim() || !lastName.trim() || !email.trim()}
                className="w-full rounded-xl py-4 font-black text-white text-base uppercase tracking-wider transition-all duration-200"
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
                      : "0 0 40px rgba(239,68,68,0.4)",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                {formState === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "white", borderTopColor: "transparent" }}
                    />
                    Claiming your membership...
                  </span>
                ) : (
                  "Claim My Free Membership →"
                )}
              </button>

              <p className="text-center text-xs text-gray-600">
                No credit card required. One claim per email. Invite delivered within 15 minutes.
              </p>
            </form>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-xs text-gray-700">
          © 2026 AI Film Academy™ (AIFA). All rights reserved. This is a limited live-session offer.
        </p>
      </footer>
    </div>
  );
}
