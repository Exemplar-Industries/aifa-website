# Private Archive Backend Setup Status

The existing AIFA Supabase project is accessible through the owner’s authenticated browser session. The project URL configured in the site is `https://mdjjmanqnlfgttwtlufx.supabase.co`; the public anonymous key has no permission to create a private bucket or schema objects, as expected under row-level security.

The repository contains the complete idempotent provisioning migration at `supabase/migrations/202609040001_private_slide_archive.sql`. It creates the `slide_archive_members` and `slide_decks` tables, member/admin policies, a private `aifa-slide-archive` bucket, protected object policies, and the initial Camera Motion and Better Youth GenJam records.

The Supabase dashboard SQL editor showed a transient input-submission error after the migration text was entered. The migration has **not** been confirmed as applied; no private deck media has been uploaded or exposed. Use the saved migration file as the source of truth for the next application attempt, and verify `slide_decks` exists before any media upload.

The complete archive UI, authenticated session flow, owner-first-claim method, approved-user invitation workflow, deck registry, native Camera Motion viewer, and Better Youth GenJam archive record now compile successfully in the GitHub codebase. `pnpm check`, the archive metadata Vitest suite, and `pnpm run build` pass. The blocking item is limited to applying the checked-in idempotent migration with a Supabase database-owner session; the public browser API key correctly cannot create a private bucket or bypass row-level security.
