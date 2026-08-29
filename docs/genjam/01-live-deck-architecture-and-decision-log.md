# Better Youth GenJam — Live-Deck Architecture and Decision Log

## Architectural thesis

The Better Youth GenJam is not a static slide export dressed up as a web page. It is an **immersive, browser-native presentation system** built inside the production AI Film Academy React application. That decision made the motion, live navigation, resource handoffs, timer, media playback, and facilitator copy work as one experience rather than a collection of separate tools. The canonical implementation is a 33-slide map plus a small set of reusable render variants and runtime controls. [1]

The system was intentionally built on the existing AI Film Academy production domain. This removed the risk of treating a temporary preview or a generic presentation host as the final experience, and it allowed the deck to expose participant utility pages on the same trusted origin. [1] [2]

## System map

| Layer | Production artifact | Responsibility | Why it was chosen |
|---|---|---|---|
| Host application | `aifa-website`, React 19, Vite, Wouter | Serves the public site and the dedicated GenJam routes. | Reuses the real production domain and existing release process. |
| Deck specification | `client/src/pages/BetterYouthGenJam.tsx` | Holds `SlideSpec`, the final 33-slide `draft2Slides` sequence, approved asset constants, and exact workshop copy. | A typed data map makes reordering, variant changes, and future deck extraction practical. [1] |
| Deck renderer | `SlideContent` and `Title` | Renders a controlled set of variants: cover, agenda, bio, media, reel, resource, console, timer, cards, upload, and reflection. | Preserves visual consistency while allowing workshop-specific scenes. [1] |
| Presentation runtime | `Home` in `BetterYouthGenJam.tsx` | Handles hash links, keyboard/touch/wheel navigation, fullscreen, section navigation, local owner edit mode, active state, and chrome idling. | Gives a facilitator direct control without requiring a separate slide application. [1] |
| Base style system | `client/src/genjam.css` | Defines global tokens, horizontal staging, entry grammar, HUD, rail, responsive rules, and reduced-motion fallback. | Adapts the reference deck’s behavior—not only its colors. [3] |
| Production refinements | `client/src/genjam-overrides.css` | Encodes final geometry fixes for two-line titles, 16:9 media, agenda, timer, QR panels, storyboard, footer, and character-sheet layout. | Prevents known repeat failures from silently returning. [4] |
| Resource routes | `client/src/App.tsx` | Implements `/cref`, `/genjam/submit`, and `/genjam/better-youth-timer`; suppresses normal site chrome. | Keeps the participant flow coherent and gives short QR destinations a stable home. [2] |
| Media | `client/public/assets/genjam/` | Holds approved brand marks, presenter media, videos, character sheet, and storyboard. | Uses known, reviewed files and stable paths tied to the deck. [1] |

## Slide data and content model

`SlideSpec` separates **content** from **composition**. Each slide declares an ID, workshop section, background, render variant, headline fields, short lede, optional cards, and approved media. This was the right abstraction because the team made a high volume of copy, order, and spacing corrections under time pressure: a final operator can alter slide sequence and wording without rebuilding navigation or effects. [1]

The final sequence uses an explicit `draft2Slides` map instead of mutating the original source list. `fromLegacy` allows a slide to inherit a tested visual recipe and override only the content or placement that changed. It is a pragmatic technique for a time-boxed production: retain proven layouts while keeping the shipping sequence legible and discrete. Any future deck should start with a clean final map rather than carrying unused legacy alternatives indefinitely. [1]

## Presentation runtime decisions

The deck keeps the active slide and its immediate neighbors in the presentation stage, hides distant slides, and uses `aria-hidden`/`inert` so inactive content does not interfere with focus. Each move updates `#<slideNumber>` in the browser history, allowing deterministic rehearsal and a direct link to a specific moment. The result is practical for a facilitator: `#15` opens the timer, while a section menu and Home/End keys make recovery fast during live delivery. [1]

| Interaction | Final behavior | Operational reason |
|---|---|---|
| Linear controls | Right/Down/Space/Enter advance; Left/Up/Backspace return. | Supports remote clickers, keyboard presentation, and normal browser use. |
| Direct access | `#1` through `#33` load the matching slide. | Lets the presenter rehearse or recover a section without hunting. |
| Non-linear navigation | Counter opens a section jump menu. | Helps a workshop facilitator move to the needed block without exposing a conventional site nav. |
| Fullscreen | `F` toggles document fullscreen. | Keeps the deck presentation-first without a separate app shell. |
| Touch and wheel | Horizontal swipe and a 450 ms wheel lock move one slide at a time. | Avoids accidental multi-slide skips on laptops and touch displays. |
| Attention management | HUD/arrow chrome fades after idle time. | Leaves media and content clear once the facilitator stops interacting. |
| Accessibility fallback | `prefers-reduced-motion` reveals readable final states and disables effects. | Ensures the deck never depends on animation to be legible. [1] [3] |

## Motion system

The motion layer was adapted from the reference deck’s grammar: substantial fade-up/blur settle for normal content, a distinct zoom for centered title screens, staggered card entrances, a side-flip bio, and console-line reveals. Background motion is not generic decoration. An `AmbientField` canvas produces drifting geometric artifacts behind the active slide, while `CanvasFx` reserves fireworks for covers and confetti-like celebration for the close. [1] [3]

The implementation intentionally caps device-pixel ratio at 2, clamps frame delta, skips effects for inactive slides and reduced-motion users, and stops drawing when the document is hidden. Those safeguards preserve the live feel while reducing the risk of an animation becoming the workshop’s bottleneck. [1]

## Visual decision log

| Constraint | Final rule | Rationale |
|---|---|---|
| Reference fidelity | Reuse the source deck’s structural behavior and motion language, not merely colors. | The reference was code-based; brand fidelity depended on its kinetic and spatial grammar. [3] |
| Content hierarchy | Use one short headline, one accented phrase, and a concise lede; hold titles to at most two display lines. | The deck must facilitate speaking, not become a reading wall. [4] |
| Brand lockup | Use the approved horizontal white AI Film Academy mark alongside Machine Cinema in a protected lower rail. | Solves the dual-brand requirement without a tiny or stacked custom logo. [1] [4] |
| Videos | Preserve native 16:9 player geometry with real controls for facilitator-played samples; avoid letterbox fabrication. | Cropping and blue side bars were repeatedly rejected and reduced credibility. [4] [5] |
| Images | Use `object-fit: contain` for storyboards and character sheets when every supplied detail matters. | A workshop reference is an information asset, not decorative media. [4] [6] |
| QR screens | Show a large code plus a visible click/tap fallback URL on the same screen. | Participants retain an actionable path when scanning is inconvenient. [7] |
| Closing screens | Preserve intentional sparsity. | Upload, showcase, and reflection are actions, not new content modules. [5] |

## Owner-edit model

The deck supports a **single-version** owner editing workflow through `?edit=1`. The edit toolbar turns designated text spans into content-editable fields, saves changes in browser `localStorage`, and can export an edit JSON file. Standard presentation mode reads the canonical source text only; local drafts do not leak into a shared screen by accident. [1]

This is deliberately a lightweight review mode, not a general public CMS. It is appropriate when the owner wants rapid, reversible wording changes during a review. Once copy is approved, fold required changes into the code and treat the canonical deck as the source of truth. For synchronized multi-user editing, versioned publishing, or durable nontechnical editing, plan a proper authenticated backend rather than widening this local-only feature opportunistically.

## Participant handoff architecture

The deck’s handoffs are designed as stable, human-readable URLs on `www.aifilmacademy.com`. QR code values use their canonical full URLs and the matching typed fallback sits below them. The short submit URL delegates to the Drive folder with `window.location.replace`, keeping the deck free of third-party Drive URLs in its primary presentation copy. [1] [2] [7]

> **Pattern:** Stable short route → redirect/download page → visible fallback. Never use a raw, hard-to-read storage URL as the only action path.

The character resource route is intentionally neutral. It shows and downloads `malecref.jpg` without Better Youth/GenJam branding so the same asset can be reused in future sessions. This differentiation—the workshop-specific deck versus the reusable participant tool—is important infrastructure, not cosmetic cleanup. [2]

## Facilitation architecture

The workshop story deliberately moves from **storyteller first** to proof of craft, then to the new workflow, then to human ownership before the activity begins. The live activity uses a progression of team formation, shared theme, timer, character sheet, visual style, prompt, storyboard, motion, edit, upload, showcase, and reflection. This order was selected to address an adult pilot’s legitimate questions while keeping storytelling—not AI abstraction—at the center. [1] [5]

The ethical frame is intentionally specific: the human owns the concept, prompt, selection, revision, and final share. It does not rely on unsourced policy claims or promise universal outcomes. The system makes the workflow inspectable and allows participants to decide whether it is useful after trying it. [1]

## References

[1]: ../client/src/pages/BetterYouthGenJam.tsx "Canonical React deck source"
[2]: ../client/src/App.tsx "Production route wiring and helper pages"
[3]: ../client/src/genjam.css "Base visual system and motion grammar"
[4]: ../client/src/genjam-overrides.css "Final production geometry rules"
[5]: ../GENJAM_PRODUCTION_VERIFICATION_fae3118.md "Final slide-flow verification record"
[6]: https://docs.google.com/document/d/1YU3NvFV0Dk7h52RGIeeu3MspldC09xIrQY3_p3pUvVw/edit "Slide 21 storyboard sequence handoff — 2026-08-29"
[7]: https://docs.google.com/document/d/1ruBcpMPniOlOrkhq6pkCAEqs4rkmfFOST5lZWTSuJKk/edit "QR handoff audit — 2026-08-29"
