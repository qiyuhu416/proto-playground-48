import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleRefCard } from "./-ArticleRefCard";


export const Route = createFileRoute("/designing-next-gen-ai-products")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content:
          "Mapping UX to tech capability. Insights from conversational AI, elder care, and human–AI co-writing.",
      },
    ],
  }),
  component: ArticleComponent,
});

/* ── Types ── */
type DialogueStep =
  | { kind: 'type'; text: string; cps: number }
  | { kind: 'pause'; ms: number }
  | { kind: 'highlight'; pattern: string; ms: number }
  | { kind: 'chip'; text: string; ms: number }
  | { kind: 'focus'; toField: string; ms: number }
  | { kind: 'clear'; ms: number };

type TriggerMechanism =
  | { kind: 'tick'; intervalMs: number }
  | { kind: 'countdown'; thresholdMs: number }
  | { kind: 'focus' };

type Economics = {
  callsPerMin: string; tokensPerCall: string; costPerCall: string;
  costPerMin: string; costPerUserMonth: string; costPerUserMonthNote: string;
};

/* ── Highlighted text renderer ── */
function HighlightedText({ text, pattern }: { text: string; pattern: string | null }) {
  if (!pattern || !text.includes(pattern)) return <>{text}</>;
  const idx = text.indexOf(pattern);
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-200 text-amber-900 rounded-sm not-italic">{pattern}</mark>
      {text.slice(idx + pattern.length)}
    </>
  );
}

/* ── Self-animating trigger demo ── */
function TriggerDemo({ mode, kicker, description, dialogue, mechanism, economics }: {
  mode: 'tick' | 'pause' | 'leave';
  kicker: string; description: string;
  dialogue: DialogueStep[];
  mechanism: TriggerMechanism;
  economics: Economics;
}) {
  const [text, setText] = useState('');
  const [highlight, setHighlight] = useState<string | null>(null);
  const [chip, setChip] = useState<string | null>(null);
  const [activeField, setActiveField] = useState('A');
  const [tickCount, setTickCount] = useState(0);
  const [sinceLastType, setSinceLastType] = useState(0);
  const lastTypeRef = useRef(Date.now());

  // Tick pulse for tick mechanism
  useEffect(() => {
    if (mechanism.kind !== 'tick') return;
    const id = setInterval(() => setTickCount(c => c + 1), mechanism.intervalMs);
    return () => clearInterval(id);
  }, [mechanism]);

  // Countdown for pause mechanism
  useEffect(() => {
    if (mechanism.kind !== 'countdown') return;
    const id = setInterval(() => setSinceLastType(Date.now() - lastTypeRef.current), 80);
    return () => clearInterval(id);
  }, [mechanism]);

  // Main dialogue loop
  useEffect(() => {
    let stopped = false;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const run = async () => {
      for (const step of dialogue) {
        if (stopped) return;
        if (step.kind === 'type') {
          for (const char of step.text) {
            if (stopped) return;
            setText(t => t + char);
            lastTypeRef.current = Date.now();
            setSinceLastType(0);
            await wait(1000 / step.cps);
          }
        } else if (step.kind === 'pause') {
          await wait(step.ms);
        } else if (step.kind === 'highlight') {
          setHighlight(step.pattern);
          await wait(step.ms);
        } else if (step.kind === 'chip') {
          setChip(step.text);
          await wait(step.ms);
        } else if (step.kind === 'focus') {
          setActiveField(step.toField);
          await wait(step.ms);
        } else if (step.kind === 'clear') {
          setText(''); setHighlight(null); setChip(null); setActiveField('A');
          lastTypeRef.current = Date.now(); setSinceLastType(0);
          await wait(step.ms);
        }
      }
      if (!stopped) run();
    };
    run();
    return () => { stopped = true; };
  }, []);

  const threshold = mechanism.kind === 'countdown' ? mechanism.thresholdMs : 1;
  const countdownPct = Math.min(sinceLastType / threshold, 1);

  return (
    <div>
      {/* Kicker + description */}
      <div className="mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">{kicker}</span>
        <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
      </div>

      {/* Fields */}
      <div className="space-y-2 mb-5">
        <div className={`rounded-xl border px-4 py-3 bg-white transition-all duration-300 ${
          activeField === 'A'
            ? 'border-neutral-300 shadow-[0_0_0_3px_rgba(0,0,0,0.05)]'
            : 'border-neutral-200 opacity-55'
        }`}>
          {mode === 'leave' && <div className="text-[10px] text-neutral-400 mb-1 uppercase tracking-wider">Field A</div>}
          <p className="text-sm font-mono text-neutral-800 min-h-[20px] leading-relaxed">
            <HighlightedText text={text} pattern={highlight} />
            {activeField === 'A' && <span className="border-r-2 border-neutral-700 animate-pulse ml-px"> </span>}
          </p>
        </div>
        {mode === 'leave' && (
          <div className={`rounded-xl border px-4 py-3 bg-white transition-all duration-300 ${
            activeField === 'B'
              ? 'border-neutral-300 shadow-[0_0_0_3px_rgba(0,0,0,0.05)]'
              : 'border-neutral-200 opacity-55'
          }`}>
            <div className="text-[10px] text-neutral-400 mb-1 uppercase tracking-wider">Field B</div>
            <p className="text-sm font-mono text-neutral-400 min-h-[20px]">
              {activeField === 'B' && <span className="border-r-2 border-neutral-700 animate-pulse"> </span>}
            </p>
          </div>
        )}

        {/* AI chip */}
        <div className={`transition-all duration-200 ${chip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
          <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-xs rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            {chip}
          </span>
        </div>
      </div>

      {/* Mechanism indicator */}
      <div className="border-t border-neutral-100 pt-3 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-neutral-300 mb-2">Trigger mechanism</div>
        {mechanism.kind === 'tick' && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <span key={i} className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === tickCount % 4 ? 'bg-red-400' : 'bg-neutral-200'}`} />
              ))}
            </div>
            <span className="text-xs text-neutral-400">fires every 1s</span>
          </div>
        )}
        {mechanism.kind === 'countdown' && (
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-neutral-400">silence timer</span>
              <span className="text-xs font-mono text-amber-500">{(sinceLastType / 1000).toFixed(1)}s / {(threshold / 1000).toFixed(0)}s</span>
            </div>
            <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all duration-75" style={{ width: `${countdownPct * 100}%` }} />
            </div>
          </div>
        )}
        {mechanism.kind === 'focus' && (
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full transition-colors ${activeField === 'A' ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}>Field A</span>
            <span className="text-neutral-300">→</span>
            <span className={`px-2 py-0.5 rounded-full transition-colors ${activeField === 'B' ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}>Field B</span>
            <span className="text-neutral-300 ml-1">fires on leave</span>
          </div>
        )}
      </div>

      {/* Economics */}
      <div className="border-t border-neutral-100 pt-3">
        <div className="text-[10px] uppercase tracking-widest text-neutral-300 mb-2">Cost estimate</div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div><div className="text-neutral-400 mb-0.5">Calls / min</div><div className="font-mono text-neutral-700">{economics.callsPerMin}</div></div>
          <div><div className="text-neutral-400 mb-0.5">Cost / call</div><div className="font-mono text-neutral-700">{economics.costPerCall}</div></div>
          <div><div className="text-neutral-400 mb-0.5">$ / user / mo</div><div className="font-mono font-semibold text-neutral-900">{economics.costPerUserMonth}</div></div>
        </div>
        <div className="text-[10px] text-neutral-300 mt-2">{economics.costPerUserMonthNote}</div>
      </div>
    </div>
  );
}

/* ── Tab group wrapper ── */
function TriggerTabGroup({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      <div className="flex items-center gap-1 px-4 pt-4 pb-3 border-b border-neutral-100">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${active === i ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-700'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="px-6 py-5">{tabs[active].content}</div>
    </div>
  );
}

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["designing-next-gen-ai-products"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Since when did "humans" become a frequent word? 
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>12 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-3xl">
          <p>
            Pre-AI, we didn't say "humans" this much, we were just... in it. But once AI entered the room, we started seeing ourselves from the outside.
          </p>

          <p>
            Designing AI is not always about making the AI smarter—it's always about <strong>mapping the UX to the current tech capability</strong>. Here are reflections from my work in academia and industry.
          </p>


          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Design principle</div>
            <p className="m-0">Most successful AI products are either easy inferences with great performance, or hard inferences with fair performance.</p>
          </div>

          <TableOfContents />

          <h2 id={sectionId("Designing the relationship")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Designing the relationship"}</h2>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Case study: Elder care Bot</h3>


          <div className="not-prose mt-8 mb-12">
            <ArticleRefCard
              slug="designing-for-conversations-that-earn-trust"
              category="Role"
              meta="Research · Design"
              fromSlug="designing-next-gen-ai-products"
            />
          </div>
          <p>
            In social science, <em>affiliation</em> means being on someone's side—displaying empathy and matching their preference. It's distinct from <em>alignment</em>, which is just structural cooperation. When designing for trust, affiliation is the emotional bridge.
          </p>

          <p>
          Instead of AI–individual reaction, this was an HCI research at AI-Caring Institute about <strong>AI–group interaction</strong> in eldercare and learns to deal with relationships between elder, caregiver, and family.             
          </p>

          <p>
          </p>


          <h2 id={sectionId("Designing the feeling")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Designing the feeling"}</h2>

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

          <div className="bg-white rounded-lg p-6 my-8">
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

          <div className="not-prose my-8">
            <TriggerTabGroup tabs={[
              {
                label: 'Every 1 sec',
                content: (
                  <TriggerDemo
                    mode="tick"
                    kicker="Tick · 1s"
                    description="AI judges every keystroke — there's always an eye on you."
                    dialogue={[
                      { kind: 'type', text: "I'm jotting down whatever's on my mind. There's always an eyes on me", cps: 32 },
                      { kind: 'pause', ms: 300 },
                      { kind: 'highlight', pattern: 'eyes', ms: 1 },
                      { kind: 'chip', text: 'did you mean "an eye"?', ms: 1 },
                      { kind: 'pause', ms: 1800 },
                      { kind: 'type', text: '. see i was just about to fix that typo that!!!!', cps: 32 },
                      { kind: 'pause', ms: 300 },
                      { kind: 'highlight', pattern: '!!!!', ms: 1 },
                      { kind: 'chip', text: 'reduce to one "!"', ms: 1 },
                      { kind: 'pause', ms: 2200 },
                      { kind: 'clear', ms: 1 },
                    ]}
                    mechanism={{ kind: 'tick', intervalMs: 1000 }}
                    economics={{
                      callsPerMin: '60', tokensPerCall: '~200 in · ~50 out',
                      costPerCall: '$0.0014', costPerMin: '~$0.08/min',
                      costPerUserMonth: '~$53',
                      costPerUserMonthNote: 'Sonnet 4.5 · 30 min/day × 22 days',
                    }}
                  />
                ),
              },
              {
                label: 'After pause',
                content: (
                  <TriggerDemo
                    mode="pause"
                    kicker="Pause · 2s"
                    description="AI mistakes your pause for a finished thought."
                    dialogue={[
                      { kind: 'type', text: 'i am typing something.', cps: 28 },
                      { kind: 'pause', ms: 2200 },
                      { kind: 'chip', text: "your sentence isn't complete. add more?", ms: 1 },
                      { kind: 'pause', ms: 1500 },
                      { kind: 'type', text: " I know — I'm thinking. Don't interrupt me.", cps: 32 },
                      { kind: 'pause', ms: 1500 },
                      { kind: 'clear', ms: 1 },
                    ]}
                    mechanism={{ kind: 'countdown', thresholdMs: 2000 }}
                    economics={{
                      callsPerMin: '4–8', tokensPerCall: '~350 in · ~100 out',
                      costPerCall: '$0.0026', costPerMin: '~$0.015/min',
                      costPerUserMonth: '~$10',
                      costPerUserMonthNote: 'Sonnet 4.5 · 30 min/day × 22 days',
                    }}
                  />
                ),
              },
              {
                label: 'On leave',
                content: (
                  <TriggerDemo
                    mode="leave"
                    kicker="Blur event"
                    description="AI stays quiet while you write — then critiques the moment you leave."
                    dialogue={[
                      { kind: 'type', text: 'this is sentence 1, this is sentence 2, this is sentence 3. okay done.', cps: 35 },
                      { kind: 'pause', ms: 700 },
                      { kind: 'focus', toField: 'B', ms: 900 },
                      { kind: 'highlight', pattern: 'this is sentence 2,', ms: 1 },
                      { kind: 'chip', text: 'this should be removed.', ms: 1 },
                      { kind: 'pause', ms: 2000 },
                      { kind: 'focus', toField: 'A', ms: 800 },
                      { kind: 'type', text: " why didn't you tell me earlier?", cps: 32 },
                      { kind: 'pause', ms: 1600 },
                      { kind: 'clear', ms: 1 },
                    ]}
                    mechanism={{ kind: 'focus' }}
                    economics={{
                      callsPerMin: '1–3', tokensPerCall: '~1500 in · ~300 out',
                      costPerCall: '$0.009', costPerMin: '~$0.018/min',
                      costPerUserMonth: '~$12',
                      costPerUserMonthNote: 'Sonnet 4.5 · 30 min/day × 22 days',
                    }}
                  />
                ),
              },
            ]} />
          </div>

          <p>
            The insight: <strong>Different triggers create different relationships.</strong> Is the AI leading? Waiting? Watching? Interrupting? The trigger mechanism is the most important UX decision you make.
          </p>

          <p>
            We prototyped each option and tested with users. Writers don't want to think about the AI. They just want to feel supported and write better. The "blur event" trigger won because it respected the human's agency.
          </p>

          <h2 id={sectionId("Where to NOT use AI")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Where to NOT use AI"}</h2>

          <p>
            Some people like to analyze it from a business perspective (when the cost of failure is high, when human judgment is irreplaceable, etc) but one day I really feel the AI fatigue and just created this table to summarize feeling from my personal experience and what I've heard from others.
          </p>

          <img
            src="/articles/ai-fatigue.png"
            alt="AI fatigue by feeling"
            className="w-full rounded-lg my-8 border border-neutral-200"
          />


          <p>
            Sometimes, the process itself is the product, and that process generates feelings. When the user feels: <strong> Great AI product design knows its boundaries. </strong>
          </p>

          <p>
            I'd want AI that respects human autonomy. What that means in design could be: suggest but not decide, guide but not tell.
          </p>

          <h2 id={sectionId("Three core lessons")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Three core lessons"}</h2>

          <p>
            After years of designing AI products across eldercare, co-writing, and enterprise tooling, three things hold true regardless of context:
          </p>

          <ol className="list-decimal pl-5 space-y-4 mt-4">
            <li><strong>The trigger is the relationship.</strong> When AI speaks matters more than what it says. The blur event, not the tick, won the writing tool study—because it respected the human's flow.</li>
            <li><strong>Hard inferences require human handoff.</strong> The eldercare bot couldn't reason through the "long-term Yes / bad" branch alone. Knowing that limit is a design decision, not a failure.</li>
            <li><strong>Trust is built in small moments.</strong> Acknowledge, evaluate, show affiliation, reconfirm. The script looks mechanical written down. Experienced in a product, it feels like being understood.</li>
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
