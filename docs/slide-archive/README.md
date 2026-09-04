# AI Film Academy Private Slide Archive

The archive lives in this repository and is exposed in the AIFA app at `/internal/slide-archive`. It is intentionally separated from the public website shell and does not include deck media in the Vite build.

## Privacy model

The app uses Supabase magic-link authentication, an owner-only first-claim path, the `slide_archive_invites` approved-user allowlist, and row-level security. Deck records are only readable by approved active members. Media is stored only in the private `aifa-slide-archive` bucket and is delivered to the browser through short-lived signed URLs after the user has authenticated and passed the member check. Do not place future presentation MP4s or deck bundles in `client/public`, `src`, or the public GitHub repository.

## One-time AIFA backend provisioning

Apply `supabase/migrations/202609040001_private_slide_archive.sql` to the existing AIFA Supabase project. The migration creates the membership/deck tables, RLS policies, private storage bucket, owner bootstrap, and initial Camera Motion + Better Youth GenJam deck records. Confirm that `https://www.aifilmacademy.com/internal/slide-archive` is an approved Supabase Auth redirect URL.

## Camera Motion media migration

Upload the following source files to the exact paths in the private bucket. The presentation will then request signed URLs automatically.

| Source file | Private bucket path |
|---|---|
| `push_in_guitar_tuning.mp4` | `decks/camera-motion/media/push_in_guitar_tuning.mp4` |
| `pull_out_guitar_fireplace.mp4` | `decks/camera-motion/media/pull_out_guitar_fireplace.mp4` |
| `tracking_car_driving_away.mp4` | `decks/camera-motion/media/tracking_car_driving_away.mp4` |
| `orbit_guitar_fireplace.mp4` | `decks/camera-motion/media/orbit_guitar_fireplace.mp4` |
| `orbit_option_b_first4.mp4` | `decks/camera-motion/media/orbit_option_b_first4.mp4` |
| `crane_neon_market_trimmed.mp4` | `decks/camera-motion/media/crane_neon_market_trimmed.mp4` |

The existing 68 MB Camera Motion source bundle exceeds the production bucket's 25 MB per-file guardrail and is archived in the private Master Knowledge Base Drive folder as `AIFA_Camera_Motion_Deck_Source_2026-09-03.zip`. Future bundles under 25 MB may be uploaded to the private bucket; larger source bundles should be retained in the Master Knowledge Base and linked from the deck record.

## Future deck import

Approved archive administrators first add internal emails through **Manage internal access**. An approved user receives no public listing and must authenticate with that exact email before their archive account is claimed. Administrators can then use **Import future deck** to upload a private source bundle, thumbnail, and media files and create a draft deck record. The presentation route must then be implemented in this repository and registered in `client/src/pages/SlideArchive.tsx`. This keeps native interactive rendering intentional rather than attempting to render untrusted uploaded HTML inside the app.
