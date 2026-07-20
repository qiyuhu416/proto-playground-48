import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/claude-code-research")({
  head: () => ({
    meta: [
      { title: "My Claude Code research" },
      {
        name: "description",
        content: "Building and evolving development tools powered by AI assistance.",
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
            My Claude Code research
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Building and evolving development tools powered by AI assistance.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Tools</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            Claude Code represents an experiment in how AI can augment the software development
            process. This research documents the evolution of these tools and the insights gained
            from building them.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Mission</h2>
          <p>
            To explore how AI can be a true thinking partner for developers, not just a code
            completion tool. The goal is to make development faster, more enjoyable, and focused
            on higher-level problem solving.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Learnings</h2>
          <ul>
            <li>Context is everything—the better the AI understands the codebase, the better it helps</li>
            <li>Developers value explainability—understanding why AI made a choice matters</li>
            <li>Iteration cycles are critical—first-pass AI output is rarely production-ready</li>
            <li>Different developers need different interaction styles and levels of autonomy</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Evolution</h2>
          <p>
            The tools continue to evolve based on real developer feedback and usage patterns. Each
            iteration pushes the boundaries of what's possible when humans and AI work together on
            code.
          </p>

          <p>
            The future of development tools isn't about fully automated systems—it's about better
            collaboration, better understanding, and better ways to capture intent.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Themes</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>AI as a thinking partner, not a replacement</li>
            <li>The importance of context and understanding</li>
            <li>Building tools that respect developer autonomy</li>
            <li>Iteration as the core of collaborative development</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
