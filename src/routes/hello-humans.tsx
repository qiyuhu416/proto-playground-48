import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";

import { Eyebrow, Panel } from "@/components/system";
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
    <div className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <ArticleHeader
          title="Hello Humans"
          meta="Non-software prototype"
          heroImage="/articles/hello-humans-notebook.jpg"
          heroAlt="Hello humans notebook prototype"
        />

        <div className="prose prose-neutral max-w-2xl">

          {/* v1 */}
          <div className="not-prose mb-1">
            <Eyebrow>v1</Eyebrow>
          </div>
          <h2 id="the-notebook" className="mt-2 mb-4 text-2xl font-semibold text-foreground">The notebook</h2>

          <p>
            A stand with an open notebook, left in a shared area. Sometimes I started with a prompt — a question, a half-finished thought. Sometimes I left it blank and let people surprise me. The hypothesis: if you make the barrier to interact low enough (pen, paper, no account), people will actually use it.
          </p>

          <div className="not-prose my-6">
            <img
              src="/articles/hello-humans-notebook.jpg"
              alt="Hello Humans notebook on a stand"
              className="w-full rounded-2xl border border-border object-cover"
            />
            <p className="mt-3 text-xs text-subtle-foreground">
              The notebook stand. A deliberately low-fi object — no digital layer, no notifications, no record of who wrote what.
            </p>
          </div>

          <div className="not-prose mt-8 space-y-4">
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">What it could test</p>
              <p className="text-sm text-subtle-foreground">Whether async & anonymous interaction in a physical shared space could feel warm</p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">What happened</p>
              <p className="text-sm text-subtle-foreground">People wrote only when there was a prompt!! Other times, they might treat it as a scratch paper with code notes lol. Some of those notes were really fun to read, some were jokes, some were genuine. </p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">The insights (not proper research though)</p>
              <p className="text-sm text-subtle-foreground">It's good to make something organic, but there should also be some minimal instructions of what to do with it.</p>
            </div>
          </div>

          {/* v2 */}
          <div className="not-prose mt-20 mb-1">
            <Eyebrow>v2</Eyebrow>
          </div>
          <h2 id="hello-humans-2" className="mt-2 mb-4 text-2xl font-semibold text-foreground">Hello Humans 2.0</h2>

          <p>
            One day I just wanna see what would happen if I make it a "paper exchange" station. I grabbed an empty tissue box and put a sticky notes with simple sign: take one, leave one. 
          </p>

          <div className="not-prose my-6">
            <img
              src="/articles/paper-exchange.jpg"
              alt="Paper exchange setup"
              className="w-full rounded-2xl border border-border object-cover"
            />
            <p className="mt-3 text-xs text-subtle-foreground">
              The paper exchange. A self-sustaining loop — the object replenishes itself through participation.
            </p>
          </div>

          <div className="not-prose mt-8 space-y-4">
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">What it could test</p>
              <p className="text-sm text-subtle-foreground">Hypothesis: People are more likely to interact when there's reciprocity built in, and innovation needs to be a group work.</p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">What happened</p>
              <p className="text-sm text-subtle-foreground">Well... they took mine but didn't leave any. </p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground font-medium mb-1">The insight (again don't quote me)</p>
              <p className="text-sm text-subtle-foreground">It could be because printing takes effort lol</p>
            </div>
          </div>

          <Panel kind="callout" className="not-prose mt-20">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Prototypes don't have to be digital</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prototypes are just a medium to test something new, so they can take any format. Here I thought I was doing it for fun — but it generated real behavioral data from real humans. And, most importantly, it makes work fun :)
            </p>
          </Panel>

        </div>
      </article>
    </div>
  );
}
