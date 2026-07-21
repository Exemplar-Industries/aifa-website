import { useEffect, useState } from "react";
import {
  Building2,
  Check,
  Clapperboard,
  Copy,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

/**
 * DESIGN REMINDER — /connect is an intentionally unlinked, no-indexed AIFA contact card.
 * It uses AIFA black/red, an authentic Brandon portrait, a native film player, and copy-only contact controls.
 */
const phoneNumber = "661-713-2851";
const emailAddress = "llcexemplar@gmail.com";
const portraitUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032668673/9znEqYZ2JpzLxCzomcgMbf/brandon-guinness_4043d965.webp";

const actions = [
  {
    label: "Visit My Website",
    href: "https://www.exemplarindustries.com/",
    icon: Building2,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/exemplar7",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theaifilmacademy/",
    icon: Instagram,
  },
  {
    label: "Email",
    href: `mailto:${emailAddress}`,
    icon: Mail,
  },
];

const stats = [
  { value: "30,000+", label: "Global Learners Reached" },
  { value: "5+", label: "B2B Educational Partnerships" },
  { value: "1,100+", label: "Private Community Members" },
];

type CopyTarget = "phone" | "email";

function copyFallback(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export default function Connect() {
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  useEffect(() => {
    const priorTitle = document.title;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const priorRobots = existingRobots?.getAttribute("content") ?? null;
    const robotsMeta = existingRobots ?? document.createElement("meta");

    if (!existingRobots) {
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    document.title = "Connect with Brandon Patino | AI Film Academy";
    robotsMeta.setAttribute("content", "noindex, nofollow, noarchive");

    return () => {
      document.title = priorTitle;
      if (existingRobots) {
        if (priorRobots === null) existingRobots.removeAttribute("content");
        else existingRobots.setAttribute("content", priorRobots);
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  async function handleCopy(value: string, target: CopyTarget) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      copyFallback(value);
    }

    setCopied(target);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <main className="connect-page">
      <article className="connect-card" aria-labelledby="connect-name">
        <section className="connect-identity">
          <div className="connect-portrait-frame">
            <img
              src={portraitUrl}
              alt="Brandon Patino holding his Guinness World Record certificate"
              className="connect-portrait"
            />
          </div>

          <div className="connect-summary">
            <p className="connect-kicker">AI Film Academy</p>
            <h1 id="connect-name">Brandon Patino</h1>
            <p className="connect-role">Founder, AI Film Academy</p>
            <p className="connect-description">
              I help brands create premium AI video and educational organizations implement ethical creative AI curriculum, workshops, and speaking events.
            </p>

            <div className="connect-copy-actions" aria-label="Copy Brandon Patino contact details">
              <button
                className="connect-copy-button connect-copy-primary"
                type="button"
                onClick={() => void handleCopy(phoneNumber, "phone")}
                aria-label={`Copy phone number ${phoneNumber}`}
              >
                {copied === "phone" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                <span>
                  <span className="connect-copy-label">
                    {copied === "phone" ? "Number copied" : "Text me"}
                  </span>
                  <span className="connect-copy-value">{phoneNumber}</span>
                </span>
              </button>

              <button
                className="connect-copy-button"
                type="button"
                onClick={() => void handleCopy(emailAddress, "email")}
                aria-label={`Copy email address ${emailAddress}`}
              >
                {copied === "email" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                <span>
                  <span className="connect-copy-label">
                    {copied === "email" ? "Email copied" : "Email me"}
                  </span>
                  <span className="connect-copy-value">{emailAddress}</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="connect-work" aria-labelledby="connect-work-title">
          <div className="connect-section-heading">
            <div>
              <p className="connect-kicker">Recent Work Example</p>
              <h2 id="connect-work-title">Machine Cinema Director&apos;s Cup — July 14</h2>
            </div>
            <Clapperboard aria-hidden="true" />
          </div>
          <video className="connect-video" controls playsInline preload="metadata">
            <source src="/assets/aifa-world-cup-short.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className="connect-results" aria-labelledby="connect-results-title">
          <div className="connect-results-copy">
            <p className="connect-kicker">AI Film Academy</p>
            <h2 id="connect-results-title">Results by the Numbers</h2>
            <p>
              AI Film Academy has supported workshops, curriculum, mentorship, and AI media events across more than five Southern California organizations—reaching over 30,000 learners through live education in addition to the global Academy community.
            </p>
          </div>
          <div className="connect-stats" aria-label="AI Film Academy results">
            {stats.map((stat) => (
              <div className="connect-stat" key={stat.label}>
                <span className="connect-stat-value">{stat.value}</span>
                <span className="connect-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className="connect-links" aria-label="Brandon Patino destinations">
          {actions.map(({ label, href, icon: Icon }) => (
            <a
              className="connect-link"
              href={href}
              key={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </article>
    </main>
  );
}
