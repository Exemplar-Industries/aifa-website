import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type SeoPage = {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  type?: "website" | "article";
  schema?: "collection" | "article";
  publishedDate?: string;
  modifiedDate?: string;
};

const SITE_ORIGIN = "https://www.aifilmacademy.com";
const SITE_NAME = "AI Film Academy";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/afa-icon-180.png`;

const DEFAULT_SEO: SeoPage = {
  title: "AI Film Academy™ | Learn AI Filmmaking and Build Your Portfolio",
  description:
    "Learn a director-led AI filmmaking workflow to create films, ads, trailers, and animation with practical feedback, portfolio support, events, and certification.",
  canonicalPath: "/",
  type: "website",
};

const ROUTE_SEO: Record<string, SeoPage> = {
  "/": DEFAULT_SEO,
  "/cref": {
    title: "Character Reference Sheet | AI Film Academy",
    description: "Download the AI Film Academy character reference sheet for directing character look, wardrobe, and angles.",
    noindex: true,
  },
  "/resources": {
    title: "Free AI Filmmaking Resources | AI Film Academy",
    description:
      "Use AIFA’s practical AI filmmaking field guides for the full film workflow, six-shot storyboards, character consistency, Google Flow footage, and the final cut.",
    type: "website",
    schema: "collection",
  },
  "/resources/workflows/how-to-make-an-ai-film": {
    title: "How to Make an AI Short Film: The AIFA Workflow | AI Film Academy",
    description:
      "Make an AI short film with AIFA’s practical workflow: character sheets, location design, shot lists, Google Flow footage, editing, music, sound, and voiceover.",
    type: "article",
    schema: "article",
    publishedDate: "2026-09-03",
    modifiedDate: "2026-09-17",
  },
  "/resources/workflows/ai-character-consistency": {
    title: "How to Keep AI Characters Consistent Across Scenes | AI Film Academy",
    description:
      "Keep AI characters consistent with AIFA’s practical system: character bible, world reference, Google Flow Ingredients, approved frames, and a continuity pass before editing.",
    type: "article",
    schema: "article",
    publishedDate: "2026-09-03",
    modifiedDate: "2026-09-03",
  },
  "/resources/templates/ai-storyboard-template": {
    title: "AI Storyboard Template for a Short Film | AI Film Academy",
    description:
      "Build an AI film storyboard with AIFA’s practical workflow: a six-shot Google Docs list, camera-first decisions, and a Canva Whiteboard review before Google Flow.",
    type: "article",
    schema: "article",
    publishedDate: "2026-09-22",
    modifiedDate: "2026-09-22",
  },
  "/free-video-training": {
    title: "Free AI Filmmaking Training | AI Film Academy",
    description:
      "Watch free AI filmmaking training and learn the practical workflow behind portfolio-ready AI films, trailers, ads, and animation.",
  },
  "/certification": {
    title: "AI Filmmaking Certification | AI Film Academy",
    description:
      "Explore AI Film Academy certification and the portfolio-ready creative standards it is designed to help members demonstrate.",
  },
  "/certification-status": {
    title: "Certification status | AI Film Academy",
    description: "Enter the email you joined with to open the AI Film Academy certification test.",
    noindex: true,
  },
  "/work-with-brandon": {
    title: "Work with Brandon Patino | AI Film Academy",
    description: "AI production, workshops, and creative AI consulting for brands, schools, and organizations.",
  },
  "/showcase": {
    title: "AI Filmmaking Showcase | AI Film Academy",
    description:
      "Explore original AI filmmaking work, creator projects, and portfolio-ready visual storytelling from the AI Film Academy community.",
  },
  "/productions": {
    title: "AI Video Production for Brands | AI Film Academy",
    description:
      "Work with AI Film Academy on director-led AI video production for brands, campaigns, trailers, and visual storytelling projects.",
  },
  "/consulting": {
    title: "AI Filmmaking Consulting | AI Film Academy",
    description:
      "Get focused AI filmmaking consulting for creative workflow, production strategy, tools, and portfolio-ready execution.",
  },
  "/education-events": {
    title: "AI Filmmaking Education and Events | AI Film Academy",
    description:
      "Explore AI filmmaking education, events, and creative-learning experiences from AI Film Academy.",
  },
  "/faq": {
    title: "AI Film Academy FAQs | Course, Workflow, and Certification",
    description:
      "Find answers to common questions about the AI Film Academy course, AI filmmaking workflow, certification, feedback, and the creator community.",
  },
  "/contact": {
    title: "Contact AI Film Academy | Education and Production Inquiries",
    description:
      "Contact AI Film Academy about the course, certification, consulting, and AI video production inquiries.",
  },
  "/connect": {
    title: "Connect With AI Film Academy",
    description:
      "Connect with AI Film Academy and discover practical AI filmmaking education, creator resources, and production support.",
  },
  "/refund-policy": {
    title: "Refund Policy | AI Film Academy",
    description: "Review the AI Film Academy refund policy.",
    noindex: true,
  },
  "/terms": {
    title: "Terms of Service | AI Film Academy",
    description: "Review the AI Film Academy terms of service.",
    noindex: true,
  },
  "/privacy": {
    title: "Privacy Policy | AI Film Academy",
    description: "Review the AI Film Academy privacy policy.",
    noindex: true,
  },
  "/membership/success": {
    title: "Purchase confirmation | AI Film Academy",
    description: "Your AI Film Academy course purchase confirmation.",
    noindex: true,
  },
  "/internal/lessons": {
    title: "Member Lessons | AI Film Academy",
    description: "AI Film Academy member lessons.",
    noindex: true,
  },
};

function getPage(pathname: string): SeoPage {
  if (pathname === "/work-with-us") {
    return { ...ROUTE_SEO["/contact"], canonicalPath: "/contact" };
  }

  if (pathname.startsWith("/lessons/")) {
    return {
      title: "Member Lesson | AI Film Academy",
      description: "AI Film Academy member lesson.",
      noindex: true,
    };
  }

  if (pathname.startsWith("/internal/slide-archive")) {
    return {
      title: "Private Slide Archive | AI Film Academy",
      description: "AI Film Academy internal slide archive.",
      noindex: true,
    };
  }

  if (
    pathname.startsWith("/genjam-") ||
    pathname.startsWith("/genjam/") ||
    pathname === "/lpv3" ||
    pathname === "/anthum-exclusive" ||
    pathname === "/live-exclusive"
  ) {
    return {
      title: "AI Film Academy",
      description: "AI Film Academy creator experience.",
      noindex: true,
    };
  }

  return ROUTE_SEO[pathname] ?? {
    title: "Page Not Found | AI Film Academy",
    description: "The requested AI Film Academy page could not be found.",
    noindex: true,
  };
}

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function setLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function getStructuredData(canonicalUrl: string, page: SeoPage) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: DEFAULT_IMAGE,
    description: DEFAULT_SEO.description,
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };

  if (canonicalUrl === `${SITE_ORIGIN}/`) {
    return { "@context": "https://schema.org", "@graph": [organization, website] };
  }

  const webPage = {
    "@type": page.schema === "collection" ? "CollectionPage" : "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "AI Film Academy", item: SITE_ORIGIN },
    ...(page.schema ? [{ "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_ORIGIN}/resources` }] : []),
    ...(canonicalUrl !== `${SITE_ORIGIN}/resources` && page.schema
      ? [{ "@type": "ListItem", position: 3, name: page.title.replace(/\s+\|\s+AI Film Academy$/, ""), item: canonicalUrl }]
      : []),
  ];
  const graph: Record<string, unknown>[] = [organization, website, webPage];

  if (page.schema === "collection") {
    graph.push(
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#workflow-library`,
        name: "AIFA Filmmaking Workflow Library",
        numberOfItems: 3,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "How to Make an AI Short Film", item: `${SITE_ORIGIN}/resources/workflows/how-to-make-an-ai-film` },
          { "@type": "ListItem", position: 2, name: "AI Storyboard Template for a Short Film", item: `${SITE_ORIGIN}/resources/templates/ai-storyboard-template` },
          { "@type": "ListItem", position: 3, name: "How to Keep AI Characters Consistent Across Scenes", item: `${SITE_ORIGIN}/resources/workflows/ai-character-consistency` },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs,
      },
    );
  }

  if (page.schema === "article") {
    graph.push(
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: page.title.replace(/\s+\|\s+AI Film Academy$/, ""),
        description: page.description,
        mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
        author: { "@id": `${SITE_ORIGIN}/#organization` },
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        ...(page.publishedDate ? { datePublished: page.publishedDate } : {}),
        ...(page.modifiedDate ? { dateModified: page.modifiedDate } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs,
      },
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default function Seo() {
  const [location] = useLocation();

  useEffect(() => {
    const pathname = location.split("?")[0] || "/";
    const page = getPage(pathname);
    const canonicalPath = page.canonicalPath ?? pathname;
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, "")}`;

    document.title = page.title;
    setMeta('meta[name="description"]', { name: "description", content: page.description });
    setMeta('meta[name="robots"]', { name: "robots", content: page.noindex ? "noindex,follow" : "index,follow" });
    setLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: page.type ?? "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });

    let structuredData = document.head.querySelector<HTMLScriptElement>("#aifa-seo-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "aifa-seo-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.text = JSON.stringify(getStructuredData(canonicalUrl, page));

    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
    });
  }, [location]);

  useEffect(() => {
    function trackCta(event: MouseEvent) {
      const target = event.target as Element | null;
      const element = target?.closest("a, button") as HTMLAnchorElement | HTMLButtonElement | null;
      if (!element || element.hasAttribute("data-aifa-tracked")) return;

      const label = (element.textContent || "").replace(/\s+/g, " ").trim();
      const href = element instanceof HTMLAnchorElement ? element.href : "";
      const path = href ? new URL(href, window.location.origin).pathname : "";
      let eventName = "";
      const params: Record<string, string> = { cta_text: label };

      if (path === "/membership" || href.startsWith("https://www.skool.com/aifilmacademy/about")) eventName = "aifa_membership_cta_click";
      else if (path === "/free-video-training") eventName = "aifa_free_training_click";
      else if (path === "/contact" || path === "/work-with-us") eventName = "aifa_contact_cta_click";
      else if (path === "/productions") eventName = "aifa_production_cta_click";
      else if (path === "/certification") eventName = "aifa_certification_cta_click";
      else if (label === "Start Monthly Membership") {
        eventName = "aifa_checkout_start";
        params.billing_cycle = "monthly";
      } else if (label === "Start Annual Membership") {
        eventName = "aifa_checkout_start";
        params.billing_cycle = "annual";
      }

      if (!eventName) return;
      element.setAttribute("data-aifa-tracked", "true");
      window.gtag?.("event", eventName, params);
      window.setTimeout(() => element.removeAttribute("data-aifa-tracked"), 1000);
    }

    document.addEventListener("click", trackCta, true);
    return () => document.removeEventListener("click", trackCta, true);
  }, []);

  return null;
}
