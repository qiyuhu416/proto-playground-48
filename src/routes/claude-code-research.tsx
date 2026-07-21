import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/claude-code-research")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Building and evolving development tools powered by AI assistance.",
      },
    ],
  }),
  component: ResearchComponent,
});

function ResearchComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["claude-code-research"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Building and evolving development tools powered by AI assistance.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Tools</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            Claude Code represents an experiment in how AI can augment the software development
            process. This research documents the evolution of these tools and the insights gained
            from building them.
          </p>

          <TableOfContents />

          <h2 id="mission" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Mission</h2>
          <p>
            To explore how AI can be a true thinking partner for developers, not just a code
            completion tool. The goal is to make development faster, more enjoyable, and focused
            on higher-level problem solving.
          </p>

          <h2 id="key-learnings" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Learnings</h2>
          <ul>
            <li>Context is everything—the better the AI understands the codebase, the better it helps</li>
            <li>Developers value explainability—understanding why AI made a choice matters</li>
            <li>Iteration cycles are critical—first-pass AI output is rarely production-ready</li>
            <li>Different developers need different interaction styles and levels of autonomy</li>
          </ul>

          <h2 id="what-ai-can-t-do" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · What AI can't do</h2>

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

          <h2 id="don-t-let-ai-bypass-your-thinking" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · Don't let AI bypass your thinking</h2>

          <p>
            A lot of things about AI are unteachable lessons — just go and try it out. And you may find it addictive.
          </p>

          <p>
            The real problem seems to be how to face our FOMO, and find the space where AI leaves room. So sharing two things I've said in sharing sessions:
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">1. You either use AI to amplify your thinking, or become the human agent executing for AI</h3>

          <p>
            There were moments where I would prompt Claude Code with something like "You are a world-class designer. Analyze this problem, give me options, critique those options, and improve them based on your critique."
          </p>

          <p>
            Honestly, that feels awful. I was too eager to want that productivity, to trade my own brain. And sometimes we took a long loop, going back to the original point. Intentionally. Practice. To urge. Your impulse. To get that efficiency.
          </p>

          <img
            src="/articles/ai-fatigue.png"
            alt="AI fatigue visualization"
            className="w-full rounded-lg my-8 border border-neutral-200"
          />

          <h3 className="mt-8 mb-4 text-lg font-semibold">2. Don't chase the tool</h3>

          <p>
            One funny thing about AI tools I saw from a meme: <strong>"If you learn AI slowly enough, sometimes you realize you didn't even need to learn the majority of them."</strong>
          </p>

          <p>
            Things are moving so fast. For a while everyone talked about prompt engineering, Claude Code tricks (like `/compact` or `skills.md`). Then a few months later, the product abstracts half of it away:
          </p>

          <ul>
            <li>stuff gets baked into the models</li>
            <li>automatic context handling</li>
          </ul>

          <p>
            Right now: sometimes I use tools like Stitch for fast brainstorming. Sometimes I go back to Figma because visual sketches help the LLM understand direction better. Sometimes I prototype directly in code.
          </p>

          <p>
            Languages change. Frameworks change. Interfaces change.
          </p>

          <p>
            You see, this whole process is a prototype. We are all in the prototyping phase of human–AI interaction.
          </p>

          <h2 id="evolution" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Evolution</h2>
          <p>
            The tools continue to evolve based on real developer feedback and usage patterns. Each
            iteration pushes the boundaries of what's possible when humans and AI work together on
            code.
          </p>

          <p>
            The future of development tools isn't about fully automated systems—it's about better
            collaboration, better understanding, and better ways to capture intent while keeping the human at the center of the thinking process.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related reading</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li><a href="/what-do-prototypes-prototype" className="font-medium hover:underline">What do prototypes prototype?</a> — Research mindset & error handling</li>
            <li><a href="/designing-for-conversations-that-earn-trust" className="font-medium hover:underline">Making AI feel human</a> — Designer role in the AI era</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
