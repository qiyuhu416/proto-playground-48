import { createFileRoute } from "@tanstack/react-router";
import { TableOfContents } from "./-TableOfContents";

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
      <article className="mx-auto max-w-3xl px-6 py-12">
        <TableOfContents />

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Non-software prototype</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Hello Humans
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            <s>Two experiments in human-human async interaction.</s>
          </p>
          <p className="mt-3 text-lg text-neutral-600 max-w-2xl">
            jk, I just did it for fun. But seriously — these could be great prototyping ideas: NOT all prototypes need to be digital!
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Apple</span>
            <span className="text-neutral-300">·</span>
            <span>2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">

          {/* v1 */}
          <div className="not-prose mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">v1</span>
          </div>
          <h2 id="the-notebook" className="mt-2 mb-4 text-2xl font-semibold text-neutral-900">The notebook</h2>

          <p>
            A stand with an open notebook, left in a shared area. Sometimes I started with a prompt — a question, a half-finished thought. Sometimes I left it blank and let people surprise me. The hypothesis: if you make the barrier to interact low enough (pen, paper, no account), people will actually use it.
          </p>

          <div className="not-prose my-6">
            <img
              src="/articles/hello-humans-notebook.jpg"
              alt="Hello Humans notebook on a stand"
              className="w-full rounded-2xl border border-neutral-200 object-cover"
            />
            <p className="mt-3 text-xs text-neutral-400">
              The notebook stand. A deliberately low-fi object — no digital layer, no notifications, no record of who wrote what.
            </p>
          </div>

          <div className="not-prose mt-8 space-y-4">
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What it could test</p>
              <p className="text-sm text-neutral-500">Whether async & anonymous interaction in a physical shared space could feel warm</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What happened</p>
              <p className="text-sm text-neutral-500">People wrote only when there was a prompt!! Other times, they might treat it as a scratch paper with code notes lol. Some of those notes were really fun to read, some were jokes, some were genuine. </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">The insights (not proper research though)</p>
              <p className="text-sm text-neutral-500">It's good to make something organic, but there should also be some minimal instructions of what to do with it.</p>
            </div>
          </div>

          {/* v2 */}
          <div className="not-prose mt-20 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">v2</span>
          </div>
          <h2 id="hello-humans-2" className="mt-2 mb-4 text-2xl font-semibold text-neutral-900">Hello Humans 2.0</h2>

          <p>
            One day I just wanna see what would happen if I make it a "paper exchange" station. I grabbed an empty tissue box and put a sticky notes with simple sign: take one, leave one. 
          </p>

          <div className="not-prose my-6">
            <img
              src="/articles/paper-exchange.jpg"
              alt="Paper exchange setup"
              className="w-full rounded-2xl border border-neutral-200 object-cover"
            />
            <p className="mt-3 text-xs text-neutral-400">
              The paper exchange. A self-sustaining loop — the object replenishes itself through participation.
            </p>
          </div>

          <div className="not-prose mt-8 space-y-4">
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What it could test</p>
              <p className="text-sm text-neutral-500">Hypothesis: People are more likely to interact when there's reciprocity built in, and innovation needs to be a group work.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">What happened</p>
              <p className="text-sm text-neutral-500">Well... they took mine but didn't leave any. </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-4">
              <p className="text-sm text-neutral-700 font-medium mb-1">The insight (again don't quote me)</p>
              <p className="text-sm text-neutral-500">It could be because printing takes effort lol</p>
            </div>
          </div>

          <div className="not-prose mt-20 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
            <p className="text-sm font-semibold text-neutral-700 mb-2">Prototypes don't have to be digital</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Prototypes are just a medium to test something new, so they can take any format. Here I thought I was doing it for fun — but it generated real behavioral data from real humans. And, most importantly, it makes work fun :)
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
