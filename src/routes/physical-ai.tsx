import { createFileRoute } from "@tanstack/react-router";
import { ArticleHeader } from "./-ArticleHeader";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, HighlightedText, OutcomeSection, ProcessSection, ContextBox, Bold } from "@/components/ArticleContent";

export const Route = createFileRoute("/physical-ai")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Designing AI beyond screens: embedding intelligence in physical systems to reduce human error in healthcare.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <ArticleLayout>
      <ArticleHeader
          title={ARTICLE_META["physical-ai"].title}
          meta="Understanding Behavioral Intent"
          heroImage="/articles/physical-ai-thumb.png"
          heroAlt="Physical AI for service design"
        />

        <ArticleContent>

          <ContextBox
            summary={
              <>
                <p>This was a fast-paced, experimental concept design project in partnership with Strange VC and two clients:</p>
                <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
                  <li>Archetype AI, focused on physical AI</li>
                  <li>Roche, in healthcare</li>
                </ol>
                <p>Archetype AI came with the request to map its multimodal AI capabilities to Roche's healthcare use cases.</p>
                <p>The team was small—an engineer, a PM, and me. My role was to conduct the research, including creating the service blueprint and analyzing <HighlightedText>when to use AI and when <em>not</em> to use AI</HighlightedText>. The three of us collectively shared ideas and created the final artifacts.</p>
              </>
            }
            role="UX Researcher, conducted research and created service blueprint"
            team="1 engineer, 1 PM, 1 designer"
          />

          <ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>
          <p>
            The problems we wanted to solve were:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Errors in the hospital-to-lab experience, with the goal of minimizing errors and reducing waste.</li>
            <li>How to be technology-driven but not tech-centered: finding the right intervention point to maximize the model's capabilities without forcing the technology into the experience.</li>
          </ol>


          <OutcomeSection
            id={sectionId("Outcome")}
            variant="gallery"
            aspectRatio={2.6}
            tabs={[
              {
                id: "storyboard",
                title: "Storyboard",
                subtitle: "When, where, and why AI should exist",
                description: "Storyboards helped stakeholders imagine the role of the system in context. The focus was less on a screen and more on when, where, and why AI should exist in the status quo.",
                src: "/articles/physical-ai-hero.png",
                alt: "Physical AI healthcare interaction design",
                children: null,
              },
              {
                id: "hardware",
                title: "The Hardware Prototype",
                subtitle: "Three physical components",
                description: "Base station (computer vision, laser scanner, thermal monitoring, UI). Tracker base (sensing vial storage). Tracker module (thermometer, GPS, IMU for monitoring samples in transit). All designed to be invisible to the user—present only when needed.",
                src: "/articles/physical-ai-23.png",
                alt: "Hardware artifacts: base station, tracker base, and tracker module",
                children: null,
              },
              {
                id: "flow",
                title: "The Flow",
                subtitle: "Proposed user flow",
                description: "Eight interaction steps designed to guide users through the diagnostic process with minimal friction and maximum clarity.",
                src: "/articles/physical-ai-24.png",
                alt: "Proposed user flow with 8 interaction steps",
                children: null,
              }
            ]}
          />


          <ProcessSection
            id={sectionId("Process")}
            items={[
              {
                title: "Understand the problem",
                shortLabel: "Understand",
                children: (
                  <>
                    <p>
                      In diagnostic testing, sample collection is critical. A single error cascades through the entire lab process—false results, wasted samples, delayed diagnoses.
                    </p>

                    <img
                      src="/articles/physical-ai-17.png"
                      alt="Diagnostic testing phases and error opportunities"
                      className="w-full rounded-2xl my-8 border border-neutral-200"
                    />

                    <p className="text-sm text-neutral-500 italic">
                      Three phases of the diagnostic journey: pre-analytical (collection), analytical (testing), post-analytical (reporting). The pre-analytical phase is where most errors occur.
                    </p>

                    <img
                      src="/articles/physical-ai-18.png"
                      alt="Current flow showing errors at each step"
                      className="w-full rounded-2xl my-8 border border-neutral-200"
                    />

                    <p className="text-sm text-neutral-500 italic">
                      Phlebotomists and patients navigate a series of critical checkpoints. Each is an opportunity for error:
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
                      <li>Wrong patient info (9%)</li>
                      <li>Order misinterpretation (1%)</li>
                      <li>Incorrect container (8%)</li>
                      <li>Labeling mismatches (9%)</li>
                      <li>Tube filling errors (13%)</li>
                      <li>Storage failures (7%)</li>
                    </ul>
                  </>
                )
              },
              {
                title: "Explore whether AI is really needed",
                shortLabel: "Explore",
                children: (
                  <>
                    <p>
                      AI <em>could</em> be a solution, but it might not always be the best solution.
                    </p>

                    <p>
                      Compare with the current workflow which relies entirely on human attention and memory. AI excels at:
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
                      <li>Tracking multiple variables simultaneously</li>
                      <li>Remembering complex sequences</li>
                      <li>Validating against large datasets</li>
                      <li>Communicating information clearly</li>
                    </ul>

                    <p>
                      AI capability will grow for sure, so I explored the preset & future use cases. In the short-term, it assists the phlebotomist (catching errors before they happen). Long-term, it becomes a performer (autonomous quality verification and execution).
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                        <h4 className="text-base font-semibold text-neutral-900 mb-4">Short-term: AI as Assistant</h4>
                        <ul className="space-y-3 text-sm text-neutral-700">
                          <li><Bold>Confirmation:</Bold> Compare label info & patient ID</li>
                          <li><Bold>Selection:</Bold> Evaluate vial-label match, find correct filling status</li>
                          <li><Bold>Extraction:</Bold> Monitor tube filling status, detect incorrect amount</li>
                          <li><Bold>Storage:</Bold> Generate summary, identify storage location, notice unusual sample changes</li>
                        </ul>
                      </div>

                      <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                        <h4 className="text-base font-semibold text-neutral-900 mb-4">Long-term: AI as Performer</h4>
                        <ul className="space-y-3 text-sm text-neutral-700">
                          <li><Bold>Automation:</Bold> Detect face ID, select correct vial, extract to right amount, store based on instruction</li>
                          <li><Bold>Integration:</Bold> Act on human feedback, refine based on patterns</li>
                          <li><Bold>Reliability:</Bold> Reduce human error to near-zero through consistent, tireless execution</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: "Map tech capability to the service blueprint",
                shortLabel: "Map",
                children: (
                  <>
                    <p>
                      The previous analysis helped me reframe the question into: <HighlightedText>where does AI create enough efficiency to justify the new uncertainty and coordination cost it introduces?</HighlightedText>
                    </p>

                    <p>
                      Therefore, I created the service blueprint to map out the user flow and corresponding AI intervention points.
                    </p>

                    <img
                      src="/articles/physical-ai-21.png"
                      alt="AI capability mapping to errors - short term and long term vision"
                      className="w-full rounded-2xl my-8 border border-neutral-200"
                    />
                  </>
                )
              },
              {
                title: "Understand the limitations",
                shortLabel: "Limitations",
                children: (
                  <>
                    <p>
                      Moving beyond this specific use case, let's think about the bigger service system. AI will "definitely" make errors, and in a service system, someone has to detect it, correct it, communicate the correction, and deal with whatever downstream impact it creates.
                    </p>

                    <p>
                      So there are questions I was thinking about but didn't have an answer to yet:
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
                      <li><HighlightedText>Who is responsible for error correction?</HighlightedText></li>
                      <li><HighlightedText>How does one AI error affect the larger service system?</HighlightedText></li>
                      <li><HighlightedText>Does AI remove work, or move the work to someone else?</HighlightedText></li>
                      <li><HighlightedText>Where should a human stay in the loop even if the model becomes more capable?</HighlightedText></li>
                    </ul>
                  </>
                )
              }
            ]}
          />

      </ArticleContent>
    </ArticleLayout>
  );
}
