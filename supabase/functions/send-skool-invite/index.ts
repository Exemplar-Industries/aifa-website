import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// The Skool invite webhook URL must be provided as a function secret.
// Do not hardcode it here; this repo is public.
const SKOOL_INVITE_WEBHOOK_URL = Deno.env.get("SKOOL_INVITE_WEBHOOK_URL") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!SKOOL_INVITE_WEBHOOK_URL) {
      return new Response(
        JSON.stringify({ success: false, error: "Skool invite is not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const endpoint = new URL(SKOOL_INVITE_WEBHOOK_URL);
    endpoint.searchParams.set("email", email.trim().toLowerCase());

    const skoolRes = await fetch(endpoint, { method: "POST" });

    if (!skoolRes.ok) {
      console.error(`Skool webhook error: ${skoolRes.status}`);
      return new Response(
        JSON.stringify({ success: false, error: `Skool returned ${skoolRes.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
