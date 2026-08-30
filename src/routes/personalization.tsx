import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { WhereNotToUseAI } from "./-sharedContent";
import { ArticleContent, ArticleHeading2, HighlightedText, OutcomeSection } from "@/components/ArticleContent";

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
      <article className="mx-auto max-w-4xl px-6 py-12">
        <ArticleHeader
          title={ARTICLE_META["personalization"].title}
          meta="Research"
          description="When I was asked to work on 'personalization,' I started by asking people around me this question: What makes you you?"
        />

        <DynamicIslandTOC />

        <ArticleContent>
          <ArticleHeading2 id={sectionId("So, what makes person a person?")}>So, what makes person a person?</ArticleHeading2>
          <p className="mt-4">
            My fav movie "Little Prince" says "what's important is the unseen." I spent time in conversations, asking what people value about their closest relationships, their creative work, their growth—the places where they feel most like themselves. The answers weren't about algorithms or efficiency. They were about presence, consistency, genuine interest, and the freedom to be imperfect.
          </p>
          
          <p>
            Most personalization work focuses on data—learning preferences, predicting behavior, optimizing for engagement. But that's not what makes something feel personal. What makes something personal is being seen, understood, and respected as a unique individual.
          </p>


          <OutcomeSection
            id={sectionId("Person & personalization")}
            title="Person & personalization"
            tabs={[
              {
                id: "for-me",
                title: "1. Learn For Me",
                children: (
                  <p>
                    AI should serve my specific goals and context, not generic templates. It understands what I'm trying to accomplish and adapts to my situation, not the reverse.
                  </p>
                )
              },
              {
                id: "with-me",
                title: "2. Stay With Me",
                children: (
                  <p>
                    AI should be a collaborator, not a replacement. I should feel like we're thinking together. The system asks me questions, validates my thinking, and invites my perspective. I have agency and a voice.
                  </p>
                )
              },
              {
                id: "as-me",
                title: "3. Act As Me",
                children: (
                  <p>
                    AI should recognize and respect who I am—my values, my boundaries, my inconsistencies. It doesn't try to optimize me or push me toward what it thinks is best. It accepts that being human means being complicated.
                  </p>
                )
              }
            ]}
          />

          <p>
            Out of those conversations, I've formed my own simplified version of a roadmap for the future of personalization: <HighlightedText>For Me, With Me, As Me.</HighlightedText>
          </p>

          <WhereNotToUseAI />

          <ArticleHeading2 id={sectionId("Humanity-centered Design")}>Humanity-centered Design</ArticleHeading2>
          <p>
            Yeah, it's a big word... but AI that only understands data will build systems that feel intrusive, prescriptive, or hollow. AI that understands humanity means it knows what we need, how we grow, what we struggle with, and respect our feelings.
          </p>

          <p className="mt-4">
            The future of AI isn't about knowing everything about you. It's about understanding something essential about what it means to be human, and building systems that respect and support that.
          </p>

        </ArticleContent>
      </article>
    </div>
  );
}
