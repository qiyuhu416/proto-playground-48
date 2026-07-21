import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";
import { WhereNotToUseAI } from "./sharedContent";

export const Route = createFileRoute("/personalization")({
  head: () => ({
    meta: [
      { title: "Personalization" },
      {
        name: "description",
        content: "Understanding what makes humans human—exploring the future of AI through personalization.",
      },
    ],
  }),
  component: PersonalizationComponent,
});

function PersonalizationComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["personalization"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Understanding what makes humans human—exploring the future of AI through the lens of personalization.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · AI Philosophy</span>
            <span className="text-neutral-300">·</span>
            <span>NDA Project</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <TableOfContents />

          <h2 id="the-starting-question" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Starting Question</h2>
          <p>
            This project is under NDA, but the core theme I want to share is this: <strong>the future of AI should stem from how we understand human beings.</strong>
          </p>

          <p className="mt-4">
            When I was asked to work on "personalization," I didn't start by designing features. I started by asking people around me a deceptively simple question: <strong>"What makes human a human?"</strong>
          </p>

          <h2 id="beyond-features" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Beyond Features</h2>
          <p>
            Most personalization work focuses on data—learning preferences, predicting behavior, optimizing for engagement. But that's not what makes something feel personal. What makes something personal is being seen, understood, and respected as a unique individual.
          </p>

          <p className="mt-4">
            I spent time in conversations, asking what people value about their closest relationships, their creative work, their growth—the places where they feel most like themselves. The answers weren't about algorithms or efficiency. They were about presence, consistency, genuine interest, and the freedom to be imperfect.
          </p>

          <h2 id="for-me-with-me-as-me" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">For Me, With Me, As Me</h2>
          <p>
            Out of those conversations, I helped plan the roadmap for the future of AI by proposing a framework for personalization: <strong>For Me, With Me, As Me.</strong>
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">For Me</h3>
          <p>
            AI should serve my specific goals and context, not generic templates. It understands what I'm trying to accomplish and adapts to my situation, not the reverse.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">With Me</h3>
          <p>
            AI should be a collaborator, not a replacement. I should feel like we're thinking together. The system asks me questions, validates my thinking, and invites my perspective. I have agency and a voice.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">As Me</h3>
          <p>
            AI should recognize and respect who I am—my values, my boundaries, my inconsistencies. It doesn't try to optimize me or push me toward what it thinks is best. It accepts that being human means being complicated.
          </p>

          <WhereNotToUseAI />

          <h2 id="why-this-matters" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Why This Matters</h2>
          <p>
            AI that only understands data will build systems that feel intrusive, prescriptive, or hollow. AI that understands humanity—what we need, how we grow, what we struggle with—can be genuinely helpful.
          </p>

          <p className="mt-4">
            The future of AI isn't about knowing everything about you. It's about understanding something essential about what it means to be human, and building systems that respect and support that.
          </p>
        </div>
      </article>
    </div>
  );
}
