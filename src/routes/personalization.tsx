import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { WhereNotToUseAI } from "./-sharedContent";
import { HighlightedText } from "@/components/ArticleContent";

export const Route = createFileRoute("/personalization")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
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
        <ArticleHeader
          title={ARTICLE_META["personalization"].title}
          meta="Research"
          description="When I was asked to work on 'personalization,' I started by asking people around me this question: What makes you you?"
        />

        <div className="prose prose-neutral max-w-2xl">
          <DynamicIslandTOC />

          <h2 id={sectionId("So, what makes person a person?")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"So, what makes person a person?"}</h2>
          <p className="mt-4">
            My fav movie "Little Prince" says "what's important is the unseen." I spent time in conversations, asking what people value about their closest relationships, their creative work, their growth—the places where they feel most like themselves. The answers weren't about algorithms or efficiency. They were about presence, consistency, genuine interest, and the freedom to be imperfect.
          </p>
          
          <p>
            Most personalization work focuses on data—learning preferences, predicting behavior, optimizing for engagement. But that's not what makes something feel personal. What makes something personal is being seen, understood, and respected as a unique individual.
          </p>


          <h2 id={sectionId("Person & personalization")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Person & personalization"}</h2>
          <p>
            Out of those conversations, I've also formed my own simplified version of roadmap for the future of personalization: <HighlightedText>For Me, With Me, As Me.</HighlightedText>
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">1. Learn For Me </h3>
          <p>
            AI should serve my specific goals and context, not generic templates. It understands what I'm trying to accomplish and adapts to my situation, not the reverse.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">2. Stay With Me</h3>
          <p>
            AI should be a collaborator, not a replacement. I should feel like we're thinking together. The system asks me questions, validates my thinking, and invites my perspective. I have agency and a voice.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-3">3. Act As Me</h3>
          <p>
            AI should recognize and respect who I am—my values, my boundaries, my inconsistencies. It doesn't try to optimize me or push me toward what it thinks is best. It accepts that being human means being complicated.
          </p>

          <WhereNotToUseAI />

          <h2 id={sectionId("Humanity-centered Design")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Humanity-centered Design"}</h2>
          <p>
            Yeah, it's a big word... but AI that only understands data will build systems that feel intrusive, prescriptive, or hollow. AI that understands humanity means it knows what we need, how we grow, what we struggle with, and respect our feelings.
          </p>

          <p className="mt-4">
            The future of AI isn't about knowing everything about you. It's about understanding something essential about what it means to be human, and building systems that respect and support that.
          </p>
        </div>
      </article>
    </div>
  );
}
