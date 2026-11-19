import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { INQUIRY_FORM_DEFINITIONS, InquiryKind } from "@/lib/inquiryForms";

type IdentityValues = {
  name: string;
  email: string;
  phone: string;
};

type IdentityProps = {
  values?: IdentityValues;
  setValues?: Dispatch<SetStateAction<IdentityValues>>;
  fieldClassName: string;
  gridClassName: string;
  nameId: string;
  emailId: string;
  showPhone?: boolean;
  phoneId?: string;
};

type MasterFieldsProps = {
  kind: InquiryKind;
  fieldClassName: string;
  gridClassName: string;
  fullFieldClassName?: string;
  idPrefix: string;
  eventDelivery?: string;
  onEventDeliveryChange?: (value: string) => void;
  projectValue?: string;
  onProjectChange?: (value: string) => void;
  projectDefault?: string;
};

const fieldClasses = (base: string, full?: string) => `${base}${full ? ` ${full}` : ""}`;

const SKOOL_ABOUT_URL = "https://www.skool.com/aifilmacademy/about";

export function LearnerRedirectNote() {
  return (
    <div style={{ margin: "0 0 1rem", textAlign: "center" }}>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.92)", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55 }}>
        Looking to learn AI filmmaking? The AI Film Academy community and course are free.{" "}
        <a href={SKOOL_ABOUT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--afa-red)" }}>Join here.</a>
      </p>
      <p style={{ margin: "0.7rem 0 0", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55 }}>
        <a href="/free-video-training" style={{ color: "var(--afa-red)" }}>Get the free AI filmmaking video training</a>
      </p>
    </div>
  );
}

export function InquiryIdentityFields({ values, setValues, fieldClassName, gridClassName, nameId, emailId, showPhone = false, phoneId = "phone" }: IdentityProps) {
  const update = (key: keyof IdentityValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues?.((current) => ({ ...current, [key]: event.target.value }));
  };

  return (
    <div className={gridClassName}>
      <div className={fieldClassName}>
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} name="name" value={values?.name} onChange={update("name")} required />
      </div>
      <div className={fieldClassName}>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} name="email" type="email" value={values?.email} onChange={update("email")} required />
      </div>
      {showPhone && <div className={fieldClassName}>
        <label htmlFor={phoneId}>Phone <span aria-hidden="true">(optional)</span></label>
        <input id={phoneId} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values?.phone} onChange={update("phone")} />
        <small>Share only if you would like a call or text about this inquiry.</small>
      </div>}
    </div>
  );
}

function SelectField({ id, className, name, label, options, required, value, onChange, defaultOption }: {
  id: string;
  className: string;
  name: string;
  label: string;
  options: readonly string[];
  required: boolean;
  value?: string;
  onChange?: (value: string) => void;
  defaultOption?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        defaultValue={value === undefined ? (defaultOption ?? "") : undefined}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="" disabled>Select one</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

export function MasterInquiryFields({ kind, fieldClassName, gridClassName, fullFieldClassName, idPrefix, eventDelivery = "", onEventDeliveryChange, projectValue, onProjectChange, projectDefault }: MasterFieldsProps) {
  if (kind === "production") {
    const { projectType, runtime, budget } = INQUIRY_FORM_DEFINITIONS.production.fields;
    return (
      <div className={gridClassName}>
        <SelectField id={`${idPrefix}-project-type`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...projectType} value={projectValue} onChange={onProjectChange} defaultOption={projectDefault} />
        <SelectField id={`${idPrefix}-runtime`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...runtime} />
        <SelectField id={`${idPrefix}-budget`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...budget} />
        <MessageField kind="production" id={`${idPrefix}-message`} className={fieldClasses(fieldClassName, fullFieldClassName)} />
      </div>
    );
  }

  const { organization, service, delivery, location, budget } = INQUIRY_FORM_DEFINITIONS.event.fields;
  return (
    <div className={gridClassName}>
      <div className={fieldClasses(fieldClassName, fullFieldClassName)}>
        <label htmlFor={`${idPrefix}-organization`}>{organization.label}</label>
        <input id={`${idPrefix}-organization`} name={organization.name} />
      </div>
      <SelectField id={`${idPrefix}-service`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...service} />
      <SelectField id={`${idPrefix}-delivery`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...delivery} value={eventDelivery} onChange={onEventDeliveryChange} />
      {eventDelivery === "In person" && (
        <div className={fieldClasses(fieldClassName, fullFieldClassName)}>
          <label htmlFor={`${idPrefix}-location`}>{location.label}</label>
          <input id={`${idPrefix}-location`} name={location.name} placeholder={location.placeholder} required />
        </div>
      )}
      <SelectField id={`${idPrefix}-budget`} className={fieldClasses(fieldClassName, fullFieldClassName)} {...budget} />
      <MessageField kind="event" id={`${idPrefix}-message`} className={fieldClasses(fieldClassName, fullFieldClassName)} />
    </div>
  );
}

export function MessageField({ kind, id, className }: { kind: InquiryKind; id: string; className: string }) {
  const message = INQUIRY_FORM_DEFINITIONS[kind].message;
  return (
    <div className={className}>
      <label htmlFor={id}>{message.label}</label>
      <textarea id={id} name="message" required placeholder={message.placeholder} />
    </div>
  );
}
