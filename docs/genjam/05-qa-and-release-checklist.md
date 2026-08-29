# Better Youth GenJam — QA and Release Checklist

## Use

Use this as the release gate for every substantial GenJam live-deck revision. The current Better Youth version is approved; this checklist exists to protect future changes from reintroducing known failure modes.

> **Release rule:** A local build, a deployment status, or a source-code diff alone is not proof. Verify the intended visual and functional result on the canonical production route.

## 1. Production identity and route gate

| Check | Pass condition | Evidence |
|---|---|---|
| Canonical route | The agreed `www` production URL opens the intended deck. | Browser URL and screenshot/record. |
| Slide count | Counter matches the current approved sequence. | First/last slide check. |
| Site chrome | Normal navbar/footer do not appear inside the immersive deck. | Cover and mid-deck screenshot. |
| Public visibility | Private/pilot deck is unlinked from normal navigation and has the agreed index posture. | Route/source inspection. |
| Owner mode | `?edit=1` is available only when requested; normal route remains canonical. | Edit and normal-mode checks. |

## 2. Copy and facilitation gate

| Check | Pass condition |
|---|---|
| Audience framing | Deck correctly identifies an adult/private pilot and does not claim youth participation, public competition, or mandatory sharing. |
| Storytelling arc | Host/storyteller context arrives before the GenJam/tool discussion. |
| Human ownership | The concept, prompt, selection, revision, and final sharing decision are visibly human. |
| Tools | Google Flow and Canva references match the intended facilitation workflow. |
| Agenda | The stated session sequence matches the facilitator plan and activity timeboxes remain honest/flexible. |
| Workshop flow | Team formation precedes shared theme; timer appears before active work; prompt/storyboard/motion/edit/showcase/reflection flow is in the intended order. |
| Copy safety | No unsupported legal, policy, rights, or institutional approval claim appears. |
| Headline language | Titles use sentence case unless an acronym/function requires otherwise; no generic/developer-facing labels leak into slides. |

## 3. Wide-frame geometry gate

Review every slide at a 16:9 presentation viewport. Use the native browser view and full screen, not only DOM text extraction.

| Check | Pass condition |
|---|---|
| Frame containment | No meaningful copy, media, card, QR, or footer element crosses the usable 16:9 frame. |
| Headline lines | No desktop headline uses more than two intended display lines. |
| Orphans | No single final word or punctuation mark sits on a new unintended line. |
| Contrast | Every text element is readable against its actual rendered background. |
| Spacing | Content occupies the frame with purposeful rhythm; avoid excess empty padding that compresses copy. |
| Overlap | Text, media, QR panels, footer rail, counter, and controls do not collide. |
| Repetition | No duplicated rails, step labels, “Human-led / AI-assisted” pills, or repeated “Press to begin” prompts remain unless deliberately specified. |
| Footer | Approved AI Film Academy horizontal mark is readable and balanced with Machine Cinema. |

## 4. Media gate

| Asset | Pass condition |
|---|---|
| Future.io reel pair | Both clips are framed clearly, play/mute/loop according to intention, and retain the intended composition. |
| 3D book trailer | Native 16:9 player plays with expected controls and start frame; no artificial blue/letterbox side bars. |
| One-day AI-film example | Native 16:9 player is clear, playable, and separated from headline/copy. |
| Action-scene demo | Autoplay/mute/loop treatment is correct and does not cover content. |
| Character reference | Page/slide preview is large enough to identify; original image is available for download. |
| Storyboard reference | Full source sequence is visible without cropping; aspect ratio and `contain` treatment are preserved. |
| Approved logos | Use original approved source assets; never replace with a recreated mark. |

## 5. Action-link and QR gate

Test each **visible fallback link** and independently confirm the QR value is identical to its expected destination.

| Hand-off | QR value and fallback | Pass condition |
|---|---|---|
| Character sheet | `https://www.aifilmacademy.com/cref` / `www.aifilmacademy.com/cref` | Opens neutral character sheet and permits `malecref.jpg` download. |
| Showcase upload | `https://www.aifilmacademy.com/genjam/submit` / `www.aifilmacademy.com/genjam/submit` | Redirects to the intended Drive folder. |
| Reflection | `https://forms.gle/ajX2kc1qKcZcqCfBA` / `forms.gle/ajX2kc1qKcZcqCfBA` | Opens the intended form without submitting a response. |
| Timer | `/genjam/better-youth-timer` | Timer opens in a new tab from the deck screen and its controls work. |

Use `www.aifilmacademy.com` in deck-facing actions. Do not silently substitute bare apex routes unless they are separately verified. [1]

## 6. Presentation interaction gate

| Check | Pass condition |
|---|---|
| Deep links | `#1`, a mid-deck hash, and the final hash route to the corresponding slides. |
| Keyboard | Next/back, Home, End, `F`, `?`, and Escape behave as documented. |
| Section menu | Counter opens the menu and selecting each section jumps to its first slide. |
| Wheel | One deliberate motion yields one navigation event; normal trackpad use does not skip sections. |
| Touch | Horizontal swipe advances/reverses without activating vertical action unexpectedly. |
| Effects | Ambient field/cover effects play only on active slides and do not obstruct content. |
| Reduced motion | Slides render readable final states with non-essential effects disabled. |
| Owner edit | Content can be edited/saved/exported/reset in owner mode; normal mode does not surface local overrides. |

## 7. Responsive gate

Review the dense content screens around 390 × 844 in addition to 16:9 desktop. The goal is not identical composition: it is readable, non-overlapping adaptation.

| Check | Pass condition |
|---|---|
| Chrome | Rail/HUD/controls hide or relocate where they would block content. |
| Headings | Controlled wrapping remains readable; no accidental clipping. |
| Cards | Cards collapse to a reasonable stack without truncation. |
| Media | Video/image retains a usable dimension and correct aspect treatment. |
| Resource actions | QR/fallback/tap targets remain discoverable. |

## 8. Build and deployment gate

1. Run the repository’s TypeScript check.
2. Run the production build.
3. Inspect changes and commit only deliberate production updates.
4. Push the release branch according to the project’s normal process.
5. Monitor hosting status but distinguish provider queues from application errors.
6. Confirm the live canonical URL shows the expected slide count, headlines, media, and resource routes.
7. Record verification in a dated Knowledge Base handoff.

When the host reports a provider-side incident, retain the known-good live release and preserve the queued validated deployment unless there is evidence that the code itself is wrong. Do not remove/restart it reflexively. [2]

## References

[1]: https://docs.google.com/document/d/1ruBcpMPniOlOrkhq6pkCAEqs4rkmfFOST5lZWTSuJKk/edit "Verified QR handoff audit"
[2]: ../RAILWAY_DEPLOYMENT_DELAY_2026-08-28.md "Railway provider incident chronology"
