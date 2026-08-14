/*
 * AI Film Academy - Global Navigation
 * Persistent public-site shell with the complete AFA sitemap.
 */

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "/assets/afa-logo-horizontal.png";

const navLinks = [
  { label: "Membership", href: "/membership" },
  { label: "Showcase", href: "/showcase" },
  { label: "AI Film Events", href: "/events" },
  { label: "Productions", href: "/productions" },
  { label: "GenJams & Workshops", href: "/education-events" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky inset-x-0 top-0 z-[100] border-b transition-colors duration-200 ${
        scrolled || menuOpen
          ? "border-white/15 bg-[#080808]/98 backdrop-blur-xl"
          : "border-white/12 bg-[#090909]"
      }`}
    >
      <div className="container flex min-h-[4.75rem] items-center justify-between gap-4">
        <a href="/" className="group flex shrink-0 items-center" aria-label="AI Film Academy home">
          <img
            src={LOGO_URL}
            alt="AI Film Academy"
            className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            style={{ maxWidth: "190px" }}
          />
        </a>

        <div className="hidden min-w-0 items-center justify-center gap-x-5 gap-y-2 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[0.98rem] font-semibold text-white/85 transition-colors duration-150 hover:text-[#ff7068]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="/free-video-training"
            className="btn-primary inline-flex min-h-11 items-center gap-2 px-3.5 py-2.5 text-[0.92rem] font-bold sm:px-4"
          >
            <span className="hidden sm:inline">Watch Free Training</span>
            <span className="sm:hidden">Free Training</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#ff7068] hover:text-[#ff7068] xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="afa-mobile-menu"
            aria-label={menuOpen ? "Close site menu" : "Open site menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="afa-mobile-menu" className="border-t border-white/15 bg-[#080808] xl:hidden">
          <div className="container grid gap-0 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-white/12 py-4 text-[1.08rem] font-semibold text-white/90 transition-colors hover:text-[#ff7068]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/free-video-training"
              className="btn-primary mt-4 inline-flex min-h-12 items-center justify-center px-5 py-3 text-[1rem] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Watch Free Training
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
