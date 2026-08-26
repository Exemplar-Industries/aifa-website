const AIFA_FORM_DELIVERY_URL = "https://exemplar.app.n8n.cloud/webhook/aifa-website-form-inquiry";

type FormDeliveryResponse = {
  success?: boolean;
  error?: string;
};

export async function deliverAifaForm(formType: string, fields: Record<string, string>) {
  const response = await fetch(AIFA_FORM_DELIVERY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, fields }),
  });

  const payload = await response.json().catch(() => ({})) as FormDeliveryResponse;
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "We could not send your inquiry right now. Please try again shortly.");
  }

  return payload as FormDeliveryResponse;
}
