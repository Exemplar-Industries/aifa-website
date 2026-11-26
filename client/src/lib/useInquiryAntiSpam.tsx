import { useState, type ReactElement } from "react";
import type { InquiryAntiSpam } from "@/lib/formDelivery";

export function useInquiryAntiSpam(): {
  submitting: boolean;
  setSubmitting: (value: boolean) => void;
  honeypotField: ReactElement;
  buildAntiSpam: (turnstileToken: string | null) => InquiryAntiSpam;
} {
  const [formStartedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const honeypotField = (
    <input
      name="companyWebsite"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      value={honeypot}
      onChange={(event) => setHoneypot(event.target.value)}
      style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
    />
  );

  const buildAntiSpam = (turnstileToken: string | null): InquiryAntiSpam => ({
    turnstileToken,
    honeypot,
    elapsedMs: Date.now() - formStartedAt,
  });

  return { submitting, setSubmitting, honeypotField, buildAntiSpam };
}
