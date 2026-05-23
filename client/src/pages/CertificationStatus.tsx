import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// ─── ICONS ────────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#E63329]"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#E63329] flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function TenureProgressBar({
  daysCompleted,
  daysRemaining,
}: {
  daysCompleted: number;
  daysRemaining: number;
}) {
  const pct = Math.min(100, Math.round((daysCompleted / 90) * 100));
  return (
    <div className="w-full max-w-md mt-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-mono">
        <span>Day {daysCompleted}</span>
        <span>{pct}% complete</span>
        <span>Day 90</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E63329] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1.5 text-center">
        {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} until automatic unlock
      </p>
    </div>
  );
}

// ─── OPTION CARD ──────────────────────────────────────────────────────────────
function OptionCard({
  badge,
  title,
  description,
  bullets,
  cta,
  href,
  onClick,
  primary,
  loading,
  disabled,
  loadingLabel,
}: {
  badge: string;
  title: string | React.ReactNode;
  description: string;
  bullets: string[];
  cta: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
  loadingLabel?: string;
}) {
  const btnClass = `mt-auto w-full py-3 px-4 rounded text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
    primary
      ? "bg-[#E63329] text-white hover:bg-[#c42a21]"
      : disabled
      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
      : "border border-[#E63329] text-[#E63329] hover:bg-[#E63329] hover:text-white"
  }`;

  const content = (
    <div
      className={`flex flex-col bg-[#111] border rounded-lg p-6 gap-4 h-full ${
        primary ? "border-[#E63329]" : "border-gray-700"
      }`}
    >
      <span className="text-xs font-mono text-[#E63329] uppercase tracking-widest">
        {badge}
      </span>
      <h3
        className="text-2xl font-bold text-white uppercase"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
      >
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <ul className="flex flex-col gap-2 flex-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckIcon />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {onClick ? (
        <button onClick={onClick} disabled={disabled || loading} className={btnClass}>
          {loading ? <SpinnerIcon /> : null}
          {loading ? (loadingLabel ?? "Checking...") : cta}
        </button>
      ) : href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={btnClass}
        >
          {cta}
        </a>
      ) : null}
    </div>
  );

  return content;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CertificationStatus() {
  const [, setLocation] = useLocation();

  const [daysCompleted, setDaysCompleted] = useState<number | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [reason, setReason] = useState<string>("tenure_too_short");
  const [email, setEmail] = useState<string>("");

  // Re-check state
  const [recheckLoading, setRecheckLoading] = useState(false);
  const [recheckMessage, setRecheckMessage] = useState<string | null>(null);
  const [recheckSuccess, setRecheckSuccess] = useState(false);
  const [recheckStage, setRecheckStage] = useState<"idle" | "triggering" | "syncing" | "done">("idle");

  useEffect(() => {
    const raw = sessionStorage.getItem("cert_gate_result");
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data.daysCompleted !== undefined) setDaysCompleted(data.daysCompleted);
        if (data.daysRemaining !== undefined) setDaysRemaining(data.daysRemaining);
        if (data.reason) setReason(data.reason);
        if (data.email) setEmail(data.email);
      } catch {
        // ignore
      }
    }
    // Also try to get email from sessionStorage directly
    const storedEmail = sessionStorage.getItem("cert_gate_email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const isTenureBlock = reason === "tenure_too_short";
  const isNotFound = reason === "not_found";

  // "I just upgraded on Skool" re-check handler
  // Triggers the full Railway Skool→CRM sync, then polls until the plan flips.
  async function handleRecheck() {
    if (!email) {
      setRecheckMessage("We don't have your email on file. Please go back and re-enter it.");
      return;
    }
    setRecheckLoading(true);
    setRecheckMessage(null);
    setRecheckStage("triggering");

    // Show a staged progress message so the user knows what's happening
    // The server will poll for up to 3 minutes, so we update the UI message
    // at intervals to prevent the user from thinking it's frozen.
    const stageTimer = setTimeout(() => {
      setRecheckStage("syncing");
      setRecheckMessage("Sync in progress — pulling your latest membership data from Skool. This takes about 60–90 seconds...");
    }, 5000);

    try {
      const resp = await fetch("/api/recheck-certification-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      clearTimeout(stageTimer);
      setRecheckStage("done");
      const data = await resp.json();

      if (data.eligible) {
        setRecheckSuccess(true);
        setRecheckMessage("Upgrade confirmed! Redirecting you to the certification test...");
        sessionStorage.setItem("cert_gate_result", JSON.stringify({ eligible: true }));
        setTimeout(() => setLocation("/certification?bypass=1"), 1800);
      } else if (data.message) {
        // Server returned a specific message (sync ran but plan didn't flip)
        setRecheckMessage(data.message);
      } else if (data.reason === "tenure_too_short") {
        setRecheckMessage(
          `Sync complete — your account is still showing as Monthly. If you just upgraded on Skool, please wait 2–3 minutes and try again. Or use the Fast-Pass below to unlock right now.`
        );
      } else {
        setRecheckMessage(
          "We couldn't verify an Annual membership for that email. Make sure you upgraded at skool.com/aifilmacademy/plans and used the same email address."
        );
      }
    } catch {
      clearTimeout(stageTimer);
      setRecheckStage("done");
      setRecheckMessage("Something went wrong. Please try again in a moment.");
    } finally {
      setRecheckLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-16"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-10 text-center max-w-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#E63329] flex items-center justify-center rounded-sm">
            <span
              className="text-white text-xs font-bold"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              AFA
            </span>
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
            AI Film Academy
          </span>
        </div>

        <LockIcon />

        <h1
          className="text-4xl md:text-5xl font-bold text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
        >
          {isTenureBlock ? (
            <>
              Certification{" "}
              <span className="text-[#E63329]">Not Yet Unlocked</span>
            </>
          ) : isNotFound ? (
            <>
              Membership{" "}
              <span className="text-[#E63329]">Not Found</span>
            </>
          ) : (
            <>
              Access{" "}
              <span className="text-[#E63329]">Restricted</span>
            </>
          )}
        </h1>

        <p className="text-gray-400 text-base leading-relaxed">
          {isTenureBlock
            ? "The AI Media Specialist Certification is reserved for members who have demonstrated real commitment to the craft. Monthly members unlock it automatically after 90 days — or you can fast-track it right now."
            : isNotFound
            ? "We couldn't find an active AFA membership linked to that email. Join the community first, then come back to get certified."
            : "Your membership status doesn't currently qualify for certification access. Upgrade to unlock it instantly."}
        </p>

        {/* Tenure progress bar — only shown for tenure blocks */}
        {isTenureBlock &&
          daysCompleted !== null &&
          daysRemaining !== null && (
            <TenureProgressBar
              daysCompleted={daysCompleted}
              daysRemaining={daysRemaining}
            />
          )}
      </div>

      {/* Re-check feedback banner */}
      {recheckMessage && (
        <div
          className={`w-full max-w-4xl mb-6 px-5 py-4 rounded-lg border text-sm leading-relaxed ${
            recheckSuccess
              ? "bg-green-900/30 border-green-600 text-green-300"
              : "bg-yellow-900/20 border-yellow-600/50 text-yellow-300"
          }`}
        >
          {recheckMessage}
        </div>
      )}

      {/* Option Cards */}
      {isNotFound ? (
        // Not-found layout: single prominent CTA to join
        <div className="w-full max-w-lg">
          <OptionCard
            badge="Join the Community"
            title="Become a Member First"
            description="The certification is exclusive to AI Film Academy members. Join now and start your journey — you'll unlock the certification test after 90 days, or instantly with an Annual plan."
            bullets={[
              "Access to the full AFA curriculum",
              "Monthly plan: $19/month",
              "Annual plan: instant certification access",
              "Join 500+ AI filmmakers",
            ]}
            cta="Join AI Film Academy →"
            href="https://www.skool.com/aifilmacademy/about"
            primary
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Option A: Go Annual on Skool */}
          <OptionCard
            badge="Option A — Instant Unlock"
            title="Go Annual on Skool"
            description="Upgrade to an Annual membership on Skool and unlock certification immediately — plus save over 30% vs monthly billing."
            bullets={[
              "Instant certification access",
              "Save $79+ vs monthly billing",
              "Full community access",
              "Priority support",
            ]}
            cta="Upgrade on Skool →"
            href="https://www.skool.com/aifilmacademy/plans"
            primary
          />

          {/* Option B: Fast-Pass */}
          <OptionCard
            badge="Option B — Instant Unlock"
            title="Fast-Pass Fee"
            description="Pay a one-time $47 Fast-Pass to unlock the certification test right now, without changing your plan."
            bullets={[
              "Instant certification access",
              "Keep your current monthly plan",
              "One-time payment, no recurring charge",
              "Certification badge included",
            ]}
            cta="Pay $47 Fast-Pass →"
            href="https://buy.stripe.com/7sY3cu1Baggo3Kf3ny7Vm00"
          />

          {/* Option C: Wait / Already Upgraded re-check */}
          <OptionCard
            badge="Option C — Already Upgraded?"
            title={
              isTenureBlock && daysRemaining !== null
                ? `${daysRemaining} Days Away`
                : "Wait 3 Months"
            }
            description={
              isTenureBlock
                ? "Just upgraded to Annual on Skool? Hit the button below and we'll check your status right now. Our system syncs every 24 hours, so there may be a short delay."
                : "Stay on your current plan and your certification access will unlock automatically once you hit 90 days of membership."
            }
            bullets={
              isTenureBlock
                ? [
                    "Tap below after upgrading on Skool",
                    "We'll re-check your plan in real time",
                    "Instant redirect if upgrade is confirmed",
                    daysRemaining !== null
                      ? `Or auto-unlocks in ${daysRemaining} days`
                      : "Or auto-unlocks at day 90",
                  ]
                : [
                    "No additional cost",
                    "Automatic unlock at day 90",
                    "Keep building your skills in the meantime",
                    daysRemaining !== null
                      ? `Unlocks in approximately ${daysRemaining} days`
                      : "Unlocks after 90 days of membership",
                  ]
            }
            cta={isTenureBlock ? "I Just Upgraded — Check Now →" : "Return to Community →"}
            onClick={isTenureBlock ? handleRecheck : undefined}
            href={isTenureBlock ? undefined : "https://www.skool.com/aifilmacademy"}
            loading={recheckLoading}
            loadingLabel={
              recheckStage === "triggering"
                ? "Triggering sync..."
                : recheckStage === "syncing"
                ? "Syncing with Skool..."
                : "Checking..."
            }
          />
        </div>
      )}

      {/* Wrong email link */}
      <p className="text-sm text-gray-500">
        Wrong email?{" "}
        <button
          onClick={() => setLocation("/certification")}
          className="text-[#E63329] hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Try a different address
        </button>
      </p>
    </div>
  );
}
