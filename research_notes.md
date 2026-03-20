# AFA Website Rebuild - Research Notes

## Project Brief Summary
- **Goal**: High-converting landing page for cold Meta Ads traffic → $19/month Skool subscription
- **Target**: Live by May 2026, support June $25k MRR target
- **Tech**: Zero-maintenance, static site (Vercel/Netlify), mobile-first, sub-2s load
- **Skool checkout**: https://www.skool.com/aifilmacademy
- **Meta Pixel**: Must be installed for ad tracking
- **No CMS, no WordPress, no plugins**

## Design Inspiration: Brandon's Portfolio (brandonpatino.framer.website/portfolio)
- **Aesthetic**: Dark/black background, white text, cinematic feel
- **Typography**: Large, bold sans-serif headlines
- **Color**: Black bg, white text, red accent (hoodie/brand color)
- **Layout**: Full-width hero with video, stats bar (50k+ AI Voice Users, 10k+ Workshop Students, 1k+ AFA Students), project cards with video embeds, testimonials, CTA
- **Tone**: Premium, confident, "elite athlete" mindset
- **Framer-built** — clean, modern, no clutter

## Skool Landing Page Copy (skool.com/aifilmacademy/about)
- **Headline**: "Master AI Filmmaking & Future-Proof Your Career for just $19/mo."
- **Subhead**: "Most editors are drowning in 12 different tools. We strip away the fluff so you get a clear tool stack and repeatable workflow to create high-end AI videos. Master the fundamentals and finish your first AI film in 30 Days!"
- **What You Get (Total Value $997)**:
  - Professional Skill Certification ($497 Value)
  - A Clear 3 Step Workflow ($197 Value) - Pre Production → Production → Post Production
  - Core Tool Mastery ($197 Value)
  - Custom AI Agents ($79 Value)
  - Tech Stack Clarity ($27 Value)
- **Stats**: 1.1k Members, $19/month, Private community
- **Tagline**: "The professional standard for AI Filmmaking. Stop experimenting and start mastering. Join the academy, get certified, and upgrade your career."

## VSL Script Key Points (AFA Pro VSL)
- For video editors, graphic designers, content creators
- "One simple workflow, one system, one tech stack, one repeatable process"
- Skips chaos, FOMO, shiny object syndrome
- Works for ANY style: Animation, Realism, Music Video, Movie Trailers, Documentaries
- 4 steps: Script → AI Art → AI Video → Video Editing
- Certification → LinkedIn Credential in Generative AI Media
- "Confident and certified" vs "overwhelmed and chasing shiny tools"
- 5+ hours of video content, multiple AI agents, reliable tech stack

## Current Website (aifilmacademy.com) - Issues
- Hero: "Enter a New Era of Video Creativity" - generic, not conversion-focused
- CTA goes to free community, not paid subscription
- No pricing visible on homepage
- Outdated copy, not benefit-driven
- No urgency, no value stack
- WordPress/SiteGround - 90% storage capacity

## Target Customer Profile
- Video editors, graphic designers, content creators
- Overwhelmed by new AI tools releasing daily
- Want: structured path, one workflow, certification
- Fear: FOMO, shiny object syndrome, wasted time
- Goal: Create high-end AI videos, land clients, future-proof career

## Key Testimonials
- Max Gibson: "Amazing collection of courses and community, very inclusive and easy to navigate. Lots of support."
- Sylvester U.: "Game-changer for me - learned so much about creative AI tools to level up my workflow"
- Benjamin Lucas: "Great community of artists and technically minded people"

## Pricing
- $19/month
- $149/annual (40% off)

## Brand Assets Available
- afa-logo-white.png (downloaded)
- afa-logo-long.png (downloaded)
- Videos: AFA_V2.mp4, AI Film Academy - Motion 2.0.mp4, AFA_Concept33.mp4

## Tech Stack Decision
- Static site (React + Vite + TailwindCSS) hosted on Vercel/Netlify
- Zero maintenance, instant load times
- All CTAs link to: https://www.skool.com/aifilmacademy
- Meta Pixel integration
