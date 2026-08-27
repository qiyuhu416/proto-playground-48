import { createFileRoute } from "@tanstack/react-router";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";

export const Route = createFileRoute("/designing-for-conversations-that-earn-trust")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Research on designing AI for eldercare: building trust through conversational design across multiple stakeholders.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Bot for Multi-Stakeholder Eldercare</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["designing-for-conversations-that-earn-trust"].title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>8 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-3xl">

          <h2 id={sectionId("Context")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Context</h2>

          <p>
            This was a research project at AI Caring, where I worked as a research assistant. My role included helping design the research method, conducting interviews, and exploring concepts through storyboards. The paper writing is still WIP—and moving very slowly, since my PI switched to industry (and now we are at the same company lol).
          </p>

          <p>
            The theme of the research was: <strong>What if AI plays a role beyond a tool, as a caregiver for older adults?</strong>
          </p>

          <p>
            The trickiest part is that there are many stakeholders and the older adult's health may decline. As the bot becomes a party that knows information from both sides, the elder might not want the bot to tell everything to their caregiver. In social science, <em>affiliation</em> is the affective stance of being on someone's side—distinct from <em>alignment</em>, which is just structural cooperation. Designing this requires understanding what it means to be loyal to one party while respecting another's autonomy.
          </p>

          <h2 id={sectionId("Outcome")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Outcome</h2>

          <p>
            Conversational design is not just about <em>what the bot says</em>. We designed the conversations for not just single-turn AI response but also focus on the high-level interaction flow to create a decision tree that defines the logics of whether the bot feels trustworthy in the first place.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">1. Trust can be scripted</h3>

          <p>
            Trust is an important factor in this multi-stakeholder coordination scenarios. Through literature review, we found a conversational design framework and proposed this decision tree when caregiver and elder goals conflict:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-neutral-700">
            <li><strong>Acknowledge the instruction</strong> - "I understand you want to [elder's instruction]" and name any conflicts openly</li>
            <li><strong>Evaluate the outcome</strong> - Use past interactions to understand values; explain potential consequences</li>
            <li><strong>Show affiliation behavior</strong> - Be clear about operational criteria and goals; demonstrate consistent support</li>
            <li><strong>Ask to reconfirm</strong> - "Are you sure about [original instruction]?"</li>
          </ol>

          <h3 className="mt-8 mb-3 text-lg font-semibold">2. Trust doesn't always positively correlate with perceived capability</h3>

          <p>
            In some situations, an AI saying <strong>"I'm not capable of providing that support"</strong> could create more trust than confidently trying to answer everything.
          </p>

          <p>
            To answer the question of "when the bot should say I don't know", we mapped out the decision tree with different possible scenarios and metrics to evaluate the outcome for each.
          </p>

          <h2 id={sectionId("Implications")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Implications</h2>

          <p>
            The design goal shifted from simply making the bot feel intelligent to <strong>clearly communicating what it can do, what it cannot do, and when a human should be involved.</strong>
          </p>

          <p>
            There is a nuance here: being transparent does not mean the bot should constantly remind users that it is limited. The interaction still needs to feel supportive. The question is how to design the right boundary so the AI can be helpful without pretending to have authority it doesn't have.
          </p>

          <h2 id={sectionId("Process")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Process</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">1. Desktop research: understand the stakeholders and common scenarios</h3>

          <p>
            We started with desktop research to understand the care ecosystem: who is involved, what kinds of decisions they make together, and where their interests might conflict.
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">2. Research-through-design, with storyboards as the medium</h3>

          <p>
            We created storyboards based on the researched scenarios, visualizing different extents of bot involvement in each one. This helped us focus less on <strong>"what should the chatbot screen look like?"</strong> and more on <strong>"what role should the bot play here?"</strong>
          </p>

          <p>
            We also adopted a speed-dating research method: 10 storyboards across five scenarios, with two levels of bot involvement for each scenario. We showed them to participants in randomized order and asked them to quickly compare and react. The goal was to explore: <strong>to what extent should the bot be involved, and how does that change across different scenarios?</strong>
          </p>

          <p>
            We then conducted qualitative interviews at a senior center, showing participants the storyboards and asking questions like: <strong>"What would you want the bot to do in this scenario?"</strong>
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">3. Affinity-cluster the results</h3>

          <p>
            After the interviews, we affinity-clustered participants' responses to look for patterns across scenarios—not just whether people liked or disliked a specific bot behavior, but <em>why</em> they wanted more or less AI involvement.
          </p>

          <p>
            That analysis led to the trust findings above, especially around capability, boundaries, and the bot's role in a multi-stakeholder relationship.
          </p>

          <p>
            There are more nuances here than I can fit into a portfolio page. The paper is still WIP, so: <strong>stay tuned :)</strong>
          </p>

        </div>

      </article>
    </div>
  );
}
