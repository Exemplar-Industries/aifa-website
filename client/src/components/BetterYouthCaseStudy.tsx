import { ArrowRight, Download } from "lucide-react";

const ASSETS = "/assets/better-youth-2026";
const PHOTOS = [
  { file: "coaching.webp", alt: "Brandon guides a participant through creative work at a laptop.", caption: "Live guidance, room to experiment." },
  { file: "teamwork.webp", alt: "Two participants share a smile while working together at a laptop.", caption: "Creative decisions made together." },
  { file: "storyboards.webp", alt: "A laptop displays a grid of visual story references during the workshop.", caption: "Story ideas become visible." },
];

export default function BetterYouthCaseStudy() {
  return (
    <section className="events-section by-case" id="better-youth" aria-labelledby="by-case-heading">
      <style>{`
        .by-case { background: #f0efe8; color: #171914; scroll-margin-top: 5rem; }
        .by-case-top { display: grid; grid-template-columns: 1.1fr 1fr; gap: 3rem; align-items: end; margin-bottom: 2.5rem; }
        .by-case-label { margin: 0 0 1.1rem; color: #526332; font-size: .8rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
        .by-case h2 { margin: 0; font-size: clamp(3.3rem, 6.8vw, 6.3rem); }
        .by-case h2 span { color: #526332; }
        .by-case-intro { margin: 0; max-width: 33rem; font-size: 1.1rem; line-height: 1.65; }
        .by-case-meta { margin: 1rem 0 0; color: #4e5547; font-size: .88rem; line-height: 1.6; }
        .by-case-film { margin: 0; }
        .by-case-film video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #171914; border-radius: 10px; }
        .by-case-film figcaption { display: flex; justify-content: space-between; flex-wrap: wrap; gap: .4rem; margin-top: .8rem; color: #4e5547; font-size: .82rem; line-height: 1.5; }
        .by-case-gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; margin-top: 2.4rem; }
        .by-case-gallery figure { margin: 0; }
        .by-case-gallery img { display: block; width: 100%; height: auto; aspect-ratio: 3 / 2; border-radius: 7px; }
        .by-case-gallery figcaption { margin-top: .75rem; font-size: .94rem; font-weight: 700; line-height: 1.5; }
        .by-case-bottom { display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-top: 2.7rem; padding-top: 2rem; border-top: 1px solid #ced1c4; }
        .by-case-bottom p { max-width: 35rem; margin: 0; font-size: 1rem; line-height: 1.6; }
        .by-case-actions { display: flex; flex-wrap: wrap; gap: .85rem 1.5rem; }
        .by-case-actions a { display: inline-flex; align-items: center; gap: .55rem; color: #26331a; font-weight: 800; text-decoration: underline; text-underline-offset: .3em; line-height: 1.5; }
        .by-case a:focus-visible, .by-case video:focus-visible { outline: 3px solid #526332; outline-offset: 5px; }
        @media (max-width: 820px) { .by-case-top { grid-template-columns: 1fr; gap: 1.5rem; } .by-case-bottom { align-items: flex-start; flex-direction: column; } }
        @media (max-width: 540px) { .by-case-gallery { grid-template-columns: 1fr; gap: 1.6rem; } }
      `}</style>
      <div className="events-shell">
        <div className="by-case-top">
          <div>
            <p className="by-case-label">Inside a GenJam · Better Youth</p>
            <h2 className="events-display" id="by-case-heading">Human ideas.<br /><span>Shared possibilities.</span></h2>
          </div>
          <div>
            <p className="by-case-intro">Better Youth prepares foster and system-impacted young people for the creative economy. For this adult pilot, its participants came together to explore emerging technology through a hands-on, team-based storytelling workshop.</p>
            <p className="by-case-meta">August 29, 2026 · El Segundo, California<br />Six-hour GenJam · Facilitated by AI Film Academy</p>
          </div>
        </div>
        <figure className="by-case-film">
          <video controls preload="none" playsInline poster={`${ASSETS}/group.webp`} aria-label="60-second Better Youth GenJam event highlights" aria-describedby="by-film-description">
            <source src={`${ASSETS}/genjam-60s.mp4`} type="video/mp4" />
            <a href={`${ASSETS}/genjam-60s.mp4`}>Download the 60-second event film.</a>
          </video>
          <figcaption id="by-film-description"><span>60 seconds inside the workshop: discussion, laptop exploration, live coaching, and sharing visual ideas.</span><span>Event media: Jonathan Waas</span></figcaption>
        </figure>
        <div className="by-case-gallery">
          {PHOTOS.map(photo => <figure key={photo.file}><img src={`${ASSETS}/${photo.file}`} alt={photo.alt} width={1200} height={800} loading="lazy" decoding="async" /><figcaption>{photo.caption}</figcaption></figure>)}
        </div>
        <div className="by-case-bottom">
          <p>Give your people a shared creative challenge, practical guidance, and space to explore what emerging technology can make possible.</p>
          <div className="by-case-actions">
            <a href={`${ASSETS}/BetterYouth-GenJam-Case-Study.pdf`} download>Read the case study <Download size={17} aria-hidden="true" /></a>
            <a href="#event-inquiry">Plan your GenJam <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
