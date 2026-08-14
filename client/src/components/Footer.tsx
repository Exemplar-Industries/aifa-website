/*
 * AI Film Academy - Global Footer
 * Readable public-site navigation with primary AFA social channels.
 */

const LOGO_URL = "/assets/afa-logo-horizontal.png";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    heading: "Start Here",
    links: [
      { label: "Explore Membership", href: "/membership" },
      { label: "Watch Free Training", href: "/free-video-training" },
      { label: "Showcase", href: "/showcase" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Explore AIFA",
    links: [
      { label: "AI Film Events", href: "/events" },
      { label: "Done-for-You Productions", href: "/productions" },
      { label: "GenJams & Workshops", href: "/education-events" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Follow AIFA",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/theaifilmacademy/", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/exemplar7", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#050505] text-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-12 xl:grid-cols-[1fr_2.8fr]">
          <div>
            <a href="/" className="inline-flex items-center" aria-label="AI Film Academy home">
              <img
                src={LOGO_URL}
                alt="AI Film Academy"
                className="h-11 w-auto object-contain opacity-95"
                style={{ maxWidth: "205px" }}
              />
            </a>
            <p className="mt-5 max-w-sm text-[1rem] leading-7 text-white/82">
              A clear workflow, expert feedback, and a creative community for building premium AI films and a portfolio worth sharing.
            </p>
          </div>

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="mb-4 text-[1rem] font-bold uppercase tracking-[0.08em] text-white">{column.heading}</h2>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[1rem] font-medium text-white/85 transition-colors hover:text-[#ff7068]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.94rem] text-white/72">© {new Date().getFullYear()} AI Film Academy. All rights reserved.</p>
          <p className="text-[0.94rem] font-semibold tracking-[0.04em] text-white/72">Create. Improve. Build.</p>
        </div>
      </div>
    </footer>
  );
}
