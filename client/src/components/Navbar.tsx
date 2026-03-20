/*
 * Navbar — Minimal, sticky, dark
 * Design: "The Director's Cut" — transparent on top, dark on scroll
 */
import { useState, useEffect } from "react";

const SKOOL_URL = "https://www.skool.com/aifilmacademy";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-logo-long_9672f3eb.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "What You Get", href: "#what-you-get" },
    { label: "Workflow", href: "#workflow" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="AI Film Academy"
            className="h-10 w-auto object-contain"
            style={{ maxWidth: '180px', filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2 text-sm font-semibold hidden sm:flex"
          >
            Join for $19/mo
          </a>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-white/5 px-5 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-white/70 hover:text-white transition-colors font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-3 text-base font-semibold text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Join for $19/mo
          </a>
        </div>
      )}
    </nav>
  );
}
