import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/how-i-prototype")({
  head: () => ({
    meta: [
      { title: "How I prototype" },
      {
        name: "description",
        content: "Three types of prototypes as a collaboration tool. A mindset for learning, exploring, and building together.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            How I prototype
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Prototypes can be a collaboration tool. Three types of prototypes, three different purposes, one shared mindset: learning through making.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Methodology · Design Practice</span>
            <span className="text-neutral-300">·</span>
            <span>Under NDA</span>
          </div>
        </div>

        <img
          src="/articles/how-i-prototype.png"
          alt="Three types of prototypes as collaboration tools"
          className="w-full rounded-2xl mb-16 border-4 border-neutral-900"
        />

        <div className="prose prose-neutral max-w-4xl">
          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <p className="m-0"><strong>Note:</strong> The specific projects and context are under NDA. This article focuses on the mindset and framework that guides how I approach prototyping across different scenarios.</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Prototypes aren't just outputs</h2>

          <p>
            Most people think of prototypes as deliverables—the thing you show at the end. But I think of prototypes as a thinking tool. A way to have conversations. A way to test assumptions. A way to learn.
          </p>

          <p>
            Over time, I've noticed I build three distinct types of prototypes, each serving a different purpose in the process. Each one is useful at different moments, with different audiences, for different questions.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§1 · Explore "what-if"s</h2>

          <p>
            <strong>Purpose:</strong> To wonder. To play. To expand the solution space before narrowing it.
          </p>

          <p>
            This is the early stage where you're not sure what's possible. You build these prototypes to answer your own questions: "What if we tried this? What if the interaction worked like that? What if the user could do X instead of Y?"
          </p>

          <div className="space-y-4 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Coach Personalization</h4>
              <p className="text-sm text-neutral-600">Prototypes that explore how a system could adapt to individual needs. How do you make something feel personal without being intrusive?</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Stitched Prototype</h4>
              <p className="text-sm text-neutral-600">Quick combinations of existing pieces to simulate a future experience. Low-fidelity, fast iteration, focused on the flow not the polish.</p>
            </div>
          </div>

          <p>
            These prototypes are messy. They're half-baked. They're meant to be. You're exploring adjacent possibilities, not perfecting one path.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§2 · Explain the prototype</h2>

          <p>
            <strong>Purpose:</strong> To understand. To get feedback. To see how others interpret what you've built.
          </p>

          <p>
            Once you've narrowed the solution space, you build a prototype that's polished enough to share. This is where you learn from observation—watching how people interact with it, what they misunderstand, what surprises them.
          </p>

          <div className="space-y-4 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Observe how others think</h4>
              <p className="text-sm text-neutral-600">The prototype becomes a research tool. You're not testing if it works—you're testing if it communicates what you intended. The gap between your intention and their understanding is where insight lives.</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Analyze my unknown-unknowns</h4>
              <p className="text-sm text-neutral-600">What didn't you think to test? What assumptions were you making that turned out to be wrong? The prototype reveals the edges of your thinking.</p>
            </div>
          </div>

          <p>
            This is where prototypes become collaborative. You're not defending your idea; you're using the prototype as a mirror to see what you missed.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">§3 · For others to prototype</h2>

          <p>
            <strong>Purpose:</strong> To enable. To hand over control. To let others build on your foundation.
          </p>

          <p>
            The most interesting prototypes are the ones that become tools for other people to explore with. You've done enough work to establish the pattern, the constraints, the possibilities—now others can iterate within that space.
          </p>

          <div className="space-y-4 my-8">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Control Panel</h4>
              <p className="text-sm text-neutral-600">A prototype that exposes the variables. Let stakeholders change parameters and see the impact. This is how you move from "here's my idea" to "here's the space we can explore together."</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">Claude Code Design Agent</h4>
              <p className="text-sm text-neutral-600">A prototype that can be extended. When the tool itself becomes part of the exploration—when others can use it to test their own what-ifs—that's when the real collaboration begins.</p>
            </div>
          </div>

          <p>
            These prototypes work best when they're flexible, well-documented, and handed over with permission to break them.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The shared mindset</h2>

          <p>
            What connects all three types is a belief: <strong>learning happens through making.</strong>
          </p>

          <p>
            Whether you're exploring alone, testing with others, or enabling collaboration, the prototype is always a thinking tool. It's the artifact that lets you ask questions you couldn't ask with words alone. It's the way to say "what if" and actually see the answer.
          </p>

          <div className="bg-neutral-50 border-l-4 border-neutral-300 p-6 my-8 rounded">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">Core principle</div>
            <p className="m-0">A prototype is not a deliverable. It's a conversation starter. The quality of the conversation—not the polish of the prototype—determines its value.</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Why this matters</h2>

          <p>
            In fast-moving projects with ambiguous requirements, prototypes are how you stay grounded. They prevent you from disappearing into abstraction. They keep the conversation concrete.
          </p>

          <p>
            Every time you build a prototype, ask yourself: Which type am I building? Who is this for? What question am I trying to answer? If you can answer those, you'll know when you're done and what to do next.
          </p>

          <p>
            The prototypes themselves might be temporary. But the conversations they enable, the learning they surface, and the decisions they inform—those ripple forward.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related practices</div>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>Design Research — Using prototypes as research tools</li>
            <li>Collaborative Design — Prototypes as conversation starters</li>
            <li>Rapid Iteration — Quick cycles, visible learning</li>
            <li>Stakeholder Alignment — Making assumptions visible</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
