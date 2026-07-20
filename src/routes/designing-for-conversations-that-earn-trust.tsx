import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/designing-for-conversations-that-earn-trust")({
  head: () => ({
    meta: [
      { title: "Making AI feel human" },
      {
        name: "description",
        content: "The designer's role in the AI era. What AI can't do, and where human judgment still matters.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Role</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Making AI feel human
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Humanity, in interfaces, is not about imitation. It's about what designers do that AI still can't.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>9 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-3xl">
          <p>
            At Apple, I ran a workshop for my design team fellows, a demo of what I'd been doing with Claude Code. I came in genuinely excited about what AI could enable. The team didn't feel it the same way. Someone asked, very seriously: <em>what do you think the value of designers should be, then?</em>
          </p>

          <p>That made me sad. Not about the question—it was the right question. The sadness was about the uncertainty in it. FOMO. That question has been in my head ever since.</p>

          <blockquote>
            Designing human–AI interaction is designing the human–AI <em>relationship</em>.
          </blockquote>

          <p>
            The interaction is what the user touches. The relationship is everything underneath: who defers, who interrupts, who ends the conversation, who learns from whose mistakes. That's the layer designers should focus on.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · The seat AI leaves open</h2>

          <p>
            The worry isn't "AI replaces designers." It's something quieter: <strong>designers don't step into the seat AI leaves open.</strong>
          </p>

          <p>
            I worked at an early-stage startup where I was wired directly into the codebase. I shipped to staging myself; my changes got merged to main every week. The team was all engineers, and they wanted a designer. Not despite AI. Because of it.
          </p>

          <p>
            The person who could move between two modes was the bottleneck, not either mode alone. They needed someone who could collaborate with the AI on implementation details while also holding the bigger picture: what should this be for? What's the person trying to do?
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0">You have to put yourself in an environment like that to feel the answer. Reading about it isn't the same. You have to ship code, see it break in production, fix it, and then see your fix break something else.</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · What AI can't do</h2>

          <p>
            After collaborating intensely with Claude Code, the limits became very specific. There are three things that stand out:
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">1. It doesn't stop</h3>

          <p>
            Prompt it to <em>"act as a world-class designer, critique the work, and then give suggestions based on the critique"</em> and it will keep going. It will critique, suggest, critique the suggestion, suggest again. Infinitely helpful, infinitely exhausting.
          </p>

          <p>
            Someone still has to decide: <strong>enough.</strong> That someone is still the human. Knowing when to stop is a human skill that doesn't have a proxy.
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">2. It generates options, not judgments</h3>

          <p>
            A navbar can be designed a hundred good ways. Which one is right depends on whether the tabs have dependencies, whether users navigate by keyboard, whether one client hits a particular button six times a day out of habit. I have a client who lives on the keyboard—Claude would never have thought of that because it's never watched them work.
          </p>

          <p>
            AI fills the distribution. It generates the options that a competent designer would consider. But it doesn't <em>judge</em> which one matters most. That judgment lives in context: the person, their situation, the hidden patterns in how they work.
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">3. It doesn't feel the consequences</h3>

          <p>
            It generates; it doesn't live inside the system afterwards. It doesn't notice a week later that the pattern it suggested is quietly producing support tickets. It doesn't pick up the subtle signals from a person—the hesitation, the habit, the context behind a decision.
          </p>

          <p>
            Experience over time is something only humans can have. Being in the system, noticing the effects of your decisions on real people, learning from those effects—that's lived knowledge. AI can simulate that knowledge, but it doesn't have it.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · The gap between doing and meaning</h2>

          <p>
            Here's the thing that I think designers should hold onto: there's a gap between what a person does and what they <em>meant</em> to do.
          </p>

          <p>
            A button in the wrong color might mean "I didn't care about accessibility." Or it might mean "I was rushing, distracted, hit by deadline pressure." A slow interaction might mean "I didn't understand the user's mental model." Or it might mean "I had to work around a technical constraint I didn't control."
          </p>

          <p>
            AI fills the fat middle of the distribution. It generates the most likely solutions. But the edges, where the real relationships live—where the gap between behavior and intention matters most—those are still yours.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Design principle</div>
            <p className="m-0"><strong>The edges are where design still matters.</strong> AI amplifies what works at scale. Designers understand what matters at the margins—the edges where a person's story becomes visible, where context becomes everything.</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">What this means</h2>

          <p>
            The designer's role in the AI era isn't about being faster or generating more options. It's about being <strong>more human</strong>: more attuned to context, more comfortable with ambiguity, more willing to sit with a person's actual situation instead of a representative user.
          </p>

          <p>
            It means spending time understanding why someone did what they did. It means noticing the hesitation in their voice when they describe a feature. It means tracking what happens when the feature ships and being willing to change it based on what you learn.
          </p>

          <p>
            AI is your partner now. It's good at generating, iterating, exploring options. You're good at judging, holding patterns in context, understanding what a person actually needs even when they can't articulate it.
          </p>

          <p>
            The question I got asked at Apple—<em>what do you think the value of designers should be?</em>—the answer isn't "designers still matter." It's more specific than that.
          </p>

          <p>
            <strong>Designers matter because they care about the gap.</strong> They notice it. They sit with it. They don't try to close it algorithmically. They understand that in that gap—between what is and what was meant—there's still humanity.
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
