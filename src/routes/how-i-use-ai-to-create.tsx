import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/how-i-use-ai-to-create")({
  head: () => ({
    meta: [
      { title: "How I use AI to create" },
      {
        name: "description",
        content: "Prototyping as a research mindset, and why AI should augment—not bypass—your thinking.",
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
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Implementation</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            How I use AI to create
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Prototyping as a research mindset, and why AI should augment—not bypass—your thinking.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>5 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Prototype = Research mindset</h2>
          <blockquote>
            Sometimes we keep using a solution not because it is the best one, but because we've used it for
            a long time.
          </blockquote>

          <p>
            The word "prototype" might have been automatically associated with a digital phone frame where
            people can click around. But we could actually expand the scope here: <strong>As creation itself
            becomes easier, prototypes can be any form of experiments used to test "what to create."</strong>
          </p>

          <p>
            But prototyping = research. It is essentially a mindset to test what to design. Prototypes can
            be anything that serves those goals:
          </p>

          <img
            src="/articles/ai-fatigue.png"
            alt="AI fatigue visualization"
            className="w-full rounded-lg my-8 border border-neutral-200"
          />

          <ul>
            <li>A sketch on paper</li>
            <li>A conversation with a user</li>
            <li>A coded interaction</li>
            <li>An AI prompt exploration</li>
            <li>A workflow walkthrough</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Built to elicit errors</h2>
          <p>
            The best prototypes are ones that help you find what you don't know yet. They should surface
            edge cases, reveal assumptions, and show where your thinking breaks down.
          </p>

          <p>
            When using AI to create, this becomes even more critical. The tool can generate solutions fast,
            but it can also let you bypass thinking. A good prototype workflow with AI:
          </p>

          <ol>
            <li>Articulate what you're testing</li>
            <li>Use AI to explore variations quickly</li>
            <li>Deliberately stress-test each variation</li>
            <li>Reflect on what failed and why</li>
            <li>Iterate with new understanding</li>
          </ol>

          <img
            src="/articles/testing-session.png"
            alt="Testing session with AI"
            className="w-full rounded-lg my-8 border border-neutral-200"
          />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · Don't let AI bypass your thinking</h2>
          <p>
            The seductive part of AI is speed. But speed without intent becomes noise. The best use of AI
            for creation is as a thought partner—not a replacement for thinking.
          </p>

          <p>
            Keep the friction where it matters: in your decision-making, your taste, your judgment. Let AI
            handle the execution. This balance is where real creation happens.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>Archetype AI — AI Design Fellow (Summer 2024)</li>
            <li>The Mentoring Partnership — Conversational AI (Feb 2024 – Aug 2024)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
