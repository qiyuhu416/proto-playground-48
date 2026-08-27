import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

export const Route = createFileRoute("/reimagining-the-chatbot")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Exploring how prompts reshape design workflows—generative design meets human intent.",
      },
    ],
  }),
  component: CollectionComponent,
});

function CollectionComponent() {
  const [activeExploration, setActiveExploration] = useState<"select-fill" | "browsing" | "ai-asks">("select-fill");

  const explorations = [
    {
      id: "select-fill" as const,
      title: "AI helps you form the question",
      subtitle: "awareness",
      description: "Can AI reduce the work of prompt-writing without taking away your control?",
      video: "/articles/chatbot-select-fill.mp4",
    },
    {
      id: "browsing" as const,
      title: "Chat lives inside browsing",
      subtitle: "browsing & awareness combined",
      description: "What if collecting context is part of the interaction, rather than something you have to reconstruct afterward?",
      video: "/articles/chatbot-always-here.mp4",
    },
    {
      id: "ai-asks" as const,
      title: "AI asks for you",
      subtitle: "comprehend",
      description: "Users don't know what to ask, so why not have AI ask on their behalf?",
      video: "/articles/ai-ai-interaction.mp4",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Collection · Design System</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["reimagining-the-chatbot"].title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>5 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-2xl">

          <h2 id={sectionId("Context")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Context</h2>

          <p>
            Users often don't know what to ask an AI. Yet most AI products still wait inside a chat tab for the user to initiate.
          </p>

          <p>
            This collection was inspired by my work at Apple. While I can't directly show the work there because of NDA, I'm sharing some personal explorations around designing AI that <strong>meets users where they are.</strong>
          </p>

          <h2 id={sectionId("How to think outside the box?")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">How to think outside the box?</h2>

          <p>
            The first step of thinking outside the box is to realize where the box is. There is a cool model called "task analysis" that helped me break out "mundane" interaction into detailed steps.
          </p>

          <img
            src="/articles/task-analysis-flow.png"
            alt="Six-step task analysis flow for asking a question"
            className="w-full rounded-2xl my-6 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic mb-6">
            A user's interaction with a chatbot involves six distinct steps—each with its own friction points and assumptions.
          </p>

          <p>
            I saw there are a lot of assumptions hidden in this flow:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-neutral-700 mb-6">
            <li><strong>Awareness</strong> - User forms the awareness of what to ask - assumption: user knows clearly what to ask</li>
            <li><strong>Expression</strong> - User the conversation by expressing the question - assumption: user express through typing (or clicking on the prompt buttons)</li>
            <li><strong>Processing</strong> - User waits for AI to generate response - assumption: waiting is boring</li>
            <li><strong>Reception</strong> - User realizes the AI finished process</li>
            <li><strong>Interpretation</strong> - User understands AI response</li>
          </ol>

          <img
            src="/articles/task-assumptions.png"
            alt="Assumptions made at each step of the interaction"
            className="w-full rounded-2xl my-6 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic mb-6">
            Every step carries hidden assumptions about what users know, what the system can do, and how they work together.
          </p>

          <p>
            Once I wrote those assumptions down, the design space became much bigger. Instead of asking <strong>"how do we redesign the chatbot?"</strong>, I could ask: <strong>which part of this interaction flow doesn't have to exist at all?</strong>
          </p>

          <h2 id={sectionId("Explorations")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Explorations</h2>

          <p>
            So I am sharing this collection, it is less about UI but more about exploring <strong>different relationships between a person and an AI system.</strong>
          </p>

          {/* Exploration Tabs */}
          <div className="my-8">
            <div className="flex gap-2 mb-6 border-b border-neutral-200">
              {explorations.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExploration(exp.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeExploration === exp.id
                      ? "border-neutral-900 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {exp.title}
                </button>
              ))}
            </div>

            {/* Exploration Content */}
            <div className="space-y-4">
              {explorations.map((exp) => (
                activeExploration === exp.id && (
                  <div key={exp.id} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {exp.title} <span className="font-normal text-neutral-400">{exp.subtitle}</span>
                      </h3>
                      <p className="text-neutral-600 mt-2">
                        {exp.description}
                      </p>
                    </div>

                    <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white">
                      <video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                        <source src={exp.video} type="video/mp4" />
                        Your browser doesn't support video playback.
                      </video>
                    </div>

                    {exp.id === "select-fill" && (
                      <p>
                        Instead of waiting for a complete prompt, I wanted to explore: <strong>Can AI reduce the work of prompt-writing without taking away the user's control over what they actually want to ask?</strong>
                      </p>
                    )}

                    {exp.id === "browsing" && (
                      <p>
                        The user can select information directly in the browsing window and add it to a <strong>question list</strong> to ask later. Instead of repeatedly copying context into a chatbot, the question can build alongside the browsing process.
                      </p>
                    )}

                    {exp.id === "ai-asks" && (
                      <p>
                        Learning can happen in 2 ways: active and passive. If understanding is the goal, we don't have to rely on users to ask questions for them to learn. They can also learn by "watching 2 AIs chatting".
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          <h2 id={sectionId("So what's next after those concepts?")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">So what's next after those concepts?</h2>

          <p>
            Prototypes, in my opinion, serve two goals:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li><strong>Produce knowledge or principles</strong></li>
            <li><strong>Be turned into production</strong></li>
          </ol>

          <p>Those goals need different next steps.</p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">If the goal = production: run more controlled experiments</h3>

          <p>
            More business-related factors need to be considered.
          </p>

          <p>
            For example, in scenarios where intrusiveness matters, we need to be careful about <strong>to what extent AI feels proactive versus intrusive in assisted browsing.</strong>
          </p>

          <p>
            I created an interactive prototype with Claude Code and tested it using Wizard of Oz. A control panel let me adjust the metrics that defined when and how proactive the AI should be.
          </p>

          <p>
            The implication was: <strong>don't go with proactivity for now. First, explore better ways to collect contextual data.</strong>
          </p>

          <p>
            The interesting design problem became less about making AI proactively pop up, and more about <strong>what information it needs before that behavior feels justified.</strong>
          </p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">If the goal = knowledge: look for reusable principles</h3>

          <p>
            There is one design-thinking model I really like: the <strong>analysis–synthesis model</strong>. It taught me not to just look at each concept individually, but to derive common themes across them—and then brainstorm again based on those themes.
          </p>

          <p>
            Across these explorations, a few things kept coming back: make uncertainty visible, preserve user agency, design recovery as carefully as the happy path, and choose the interface based on the task instead of defaulting to chat.
          </p>

          <p>
            Given those are the actual goals, the "chatbot" is probably just the <strong>current interface</strong>—one of many possible solutions.
          </p>

          <p>
            More to come. And hopefully, as the technology changes, we get more room to imagine what those other solutions could be.
          </p>

        </div>

      </article>
    </div>
  );
}
