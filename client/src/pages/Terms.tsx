const TERMS = [
  {
    title: "Agreement to These Terms",
    body: "These Terms of Service govern your use of the AI Film Academy website, course, training, community, events, and related services. AI Film Academy is operated by Exemplar Industries, LLC. By accessing the site, submitting a form, joining the community, or purchasing the course or a service, you agree to these Terms and the Refund & Cancellation Policy.",
  },
  {
    title: "Website and Course Access",
    body: "AI Film Academy provides education, creative practice, feedback, community access, events, and related resources. The public course is a one-time $500 purchase on Skool and includes the self-paced course plus the community. The Machine Cinema partner rate is a separate one-time $297 purchase. We may improve, update, replace, reschedule, or retire individual lessons, events, tools, community features, and resources as the program evolves, while working to preserve the overall value of the course.",
  },
  {
    title: "Billing",
    body: "The course is a one-time purchase. It does not renew, and AI Film Academy does not sell a monthly, annual, or lifetime plan for it. The $500 price is paid on Skool. The $297 Machine Cinema partner rate is paid through Stripe on the GenJam offer page. The price shown at that checkout is the price you pay. There is no later billing period and no billing-portal cancellation, because the purchase does not auto-renew.",
  },
  {
    title: "Refunds",
    body: "New course purchases are covered by the 7-day, no-questions-asked refund window described in the Refund & Cancellation Policy. That policy is incorporated into these Terms. The window starts when the one-time payment succeeds. A request after those 7 calendar days is not a refund except where the law requires one. Unless a refund is issued, course and community access continues.",
  },
  {
    title: "Community Access and Conduct",
    body: "Community access may be provided through a third-party platform such as Skool. You are responsible for your conduct in AI Film Academy community spaces. Do not harass others, post unlawful or infringing material, distribute spam, impersonate another person, misrepresent your work, disclose confidential material without permission, or disrupt the learning environment. We may suspend or remove access for conduct that violates these Terms, applicable platform rules, or the safety of the community.",
  },
  {
    title: "Your Work and Our Materials",
    body: "You retain ownership of original work you create, subject to the rights and terms of the third-party tools, models, music, footage, prompts, assets, and platforms you use. You are responsible for obtaining any permissions, licenses, clearances, and releases needed for your work. AI Film Academy materials, including lessons, templates, videos, community materials, and branding, are provided for your personal or internal professional use. You may not copy, resell, redistribute, publish, or use them to create a competing training product without written permission.",
  },
  {
    title: "AI Tools and Creative Responsibility",
    body: "AI Film Academy teaches creative workflows that may involve third-party AI tools. We do not control those tools, their outputs, their availability, or their terms. You are responsible for reviewing outputs, following the applicable tool terms, and ensuring that your use of any output is lawful and appropriate for your project, client, or audience.",
  },
  {
    title: "Outcomes and Opportunities",
    body: "AI Film Academy provides education, creative practice, feedback, community, and access to opportunities designed to strengthen work readiness, improve portfolio quality, and help members develop a more effective creative process. Where appropriate, we may choose to provide priority visibility for member work or members in connection with relevant briefs or opportunities. That visibility is discretionary, context-specific, and is not a placement promise. Buying the course does not guarantee employment, client work, paid opportunities, income, festival selection, revenue, audience growth, tool performance, certification outcomes, or any particular creative or business result. You remain responsible for your own projects, creative decisions, legal clearances, and professional choices.",
  },
  {
    title: "Custom Productions and Corporate Services",
    body: "Done-for-you productions, corporate events, workshops, speaking engagements, and other custom services may be governed by a separate proposal, statement of work, invoice, or agreement. If a service-specific agreement conflicts with these Terms, the service-specific agreement controls for that service.",
  },
  {
    title: "Third-Party Services and Links",
    body: "The site and services may link to or rely on third-party services, including Stripe, Skool, and creative-AI platforms. Those services are governed by their own terms and privacy practices. We are not responsible for third-party services, content, availability, or transactions outside the scope of our own services.",
  },
  {
    title: "Availability, Disclaimers, and Limits",
    body: "We work to make the site and services available and useful, but they are provided on an as-available basis to the extent permitted by law. We do not promise that the site, community, training, or third-party tools will be uninterrupted, error-free, or suitable for every purpose. Nothing in these Terms limits rights that cannot lawfully be limited.",
  },
  {
    title: "Changes and Contact",
    body: "We may update these Terms as AI Film Academy evolves. We will post an updated date when we do. For questions about these Terms, the course purchase, or access, contact brandon@aifilmacademy.com.",
  },
];

export default function Terms() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, color-mix(in srgb, var(--afa-red) 25%, transparent), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Terms of <span style={{ color: "var(--afa-red)" }}>Service</span></h1>
          <p style={{ maxWidth: "760px", color: "rgba(255,255,255,0.92)", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.7 }}>These Terms explain how the one-time AI Film Academy course, training, community participation, billing, and custom services work.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: October 30, 2026</p>
        </div>
      </section>
      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {TERMS.map((section) => (
          <section key={section.title} style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.8rem" }}>{section.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.75 }}>{section.body}</p>
          </section>
        ))}
      </section>
    </main>
  );
}
