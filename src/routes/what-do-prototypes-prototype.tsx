import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/what-do-prototypes-prototype")({
  head: () => ({
    meta: [
      { title: "What do prototypes prototype" },
      {
        name: "description",
        content: "Prototyping as a research mindset, and designing to elicit errors rather than hide them.",
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Implementation</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            What do prototypes prototype?
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Prototyping as a research mindset, and why designing for errors matters more than hiding them.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>6 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Prototype = Research mindset</h2>

          <blockquote>
            Sometimes we keep using a solution not because it is the best one, but because we've used it for a long time.
          </blockquote>

          <p>
            The word "prototype" might have been automatically associated with a digital phone frame where people can click around. But we could actually expand the scope here: <strong>As creation itself becomes easier, prototypes can be any form of experiments used to test "what to create."</strong>
          </p>

          <p>
            But prototyping = research. It is essentially a mindset to test what to design. Prototypes can be anything that serves those goals:
          </p>

          <ul>
            <li>explore more directions</li>
            <li>test more interactions</li>
            <li>simulate more edge cases</li>
            <li>communicate ideas that used to be too expensive to build</li>
            <li>much more</li>
          </ul>

          <p>
            A lot of workflows exist simply because we inherited them. Let's use design thinking to pull ourselves out of the box.
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold">Not all prototypes need to be coded</h3>

          <p>
            Don't forget "paper prototyping" and "role play"! I remember I was testing a new human-AI interaction concept. It was more of a service design rather than product design, and product was only part of the experience. I was paired with a PM and an engineer, and during brainstorming I just drew some screen mockups on paper and invited them to role play:
          </p>

          <ul>
            <li><strong>Engineer</strong> → LLM</li>
            <li><strong>Me</strong> → Product</li>
            <li><strong>PM</strong> → User</li>
          </ul>

          <p>
            When we pitched it to the manager, we invited him to be the user. It quickly helped us navigate the intersection between UX and technology by putting ourselves in users' shoes and immersively analyzing the tech capability. And most importantly... it was so MUCH FUN!!
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Built to elicit errors</h2>

          <p>AI is never perfect (yet). Please.</p>

          <p>Maybe part of the reason is that AI was trained on human data, and humans are not that perfect either.</p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-4">Welcome to the adult world</div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', lineHeight: 1.7 }}>
              <li style={{ marginBottom: 8 }}>
                what one thinks <strong>≠</strong> what one says
              </li>
              <li style={{ marginBottom: 8 }}>
                what one says <strong>≠</strong> what one does
              </li>
              <li style={{ marginBottom: 0 }}>
                what one wants to express <strong>≠</strong> what others perceive
              </li>
            </ul>
          </div>

          <p>
            Therefore, an important part in designing AI products/experiences should be designing around errors:
          </p>

          <p>
            <strong>Where will it fail? Which failures are okay? How do we handle them?</strong>
          </p>

          <p>
            I was exploring this solution for a non-profit to address their "too many repetitive questions but not enough staff" pain point. It is an easy-inference case as there is already a pre-existing script to follow (closer to be rule-based).
          </p>

          <p>
            The special part was that the error intolerance was very low. The client was in a typically no-AI field, and the trust bonding between them and their customers is very important. Therefore, the design goal was not really to prove "AI works." It was to surface what could go wrong before it actually goes wrong.
          </p>

          <img
            src="/articles/testing-session.png"
            alt="Testing session — surfacing what could go wrong."
            className="w-full rounded-lg my-8 border border-neutral-200"
          />
          <p className="text-sm text-neutral-500 italic">Testing session — surfacing what could go wrong.</p>

          <div className="space-y-6 my-8">
            <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Error: Voice recognition breaks in noisy environments</h4>
              <p className="text-sm text-neutral-600 mb-2"><strong>How Might We:</strong> Help the user recover gracefully when the agent mishears?</p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Confirm-and-rephrase ("did you mean X?")</li>
                <li>• Retry on low confidence with simpler prompts</li>
                <li>• Fall back to keypad or text input</li>
              </ul>
            </div>

            <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Error: Users change their mind mid-flow</h4>
              <p className="text-sm text-neutral-600 mb-2"><strong>How Might We:</strong> Let users change direction without losing context?</p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Persistent "go back" or "update my answer"</li>
                <li>• Preserve state so a redirect doesn't restart the flow</li>
                <li>• Offer a "want to revise?" prompt at natural pauses</li>
              </ul>
            </div>

            <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Error: Some users reject AI entirely</h4>
              <p className="text-sm text-neutral-600 mb-2"><strong>How Might We:</strong> Make the handoff to a human feel like a feature, not a failure?</p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Set the agent's scope upfront ("I can help with X, Y, Z")</li>
                <li>• Always-visible path to a human</li>
                <li>• Pass context to the human agent so users don't repeat themselves</li>
              </ul>
            </div>
          </div>

          <blockquote>
            Sometimes the experience of recovering from an error matters more than preventing it.
          </blockquote>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related reading</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li><a href="/my-claude-code-research" className="font-medium hover:underline">My Claude Code research</a> — How AI can amplify thinking</li>
            <li><a href="/how-i-prototype" className="font-medium hover:underline">How I prototype</a> — Three types of prototypes</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
