# Reusable Playbook — Building a Premium GenJam Live Deck

## Purpose

Use this playbook to create a facilitator-led, animated GenJam or AI filmmaking workshop deck as a browser-native presentation. It is optimized for a project with a strong visual reference, approved media, participant handoffs, and a real production domain. It is **not** a process for generating a generic static slide deck.

## Decision gate: choose the correct medium

Choose a live web deck when the workshop needs motion, embedded video, a shareable link, keyboard/fullsreen controls, direct resource handoffs, timers, or rapid owner copy review. Choose PPT/PDF only when offline delivery or a conventional slide artifact is explicitly required. For live decks, decide the production host, canonical origin, and route slug before any visual work begins. [1]

| Requirement | Default decision | Acceptance evidence |
|---|---|---|
| Private pilot | Use an intentionally unlisted route; add `noindex` and avoid public navigation. | Route serves the deck and is absent from public menus. |
| Participant QR links | Create first-party, readable short routes where useful. | QR plus visible fallback opens the expected destination. |
| Video | Use the supplied native file in a source-ratio player. | Video plays, shows controls when required, and has no unintended bars/crop. |
| Owner review | Use a local `?edit=1` mode only if a small, reversible text-edit capability is requested. | Normal mode remains canonical; owner mode saves/exports a local draft. |
| Long duration | Open the working timer in a new tab, rather than pinning a clock over content. | Timer start/pause/reset works independently. |

## Phase 1 — Intake and source authority

Create a short source inventory before drafting slide copy. The source order matters: the event brief defines what the workshop must accomplish; the presenter establishes narrative and tone; the brand/reference system defines visual behavior; approved participant resources define the action screens; approved media determines what can be displayed. Do not substitute stock placeholders for materials the facilitator has said are decisive.

| Source | Extract immediately | Do not do |
|---|---|---|
| Event brief and schedule | Required modules, timeboxes, participant deliverables, tools, audience, and exclusions. | Infer a fixed duration or activity scope where the brief is flexible. |
| Presenter briefing | Story sequence, examples, taboo language, desired framing, and non-negotiable wording. | Lead with credentials/AI framing when the presenter has asked to lead with storytelling. |
| HTML reference deck / brand kit | DOM structure, CSS tokens, typography, content geometry, navigation, effect setup/cleanup, responsive rules, logos, and asset behavior. | Copy only colors and fonts, then claim a faithful adaptation. |
| Asset bundle | Original file dimensions, playback behavior, intended slide, attribution/usage constraints, approved logo variants. | Recreate a logo or crop a storyboard when an approved source is available. |
| Participant actions | Exact URLs, QR values, fallback label, redirects/downloads, access expectations. | Ship a QR-only handoff or a raw third-party link without testing. |

> **Rule:** Inspect the entire reference deck and its supporting scripts. The visual system is the behavior of the presentation, not a color palette.

## Phase 2 — Confirm the workshop narrative

Build content around facilitation order, not presentation tropes. A durable GenJam sequence is: welcome and agenda; host as storyteller; examples of prior craft and the new speed; clear human ownership; transition into the active GenJam; team/brief/character work; storyboarding; motion; edit; action handoffs; showcase and reflection. Adapt sections to the event brief, but do not omit the transition from discussion to making.

For a trust-sensitive adult pilot, keep the ethics statement concrete and limited: **concept, prompt, selection, revision, and final share** belong to people. State what will be demonstrated and leave room for questions. Avoid injecting unverified legal or policy claims.

## Phase 3 — Build the presentation system before the content

1. Create an immersive production route with no ordinary website chrome.
2. Implement a typed slide specification: ID, section, background, variant, headline, accent phrase, lede, optional cards, optional media, and optional console data.
3. Build a small stable variant set instead of bespoke markup for every slide.
4. Implement slide staging, hash navigation, keyboard commands, section jumping, fullscreen, and mobile behavior.
5. Port reference-derived animations and ambient effects with active-slide lifecycle cleanup and reduced-motion support.
6. Implement the lower identity rail and navigation chrome only after first content layouts clear the usable 16:9 field.

Use source-specific CSS and keep late production fixes in an override layer. The final Better Youth system uses `BetterYouthGenJam.tsx` for data/runtime, `genjam.css` for the broad visual grammar, and `genjam-overrides.css` for tested layout guards. [2]

## Phase 4 — Stage assets and action routes

Use final approved media at the beginning of the visual pass. Document each asset’s source ratio and treatment in a simple table. A storyboard or character sheet that conveys information should default to `object-fit: contain`; a film/video clip that fills a cinematic frame may use `object-fit: cover` inside an identically shaped player.

| Asset type | Display contract | Check before review |
|---|---|---|
| Presenter headshot | Clear, dignified crop that supports the host story. | Face, caption, and adjacent text remain visible. |
| Vertical/portrait photo | Dedicated frame with known crop rules. | No visual collision with labels or HUD. |
| Native 16:9 video | `aspect-ratio: 16 / 9`; full player; no improvised bars. | Play/pause, controls, poster, and size are correct. |
| Storyboard image | Preserve all frames with `contain` and a source-driven ratio. | Every frame is visible at presentation scale. |
| Character reference | Display a legible preview and use a first-party download route. | QR code and the visible fallback both open the resource. |
| Brand logo | Use source-approved horizontal asset at readable size. | Visual mark is legible against the rail and balanced with partner identity. |

Set the canonical origin once. Generate QR codes from exact URLs on that origin and print a visible fallback directly below. If the destination is a cloud file/folder, prefer a tested first-party short route that redirects to it. The Better Youth pattern is `https://www.aifilmacademy.com/genjam/submit` → the showcase Drive folder. [3]

## Phase 5 — Apply the visual contract

The reference deck visual language must be ported in layers: color tokens, typography, border/shadow geometry, grain/field treatment, content entry animation, controls, and responsive behavior. Do not introduce generic rounded-card/SaaS patterns just because components are available.

The Better Youth production contract included a cream/ink/pink/yellow/lime Machine Cinema palette, heavy Inter headlines, Space Mono labels, 4 px ink borders, hard shadows, paper-like texture, and active-slide motion. It also fixed the following hard limits: **no three-line desktop headings; no stranded punctuation; no large empty padding that crushes copy; no text/media overlap; no content beyond the 16:9 frame; no in-slide desktop scrolling; no duplicated rails/badges or repeated generic prompts.** [2] [4]

## Phase 6 — Add constrained owner edit mode only when requested

For owner-side copy review, expose `?edit=1` rather than creating a separate deck version. Mark intended text nodes as editable, save changed text locally, offer explicit save/export/reset controls, and leave normal presentation mode tied to the canonical source. Prevent edit-mode navigation from interfering with typing. [2]

Do not promise multi-user publishing, durable cloud drafts, or public content editing without a deliberately scoped authenticated backend. In the Better Youth context, local editing was right because the requirement was “one deck, temporarily editable on request,” not a CMS.

## Phase 7 — QA like a live show

Run the audits in this exact order. Do not report completion until all applicable checks have evidence.

1. **Content:** Presenter-first flow, agenda, activity sequence, ethical framing, adult-pilot language, correct tool names, resource paths, final slide count.
2. **Wide visual geometry:** Review cover, agenda, intro, dense card slide, every media slide, timer, character handoff, prompt, storyboard, motion, upload, reflection, and close at 16:9. Verify all text, punctuation, media and footer clearance.
3. **Media:** Play every video; confirm the video’s native format, controls/autoplay intent, and lack of synthetic side bars.
4. **Actions:** Open every fallback link, then scan/check every QR value. Verify redirects, downloads, and canonical host.
5. **Interactions:** Hash navigation, keyboard keys, section menu, fullscreen, wheel lock, touch swipe, edit mode, standalone timer, and reduced motion.
6. **Responsive:** Review dense screens on a narrow viewport. Hide/reposition chrome only where it collides; do not let mobile changes damage desktop.
7. **Build:** Run the project type check and production build. Address all errors before release.
8. **Production:** Confirm that the deployed canonical route, not merely the CI/build dashboard, shows the exact expected release.

## Phase 8 — Release and preserve the knowledge

Commit only intentional source and documentation changes. Keep a short production verification record that names the route, slide count, decisive visible fixes, resource URLs, and key commit. When the host reports a provider-side queue/incident, preserve the queued release and continue to verify the live route; do not call it released merely because local validation passed. [5]

Write a dated Master Knowledge Base handoff that links the canonical deck, repository, documentation directory, critical assets, major commits, and unresolved optional infrastructure work. Keep the document searchable by project name and date.

## References

[1]: ../../../../skills/genjam-live-decks/SKILL.md "Live GenJam deck workflow"
[2]: 01-live-deck-architecture-and-decision-log.md "Production architecture"
[3]: 00-better-youth-production-baseline.md "Verified resource handoffs"
[4]: ../client/src/genjam-overrides.css "Final visual constraints"
[5]: ../RAILWAY_DEPLOYMENT_DELAY_2026-08-28.md "Deployment verification lesson"
