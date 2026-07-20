import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/a2ui-generative")({
  head: () => ({
    meta: [
      { title: "A2UI & Generative UI" },
      {
        name: "description",
        content: "AI-driven user interfaces that generate and adapt components based on intent.",
      },
    ],
  }),
  component: ResearchComponent,
});

function ResearchComponent() {
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            A2UI & Generative UI
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            AI-driven user interfaces that generate and adapt components based on intent.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · AI</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            A2UI (Agent-to-UI) and Generative UI represent a paradigm shift in how interfaces are
            designed and built. Instead of pre-designing every screen, we specify intent and let AI
            generate appropriate interfaces.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Core Ideas</h2>
          <ul>
            <li>Interfaces can be generated dynamically based on user intent and context</li>
            <li>AI agents can reason about optimal UI patterns for given tasks</li>
            <li>Generative UI bridges the gap between conversational and visual interaction</li>
            <li>Component libraries become starting points, not endings</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Challenges</h2>
          <p>
            The transition from designed to generated interfaces raises important questions about
            consistency, accessibility, and user control. How do we maintain brand coherence when
            interfaces are generated? How do we ensure generated UIs are accessible? When should a
            human designer override the AI's choices?
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Future Directions</h2>
          <p>
            The future likely involves hybrid approaches where AI generates variations and humans
            refine and approve them. The designer's role evolves from pixel-pushing to intent-articulation
            and quality gatekeeping.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Explore</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>How component generation is changing interface design</li>
            <li>The role of AI in scaling design systems</li>
            <li>Balancing automation with human control</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
