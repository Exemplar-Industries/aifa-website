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

export const INQUIRY_FORM_DEFINITIONS = {
  production: {
    label: "Production project",
    subject: "Production inquiry",
    message: {
      label: "Your message",
      placeholder: "Your message",
    },
    fields: {
      projectType: {
        name: "whatToMake",
        label: "What do you want to make?",
        options: ["Animation", "Commercial", "Story trailer", "Other custom production"],
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
        options: ["Less than $5,000", "$5,000 to $15,000", "$15,000 to $30,000", "$30,000+"],
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
        options: ["Less than $5,000", "$5,000 to $15,000", "$15,000 to $30,000", "$30,000+"],
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
