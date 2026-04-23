import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://mdjjmanqnlfgttwtlufx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kamptYW5xbmxmZ3R0d3RsdWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTA5NDMsImV4cCI6MjA4OTcyNjk0M30.ZM7qlOkk1y3w7ykqLk9YDQs_W7G25mJ0kKBzB_Nc7yM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const TOTAL_INVITE_SLOTS = 100;

// Skool direct webhook — append ?email=EMAIL to trigger an instant invite
// Skool sends the invite email directly — no Zapier or n8n needed
export const SKOOL_WEBHOOK_BASE_URL =
  "https://api2.skool.com/groups/aifilmacademy/webhooks/9a86544a0f29423a9a02444dfe481693";
