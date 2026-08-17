const AIFA_FORM_DELIVERY_URL = "https://exemplar.app.n8n.cloud/webhook/aifa-website-form-inquiry";

export async function deliverAifaForm(formType: string, fields: Record<string, string>) {
  const response = await fetch(AIFA_FORM_DELIVERY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, fields }),
  });

  if (!response.ok) {
    throw new Error(`Form delivery failed with status ${response.status}`);
  }

  return response.json() as Promise<{ success: boolean }>;
}
