import { createFileRoute } from "@tanstack/react-router";
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

          <p>
            Once I wrote those assumptions down, the design space became much bigger. Instead of asking <strong>"how do we redesign the chatbot?"</strong>, I could ask: <strong>which part of this interaction flow doesn't have to exist at all?</strong>
          </p>

          <h2 id={sectionId("Explorations")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Explorations</h2>

          <p>
            So I am sharing this collection, it is less about UI but more about exploring <strong>different relationships between a person and an AI system.</strong>
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">What if AI helps you form the question while you type?</h3>

          <p>
            Instead of waiting for a complete prompt, I wanted to explore: <strong>Can AI reduce the work of prompt-writing without taking away the user's control over what they actually want to ask?</strong>
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 my-6 text-sm text-neutral-600 italic">
            [Prototype video: Select & Fill interaction]
          </div>

          <h3 className="mt-8 mb-3 text-lg font-semibold">What if chat lives inside browsing?</h3>

          <p>
            What if collecting context is part of the interaction, rather than something the user has to reconstruct afterward? The user can select information directly in the browsing window and add it to a <strong>question list</strong> to ask later. Instead of repeatedly copying context into a chatbot, the question can build alongside the browsing process.
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 my-6 text-sm text-neutral-600 italic">
            [Prototype video: I Am Always Here—Just Let Me Know interaction]
          </div>

          <h3 className="mt-8 mb-3 text-lg font-semibold">What if AI asks <em>for you</em>?</h3>

          <p>
            Users don't know what to ask, so why not have AI ask on users' behalf if it understands enough about user's preferences? Learning can happen in 2 ways: active and passive. If understanding is the goal, we don't have to rely on users to ask questions for them to learn, they can also learn by "watching 2 AIs chatting".
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 my-6 text-sm text-neutral-600 italic">
            [Prototype video: AI-AI interaction]
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

          <h3 className="mt-8 mb-3 text-lg font-semibold">If the goal = production: run more controlled experiments</h3>

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

          <h3 className="mt-8 mb-3 text-lg font-semibold">If the goal = knowledge: look for reusable principles</h3>

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
