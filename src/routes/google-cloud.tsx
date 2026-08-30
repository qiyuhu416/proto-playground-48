import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, HighlightedText, OutcomeSection, ProcessSection } from "@/components/ArticleContent";
import { ContextMetadata } from "@/components/ContextMetadata";

export const Route = createFileRoute("/google-cloud")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "0→1 GenAI project: Embedding AI into the product discovery experience for Google Cloud's startup customers.",
      },
    ],
  }),
  component: CaseStudyComponent,
});

function CaseStudyComponent() {
  const deliverables = [
    {
      id: "chatbot" as const,
      title: "The Chatbot",
      subtitle: "Contextual recommendation",
      description: "Personalized recommendations for product discovery. The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.",
      image: "/articles/google-cloud-chatbot.png",
      alt: "Google Cloud chatbot interface for product recommendations",
    },
    {
      id: "dynamic" as const,
      title: "Dynamic UI",
      subtitle: "Personalized experiences",
      description: "Adaptive interface for user journey stages. Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.",
      image: "/articles/google-cloud-dynamic.png",
      alt: "Dynamic UI adapting to user journey stages",
    },
    {
      id: "comparison" as const,
      title: "Comparison Tool",
      subtitle: "Faster decision making",
      description: "Side-by-side solution evaluation. The comparison tool enables users to evaluate solutions with \"add to compare\" selections. Making the comparison process explicit and transparent improves decision confidence.",
      image: "/articles/google-cloud-comparison.png",
      alt: "Side-by-side solution comparison tool",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <ArticleHeader
          title={ARTICLE_META["google-cloud"].title}
          meta="0→1 Product Launch"
          heroImage="/articles/google-cloud-hero.png"
          heroAlt="Google Cloud conversational AI interface"
        />

        <DynamicIslandTOC />

        <ArticleContent>
          <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>

          <p>
            Back in 2023 Q3, Google Cloud had a static website for their product listing, and they wanted to <HighlightedText>integrate intelligence to support the browsing experience</HighlightedText>. I researched and designed an 0-1 prototype for startup consumers to <HighlightedText>differentiate between similar offerings on the platform</HighlightedText>. It was launched on Google Cloud in 2024.
          </p>

          <ContextMetadata
            duration="4 months"
            role="UX Designer, owned all research and the UX design of chatbot interaction."
            deliverables="Figma hi-fi prototypes, Research report"
            collaboration="1 senior designer, 1 UI designer, 1 engineer"
          />

          <h3 className="mt-12 mb-4 text-lg font-semibold">Embedding AI into the Product Discovery Experience for Startup Customers</h3>

          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. However, <HighlightedText>browsing is messy</HighlightedText>. Startup leaders struggle to find the right solution without clear guidance. The challenge was to <HighlightedText>help customers differentiate between similar offerings</HighlightedText> and discover solutions aligned with their business objectives.
          </p>

          <OutcomeSection
            id={sectionId("The Deliverables")}
            title="The Deliverables: 0→1 Prototypes"
            tabs={deliverables.map((del) => ({
              id: del.id,
              title: del.title,
              subtitle: del.subtitle,
              children: (
                <>
                  <p className="text-neutral-600">
                    {del.description}
                  </p>
                  <img
                    src={del.image}
                    alt={del.alt}
                    className="w-full rounded-2xl my-6 border border-neutral-200"
                  />
                </>
              )
            }))}
          />

          <p>
            The broader takeaway was that assisted browsing works only when the system earns the right to intervene.
          </p>

          <ProcessSection
            id={sectionId("Process")}
            items={[
              {
                title: "1. Understand real browsing behavior",
                children: (
                  <>
                    <h4 className="mt-6 mb-6 text-base font-semibold">Research Methodology</h4>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
                        <h5 className="text-sm font-semibold text-neutral-900 mb-3">Semi-Structured Interviews</h5>
                        <p className="text-xs text-neutral-600 mb-2"><strong>N=8</strong> startup CTOs, CEOs, and Founders</p>
                        <p className="text-xs text-neutral-600">
                          Finding: Leaders evaluate solutions through business fit, integration compatibility, and cost predictability—not feature lists. Users also want to understand WHY an AI recommends something, not just receive the recommendation.
                        </p>
                      </div>

                      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
                        <h5 className="text-sm font-semibold text-neutral-900 mb-3">Competitive Analysis</h5>
                        <p className="text-xs text-neutral-600 mb-2">AWS & Azure UX patterns</p>
                        <p className="text-xs text-neutral-600">
                          Finding: Comparing similar products requires switching between multiple pages and reading dense documentation.
                        </p>
                      </div>

                      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
                        <h5 className="text-sm font-semibold text-neutral-900 mb-3">Literature Review</h5>
                        <p className="text-xs text-neutral-600 mb-2">Behavioral science research</p>
                        <p className="text-xs text-neutral-600">
                          Finding: Clear product positioning and social proof (customer testimonials, case studies) drive adoption.
                        </p>
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: "2. Translate behavior into intent carefully",
                children: (
                  <>
                    <p>
                      The product needed to infer enough to be useful without treating every action as a confident signal.
                    </p>

                    <p>
                      That meant thinking about context, confidence, and what evidence should be required before the system acts.
                    </p>
                  </>
                )
              },
              {
                title: "3. Design the explanation with the assistance",
                children: (
                  <p>
                    The AI's reasoning could not stay completely invisible. If the system surfaced a suggestion, the experience needed to help the user understand why it was relevant and what control they still had.
                  </p>
                )
              },
              {
                title: "4. Treat privacy and scale as design constraints",
                children: (
                  <>
                    <p>
                      Assisted browsing touches highly contextual behavior, so privacy and security shaped the experience from the beginning.
                    </p>

                    <p>
                      At scale, incremental rollout also becomes part of the design process: launch, observe, learn, and adjust rather than assuming the first behavior model is final.
                    </p>
                  </>
                )
              }
            ]}
          />

          <h2 id={sectionId("Impact & Outcomes")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Impact & Outcomes</h2>

          <p>
            <strong>Validated Hypothesis:</strong> Final prototype SUS score = <strong>86.3%</strong> (excellent usability). Confirmed that helping users differentiate between similar solutions is critical to improving adoption.
          </p>

          <p>
            <strong>Comprehensive Hand-offs:</strong> Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.
          </p>

        </ArticleContent>

      </article>
    </div>
  );
}
