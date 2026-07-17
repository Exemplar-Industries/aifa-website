/*
 * AI Film Academy — FAQ Page
 * Design: "The Director's Cut" — dark editorial reference page with compact accordions.
 * Copy: adapted from the supplied FAQ interview Responses tab; pricing excluded.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";

const faqGroups = [
  {
    title: "Getting Started",
    questions: [
      ["What is AI filmmaking?", "AI filmmaking uses generative tools inside a real production process to help creators turn ideas into finished films, ads, trailers, and animation. The technology expands what an individual or small team can produce, while the creator still directs the story, emotion, and final decisions."],
      ["Do I need filmmaking or AI experience to start?", "No. AIFA gives beginners a clear starting point while helping experienced creators add AI to an existing workflow. Members learn by completing real projects, receiving feedback, and improving through repetition."],
      ["What is the biggest mistake beginners make?", "The most common mistake is chasing every new tool and assuming better software will automatically create better work. Strong results come from learning one reliable workflow and practicing the fundamentals of storytelling and production."],
      ["What is the simplest AI filmmaking workflow?", "A practical workflow has three stages: plan the story and visual direction, generate and animate the required shots, then edit the material into a finished piece with pacing, sound, and structure."],
      ["Which tools should beginners learn first?", "Start with a focused set of tools for planning, image or video generation, and editing. The Academy helps members identify what a project actually needs and avoid paying for software that adds complexity without improving the result."],
      ["What should I create as my first project?", "Start small. Build one strong character or visual concept, then create a short trailer or 60-to-90-second film around it. A focused project is easier to finish, review, and improve."],
    ],
  },
  {
    title: "Quality & Creative Skills",
    questions: [
      ["What makes an AI video feel cinematic?", "Cinematic work depends on story, pacing, composition, camera choices, lighting, sound, and emotional intent. AI can generate the pixels, but the creator decides what the audience should feel."],
      ["Do traditional filmmaking skills still matter?", "Yes. Story structure, shot selection, editing, sound design, visual continuity, and directing remain essential. AI changes how images may be produced, but it does not remove the need for creative judgment."],
      ["Does AI replace creativity?", "No. AI lowers production barriers and expands what creators can attempt. It does not choose the meaning of the story, its emotional direction, or the final creative decisions."],
      ["What separates people who improve from people who dabble?", "People improve by finishing projects, reviewing the result, applying feedback, and creating again. Tutorials can introduce a technique, but consistent production is what builds skill, confidence, and a portfolio."],
    ],
  },
  {
    title: "Inside AI Film Academy",
    questions: [
      ["Who is AI Film Academy (AIFA) for?", "AIFA serves creators overwhelmed by the AI tool landscape, storytellers who want to turn ideas into films or trailers, and brand owners who want more distinctive visual content. Members range from beginners to experienced video professionals."],
      ["Why is AIFA a community instead of a one-time course?", "AI filmmaking changes too quickly for a static course to remain sufficient on its own. A community can evolve with the tools while providing live feedback, peer review, accountability, events, portfolio support, and practical help when members get stuck."],
      ["How does AIFA help members build a portfolio?", "Members complete real films, ads, trailers, and animated projects rather than only watching lessons. Weekly challenges, creative exercises, portfolio reviews, events, and feedback turn practice into finished work members can confidently share."],
      ["What feedback and support do members receive?", "Support includes peer review, live expert feedback, office hours, portfolio reviews, and personalized Loom responses when appropriate. The goal is to help members see what is working, understand what to improve, and keep moving toward a stronger final piece."],
      ["What events and creative opportunities are available?", "AIFA connects members with GenJams, competitions, festivals, challenges, portfolio-building exercises, and relevant opportunities shared through the network. Availability changes as new events and partnerships are introduced."],
      ["What is the professional certification?", "Members can work toward an AI filmmaking credential designed to demonstrate completed learning and practical skill development. It can be shared with clients, brands, agencies, and professional networks as part of a broader portfolio."],
      ["What results can a complete beginner expect?", "Beginners can progress from learning the workflow to completing short films and portfolio pieces faster than they may expect, provided they create consistently and use the available feedback. The focus is meaningful progress and finished work, not instant mastery."],
    ],
  },
  {
    title: "Careers & The Future",
    questions: [
      ["Can people make money with AI filmmaking?", "Yes, when the work solves a real creative or business need. AI filmmaking can support advertisements, trailers, branded content, animation, and other forms of video production. The strongest opportunities combine technical capability with storytelling, reliability, and a credible portfolio."],
      ["Where is AI filmmaking going next?", "As the tools become more accessible, audiences will increasingly judge the work the way they judge other films: whether it is engaging, emotionally effective, and worth watching. Storytelling and creative judgment will matter even more."],
      ["Where should I start if I want to learn more?", "Choose one workflow, begin with a manageable project, and get feedback early. Explore the AIFA community for the complete member experience, or watch the free workshop to learn the core production approach first."],
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main>
        <header className="relative overflow-hidden border-b border-white/10 pb-16 pt-32 md:pb-24 md:pt-40 grain-overlay">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,oklch(0.36_0.2_25/0.2),transparent_32%)]" />
          <div className="container relative z-10">
            <h1 className="max-w-7xl text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.9] text-[#E63329] lg:whitespace-nowrap">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="mt-7 max-w-2xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
              Twenty practical answers to the most common questions about AI filmmaking. Learn about the AIFA workflow, portfolio development, feedback, certification, and creative opportunities.
            </p>
          </div>
        </header>

        <div className="border-b border-white/10 bg-[#0B0B0B]">
          <div className="container grid grid-cols-2 md:grid-cols-4">
            {[
              ["01", "Start with one workflow"],
              ["02", "Improve through feedback"],
              ["03", "Build a body of work"],
              ["04", "Prepare for opportunity"],
            ].map(([number, label], index) => (
              <div key={number} className={`py-5 md:px-6 ${index > 0 ? "border-l border-white/8" : ""}`}>
                <p className="font-mono text-[0.58rem] tracking-[0.2em] text-[#E63329]">{number}</p>
                <p className="mt-2 text-xs font-medium text-white/55 md:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container py-16 md:py-24">
          <div className="grid gap-16">
            {faqGroups.map((group, groupIndex) => (
              <section key={group.title} className="grid gap-7 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="mb-5 h-px w-16 bg-gradient-to-r from-[#E63329] to-transparent" />
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">Section {String(groupIndex + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-4xl leading-none text-white md:text-5xl">{group.title}</h2>
                </div>
                <Accordion type="single" collapsible className="border-t border-white/10">
                  {group.questions.map(([question, answer], index) => (
                    <AccordionItem key={question} value={`${groupIndex}-${index}`} className="border-white/10">
                      <AccordionTrigger
                        className="py-5 text-left text-[1.15rem] font-normal leading-[1.2] tracking-[0.04em] text-white/92 hover:text-[#E63329] hover:no-underline md:text-[1.35rem]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-3xl pb-6 text-sm leading-7 text-white/58 md:text-base">{answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>

        <section className="border-t border-white/10 bg-[#0D0D0D] py-16 md:py-20">
          <div className="container flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#E63329]">Ready to create?</p>
              <h2 className="mt-3 text-4xl text-white md:text-6xl">Turn The Answers Into Finished Work.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="https://www.skool.com/aifilmacademy/about" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 font-bold">
                Join AIFA <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://workshop.aifilmacademy.com/" target="_blank" rel="noopener noreferrer" className="btn-outline px-7 py-4 font-semibold">Watch the Free Workshop</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
