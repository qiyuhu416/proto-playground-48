import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

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
            {ARTICLE_META["a2ui-generative"].title}
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
          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>Note:</strong> I can't directly show the prototypes I built, but I can share the references and research frameworks I used while exploring A2UI. This is early-stage research—not production-ready, but useful for understanding the space.</p>
          </div>

          <TableOfContents />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">What is A2UI?</h2>
          <p>
            A2UI (Agent-to-UI) and Generative UI represent a paradigm shift in how interfaces are designed and built. Instead of pre-designing every screen, we specify intent and let AI generate appropriate interfaces. The key insight: <strong>defining what to explore is more important than building the prototype.</strong>
          </p>

          <p>
            I used Claude Code to explore these concepts while understanding the boundary: this is research-grade exploration, not a production framework.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Exploring from Use Cases</h2>
          <p>
            Rather than building one "generative UI," I mapped the space by exploring different <strong>user roles</strong> and what they need (connecting to the "role" concept from prototype research). For each role, I designed interactions that would emerge:
          </p>

          <div className="space-y-4 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Researcher Role</h4>
              <p className="text-sm text-neutral-600">How might an AI generate interfaces optimized for exploration and hypothesis testing? What components matter when discovery is the goal?</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Decision-Maker Role</h4>
              <p className="text-sm text-neutral-600">What would an interface look like designed for quick judgment and trade-off evaluation? How does AI prioritize information density vs. clarity?</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Executor Role</h4>
              <p className="text-sm text-neutral-600">How does AI design for action and efficiency? What components reduce friction for users just trying to get something done?</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Learner Role</h4>
              <p className="text-sm text-neutral-600">How does generative UI explain itself? What if the interface adapted to teach as it generates, scaffolding understanding alongside functionality?</p>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Interaction Patterns</h2>
          <p>
            For each role, I explored how interactions might differ when they're AI-generated:
          </p>

          <ul>
            <li><strong>Fluidity</strong> — Can the interface morph as the AI's understanding of your goal evolves?</li>
            <li><strong>Transparency</strong> — Does the AI show its reasoning for why this layout, this grouping, this hierarchy?</li>
            <li><strong>Control</strong> — Where's the line between AI deciding and you deciding? How do you push back?</li>
            <li><strong>Consistency</strong> — If every interaction generates a new UI, how does the user build mental models?</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Research References</h2>
          <ul>
            <li><a href="https://a2ui.org/composer/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">A2UI Composer</a> — Framework for thinking about agent-driven interfaces</li>
            <li>Generative UI research from Vercel and Anthropic on how to design for AI-generated components</li>
            <li>"What do prototypes prototype?" — Mapping this to the question: <em>What does a generative UI prototype?</em></li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Big Question</h2>
          <p>
            If interfaces can be generated, what's the role of design? The answer: <strong>design moves upstream</strong>. Instead of designing screens, you design the principles that guide generation. You decide: for this role, what matters most? Speed? Exploration? Control? Learning? The AI generates in service of that intention.
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
