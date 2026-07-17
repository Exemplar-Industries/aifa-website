/*
 * AI Film Academy — Global Navigation
 * Design: "The Director's Cut" — transparent over cinematic heroes, solid on scroll.
 * IA: Home, FAQ, Showcase, and one clear Free Workshop conversion action. Showcase is ready for six verified creations.
 */

import { useEffect, useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-logo-long_9672f3eb.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq" },
  { label: "Showcase", href: "/showcase" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || menuOpen ? "border-white/8 bg-[#080808]/95 backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="/" className="group flex shrink-0 items-center" aria-label="AI Film Academy home">
          <img
            src={LOGO_URL}
            alt="AI Film Academy"
            className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            style={{ maxWidth: "180px", filter: "brightness(0) invert(1)" }}
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/58 transition-colors duration-150 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://workshop.aifilmacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden items-center gap-2 px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            Free Workshop <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-white/72 transition-colors hover:text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/8 bg-[#080808] md:hidden">
          <div className="container flex flex-col py-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="border-b border-white/8 py-4 text-base font-medium text-white/72" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="https://workshop.aifilmacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Free Workshop <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
