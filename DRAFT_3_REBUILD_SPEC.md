# Better Youth GenJam — Draft 3 Rebuild Specification

## Global rules

1. Use the real AI Film Academy brand asset from the shared Drive logo folder. Do not retain a tiny generic mark, stacked micro-type, or improvised icon. The footer lockup must be readable at presentation size and aligned as a single horizontal unit.
2. Remove all `HUMAN-LED` / `AI-ASSISTED` pills and all duplicated top-right / bottom-right section-rail text. Retain only the minimal slide counter and the single intentional footer lockup.
3. Treat the 16:9 browser frame as the slide canvas. Slide content must clear the navigation, footer lockup, and timer without scrolling. Headline elements must use controlled two-line maximum word-break behavior; punctuation stays in the same text node as its preceding word.
4. Use the Poland-vs-France system as the reference for the dedicated timer and QR-action screens: strong metadata chips above, a centered large countdown, a concise bottom setup/action line, a single large QR panel, and no decorative duplicate rails.

## Required sequence and content changes

| Current area | Required change |
|---|---|
| Slide 3 | Delete. Renumber deck cleanly after removal. |
| Slide 5 | Change its small label so it does not repeat `MEET BRANDON`; open the headline with visible spacing comparable to the provided `MEET BRANDON` reference. |
| Slide 6: Client work | Stack the two videos vertically in a right-side 16:9 visual column. Do not overlap the videos. Preserve a generous left text column. |
| Slide 7: 3D book trailer | Change headline to `Book trailers / for authors.` (or equivalent two-line construction). Mention the approximately 45-day process only once in supporting copy. Start the player at 00:01 and shift the video field right to increase text breathing room. |
| Slide 8: one-day AI film | Eliminate all text overlap with a reduced, balanced two-line title and protected video region. |
| Slide 9 | Delete. |
| Slide 10 | Replace `More stories. More possible.` with a stronger single-line headline. |
| Slide 11 | Remove the Human-Led / AI-Assisted pills. |
| Slide 14 | Fix footer/brand collision after removing duplicated section rails and pills. |
| Slide 15 | Reframe as an activity prompt about choosing a theme. Use the example: `A stranger wakes up in a different country.` |
| Slides 18–21 | Move character-sheet setup, visual style selection, full master-prompt explanation, copyable example, and camera-sequence support before active creation. The character-resource slide must be a clean, large QR/action screen like the Poland reference. |
| Resource route | Change `/sheet` to `/cref`; use the same short path in the typed URL, QR, and button. |
| Slide 19 | Rebuild as a copy-and-paste master-prompt example with visual selection/copy instructions. It must not be late or depend on hidden editor behavior. |
| Slides 23 & 26 | Rebuild for generous vertical rhythm: compact cards, controlled text size, no vertical squeezing, no overlap. |
| Slide 27 | Delete. |
| Slide 29 | Use `Actionscene5-FINAL.mp4` as the autoplay muted visual. Place its video surface farther right with a clear left instructional column. |

## Timer reference captured from Poland vs France, Slide 19

- Dark ink full-screen background.
- Compact metadata chips across the upper composition: **Theme**, **Length**, **Format**, **Must-haves**, **Credit**, and **Tags**. Adapt them to Better Youth only; do not add competition or submission language that does not apply.
- Large centered `04:00:00` clock with compact preset/action controls below.
- Single lower action line. For Better Youth use character-sheet / Google Flow / Canva destinations rather than `/submit`.
- The persistent timer must begin only after this dedicated screen and reserve a non-overlapping safe zone at the top left.

## Visual media reference captured from feedback

- Client-work: the left editorial column should remain 35–40% of width; the stacked clips should begin at roughly 45% and occupy the right 50–55%.
- Book-trailer / AI-film screens: keep video on the right half, with the media’s colored hard-shadow treatment entirely within the viewport.
- Storyboard reference: full readable frame grid, minimal adjacent headline, and enough room to inspect all panels.

## Live resource destinations

- **Character reference short URL:** `https://www.aifilmacademy.com/cref` redirects to the approved `malecref.jpg` resource. The old `/sheet` route was removed from the production route table.
- **Showcase handoff form:** `https://docs.google.com/forms/d/e/1FAIpQLSfxxjVTC8xrbIV9DQbcEPWFVcMFyPBMy_5Nbp4HsUlo1AaRcA/viewform`. It is titled `Better Youth GenJam — Submit Your Project` and asks for a team name, a Google Drive share link, and an optional context note. The connected Forms API does not support creation of native file-upload questions, so the on-screen instructions correctly direct teams to upload to Drive, allow the host to view the item, then paste the share link in the form.
- **Short showcase redirect:** `https://www.aifilmacademy.com/genjam/submit` redirects to the live showcase handoff form.
- **Reflection form:** `https://forms.gle/ajX2kc1qKcZcqCfBA` remains the exact QR destination for the anonymous reflection screen.
