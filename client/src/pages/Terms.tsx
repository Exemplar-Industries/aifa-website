const TERMS = [
  {
    title: "Agreement to These Terms",
    body: "These Terms of Service govern your use of AI Film Academy’s website, membership, training, community, events, and related services. By accessing or using a service, creating an account, or purchasing a membership, you agree to these terms and the applicable Refund & Cancellation Policy.",
  },
  {
    title: "Membership Access",
    body: "AIFA membership provides access to the benefits described at purchase, which may include training, feedback, live events, community participation, certification pathways, and curated opportunities. We may improve, update, replace, or retire individual lessons, events, and features while maintaining the overall value of the membership.",
  },
  {
    title: "Billing and Renewal",
    body: "Membership subscriptions are processed through Stripe. Your selected plan renews automatically at the billing interval presented at checkout unless you cancel before the next renewal date. You are responsible for keeping your billing details current and may manage eligible subscription settings through the Stripe billing portal provided in your billing communications.",
  },
  {
    title: "Refunds and Cancellation",
    body: "New memberships are covered by the 7-day, no-questions-asked refund window described in the Refund & Cancellation Policy. That policy is incorporated into these terms. Cancellation prevents future renewal; it does not automatically create a refund for a completed billing period.",
  },
  {
    title: "Community Conduct",
    body: "You are responsible for your conduct in AIFA community spaces. Do not use the community to harass others, post unlawful or infringing material, distribute spam, misrepresent your identity or work, or disrupt the learning environment. We may suspend or remove access for conduct that violates these terms or materially harms the community.",
  },
  {
    title: "Your Work and Our Materials",
    body: "You retain ownership of original work you create, subject to the rights of any third-party tools, models, music, footage, prompts, or assets you use. AIFA materials, including lessons, templates, videos, community materials, and branding, are provided for your personal or internal professional use and may not be copied, resold, redistributed, or used to create a competing training product without written permission.",
  },
  {
    title: "Outcomes and Opportunities",
    body: "AIFA provides education, creative feedback, and access to opportunities. We do not guarantee employment, client work, festival selection, revenue, audience growth, tool performance, or any particular creative or business outcome. You remain responsible for your own projects, decisions, legal clearances, and use of third-party tools.",
  },
  {
    title: "Custom Services",
    body: "Done-for-you productions, corporate events, workshops, speaking engagements, and custom work may be governed by a separate proposal, statement of work, invoice, or agreement. If a service-specific agreement conflicts with these terms, the service-specific agreement controls for that service.",
  },
  {
    title: "Changes and Contact",
    body: "We may update these terms as AIFA evolves. Material changes will be posted on this page with an updated date. For questions about these terms or your membership, contact hello@aifilmacademy.com.",
  },
];

export default function Terms() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, rgba(190,24,24,0.20), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}>← AI Film Academy</a>
          <p style={{ color: "#ef4444", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", margin: "2.5rem 0 1rem" }}>Legal</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Terms of <span style={{ color: "#ef4444" }}>Service</span></h1>
          <p style={{ maxWidth: "680px", color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.75 }}>These terms explain the rules that apply to AI Film Academy membership, training, community participation, and related services.</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: "1.5rem" }}>Last updated: August 12, 2026</p>
        </div>
      </section>
      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {TERMS.map((section) => (
          <section key={section.title} style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.8rem" }}>{section.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.63)", fontSize: "0.98rem", lineHeight: 1.75 }}>{section.body}</p>
          </section>
        ))}
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.76rem", lineHeight: 1.6, marginTop: "2rem" }}>This is a working legal page for AI Film Academy and should be reviewed for legal and operational accuracy before the public payment flow is launched.</p>
      </section>
    </main>
  );
}
