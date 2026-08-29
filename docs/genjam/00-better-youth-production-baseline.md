# Better Youth GenJam — Production Baseline

**Status:** Finished working baseline, approved by the project owner as a 10/10 completion.
**Project:** Better Youth GenJam adult board/faculty/educator pilot.
**Canonical live deck:** https://www.aifilmacademy.com/genjam/better-youth-0829
**Repository:** https://github.com/Exemplar-Industries/aifa-website
**Branch at documentation start:** `main`, aligned with `origin/main` at `ce9a2a8`.

## Scope and audience

This is a facilitator-led, private adult pilot—not a youth-facing program, public contest, or autonomous AI experience. The workshop uses practical storytelling to let board members, faculty, and educators experience a human-led creative process. AI supports access and iteration; humans retain the concept, prompt, selection, revision, and final sharing decision.

## Shipped experience

The approved source defines a **33-slide** browser-native deck in `client/src/pages/BetterYouthGenJam.tsx`. It is a self-contained React presentation with a typed slide schema, active-slide lifecycle, source-faithful motion, keyboard/touch/wheel navigation, section jump menu, hash deep links, fullscreen shortcut, responsive controls, and a local owner edit mode. [1]

| Component | Final production decision | Source of truth |
|---|---|---|
| Deck route | Use `https://www.aifilmacademy.com/genjam/better-youth-0829` on the `www` host. | `BetterYouthGenJam.tsx` and QA handoff [1] [2] |
| Owner text edit | Use the **same deck** at `?edit=1`; editable fields persist as local browser drafts, can be exported as JSON, and are intentionally ignored in normal presentation mode. | `BetterYouthGenJam.tsx` [1] |
| Character resource | QR and visible fallback use `https://www.aifilmacademy.com/cref`; the neutral page displays and downloads `malecref.jpg`. | `App.tsx`; QA handoff [2] [3] |
| Showcase upload | QR and visible fallback use `https://www.aifilmacademy.com/genjam/submit`; the short path redirects to the showcase Drive folder. | `App.tsx`; QA handoff [2] [3] |
| Reflection | QR and visible fallback use `https://forms.gle/ajX2kc1qKcZcqCfBA`. | `BetterYouthGenJam.tsx`; QA handoff [2] |
| Timer | Timer slide launches `/genjam/better-youth-timer` in a new tab; the standalone page supplies start, pause, and reset for a four-hour block. | `BetterYouthGenJam.tsx`; `App.tsx` [1] [3] |
| Visual language | Machine Cinema cream, ink, pink, yellow, and lime; Inter display, Space Mono labels; 4 px borders, hard offset shadows, and active-slide canvas effects. | `genjam.css`, `genjam-overrides.css`, reference system [4] |

## Verified resource handoffs

Every final QR destination is paired with a visible, clickable fallback URL beneath the code. This is a non-negotiable delivery pattern: a participant can proceed even if a phone camera, display resolution, or network interrupts the QR scan. The 2026-08-29 audit opened the visible deck fallbacks and confirmed the character sheet, short upload redirect, and reflection form. [2]

> The bare apex `https://aifilmacademy.com/cref` is separately hosted and returns a 404. Deck-facing links intentionally use the `www` host; an apex-to-`www` redirect is an optional infrastructure task outside this finished deck. [2]

## Final release lineage

The following commits encode the meaningful final production decisions. The list is intentionally selective rather than a complete revision log.

| Commit | Decision preserved |
|---|---|
| `fae3118` | Consolidated the final review batch and the 33-slide release candidate. |
| `8ea62ad` | Corrected urgent centering, title, timer, resource, and upload issues. |
| `a0276e5` | Simplified the character resource handoff. |
| `d349a9f` | Refined the human-ownership title treatment. |
| `2844d95` | Standardized the canonical character resource link. |
| `008c120` | Reframed team-session wording. |
| `6fd7b85` | Protected the character-sheet and QR geometry. |
| `8515a21` | Replaced the storyboard visual with Brandon’s approved sequence. |
| `ce9a2a8` | Made QR handoffs visibly clickable and the character resource reusable. |

## Approved visual and facilitation constraints

The deck must remain visually presentable inside a 16:9 browser frame with no in-slide scroll. Headings are sentence case, use no more than two display lines, and may not strand punctuation or a final word on a third line. Native 16:9 video fills a 16:9 player without invented blue containment bars. Long-storyboard images remain fully visible with `object-fit: contain`. The footer uses the approved white horizontal AI Film Academy mark paired with Machine Cinema, not a recreated or stacked logo. [1] [4] [5]

The closing resource panels are intentionally sparse: the upload screen is title plus QR/fallback; the showcase screen is title only; the reflection screen is title, QR, and a compact scan instruction. Do not reintroduce repeated calls to begin, extra instructional blocks, generic facilitator labels, duplicated rails, or “Human-led / AI-assisted” pills. [1] [5]

## Deployment lesson to preserve

The major release delay on 2026-08-28 was an upstream Railway/GCP deployment-start incident, not an application build error. The correct response was to preserve the queued release, keep the existing service online, wait for the provider state to advance, and verify the canonical route before saying the new release was live. A running container did not guarantee traffic cutover. [6]

## Evidence and references

[1]: ../client/src/pages/BetterYouthGenJam.tsx "Canonical Better Youth GenJam implementation"
[2]: https://docs.google.com/document/d/1ruBcpMPniOlOrkhq6pkCAEqs4rkmfFOST5lZWTSuJKk/edit "BetterYouth GenJam QR Handoff Audit — 2026-08-29"
[3]: ../client/src/App.tsx "Route helpers and live-deck routing"
[4]: ../client/src/genjam.css "Base Machine Cinema live-deck system"
[5]: ../client/src/genjam-overrides.css "Final geometry and media refinements"
[6]: ../RAILWAY_DEPLOYMENT_DELAY_2026-08-28.md "Railway deployment delay record — 2026-08-28"
