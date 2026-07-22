import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "./-BackButton";

export const Route = createFileRoute("/human-ai-research")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Exploring the evolving nature of human-AI collaboration and partnership.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">
        <BackButton />

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Human-AI relationship research
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Exploring the evolving nature of human-AI collaboration and partnership.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            As AI systems become more capable, the relationship between humans and AI fundamentally
            changes. This research explores what makes for healthy, productive human-AI partnerships.
          </p>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Key Questions</h2>
          <ul>
            <li>How do humans develop trust in AI systems?</li>
            <li>What does successful collaboration look like across different domains?</li>
            <li>How do humans maintain agency and critical thinking when working with AI?</li>
            <li>What organizational structures support effective human-AI teams?</li>
          </ul>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Observations</h2>
          <p>
            The best human-AI relationships aren't about AI replacing humans or humans blindly
            trusting AI. They're about clear complementarity: humans excel at judgment, strategy,
            and creativity; AI excels at pattern recognition, synthesis, and scale.
          </p>

          <p>
            The friction points emerge when either side tries to do the other's job. When AI tries
            to make strategic decisions without human input, trust breaks down. When humans refuse to
            leverage AI's pattern recognition abilities, they handicap themselves.
          </p>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Design Implications</h2>
          <p>
            Interface design should reinforce healthy collaboration patterns. Show reasoning, not
            just conclusions. Make it easy to verify and disagree. Surface uncertainty. Give humans
            real leverage to steer outcomes.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related work</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Designing for transparency in AI systems</li>
            <li>Building trust through explainability</li>
            <li>Human-AI team dynamics in practice</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
