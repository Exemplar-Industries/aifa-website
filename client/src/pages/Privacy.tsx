const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    body: "We may collect information you provide directly, such as your name, email address, billing details, project submissions, inquiry details, and communications with us. Payment details are processed by Stripe; AI Film Academy does not store your full payment-card number.",
  },
  {
    title: "How We Use Information",
    body: "We use information to provide membership access, process payments, send member communications, operate the community, deliver training and events, respond to inquiries, improve AIFA services, and protect the security and integrity of our platforms.",
  },
  {
    title: "Payments and Service Providers",
    body: "We use trusted service providers to operate our services. These may include Stripe for payment processing, Skool for community access, email and workflow providers for communications, analytics providers for understanding site use, and hosting or infrastructure providers. These providers process information according to their own applicable terms and privacy practices.",
  },
  {
    title: "Community and Submitted Content",
    body: "Content you choose to post in community spaces, including creative work, comments, and profile information, may be visible to other authorized community members. Do not submit confidential, sensitive, or third-party material unless you have the right to share it in that setting.",
  },
  {
    title: "Cookies and Analytics",
    body: "We may use cookies, pixels, and similar technologies to keep the website functioning, understand traffic and campaign performance, improve the user experience, and measure conversion activity. You can usually manage cookies through your browser settings, though some website features may not function as intended if certain cookies are disabled.",
  },
  {
    title: "Data Retention and Security",
    body: "We retain information for as long as reasonably necessary to provide services, maintain records, comply with legal obligations, resolve disputes, and enforce agreements. We use reasonable safeguards designed to protect information, but no system can guarantee absolute security.",
  },
  {
    title: "Your Choices",
    body: "You may unsubscribe from non-essential marketing communications using the link in those emails. You may also contact us to request assistance with updating information, membership billing, or a privacy-related question. Certain records may need to be retained for legal, security, or operational reasons.",
  },
  {
    title: "Changes and Contact",
    body: "We may update this Privacy Policy as our services evolve. Updates will be posted here with a revised date. For privacy questions, contact hello@aifilmacademy.com.",
  },
];

export default function Privacy() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif" }}>
      <section style={{ padding: "clamp(6rem, 12vw, 9rem) 1.5rem 4rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(ellipse at 15% 25%, rgba(190,24,24,0.20), transparent 42%), #080808" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}>← AI Film Academy</a>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 9vw, 7rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.3rem" }}>Privacy <span style={{ color: "#ef4444" }}>Policy</span></h1>
          <p style={{ maxWidth: "680px", color: "rgba(255,255,255,0.86)", fontSize: "1.05rem", lineHeight: 1.75 }}>This policy describes how AI Film Academy collects, uses, and protects information in connection with our website, membership, community, and services.</p>
          <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", marginTop: "1.5rem" }}>Last updated: August 12, 2026</p>
        </div>
      </section>
      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title} style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            <h2 style={{ color: "#F5F5F0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.8rem" }}>{section.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", lineHeight: 1.75 }}>{section.body}</p>
          </section>
        ))}
        <p style={{ color: "rgba(255,255,255,0.86)", fontSize: "1rem", lineHeight: 1.6, marginTop: "2rem" }}>This is a working legal page for AI Film Academy and should be reviewed for legal and operational accuracy before the public payment flow is launched.</p>
      </section>
    </main>
  );
}
