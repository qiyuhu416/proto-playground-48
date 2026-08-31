import { createFileRoute } from "@tanstack/react-router";
import { ArticleHeader } from "./-ArticleHeader";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, Bold, OutcomeSection, ContextBox } from "@/components/ArticleContent";

export const Route = createFileRoute("/reimagining-the-chatbot")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Exploring how prompts reshape design workflows—generative design meets human intent.",
      },
    ],
  }),
  component: CollectionComponent,
});

function CollectionComponent() {
  const explorationTabs = [
    {
      id: "select-fill",
      title: "AI helps you form the question",
      subtitle: "awareness",
      description: "Can AI reduce the work of prompt-writing without taking away your control?",
      src: "/articles/chatbot-select-fill.mp4",
      alt: "AI helps form the question exploration",
      type: "video" as const,
      children: null,
    },
    {
      id: "browsing",
      title: "Chat lives inside browsing",
      subtitle: "browsing & awareness combined",
      description: "What if collecting context is part of the interaction, rather than something you have to reconstruct afterward?",
      src: "/articles/chatbot-always-here.mp4",
      alt: "Chat inside browsing exploration",
      type: "video" as const,
      children: null,
    },
    {
      id: "ai-asks",
      title: "AI asks for you",
      subtitle: "comprehend",
      description: "Users don't know what to ask, so why not have AI ask on their behalf?",
      src: "/articles/ai-ai-interaction.mp4",
      alt: "AI asks for you exploration",
      type: "video" as const,
      children: null,
    },
  ];

  return (
    <ArticleLayout>
      <ArticleHeader
        title={ARTICLE_META["reimagining-the-chatbot"].title}
        meta="Collection · Design System"
        heroImage="/articles/chatbot-thumb.png"
        heroAlt="Reimagining the chatbot"
      />

      <ArticleContent>

          <ContextBox
            summary={
              <>
                <p>This collection was inspired by my work at Apple. While I can't directly show the work there because of NDA, I'm sharing some personal explorations around designing AI that meets users where they are.</p>
                <p>Users often don't know what to ask an AI. Yet most AI products still wait inside a chat tab for the user to initiate. This collection explores different relationships between a person and an AI system.</p>
              </>
            }
          />

          <ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>

          <p>
            The first step of thinking outside the box is to realize where the box is. There is a cool model called "task analysis" that helped me break out "mundane" interaction into detailed steps.
          </p>

          <img
            src="/articles/task-analysis-flow.png"
            alt="Six-step task analysis flow for asking a question"
            className="w-full rounded-2xl my-6 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic mb-6">
            A user's interaction with a chatbot involves six distinct steps—each with its own friction points and assumptions.
          </p>

          <p>
            I saw there are a lot of assumptions hidden in this flow:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-neutral-700 mb-6">
            <li><span className="font-bold">Awareness</span> - User forms the awareness of what to ask - assumption: user knows clearly what to ask</li>
            <li><span className="font-bold">Expression</span> - User the conversation by expressing the question - assumption: user express through typing (or clicking on the prompt buttons)</li>
            <li><span className="font-bold">Processing</span> - User waits for AI to generate response - assumption: waiting is boring</li>
            <li><span className="font-bold">Reception</span> - User realizes the AI finished process</li>
            <li><span className="font-bold">Interpretation</span> - User understands AI response</li>
          </ol>

          <img
            src="/articles/task-assumptions.png"
            alt="Assumptions made at each step of the interaction"
            className="w-full rounded-2xl my-6 border border-neutral-200"
          />

          <p className="text-sm text-neutral-500 italic mb-6">
            Every step carries hidden assumptions about what users know, what the system can do, and how they work together.
          </p>

          <p>
            Once I wrote those assumptions down, the design space became much bigger. Instead of asking <Bold>"how do we redesign the chatbot?"</Bold>, I could ask: <Bold>which part of this interaction flow doesn't have to exist at all?</Bold>
          </p>

          <OutcomeSection
            id={sectionId("Explorations")}
            title="Explorations"
            tabs={explorationTabs}
            variant="gallery"
            aspectRatio={1.78}
          />

          <ArticleHeading2 id={sectionId("So what's next after those concepts?")}>So what's next after those concepts?</ArticleHeading2>

          <p>
            Prototypes, in my opinion, serve two goals:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-neutral-700 mb-6">
            <li>Produce knowledge or principles</li>
            <li>Be turned into production</li>
          </ol>

          <p>Those goals need different next steps.</p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">If the goal = production: run more controlled experiments</h3>

          <p>
            More business-related factors need to be considered.
          </p>

          <p>
            For example, in scenarios where intrusiveness matters, we need to be careful about <Bold>to what extent AI feels proactive versus intrusive in assisted browsing.</Bold>
          </p>

          <p>
            I created an interactive prototype with Claude Code and tested it using Wizard of Oz. A control panel let me adjust the metrics that defined when and how proactive the AI should be.
          </p>

          <p>
            The implication was: <Bold>don't go with proactivity for now. First, explore better ways to collect contextual data.</Bold>
          </p>

          <p>
            The interesting design problem became less about making AI proactively pop up, and more about <Bold>what information it needs before that behavior feels justified.</Bold>
          </p>

          <h3 className="mt-12 mb-4 text-lg font-semibold">If the goal = knowledge: look for reusable principles</h3>

          <p>
            There is one design-thinking model I really like: the <Bold>analysis–synthesis model</Bold>. It taught me not to just look at each concept individually, but to derive common themes across them—and then brainstorm again based on those themes.
          </p>

          <p>
            Across these explorations, a few things kept coming back: make uncertainty visible, preserve user agency, design recovery as carefully as the happy path, and choose the interface based on the task instead of defaulting to chat.
          </p>

          <p>
            Given those are the actual goals, the "chatbot" is probably just the <Bold>current interface</Bold>—one of many possible solutions.
          </p>

          <p>
            More to come. And hopefully, as the technology changes, we get more room to imagine what those other solutions could be.
          </p>

      </ArticleContent>
    </ArticleLayout>
  );
}
