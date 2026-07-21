import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/reimagining-the-chatbot")({
  head: () => ({
    meta: [
      { title: "A collection of reimagining the chatbot: Select & fill with prompts" },
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
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Collection</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["reimagining-the-chatbot"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Exploring how prompts reshape design workflows—generative design meets human intent.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Collection</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            The interaction between humans and AI is fundamentally changing how we design. When a prompt
            becomes the interface, the designer's role shifts from specifying every detail to orchestrating
            a conversation with a generative system.
          </p>

          <TableOfContents />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Promise</h2>
          <p>
            Imagine selecting a region on your canvas, describing what you want, and watching it fill
            intelligently. No need to manually create every element. No need to spend hours on execution.
            Just intent, articulated clearly.
          </p>

          <p>
            This is the dream of generative design workflows. But getting there requires rethinking
            fundamentals:
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Task Analysis: What "Asking a Question" Takes</h2>
          <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border border-neutral-200 bg-white my-6">
            <img
              src="/articles/task-analysis-flow.png"
              alt="Six-step task analysis flow"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-neutral-600 italic mb-8">
            A user's interaction with a chatbot involves six distinct steps—each with its own friction points and assumptions.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Assumptions at Each Step</h2>
          <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border border-neutral-200 bg-white my-6">
            <img
              src="/articles/task-assumptions.png"
              alt="Assumptions made at each step"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-neutral-600 italic mb-8">
            Every step carries hidden assumptions about what users know, what the system can do, and how they work together.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Prototypes Exploring These Dimensions</h2>

          <div className="space-y-8 my-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Select & Fill with Prompts <span className="font-normal text-neutral-400">awareness</span>
              </h3>
              <p className="text-neutral-600 mb-4">
                The core interaction model: select a region, describe what you want, and let the AI fill it in. This prototype tests whether prompting can become a natural design tool, bridging intent and execution.
              </p>
              <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                <source src="/articles/chatbot-select-fill.mp4" type="video/mp4" />
                Your browser doesn't support video playback.
              </video></div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                I Am Always Here—Just Let Me Know <span className="font-normal text-neutral-400">browsing & awareness combined</span>
              </h3>
              <p className="text-neutral-600 mb-4">
                What if the AI didn't wait to be asked? This prototype reimagines the assistant as proactive and present, reducing the cognitive load of "knowing what to ask." It explores the assumption that users must always initiate.
              </p>
              <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                <source src="/articles/chatbot-always-here.mp4" type="video/mp4" />
                Your browser doesn't support video playback.
              </video></div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                AI–AI Interaction <span className="font-normal text-neutral-400">comprehend</span>
              </h3>
              <p className="text-neutral-600 mb-4">
                When two AI agents communicate, what happens? This prototype visualizes real-time conversation between systems, exploring how they resolve misunderstandings and align intent.
              </p>
              <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                <source src="/articles/ai-ai-interaction.mp4" type="video/mp4" />
                Your browser doesn't support video playback.
              </video>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Knowledge Graph Visualization <span className="font-normal text-neutral-400">comprehend & followup</span>
              </h3>
              <p className="text-neutral-600 mb-4">
                When AI generates an answer, where does it come from? This prototype visualizes the reasoning process—showing connections between concepts, sources, and inferences. Making the invisible thinking visible.
              </p>
              <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                <source src="/articles/chatbot-knowledge-graph.mp4" type="video/mp4" />
                Your browser doesn't support video playback.
              </video></div>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">What Gets Tested</h2>
          <p>
            This collection explores prototypes across three dimensions of prototyping:
          </p>

          <div className="space-y-4 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-1">Implementation</h3>
              <p className="text-sm text-neutral-600">
                Can a prompt engine understand spatial context? How does it preserve design intent
                through multiple iterations?
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-1">Look & Feel</h3>
              <p className="text-sm text-neutral-600">
                How does real-time generation feel to use? Is the latency acceptable? Does the output
                feel like it was designed by a human or a machine?
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-1">Role</h3>
              <p className="text-sm text-neutral-600">
                Does this make designers more productive or less? Does it amplify creativity or constrain
                it? How does human-AI collaboration change the definition of design skill?
              </p>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Challenge</h2>
          <p>
            The hardest part isn't building the system. It's understanding what designers actually want
            to communicate. The gap between intent and articulation is where most prototype attempts fail.
          </p>

          <p>
            Getting the interaction model right means testing relentlessly. Testing what people ask for.
            Testing what the system misunderstands. Testing the moments where human and AI intent diverge.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Next Steps</h2>
          <p>
            This collection documents the journey. From first-pass concepts to polished interactions.
            From "does it work?" to "does it feel right?" to "does it matter?"
          </p>

          <p>
            Each prototype is a question. Each iteration is an answer. And together, they're reshaping
            what the future of design tools could be.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related concepts</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Generative design workflows</li>
            <li>Prompt engineering for spatial context</li>
            <li>Human-AI collaboration patterns</li>
            <li>Real-time generation feedback loops</li>
            <li>Designing for ambiguity and iteration</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
