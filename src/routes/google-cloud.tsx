import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/google-cloud")({
  head: () => ({
    meta: [
      { title: "Google Cloud - Conversational AI" },
      {
        name: "description",
        content: "Designing conversational interfaces for cloud services and AI-powered workflows.",
      },
    ],
  }),
  component: ProjectComponent,
});

function ProjectComponent() {
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
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Project</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            Google Cloud - Conversational AI
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Designing conversational interfaces for cloud services and AI-powered workflows.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>External project</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <div className="prose prose-neutral max-w-2xl">
          <p>
            This project explores how conversational interfaces can make complex cloud services more
            accessible to developers and organizations.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Overview</h2>
          <p>
            The challenge was to design a conversational AI interface that could guide users through
            Google Cloud's vast ecosystem of services while maintaining clarity and preventing user
            errors.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Key Insights</h2>
          <ul>
            <li>Users prefer natural conversation over form-filling for complex configurations</li>
            <li>Context preservation across multiple turns significantly improves task completion</li>
            <li>Clear boundaries between what AI can and cannot do builds user confidence</li>
            <li>Progressive disclosure of options prevents cognitive overload</li>
          </ul>

          <p>
            Visit the{" "}
            <a href="https://www.key-you-who.com/projects/google-cloud" className="text-primary hover:underline">
              full project page
            </a>{" "}
            for more details.
          </p>
        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Learn more</div>
          <a href="https://www.key-you-who.com/projects/google-cloud" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            View full project →
          </a>
        </div>
      </article>
    </div>
  );
}
