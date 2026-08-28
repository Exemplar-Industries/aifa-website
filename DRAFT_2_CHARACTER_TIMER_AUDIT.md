# Character-Work and Timer Repair Audit — 2026-08-28

## Corrected sequence

The duplicate questions-and-care slide was removed after it was successfully moved to Slide 3. The deck returns to **39 slides**, with the story-theme screen now at Slide 16, followed by the four-stage workshop overview at Slide 17.

## Presentation viewport results

| Screen | Finding | Resolution |
|---|---|---|
| Slide 16 — Story Theme | The pink accent word was invisible because it inherited the pink brand accent on a pink background. | Accent text now switches to cream with a hard ink shadow on pink slides. The title is constrained to a compact two-line composition. |
| Slide 17 — How Today Works | Four-stage screen is visible, with clear cards and no crop at production-like presentation width. | Retained. |
| Slide 19 — Character Sheet | Previous version did not give enough visual weight to the sheet, QR, or typed download path. | Sheet region and QR have been enlarged; typed URL has been added. Final view remains to be checked after the asset/layout update. |
| Slide 21 — Let’s Begin | New dedicated 4-hour start-clock screen is implemented before the creation work block. | Persistent top-left workshop timer is now gated to creation slides after this screen. |

## Remaining validation

Check Slides 19–22 locally and on the real production route after the new asset, resource, timer, and contrast code are deployed. Confirm the book-trailer video opens at 00:01 when metadata loads.

## Local presentation inspection — repair pass 2

| Screen | Result |
|---|---|
| Slide 16 — Pick a Story | The duplicate was removed and the deck returned to 39 slides. The previous invisible accent was traced to pink text on a pink background; the accent now receives an explicit cream/ink treatment. |
| Slide 17 — How Today Works | Four stage cards remain readable with full lower-edge clearance. |
| Slide 19 — Character Sheet | The sheet is now visibly large, the QR has been increased to 182px, and the plain on-slide fallback URL is `aifilmacademy.com/assets/genjam/malecref.jpg`. |
| Slide 21 — Let’s Begin | The dedicated 04:00:00 screen is clear and uses the requested full-slide clock treatment. It precedes the active work block, so the persistent corner timer does not compete with the start signal. |

## Local presentation inspection — repair pass 3

| Screen | Result |
|---|---|
| Slide 16 — Pick a Story | The compact two-line headline is now legible on the pink background and the period remains joined to `story.`. |
| Slide 19 — Character Sheet | The enlarged sheet, 182px QR, direct button, and typed fallback path are visible simultaneously with footer clearance. |
| Slide 21 — Let’s Begin | The dedicated clock is clearly visible before the active work block. |
| Slide 22 — Character Work | Persistent workshop clock activates in the upper left only after the full-screen timer. An old session clock value was discovered during test navigation and has been corrected: advancing from the start-clock screen now resets the timer to exactly 04:00:00. |

## Local presentation inspection — late-work repair

| Screen | Result |
|---|---|
| Slide 22 — Character Work | The resource steps are now complete before this slide. It tells participants what to create next—three directions, a comparison, and a single selection—rather than repeating download/upload/describe. Corner clock no longer obscures the kicker. |
| Slide 24 — Storyboard | The reference image now occupies the dominant area and all frames are visible. A remaining text/image collision on the long `storyboard.` word was detected and corrected by widening the text column and reducing this slide’s display type. |

## Local presentation inspection — late-work repair pass 2

| Screen | Result |
|---|---|
| Slide 24 — What Is a Storyboard? | The complete shared frame sequence is visible at useful scale, with its explanation contained entirely inside the left column. |
| Slide 28 — Storyboard Work Block | The headline now renders as `Build the board.` with the accent visible against pink. The explanation is readable and unobstructed. |

## Local presentation inspection — late-work repair pass 3

| Screen | Result |
|---|---|
| Slide 30 — Animate the Moment | The dark placeholder was replaced with the bright, warm 2.5D kitchen frame from the approved one-day film. The direct live-demo copy remains readable with the clock clear of the kicker. |
| Slide 33 — Build Your First Cut | The dark placeholder was replaced with a visually active motion-design frame. Title, lede, media, clock, and footer now hold a balanced, readable composition. |

## Local presentation inspection — late-work repair pass 4

| Screen | Result |
|---|---|
| Slide 35 — Edit Work Block | The pink work screen now shows `Build your first cut.` as a readable two-line title; the period is attached to `cut.` and all supporting copy remains clear. |
| Slide 38 — Reflection | The question mark now sits directly in `you think?`, with no separate orphan line. |
| Slide 39 — Closing | Closing subtext was reduced to a concise two-sentence handoff, eliminating the prior crowded multi-line paragraph. |
