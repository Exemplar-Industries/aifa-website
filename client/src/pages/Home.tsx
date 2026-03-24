/*
 * AI Film Academy — Home Page (Landing Page)
 * Design: "The Director's Cut" — Cinematic Dark
 * Goal: Convert cold Meta Ads traffic → $19/month Skool subscription
 *
 * CONVERSION-OPTIMIZED SECTION ORDER:
 * 1. Hero          — Above fold, video, headline, CTA
 * 2. StatsBar      — Quick credibility numbers
 * 3. Testimonials  — Google reviews while attention is highest
 * 4. Problem       — "AI filmmaking is overwhelming. We fixed that."
 * 5. Workflow      — "One Workflow. Three Steps." — the solution
 * 6. Pricing       — The close
 * 7. FinalCTA      — "The Decision" — last push
 * 8. TrustedBy     — Compact "Trusted By" strip — last-second credibility
 * 9. FAQ           — Objection handling for those who scroll past the close
 * 10. Footer       — Links, legal, copyright
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProblemSection from "@/components/ProblemSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import TrustedBySection from "@/components/TrustedBySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-x-hidden">
      <Navbar />

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. STATS */}
      <StatsBar />

      {/* 3. TRUSTED BY — credibility before social proof */}
      <TrustedBySection />

      {/* 4. SOCIAL PROOF */}
      <TestimonialsSection />

      {/* 5. PROBLEM */}
      <ProblemSection />

      {/* 6. SYSTEM */}
      <WorkflowSection />

      {/* 7. PRICING — the close */}
      <PricingSection />

      {/* 8. FINAL CTA — "The Decision" */}
      <FinalCTASection />

      {/* 9. FAQ — objection handling */}
      <FAQSection />

      {/* 10. FOOTER */}
      <Footer />
    </div>
  );
}
