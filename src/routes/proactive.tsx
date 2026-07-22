import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

export const Route = createFileRoute("/proactive")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Using prototypes as testing tools to validate assumptions and iterate with stakeholders.",
      },
    ],
  }),
  component: ProactiveComponent,
});

function Toggle({ label, sublabel, value, onChange }: { label: string; sublabel: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold text-neutral-700">{label}</p>
        <p className="text-[11px] text-neutral-400 mt-0.5">{sublabel}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-300 ${value ? "bg-neutral-700" : "bg-neutral-300"}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "left-5" : "left-1"}`} />
      </button>
    </div>
  );
}

type TriggerType = "behavioral" | "idle" | "contextual";
type ChatState = "hidden" | "bubble" | "open";

const TRIGGER_CONFIG = {
  behavioral: {
    label: "Behavioral",
    sublabel: "Repeated actions",
    paramLabel: "View threshold",
    paramOptions: ["2 views", "3 views", "5 views"],
    trigger: (p: number) => `Triggered after ${["2", "3", "5"][p]} product views`,
    message: "You've been comparing storage options — want me to help narrow it down?",
  },
  idle: {
    label: "Idle",
    sublabel: "Inactivity window",
    paramLabel: "Wait time",
    paramOptions: ["5 sec", "15 sec", "30 sec"],
    trigger: (p: number) => `Triggered after ${["5s", "15s", "30s"][p]} of inactivity`,
    message: "Still deciding? I can walk you through the differences.",
  },
  contextual: {
    label: "Contextual",
    sublabel: "Session signals",
    paramLabel: "Confidence",
    paramOptions: ["50%", "75%", "90%"],
    trigger: (p: number) => `Triggered at ${["50", "75", "90"][p]}% session confidence`,
    message: "Based on your session, Cloud Storage looks like a strong fit for your stack.",
  },
};

function ProactiveDemo() {
  const [trigger, setTrigger] = useState<TriggerType>("behavioral");
  const [paramIdx, setParamIdx] = useState(1);
  const [chatState, setChatState] = useState<ChatState>("hidden");

  const cfg = TRIGGER_CONFIG[trigger];

  const handleTriggerChange = (t: TriggerType) => {
    setTrigger(t);
    setParamIdx(1);
    setChatState("hidden");
  };

  const handleParamChange = (i: number) => {
    setParamIdx(i);
    setChatState("hidden");
  };

  return (
    <div className="not-prose rounded-2xl bg-neutral-100 p-4 flex gap-4 my-10" style={{ minHeight: "380px" }}>
      {/* Left: controls */}
      <div className="shrink-0 w-44 flex flex-col gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-semibold">Trigger type</p>
          <div className="flex flex-col gap-1">
            {(["behavioral", "idle", "contextual"] as TriggerType[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTriggerChange(t)}
                className={`text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  trigger === t ? "bg-neutral-800 text-white" : "bg-white text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <span className="font-semibold block">{TRIGGER_CONFIG[t].label}</span>
                <span className={`text-[10px] ${trigger === t ? "text-neutral-300" : "text-neutral-400"}`}>{TRIGGER_CONFIG[t].sublabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-semibold">{cfg.paramLabel}</p>
          <div className="flex flex-col gap-1">
            {cfg.paramOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleParamChange(i)}
                className={`text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  paramIdx === i ? "bg-amber-300 text-neutral-900 font-semibold" : "bg-white text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-semibold">Simulate</p>
          <div className="flex flex-col gap-1">
            {([["hidden", "Page loads"], ["bubble", "Trigger fires"], ["open", "Chat opens"]] as [ChatState, string][]).map(([s, label]) => (
              <button
                key={s}
                onClick={() => setChatState(s)}
                className={`text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  chatState === s ? "bg-neutral-800 text-white font-semibold" : "bg-white text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: mock webpage */}
      <div className="flex-1 rounded-xl overflow-hidden border border-neutral-200 flex flex-col bg-white" style={{ minHeight: "340px" }}>
        {/* Browser chrome */}
        <div className="bg-neutral-100 border-b border-neutral-200 px-3 py-2 flex items-center gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
          <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-neutral-400 ml-2">cloud.google.com/products</div>
        </div>

        {/* Page content */}
        <div className="flex-1 relative p-5 overflow-hidden">
          {/* Mock page */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-blue-500" />
              <div className="w-3 h-3 rounded-sm bg-red-400" />
              <div className="w-3 h-3 rounded-sm bg-yellow-400" />
              <div className="w-3 h-3 rounded-sm bg-green-400" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-700">Google Cloud</span>
            <div className="flex gap-3 ml-2">
              {["Products", "Solutions", "Pricing"].map(n => (
                <span key={n} className="text-[10px] text-neutral-400">{n}</span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="h-2 w-48 bg-neutral-200 rounded mb-1.5" />
            <div className="h-4 w-64 bg-neutral-800 rounded mb-3" />
            <div className="grid grid-cols-3 gap-2">
              {["Cloud Storage", "Filestore", "Cloud SQL"].map(p => (
                <div key={p} className="border border-neutral-200 rounded-lg p-2">
                  <div className="h-1.5 w-12 bg-blue-200 rounded mb-1" />
                  <div className="text-[9px] font-semibold text-neutral-700">{p}</div>
                  <div className="h-1.5 w-16 bg-neutral-100 rounded mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Trigger label */}
          {chatState !== "hidden" && (
            <div className="text-[9px] text-neutral-400 italic mt-2">{cfg.trigger(paramIdx)}</div>
          )}

          {/* Chat widget */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            {/* Open chat panel */}
            {chatState === "open" && (
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg w-52 overflow-hidden">
                <div className="bg-neutral-900 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">G</span>
                    </div>
                    <span className="text-white text-[10px] font-semibold">Cloud Assistant</span>
                  </div>
                  <button onClick={() => setChatState("bubble")} className="text-neutral-400 text-[10px] hover:text-white">✕</button>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex gap-1.5 items-start">
                    <div className="w-4 h-4 rounded-full bg-blue-100 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-neutral-700 bg-neutral-50 rounded-lg px-2 py-1.5 leading-relaxed">{cfg.message}</p>
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    <button className="bg-neutral-900 text-white text-[9px] px-2.5 py-1 rounded-lg">Yes, help me</button>
                    <button className="border border-neutral-200 text-neutral-500 text-[9px] px-2.5 py-1 rounded-lg">Not now</button>
                  </div>
                </div>
              </div>
            )}

            {/* Bubble button */}
            <button
              onClick={() => setChatState(chatState === "open" ? "bubble" : "open")}
              className={`w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg relative transition-transform ${chatState === "bubble" ? "scale-110" : ""}`}
            >
              <span className="text-white text-base">💬</span>
              {chatState === "bubble" && (
                <>
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                  <span className="absolute inset-0 rounded-full bg-neutral-700 animate-ping opacity-30" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProactiveComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Prototype</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["proactive"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Using prototypes as testing tools to validate assumptions and iterate with stakeholders in real-time.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Implementation · Testing</span>
            <span className="text-neutral-300">·</span>
            <span>Research</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <TableOfContents />

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>Note:</strong> This project is under NDA. What I can say is that the most valuable moment was when a stakeholder said mid-meeting "wait, what if we changed this?" That shift from critique to co-creation is what this prototype was built for.
            </p>
          </div>

          <h2 id={sectionId("A prototype for prototyping")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"A prototype for prototyping"}</h2>
          <p>
            This is a prototype that prototypes. The thing being designed was a proactive chatbot—an AI that surfaces on a page without being asked. But rather than committing to one version of that behavior, the prototype was built to <strong>expose the design variables live</strong>, so the team could debate and tune them with stakeholders in real time.
          </p>
          <p>
            The core question: <strong>what defines the right moment for an AI to speak up?</strong> That question has no single answer—it depends on timing, context, and how much the product trusts its read of the user. The prototype makes those dependencies visible and adjustable.
          </p>

      

          <ProactiveDemo />

          <h2 id={sectionId("Variables as questions")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Variables as questions"}</h2>
          <p>
            Each trigger type encodes a different belief about when AI should interrupt:
          </p>
          <ul>
            <li><strong>Behavioral</strong> — How many signals are enough? At 2 views the AI feels presumptuous; at 5 it may have missed its moment. The threshold is a decision about trust.</li>
            <li><strong>Idle</strong> — How long is too long to wait? 5 seconds feels intrusive; 30 might lose the user. The window defines the AI's sense of urgency.</li>
            <li><strong>Contextual</strong> — How confident does the system need to be? Low confidence risks noise; high confidence risks silence. The threshold shapes the AI's personality.</li>
          </ul>

          <h2 id={sectionId("The takeaway")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"The takeaway"}</h2>
          <p>
            Prototypes that invite tweaking surface what people actually care about. The real design work happened not in building the chatbot, but in the conversations this prototype made possible—about timing, tone, and when an AI earns the right to speak first.
          </p>
        </div>
      </article>
    </div>
  );
}
