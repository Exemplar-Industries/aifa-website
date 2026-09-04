import { supabase } from "@/lib/supabase";

export const ARCHIVE_BUCKET = "aifa-slide-archive";

export const archiveCategories = [
  "Course Lessons",
  "Strategy",
  "Free Training Funnel",
  "Workshops & Events",
  "Operations",
  "Other",
] as const;

export type ArchiveCategory = (typeof archiveCategories)[number];
export type ArchiveRole = "admin" | "viewer";

export type SlideDeckRecord = {
  id: string;
  slug: string;
  title: string;
  category: ArchiveCategory;
  description: string;
  thumbnail_path: string | null;
  source_bundle_path: string | null;
  presentation_route: string;
  presentation_mode: "native" | "legacy" | "external";
  media_manifest: Record<string, string>;
  tags: string[];
  status: "ready" | "draft" | "archived";
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ArchiveMembership = {
  user_id: string;
  role: ArchiveRole;
  status: "active" | "invited" | "revoked";
};

export type ArchiveInvite = {
  email: string;
  role: ArchiveRole;
  status: "active" | "revoked";
  created_at: string;
};

export async function claimArchiveAccess() {
  const { error } = await supabase.rpc("claim_slide_archive_access");
  if (error) throw error;
}

export async function getArchiveInvites() {
  const { data, error } = await supabase
    .from("slide_archive_invites")
    .select("email, role, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ArchiveInvite[];
}

export async function inviteArchiveUser(email: string, role: ArchiveRole) {
  const { error } = await supabase.rpc("invite_slide_archive_user", {
    target_email: email.trim().toLowerCase(),
    target_role: role,
  });
  if (error) throw error;
}

export async function getArchiveMembership(userId: string) {
  const { data, error } = await supabase
    .from("slide_archive_members")
    .select("user_id, role, status")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data as ArchiveMembership | null;
}

export async function getArchiveDecks() {
  const { data, error } = await supabase
    .from("slide_decks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as SlideDeckRecord[];
}

export async function getArchiveDeck(slug: string) {
  const { data, error } = await supabase
    .from("slide_decks")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as SlideDeckRecord | null;
}

export async function createSignedArchiveUrl(path: string, expiresIn = 60 * 60) {
  const { data, error } = await supabase.storage.from(ARCHIVE_BUCKET).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

export async function createSignedArchiveUrls(paths: Record<string, string>) {
  const entries = await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [key, await createSignedArchiveUrl(path)] as const),
  );
  return Object.fromEntries(entries) as Record<string, string>;
}

export function archiveCategoryClass(category: ArchiveCategory) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
