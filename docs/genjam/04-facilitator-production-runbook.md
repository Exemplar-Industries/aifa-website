# Better Youth GenJam — Facilitator and Production Runbook

## Purpose

Use this runbook to present the approved Better Youth GenJam, rehearse the browser-native deck, manage participant handoffs, and make safe future copy adjustments. It is written for the facilitator and a production operator. It does not reopen the finished 10/10 visual baseline.

## Canonical routes

| Use | URL | Expected behavior |
|---|---|---|
| Live deck | https://www.aifilmacademy.com/genjam/better-youth-0829 | Opens the approved 33-slide immersive deck. [1] |
| Owner copy review | https://www.aifilmacademy.com/genjam/better-youth-0829?edit=1 | Turns designated text fields editable locally; offers save, export, reset, and exit controls. [1] |
| Character sheet | https://www.aifilmacademy.com/cref | Displays and downloads the neutral reusable character reference. [2] |
| Showcase upload | https://www.aifilmacademy.com/genjam/submit | Redirects to the Better Youth GenJam Showcase Drive folder. [2] |
| Workshop timer | https://www.aifilmacademy.com/genjam/better-youth-timer | Opens a separate four-hour timer with start/pause/reset. [2] |
| Reflection | https://forms.gle/ajX2kc1qKcZcqCfBA | Opens the reflection form. [3] |

Always use the `www.aifilmacademy.com` deck/participant URLs. The bare apex `aifilmacademy.com/cref` is not the verified resource endpoint. [3]

## Before the room: 20-minute readiness sequence

1. Open the live deck in the presentation browser and confirm it loads on Slide 1.
2. Open the direct timer link in a second tab; verify **Start timer**, **Pause timer**, and **Reset**. Leave it reset until the activity begins.
3. Open the character sheet, upload short URL, Drive destination, and reflection form in background tabs. Do not submit a form response during this check.
4. Play the three principal example media screens from the deck: Future.io reel, 3D book trailer, and one-day 2.5D AI film. Confirm audio/system-output expectations before participants arrive.
5. Test a visible fallback link beneath each QR action screen; these are the operable contingency if a participant cannot scan from the room.
6. Rehearse the section menu and two recovery controls: `Home` (opening) and `End` (closing).
7. Put the browser in full screen only after confirming display scaling and presenter notes/window placement.

## Deck controls

| Intent | Control |
|---|---|
| Next slide | Right Arrow, Down Arrow, Space, Enter, Page Down, or right edge arrow. |
| Previous slide | Left Arrow, Up Arrow, Backspace, Page Up, or left edge arrow. |
| First / last slide | Home / End. |
| Jump to section | Select the slide counter in the upper-right corner. |
| Full screen | `F`. |
| Help / control reminder | `?` or `/`. |
| Close help / exit full screen | Escape. |
| Direct rehearsal position | Append `#<slide number>` to the deck URL, for example `.../better-youth-0829#15`. |

Wheel and horizontal swipe navigation are supported but deliberately locked so an ordinary trackpad gesture advances only one slide. Avoid scrolling while an editable text field has focus. [1]

## Facilitator flow

The deck is structured as a practical story workshop. It should be presented conversationally; do not read every lede verbatim. The titles are visual signposts and the activity directions should be delivered in the room.

| Approximate deck phase | Purpose in the room | Facilitator action |
|---|---|---|
| 01 · Welcome | Establish curiosity, agenda, and outcome. | Set the expectation that the session is experiential and questions are welcome. |
| 02 · Brandon’s work | Humanize the facilitator and establish craft. | Tell the story behind the work; let media prove the range without overexplaining tools. |
| 03 · What is a GenJam? | Explain the format and human decision points. | Describe the human role in plain language: concept, prompt, selection, revision, final share. |
| 04 · Live GenJam / Character | Form teams, name the shared theme, set the timer, open the character sheet. | Identify editors in the room before generation begins. Launch the standalone timer after setup. |
| 05 · Storyboarding | Turn the idea into a visual plan. | Demo the prompt structure, use Canva Whiteboard as appropriate, then let teams plan 9–15 frames. |
| 06 · Motion + Edit | Select strong frames, create clips, build the first cut. | Demonstrate a single meaningful motion choice; direct teams to keep only footage that serves the story. |
| 08 · Showcase + reflection | Upload, watch, and reflect. | Use the short upload route/QR, give the room space to watch, then show the reflection QR. |

## The active workshop contract

Say the human ownership principle early, then reinforce it while coaching teams:

> **People still own the concept, prompt, selection, revision, and final sharing decision.** The tool offers possibilities; the team directs the story and chooses what remains.

Use the content slides as a facilitation scaffold. The recommended 12-frame path is not a requirement; nine frames are a compact path, and 15 frames provide more room when the session has time. The final film does not need to animate every generated storyboard image. [1]

## Participant handoff procedure

### Character sheet

At the Character Sheet resource slide, tell participants to scan the code **or type/click** `www.aifilmacademy.com/cref`. The neutral page exposes the image and a direct download button. Do not refer to the bare apex URL. [2] [3]

### Showcase upload

At Upload Your Project, participants can scan the QR or use `www.aifilmacademy.com/genjam/submit`. The short URL redirects them to the shared showcase Drive folder. Confirm that participants have the intended Drive access before the workshop; the live deck can provide the path but cannot remedy external sharing settings in the moment. [2]

### Reflection

At the reflection screen, participants can scan the QR or use `forms.gle/ajX2kc1qKcZcqCfBA`. The deck is designed to show only the action and form handoff; lead any verbal framing rather than adding reading-heavy instructions back into the slide. [1] [3]

## Owner copy-adjustment procedure

Use the editable mode only when a controlled owner revision is desired.

1. Open the deck using `?edit=1`.
2. Click the visible text that needs revision. The editable area receives a dashed outline.
3. Change the words while preserving the intended visual length and two-line headline limit.
4. Select **Save Draft** to store the current draft in this browser, then **Export Edits** to download a JSON record.
5. Exit the edit mode and inspect the normal deck route. It intentionally shows canonical source text, not browser-local overrides.
6. Hand the exported JSON or the explicit edits to the production operator. Integrate approved changes into `draft2Slides`, re-run visual and action QA, then commit/deploy.

Do not use owner edit mode as a live audience authoring experience or expect it to synchronize across browsers. Its role is lightweight, private copy review. [1]

## Live recovery guide

| Situation | Immediate response | Follow-up |
|---|---|---|
| Deck lands on an unexpected slide | Press `Home` or use the counter to jump to the correct section. | Confirm the browser URL did not retain an old `#` fragment before the next session. |
| Need the timer while deck stays visible | Use the timer tab launched from the timer slide or open the direct timer URL. | Do not pin a timer overlay over the deck. |
| QR is difficult to scan | Direct participants to the visible fallback URL underneath the code. | Keep the fallback visible; do not replace it with additional instructions. |
| Video does not play | Ask the operator to use the play control and verify browser media permissions. Continue with the speaking point if needed. | Recheck source asset encoding and network/cache before the next workshop. |
| A participant sees a blank `/cref` page | Verify they used the `www` route. | Record their exact URL; apex routing is an infrastructure follow-up. [3] |
| A deployment appears delayed | Keep the currently live version available. Do not report a new release until the canonical route visibly shows it. | Check the host/provider status and preserve a queued, validated deployment during a confirmed provider incident. [4] |

## References

[1]: ../client/src/pages/BetterYouthGenJam.tsx "Live deck controls, owner edit flow, and slide map"
[2]: ../client/src/App.tsx "Participant resource and timer routes"
[3]: https://docs.google.com/document/d/1ruBcpMPniOlOrkhq6pkCAEqs4rkmfFOST5lZWTSuJKk/edit "QR handoff audit"
[4]: ../RAILWAY_DEPLOYMENT_DELAY_2026-08-28.md "Deployment verification incident log"
