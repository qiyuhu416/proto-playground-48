import { createFileRoute } from "@tanstack/react-router";
import { ArticleHeader } from "./-ArticleHeader";
import { ArticleLayout } from "@/components/ArticleLayout";

import { Eyebrow } from "@/components/system";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
export const Route = createFileRoute("/product-launch-from-0-1")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "A case study on building and shipping a product from zero to one.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <ArticleLayout cover>
        <DynamicIslandTOC visible />
        <ArticleHeader
          title="Product launch from 0–1"
          meta="Role"
          heroImage="/articles/product-launch-thumb.png"
          heroAlt="Product launch from 0–1"
        />

        <div className="prose prose-neutral max-w-2xl">
          <p>
            Building a product from scratch is one of the most challenging and rewarding experiences in
            product design and engineering. This case study explores the journey from initial concept to
            shipping a working product.
          </p>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-foreground">From zero to prototype</h2>
          <p>
            The first step is always understanding the problem deeply. Not just the surface-level problem,
            but the underlying needs, pain points, and opportunities that inform a better solution.
          </p>

          <p>
            This phase is about rapid experimentation. Build prototypes quickly, test assumptions early,
            and learn from failures fast. The goal isn't perfection—it's understanding.
          </p>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-foreground">Defining the one</h2>
          <p>
            "One" doesn't mean one feature. It means one coherent product with a clear point of view.
            Every feature should serve a single mission. Anything that doesn't belong gets cut.
          </p>

          <p>
            This requires discipline. It's tempting to add features, expand scope, and build for
            hypothetical futures. The best products do one thing exceptionally well.
          </p>

          <h2 className="mt-20 mb-4 text-2xl font-semibold text-foreground">Shipping as learning</h2>
          <p>
            Shipping isn't the end—it's the beginning. Real users will interact with your product in ways
            you never anticipated. Their feedback, their behavior, their struggles, all inform what comes
            next.
          </p>

          <p>
            The gap between what you think you built and what users actually experience is where the most
            important work happens. Stay close to that gap. Listen. Iterate. Ship again.
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Eyebrow as="div" className="mb-4">Related experiences</Eyebrow>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>Meetfood — Founding Product Designer (Mar 2021 – Dec 2022)</li>
          </ul>
        </div>
    </ArticleLayout>
  );
}
