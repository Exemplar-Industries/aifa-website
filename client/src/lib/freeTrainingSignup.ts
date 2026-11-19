const FREE_TRAINING_WEBHOOK_URL = "https://exemplar.app.n8n.cloud/webhook/free-video-training-signup";

export const FREE_TRAINING_GROUP = "Free Video Training";

type FreeTrainingSignupInput = {
  name: string;
  email: string;
  turnstileToken: string;
  companyWebsite?: string;
  formStartedAt: number;
};

export async function submitFreeVideoTraining({
  name,
  email,
  turnstileToken,
  companyWebsite = "",
  formStartedAt,
}: FreeTrainingSignupInput) {
  const response = await fetch(FREE_TRAINING_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: name,
      email,
      source: "free_video_training",
      group: FREE_TRAINING_GROUP,
      marketingConsent: true,
      turnstileToken,
      companyWebsite,
      submittedAt: new Date().toISOString(),
      elapsedMs: Date.now() - formStartedAt,
    }),
  });

  if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);
}
