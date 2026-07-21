import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/physical-ai")({
  head: () => ({
    meta: [
      { title: "Physical AI" },
      {
        name: "description",
        content: "Designing AI beyond screens: embedding intelligence in physical systems to reduce human error in healthcare.",
      },
    ],
  }),
  component: PhysicalAIComponent,
});

function PhysicalAIComponent() {
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

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["physical-ai"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Designing AI beyond screens. How embedding intelligence in physical systems can prevent human error in diagnostic healthcare.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Healthcare Design</span>
            <span className="text-neutral-300">·</span>
            <span>AI-Assisted Phlebotomy</span>
          </div>
        </div>

        <img
          src="/articles/physical-ai-thumb.png"
          alt="Physical AI healthcare interaction design"
          className="w-full rounded-2xl mb-16 border-4 border-neutral-900"
        />

        <div className="prose prose-neutral max-w-4xl">
          <TableOfContents />

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Challenge: Human Error in Phlebotomy</h2>

          <p>
            In diagnostic testing, sample collection is critical. A single error in this phase cascades through the entire lab process—false results, wasted samples, delayed diagnoses. Yet the current workflow relies entirely on human attention and memory.
          </p>

          <p>
            The patient interaction is complex: confirmation, sample collection, labeling, storage. The phlebotomist juggles multiple information sources (test orders, patient data, vial requirements) while performing a delicate physical task. Errors happen not from incompetence, but from cognitive overload.
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
            Phlebotomists and patients navigate a series of critical checkpoints. Each is an opportunity for error: wrong patient info (9%), order misinterpretation (1%), incorrect container (8%), labeling mismatches (9%), tube filling errors (13%), and storage failures (7%).
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>The insight:</strong> These aren't rare mistakes—they're endemic to the process. The phlebotomist is managing too much cognitive load while performing a precision task.</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Why AI?</h2>

          <img
            src="/articles/physical-ai-20.png"
            alt="Why AI"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p>
            <strong>We leverage AI's capacity to store, process, and communicate massive information.</strong>
          </p>

          <p>
            AI can't draw blood. It can't feel tissue or make judgment calls based on subtle physical feedback. But AI excels at what humans struggle with: tracking multiple variables simultaneously, remembering complex sequences, validating against large datasets, communicating information clearly.
          </p>

          <p>
            In phlebotomy, that means: AI can confirm patient identity against records, validate that the selected vial matches the test order, verify that labels are correct before they're applied, and monitor the collection process to detect deviations.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Mapping AI to Error: Short-term vs. Long-term</h2>

          <img
            src="/articles/physical-ai-21.png"
            alt="AI capability mapping to errors - short term and long term vision"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic">
            The same system serves two roles: short-term, it assists the phlebotomist (catching errors before they happen). Long-term, it becomes a performer (autonomous quality verification and execution).
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Short-term: AI as Assistant</h3>
          <ul>
            <li><strong>Confirmation phase:</strong> Compare label info & patient ID</li>
            <li><strong>Selection phase:</strong> Evaluate vial-label match, find correct filling status</li>
            <li><strong>Extraction phase:</strong> Monitor tube filling status, detect incorrect amount</li>
            <li><strong>Storage phase:</strong> Generate summary, identify storage location, notice unusual sample changes</li>
          </ul>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Long-term: AI as Performer</h3>
          <ul>
            <li><strong>Automation:</strong> Detect face ID, select correct vial, extract to right amount, store based on instruction</li>
            <li><strong>Integration:</strong> Act on human feedback, refine based on patterns</li>
            <li><strong>Reliability:</strong> Reduce human error to near-zero through consistent, tireless execution</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The System: Hardware & Design</h2>

          <img
            src="/articles/physical-ai-23.png"
            alt="Hardware artifacts: base station, tracker base, and tracker module"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic">
            Three physical components: The base station (computer vision, laser scanner, thermal monitoring, UI). The tracker base (sensing vial storage). The tracker module (thermometer, GPS, IMU for monitoring samples in transit).
          </p>

          <p>
            The hardware elements are intentionally flexible and light-touch for users. The base station sits on a phlebotomist's desk. The tracker base monitors vial storage. The tracker module deploys into transport containers. All designed to be invisible to the user—present only when needed.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The User Flow: 8-Step Collection Journey</h2>

          <img
            src="/articles/physical-ai-24.png"
            alt="Proposed user flow with 8 interaction steps"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic">
            Step-by-step, the system guides the phlebotomist through collection while validating each decision. Computer vision reads IDs. The CVA (Computer Vision Assistant) manages vial storage. On-screen UI confirms selections. Smart labels verify matches. The system is always watching, always confirming.
          </p>

          <div className="space-y-6 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Step 1-2: Identity & Order</h4>
              <p className="text-sm text-neutral-600">Phlebotomist asks for ID, ID is scanned. Machine prints tube selection guide. Phlebotomist confirms test order.</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Step 3-4: Vial Selection & Labeling</h4>
              <p className="text-sm text-neutral-600">CVA starts, requires view of vial storage. System confirms correct starting vial (1-by-1 match). Printer outputs smart labels (NFC, QR, barcode).</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Step 5-6: Collection & Verification</h4>
              <p className="text-sm text-neutral-600">Phlebotomist inserts needle. CVA confirms correct vial order. Phlebotomist fills first vial. CVA watching for tube filling, additive type/amount, tube match.</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Step 7-8: Completion & Validation</h4>
              <p className="text-sm text-neutral-600">Phlebotomist changes & fills additional vials if needed. CVA confirms all samples (total volume, all barcodes, against lab order). Labels confirm against patient info.</p>
            </div>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Final Design: The Patient Journey</h2>

          <img
            src="/articles/physical-ai-22.png"
            alt="Final design showing potential sample collection journey"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic">
            The redesigned interaction: Patient confirms identity using multimodal AI. Base station guides phlebotomist through collection. Labels and vials are verified in real-time. The entire journey is monitored, checked, and logged.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Team & Collaboration</h2>

          <img
            src="/articles/physical-ai-16.png"
            alt="Project team: Qiyu Hu, Greg McNamara, Emily Privot"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic">
            This project was a collaboration between HCI research, industrial & UX design, and technology specialists—bringing together human-centered design with hardware and software engineering.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Takeaway</h2>

          <p>
            Physical AI isn't about replacing humans. It's about <strong>removing cognitive overload from moments that require precision.</strong> The phlebotomist's skill—understanding tissue, sensing pressure, making judgment calls—remains irreplaceable. But the burden of remembering 10 variables while drawing blood? That's where AI excels.
          </p>

          <p>
            When AI is embedded in the physical environment, it becomes a tool that feels natural, not intrusive. It doesn't ask for input; it confirms choices. It doesn't replace the human; it amplifies their focus.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>CMF & Technology Design — Industrial Design, AI Integration</li>
            <li>Healthcare Systems — Error Prevention, Workflow Optimization</li>
            <li>Human-AI Collaboration — Assistive Design Patterns</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
