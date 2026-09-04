-- AI Film Academy private slide archive.
-- Apply to the existing AIFA Supabase project. This never publishes deck media.

create table if not exists public.slide_archive_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'viewer')) default 'viewer',
  status text not null check (status in ('active', 'invited', 'revoked')) default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.slide_archive_invites (
  email text primary key check (email = lower(email)),
  role text not null check (role in ('admin', 'viewer')) default 'viewer',
  status text not null check (status in ('active', 'revoked')) default 'active',
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.slide_decks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  category text not null check (category in ('Course Lessons', 'Strategy', 'Free Training Funnel', 'Workshops & Events', 'Operations', 'Other')),
  description text not null default '',
  thumbnail_path text,
  source_bundle_path text,
  presentation_route text not null,
  presentation_mode text not null check (presentation_mode in ('native', 'legacy', 'external')) default 'native',
  media_manifest jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}'::text[],
  status text not null check (status in ('ready', 'draft', 'archived')) default 'draft',
  sort_order integer not null default 100,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists slide_decks_category_idx on public.slide_decks(category, sort_order, created_at desc);

create or replace function public.is_active_slide_archive_member()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.slide_archive_members where user_id = auth.uid() and status = 'active');
$$;

create or replace function public.is_slide_archive_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.slide_archive_members where user_id = auth.uid() and status = 'active' and role = 'admin');
$$;

create or replace function public.claim_slide_archive_access()
returns void language plpgsql security definer set search_path = public as $$
declare
  current_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  approved_role text;
begin
  if auth.uid() is null or current_email = '' then raise exception 'Authenticated archive account required'; end if;
  if current_email = 'llcexemplar@gmail.com' then
    insert into public.slide_archive_members (user_id, role, status) values (auth.uid(), 'admin', 'active')
    on conflict (user_id) do update set role = 'admin', status = 'active', updated_at = now();
    return;
  end if;
  select role into approved_role from public.slide_archive_invites where email = current_email and status = 'active';
  if approved_role is not null then
    insert into public.slide_archive_members (user_id, role, status) values (auth.uid(), approved_role, 'active')
    on conflict (user_id) do update set role = excluded.role, status = 'active', updated_at = now();
  end if;
end;
$$;

create or replace function public.invite_slide_archive_user(target_email text, target_role text default 'viewer')
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_slide_archive_admin() then raise exception 'Archive administrator required'; end if;
  if target_role not in ('admin', 'viewer') then raise exception 'Invalid archive role'; end if;
  insert into public.slide_archive_invites (email, role, status, invited_by)
  values (lower(trim(target_email)), target_role, 'active', auth.uid())
  on conflict (email) do update set role = excluded.role, status = 'active', invited_by = auth.uid(), updated_at = now();
end;
$$;

alter table public.slide_archive_members enable row level security;
alter table public.slide_archive_invites enable row level security;
alter table public.slide_decks enable row level security;

drop policy if exists "archive members can read membership" on public.slide_archive_members;
create policy "archive members can read membership" on public.slide_archive_members for select
  using (auth.uid() = user_id or public.is_slide_archive_admin());

drop policy if exists "archive admins manage memberships" on public.slide_archive_members;
create policy "archive admins manage memberships" on public.slide_archive_members for all
  using (public.is_slide_archive_admin()) with check (public.is_slide_archive_admin());

drop policy if exists "archive admins manage invites" on public.slide_archive_invites;
create policy "archive admins manage invites" on public.slide_archive_invites for all
  using (public.is_slide_archive_admin()) with check (public.is_slide_archive_admin());

drop policy if exists "active archive members read decks" on public.slide_decks;
create policy "active archive members read decks" on public.slide_decks for select
  using (public.is_active_slide_archive_member());

drop policy if exists "archive admins manage decks" on public.slide_decks;
create policy "archive admins manage decks" on public.slide_decks for all
  using (public.is_slide_archive_admin()) with check (public.is_slide_archive_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('aifa-slide-archive', 'aifa-slide-archive', false, 26214400, array['video/mp4', 'image/jpeg', 'image/png', 'image/webp', 'application/json', 'application/zip'])
on conflict (id) do update set public = false, file_size_limit = 26214400;

drop policy if exists "archive members download protected media" on storage.objects;
create policy "archive members download protected media" on storage.objects for select
  using (bucket_id = 'aifa-slide-archive' and public.is_active_slide_archive_member());

drop policy if exists "archive admins manage protected media" on storage.objects;
create policy "archive admins manage protected media" on storage.objects for all
  using (bucket_id = 'aifa-slide-archive' and public.is_slide_archive_admin())
  with check (bucket_id = 'aifa-slide-archive' and public.is_slide_archive_admin());

grant execute on function public.claim_slide_archive_access() to authenticated;
grant execute on function public.invite_slide_archive_user(text, text) to authenticated;

insert into public.slide_decks (slug, title, category, description, source_bundle_path, presentation_route, presentation_mode, media_manifest, tags, status, sort_order)
values
  ('camera-motion', 'Camera Motion', 'Course Lessons', 'A concise visual foundation for push-ins, pull-outs, tracking, pans, orbits, and crane moves.', null, '/internal/slide-archive/camera-motion', 'native', '{"pushIn":"decks/camera-motion/media/push_in_guitar_tuning.mp4","pullOut":"decks/camera-motion/media/pull_out_guitar_fireplace.mp4","tracking":"decks/camera-motion/media/tracking_car_driving_away.mp4","pan":"decks/camera-motion/media/orbit_guitar_fireplace.mp4","orbit":"decks/camera-motion/media/orbit_option_b_first4.mp4","crane":"decks/camera-motion/media/crane_neon_market_trimmed.mp4"}'::jsonb, array['Camera', 'Motion', 'Course lesson'], 'ready', 10),
  ('better-youth-genjam', 'Better Youth GenJam', 'Workshops & Events', 'The interactive Machine Cinema live workshop system for Better Youth GenJam.', null, '/genjam/better-youth-0829', 'legacy', '{}'::jsonb, array['GenJam', 'Workshop', 'Interactive'], 'ready', 20)
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, description = excluded.description,
  source_bundle_path = excluded.source_bundle_path, presentation_route = excluded.presentation_route,
  presentation_mode = excluded.presentation_mode, media_manifest = excluded.media_manifest,
  tags = excluded.tags, status = excluded.status, sort_order = excluded.sort_order, updated_at = now();
