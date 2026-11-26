import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://mdjjmanqnlfgttwtlufx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kamptYW5xbmxmZ3R0d3RsdWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTA5NDMsImV4cCI6MjA4OTcyNjk0M30.ZM7qlOkk1y3w7ykqLk9YDQs_W7G25mJ0kKBzB_Nc7yM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const TOTAL_INVITE_SLOTS = 100;
