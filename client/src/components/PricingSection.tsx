/*
 * PricingSection — Monthly + Annual pricing options
 * Design: "The Director's Cut" — two cards side by side, annual highlighted as best value
 */
import { useState } from "react";
import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";

const included = [
  "50+ video lessons (updated monthly)",
  "The AIFA Workflow System",
  "Curated AI tool stack guide",
  "Private community (1,100+ members)",
  "LinkedIn certification badge",
  "Cancel anytime — no contracts",
];

export default function PricingSection() {
  const skoolUrl = useSkoolUrl();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <div className="section-label mb-5">Pricing</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1",
              letterSpacing: "0.01em",
              color: "#F5F5F0",
            }}
          >
            One Price.
            <br />
            <span style={{ color: "oklch(0.48 0.22 25)" }}>
              Everything Included.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No upsells. No paywalls. No "premium tier." Everything in the Academy is included in your membership.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "text-white"
                : "text-white/40 hover:text-white/60"
            }`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: billingCycle === "monthly" ? "oklch(0.18 0 0)" : "transparent",
              border: billingCycle === "monthly" ? "1px solid oklch(0.3 0 0)" : "1px solid transparent",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billingCycle === "annual"
                ? "text-white"
                : "text-white/40 hover:text-white/60"
            }`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: billingCycle === "annual" ? "oklch(0.18 0 0)" : "transparent",
              border: billingCycle === "annual" ? "1px solid oklch(0.3 0 0)" : "1px solid transparent",
            }}
          >
            Annual
            <span
              className="text-xs px-2 py-0.5 rounded font-semibold"
              style={{
                background: "oklch(0.48 0.22 25)",
                color: "#F5F5F0",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.05em",
              }}
            >
              SAVE 40%
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Main pricing card */}
          <div
            className="rounded-xl p-8 border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.12 0 0) 0%, oklch(0.10 0.01 25) 100%)",
              borderColor: billingCycle === "annual" ? "oklch(0.48 0.22 25 / 0.5)" : "oklch(0.25 0 0)",
            }}
          >
            {/* Badge */}
            {billingCycle === "annual" && (
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded text-xs font-semibold"
                style={{
                  background: "oklch(0.48 0.22 25)",
                  color: "#F5F5F0",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                }}
              >
                BEST VALUE
              </div>
            )}
            {billingCycle === "monthly" && (
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded text-xs font-semibold"
                style={{
                  background: "oklch(0.22 0 0)",
                  color: "oklch(0.6 0 0)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                }}
              >
                MONTHLY
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <p className="text-white/40 text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {billingCycle === "annual" ? "Annual membership" : "Monthly membership"}
              </p>
              <div className="flex items-end gap-2">
                <span
                  className="stat-number"
                  style={{
                    fontSize: "5rem",
                    lineHeight: "1",
                    color: "#F5F5F0",
                  }}
                >
                  {billingCycle === "annual" ? "$149" : "$19"}
                </span>
                <span className="text-white/40 text-lg mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {billingCycle === "annual" ? "/year" : "/month"}
                </span>
              </div>
              {billingCycle === "annual" ? (
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-sm line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>$228/year</span>
                  <span className="text-green-400 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Save $79 — that's $12.42/mo</span>
                </div>
              ) : (
                <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Less than a Netflix subscription
                </p>
              )}
            </div>

            {/* Included items */}
            <div className="flex flex-col gap-3 mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.48 0.22 25)" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/75" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary pulse-cta w-full py-4 text-lg font-bold text-center block"
            >
              {billingCycle === "annual" ? "Get Annual Access — $149/yr →" : "Start Monthly — $19/mo →"}
            </a>
            <p className="text-center text-white/30 text-xs mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cancel anytime. No questions asked.
            </p>
          </div>

          {/* Comparison / context card */}
          <div className="flex flex-col gap-4">
            <div className="afa-card rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Compare the alternatives
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Hiring a video editor", price: "$500–$5,000/project", bad: true },
                  { label: "Random YouTube tutorials", price: "Free (but scattered)", bad: true },
                  { label: "Other AI courses", price: "$297–$997 one-time", bad: true },
                  { label: "AIFA — Monthly", price: "$19/month", bad: false },
                  { label: "AIFA — Annual", price: "$149/year (best value)", bad: false, highlight: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className={`text-sm ${row.bad ? "text-white/40 line-through" : row.highlight ? "text-white font-bold" : "text-white font-semibold"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {row.label}
                    </span>
                    <span
                      className={`text-xs font-medium ${row.bad ? "text-white/30" : ""}`}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: row.bad ? undefined : row.highlight ? "oklch(0.48 0.22 25)" : "oklch(0.6 0.1 25)",
                      }}
                    >
                      {row.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="afa-card rounded-xl p-6">
              <div className="section-label mb-3">Guarantee</div>
              <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Try it risk-free
              </h3>
              <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Join, explore everything, dive into the curriculum. If it's not the most valuable investment you've made in your creative career, cancel with one click. No hoops, no emails, no guilt.
              </p>
            </div>

            <div className="afa-card rounded-xl p-6 text-center">
              <p
                className="stat-number text-5xl mb-1"
                style={{ color: "oklch(0.48 0.22 25)" }}
              >
                1,100+
              </p>
              <p className="text-white/50 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                creators already inside
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
