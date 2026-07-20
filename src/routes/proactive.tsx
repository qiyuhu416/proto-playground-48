import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/proactive")({
  head: () => ({
    meta: [
      { title: "Proactive" },
      {
        name: "description",
        content: "Using prototypes as testing tools to validate assumptions and iterate with stakeholders.",
      },
    ],
  }),
  component: ProactiveComponent,
});

function ProactiveComponent() {
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Prototype</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Proactive
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
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Concept</h2>
          <p>
            Prototypes aren't just final deliverables—they're testing instruments. This project explores how to use interactive prototypes with built-in variable controls to explore solution spaces and validate assumptions in real-time, during meetings with stakeholders.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">How It Works</h2>
          <p>
            The prototype features a <strong>control panel on the left side</strong> that exposes key variables—things like layout spacing, interaction timing, visual hierarchy, or content emphasis. Rather than building multiple versions, we adjust these variables live during conversations, asking "What if we changed this?" and seeing the impact immediately.
          </p>

          <p className="mt-4">
            This turns static mockups into dynamic tools for discussion. Stakeholders can see how decisions ripple through the design, and we can identify what actually matters versus what's just preference.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Variables as Questions</h2>
          <p>
            Each control panel variable represents a design question:
          </p>
          <ul>
            <li><strong>Spacing</strong> — How much breathing room does the design need?</li>
            <li><strong>Timing</strong> — Should interactions feel snappy or deliberate?</li>
            <li><strong>Color emphasis</strong> — Which elements deserve visual weight?</li>
            <li><strong>Information density</strong> — What's essential vs. nice-to-have?</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">A Note on Sharing</h2>
          <p>
            <em>This project is under NDA, so I can only share my feelings and approach rather than specific deliverables.</em> What I valued most was the realization that prototypes are better as <strong>collaborative testing tools</strong> than polished presentations. The moment a stakeholder reaches for a control to "try something," the conversation shifts from critique to co-creation.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Takeaway</h2>
          <p>
            If you build prototypes that invite tweaking, you'll learn what people actually care about. The real design work happens in those moments of "wait, what if we..." rather than in perfect renderings.
          </p>
        </div>
      </article>
    </div>
  );
}
