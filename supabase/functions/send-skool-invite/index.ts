import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SKOOL_WEBHOOK_BASE_URL =
  "https://api2.skool.com/groups/aifilmacademy/webhooks/9a86544a0f29423a9a02444dfe481693";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const skoolUrl = `${SKOOL_WEBHOOK_BASE_URL}?email=${encodeURIComponent(email.trim().toLowerCase())}`;

    const skoolRes = await fetch(skoolUrl, { method: "GET" });

    if (!skoolRes.ok) {
      const body = await skoolRes.text();
      console.error(`Skool webhook error: ${skoolRes.status} — ${body}`);
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
