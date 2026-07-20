import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/physical-ai")({
  head: () => ({
    meta: [
      { title: "Physical AI" },
      {
        name: "description",
        content: "Exploring AI beyond screens—how intelligent systems interact with the physical world.",
      },
    ],
  }),
  component: PhysicalAIComponent,
});

function PhysicalAIComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-2xl px-6 py-12">
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
            Physical AI
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Exploring AI beyond screens—how intelligent systems interact with and shape the physical world.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>Research · Physical Design</span>
            <span className="text-neutral-300">·</span>
            <span>Embodied AI</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Beyond the Screen</h2>
          <p>
            Most AI interactions happen on screens—keyboards, touchscreens, voice assistants. But what happens when AI moves into the physical world? When it shapes spaces, objects, and experiences in ways we touch, move through, and inhabit?
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Exploration</h2>
          <p>
            This research explores the intersection of intelligent systems and physical design. It's about understanding how AI can be embedded in furniture, architecture, wearables, and environments—and what responsibilities that creates for designers and builders.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Design Challenges</h2>
          <ul>
            <li>How do we make AI presence felt without being intrusive?</li>
            <li>What does transparency look like in a physical object?</li>
            <li>How do people interact differently with AI when it's embodied versus distributed?</li>
            <li>What ethical considerations emerge when AI shapes shared spaces?</li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">The Full Story</h2>
          <p>
            For a deeper dive into this exploration and the Strange Design project, visit the full post:
          </p>
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <a
              href="https://www.linkedin.com/posts/tantara_its-a-wrap-for-the-inaugural-strange-design-ugcPost-7229713649941028865-kYh4/?utm_source=share&utm_medium=member_desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-neutral-900 hover:underline"
            >
              Strange Design Project on LinkedIn
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
