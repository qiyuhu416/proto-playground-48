import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/design-as-a-research-tool")({
  head: () => ({
    meta: [
      { title: "Design as a research tool" },
      {
        name: "description",
        content: "Using design methods to uncover hidden user behaviors and inform policy decisions.",
      },
    ],
  }),
  component: CaseStudyComponent,
});

function CaseStudyComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Case Study</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Design can be a research tool
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Using mixed-method research and design prototyping to uncover user behaviors and inform transportation policy.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Design</span>
            <span className="text-neutral-300">·</span>
            <span>Pittsburgh Parking Authority</span>
          </div>
        </div>

        <img
          src="/articles/design-research-hero.jpg"
          alt="Design research project overview"
          className="w-full rounded-2xl mb-16 border-4 border-neutral-900"
        />

        <div className="prose prose-neutral max-w-4xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Context</h2>
          <p>
            The Pittsburgh Parking Authority wanted to understand how people use parking and transportation in their city. Rather than relying solely on surveys or data analysis, this project used design as a research method to uncover hidden behaviors and motivations.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Approach</h2>
          <ul>
            <li><strong>Ethnographic observation</strong> — Understanding real-world parking behaviors in context</li>
            <li><strong>Design prototyping</strong> — Creating artifacts to test assumptions and surface insights</li>
            <li><strong>Mixed-method analysis</strong> — Combining qualitative and quantitative data</li>
            <li><strong>Stakeholder engagement</strong> — Translating research into actionable policy recommendations</li>
          </ul>

          <img
            src="/articles/design-research-1.png"
            alt="Research methodology diagram"
            className="w-full rounded-2xl my-8"
          />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Insight</h2>
          <p>
            Design isn't just about making things look good—it's a powerful tool for revealing how people actually behave and what they truly need. By prototyping solutions, we surfaced mental models and decision patterns that traditional research methods would have missed.
          </p>

          <img
            src="/articles/design-research-2.png"
            alt="User research insights and findings"
            className="w-full rounded-2xl my-8"
          />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Outcome</h2>
          <p>
            The research informed Pittsburgh's transportation and parking policy, demonstrating how design-driven research can bridge the gap between user insights and policy implementation.
          </p>

          <img
            src="/articles/design-research-3.png"
            alt="Project outcomes and policy recommendations"
            className="w-full rounded-2xl my-8"
          />

          <p className="mt-12 text-sm text-neutral-600">
            For the complete case study and detailed findings, visit the{" "}
            <a href="https://www.key-you-who.com/projects/design-as-a-research-tool" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              full project page
            </a>.
          </p>
        </div>
      </article>
    </div>
  );
}
