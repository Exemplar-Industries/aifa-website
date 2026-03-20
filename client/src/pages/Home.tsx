/*
 * AI Film Academy — Home Page (Landing Page)
 * Design: "The Director's Cut" — Cinematic Dark
 * Goal: Convert cold Meta Ads traffic → $19/month Skool subscription
 * All CTAs link to: https://www.skool.com/aifilmacademy (with affiliate ref if present)
 *
 * Section order (conversion-optimized):
 * Hero → Stats → Reviews (social proof early) → Partners (credibility) →
 * Problem → What You Get → Workflow → Pricing → FAQ → CTA → Footer
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import ProblemSection from "@/components/ProblemSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <TestimonialsSection />
      <PartnersSection />
      <ProblemSection />
      <WhatYouGetSection />
      <WorkflowSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
