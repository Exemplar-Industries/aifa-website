import { useEffect, useState } from "react";
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
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">
        <span>Day {daysCompleted}</span>
        <span>{daysRemaining} days remaining</span>
        <span>Day 90</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E63329] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-center text-xs text-gray-500 mt-2 font-mono">
        {pct}% of the way to automatic unlock
      </p>
    </div>
  );
}

// ─── OPTION CARD ─────────────────────────────────────────────────────────────
function OptionCard({
  badge,
  title,
  description,
  bullets,
  cta,
  href,
  primary,
}: {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-sm border ${
        primary
          ? "border-[#E63329] bg-[#1a0a09]"
          : "border-white/10 bg-white/5"
      } p-6 gap-4`}
    >
      {primary && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E63329] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
          Recommended
        </div>
      )}
      <div className="text-xs font-mono text-[#E63329] uppercase tracking-widest">
        {badge}
      </div>
      <h3
        className="text-xl font-bold text-white uppercase tracking-wide"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      <ul className="flex flex-col gap-2 flex-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckIcon />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`mt-2 w-full py-3 text-center text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
          primary
            ? "bg-[#E63329] text-white hover:bg-[#c42b22]"
            : "border border-white/20 text-white hover:bg-white/10"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {cta}
      </a>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CertificationStatus() {
  const [, setLocation] = useLocation();

  // Read state passed via sessionStorage from the gate check
  const [daysCompleted, setDaysCompleted] = useState<number | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [reason, setReason] = useState<string>("tenure_too_short");

  useEffect(() => {
    const raw = sessionStorage.getItem("cert_gate_result");
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data.daysCompleted !== undefined) setDaysCompleted(data.daysCompleted);
        if (data.daysRemaining !== undefined) setDaysRemaining(data.daysRemaining);
        if (data.reason) setReason(data.reason);
      } catch {
        // ignore
      }
    }
  }, []);

  const isTenureBlock = reason === "tenure_too_short";
  const isNotFound = reason === "not_found";
  const isNotActive = reason === "not_active_member";

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
            ? "We couldn't find an active AFA membership linked to that email. Join the community to access the certification test."
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

      {/* Option Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <OptionCard
          badge="Option A — Instant Unlock"
          title="Go Annual"
          description="Upgrade to an Annual membership and unlock certification immediately — plus save over 30% vs monthly."
          bullets={[
            "Instant certification access",
            "Save $79+ vs monthly billing",
            "Full community access",
            "Priority support",
          ]}
          cta="Upgrade to Annual →"
          href="https://www.skool.com/aifilmacademy/about?showPlans=true"
          primary
        />

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
          href="https://buy.stripe.com/aifa-certification-fastpass"
        />

        <OptionCard
          badge="Option C — Auto Unlock"
          title={
            isTenureBlock && daysRemaining !== null
              ? `${daysRemaining} Days Away`
              : "Wait 3 Months"
          }
          description="Stay on your current plan and your certification access will unlock automatically once you hit 90 days of membership."
          bullets={[
            "No additional cost",
            "Automatic unlock at day 90",
            "Keep building your skills in the meantime",
            daysRemaining !== null
              ? `Unlocks in approximately ${daysRemaining} days`
              : "Unlocks after 90 days of membership",
          ]}
          cta="Return to Community →"
          href="https://www.skool.com/aifilmacademy"
        />
      </div>

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
