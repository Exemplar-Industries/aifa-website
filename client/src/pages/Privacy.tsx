const PRIVACY_SECTIONS = [
  {
    title: "Who We Are",
    body: "AI Film Academy is operated by Exemplar Industries, LLC. In this policy, AI Film Academy, AIFA, we, us, and our refer to Exemplar Industries, LLC and the AI Film Academy services we operate.",
  },
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, including your name, email address, inquiry details, project brief, messages, training-signup information, and communications with us. If you purchase a membership, we receive transaction and subscription information from Stripe, such as your customer contact details, plan, payment status, and subscription status. Stripe processes payment-card information; we do not receive or store your full payment-card number.",
  },
  {
    title: "How We Use Information",
    body: "We use information to respond to inquiries, deliver requested training, operate membership access, manage subscriptions and billing support, send service and account communications, invite eligible members to the private community, run training and events, improve the website and services, protect the security and integrity of our systems, and comply with legal, accounting, and recordkeeping obligations.",
  },
  {
    title: "Marketing Email",
    body: "When you opt in to receive the free training and occasional AI Film Academy emails, we use your name and email address to deliver that training and send related marketing communications. You can unsubscribe from marketing emails at any time using the unsubscribe link in the email. We may still send non-marketing messages that are necessary to provide a service, manage a purchase, or respond to a request you made.",
  },
  {
    title: "Payments, Community, and Service Providers",
    body: "We use service providers to operate the business. These include Stripe for checkout, recurring billing, and payment processing; Skool for private-community access; n8n workflows and email providers to deliver forms, training, notices, and member communications; and hosting and infrastructure providers to run the website. These providers process information only as needed to provide their services, subject to their own privacy terms and applicable agreements.",
  },
  {
    title: "Advertising and Website Analytics",
    body: "We use the Meta Pixel to measure website visits, campaign performance, affiliate attribution, and selected site actions such as membership-call-to-action clicks. We also use Microsoft Clarity to understand how visitors interact with the website through behavioral metrics, heatmaps, and session replay so we can improve the site and our marketing. These technologies may collect device, browser, page-view, interaction, referral, cookie, and similar usage information. They do not give us your payment-card number.",
  },
  {
    title: "Cookies, Session Storage, and Referral Attribution",
    body: "The website uses cookies, pixels, session storage, and similar technologies. For example, we may store an affiliate referral code in session storage so we can attribute a visit or eligible call to action to the creator who referred it. You can control cookies through your browser settings. Blocking cookies or similar technologies may affect certain site features or measurement.",
  },
  {
    title: "How Information Is Disclosed",
    body: "We do not sell your personal information for money. We disclose information to our service providers when needed to operate the site and services, process payments, deliver communications, provide community access, prevent fraud, or comply with law. Our use of the Meta Pixel involves sharing website event and device-related information with Meta for advertising measurement and related purposes. Depending on where you live, that activity may be treated as a form of sharing for cross-context behavioral advertising.",
  },
  {
    title: "Community and Submitted Content",
    body: "Content you choose to post in AI Film Academy community spaces, including creative work, comments, and profile information, may be visible to other authorized community members. Do not submit confidential, sensitive, or third-party material unless you have the right to share it. You remain responsible for obtaining any permissions or clearances required for your own project materials.",
  },
  {
    title: "Data Retention and Security",
    body: "We retain information for as long as reasonably necessary to provide services, maintain records, resolve disputes, enforce agreements, meet legal or accounting obligations, and operate the business. We use reasonable administrative, technical, and organizational safeguards designed to protect information. No internet transmission, storage system, or service provider can guarantee absolute security.",
  },
  {
    title: "Your Privacy Choices",
    body: (
      <span>
        You may unsubscribe from marketing email at any time. You may ask us to update, access, correct, or delete information we hold about you, subject to applicable law and legitimate recordkeeping needs, by emailing <a href="mailto:hello@aifilmacademy.com" style={{ color: "var(--afa-red)" }}>hello@aifilmacademy.com</a>. You can also manage interest-based advertising through your browser settings, Meta advertising settings, or the industry opt-out tools at <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer" style={{ color: "var(--afa-red)" }}>optout.aboutads.info</a>. Where applicable law gives you additional privacy rights, we will honor verified requests as required.
      </span>
    ),
  },
  {
    title: "International Visitors",
    body: "AI Film Academy is operated in the United States. If you access the site from another country, your information may be processed in the United States or other places where our service providers operate. We use the safeguards and service-provider arrangements available to us for those transfers.",
  },
  {
    title: "Children",
    body: "Our public website, membership, and services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, contact us and we will take appropriate steps to address the request.",
  },
  {
    title: "Changes and Contact",
    body: "We may update this policy as our services or practices change. We will post an updated date when we do. For privacy questions or requests, email hello@aifilmacademy.com.",
  },
];

export default function Privacy() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, color-mix(in srgb, var(--afa-red) 25%, transparent), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Privacy <span style={{ color: "var(--afa-red)" }}>Policy</span></h1>
          <p style={{ maxWidth: "760px", color: "rgba(255,255,255,0.92)", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.7 }}>This policy explains the limited customer, inquiry, payment, email, community, advertising, and website-usage information we collect, why we use it, and the choices available to you.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: August 18, 2026</p>
        </div>
      </section>
      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title} id={section.title === "Your Privacy Choices" ? "privacy-choices" : undefined} style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.8rem" }}>{section.title}</h2>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.75 }}>{section.body}</div>
          </section>
        ))}
      </section>
    </main>
  );
}
