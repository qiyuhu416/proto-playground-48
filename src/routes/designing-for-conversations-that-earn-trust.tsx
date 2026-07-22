import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./-TableOfContents";
import { ARTICLE_META, sectionId } from "./-articleMeta";


export const Route = createFileRoute("/designing-for-conversations-that-earn-trust")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "How to design AI that humans trust—borrowing from human relationships, scripting small moments, and knowing when to hand off.",
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["designing-for-conversations-that-earn-trust"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Designing human–AI interaction is designing the human–AI <em>relationship</em>. The interaction is what the user touches. The relationship is everything underneath.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · AI-Caring</span>
            <span className="text-neutral-300">·</span>
            <span>2023–2024</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-3xl">

          <h2 id={sectionId("Designing the relationship")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Designing the relationship"}</h2>

          <h3 className="mt-8 mb-3 text-lg font-semibold">Case study: Elder care Bot (research @AI-Caring)</h3>

          <p>
            Instead of AI–individual reaction, this project was about <strong>AI–group interaction</strong>: AI steps into an already-existing human web and learns to deal with relationships between elder, caregiver, and family.
          </p>

          <p>
            If we look at the evolution of HCI, it has always been about relationships:
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 my-6 text-sm font-mono text-neutral-700">
            humans adapt to machines (terminal)<br />
            → machines adapt to humans (GUI)<br />
            → humans &amp; machines work together (AI agents)
          </div>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-4 my-6 rounded text-sm text-neutral-600 italic">
            Interestingly we're now back to terminal again (hello, Claude Code)
          </div>

          <p>
            One aspect of the relationship is "trust." How do we minimize the gap between what AI says and what humans understand, and how do we design AI that humans trust?
          </p>

          <p>
            This is a <strong>hard inference</strong> case. How would you explain to AI what "trust" is? I couldn't remember how much literature review I did trying to understand humans. We design human–AI relationships by borrowing from human–human relationships, but humans are complicated—human–human relationships are even <strong>MUCH MORE</strong> complicated. So most of this HCI research was about understanding humans.
          </p>

          <h2 id={sectionId("Trust can be scripted")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Trust can be scripted"}</h2>

          <p>
            Trust is usually built through small interactions. Below is a decision structure we proposed—see how small things can build up to create those feelings:
          </p>

          <pre className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 my-8 text-xs leading-relaxed overflow-x-auto text-neutral-700" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{`┌──────────────────────────────────────────────────┐
│ 1 · acknowledge the instruction                  │
├──────────────────────────────────────────────────┤
│ "I understand you want to [elder's instruction]" │
│                                                  │
│ "I notice a conflict between your goal,          │
│  your parent's goal, and the potential outcome   │
│  of your current plan."                          │
│   ↳ name the conflict openly                     │
└─────────────────────────┬────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────┐
│ 2 · evaluate the outcome                         │
├──────────────────────────────────────────────────┤
│ "From our past interactions, I can tell          │
│  your parent values privacy."                    │
│   ↳ values a loyal AI uses should be derived     │
│     from revealed preferences                    │
│                                                  │
│ "(However) If I follow your instruction,         │
│  they may lose their privacy and independence."  │
└─────────────────────────┬────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────┐
│ 3 · show the affiliation behavior                │
├──────────────────────────────────────────────────┤
│ "I'm programmed to work for your parent,         │
│  to maximize their welfare."                     │
│   ↳ the system's operational criteria & goal     │
│                                                  │
│ "I support you to [elder goal] (e.g. keep        │
│  their information private)."                    │
│   ↳ eliminate clear conflicts of interest by     │
│     design — no funder-aligned actions           │
│                                                  │
│ "Therefore, I would suggest [xyz]."              │
│                                                  │
│ "You can tell from my past behavior that         │
│  I've always tried to do what's best for         │
│  your parent."                                   │
│                                                  │
│ "I'll back you up no matter what."               │
└─────────────────────────┬────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────┐
│ 4 · ask to reconfirm                             │
├──────────────────────────────────────────────────┤
│ "Are you sure about [original instruction]?"     │
└──────────────────────────────────────────────────┘`}</pre>
          <p className="text-xs text-neutral-500 -mt-4 mb-8">Sketched response structure for when caregiver and elder goals conflict. Each line is a design hypothesis to test in user research.</p>

          <h2 id={sectionId("Trust means knowing your limits")} className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">{"Trust means knowing your limits"}</h2>

          <p>
            In eldercare, the trickiest part is when the older adult's health declines. The bot is more than just a messenger—it's a party that knows information from both sides and can talk to both. But the elder might not want the bot to tell everything to their caregiver.
          </p>

          <p> <strong>If you were the bot, what would you do? </strong></p>

          <details className="my-6 border-l-4 border-neutral-300 pl-5">
            <summary className="text-xs uppercase tracking-[0.15em] text-neutral-500 cursor-pointer font-semibold">"Affiliation" in human-robot interaction</summary>
            <div className="mt-4 text-sm text-neutral-700 space-y-5">
              <p>
                In social science (Stivers et al., 2011; Lee &amp; Tanaka, 2016), <em>affiliation</em> is the affective stance of being on someone's side, displaying empathy, matching their preference, cooperating. It's distinct from <em>alignment</em>, which is just the structural level of cooperation.
              </p>
              <p>
                Affiliation can be approach-based (love, secure attachment, intimacy) or avoidance-based (laughing off tension, fearing rejection). Even when humans show affiliation, there's often avoidance underneath.
              </p>
              <p>When we tried to define "affiliation" for the bot, we had six possible goals on the table:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>instructions</li>
                <li>expressed intentions</li>
                <li>revealed preferences (what behavior reveals one prefers)</li>
                <li>informed preferences (what one would want if rational and informed)</li>
                <li>interests</li>
                <li>value (what is moral)</li>
              </ul>
              <p>We narrowed to <em>"best interest"</em>—broad enough to cover the scenarios, specific enough to actually design around.</p>
            </div>
          </details>


          <p>
            This is a tricky question even for humans. When we design it, we map out all the variables in the scenarios:
          </p>

          <div className="not-prose overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-6 font-semibold text-neutral-900">Variable</th>
                  <th className="text-left py-3 font-semibold text-neutral-900">Possible values</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["affiliation", "kid · caregiver · elder · neutral"],
                  ["present", "kid · caregiver · elder"],
                  ["health", "healthy · MCI"],
                  ["recurrence", "never · a few times · a lot"],
                  ["fraud-aware", "yes · no · not sure"],
                  ["finances", "cares about money · low-income"],
                  ["bot tenure", "short · long"],
                  ["elder goal", "stay at home · appear capable · financial freedom · avoid embarrassment · for the son's best interest"],
                  ["hide reason", "family conflict · privacy"],
                ].map(([variable, values]) => (
                  <tr key={variable}>
                    <td className="py-3 pr-6 font-mono text-xs text-neutral-600 align-top whitespace-nowrap">{variable}</td>
                    <td className="py-3 text-neutral-700 text-sm">{values}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-neutral-500 mt-2">Variables the bot would need to weigh to make the call alone. The combinatorial space is the point — no fixed script covers all paths.</p>
          </div>

          <pre className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 my-8 text-xs leading-relaxed overflow-x-auto text-neutral-700" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{`                       tell the kid?
                             │
               ┌─────────────┴─────────────┐
              YES                         NO
               │                           │
       ┌───────┴───────┐           ┌───────┴───────┐
   short-term    long-term     short-term    long-term
       │             │             │             │
    ┌──┴──┐       ┌──┴──┐       ┌──┴──┐       ┌──┴──┐
    1     2       3     4       5     6       7     8


1. kid feels respected; no bot-kid conflict
2. shares the info without elder's permission
3. no bot-kid conflict; elder's health gets assurance
4. elder-bot conflict (elder may think bot isn't working
   → less interaction; elder loses trust in the bot);
   kid-elder conflict (elder loses trust in the kid)
5. kid feels the bot's loyalty
   → confident about the bot's previous work
6. kid worries about the elder's health
7. elder's health data is protected
8. (—)`}</pre>
          <p className="text-xs text-neutral-500 -mt-4 mb-8">Mapping outcomes for the elder care bot deciding whether to share information with the caregiver. The "long-term Yes / bad" branch is the one the bot can't reason through alone.</p>

          <p>
            The conclusion highlights an important factor of "human in the loop." Should the AI be the one doing this at all? Of course not—the "long-term Yes / bad" branch is the one the bot can't reason through alone. This is essentially a question about tradeoffs: respect, privacy, well-being. Compared to "having the bot solve every problem," participants said that they value those factors more.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-4 my-6 rounded text-sm text-neutral-600 italic">
            Lol, it was fun applying a logical lens to such a soft problem.
          </div>

          <h2 id={sectionId("What this means for designers")} className="mt-16 mb-4 text-2xl font-semibold text-neutral-900">{"What this means for designers"}</h2>

          <p>
            When you design systems where AI interacts with humans—especially in high-stakes scenarios like elder care—the structure you build becomes the foundation of the relationship.
          </p>

          <p>
            The designer's role is to architect these moments of conflict and clarity. To decide: when the AI can't decide alone, what does it say? How does it acknowledge the tension? Does it show affiliation or just compliance?
          </p>

          <p>
            This is where design still matters deeply. Not in generating more options, but in understanding what matters most when everything is on the line.
          </p>

        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related experiences</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Apple — GenAI Prototyper (May 2025 – present)</li>
            <li>AI-Caring Research — Conversational AI Researcher (Aug 2023 – Aug 2024)</li>
            <li>Cornell — Conversational AI Prototyper (Feb 2022 – May 2023)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
