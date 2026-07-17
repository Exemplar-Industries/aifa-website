/*
 * AI Film Academy — Global Footer
 * Design: "The Director's Cut" — compact utility navigation with clear discovery paths.
 * Pricing is intentionally absent; social and learning destinations remain easy to find.
 */

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/afa-logo-long_9672f3eb.png";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "FAQ", href: "/faq" },
      { label: "Showcase", href: "/showcase" },
      { label: "Join AIFA", href: "https://www.skool.com/aifilmacademy/about", external: true },
    ],
  },
  {
    heading: "Learn & Follow",
    links: [
      { label: "Free Workshop", href: "https://workshop.aifilmacademy.com/", external: true },
      { label: "YouTube", href: "https://www.youtube.com/channel/UC1zRjoLJcN4cuMLs_A7kIMg", external: true },
      { label: "Instagram", href: "https://www.instagram.com/theaifilmacademy/", external: true },
      { label: "Email Us", href: "mailto:hello@aifilmacademy.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#050505]">
      <div className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <a href="/" className="inline-flex items-center" aria-label="AI Film Academy home">
              <img
                src={LOGO_URL}
                alt="AI Film Academy"
                className="h-11 w-auto object-contain opacity-75"
                style={{ maxWidth: "190px", filter: "brightness(0) invert(1)" }}
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
              A clear workflow, expert feedback, and a creative community for building premium AI films—and a portfolio worth sharing.
            </p>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="mb-4 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/65">{column.heading}</h2>
                <div className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/38 transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/22">© {new Date().getFullYear()} AI Film Academy™. All rights reserved.</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/20">Create · Improve · Build</p>
        </div>
      </div>
    </footer>
  );
}
