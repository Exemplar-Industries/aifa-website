import { useEffect } from "react";

/**
 * Better Youth GenJam — production AIFA presentation route.
 * This unlisted route removes public-site chrome and presents the independently audited live deck at full viewport size.
 */
export default function BetterYouthGenJam() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Better Youth GenJam · AI Film Academy";
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow, noarchive, nosnippet, noimageindex");
    return () => {
      document.title = previousTitle;
      if (created) robots?.remove();
      else robots?.setAttribute("content", previousRobots ?? "");
    };
  }, []);

  return <main style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#141b34" }}>
    <iframe
      src="https://3000-ip87un9g7h5on4x739x25-87e4e321.us2.manus.computer/studio/genjam-0829"
      title="Better Youth GenJam"
      allow="autoplay; fullscreen"
      style={{ display: "block", width: "100%", height: "100%", border: 0, background: "#141b34" }}
    />
  </main>;
}
