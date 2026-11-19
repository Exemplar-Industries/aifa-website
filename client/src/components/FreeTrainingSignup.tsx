import { FormEvent, useState } from "react";
import Turnstile from "@/components/Turnstile";
import { submitFreeVideoTraining } from "@/lib/freeTrainingSignup";

type FormState = "idle" | "loading" | "success" | "error";

export default function FreeTrainingSignup() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());

  const sendSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === "loading") return;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail || !marketingConsent || !turnstileToken) {
      setFormState("error");
      return;
    }

    setFormState("loading");
    try {
      await submitFreeVideoTraining({
        name: trimmedName,
        email: trimmedEmail,
        turnstileToken,
        companyWebsite,
        formStartedAt,
      });
      window.gtag?.("event", "aifa_free_training_submit_success", {
        form_location: "homepage",
      });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Free Video Training",
          content_category: "free_training_signup",
        });
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <p className="max-w-md text-left text-base font-semibold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
        Check your inbox for the training.
      </p>
    );
  }

  return (
    <form onSubmit={sendSignup} className="grid w-full max-w-md gap-2 text-left">
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="min-h-12 rounded-md border border-white/30 bg-black/55 px-3 text-white placeholder:text-white/70"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="min-h-12 rounded-md border border-white/30 bg-black/55 px-3 text-white placeholder:text-white/70"
        />
      </div>
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={companyWebsite}
        onChange={(event) => setCompanyWebsite(event.target.value)}
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
      />
      <label className="flex items-start gap-2 text-sm font-semibold leading-snug text-white/90">
        <input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} required />
        <span>I agree to receive the free training and occasional AI Film Academy emails. I can unsubscribe anytime.</span>
      </label>
      <Turnstile action="free-training-signup" theme="dark" onTokenChange={setTurnstileToken} />
      <button type="submit" className="btn-primary min-h-12 px-4 py-3 text-[1rem] font-bold" disabled={formState === "loading" || !turnstileToken}>
        {formState === "loading" ? "Sending..." : "Get the free video training"}
      </button>
      {formState === "error" && <p className="text-sm font-semibold text-white">Please complete the security check and try again.</p>}
    </form>
  );
}
