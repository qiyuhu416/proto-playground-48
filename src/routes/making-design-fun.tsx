import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/making-design-fun")({
  head: () => ({
    meta: [
      { title: "Making design fun" },
      {
        name: "description",
        content: "Caltrain, After Effects, and why vibe-coding is the future of creation.",
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Collection</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">Making design fun</h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Caltrain, After Effects, and a stubborn suspicion that everything could be easier.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>5 sections</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            I would like to be working on things I genuinely enjoy doing, even things that I am happy to
            do even if not getting paid. For the most part this is for my own benefit.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · The Caltrain moment</h2>
          <p>
            I had this idea stuck in my head and wanted to make it, a small playful thing just for fun.
            So I did it, with After Effects.
          </p>

          <p>
            But it took me almost the whole day... learnt After Effects from 0 just to create that. So
            now you know why I like vibe-coding so much. Once you have some ideas (especially small ones,
            not just products) and a smart tool to help bring that to life, that feeling is very
            addictive.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Curiosity, not FOMO</h2>
          <p>
            The difference between learning something because it's trendy vs. learning something because
            you're genuinely curious is everything. FOMO-driven learning feels like obligation. Curiosity
            feels like play.
          </p>

          <p>
            The Caltrain moment was pure curiosity. I didn't care if After Effects was the "right" tool.
            I cared that I had an idea and wanted to see it come to life, whatever it took.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · One block of prompts</h2>
          <p>
            When I saw a post on social media that was created with only one block of prompts, it hit me.
            That's the future of creation—not drowning in options, but having one powerful, focused
            intention.
          </p>

          <p>
            The best tools get out of your way. They let you think in blocks: your idea, your prompt, your
            output. No fussy settings, no analysis paralysis. Just flow.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§4 · The playful affordances</h2>
          <p>
            What makes design fun is when you stumble on surprising interactions. A gesture that feels
            right. An animation that makes you smile. A workflow that feels effortless.
          </p>

          <p>
            These aren't accidents. They're moments of careful thinking disguised as play. The designer
            sweated over the details so the user could enjoy the magic.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§5 · The question that stuck</h2>
          <p>
            Why should making things be hard? Why should there be so much friction between an idea and
            its realization?
          </p>

          <p>
            That question drives everything I make. If I can remove friction, amplify joy, and make
            creation feel less like work and more like play, then I've done my job. The tools should
            disappear. Only the delight should remain.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>Meetfood — Founding Product Designer (Mar 2021 – Dec 2022)</li>
            <li>Cornell — Physical Computing (Jan 2023 – May 2023)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
