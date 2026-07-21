import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Product launch from 0–1
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            A case study on building and shipping a product from zero to one.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Case study</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            Building a product from scratch is one of the most challenging and rewarding experiences in
            product design and engineering. This case study explores the journey from initial concept to
            shipping a working product.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · From zero to prototype</h2>
          <p>
            The first step is always understanding the problem deeply. Not just the surface-level problem,
            but the underlying needs, pain points, and opportunities that inform a better solution.
          </p>

          <p>
            This phase is about rapid experimentation. Build prototypes quickly, test assumptions early,
            and learn from failures fast. The goal isn't perfection—it's understanding.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Defining the one</h2>
          <p>
            "One" doesn't mean one feature. It means one coherent product with a clear point of view.
            Every feature should serve a single mission. Anything that doesn't belong gets cut.
          </p>

          <p>
            This requires discipline. It's tempting to add features, expand scope, and build for
            hypothetical futures. The best products do one thing exceptionally well.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · Shipping as learning</h2>
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

        <div className="mt-16 border-t border-neutral-200 pt-8">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Related experiences</div>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>Meetfood — Founding Product Designer (Mar 2021 – Dec 2022)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
