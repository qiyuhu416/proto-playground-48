import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/hello-humans")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Two low-tech experiments in human-to-human async interaction, run at Apple.",
      },
    ],
  }),
  component: HelloHumansComponent,
});

function HelloHumansComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">
        <a
          href="/what-do-prototypes-prototype"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to What do prototypes prototype?
        </a>

        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Non-software prototype</span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            Hello Humans
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Two experiments in low-tech async interaction — testing whether people would connect with strangers through shared objects in a shared space.
          </p>
          <div className="mt-4 text-sm text-neutral-400">Apple · 2025</div>
        </div>

        {/* Version 1 */}
        <section className="mb-16">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">v1</span>
            <h2 className="text-xl font-semibold text-neutral-900 mt-1">The notebook</h2>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">
            A stand with an open notebook, left in a shared area. Sometimes I started with a prompt — a question, a half-finished thought. Sometimes I left it blank and let people surprise me. The hypothesis: if you make the barrier to interact low enough (pen, paper, no account), people will actually use it.
          </p>
          <img
            src="/articles/hello-humans-notebook.jpg"
            alt="Hello Humans notebook on a stand"
            className="w-full rounded-2xl border border-neutral-200 object-cover"
          />
          <p className="mt-3 text-xs text-neutral-400">
            The notebook stand. A deliberately low-fi object — no digital layer, no notifications, no record of who wrote what.
          </p>

          <div className="mt-8 space-y-4">
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What I was testing</p>
              <p className="text-sm text-neutral-500">Whether async, anonymous interaction in a physical shared space could feel warm rather than awkward.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What happened</p>
              <p className="text-sm text-neutral-500">People wrote. A lot. Some responses were jokes, some were genuine. A few wrote back to previous entries. The thread-like quality emerged on its own — no feature required.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">The insight</p>
              <p className="text-sm text-neutral-500">The object did the work. The notebook signaled "this is a place for leaving something." No instructions needed.</p>
            </div>
          </div>
        </section>

        {/* Version 2 */}
        <section className="mb-16">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">v2</span>
            <h2 className="text-xl font-semibold text-neutral-900 mt-1">Paper exchange</h2>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">
            I shared a stack of my favorite research papers and put up a simple sign: take one, leave one. The hypothesis this time: people are more likely to interact when there's reciprocity built in — something to give, something to get.
          </p>
          <img
            src="/articles/paper-exchange.jpg"
            alt="Paper exchange setup"
            className="w-full rounded-2xl border border-neutral-200 object-cover"
          />
          <p className="mt-3 text-xs text-neutral-400">
            The paper exchange. A self-sustaining loop — the object replenishes itself through participation.
          </p>

          <div className="mt-8 space-y-4">
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What I was testing</p>
              <p className="text-sm text-neutral-500">Whether a built-in exchange mechanic would lower the social cost of taking something from a stranger.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What happened</p>
              <p className="text-sm text-neutral-500">People left papers I'd never heard of. Some left notes with the paper. One person left a handwritten recommendation instead of a paper.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">The insight</p>
              <p className="text-sm text-neutral-500">Reciprocity unlocked generosity. The structure gave people permission to be more personal than a blank notebook did.</p>
            </div>
          </div>
        </section>

        {/* Takeaway */}
        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Why this is prototyping</p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Both experiments generated real behavioral data — not survey data, not hypotheticals. The notebook told me people will thread. The paper exchange told me reciprocity is a design lever. Neither required writing a single line of code.
          </p>
        </div>
      </article>
    </div>
  );
}
