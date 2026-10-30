import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import PageMeta from "@/components/PageMeta";

const JOIN_URL = "https://www.skool.com/aifilmacademy/about";

function LockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E63329]">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E63329] flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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
  const btnClass = "mt-auto w-full py-3 px-4 rounded text-sm font-semibold uppercase tracking-wider text-white flex items-center justify-center";

  return (
    <div className={`flex flex-col bg-[#111] border rounded-lg p-6 gap-4 h-full ${primary ? "border-[#E63329]" : "border-gray-700"}`}>
      <span className="text-xs font-mono text-[#E63329] uppercase tracking-widest">{badge}</span>
      <h3 className="text-2xl font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <ul className="flex flex-col gap-2 flex-1">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckIcon />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <a href={href} target="_blank" rel="noopener noreferrer" className={btnClass} style={{ backgroundColor: "var(--afa-red)", color: "#ffffff" }}>{cta}</a>
    </div>
  );
}

export default function CertificationStatus() {
  const [, setLocation] = useLocation();
  const [reason, setReason] = useState("not_found");

  useEffect(() => {
    const raw = sessionStorage.getItem("cert_gate_result");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.reason) setReason(data.reason);
    } catch {
      // Ignore a bad stored result and keep the not-found message.
    }
  }, []);

  const isNotFound = reason === "not_found";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Certification status | AI Film Academy"
        description="Check the email you joined with to open the AI Film Academy certification test."
        path="/certification-status"
        noIndex
      />

      <div className="flex flex-col items-center gap-4 mb-10 text-center max-w-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#E63329] flex items-center justify-center rounded-sm">
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>AIFA</span>
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">AI Film Academy</span>
        </div>
        <LockIcon />
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
          {isNotFound ? <>Email <span className="text-[#E63329]">not found</span></> : <>Access <span className="text-[#E63329]">not confirmed</span></>}
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          {isNotFound
            ? "We could not find a course purchase for that email. Join AI Film Academy, then come back and enter the email you joined with."
            : "That email is on file, and it is not marked as an active course purchase. Try the email you joined with, or join and use that same email."}
        </p>
      </div>

      <div className="w-full max-w-lg mb-12">
        <OptionCard
          badge="Join the course"
          title="Join AI Film Academy"
          description="The certification test is for people who have joined the course. The public price is $500 one time and includes the community."
          bullets={[
            "Self-paced course and the community",
            "Enter the email you joined with when you return",
            "500+ AI filmmakers",
          ]}
          cta="Join AI Film Academy"
          href={JOIN_URL}
          primary
        />
      </div>

      <p className="text-sm text-gray-500">
        Wrong email?{" "}
        <button onClick={() => setLocation("/certification")} className="text-[#E63329] hover:underline cursor-pointer bg-transparent border-none p-0">
          Try the email you joined with
        </button>
      </p>
    </div>
  );
}
