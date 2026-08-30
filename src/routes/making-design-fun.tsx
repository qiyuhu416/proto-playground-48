import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, HighlightedText, OutcomeSection } from "@/components/ArticleContent";

export const Route = createFileRoute("/making-design-fun")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Caltrain, After Effects, and why vibe-coding is the future of creation. A collection of playful experiments.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <ArticleHeader
          title={ARTICLE_META["making-design-fun"].title}
          meta="Collection"
          description="Caltrain, After Effects, and a stubborn suspicion that everything could be easier. A collection of vibe-coded experiments exploring playful interactions, gesture, and the joy of creation."
        />

        <DynamicIslandTOC />

        <ArticleContent>
          <p>
            I work best when I'm making things I genuinely enjoy, things I'd make even without payment. That's when the best work happens.
          </p>

          <ArticleHeading2 id={sectionId("The philosophy: friction-free creation")}>The philosophy: friction-free creation</ArticleHeading2>

          <p>
            I had this idea stuck in my head and wanted to make it—a small playful thing just for fun. So I did it, with After Effects. But it took me almost the whole day, learning After Effects from zero just to create that moment.
          </p>

          <p>
            That's when I fell in love with vibe-coding. Once you have some ideas and a smart tool to help bring them to life, that feeling is addictive. The friction between idea and reality disappears.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>The question that drives it all:</strong> Why should making things be hard? Why should there be so much friction between an idea and its realization?</p>
          </div>

          <ArticleHeading2 id={sectionId("Curiosity, not FOMO")}>Curiosity, not FOMO</ArticleHeading2>

          <p>
            The difference between learning something because it's trendy vs. learning something because you're genuinely curious is everything. FOMO-driven learning feels like obligation. Curiosity feels like haha.
          </p>

          <p>
            Every experiment here came from pure curiosity. Not "should I learn this?" but "I have an idea and I want to see it come to life, whatever it takes." The tools are just the means to the end.
          </p>

          <OutcomeSection
            id={sectionId("The experiments")}
            title="The experiments"
            tabs={[
              {
                id: "birthday",
                title: "Birthday card",
                children: (
                  <>
                    <p>
                      A small moment of delight. A reminder that design doesn't need to be grand—sometimes the joy is in the details, the unexpected animation, the gesture that makes you smile.
                    </p>
                    <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white mt-4"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                      <source src="/articles/birthday-card.mp4" type="video/mp4" />
                      Your browser doesn't support video playback.
                    </video></div>
                  </>
                )
              },
              {
                id: "gesture",
                title: "Hand gesture interactions",
                children: (
                  <>
                    <p>
                      Exploring how gestures can make technology feel natural and embodied. When interaction becomes intuitive, the tool disappears. Only the delight remains.
                    </p>
                    <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white mt-4"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                      <source src="/articles/hand-gesture.mp4" type="video/mp4" />
                      Your browser doesn't support video playback.
                    </video></div>
                  </>
                )
              },
              {
                id: "voice",
                title: "Voice interaction",
                children: (
                  <>
                    <p>
                      Beyond screens. Exploring how voice can become an interface—natural, conversational, human. What does it feel like to talk to a tool that listens?
                    </p>
                    <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white mt-4"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                      <source src="/articles/voice.mp4" type="video/mp4" />
                      Your browser doesn't support video playback.
                    </video></div>
                  </>
                )
              },
              {
                id: "palo-alto",
                title: "Palo Alto moment",
                children: (
                  <>
                    <p>
                      A location-based concept. What happens when design meets place? Exploring how context shapes interaction.
                    </p>
                    <div style={{ height: "60vh" }} className="rounded-xl overflow-hidden border-4 border-neutral-900 bg-white mt-4"><video controls className="w-full h-full object-contain" style={{ backgroundColor: "#fff" }}>
                      <source src="/articles/palo-alto.mp4" type="video/mp4" />
                      Your browser doesn't support video playback.
                    </video></div>
                  </>
                )
              }
            ]}
          />

          <ArticleHeading2 id={sectionId("On creation tools")}>On creation tools</ArticleHeading2>

          <p>
            The best creation tools don't drown you in options. They give you one powerful, focused intention. You think in blocks: your idea → your prompt → your output.
          </p>

          <p>
            No fussy settings. No analysis paralysis. No endless tweaking. Just flow. The tool becomes invisible and only the delight remains.
          </p>

          <ArticleHeading2 id={sectionId("What makes design playful")}>What makes design playful</ArticleHeading2>

          <p>
            Playful design is when you stumble on surprising interactions. A gesture that feels right. An animation that makes you smile. A workflow that feels effortless.
          </p>

          <p>
            These aren't accidents. They're moments of careful thinking disguised as haha. The designer sweated over the details—the easing curve, the timing, the haptic feedback—so the user could experience pure delight.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>The core belief:</strong> If I can remove friction, amplify joy, and make creation feel less like work and more like haha, then I've done my job.</p>
          </div>

          <ArticleHeading2 id={sectionId("Why this matters")}>Why this matters</ArticleHeading2>

          <p>
            In an era where creation tools are becoming more powerful, the question isn't "can I make it?" but "can I make it joyfully?"
          </p>

          <p>
            The Caltrain moment taught me that the friction matters. Learning a tool shouldn't be a barrier to your idea. Tools should accelerate you toward the joy of creation, not away from it.
          </p>

          <p>
            These experiments are evidence of that philosophy: small ideas, vibe-coded into existence, with no apologies for taking the scenic route or trying the unconventional approach.
          </p>

        </ArticleContent>

        <div className="mt-20 border-t border-neutral-200 pt-10 max-w-4xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>Meetfood — Founding Product Designer (Mar 2021 – Dec 2022)</li>
            <li>Cornell — Physical Computing & Interaction Design (Jan 2023 – May 2023)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
