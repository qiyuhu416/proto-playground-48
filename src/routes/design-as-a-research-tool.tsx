import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

export const Route = createFileRoute("/design-as-a-research-tool")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "How design prototyping and physical systems revealed hidden user behaviors that surveys couldn't—and changed parking policy in Pittsburgh.",
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Case Study</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["design-as-a-research-tool"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            How design prototyping and physical systems revealed hidden user behaviors that surveys never could—and why Pittsburgh changed their parking policy based on what drivers actually do, not what they say.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Design</span>
            <span className="text-neutral-300">·</span>
            <span>Pittsburgh Parking Authority</span>
          </div>
        </div>

        <img
          src="/articles/design-research-hero.jpg"
          alt="Smart Loading Zone interface research"
          className="w-full rounded-2xl mb-16 border-4 border-neutral-900"
        />

        <div className="prose prose-neutral max-w-4xl">
          <TableOfContents />

          <h2 id={sectionId("The Challenge")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"The Challenge"}</h2>
          <p>
            Pittsburgh's Smart Loading Zones (SLZ) were designed to improve parking efficiency and reduce delivery times. But adoption was stuck. Most drivers either didn't know about them or actively avoided them. The Parking Authority had questions that surveys couldn't answer:
          </p>
          <ul>
            <li>Why were drivers ignoring this service despite its benefits?</li>
            <li>What were the actual barriers to adoption?</li>
            <li>What would actually change driver behavior?</li>
          </ul>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0">Traditional research would ask drivers: "Would you use SLZ?" They'd say yes. But observed behavior told a different story entirely.</p>
          </div>

          <h2 id={sectionId("Methodology: Design as Discovery")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Methodology: Design as Discovery"}</h2>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Phase 1: Understanding the Context</h3>

          <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div>
              <img
                src="/articles/slz-survey-poster.png"
                alt="Survey poster recruiting Pittsburgh SLZ study participants"
                className="w-full rounded-xl border border-neutral-200 object-cover"
                style={{ height: "260px" }}
              />
              <p className="text-xs text-neutral-500 mt-2 text-center">Survey Posters</p>
            </div>
            <div>
              <img
                src="/articles/slz-onsite-observation.png"
                alt="Researchers conducting on-site observation at a Pittsburgh loading zone"
                className="w-full rounded-xl border border-neutral-200 object-cover"
                style={{ height: "260px" }}
              />
              <p className="text-xs text-neutral-500 mt-2 text-center">On-site Observation</p>
            </div>
            <div>
              <img
                src="/articles/slz-intercept-interviews.png"
                alt="Researchers conducting intercept interviews with drivers"
                className="w-full rounded-xl border border-neutral-200 object-cover"
                style={{ height: "260px" }}
              />
              <p className="text-xs text-neutral-500 mt-2 text-center">Intercept Interviews</p>
            </div>
          </div>

          <ul>
            <li><strong>Desktop research</strong> — Analyzing existing SLZ systems and competitive services</li>
            <li><strong>On-site observation</strong> — 10+ hours watching how drivers actually use loading zones (not how we think they should)</li>
            <li><strong>Intercept interviews</strong> — 15+ unscripted conversations with delivery drivers, service workers, and regular drivers at actual loading zones</li>
          </ul>

          <p>
            The intercept interviews were critical. We caught people in the moment, doing the actual task. They'd show us their phone (how they found spaces), their clipboard (how they tracked time), their frustrations with current apps—things they'd never mention in a formal survey.
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Phase 2: Testing Assumptions with Prototypes</h3>
          <p>
            We built low-fidelity and high-fidelity prototypes of different service models:
          </p>
          <ul>
            <li><strong>Payment timing:</strong> Upfront registration vs. pay-after-exit</li>
            <li><strong>Communication:</strong> Web app vs. text-only vs. phone call</li>
            <li><strong>Eligibility signage:</strong> Different visual designs for zone markers</li>
          </ul>

          <p>
            Then we ran <strong>speed dating sessions</strong>—a rapid UX research method where drivers tested multiple concepts in quick succession. The approach tested intentionally unconventional, multimodal concepts without considering business constraints first. This technique enabled quick feedback gathering on multiple prototypes, revealing genuine reactions rather than hypothetical preferences.
          </p>

          <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <img src="/articles/slz-speeddating-1.png" alt="Speed dating concept storyboard 1" className="w-full rounded-xl border border-neutral-200" />
            <img src="/articles/slz-speeddating-2.png" alt="Speed dating concept storyboard 2" className="w-full rounded-xl border border-neutral-200" />
          </div>

          <p className="not-prose text-sm font-semibold text-neutral-900 mt-10 mb-4">Physical artifacts from speed dating</p>

          <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div>
              <img src="/articles/slz-kiosk-artifact.png" alt="Physical Kiosk prototype — get ticket, go on errands, scan upon return" className="w-full rounded-xl border border-neutral-200" />
              <p className="text-xs text-neutral-500 mt-2"><strong>Physical Kiosk</strong> — get ticket → go on their errands → scan ticket upon return</p>
            </div>
            <div>
              <img src="/articles/slz-digital-artifact.png" alt="Digital Automated System — SMS onboarding and reminders during parking" className="w-full rounded-xl border border-neutral-200" />
              <p className="text-xs text-neutral-500 mt-2"><strong>Digital Automated System</strong> — receive onboarding instructions and reminders during parking</p>
            </div>
          </div>

          <p className="not-prose text-sm font-semibold text-neutral-900 mt-10 mb-4">Testing with physical artifacts</p>

          <img src="/articles/slz-testing.png" alt="Testing physical kiosk prototype with drivers on the street" className="w-full rounded-xl border border-neutral-200 my-4" />

          <h3 className="mt-8 mb-4 text-lg font-semibold">Phase 3: Validation</h3>
          <ul>
            <li><strong>Think-aloud protocol</strong> — Watching drivers interact with prototypes while verbalizing their thoughts</li>
            <li><strong>SUS (System Usability Scale) surveys</strong> — Quantifying usability on a standard 0-100 scale</li>
            <li><strong>Behavioral metrics</strong> — Tracking what drivers actually did, not just what they said they'd do</li>
          </ul>

          <img
            src="https://cdn.prod.website-files.com/67c5d8790deeb0d30e1c5bad/67d9caafd2d752ef4ae57451_Frame%2093%20(1).png"
            alt="Research methodology diagram"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <h2 id={sectionId("What Design Revealed")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"What Design Revealed"}</h2>

          <p>
            <strong>Survey answer:</strong> "Would you use Smart Loading Zones?" 78% said yes.
          </p>

          <p>
            <strong>Design revealed:</strong> The actual barriers to adoption that surveys miss.
          </p>

          <div className="space-y-6 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">1. Awareness gap: 60%+ unaware</h4>
              <p className="text-sm text-neutral-600 mb-2">Drivers saw the purple curbs but didn't know what they meant. Signage clarity was the #1 issue.</p>
              <p className="text-xs text-neutral-500"><strong>Design implication:</strong> Information hierarchy and visibility became critical design requirements.</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">2. Confusion created workarounds: 95% used hazard lights</h4>
              <p className="text-sm text-neutral-600 mb-2">Drivers didn't understand the rules, so they defaulted to the universal signal: hazard lights. This meant they were avoiding the system, not using it.</p>
              <p className="text-xs text-neutral-500"><strong>Design implication:</strong> Rules must be immediately clear from the visual design alone.</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">3. Friction killed adoption: upfront commitment required</h4>
              <p className="text-sm text-neutral-600 mb-2">Drivers avoided unfamiliar services that required upfront registration or payment before they could test them.</p>
              <p className="text-xs text-neutral-500"><strong>Design implication:</strong> Service model must reduce activation friction—pay after, not before.</p>
            </div>
          </div>

          <blockquote>
            What surveys said drivers wanted ≠ what driver behavior actually required. Design prototypes bridged that gap.
          </blockquote>

          <h2 id={sectionId("Outcome: From Research to Policy")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Outcome: From Research to Policy"}</h2>

          <p>
            The design research led to concrete changes in how Pittsburgh's SLZ operates:
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Service Model Changes</h3>
          <ul>
            <li><strong>Shifted from upfront payment to pay-after-exit</strong> — Removing the barrier to trial</li>
            <li><strong>Text-based messaging system</strong> — The fastest way to reach drivers already on the go</li>
            <li><strong>Redesigned signage</strong> — Clearer, color-coded, immediately understandable</li>
          </ul>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Measurable Results</h3>
          <ul>
            <li><strong>SUS score of 90.3%</strong> on final service prototype (excellent usability threshold)</li>
            <li><strong>Projected 40% increase in SLZ adoption</strong> based on behavioral testing</li>
            <li><strong>Reduced support calls</strong> — Clearer signage meant fewer confused drivers</li>
          </ul>

          <img
            src="/articles/design-research-2.png"
            alt="Research findings and empathy maps"
            className="w-full rounded-2xl my-8"
          />

          <h2 id={sectionId("Research Frameworks Used")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Research Frameworks Used"}</h2>

          <p>Throughout the project, we built:</p>

          <ul>
            <li><strong>Empathy maps</strong> — For each driver type (delivery, service, commuter)</li>
            <li><strong>Journey models</strong> — Mapping the moment-by-moment decision making when approaching a loading zone</li>
            <li><strong>Connection charts</strong> — Showing how pain points linked to actual adoption barriers</li>
            <li><strong>Success metrics framework</strong> — Defining what "adoption" actually means behaviorally</li>
          </ul>

          <img
            src="https://cdn.prod.website-files.com/67c5d8790deeb0d30e1c5bad/67d9caafd2d752ef4ae5741f_empathy%20map.png"
            alt="Empathy map visualization for driver types"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <img
            src="https://cdn.prod.website-files.com/67c5d8790deeb0d30e1c5bad/67d9caafd2d752ef4ae574b8_Frame%20194.png"
            alt="Synthesis wall - organizing research insights"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <img
            src="https://cdn.prod.website-files.com/67c5d8790deeb0d30e1c5bad/67d9caafd2d752ef4ae574cc_Frame%20195.png"
            alt="Logical insight connections - linking findings to adoption barriers"
            className="w-full rounded-2xl my-8 border border-neutral-200"
          />

          <img
            src="/articles/design-research-3.png"
            alt="Policy impact and implementation roadmap"
            className="w-full rounded-2xl my-8"
          />

          <h2 id={sectionId("Why Design Was Essential")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Why Design Was Essential"}</h2>

          <p>
            Traditional research methods would have confirmed the obvious: drivers want efficient parking. But design as research revealed the non-obvious: <strong>drivers will default to hazard lights rather than learn a new system if the system seems confusing.</strong>
          </p>

          <p>
            This insight only emerged by watching people interact with prototypes in real time. A survey could never uncover that. An analytics dashboard wouldn't show the frustration and hesitation in a driver's face. Only design—the act of making something tangible and testable—revealed what actually mattered.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Design principle</div>
            <p className="m-0"><strong>Design is a research method because it forces clarity.</strong> When you prototype something, you can't hide behind vague language. "Users want ease of use" is meaningless. But a prototype forces you to specify: Which button? What color? How much text on the sign? That specificity is where insights emerge.</p>
          </div>

          <p className="mt-12 text-sm text-neutral-600">
            For the full project documentation, prototypes, and detailed research findings, visit the{" "}
            <a href="https://www.key-you-who.com/projects/design-as-a-research-tool" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              complete case study →
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
