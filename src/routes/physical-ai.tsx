import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, ArticleHeading3, HighlightedText, OutcomeSection, ProcessSection } from "@/components/ArticleContent";

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
  const [activeOutcome, setActiveOutcome] = useState<"storyboard" | "hardware" | "flow">("storyboard");

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <ArticleHeader
          title={ARTICLE_META["physical-ai"].title}
          meta="Understanding Behavioral Intent"
          heroImage="/articles/physical-ai-thumb.png"
          heroAlt="Physical AI for service design"
        />

        <DynamicIslandTOC />

        <ArticleContent>

          <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>

          <p>
            This was a fast-paced, experimental concept design project in partnership with Strange VC and two clients:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li><strong>Archetype AI</strong>, focused on physical AI</li>
            <li><strong>Roche</strong>, in healthcare</li>
          </ol>

          <p>
            Archetype AI came with the request to map its multimodal AI capabilities to Roche's healthcare use cases.
          </p>

          <p>
            The team was small—an engineer, a PM, and me. My role was to conduct the research, including creating the service blueprint and analyzing <HighlightedText>when to use AI and when <em>not</em> to use AI</HighlightedText>. The three of us collectively shared ideas and created the final artifacts.
          </p>

          <p>
            The problems we wanted to solve were:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Errors in the hospital-to-lab experience, with the goal of minimizing errors and reducing waste.</li>
            <li>How to be technology-driven but not tech-centered: finding the right intervention point to maximize the model's capabilities without forcing the technology into the experience.</li>
          </ol>

          <h2 id={sectionId("Outcome")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Outcome</h2>

          {/* Tab Navigation */}
          <div className="my-8">
            <div className="flex gap-2 mb-6 border-b border-neutral-200">
              {[
                { id: "storyboard" as const, label: "Storyboard" },
                { id: "hardware" as const, label: "Hardware Prototype" },
                { id: "flow" as const, label: "User Flow" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOutcome(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeOutcome === tab.id
                      ? "border-neutral-900 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeOutcome === "storyboard" && (
                <div className="space-y-4">
                  <p>
                    Storyboards helped stakeholders imagine the role of the system in context. The focus was less on a screen and more on <HighlightedText>when, where, and why AI should exist in the status quo.</HighlightedText>
                  </p>
                  <img
                    src="/articles/physical-ai-hero.png"
                    alt="Physical AI healthcare interaction design"
                    className="w-full rounded-2xl my-6 border border-neutral-200"
                  />
                </div>
              )}

              {activeOutcome === "hardware" && (
                <div className="space-y-4">
                  <img
                    src="/articles/physical-ai-23.png"
                    alt="Hardware artifacts: base station, tracker base, and tracker module"
                    className="w-full rounded-2xl my-6 border border-neutral-200"
                  />
                  <p className="text-sm text-neutral-500 italic">
                    Three physical components: The base station (computer vision, laser scanner, thermal monitoring, UI). The tracker base (sensing vial storage). The tracker module (thermometer, GPS, IMU for monitoring samples in transit).
                  </p>
                  <p>
                    The hardware elements are intentionally flexible and light-touch for users. The base station sits on a phlebotomist's desk. The tracker base monitors vial storage. The tracker module deploys into transport containers. All designed to be invisible to the user—present only when needed.
                  </p>
                </div>
              )}

              {activeOutcome === "flow" && (
                <div className="space-y-4">
                  <img
                    src="/articles/physical-ai-24.png"
                    alt="Proposed user flow with 8 interaction steps"
                    className="w-full rounded-2xl my-6 border border-neutral-200"
                  />
                </div>
              )}
            </div>
          </div>


          <ProcessSection
            id={sectionId("Process")}
            items={[
              {
                title: "1. Understand the problem",
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
                title: "2. Explore whether AI is really needed",
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
                          <li><strong>Confirmation:</strong> Compare label info & patient ID</li>
                          <li><strong>Selection:</strong> Evaluate vial-label match, find correct filling status</li>
                          <li><strong>Extraction:</strong> Monitor tube filling status, detect incorrect amount</li>
                          <li><strong>Storage:</strong> Generate summary, identify storage location, notice unusual sample changes</li>
                        </ul>
                      </div>

                      <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                        <h4 className="text-base font-semibold text-neutral-900 mb-4">Long-term: AI as Performer</h4>
                        <ul className="space-y-3 text-sm text-neutral-700">
                          <li><strong>Automation:</strong> Detect face ID, select correct vial, extract to right amount, store based on instruction</li>
                          <li><strong>Integration:</strong> Act on human feedback, refine based on patterns</li>
                          <li><strong>Reliability:</strong> Reduce human error to near-zero through consistent, tireless execution</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: "3. Map tech capability to the service blueprint",
                children: (
                  <>
                    <p>
                      The previous analysis helped me reframe the question into: <strong>where does AI create enough efficiency to justify the new uncertainty and coordination cost it introduces?</strong>
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
                title: "4. Understand the limitations",
                children: (
                  <>
                    <p>
                      Moving beyond this specific use case, let's think about the bigger service system. AI will "definitely" make errors, and in a service system, someone has to detect it, correct it, communicate the correction, and deal with whatever downstream impact it creates.
                    </p>

                    <p>
                      So there are questions I was thinking about but didn't have an answer to yet:
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
                      <li><strong>Who is responsible for error correction?</strong></li>
                      <li><strong>How does one AI error affect the larger service system?</strong></li>
                      <li><strong>Does AI remove work, or move the work to someone else?</strong></li>
                      <li><strong>Where should a human stay in the loop even if the model becomes more capable?</strong></li>
                    </ul>
                  </>
                )
              }
            ]}
          />

        </ArticleContent>

      </article>
    </div>
  );
}
