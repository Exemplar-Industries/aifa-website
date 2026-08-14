export default function MembershipSuccess() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "680px", textAlign: "center", padding: "clamp(2rem, 7vw, 4.5rem)", borderRadius: "22px", border: "1px solid rgba(239,68,68,0.28)", background: "radial-gradient(ellipse at 50% 0%, rgba(190,24,24,0.22), transparent 58%), #101010", boxShadow: "0 0 80px rgba(0,0,0,0.5)" }}>
        <p style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.2rem" }}>Payment received</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.3rem, 10vw, 6rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "1.4rem" }}>Welcome to the <span style={{ color: "#ef4444" }}>Academy.</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.08rem", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 2rem" }}>Your Stripe payment has been received. Your AI Film Academy community invite is being sent automatically to the email address used at checkout.</p>
        <div style={{ textAlign: "left", border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.035)", borderRadius: "14px", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "1rem" }}>What happens next</p>
          {[
            "Check the inbox for the email address you used to pay.",
            "Open your AI Film Academy community invitation and accept access.",
            "Start with the AIFA Workflow System, then choose your first project or GenJam.",
          ].map((step, index) => (
            <div key={step} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: index === 2 ? 0 : "0.95rem" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(239,68,68,0.16)", color: "#f87171", fontSize: "0.75rem", fontWeight: 800 }}>{index + 1}</span>
              <span style={{ color: "rgba(255,255,255,0.67)", fontSize: "0.94rem", lineHeight: 1.55 }}>{step}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.86rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>If you do not receive your invite shortly, check spam or contact <a href="mailto:hello@aifilmacademy.com" style={{ color: "#f87171" }}>hello@aifilmacademy.com</a>.</p>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "48px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.24)", padding: "0 1.5rem", color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: "0.9rem" }}>Return to AI Film Academy</a>
      </div>
    </main>
  );
}
