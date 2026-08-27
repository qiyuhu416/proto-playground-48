import { createFileRoute } from "@tanstack/react-router";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

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
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Understanding Behavioral Intent</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["physical-ai"].title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>6 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-4xl">

          <h2 id={sectionId("Context")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Context</h2>

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
            The team was small—an engineer, a PM, and me. My role was to conduct the research, including creating the service blueprint and analyzing <strong>when to use AI and when <em>not</em> to use AI</strong>. The three of us collectively shared ideas and created the final artifacts.
          </p>

          <p>
            The problems we wanted to solve were:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Errors in the hospital-to-lab experience, with the goal of minimizing errors and reducing waste.</li>
            <li>How to be technology-driven but not tech-centered: finding the right intervention point to maximize the model's capabilities without forcing the technology into the experience.</li>
          </ol>

          <h2 id={sectionId("Outcome")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Outcome</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">1. Service blueprint</h3>

          <p>
            The service blueprint mapped where humans, existing systems, and AI could coordinate across the hospital-to-lab experience. More importantly, it made the boundaries visible: where AI could increase efficiency, where human judgment still mattered, and where an AI intervention might create more risk than value.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">2. Storyboard</h3>

          <p>
            Storyboarding helped stakeholders imagine the role of the system in context. The focus was less on a screen and more on <strong>when, where, and why AI should exist in the status quo.</strong>
          </p>

          <h2 id={sectionId("Process")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Process</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">1. Understand the problem</h3>

          <p>
            In diagnostic testing, sample collection is critical. A single error cascades through the entire lab process—false results, wasted samples, delayed diagnoses.
          </p>

          <p>
            Common pre-analytical errors include:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Wrong patient info (9%)</li>
            <li>Order misinterpretation (1%)</li>
            <li>Incorrect container (8%)</li>
            <li>Labeling mismatches (9%)</li>
            <li>Tube filling errors (13%)</li>
            <li>Storage failures (7%)</li>
          </ul>

          <h3 className="mt-8 mb-3 text-lg font-semibold">2. Explore whether AI is really needed</h3>

          <p>
            AI <em>could</em> be a solution, but it might not always be the best solution.
          </p>

          <p>
            Do we really need AI? Yes. We leverage AI's capacity to store, process, and communicate massive information.
          </p>

          <p>
            However, the current workflow relies entirely on human attention and memory. AI excels at:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Tracking multiple variables simultaneously</li>
            <li>Remembering complex sequences</li>
            <li>Validating against large datasets</li>
            <li>Communicating information clearly</li>
          </ul>

          <p>
            Potential use cases of AI in phlebotomy include: AI can confirm patient identity against records, validate that selected vials match test orders, verify that labels are correct before they're applied, and monitor the collection process to detect deviations.
          </p>

          <p>
            However, okay it is feasible, but is it the best solution? If not AI, what is an alternative solution?
          </p>

          <p>
            For each intervention point, we compared AI with alternatives—including existing workflows and human labor.
          </p>

          <p>
            We also looked at the risks of using AI: probabilistic errors, missing context, and the new coordination work created when a human needs to verify or correct the system.
          </p>

          <p>
            I found it useful to separate those risks into two types:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-neutral-700 mb-6">
            <li><strong>Short-term capability limitations:</strong> problems that may improve as the technology gets better.</li>
            <li><strong>System-level limitations:</strong> problems around responsibility, workflow, and error correction that don't automatically disappear with a better model.</li>
          </ul>

          <h3 className="mt-8 mb-3 text-lg font-semibold">3. Map tech capability to the service blueprint</h3>

          <p>
            The previous analysis helped me reframe the question into: <strong>where does AI create enough efficiency to justify the new uncertainty and coordination cost it introduces?</strong>
          </p>

          <p>
            Therefore, I created the service blueprint to map out the user flow and corresponding AI intervention points.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">4. Understand the limitations</h3>

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

        </div>

      </article>
    </div>
  );
}
