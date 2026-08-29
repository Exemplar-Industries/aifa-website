# Better Youth GenJam — After-Action Report

**Completion status:** Finished working 10/10 baseline, as approved by Brandon.
**Sprint:** Two-day build, review, and release cycle.
**Deliverable:** A 33-slide, browser-native, Machine Cinema-inspired workshop deck on the AI Film Academy production domain. [1]

## Executive assessment

The project succeeded because the final deliverable was treated as a **facilitated live experience**, not as a slide file. The workshop’s content, the facilitator’s control surface, motion language, media playback, timer, and resource routes were built as one coherent system. That decision allowed the visual reference, the storytelling objective, and practical participant action to reinforce each other.

The project was not linear. The strongest version emerged after direct, exacting review exposed where early work looked right in code but failed in a real 16:9 presentation frame. The final standard was earned through a feedback loop that prioritized visual proof, specific edits, and re-verification of the live route. The result is a durable production baseline with reusable technical and operational patterns—not merely a one-off workshop deck. [1] [2]

## What worked

| What worked | Why it mattered | Reusable implication |
|---|---|---|
| Treating the brand kit as a working system | The reference supplied slide staging, keyboard behavior, effect lifecycle, type hierarchy, background motion, and framing logic—not only colors. | Read every relevant reference asset and reuse structural patterns when authorized. [3] |
| Hosting on the real AI Film Academy domain | The deck became shareable, stable, and able to expose short participant routes on the same origin. | Choose the production host and canonical route before building the deck. [1] [4] |
| Building a typed slide map with visual variants | Slide order, words, and content modes changed rapidly without forcing runtime/navigation rewrites. | Separate slide data from rendering and treat slide IDs as durable anchors. [1] |
| Starting with Brandon as a storyteller | The adult pilot needed human context and craft credibility before any AI framing. | Lead with the host’s creative history whenever the audience’s confidence or trust is central. [1] |
| Making human ownership specific | “Concept, prompt, selection, revision, final share” gave the ethics discussion a concrete, memorable structure. | Use a small set of tangible human decisions; avoid abstract reassurance. [1] |
| Native 16:9 media correction | Moving from cropped/letterboxed attempts to real player geometry restored media credibility. | Treat source aspect ratio as an explicit contract, not a CSS afterthought. [5] |
| QR plus typed fallback links | Participants received two ways to reach every action, and the fallback could be tested directly in the deck. | Every QR action slide needs a full canonical QR value and a visible click/tap fallback. [6] |
| Owner edit mode limited to a query flag | Brandon could make local draft copy changes without exposing a public editing system or affecting presentation mode. | Keep lightweight review tooling isolated, reversible, and owner-triggered. [1] |
| Repeated browser-frame checks | Geometry checks surfaced invisible text, overlap, crop, padding, and visual hierarchy problems that source review did not reveal. | Validate the **rendered frame**, not only source code or document extraction. [5] |
| Direct feedback as structured product input | “Move this left,” “two lines only,” “remove this,” and “show the URL” were all concrete acceptance criteria. | Convert every piece of feedback into a tracked, testable condition before reporting progress. |

## What did not work at first—and the root lesson

| Early failure mode | Why it failed | Corrective rule now preserved |
|---|---|---|
| Delivering written material before the visual deck | The requested output was a live animated deck, so an outline did not meet the decision point. | Show a working visual draft first; documentation is supplemental until the deck is visible. [3] |
| Palette matching without full motion/behavior fidelity | The early result had the colors and type direction but not the source deck’s ambient field, transitions, or effect rhythm. | Audit the reference’s CSS and scripts in addition to its design tokens. [3] |
| Insufficient real-frame QA | Elements overlapped, headlines split incorrectly, small type became unreadable, and visible content could fall outside the usable 16:9 field. | Use a slide-by-slide geometry audit at presentation resolution for all dense/high-risk screens. [5] |
| Three-line headings and orphaned punctuation | A generic responsive heading rule ignored the reference’s deliberate two-line hierarchy. | Author headline line breaks intentionally; lock desktop display lines, then create a controlled mobile fallback. [4] |
| Cropped or artificially contained video | A media workaround added visible blue bars and compromised native playback. | Use a real 16:9 player, `object-fit: cover`, and controls/autoplay behavior chosen per asset. [5] |
| Recreated or undersized brand logo | A substitute / stacked mark could not meet the approved visual standard. | Obtain the approved source logo and test its visual legibility at presentation distance. [1] [4] |
| Repeated decorative/product-language UI | Duplicate rails, badges, generic “Press to begin” prompts, and Human-led/AI-assisted pills diluted facilitation content. | Every persistent element must earn its screen real estate; delete decorative repetition before adding more copy. [5] |
| Resource handoffs that depended solely on QR | A code may be hard to scan from the room, and bare apex hosting produced an unavailable resource route. | Pair every QR with a large fallback URL and use the verified canonical host in both. [6] |
| Premature deployment status reporting | A queued provider incident could leave a healthy prior release visible after local validation. | Do not call a release live until the canonical production URL exposes the expected changes. [7] |

## The decisive pivot

The project’s quality accelerated when review moved from broad impressions to a disciplined cadence:

1. **Name the slide and visible problem.** “Slide 17 QR/header overlap” is actionable; “some spacing feels off” is not sufficient.
2. **Express the desired visual outcome.** “Two title lines,” “move the video materially right,” and “remove all extra subtext” make the acceptance condition observable.
3. **Implement only what resolves the stated issue.** Preserve working behavior instead of rebuilding the whole presentation around each correction.
4. **Recheck the exact production frame.** Review the target slide at desktop size, and test action links/media only after layout is clear.
5. **Record the invariant.** A one-off repair became a reusable CSS guardrail, route rule, or skill instruction.

This approach turned the user’s high-intensity feedback into a precise quality system rather than a sequence of subjective revisions.

## Decisions that protected workshop integrity

The deck’s adult-pilot framing was preserved throughout. It does not assert that youth are participating or make unverified claims about policies, rights, or institutional approval. Instead, it positions the session as a chance for faculty and board members to see the workflow firsthand, ask questions, and decide what feels appropriate. The primary creative tools named in the experience are Google Flow and Canva Whiteboard; the deck reinforces that participants retain the meaningful creative choices. [1]

The content flow also protected facilitation. The presenter begins as a storyteller, shows craft and project examples, introduces the operating format and human ownership, then transitions into the GenJam workflow. Team formation comes before the theme reveal. The timer sits before active character work, launches separately, and does not intrude on the deck HUD. The final slides are deliberately sparse so the room can act rather than decode another instruction panel. [1] [5]

## Engineering lessons

The key technical insight is that **high-fidelity presentation work is an interaction system with a visual QA burden**. A strong component architecture is necessary but not sufficient. The final deck is reliable because it combines a typed slide map, a limited render-variant vocabulary, active-slide lifecycle management, and a strong override layer for known high-risk layouts. Its logic supports the facilitator; its CSS protects the visible frame. [1] [4] [5]

The owner-edit mechanism intentionally keeps scope narrow: content text becomes editable only at `?edit=1`, drafts save locally, exports are explicit, and normal presentation mode never reads those overrides. This avoids adding a database, authentication, or a public editor during a time-sensitive visual sprint. It is a correct fit for an owner-controlled deck, but it is not a substitute for a collaborative publishing system. [1]

## Operational lessons

The Railway incident demonstrated that application validation and deployment verification are different work. Local type/build success confirmed that the code was ready. The provider dashboard confirmed a platform queue rather than an application error. But neither result confirmed that audience traffic had shifted to the new bundle. Only the canonical production route showing the expected slide count and visual changes closed the release loop. [7]

The project also clarified a DNS/host discipline: the bare apex and `www` host cannot be presumed equivalent. The character resource page is verified on `www.aifilmacademy.com`; all deck URLs and QR values use that host. Future projects must select and test their canonical origin early, especially when QR codes will be printed or presented. [6]

## Recommended standard for the next GenJam

The future default should be an interactive web deck that begins from a **brief + reference extraction + production route decision**, not from a static slide outline. Build the visual grammar first, then map the workshop content into reusable variants. Treat brand assets, all participant links, and source media as finalization prerequisites. Schedule a full deck geometry pass before review, and classify each user note as a content, visual, interaction, resource, or deployment requirement. The related implementation playbook and runbook provide the exact sequence. [8] [9]

## Completion statement

The Better Youth GenJam is a successful prototype of a premium, live, facilitator-first workshop deck. Its final 33-slide system is usable now, its resource routes are verified, and its production lessons have been captured for future AI Film Academy GenJams. The next step is not to reopen this approved deck; it is to reuse the system with stronger intake discipline and earlier visual QA.

## References

[1]: 00-better-youth-production-baseline.md "Approved production state"
[2]: 01-live-deck-architecture-and-decision-log.md "Architecture and final decisions"
[3]: ../../../../better_youth_genjam/machine_cinema_source/deck-template.html "Machine Cinema reference deck structure"
[4]: ../../../../better_youth_genjam/machine_cinema_source/styles.css "Machine Cinema reference style and motion source"
[5]: ../client/src/genjam-overrides.css "Final slide geometry and media rules"
[6]: https://docs.google.com/document/d/1ruBcpMPniOlOrkhq6pkCAEqs4rkmfFOST5lZWTSuJKk/edit "Better Youth GenJam QR handoff audit"
[7]: ../RAILWAY_DEPLOYMENT_DELAY_2026-08-28.md "Railway provider-side incident record"
[8]: 03-reusable-implementation-playbook.md "Future build workflow"
[9]: 04-facilitator-production-runbook.md "Facilitation and release runbook"
