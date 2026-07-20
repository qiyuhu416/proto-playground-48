import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/google-cloud")({
  head: () => ({
    meta: [
      { title: "Google Cloud - Conversational AI" },
      {
        name: "description",
        content: "Designing conversational interfaces for cloud services and AI-powered workflows.",
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
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Project</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Google Cloud for startup
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
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
              <p className="text-neutral-900">4 months</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Deliverable</h3>
              <p className="text-neutral-900">3 hi-fi prototypes<br/>Research report</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Role</h3>
              <p className="text-neutral-900">Lead UX Researcher &<br/>UX designer</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Team</h3>
              <p className="text-neutral-900">1 Senior Designer @Google<br/>4 Student Researchers</p>
            </div>
          </div>
        </div>

        <div className="prose prose-neutral max-w-4xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Challenge</h2>
          <p>
            Google Cloud offers 100+ products with different pricing, integrations, and capabilities. Users struggle to find the right solution without clear guidance. The challenge was to help startup customers differentiate between similar offerings and discover solutions aligned with their business objectives.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Scope</h2>
          <p>
            <strong>When startup consumers search for solutions that align with their business objectives, how might Google Cloud assist them in differentiating between similar offerings on the platform?</strong>
          </p>

          <div className="mt-12 mb-8">
            <h3 className="text-lg font-semibold mb-4">Research Questions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h4 className="font-semibold mb-2">Understand</h4>
                <p className="text-sm">What mental models do startup leaders use when evaluating cloud solutions?</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h4 className="font-semibold mb-2">Identify</h4>
                <p className="text-sm">What are the UX gaps between Google and competitors in supporting discovery?</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <h4 className="font-semibold mb-2">Compare</h4>
                <p className="text-sm">What cognitive biases and trust mechanisms influence digital product purchase?</p>
              </div>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Deliverables</h2>
          <p>Back in 2023 Q3, Google Cloud didn't have a chatbot—everything in this project was 0→1 innovation.</p>

          <div className="mt-6 border border-neutral-200 rounded-lg overflow-hidden">
            <div className="flex border-b border-neutral-200 bg-neutral-50">
              {[
                { name: "The Chatbot", desc: "Personalized, real-time recommendations" },
                { name: "Dynamic UI", desc: "Adapt to different journey stages" },
                { name: "Comparison Tool", desc: "Side-by-side solution evaluation" },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeTab === idx
                      ? "bg-white border-b-2 border-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <div className="font-semibold">{tab.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{tab.desc}</div>
                </button>
              ))}
            </div>
            <div className="p-6 bg-neutral-50">
              <p className="text-sm text-neutral-600">
                {activeTab === 0 && "The chatbot enhanced discoverability by providing personalized recommendations and guiding users through complex solution comparisons."}
                {activeTab === 1 && "Dynamic UI adapted based on user needs at different journey stages—landing, exploring, and comparing—ensuring efficient discovery."}
                {activeTab === 2 && "Side-by-side comparison tool enabled users to evaluate solutions with 'add to compare' selections, making decision-making transparent."}
              </p>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Research Approach</h2>
          <ul>
            <li><strong>Semi-Structured Interviews (N=8)</strong> — Startup CTOs, CEOs, and Founders as key decision-makers</li>
            <li><strong>Competitive Analysis</strong> — AWS and Azure UX patterns for product discovery</li>
            <li><strong>Literature Review</strong> — Decision-making, online purchasing, and AI trust research</li>
          </ul>
          <p className="text-sm text-neutral-600 italic mt-4">
            Why qualitative over quantitative? Startup leaders are hard to reach, making large surveys impractical. In-depth interviews provided rich insights into mental models and actual decision-making behavior.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Findings</h2>
          <ul>
            <li>Mental models: Leaders evaluate solutions through business fit, integration compatibility, and cost predictability</li>
            <li>Discovery friction: Comparing similar products requires switching between multiple pages and documentation</li>
            <li>Trust factors: Clear product positioning and social proof drive adoption decisions</li>
            <li>AI perception: Users want transparency about AI recommendations, not just results</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Impact</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <h4 className="font-semibold mb-2">Validated Hypothesis</h4>
              <p className="text-sm">Final prototype SUS = 86.3% (high usability). Insights confirmed that helping users differentiate between similar solutions is key to improving adoption.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl">
              <h4 className="font-semibold mb-2">Comprehensive Hand-offs</h4>
              <p className="text-sm">Provided Google with raw data, interview protocols, insights, and participant connections to support ongoing research.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl">
              <h4 className="font-semibold mb-2">Driving Implementation</h4>
              <p className="text-sm">6 Google executives expressed strong interest in the chatbot feature through 2 presentation rounds. Now being implemented on their website.</p>
            </div>
          </div>

          <p className="mt-12 text-sm text-neutral-600">
            For detailed prototypes and full research documentation, visit the{" "}
            <a href="https://www.key-you-who.com/projects/google-cloud" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              complete project page
            </a>.
          </p>
        </div>
      </article>
    </div>
  );
}
