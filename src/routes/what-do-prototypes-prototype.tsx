import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/what-do-prototypes-prototype")({
  head: () => ({
    meta: [
      { title: "What do prototypes prototype" },
      {
        name: "description",
        content:
          "Mapping UX to tech capability. Insights from conversational AI, elder care, and human–AI co-writing.",
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            <span className="bg-neutral-900 text-white px-2 py-1 rounded">What</span> do prototypes
            prototype
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Either easy inferences with great performance, or hard inferences with fair performance.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>8 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <blockquote>
            Most successful AI products are either easy inferences with great performance, or hard
            inferences with fair performance.
          </blockquote>

          <p>
            Since when did "humans" become a frequent word? Pre-AI, we didn't say "humans" this much, we
            were just... in it. But once AI entered the room, we started seeing ourselves from the outside.
          </p>

          <p>
            Designing AI is not always about making the AI smarter, it's always about mapping the UX to
            the current tech capability. Here are some reflections from my work in academia and industry:
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Designing the relationship</h2>
          <p>
            My work at AI-Caring focused on conversational AI for elder care. The core challenge wasn't
            making the AI smarter—it was designing a relationship of trust and transparency.
          </p>

          <p>
            When an AI cares for vulnerable populations, every interaction is a moment of either building
            or breaking trust. The design question becomes: how do we show the AI's limitations honestly,
            while still providing genuine support?
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Designing the feeling</h2>
          <p>
            At Apple, I worked on human–AI co-writing tools. The breakthrough wasn't in the model—it was
            in understanding that writers don't want a replacement. They want a thought partner.
          </p>

          <p>
            The UX became about creating moments of graceful handoff: when to suggest, when to defer,
            when to amplify the human voice. The interface is less about what the AI can do, and more
            about how the AI makes the human feel.
          </p>

          <h2>§3 · Where to NOT use AI</h2>
          <p>
            This might be the most important design question: when should we not use AI? When the cost of
            failure is high. When the human judgment is irreplaceable. When the relationship itself is
            the product.
          </p>

          <p>
            Great AI product design knows its boundaries. It's not about pushing the edges of what's
            possible—it's about honoring what matters most.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>The Mentoring Partnership — Conversational AI (Feb 2024 – Aug 2024)</li>
            <li>AI-Caring Research — Conversational AI Researcher (Aug 2023 – Aug 2024)</li>
            <li>Google — UX Designer (Feb 2023 – May 2023)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
