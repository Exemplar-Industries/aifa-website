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
    label: "Author animation",
    subject: "Author animation inquiry",
    message: {
      label: "Tell us about the animation",
      placeholder: "What should the animation cover, where will it live, and what does a strong result look like?",
    },
    fields: {
      projectType: {
        name: "whatToMake",
        label: "What do you want to make?",
        options: ["Author animation", "Book or story trailer", "Character animation"],
        required: true,
      },
      runtime: {
        name: "runtime",
        label: "Estimated runtime",
        options: ["Under 60 seconds", "1 to 3 minutes", "3 to 5 minutes", "Over 5 minutes", "Not sure yet"],
        required: false,
      },
      budget: {
        name: "budget",
        label: "Budget",
        options: HIGH_TICKET_BUDGET_OPTIONS,
        required: true,
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
      projectType: read(form, fields.projectType.name),
      runtime: read(form, fields.runtime.name),
      budget: read(form, fields.budget.name),
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
