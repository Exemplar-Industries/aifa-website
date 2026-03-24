/*
 * AI Film Academy — Home Page (Landing Page)
 * Design: "The Director's Cut" — Cinematic Dark
 * Goal: Convert cold Meta Ads traffic → $19/month Skool subscription
 *
 * CONVERSION-OPTIMIZED SECTION ORDER (updated):
 * 1. Hero          — Above fold, video, headline, CTA
 * 2. StatsBar      — Quick credibility numbers (1100+ creators, 5.0★, etc.)
 * 3. Testimonials  — Google reviews early — social proof while attention is high
 * 4. Problem       — "AI filmmaking is overwhelming. We fixed that." — agitate pain
 * 5. Workflow      — "One Workflow. Three Steps." — the solution / the system
 * 6. Pricing       — The close. Right after the solution is presented.
 * 7. FAQ           — Handle objections before they bounce
 * 8. FinalCTA      — Last push
 * 9. Footer        — Partners logos moved here (credibility without a full section)
 *
 * REMOVED from main flow:
 * - WhatYouGetSection: too long, interrupts momentum between Problem and System
 * - PartnersSection: moved into Footer as compact logo strip
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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-x-hidden">
      <Navbar />

      {/* 1. HERO — above fold, video center stage */}
      <HeroSection />

      {/* 2. STATS — instant credibility numbers */}
      <StatsBar />

      {/* 3. SOCIAL PROOF — Google reviews while attention is highest */}
      <TestimonialsSection />

      {/* 4. PROBLEM — agitate the pain: AI filmmaking is overwhelming */}
      <ProblemSection />

      {/* 5. SYSTEM — the solution: One Workflow, Three Steps */}
      <WorkflowSection />

      {/* 6. PRICING — close immediately after the solution */}
      <PricingSection />

      {/* 7. FAQ — handle objections */}
      <FAQSection />

      {/* 8. FINAL CTA — last push */}
      <FinalCTASection />

      {/* 9. FOOTER — partners logos live here now */}
      <Footer />
    </div>
  );
}
