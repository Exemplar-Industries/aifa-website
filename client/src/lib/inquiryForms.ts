export type InquiryKind = "production" | "event";

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  runtime?: string;
  delivery?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  message: string;
};

type FormEntrySource = FormData;

export const HIGH_TICKET_BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 to $15,000",
  "$15,000 to $25,000",
  "$25,000+",
  "Not sure yet",
] as const;

export const CONSULTING_NEEDS = [
  "Curriculum development",
  "Workshop",
  "Speaking event",
  "Event facilitation",
  "Task force advisory",
  "Large business, nonprofit, or edtech company",
] as const;

export const INQUIRY_FORM_DEFINITIONS = {
  production: {
    label: "Animation",
    subject: "Animation inquiry",
    message: {
      label: "Project details",
      placeholder: "What should the animation cover, where will it live, and what does a strong result look like?",
    },
    fields: {
      budget: {
        name: "budget",
        label: "Budget",
        options: HIGH_TICKET_BUDGET_OPTIONS,
        required: true,
      },
      timeline: {
        name: "timeline",
        label: "Timeline",
        placeholder: "When do you want to start?",
        required: false,
      },
    },
  },
  event: {
    label: "Workshop, GenJam, or keynote",
    subject: "Events inquiry",
    message: {
      label: "Message",
      placeholder: "Tell us what you are planning.",
    },
    fields: {
      organization: {
        name: "organization",
        label: "Organization",
        placeholder: "",
        required: false,
      },
      service: {
        name: "service",
        label: "What would you like to host?",
        options: ["GenJam", "Workshop", "Keynote"],
        required: true,
      },
      delivery: {
        name: "delivery",
        label: "Where should it take place?",
        options: ["In person", "Online", "Hybrid"],
        required: true,
      },
      location: {
        name: "location",
        label: "City and state",
        placeholder: "Example: Austin, TX",
        required: true,
      },
      budget: {
        name: "budget",
        label: "Budget",
        options: HIGH_TICKET_BUDGET_OPTIONS,
        required: false,
      },
    },
  },
} as const;

const read = (form: FormEntrySource, key: string) => String(form.get(key) || "");

export function buildInquiryPayload(kind: InquiryKind, form: FormEntrySource): InquiryPayload {
  if (kind === "production") {
    const fields = INQUIRY_FORM_DEFINITIONS.production.fields;
    return {
      name: read(form, "name"),
      email: read(form, "email"),
      phone: read(form, "phone"),
      budget: read(form, fields.budget.name),
      timeline: read(form, fields.timeline.name),
      message: read(form, "message"),
    };
  }

  const fields = INQUIRY_FORM_DEFINITIONS.event.fields;
  const delivery = read(form, fields.delivery.name);
  return {
    name: read(form, "name"),
    email: read(form, "email"),
    phone: read(form, "phone"),
    company: read(form, fields.organization.name),
    projectType: read(form, fields.service.name),
    delivery,
    location: delivery === "In person" ? read(form, fields.location.name) : "",
    budget: read(form, fields.budget.name),
    message: read(form, "message"),
  };
}
