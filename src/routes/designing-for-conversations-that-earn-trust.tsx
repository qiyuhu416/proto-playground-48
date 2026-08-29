import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, ArticleHeading3, HighlightedText } from "@/components/ArticleContent";

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
        <ArticleHeader
          title={ARTICLE_META["designing-for-conversations-that-earn-trust"].title}
          meta="Bot for Multi-Stakeholder Eldercare"
          heroImage="/articles/conversation-trust-icon.svg"
          heroAlt="Conversation design for trust"
        />

        <DynamicIslandTOC />

        <ArticleContent>

          <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>

          <p>
            This was a research project at AI Caring Institute, where I worked as a research assistant with Mai Lee. Funny enough, two years later, we ended up at the same company :)
          </p>

          <p>
            Mai initiated the topic of AI for eldercare, and I worked with her end to end—from narrowing the research question to field research, analysis, and drafting the analysis section of the paper.
          </p>

          <p>
            The paper didn't get published, but I am writing this article to debrief and share my learning from that one year, getting into the weeds—talking to people at the senior center and learning how complex eldercare becomes when you look at actual human lives.
          </p>

          <p>
            So this is less a traditional case study and more me sharing what I learned about research, human-AI relationships, and humans. Per policy, I can't directly share the research data, so the examples below come from my desktop research and personal reflections/notes after field research.
          </p>

          <ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>

          <p>
            Designing human-AI conversations starts with designing the <strong>human-AI relationship</strong>.
          </p>

          <p>
            This project explored AI as a caregiver, a.k.a <strong>human-human-human-human-AI interaction</strong>. The tricky parts are:
          </p>

          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li>There are many stakeholders, and their interests can conflict. An older adult might not want to tell their caregiver everything, while that same information could be important to their care.</li>
            <li>An older adult's health may decline, to a point where they may not remember what they said, or no longer be able to make certain decisions independently.</li>
          </ol>

          <p>
            So if a bot enters this dynamic—and potentially knows information from all sides—<HighlightedText>who should it be affiliated with? How does it earn trust? And at what point should that affiliation change?</HighlightedText>
          </p>

          <p>
            In social science, <em>affiliation</em> is the affective stance of being on someone's side—distinct from <em>alignment</em>, which is just structural cooperation. Designing this requires understanding what it means to be loyal to one party while respecting another's autonomy.
          </p>

          <ArticleHeading2 id={sectionId("Outcome")}>Outcome</ArticleHeading2>

          <p>
            Just like human-human conversations, human-AI conversational design is not only about <em>what the bot says</em>. It is also about the higher-level interaction flow and the decision logic behind it—what makes the bot <HighlightedText>feel</HighlightedText> trustworthy in the first place.
          </p>

          <ArticleHeading3>1. Building trust is the foundation of showing affiliation—and trust can be scripted</ArticleHeading3>

          <p>
            Through literature review, I proposed a conversational framework about what the bot could do when caregiver and elder goals conflict:
          </p>

          <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-8 my-8">
            <pre className="text-xs leading-relaxed overflow-x-auto text-white" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{`┌──────────────────────────────────────────────────┐
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
          </div>

          <ArticleHeading3>2. Trust doesn't always positively correlate with perceived capability</ArticleHeading3>

          <p>
            In some situations, an AI saying <strong>"I'm not capable of providing that support"</strong> could create more trust than confidently trying to answer everything.
          </p>

          <p>
            That led to another question I found really interesting: <strong>When should the bot say, "I don't know"?</strong>
          </p>

          <p>
            We mapped different scenarios into a decision tree and looked at the variables that could change the outcome.
          </p>

          <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-6 my-8 overflow-x-auto">
            <pre className="text-xs leading-relaxed text-white" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{`Scenario: An older adult had a fall
Question: Should the bot tell their kids?

              ELDER PREFERENCE  |  HEALTH STATUS  |  DISTANCE
───────────────────────────────────────────────────────────────
Wants privacy      Private    |   Recovering    |   Nearby
                                   → Tell gradually

Wants privacy      Private    |   Declining     |   Far away
                                   → Tell immediately

Wants transparency Share      |   Any status    |   Any
                                   → Tell + explain

Unclear preference Unknown    |   Critical      |   Any
                                   → Tell + support

Each scenario requires different communication strategies
from the bot to maintain both trust and safety.`}</pre>
          </div>

          <ArticleHeading2 id={sectionId("Implications")}>What it means for future human-robot interaction design</ArticleHeading2>

          <p>
            One learning I still think about: maybe the goal isn't to make AI feel as capable as possible. It is to make its <HighlightedText>capability and boundaries understandable</HighlightedText>—what it can do, what it can't do, and when a human should be involved.
          </p>

          <p>
            And one nuance is that transparency doesn't mean constantly reminding people that the AI is limited. It still needs to feel supportive. The design question to answer is <strong>how to be helpful without pretending to have authority the AI doesn't have.</strong>
          </p>

          <ArticleHeading2 id={sectionId("Process")}>My Role & Research Process</ArticleHeading2>

          <ArticleHeading3>1. Desktop research: this field involved so many stakeholders!</ArticleHeading3>

          <p>
            Before this project, what I knew about eldercare mostly came from personal experience. Research forced me to zoom way out first, then narrow back down.
          </p>

          <p>
            During the diverging phase, I saw the care ecosystem varies across countries, cultures, age, and private/public healthcare systems.
          </p>

          <p>
            Then we narrowed the scope. I created a map to summarize who is involved, what decisions they make together, and where their interests might conflict.
          </p>

          <ArticleHeading3>2. Designing the Research-through-Design process, with storyboards as the medium</ArticleHeading3>

          <p>
            Inspired by Prof. John Zimmerman's work on Research through Design, we used storyboards to visualize those scenarios with different levels of bot involvement.
          </p>

          <p>
            I really liked this method because it moved the conversation away from <strong>"what should the chatbot screen look like?"</strong> toward <strong>"what role should the bot play here?"</strong>
          </p>

          <p>
            We also used a speed-dating research method: 10 storyboards across 5 scenarios, with 2 levels of bot involvement for each. Participants saw them in randomized order and reacted quickly. The goal of this process was to elicit their discussions about <strong>How involved should the bot be—and does that answer change depending on the situation?</strong>
          </p>

          <ArticleHeading3>3. Talking to real humans @ Vintage Center was my favorite part</ArticleHeading3>

          <p>
            I got a badge that said <strong>"special visitor,"</strong> an assigned room at the senior center, and took turns with Mai interviewing 10+ older adults.
          </p>

          <p>
            This was my favorite part.
          </p>

          <p>
            It was mixed-method research. So I started with personal stories, then showed participants the storyboards and asked, <strong>"What would you want the bot to do in this scenario?"</strong>, and ended with a survey about how comfortable they felt with different levels of bot intervention.
          </p>

          <p>
            And this is a funny thing about HCI research: you can design the research method perfectly, and then humans just...don't follow it. This happened a lot in these interviews. People went on side stories, and Mai Lee sometimes helped steer us back (thank her).
          </p>

          <p>
            But honestly, those "side topics" were also why I loved HCI research.
          </p>

          <p>
            I felt a little like a journalist trying to enter another person's world. The interviews covered topics like living wills, trust circles, relationships with kids -- all were very personal parts of someone's life. Every story had nuance. As a researcher, I thought my job was to find common themes and turn them into a decision tree: <em>when a person does X, maybe the bot should do Y.</em>
          </p>

          <p>
            But humans don't really work like decision trees. There are situations like an older adult met a life friend through school and passed on the living will to them rather than the kids, or have different relationship with different kids due to many many uncontrollable reasons.
          </p>

          <p>
            That became one of my biggest learnings: <strong>don't design away the nuance just because it is hard to model.</strong> Some human factors should stay human, and sometimes the most trustworthy thing a bot can say is simply, <strong>"I'm not capable of providing that support."</strong>
          </p>

          <ArticleHeading3>4. Affinity-cluster the results—but I might choose a different analysis method if I did it again</ArticleHeading3>

          <p>
            After the interviews, we (Mai Lee, another co-author, and I) affinity-clustered participants' responses to look for patterns across scenarios.
          </p>

          <p>
            About a year later, I was reflecting on this analysis with Mai Lee @Apple Park, Cupertino:
          </p>

          <p className="italic">
            <strong>Me:</strong> "Affinity clustering was such a common method I was taught in school for qualitative research. But could it be biased? It's so manual, there is so much data—what if there were some really good insights we all overlooked?"
          </p>

          <p className="italic">
            <strong>Mai Lee:</strong> "Yes that every research method has limitations, so understanding those constraints is important."
          </p>

          <p>
            But she also reminded me that the goal of affinity clustering wasn't to directly derive <em>the answer</em>. It was a tool to help us <strong>humans</strong> debrief, notice patterns, and point toward new directions.
          </p>

          <p>
            Now in year of 2026, I see AI as a research tool. I even saw that FigJam has an AI clustering feature.
          </p>

          <p>
            But that conversation with Mai Lee made me think <strong>maybe the point of affinity clustering isn't the cluster itself. Maybe the point is the conversation humans have while clustering.</strong>
          </p>

          <p>
            If AI can cluster 500 sticky notes in seconds, that was great but I don't necessarily want it to skip the part where researchers argue, remember something a participant said, question a theme, and realize, "wait, maybe this means something else."
          </p>

          <ArticleHeading2 id={sectionId("Reflections")}>To my future self</ArticleHeading2>

          <p>
            I'm writing this at 10:07 a.m. on Aug 29, 2026. It's been almost two years, and I still really love the part of HCI research that involved humans:
          </p>

          <p>
            <strong>Research about Humans:</strong> Designing human-AI interaction still start with understanding human-human interaction.
          </p>

          <p>
            <strong>Research by humans:</strong> Maybe AI can help us see what we overlooked, but Humans do the meaning-making.
          </p>

          <p>
            Before this project, I had been an RA in two other labs studying human-robot conversation. Both focused more on <strong>how a robot sounds</strong>:
          </p>

          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>Robot as a teammate:</strong> when it should chime into a human conversation, and what kind of sound it should use.</li>
            <li><strong>Robot giving a command:</strong> how pitch, tone, and word choice—especially in emergencies—change perceived urgency.</li>
          </ul>

          <p>
            This project made me zoom out from <em>how the robot talks</em> to something I now find much more interesting:
          </p>

          <p>
            <strong>What relationship does the robot have with the humans in the first place?</strong>
          </p>

          <p>
            There is so much to learn. Humans are interesting.
          </p>

        </ArticleContent>

      </article>
    </div>
  );
}
