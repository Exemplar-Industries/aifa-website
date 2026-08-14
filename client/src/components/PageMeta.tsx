import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_URL = "https://www.aifilmacademy.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/afa-cinematic-mark.png`;

function upsertMeta(selector: string, attribute: "name" | "property", value: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector.includes('="') ? selector.split('="')[0].replace("meta[", "").replace("[", "") : attribute);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, selector.match(/(?:name|property)="([^"]+)"/)?.[1] ?? "");
  element.content = value;
}

export default function PageMeta({ title, description, path, noIndex = false, structuredData }: PageMetaProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;
    document.title = title;

    upsertMeta('meta[name="description"]', "name", description);
    upsertMeta('meta[property="og:title"]', "property", title);
    upsertMeta('meta[property="og:description"]', "property", description);
    upsertMeta('meta[property="og:url"]', "property", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", DEFAULT_OG_IMAGE);
    upsertMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", title);
    upsertMeta('meta[name="twitter:description"]', "name", description);

    let robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = noIndex ? "noindex,nofollow" : "index,follow";

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existing = document.getElementById("aifa-page-structured-data");
    if (existing) existing.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.id = "aifa-page-structured-data";
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("aifa-page-structured-data")?.remove();
    };
  }, [description, noIndex, path, structuredData, title]);

  return null;
}
