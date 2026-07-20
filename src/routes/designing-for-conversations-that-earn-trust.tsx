import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/designing-for-conversations-that-earn-trust")({
  head: () => ({
    meta: [
      { title: "Designing for conversations that earn trust" },
      {
        name: "description",
        content: "Building AI systems that users can depend on through caring design principles.",
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
            Designing for conversations that earn trust
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Building AI systems that users can depend on—insights from caring AI research.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · AI Design</span>
            <span className="text-neutral-300">·</span>
            <span>Caring AI</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Challenge</h2>
          <p>
            As AI systems become more conversational, users face a fundamental question: can I trust this AI? Trust isn't built through features alone—it emerges through consistent, caring interactions that respect user autonomy and acknowledge limitations.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">What is Caring AI?</h2>
          <p>
            Caring AI is a design philosophy that prioritizes the wellbeing of users and honest communication. It's about building systems that:
          </p>
          <ul>
            <li><strong>Acknowledge uncertainty</strong> — Surface when the AI isn't sure, rather than confidently wrong</li>
            <li><strong>Respect autonomy</strong> — Support user decision-making, not replace it</li>
            <li><strong>Build competence gradually</strong> — Show users how to work with the AI effectively over time</li>
            <li><strong>Honor relationships</strong> — Treat conversations as ongoing relationships, not one-off transactions</li>
            <li><strong>Admit mistakes</strong> — Own errors and help users understand what went wrong</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Design Principles</h2>

          <h3 className="text-lg font-semibold mt-8 mb-3">Transparency over illusion</h3>
          <p>
            Show users how the AI reaches conclusions. Make reasoning visible, not hidden. When a system says "I think X because of Y," users can evaluate that logic and decide whether to trust it.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">Honest about limits</h3>
          <p>
            A caring AI tells you what it can't do before you waste time asking. It says "I can help with strategy but not implementation details" rather than pretending to know everything.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">Inviting disagreement</h3>
          <p>
            Trust grows when users feel safe disagreeing. Design conversations where saying "I think you're wrong" feels welcome, and the AI responds by explaining further or acknowledging the point.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">Learning together</h3>
          <p>
            The best AI conversations feel like collaboration. The AI learns what matters to you, you learn what the AI is good at, and you both get better over time.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Why This Matters</h2>
          <p>
            In a world where AI is becoming ubiquitous, trust is the differentiator. Users will choose systems they can depend on, even if other options are flashier. Caring design isn't just ethical—it's good business.
          </p>

          <p className="mt-12">
            The future of AI isn't about making systems that seem smarter. It's about making systems that are honest, helpful, and genuinely interested in your success.
          </p>
        </div>
      </article>
    </div>
  );
}
