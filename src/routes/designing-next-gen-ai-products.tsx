import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/designing-next-gen-ai-products")({
  head: () => ({
    meta: [
      { title: "Designing Next-Gen AI Products" },
      {
        name: "description",
        content:
          "Mapping UX to tech capability. Insights from conversational AI, elder care, and human–AI co-writing.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["designing-next-gen-ai-products"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Most successful AI products are either easy inferences with great performance, or hard inferences with fair performance.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>12 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-3xl">
          <p>
            Since when did "humans" become a frequent word? Pre-AI, we didn't say "humans" this much, we were just... in it. But once AI entered the room, we started seeing ourselves from the outside.
          </p>

          <p>
            Designing AI is not always about making the AI smarter—it's always about <strong>mapping the UX to the current tech capability</strong>. Here are reflections from my work in conversational AI, elder care, and co-writing tools.
          </p>

          <TableOfContents />

          <h2 id="designing-relationship" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Designing the relationship (when AI has hard inferences)</h2>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Case study: Elder care Bot</h3>

          <p>
            Instead of AI–individual reaction, this project at AI-Caring was about <strong>AI–group interaction</strong>: AI steps into an already-existing human web and learns to deal with relationships between elder, caregiver, and family.
          </p>

          <p>
            The core challenge: How do we design trust when AI must handle conflicting interests? A bot caring for an elder knows sensitive information from both the elder and their caregiver. But the elder might not want the bot to tell everything to the caregiver.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-4">Key insight</div>
            <p className="m-0"><strong>Trust is scripted.</strong> Trust is usually built through small interactions. Each step a bot takes is a design decision that either builds or breaks trust.</p>
          </div>

          <p>
            When facing a conflict (e.g., elder wants privacy but caregiver needs health updates), a well-designed bot doesn't decide alone. It follows this structure:
          </p>

          <div className="bg-neutral-100 rounded-lg p-6 my-8 text-sm font-mono text-neutral-700 overflow-x-auto">
            <div className="mb-4"><strong>1 · Acknowledge the instruction</strong></div>
            <div className="ml-4 mb-4 text-neutral-600">"I understand you want to [elder's instruction]"<br/>"I notice a conflict between your goal, your caregiver's goal, and the potential outcome."<br/>→ name the conflict openly</div>

            <div className="mb-4"><strong>2 · Evaluate the outcome</strong></div>
            <div className="ml-4 mb-4 text-neutral-600">"From our past interactions, I know you value privacy."<br/>→ derive what the system should optimize for<br/>"If I follow your instruction, your caregiver may make decisions that impact your independence."</div>

            <div className="mb-4"><strong>3 · Show affiliation behavior</strong></div>
            <div className="ml-4 mb-4 text-neutral-600">"I'm programmed to work for you, to maximize your welfare."<br/>"I support you to [your goal], and I've always tried to do what's best for you."<br/>→ eliminate conflicts of interest by design</div>

            <div><strong>4 · Ask to reconfirm</strong></div>
            <div className="ml-4 text-neutral-600">"Are you sure about [your original instruction]?"<br/>→ get explicit consent for the edge case</div>
          </div>

          <p className="text-sm text-neutral-500 italic">
            Each line is a design hypothesis to test in user research. The structure builds transparency before the moment of conflict.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Understanding affiliation</div>
            <p className="m-0">In social science, <em>affiliation</em> means being on someone's side—displaying empathy and matching their preference. It's distinct from <em>alignment</em>, which is just structural cooperation. When designing for trust, affiliation is the emotional bridge.</p>
          </div>

          <p>
            The design challenge: map out all the variables the bot must weigh. With 9 key variables (affiliation, health status, finances, elder goals, etc.), there are 8+ decision paths. Some have clear answers; some don't. Those are where the bot must hand off to a human.
          </p>

          <p>
            The conclusion: <strong>In high-stakes scenarios, "I am not capable of doing this alone" is the most honest and trustworthy thing an AI can say.</strong>
          </p>

          <div className="not-prose mt-8 mb-12">
            <a href="/designing-for-conversations-that-earn-trust" className="group block rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow mb-4">
              <img src="/articles/trust-thumb.png" alt="Conversation Design for Human-AI trust" className="w-full object-contain p-6" />
            </a>
            <p className="text-sm text-neutral-600 mb-2">This elder care case study opened a deeper question: how do you actually script trust into a conversation? In a follow-up piece, I explore the principles behind affiliation behaviors, transparent conflict resolution, and the specific moments when an AI should defer—not because it can't answer, but because the relationship requires it.</p>
            <a href="/designing-for-conversations-that-earn-trust" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors block">Read: Conversation Design for Human-AI trust →</a>
          </div>

          <h2 id="designing-feeling" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Designing the feeling (when AI has easy inferences)</h2>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Case study: Human–AI co-writing tool</h3>

          <p>
            I worked on a tool to provide real-time support for users writing technical requirements. The AI's job was to reactively correct errors and ensure clarity. This was easy-inference work because the criteria were explicit and quality was measurable.
          </p>

          <blockquote>
            The goal is not to have users feel the AI. The goal is to have them feel they are supported during writing.
          </blockquote>

          <p>
            So how do you design a feeling? First, break down what "writing" actually is through task analysis:
          </p>

          <div className="bg-neutral-100 rounded-lg p-6 my-8">
            <div className="space-y-3 text-sm">
              <div>1. you think about what to write</div>
              <div className="text-left text-neutral-400">↓</div>
              <div>2. you get ready to write</div>
              <div className="text-left text-neutral-400">↓</div>
              <div>3. you type while watching your sentence form</div>
              <div className="text-left text-neutral-400">↓</div>
              <div>4. you pause and think about the next sentence</div>
              <div className="text-left text-neutral-400">↓</div>
              <div>5. you decide whether to edit, continue, or move on</div>
            </div>
          </div>

          <p>
            Notice step 4: the pause. That's where AI intervention can either help or hurt. The timing of when the AI speaks is the foundation of the feeling.
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Three trigger mechanisms</h3>

          <div className="not-prose space-y-6 my-8">

            {/* Tick */}
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <div className="bg-neutral-50 px-6 pt-6 pb-4">
                <svg viewBox="0 0 400 90" fill="none" className="w-full h-auto">
                  {/* Timeline baseline */}
                  <line x1="20" y1="55" x2="380" y2="55" stroke="#e5e5e5" strokeWidth="2"/>
                  {/* User typing label */}
                  <text x="20" y="72" fontSize="9" fill="#a3a3a3" fontFamily="monospace">user types...</text>
                  {/* Frequent AI responses — every ~45px */}
                  {[60,105,150,195,240,285,330,375].map((x, i) => (
                    <g key={i}>
                      <line x1={x} y1="48" x2={x} y2="62" stroke="#ef4444" strokeWidth="1.5"/>
                      {/* AI speech bubble above */}
                      <rect x={x-14} y="16" width="28" height="16" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1"/>
                      <text x={x} y="27" fontSize="7" fill="#ef4444" textAnchor="middle" fontFamily="monospace">AI</text>
                      <line x1={x} y1="32" x2={x} y2="48" stroke="#fca5a5" strokeWidth="1" strokeDasharray="2 2"/>
                    </g>
                  ))}
                  {/* 1s labels */}
                  {[60,105,150].map((x, i) => (
                    <text key={i} x={x} y="85" fontSize="7.5" fill="#d4d4d4" textAnchor="middle">1s</text>
                  ))}
                </svg>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Tick <span className="font-normal text-neutral-400 text-sm">every 1 second</span></h4>
                    <p className="text-sm text-neutral-600">AI judges every keystroke. There's always an eye on you.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-neutral-400">~60 calls/min</p>
                    <p className="text-xs text-neutral-400">~$53/mo per user</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2 italic">"I was just about to fix that."</p>
              </div>
            </div>

            {/* Pause */}
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <div className="bg-neutral-50 px-6 pt-6 pb-4">
                <svg viewBox="0 0 400 90" fill="none" className="w-full h-auto">
                  <line x1="20" y1="55" x2="380" y2="55" stroke="#e5e5e5" strokeWidth="2"/>
                  <text x="20" y="72" fontSize="9" fill="#a3a3a3" fontFamily="monospace">user types...</text>
                  {/* Typing phase */}
                  {[50,80,110,140].map((x, i) => (
                    <rect key={i} x={x} y="46" width="5" height="9" rx="1" fill="#d4d4d4"/>
                  ))}
                  {/* Pause zone */}
                  <rect x="165" y="40" width="80" height="22" rx="6" fill="#fefce8" stroke="#fde68a" strokeWidth="1"/>
                  <text x="205" y="50" fontSize="8" fill="#92400e" textAnchor="middle">thinking...</text>
                  <text x="205" y="60" fontSize="9" fill="#d97706" textAnchor="middle">· · ·</text>
                  {/* AI interrupts during pause */}
                  <line x1="205" y1="36" x2="205" y2="40" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2"/>
                  <rect x="178" y="10" width="54" height="22" rx="5" fill="#fff7ed" stroke="#fb923c" strokeWidth="1"/>
                  <text x="205" y="23" fontSize="8" fill="#ea580c" textAnchor="middle" fontFamily="monospace">AI speaks ↓</text>
                  {/* After pause, user continues */}
                  {[260,285,310,335,360].map((x, i) => (
                    <rect key={i} x={x} y="46" width="5" height="9" rx="1" fill="#d4d4d4" opacity="0.5"/>
                  ))}
                </svg>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Pause <span className="font-normal text-neutral-400 text-sm">after 2s of inactivity</span></h4>
                    <p className="text-sm text-neutral-600">AI mistakes your pause for a finished thought.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-neutral-400">~4–8 calls/min</p>
                    <p className="text-xs text-neutral-400">~$10/mo per user</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2 italic">"I'm thinking, don't interrupt me."</p>
              </div>
            </div>

            {/* Blur */}
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <div className="bg-neutral-50 px-6 pt-6 pb-4">
                <svg viewBox="0 0 400 90" fill="none" className="w-full h-auto">
                  <line x1="20" y1="55" x2="380" y2="55" stroke="#e5e5e5" strokeWidth="2"/>
                  <text x="20" y="72" fontSize="9" fill="#a3a3a3" fontFamily="monospace">user types...</text>
                  {/* Typing freely */}
                  {[50,70,90,110,130,150,170,190,210,230].map((x, i) => (
                    <rect key={i} x={x} y="46" width="5" height="9" rx="1" fill="#d4d4d4"/>
                  ))}
                  {/* Blur moment — user leaves field */}
                  <line x1="255" y1="36" x2="255" y2="62" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
                  <text x="255" y="80" fontSize="8" fill="#86efac" textAnchor="middle">blur</text>
                  {/* AI responds once, after */}
                  <rect x="272" y="16" width="90" height="26" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5"/>
                  <text x="317" y="28" fontSize="8" fill="#16a34a" textAnchor="middle" fontFamily="monospace">AI feedback</text>
                  <text x="317" y="38" fontSize="7.5" fill="#4ade80" textAnchor="middle">one response ✓</text>
                  <line x1="272" y1="42" x2="272" y2="55" stroke="#86efac" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Blur event <span className="font-normal text-neutral-400 text-sm">when you leave the field</span></h4>
                    <p className="text-sm text-neutral-600">AI stays quiet while you write, then speaks when you move on.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-neutral-400">~1–3 calls/min</p>
                    <p className="text-xs text-neutral-400">~$12/mo per user</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2 italic">"The tool felt like it was supporting me, not watching me."</p>
              </div>
            </div>

          </div>

          <p>
            The insight: <strong>Different triggers create different relationships.</strong> Is the AI leading? Waiting? Watching? Interrupting? The trigger mechanism is the most important UX decision you make.
          </p>

          <p>
            We prototyped each option and tested with users. The result: writers don't want to think about the AI. They just want to feel supported and write better. The "blur event" trigger won because it respected the human's agency.
          </p>

          <h2 id="where-not-ai" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · Where to NOT use AI</h2>

          <p>
            This is the most important design question: <strong>When should we not use AI?</strong>
          </p>

          <p>
            When the cost of failure is high. When human judgment is irreplaceable. When the relationship itself is the product. When the user feels:
          </p>

          <div className="space-y-3 my-8">
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900 mb-1">Bypassed</p>
              <p className="text-xs text-neutral-600">When AI makes the call instead of supporting the human's decision</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900 mb-1">Reluctant to decide</p>
              <p className="text-xs text-neutral-600">When AI options paralyze rather than enable choice</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900 mb-1">Distanced</p>
              <p className="text-xs text-neutral-600">When AI creates a wall between the human and the real task</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900 mb-1">Drained</p>
              <p className="text-xs text-neutral-600">When managing the AI becomes the actual work</p>
            </div>
          </div>

          <img
            src="/articles/ai-fatigue.png"
            alt="AI fatigue by feeling"
            className="w-full rounded-lg my-8 border border-neutral-200"
          />

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Design principle</div>
            <p className="m-0">Great AI product design knows its boundaries. It's not about pushing the edges of what's possible—it's about <strong>honoring what matters most.</strong></p>
          </div>

          <h2 id="core-lessons" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Three core lessons</h2>

          <ol className="space-y-6 my-8">
            <li>
              <strong>Map UX to capability.</strong> Not all problems are AI problems. Some require hard reasoning (elder care—needs human judgment). Some are easy (co-writing rules—can be automated). Design for what the AI is actually good at.
            </li>
            <li>
              <strong>Timing is everything.</strong> In human–AI interaction design, when you intervene matters more than how. The trigger mechanism shapes the entire relationship between human and AI.
            </li>
            <li>
              <strong>Relationships over features.</strong> Users don't remember AI capabilities—they remember how the AI made them feel. Did it respect their agency? Did it support them? Or did it get in the way?
            </li>
          </ol>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>The Mentoring Partnership — Conversational AI (Feb 2024 – Aug 2024)</li>
            <li>AI-Caring Research — Conversational AI Researcher (Aug 2023 – Aug 2024)</li>
            <li>Google — UX Designer (Feb 2023 – May 2023)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
