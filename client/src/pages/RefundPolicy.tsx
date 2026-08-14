const SECTION_STYLE: React.CSSProperties = {
  padding: "1.5rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.10)",
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
      <div style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}

export default function RefundPolicy() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, rgba(190,24,24,0.20), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Refund & <span style={{ color: "#ef4444" }}>Cancellation Policy</span></h1>
          <p style={{ maxWidth: "680px", color: "rgba(255,255,255,0.86)", fontSize: "1.05rem", lineHeight: 1.75 }}>We want you to join AI Film Academy with clarity. This policy explains how refunds, cancellation, and membership access work for AFA memberships purchased through Stripe.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: August 12, 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <Section title="7-Day, No-Questions-Asked Refund">
          <p>Every new AI Film Academy membership includes a full 7-day, no-questions-asked refund window. To receive a refund, email <a href="mailto:hello@aifilmacademy.com" style={{ color: "#f87171" }}>hello@aifilmacademy.com</a> from the email address used for your purchase within 7 calendar days of your first successful membership payment. Include your name and the email address associated with the purchase so we can locate the transaction.</p>
          <p style={{ marginTop: "0.85rem" }}>When a refund is issued, access to the AI Film Academy membership, including community access and member-only resources, ends at the time the refund is processed.</p>
        </Section>

        <Section title="How Refunds Are Processed">
          <p>Approved refunds are returned to the original payment method through Stripe. Your financial institution controls when the credit appears on your statement; processing can take several business days after the refund is issued. If we cannot locate your purchase or need additional information, we will contact you through the email address associated with your request.</p>
        </Section>

        <Section title="Monthly and Annual Memberships">
          <p>AI Film Academy offers recurring monthly and annual membership plans. Your membership renews automatically at the end of each billing period unless you cancel before the next renewal date. The amount and billing frequency shown at Stripe checkout are the terms that apply to your membership.</p>
          <p style={{ marginTop: "0.85rem" }}>The 7-day refund window applies to your first successful membership payment. Except where required by law, payments after that initial refund window are not refundable. Cancelling a membership stops future renewals; it does not automatically create a refund for a completed billing period.</p>
        </Section>

        <Section title="How to Cancel">
          <p>You can manage your AI Film Academy subscription through the Stripe billing portal linked in your billing and receipt emails. If you cannot access the billing portal, email <a href="mailto:hello@aifilmacademy.com" style={{ color: "#f87171" }}>hello@aifilmacademy.com</a> before your next renewal date and we will help you cancel. Unless a refund is issued, you retain access through the end of the billing period you have already paid for.</p>
        </Section>

        <Section title="Custom Productions and Corporate Events">
          <p>This policy applies to AI Film Academy memberships. Done-for-you productions, corporate events, workshops, speaking engagements, deposits, and other custom services may have separate scope, cancellation, and payment terms in the applicable proposal, statement of work, invoice, or agreement. If those terms conflict with this policy, the service-specific agreement controls.</p>
        </Section>

        <Section title="Contact">
          <p>For membership billing, cancellation, or refund requests, contact <a href="mailto:hello@aifilmacademy.com" style={{ color: "#f87171" }}>hello@aifilmacademy.com</a>. We will respond as promptly as possible and help resolve the request using the purchase information you provide.</p>
        </Section>

        <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", lineHeight: 1.6, marginTop: "2rem" }}>This is a working policy page for AI Film Academy. It should be reviewed for legal and operational accuracy before the public payment flow is launched.</p>
      </section>
    </main>
  );
}
