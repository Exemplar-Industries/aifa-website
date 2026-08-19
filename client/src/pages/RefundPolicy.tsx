const SECTION_STYLE: React.CSSProperties = {
  padding: "1.5rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={SECTION_STYLE}>
      <h2
        style={{
          color: "#F5F5F0",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
          letterSpacing: "0.03em",
          lineHeight: 1,
          marginBottom: "0.8rem",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}

const CONTACT_EMAIL = "hello@aifilmacademy.com";
const linkStyle = { color: "var(--afa-red)", fontWeight: 700 };

export default function RefundPolicy() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, color-mix(in srgb, var(--afa-red) 25%, transparent), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Refund & <span style={{ color: "var(--afa-red)" }}>Cancellation Policy</span></h1>
          <p style={{ maxWidth: "760px", color: "rgba(255,255,255,0.92)", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.7 }}>Every new membership includes a clear 7-day refund window. This policy explains refunds, cancellation, renewals, and membership access for AI Film Academy memberships purchased through Stripe.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: August 18, 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <Section title="7-Day, No-Questions-Asked Refund">
          <p>Every new AI Film Academy membership includes a full 7-day, no-questions-asked refund window. The window begins on the date and time of your first successful membership payment.</p>
          <p style={{ marginTop: "0.85rem" }}>To request a refund, email <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a> from the email address used for your purchase within 7 calendar days. Please include your name and purchase email so we can locate the transaction.</p>
          <p style={{ marginTop: "0.85rem" }}>When a refund is issued, membership access, private-community access, and member-only resources end when the refund is processed.</p>
        </Section>

        <Section title="How Refunds Are Processed">
          <p>Approved refunds are returned to the original payment method through Stripe. Your financial institution controls when the credit appears on your statement, and it may take several business days after we issue the refund. If we cannot locate a purchase or need more information to process the request, we will contact you using the purchase email.</p>
        </Section>

        <Section title="Monthly and Annual Memberships">
          <p>AI Film Academy offers recurring monthly and annual membership plans. Your plan renews automatically at the end of each billing period unless you cancel before the next renewal date. The price, billing frequency, and any applicable promotional terms shown at Stripe checkout control your purchase.</p>
          <p style={{ marginTop: "0.85rem" }}>The 7-day refund window applies only to your first successful membership payment. Except where required by law, payments made after that initial window are not refundable. Cancelling a membership stops future renewals; it does not automatically create a refund for a completed billing period.</p>
        </Section>

        <Section title="How to Cancel">
          <p>You have easy access to manage billing through Stripe using the billing-portal link in your billing and receipt emails. Use that portal to cancel before your next renewal date. If you cannot access it, email <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a> before your next renewal date and we will help you cancel.</p>
          <p style={{ marginTop: "0.85rem" }}>Unless a refund is issued, you retain membership access through the end of the billing period you already paid for. Cancellation does not delete your account records that we need to keep for billing, security, or legal purposes.</p>
        </Section>

        <Section title="Custom Productions and Corporate Services">
          <p>This policy applies to AI Film Academy memberships. Done-for-you productions, corporate events, workshops, speaking engagements, deposits, and other custom services may have separate scope, cancellation, payment, and refund terms in the applicable proposal, statement of work, invoice, or agreement. If those service-specific terms conflict with this policy, the service-specific terms control.</p>
        </Section>

        <Section title="Contact">
          <p>For membership billing, cancellation, or refund requests, contact <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>. We will respond using the purchase information you provide.</p>
        </Section>
      </section>
    </main>
  );
}
