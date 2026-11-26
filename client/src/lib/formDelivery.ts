const AIFA_INQUIRY_URL = "/api/inquiry";

type FormDeliveryResponse = {
  success?: boolean;
  error?: string;
};

export type InquiryAntiSpam = {
  turnstileToken?: string | null;
  honeypot?: string;
  elapsedMs?: number;
};

let inFlight = 0;

export async function deliverAifaForm(
  formType: string,
  fields: Record<string, string>,
  antiSpam?: InquiryAntiSpam,
) {
  if (inFlight > 0) {
    throw new Error("Your inquiry is already being sent. Please wait a moment.");
  }

  inFlight += 1;
  try {
    const response = await fetch(AIFA_INQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType,
        fields,
        turnstileToken: antiSpam?.turnstileToken ?? null,
        honeypot: antiSpam?.honeypot ?? "",
        elapsedMs: antiSpam?.elapsedMs,
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as FormDeliveryResponse;
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || "We could not send your inquiry right now. Please try again shortly.");
    }

    return payload as FormDeliveryResponse;
  } finally {
    inFlight -= 1;
  }
}
