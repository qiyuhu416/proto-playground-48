import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <div className="min-h-screen bg-background text-neutral-900">
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

          <h3 className="mt-8 mb-3 text-lg font-semibold">Embedding AI into the Product Discovery Experience for Startup Customers</h3>

          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. However, browsing is messy. Startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.
          </p>

          <h2 id={sectionId("The Deliverables")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">The Deliverables: 0→1 Prototypes</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">The Chatbot for contextual recommendation</h3>

          <p>
            Personalized recommendations for product discovery. The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">Dynamic UI for personalized experiences</h3>

          <p>
            Adaptive interface for user journey stages. Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">Comparison Tool for faster decision making</h3>

          <p>
            Side-by-side solution evaluation. The comparison tool enables users to evaluate solutions with "add to compare" selections. Making the comparison process explicit and transparent improves decision confidence.
          </p>

          <p>
            The broader takeaway was that assisted browsing works only when the system earns the right to intervene.
          </p>

          <h2 id={sectionId("Process")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Process</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">1. Understand real browsing behavior</h3>

          <h4 className="mt-6 mb-2 text-base font-semibold">Research Methodology</h4>

          <h5 className="mt-4 mb-2 text-sm font-semibold text-neutral-700">Semi-Structured Interviews (N=8)</h5>
          <p className="text-neutral-700">
            Recruited startup CTOs, CEOs, and Founders as key decision-makers. In-depth interviews revealed mental models and decision-making processes that surveys couldn't capture.
          </p>

          <h5 className="mt-4 mb-2 text-sm font-semibold text-neutral-700">Competitive Analysis</h5>
          <p className="text-neutral-700">
            Analyzed AWS and Azure UX patterns for product discovery. Identified where Google Cloud could differentiate through AI-powered recommendations.
          </p>

          <h5 className="mt-4 mb-2 text-sm font-semibold text-neutral-700">Literature Review</h5>
          <p className="text-neutral-700">
            Researched decision-making psychology, online purchasing behavior, and AI trust mechanisms. Grounded design decisions in behavioral science.
          </p>

          <h4 className="mt-6 mb-2 text-base font-semibold">Key Insights</h4>

          <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
            <li><strong>Mental models:</strong> Leaders evaluate solutions through business fit, integration compatibility, and cost predictability—not feature lists</li>
            <li><strong>Discovery friction:</strong> Comparing similar products requires switching between multiple pages and reading dense documentation</li>
            <li><strong>Trust mechanisms:</strong> Clear product positioning and social proof (customer testimonials, case studies) drive adoption</li>
            <li><strong>AI transparency:</strong> Users want to understand WHY an AI recommends something, not just receive the recommendation</li>
          </ul>

          <p>
            We looked at how people actually move through tasks rather than assuming a clean search → result → action flow.
          </p>

          <p>
            Real behavior contains backtracking, hesitation, context switching, and signals that are ambiguous on their own.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">2. Translate behavior into intent carefully</h3>

          <p>
            The product needed to infer enough to be useful without treating every action as a confident signal.
          </p>

          <p>
            That meant thinking about context, confidence, and what evidence should be required before the system acts.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">3. Design the explanation with the assistance</h3>

          <p>
            The AI's reasoning could not stay completely invisible. If the system surfaced a suggestion, the experience needed to help the user understand why it was relevant and what control they still had.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">4. Treat privacy and scale as design constraints</h3>

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
