import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, HighlightedText, OutcomeSection, ProcessSection, ContextBox } from "@/components/ArticleContent";

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
  const deliverableTabs = [
    {
      id: "chatbot",
      title: "The Chatbot",
      subtitle: "Contextual recommendation",
      description: "Personalized recommendations for product discovery. The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.",
      src: "/articles/google-cloud-chatbot.png",
      alt: "Google Cloud chatbot interface for product recommendations",
      children: null,
    },
    {
      id: "dynamic",
      title: "Dynamic UI",
      subtitle: "Personalized experiences",
      description: "Adaptive interface for user journey stages. Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.",
      src: "/articles/google-cloud-dynamic.png",
      alt: "Dynamic UI adapting to user journey stages",
      children: null,
    },
    {
      id: "comparison",
      title: "Comparison Tool",
      subtitle: "Faster decision making",
      description: "Side-by-side solution evaluation. The comparison tool enables users to evaluate solutions with \"add to compare\" selections. Making the comparison process explicit and transparent improves decision confidence.",
      src: "/articles/google-cloud-comparison.png",
      alt: "Side-by-side solution comparison tool",
      children: null,
    },
  ];

  return (
    <ArticleLayout>
      <ArticleHeader
          title={ARTICLE_META["google-cloud"].title}
          meta="0→1 Product Launch"
          heroImage="/articles/google-cloud-hero.png"
          heroAlt="Google Cloud conversational AI interface"
        />

        <ArticleContent>

          <ContextBox
            summary={
              <>
                <p>Back in 2023 Q3, Google Cloud had a static website for their product listing, and they wanted to integrate intelligence to support the browsing experience. I researched and designed an 0-1 prototype for startup consumers to differentiate between similar offerings on the platform. It was launched on Google Cloud in 2024.</p>
              </>
            }
            role="UX Designer, owned all research and the UX design of chatbot interaction"
            duration="4 months"
            team="1 senior designer, 1 UI designer, 1 engineer"
          />

          <ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>
          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. However, <HighlightedText>browsing is messy</HighlightedText>. Startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.
          </p>

          <DynamicIslandTOC />

          <OutcomeSection
            id={sectionId("The Deliverables")}
            title="The Deliverables: 0→1 Prototypes"
            tabs={deliverableTabs}
            variant="tabs"
            aspectRatio={1.5}
          />

          <p className="mt-12">
            The broader takeaway was that assisted browsing works only when the system earns the right to intervene.
          </p>

          <ProcessSection
            id={sectionId("Process")}
            variant="accordion"
            items={[
              {
                title: "Understand real browsing behavior",
                shortLabel: "Understand",
                children: (
                  <>
                    <h4 className="mt-6 mb-6 text-base font-semibold">Research Methodology</h4>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
                        <h5 className="text-sm font-semibold text-neutral-900 mb-3">Semi-Structured Interviews</h5>
                        <p className="text-xs text-neutral-600 mb-2">N=8 startup CTOs, CEOs, and Founders</p>
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
                title: "Translate behavior into intent carefully",
                shortLabel: "Translate",
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
                title: "Design the explanation with the assistance",
                shortLabel: "Design",
                children: (
                  <p>
                    The AI's reasoning could not stay completely invisible. If the system surfaced a suggestion, the experience needed to help the user understand why it was relevant and what control they still had.
                  </p>
                )
              },
              {
                title: "Treat privacy and scale as design constraints",
                shortLabel: "Privacy & Scale",
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
            Validated Hypothesis: Final prototype SUS score = <HighlightedText>86.3%</HighlightedText> (excellent usability). Confirmed that <HighlightedText>helping users differentiate between similar solutions is critical to improving adoption.</HighlightedText>
          </p>

          <p>
            Comprehensive Hand-offs: Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.
          </p>

      </ArticleContent>
    </ArticleLayout>
  );
}
