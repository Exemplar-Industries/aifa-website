# Better Youth GenJam — Human–Agent Collaboration and Feedback Protocol

## Objective

Use this protocol when a high-stakes live deck is built collaboratively under a tight deadline. Its purpose is to protect the presenter’s taste, turn direct critique into deterministic requirements, and preserve shipping velocity without pretending early work is finished.

## Working principle

The presenter owns the audience, the workshop truth, the brand intent, and the final standard. The agent owns synthesis, execution, exact tracking, verification, technical implementation, and documentation. The relationship works when feedback is handled as **production direction**, not as a request for debate.

> “Show me the intended result in the exact frame where the audience will see it.”

## Feedback intake format

For every review pass, log feedback using this structure before implementing changes.

| Field | Required detail | Example |
|---|---|---|
| Location | Slide number plus stable slide ID if known. | `Slide 21 / storyboard` |
| Category | Copy, layout, media, logo, motion, interaction, route/QR, or order. | `media geometry` |
| Observed failure | What the audience sees, not an internal guess. | `Storyboard collage is cropped; cannot see every frame.` |
| Desired end state | Observable result. | `Full collage visible; keep the copy column clear.` |
| Acceptance test | Exact verification action. | `Check Slide 21 at 16:9; every frame visible, no white border crushing text.` |
| Dependency | Owner asset/link/approval needed, if any. | `Replacement storyboard image supplied by Brandon.` |
| Status | Queued, implemented, verified locally, verified production, or blocked. | `Verified production` |

Do not answer “done” while items remain queued. If a dependency blocks a fix, name it explicitly and limit status claims to what has actually been verified.

## Review cadence

### 1. Establish source authority before drafting

Review the event brief, all available reference code, approved brand assets, participant resources, and presenter notes. Label which source governs visual behavior, content sequence, tone, and logistics. In this project, visual behavior came from the Machine Cinema reference system; workshop truth and wording came from Brandon’s direction; approved media/logo assets came from the supplied bundle.

### 2. Deliver a visual draft early

If the user requests a visual live deck, the first useful handoff is a working presentation URL—not a document or a generic outline. A draft can be incomplete, but it must be visible, navigable, and representative enough to invite accurate feedback.

### 3. Review in exact visible units

Use numbered slides and screenshots/live browser geometry. A note like “Slide 7 video overlaps title” should become a single tracked requirement with a visible acceptance condition. Avoid responding to the mood of the feedback; respond to its observable content.

### 4. Group related changes, then verify them together

When the user identifies systemic failures—headline wrapping, player ratios, footer legibility, QR/fallback handoffs—implement a single coherent solution rather than a series of cosmetic micro-patches. Then check every affected slide group. The goal is a visibly meaningful improvement, not an output that looks almost unchanged.

### 5. Separate “implemented” from “verified production”

Use a simple status vocabulary:

| Status | Meaning |
|---|---|
| Queued | Requirement is understood and recorded but not yet changed. |
| Implemented | Code/asset update exists locally. |
| Verified locally | A local browser/build check confirms the intended result. |
| Deploying | Change is pushed but public traffic has not been confirmed. |
| Verified production | The canonical live URL shows the intended result. |
| Blocked | A specific asset, URL, permission, or provider condition prevents verification. |

### 6. Close with a living handoff

At completion, write a dated record that names the canonical route, approved status, important links, code locations, asset decisions, commits, current limitations, and reusable rules. Retain the deck’s final state as a baseline; do not reopen completed visual revisions without a new scoped request.

## Non-negotiable visual review questions

Ask these questions in every pass before declaring a live deck ready:

1. Can an audience member read every important word from the intended viewing distance?
2. Is every desktop headline intentionally one or two lines, with no orphaned word or punctuation?
3. Does the footer/HUD collide with content on any dense slide?
4. Does every video preserve native playback and intentional framing?
5. Does every reference image expose the details the facilitator needs to teach from?
6. Does each QR have a visible click/tap fallback URL?
7. Is the deck showing only elements that help the facilitator lead the room?
8. Has the exact production route—not a preview—been checked?

## Tone and escalation

Direct feedback, including frustration, signals that the user has found a gap between requested and visible output. Acknowledge the issue, state the corrective action, and continue with evidence. Do not become defensive, summarize unfinished work as complete, or ask the user to repeat feedback already supplied.

Escalate to the user only when there is an actual decision to make: significant spend, public posting, irreversible change, unsupplied critical asset, unclear audience/policy framing, access permission, or a production/platform blocker that has exhausted safe alternatives. Otherwise, work autonomously.

## Reusable conclusion

The strongest human–agent collaboration pattern is not “one perfect prompt.” It is a rapid sequence of visible artifact → precise direction → scoped correction → evidence-based verification → persistent documentation. The Better Youth GenJam became a 10/10 baseline when the team adopted that standard and held every visual/functional claim to the real presentation frame.
