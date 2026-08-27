import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

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
  const navigate = useNavigate();
  const [activeDeliverable, setActiveDeliverable] = useState<"chatbot" | "dynamic" | "comparison">("chatbot");

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
      {/* Close Button */}
      <button
        onClick={() => navigate({ to: "/" })}
        className="fixed top-6 right-6 z-50 text-neutral-400 hover:text-neutral-900 transition-colors p-2"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <article className="mx-auto max-w-4xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">0→1 Product Launch</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["google-cloud"].title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>10 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-4xl">

          <h2 id={sectionId("Context")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Context</h2>

          <p>
            Back in 2023 Q3, Google Cloud had a static website for their product listing, and they wanted to integrate intelligence to support the browsing experience. I researched and designed an 0-1 prototype for startup consumers to differentiate between similar offerings on the platform. It was launched on Google Cloud in 2024.
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 my-6 text-sm">
            <p className="m-0"><strong>Duration:</strong> 4 months</p>
            <p className="m-0"><strong>Role:</strong> UX Designer, owned all research and the UX design of chatbot interaction.</p>
            <p className="m-0"><strong>Deliverables:</strong> Figma hi-fi prototypes, Research report</p>
            <p className="m-0"><strong>Collaboration:</strong> 1 senior designer, 1 UI designer, 1 engineer</p>
          </div>

          <h3 className="mt-12 mb-4 text-lg font-semibold">Embedding AI into the Product Discovery Experience for Startup Customers</h3>

          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. However, browsing is messy. Startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.
          </p>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 my-8">
            <pre className="text-xs leading-relaxed text-white overflow-x-auto" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{`The Discovery Problem:

STARTUP LEADER
      │
      ├─→ Goal: "Find the right cloud solution"
      │
      ├─→ Challenges:
      │   • 100+ products to choose from
      │   • Similar solutions with different pricing
      │   • Dense documentation
      │   • Multiple decision factors (cost, integration, capability)
      │
      └─→ Current experience: Search → Browse → Document → Compare → Still confused

Our Solution: Contextual AI guidance at each discovery stage
      │
      ├─→ Understand what they're building
      ├─→ Recommend relevant products
      ├─→ Explain differentiators
      └─→ Enable confident comparison`}</pre>
          </div>

          <h2 id={sectionId("The Deliverables")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">The Deliverables: 0→1 Prototypes</h2>

          {/* Deliverable Tabs */}
          <div className="my-8">
            <div className="flex gap-2 mb-6 border-b border-neutral-200">
              {deliverables.map((del) => (
                <button
                  key={del.id}
                  onClick={() => setActiveDeliverable(del.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeDeliverable === del.id
                      ? "border-neutral-900 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {del.title}
                </button>
              ))}
            </div>

            {/* Deliverable Content */}
            <div className="space-y-4">
              {deliverables.map((del) => (
                activeDeliverable === del.id && (
                  <div key={del.id} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {del.title} <span className="font-normal text-neutral-400">{del.subtitle}</span>
                      </h3>
                      <p className="text-neutral-600 mt-3">
                        {del.description}
                      </p>
                    </div>

                    <img
                      src={del.image}
                      alt={del.alt}
                      className="w-full rounded-2xl my-6 border border-neutral-200"
                    />
                  </div>
                )
              ))}
            </div>
          </div>

          <p>
            The broader takeaway was that assisted browsing works only when the system earns the right to intervene.
          </p>

          <h2 id={sectionId("Process")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Process</h2>

          <h3 className="mt-12 mb-4 text-lg font-semibold">1. Understand real browsing behavior</h3>

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


          <h3 className="mt-12 mb-4 text-lg font-semibold">2. Translate behavior into intent carefully</h3>

          <p>
            The product needed to infer enough to be useful without treating every action as a confident signal.
          </p>

          <p>
            That meant thinking about context, confidence, and what evidence should be required before the system acts.
          </p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">3. Design the explanation with the assistance</h3>

          <p>
            The AI's reasoning could not stay completely invisible. If the system surfaced a suggestion, the experience needed to help the user understand why it was relevant and what control they still had.
          </p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">4. Treat privacy and scale as design constraints</h3>

          <p>
            Assisted browsing touches highly contextual behavior, so privacy and security shaped the experience from the beginning.
          </p>

          <p>
            At scale, incremental rollout also becomes part of the design process: launch, observe, learn, and adjust rather than assuming the first behavior model is final.
          </p>

          <h2 id={sectionId("Impact & Outcomes")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Impact & Outcomes</h2>

          <p>
            <strong>Validated Hypothesis:</strong> Final prototype SUS score = <strong>86.3%</strong> (excellent usability). Confirmed that helping users differentiate between similar solutions is critical to improving adoption.
          </p>

          <p>
            <strong>Comprehensive Hand-offs:</strong> Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.
          </p>

        </div>

      </article>
    </div>
  );
}
