import { useState, useCallback, useEffect } from "react";

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "workflow",
    title: "The 3-Step AI Production Workflow",
    questions: [
      {
        id: "q1",
        text: "What are the 3 stages of the professional AI video production workflow?",
        options: [
          "Script, Shoot, Edit",
          "Pre-Production, Production, Post-Production",
          "Prompt, Generate, Export",
          "Ideate, Create, Publish",
        ],
        correct: 1,
      },
      {
        id: "q2",
        text: "Which of the following activities belongs in the Pre-Production phase?",
        options: [
          "Upscaling your final video",
          "Writing your script, building your storyboard, and planning your shot list",
          "Generating video clips with Kling AI",
          "Adding voiceover with ElevenLabs",
        ],
        correct: 1,
      },
      {
        id: "q3",
        text: "Which of the following is a Production phase activity?",
        options: [
          "Writing a script outline",
          "Generating AI images and video clips using tools like NanoBananaPro and Google Veo",
          "Exporting the final cut",
          "Adding captions and color grading",
        ],
        correct: 1,
      },
      {
        id: "q4",
        text: "Which of the following belongs in the Post-Production phase?",
        options: [
          "Storyboarding your scenes",
          "Generating your hero image with NanoBananaPro",
          "Assembling clips, adding voiceover, color grading, and exporting",
          "Writing your video script",
        ],
        correct: 2,
      },
      {
        id: "q5",
        text: "True or False: Will you be safe as an AI filmmaker if you master just one core set of image and video generation tools?",
        options: [
          "True — mastering one core toolset deeply is more valuable than knowing many tools superficially",
          "False — you must know every AI tool available to stay competitive",
          "False — tools change too fast to specialize in any one",
          "True — but only if that tool is Midjourney",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "nano",
    title: "NanoBananaPro (Gemini 3 Pro Image)",
    questions: [
      {
        id: "q6",
        text: "What is NanoBananaPro (Gemini 3 Pro Image) primarily used for in an AI filmmaking workflow?",
        options: [
          "Generating and editing high-quality images with advanced subject consistency, text rendering, and studio-quality creative controls",
          "Editing audio tracks and generating voiceover",
          "Rendering 3D models from text descriptions",
          "Scheduling and publishing social media content",
        ],
        correct: 0,
      },
      {
        id: "q7",
        text: "NanoBananaPro can maintain visual consistency across how many input images in a single composition?",
        options: ["Up to 3", "Up to 7", "Up to 14", "Up to 50"],
        correct: 2,
      },
      {
        id: "q8",
        text: "Which of the following is a key creative feature of NanoBananaPro?",
        options: [
          "Automated video editing and timeline assembly",
          "Local image editing — adjusting camera angles, focus, lighting, and color grading",
          "Real-time voice cloning from uploaded audio",
          "Automatic subtitle generation",
        ],
        correct: 1,
      },
      {
        id: "q9",
        text: "What maximum output resolution does NanoBananaPro support?",
        options: ["720p", "1080p only", "2K and 4K", "480p"],
        correct: 2,
      },
      {
        id: "q10",
        text: "How does NanoBananaPro handle text rendering compared to earlier AI image tools?",
        options: [
          "It cannot render text in images",
          "It generates accurate, legible text in multiple languages directly within the image",
          "It only supports English text",
          "It renders text as a separate layer that must be merged manually",
        ],
        correct: 1,
      },
      {
        id: "q11",
        text: "In which Google product can filmmakers and creatives access NanoBananaPro for AI film production?",
        options: [
          "Google Docs",
          "Google Flow — the AI filmmaking tool that integrates Veo, NanoBananaPro, and Gemini",
          "Google Maps",
          "Google Analytics",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "veo",
    title: "Google Veo",
    questions: [
      {
        id: "q12",
        text: "What is Google Veo primarily used for?",
        options: [
          "Generating high-quality AI video clips from text and image prompts",
          "Editing existing video footage with filters",
          "Transcribing dialogue from video files",
          "Creating 3D animated characters",
        ],
        correct: 0,
      },
      {
        id: "q13",
        text: "What is the standout capability of Google Veo 3 compared to earlier AI video generation models?",
        options: [
          "It only generates silent video clips",
          "It natively generates audio — including dialogue, sound effects, and ambient noise",
          "It exclusively generates black-and-white footage",
          "It requires a physical camera to generate video",
        ],
        correct: 1,
      },
      {
        id: "q14",
        text: "What output resolutions does Google Veo 3 support?",
        options: [
          "480p only",
          "Up to 4K, with 720p, 1080p, and 4K options",
          "1080p only",
          "240p and 360p",
        ],
        correct: 1,
      },
      {
        id: "q15",
        text: "Which aspect ratios does Google Veo 3 support for production output?",
        options: [
          "Only 4:3",
          "Landscape (16:9) and portrait (9:16)",
          "Only 1:1 square",
          "Only widescreen 21:9",
        ],
        correct: 1,
      },
      {
        id: "q16",
        text: "How can Google Gemini be used to support the Pre-Production phase of an AI film?",
        options: [
          "Only for generating background music",
          "For scriptwriting, shot list planning, prompt ideation, research, and generating creative concepts",
          "Exclusively for color grading video footage",
          "For rendering 3D animations",
        ],
        correct: 1,
      },
      {
        id: "q17",
        text: "What is Google Flow?",
        options: [
          "A video editing platform for traditional filmmakers",
          "An AI filmmaking tool that integrates Veo, NanoBananaPro, and Gemini for end-to-end AI film production",
          "A social media scheduling platform",
          "A cloud storage service for video files",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "kling",
    title: "Kling AI",
    questions: [
      {
        id: "q18",
        text: "Which Kling AI feature allows you to paint motion paths onto specific areas of an image to animate them independently?",
        options: ["Camera Control", "Motion Brush", "Kling Elements", "Lip Sync"],
        correct: 1,
      },
      {
        id: "q19",
        text: "What does Kling AI Camera Control allow you to do?",
        options: [
          "Add text overlays to generated video",
          "Define specific camera movements — such as pan, tilt, zoom, orbit, and dolly — within AI-generated video",
          "Automatically color grade your footage",
          "Generate audio from video content",
        ],
        correct: 1,
      },
      {
        id: "q20",
        text: "What are Kling Elements used for?",
        options: [
          "Adding royalty-free stock music to AI-generated videos",
          "Inserting consistent branded or stylistic visual elements into generated video compositions",
          "Exporting videos in different file formats",
          "Generating subtitles automatically",
        ],
        correct: 1,
      },
      {
        id: "q21",
        text: "What is Kling AI Lip Sync used for?",
        options: [
          "Generating background music for video",
          "Matching a character's mouth movements to a provided audio track for realistic on-screen speech",
          "Removing background noise from audio",
          "Translating spoken dialogue into text",
        ],
        correct: 1,
      },
      {
        id: "q22",
        text: "What is the primary use of Kling AI All-in-One Reference (Video 3.0)?",
        options: [
          "Automatically editing your video timeline",
          "Uploading a character video or multiple reference images to maintain consistent character appearance",
          "Generating audio from a video file",
          "Scheduling video posts to social media",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "upscaling",
    title: "Upscaling and Image Quality",
    questions: [
      {
        id: "q23",
        text: "What is the purpose of upscaling in an AI video production workflow?",
        options: [
          "It reduces file sizes for easier sharing",
          "It increases the resolution and visual quality of AI-generated images and video to meet professional output standards",
          "It automatically adds color grading to footage",
          "It converts video to audio format",
        ],
        correct: 1,
      },
      {
        id: "q24",
        text: "Which tool is best known for AI-powered video upscaling and enhancement?",
        options: ["Adobe Premiere Pro", "Topaz Video AI", "iMovie", "CapCut"],
        correct: 1,
      },
      {
        id: "q25",
        text: "Why is upscaling particularly important when working with AI-generated content?",
        options: [
          "AI tools always output at broadcast resolution by default",
          "AI-generated images and video often output at lower resolutions that benefit from enhancement",
          "Upscaling is only needed for black-and-white footage",
          "Upscaling removes watermarks from AI-generated content",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "cinematography",
    title: "Camera, Lighting and Cinematography",
    questions: [
      {
        id: "q26",
        text: "What does camera angle refer to in an AI filmmaking prompt?",
        options: [
          "The file format of the exported video",
          "The position and perspective from which the viewer sees the scene",
          "The aspect ratio of the generated image",
          "The frame rate of the video clip",
        ],
        correct: 1,
      },
      {
        id: "q27",
        text: "Which camera angle is typically used to make a subject appear powerful or dominant?",
        options: [
          "High angle (camera looking down at the subject)",
          "Eye level",
          "Low angle (camera looking up at the subject)",
          "Dutch angle",
        ],
        correct: 2,
      },
      {
        id: "q28",
        text: "What does cinematic lighting refer to in AI image and video prompts?",
        options: [
          "Using only natural sunlight in all scenes",
          "Specifying dramatic, directional, or stylized lighting conditions",
          "Turning off all light sources in the generated scene",
          "Using only overhead studio lighting for all shots",
        ],
        correct: 1,
      },
      {
        id: "q29",
        text: "What is the purpose of specifying depth of field in an AI image prompt?",
        options: [
          "To increase the frame rate of the video",
          "To control the range of sharpness in the image — creating a blurred background (bokeh) effect",
          "To set the aspect ratio of the output",
          "To determine the color temperature of the scene",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "elevenlabs",
    title: "ElevenLabs and Voiceover",
    questions: [
      {
        id: "q30",
        text: "What is ElevenLabs primarily used for in an AI video production workflow?",
        options: [
          "Generating background music and soundscapes",
          "AI voice cloning and text-to-speech voiceover generation for professional content production",
          "Upscaling and enhancing video resolution",
          "Generating AI video clips from text prompts",
        ],
        correct: 1,
      },
      {
        id: "q31",
        text: "What does voice cloning allow an AI filmmaker to do?",
        options: [
          "Automatically lip-sync characters to any audio track",
          "Create a digital replica of a voice that can read any script with the same tone, style, and delivery",
          "Remove background noise from recorded audio",
          "Generate original music scores from text descriptions",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "mindset",
    title: "Workflow Mindset",
    questions: [
      {
        id: "q32",
        text: "What is the most effective mindset for an AI filmmaker building a professional skillset?",
        options: [
          "Learn every new AI tool as soon as it launches to stay ahead",
          "Master your core production workflow and toolset deeply before expanding",
          "Only use free tools to keep costs low",
          "Avoid specializing so you can adapt to any project",
        ],
        correct: 1,
      },
      {
        id: "q33",
        text: "Which combination of tools represents the core AI video production stack taught at AI Film Academy?",
        options: [
          "Midjourney, Runway, Adobe Premiere, Audacity",
          "NanoBananaPro, Google Veo, Kling AI",
          "DALL-E, Sora, Final Cut Pro",
          "Stable Diffusion, Pika, DaVinci Resolve",
        ],
        correct: 1,
      },
    ],
  },
];

const TOTAL_QUESTIONS = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
const PASS_SCORE = Math.ceil(TOTAL_QUESTIONS * 0.8); // 80%

// ─── LINKEDIN SHARE ───────────────────────────────────────────────────────────

function buildLinkedInPost(_firstName: string): string {
  return `Officially certified as an AI Media Specialist.

I can now take a project from storyboard to final cut using AI-native tools — generating cinematic visuals with Google Veo and NanoBananaPro, directing motion with Kling AI, and delivering polished work that would have taken a full team two years ago.

The craft is the same. The tools changed everything.

#AIMediaSpecialist #VideoProduction #AIFilmmaking #GoogleVeo #KlingAI #NanoBananaPro`;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

type Answers = Record<string, number>;

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-xs font-mono text-white/30 uppercase tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Progress
        </span>
        <span
          className="text-xs font-mono text-white/30"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-[2px] bg-white/10">
        <div
          className="h-full bg-[#E63329] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function IntroScreen({
  onStart,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}: {
  onStart: () => void;
  email: string;
  setEmail: (v: string) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
}) {
  const valid = email.includes("@") && firstName.trim() && lastName.trim();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg">
        {/* AFA wordmark */}
        <div className="mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E63329] flex items-center justify-center">
            <span
              className="text-white text-xs font-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              AFA
            </span>
          </div>
          <span
            className="text-xs font-mono uppercase tracking-[0.2em] text-white/40"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI Film Academy
          </span>
        </div>

        <div className="w-8 h-[2px] bg-[#E63329] mb-6" />

        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight mb-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          AI Media Specialist
          <br />
          <span className="text-[#E63329]">Certification Test</span>
        </h1>

        <p
          className="text-sm text-white/50 leading-relaxed mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {TOTAL_QUESTIONS} questions across 8 sections. Pass at 80% or higher to earn your
          certification badge. Takes approximately 10–15 minutes.
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <label
              className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63329] transition-colors placeholder:text-white/20"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
                className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63329] transition-colors placeholder:text-white/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
                className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63329] transition-colors placeholder:text-white/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={!valid}
          className="w-full py-4 bg-[#E63329] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#c42b22] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Begin Certification Test
        </button>

        <p
          className="text-xs text-white/20 text-center mt-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Your information is used only to issue your certification badge.
        </p>
      </div>
    </div>
  );
}

function QuizScreen({
  answers,
  setAnswers,
  onSubmit,
}: {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  onSubmit: () => void;
}) {
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;

  const handleSelect = (qId: string, optIdx: number) => {
    setAnswers({ ...answers, [qId]: optIdx });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-5 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-6 bg-[#E63329] flex items-center justify-center shrink-0">
            <span
              className="text-white text-[9px] font-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              AFA
            </span>
          </div>
          <span
            className="text-xs font-mono uppercase tracking-[0.2em] text-white/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI Media Specialist Certification
          </span>
        </div>

        <ProgressBar current={answeredCount} total={TOTAL_QUESTIONS} />

        {/* Sections */}
        <div className="space-y-12">
          {SECTIONS.map((section, si) => (
            <div key={section.id}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xs font-mono text-[#E63329] uppercase tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {String(si + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[1px] bg-white/5" />
                <h2
                  className="text-sm font-black uppercase tracking-wide text-white/60"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-8">
                {section.questions.map((q, qi) => {
                  const globalIdx =
                    SECTIONS.slice(0, si).reduce((acc, s) => acc + s.questions.length, 0) + qi + 1;
                  return (
                    <div key={q.id} className="bg-[#0D0D0D] border border-white/5 p-6">
                      <p
                        className="text-sm text-white/80 leading-relaxed mb-5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="text-white/25 mr-2 font-mono text-xs">{globalIdx}.</span>
                        {q.text}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[q.id] === oi;
                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(q.id, oi)}
                              className={`w-full text-left px-4 py-3 border text-sm transition-all duration-150 ${
                                selected
                                  ? "border-[#E63329] bg-[#E63329]/10 text-white"
                                  : "border-white/8 bg-[#111111] text-white/55 hover:border-white/20 hover:text-white/80"
                              }`}
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <span className="font-mono text-xs mr-3 text-white/25">
                                {String.fromCharCode(65 + oi)}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-12 pt-8 border-t border-white/5">
          {!allAnswered && (
            <p
              className="text-xs text-white/30 text-center mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {TOTAL_QUESTIONS - answeredCount} question
              {TOTAL_QUESTIONS - answeredCount !== 1 ? "s" : ""} remaining
            </p>
          )}
          <button
            onClick={onSubmit}
            disabled={!allAnswered}
            className="w-full py-4 bg-[#E63329] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#c42b22] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({
  score,
  total,
  passed,
  firstName,
  lastName,
  email,
  answers,
}: {
  score: number;
  total: number;
  passed: boolean;
  firstName: string;
  lastName: string;
  email: string;
  answers: Answers;
}) {
  const pct = Math.round((score / total) * 100);
  const postText = buildLinkedInPost(firstName);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(postText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [postText]);

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/feed/", "_blank", "width=700,height=700");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-5 py-16">
      <div className="max-w-xl mx-auto">
        {/* AFA mark */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-6 h-6 bg-[#E63329] flex items-center justify-center shrink-0">
            <span
              className="text-white text-[9px] font-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              AFA
            </span>
          </div>
          <span
            className="text-xs font-mono uppercase tracking-[0.2em] text-white/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI Film Academy
          </span>
        </div>

        {passed ? (
          <>
            {/* PASS */}
            <div className="mb-10">
              <div className="w-8 h-[2px] bg-[#E63329] mb-6" />
              <p
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#E63329] mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Certification Earned
              </p>
              <h1
                className="text-5xl font-black uppercase leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {firstName}, you passed.
              </h1>
              <p
                className="text-white/50 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                You scored{" "}
                <span className="text-white font-semibold">
                  {score}/{total} ({pct}%)
                </span>{" "}
                on the AI Media Specialist Certification Test. Your badge is being issued to{" "}
                <span className="text-white">{email}</span>.
              </p>
            </div>

            {/* Score card */}
            <div className="bg-[#111111] border border-white/5 p-6 mb-10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p
                    className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Final Score
                  </p>
                  <p
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {score}
                    <span className="text-white/30 text-2xl">/{total}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Percentage
                  </p>
                  <p
                    className="text-4xl font-black text-[#E63329]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {pct}%
                  </p>
                </div>
              </div>
              <div className="w-full h-[2px] bg-white/5">
                <div
                  className="h-full bg-[#E63329]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* LinkedIn share — career-focused */}
            <div className="border border-white/8 p-6 mb-6">
              <p
                className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Share Your Achievement
              </p>
              <p
                className="text-sm text-white/60 leading-relaxed mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Copy the post below, open LinkedIn, paste it in, attach a video you have made and your badge. This is a career signal — you are now a working AI video professional.
              </p>

              {/* Post preview */}
              <div className="bg-[#0D0D0D] border border-white/5 p-4 mb-5 text-xs text-white/45 leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {postText}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 py-4 border text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    copied
                      ? "border-white/30 bg-white/5 text-white/60"
                      : "border-white/15 bg-transparent text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {copied ? "Copied" : "Copy Post Text"}
                </button>
                <button
                  onClick={handleLinkedIn}
                  className="flex items-center justify-center gap-2 py-4 bg-[#0A66C2] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#0855a3] transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <LinkedInIcon size={16} />
                  Open LinkedIn
                </button>
              </div>
              <p
                className="text-xs text-white/20 text-center mt-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Copy the text, open LinkedIn, paste and attach your work.
              </p>
            </div>

            {/* Badge note */}
            <p
              className="text-xs text-white/30 text-center leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Your official AI Media Specialist badge is being issued via Certifier and will arrive
              at <span className="text-white/50">{email}</span> shortly. Use the badge link from
              that email to add it to your LinkedIn profile.
            </p>
          </>
        ) : (
          <>
            {/* FAIL */}
            <div className="mb-10">
              <div className="w-8 h-[2px] bg-white/20 mb-6" />
              <h1
                className="text-5xl font-black uppercase leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Not quite, {firstName}.
              </h1>
              <p
                className="text-white/50 leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                You scored{" "}
                <span className="text-white font-semibold">
                  {score}/{total} ({pct}%)
                </span>
                . The passing threshold is 80% ({PASS_SCORE}/{total}). Review the sections below
                and retake when ready.
              </p>
            </div>

            {/* Section breakdown */}
            <div className="space-y-3 mb-10">
              {SECTIONS.map((section) => {
                const correct = section.questions.filter(
                  (q) => answers[q.id] === q.correct
                ).length;
                const total = section.questions.length;
                const sectionPct = Math.round((correct / total) * 100);
                const passing = sectionPct >= 80;
                return (
                  <div
                    key={section.id}
                    className="flex items-center justify-between bg-[#111111] border border-white/5 px-4 py-3"
                  >
                    <span
                      className="text-sm text-white/60"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {section.title}
                    </span>
                    <span
                      className={`text-sm font-mono font-bold ${
                        passing ? "text-white/60" : "text-[#E63329]"
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {correct}/{total}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-[#E63329] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#c42b22] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Retake the Test
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SUBMIT TO GOOGLE SHEET ───────────────────────────────────────────────────

async function submitToSheet(data: {
  email: string;
  firstName: string;
  lastName: string;
  score: number;
  total: number;
  passed: boolean;
  answers: Answers;
}) {
  // POST directly to the Apps Script Web App which writes to the Google Sheet
  // Sheet: https://docs.google.com/spreadsheets/d/1C2W25VNE9Eu4u2MpSpNFZ512eq_w5H2BjO6zxlcndsY
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxOx0mpOLZOXDGOzjl_MwnGhp4fhkk8XY0ZuYt20SbW2ADTZ2RF3DOui246Ua0dujwh0g/exec";

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        score: data.score,
        total: data.total,
        passed: data.passed,
      }),
    });
  } catch {
    // Silent fail — the quiz result is already shown to the user
  }
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type Stage = "intro" | "quiz" | "result";

export default function Certification() {
  const [stage, setStage] = useState<Stage>("intro");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState(0);

  // Auto-test bypass: ?autotest=1 fills all correct answers and submits
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autotest") === "1") {
      const testEmail = params.get("email") || "test@aifilmacademy.com";
      const testFirst = params.get("first") || "Test";
      const testLast = params.get("last") || "User";
      setEmail(testEmail);
      setFirstName(testFirst);
      setLastName(testLast);
      // Build perfect answers
      const allAnswers: Answers = {};
      SECTIONS.forEach((section) => {
        section.questions.forEach((q) => {
          allAnswers[q.id] = q.correct;
        });
      });
      setAnswers(allAnswers);
      const correct = TOTAL_QUESTIONS;
      setScore(correct);
      submitToSheet({
        email: testEmail,
        firstName: testFirst,
        lastName: testLast,
        score: correct,
        total: TOTAL_QUESTIONS,
        passed: true,
        answers: allAnswers,
      });
      setStage("result");
    }
  }, []);

  const handleStart = () => {
    setStage("quiz");
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    let correct = 0;
    SECTIONS.forEach((section) => {
      section.questions.forEach((q) => {
        if (answers[q.id] === q.correct) correct++;
      });
    });
    setScore(correct);

    // Submit to Google Sheet via form endpoint (fire and forget)
    submitToSheet({
      email,
      firstName,
      lastName,
      score: correct,
      total: TOTAL_QUESTIONS,
      passed: correct >= PASS_SCORE,
      answers,
    });

    setStage("result");
    window.scrollTo(0, 0);
  };

  if (stage === "intro") {
    return (
      <IntroScreen
        onStart={handleStart}
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    );
  }

  if (stage === "quiz") {
    return (
      <QuizScreen answers={answers} setAnswers={setAnswers} onSubmit={handleSubmit} />
    );
  }

  return (
    <ResultScreen
      score={score}
      total={TOTAL_QUESTIONS}
      passed={score >= PASS_SCORE}
      firstName={firstName}
      lastName={lastName}
      email={email}
      answers={answers}
    />
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
