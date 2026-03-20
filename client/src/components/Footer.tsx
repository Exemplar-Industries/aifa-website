/*
 * Footer — Minimal, legal, links
 * Design: "The Director's Cut" — dark, clean, no clutter
 */

import { useSkoolUrl } from "@/contexts/AffiliateLinkContext";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-logo-long_9672f3eb.png";

export default function Footer() {
  const skoolUrl = useSkoolUrl();
  return (
    <footer className="bg-[#060606] border-t border-white/5">
      <div className="container py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <img
              src={LOGO_URL}
              alt="AI Film Academy (AIFA)"
              className="h-10 w-auto object-contain mb-4"
              style={{ maxWidth: '160px', filter: 'brightness(0) invert(1) opacity(0.7)' }}
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The professional standard for AI filmmaking education. Join 1,100+ creators mastering the future of film.
            </p>
          </div>

          {/* Academy */}
          <div>
            <h4
              className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
            >
              Academy
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "What You Get", href: "#what-you-get" },
                { label: "The Workflow", href: "#workflow" },
                { label: "Pricing", href: "#pricing" },
                { label: "Join Now", href: skoolUrl, external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4
              className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
            >
              Community
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Skool Community", href: skoolUrl, external: true },
                { label: "YouTube Channel", href: "https://www.youtube.com/@aifilmacademy", external: true },
                { label: "Instagram", href: "https://www.instagram.com/aifilmacademy", external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
            >
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact Us", href: "mailto:hello@aifilmacademy.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} AI Film Academy™ (AIFA). All rights reserved.
          </p>
          <p className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Built for creators who refuse to fall behind.
          </p>
        </div>
      </div>
    </footer>
  );
}
