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
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Refund <span style={{ color: "var(--afa-red)" }}>Policy</span></h1>
          <p style={{ maxWidth: "760px", color: "rgba(255,255,255,0.92)", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.7 }}>The AI Film Academy community and course are free to join. There is nothing to refund for joining. This page also explains where to write if you paid for the course before it was free.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: November 18, 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <Section title="Nothing to Refund">
          <p>Membership in the AI Film Academy community is free. The course is included when you join on Skool at <a href="https://www.skool.com/aifilmacademy/about" style={linkStyle}>skool.com/aifilmacademy/about</a>. Because joining is free, there is no charge and nothing to refund.</p>
        </Section>

        <Section title="Earlier Payments">
          <p>If you paid for the course before it was free, email <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>. Include your name, the email you used, and where you paid, and we will help with that earlier payment.</p>
        </Section>

        <Section title="Custom Productions and Corporate Services">
          <p>Done-for-you productions, corporate events, workshops, speaking engagements, deposits, and other custom services may have separate scope, cancellation, and refund terms in the applicable proposal, statement of work, invoice, or agreement. If those service-specific terms conflict with this policy, the service-specific terms control.</p>
        </Section>

        <Section title="Contact">
          <p>Questions about this policy, or about a payment made before the community was free, go to <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>{CONTACT_EMAIL}</a>.</p>
        </Section>
      </section>
    </main>
  );
}
