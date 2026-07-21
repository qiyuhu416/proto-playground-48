import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/google-cloud")({
  head: () => ({
    meta: [
      { title: "Google Cloud - Conversational AI" },
      {
        name: "description",
        content: "Embedding AI into the product discovery experience for startup customers.",
      },
    ],
  }),
  component: ProjectComponent,
});

function ProjectComponent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Project</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["google-cloud"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Embedding AI into the Product Discovery Experience for Startup Customers
          </p>

          <div className="mt-8 flex flex-wrap gap-2 mb-8">
            <span className="text-xs font-medium px-3 py-1 bg-neutral-100 rounded-full">GenAI</span>
            <span className="text-xs font-medium px-3 py-1 bg-neutral-100 rounded-full">0→1</span>
            <span className="text-xs font-medium px-3 py-1 bg-neutral-100 rounded-full">Web</span>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Duration</h3>
              <p className="text-neutral-900 font-medium">4 months</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Deliverable</h3>
              <p className="text-neutral-900 font-medium">Figma hi-fi prototypes<br/>Research report</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Role</h3>
              <p className="text-neutral-900 font-medium">UX Designer</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Team</h3>
              <p className="text-neutral-900 font-medium">1 senior designer@Google<br/>1 researcher, 1 designer</p>
            </div>
          </div>
        </div>

        <img
          src="/articles/google-cloud-hero.png"
          alt="Google Cloud product discovery project"
          className="w-full rounded-2xl mb-16 border-4 border-neutral-900"
        />

        <div className="prose prose-neutral max-w-4xl">
          <h2 id="the-challenge" className="mt-16 mb-4 text-2xl font-semibold text-neutral-900">The Challenge</h2>
          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. Startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.
          </p>
          <img
            src="/articles/google-cloud-industry-solutions.png"
            alt="Google Cloud Industry Solutions page showing the breadth of products across sectors"
            className="w-full rounded-xl my-6 border border-neutral-200"
          />

          <TableOfContents />

          <h2 id="problem-statement" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Problem Statement</h2>
          <p>
            <strong>"When startup consumers search for solutions that align with their business objectives, how might Google Cloud assist them in differentiating between similar offerings on the platform?"</strong>
          </p>

          <h2 id="research-questions" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Research Questions</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-8">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Understand</h4>
              <p className="text-sm text-neutral-600">What mental models do startup leaders use when evaluating cloud solutions to purchase?</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Identify</h4>
              <p className="text-sm text-neutral-600">What are the UX gaps between Google and competitors in supporting cloud solution discovery?</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Compare</h4>
              <p className="text-sm text-neutral-600">What cognitive biases and trust mechanisms influence digital product purchase decisions?</p>
            </div>
          </div>

          <h2 id="the-deliverables-0-1-prototypes" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Deliverables: 0→1 Prototypes</h2>
          <p>Back in 2023 Q3, Google Cloud didn't have a chatbot—everything in this project was new.</p>

          <div className="mt-8 border border-neutral-200 rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-neutral-200 bg-neutral-50">
              {[
                { name: "The Chatbot", desc: "Personalized recommendations for product discovery" },
                { name: "Dynamic UI", desc: "Adaptive interface for user journey stages" },
                { name: "Comparison Tool", desc: "Side-by-side solution evaluation" },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 px-4 py-3 text-left text-sm font-medium border-b-2 transition-colors ${
                    activeTab === idx
                      ? "bg-white border-b-neutral-900 border-neutral-900"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <div className="font-semibold">{tab.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{tab.desc}</div>
                </button>
              ))}
            </div>
            <div className="p-6 bg-white">
              {activeTab === 0 && (
                <>
                  <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden bg-neutral-50 mb-4">
                    <img src="/articles/google-cloud-chatbot.png" alt="Chatbot prototype" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-neutral-600">
                    The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.
                  </p>
                </>
              )}
              {activeTab === 1 && (
                <>
                  <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden bg-neutral-50 mb-4">
                    <img src="/articles/google-cloud-dynamic.png" alt="Dynamic UI prototype" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-neutral-600">
                    Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.
                  </p>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden bg-neutral-50 mb-4">
                    <img src="/articles/google-cloud-comparison.png" alt="Comparison tool prototype" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-neutral-600">
                    Side-by-side comparison tool enables users to evaluate solutions with "add to compare" selections. Making the comparison process explicit and transparent improves decision confidence.
                  </p>
                </>
              )}
            </div>
          </div>

          <h2 id="research-methodology" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Research Methodology</h2>
          <div className="space-y-6 mt-6 mb-8">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">Semi-Structured Interviews (N=8)</h4>
              <p className="text-neutral-600 text-sm">
                Recruited startup CTOs, CEOs, and Founders as key decision-makers. In-depth interviews revealed mental models and decision-making processes that surveys couldn't capture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">Competitive Analysis</h4>
              <p className="text-neutral-600 text-sm">
                Analyzed AWS and Azure UX patterns for product discovery. Identified where Google Cloud could differentiate through AI-powered recommendations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">Literature Review</h4>
              <p className="text-neutral-600 text-sm">
                Researched decision-making psychology, online purchasing behavior, and AI trust mechanisms. Grounded design decisions in behavioral science.
              </p>
            </div>
          </div>

          <h2 id="key-insights" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Insights</h2>
          <ul className="list-disc pl-6 space-y-3 text-neutral-600">
            <li>Mental models: Leaders evaluate solutions through business fit, integration compatibility, and cost predictability—not feature lists</li>
            <li>Discovery friction: Comparing similar products requires switching between multiple pages and reading dense documentation</li>
            <li>Trust mechanisms: Clear product positioning and social proof (customer testimonials, case studies) drive adoption</li>
            <li>AI transparency: Users want to understand WHY an AI recommends something, not just receive the recommendation</li>
          </ul>

          <h2 id="impact-outcomes" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Impact & Outcomes</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-8">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Validated Hypothesis</h4>
              <p className="text-sm text-neutral-600">Final prototype SUS score = <strong>86.3%</strong> (excellent usability). Confirmed that helping users differentiate between similar solutions is critical to improving adoption.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Comprehensive Hand-offs</h4>
              <p className="text-sm text-neutral-600">Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-semibold mb-2 text-neutral-900">Driving Implementation</h4>
              <p className="text-sm text-neutral-600">6 Google executives expressed strong interest across 2 presentation rounds. Chatbot feature is now being implemented on the Google Cloud website.</p>
            </div>
          </div>

          <h2 id="key-learnings" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Learnings</h2>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600 text-sm">
            <li>When designing AI features, transparency matters more than perfection</li>
            <li>Real user interviews with decision-makers reveal constraints that analytics never show</li>
            <li>Prototypes are powerful tools for stakeholder alignment and executive buy-in</li>
            <li>Tight timelines with small, focused teams can produce research-driven, high-quality prototypes</li>
          </ul>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              For detailed prototypes, interactive demos, and full research documentation, visit the{" "}
              <a href="https://www.key-you-who.com/projects/google-cloud" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                complete project page
              </a>.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
