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

const CONTACT_EMAIL = "brandon@aifilmacademy.com";
const linkStyle = { color: "var(--afa-red)", fontWeight: 700 };

export default function RefundPolicy() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, color-mix(in srgb, var(--afa-red) 25%, transparent), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Refund & <span style={{ color: "var(--afa-red)" }}>Cancellation Policy</span></h1>
          <p style={{ maxWidth: "760px", color: "rgba(255,255,255,0.92)", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.7 }}>The AI Film Academy course is a one-time purchase. Every new course purchase includes a 7-day refund window. This policy explains that window, how refunds are returned, and what happens to course and community access.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: October 30, 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <Section title="7-Day, No-Questions-Asked Refund">
          <p>Every new AI Film Academy course purchase includes a full 7-day, no-questions-asked refund window. The window begins on the date and time of the successful payment.</p>
          <p style={{ marginTop: "0.85rem" }}>To request a refund, email <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a> from the email address used for your purchase within 7 calendar days. Please include your name, purchase email, and where you paid (Skool or Stripe) so we can locate the transaction.</p>
          <p style={{ marginTop: "0.85rem" }}>When a refund is issued, course access, private-community access, and member-only resources end when the refund is processed.</p>
        </Section>

        <Section title="How Refunds Are Processed">
          <p>If you bought the $297 Machine Cinema partner rate through Stripe, approved refunds are returned to the original payment method through Stripe. If you bought the $500 course on Skool, include the Skool receipt in your email and we will process the request with Skool. Your financial institution controls when a credit appears on your statement, and it may take several business days after the refund is issued. If we cannot locate a purchase or need more information, we will contact you using the purchase email.</p>
        </Section>

        <Section title="One-Time Course Purchase">
          <p>The public course is a one-time $500 purchase on Skool at <a href="https://www.skool.com/aifilmacademy/about" style={linkStyle}>skool.com/aifilmacademy/about</a>. The only other course price is the Machine Cinema partner rate, a one-time $297 purchase through the Stripe checkout on the GenJam offer page. That payment includes the self-paced course and the community.</p>
          <p style={{ marginTop: "0.85rem" }}>AI Film Academy does not sell a monthly, annual, or lifetime plan for this course, and a course purchase does not renew. The 7-day refund window applies to that one-time payment. Except where required by law, a request made after the 7 calendar days is not refundable.</p>
        </Section>

        <Section title="Access After You Pay">
          <p>A completed purchase does not create a later bill. Unless a refund is issued, you keep course and community access. A refund request does not delete account records we need to keep for billing, security, or legal purposes.</p>
        </Section>

        <Section title="Custom Productions and Corporate Services">
          <p>This policy applies to the AI Film Academy course. Done-for-you productions, corporate events, workshops, speaking engagements, deposits, and other custom services may have separate scope, cancellation, payment, and refund terms in the applicable proposal, statement of work, invoice, or agreement. If those service-specific terms conflict with this policy, the service-specific terms control.</p>
        </Section>

        <Section title="Contact">
          <p>For a course refund request, contact <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>. We will respond using the purchase information you provide.</p>
        </Section>
      </section>
    </main>
  );
}
