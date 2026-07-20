import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play — Experiments & creative work" },
      {
        name: "description",
        content: "Vibe-coding projects, playful experiments, and creative explorations.",
      },
    ],
  }),
  component: PlayComponent,
});

function PlayComponent() {
  const renderCard = (project: any) => (
    <a
      key={project.slug}
      href={project.external ? project.external : `/${project.slug}`}
      target={project.external ? "_blank" : undefined}
      rel={project.external ? "noopener noreferrer" : undefined}
      className="group relative overflow-hidden rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-neutral-200/60 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] block"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
        {project.image ? (
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500/80">
            {project.category}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.meta}</span>
        </div>
        <h3 className="mt-1 text-[15px] font-medium text-neutral-900">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{project.description}</p>
      </div>
    </a>
  );

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <a href="/" className="flex h-9 w-9 items-center justify-center text-neutral-900">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
          </svg>
        </a>
        <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {(["Work", "Play", "Think", "Listen"] as const).map((l) => {
            return (
              <a
                key={l}
                href={l === "Work" ? "/" : `/${l.toLowerCase()}`}
                className={
                  "rounded-full px-4 py-1.5 text-sm transition-colors " +
                  (l === "Play"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900")
                }
              >
                {l}
              </a>
            );
          })}
        </nav>
        <div className="h-9 w-9" />
      </header>

      {/* Hero section with scattered photos */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 overflow-hidden">
          {/* Placeholder for scattered photos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-neutral-600">Scattered moments & playful explorations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Human-Human Interaction Prototypes */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 mb-2">Human-human interaction prototypes</h2>
          <p className="text-neutral-600 text-sm">Exploring how people connect, share, and collaborate in unexpected ways</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Hello Humans—async notebook",
              description: "A stand with a notebook where colleagues write messages. Sometimes I start with a prompt, sometimes I let people surprise me. A low-pressure experiment in human-human async interaction.",
              category: "Interaction",
              meta: "Social · Analog",
              image: "/articles/hello-humans-notebook.jpg",
            },
            {
              title: "Paper exchange—social proof",
              description: "I shared my favorite research papers and invited colleagues to take one and leave one. A playful way to discover what people are reading and thinking about.",
              category: "Experiment",
              meta: "Research · Social",
              image: "/articles/paper-exchange.jpg",
            },
            {
              title: "Meet the stranger challenge",
              description: "A simple post with a Calendly link: 'Hi all, I'm running a small experiment.' No agenda, just conversation. A real-time experiment in how people connect.",
              category: "Experiment",
              meta: "Connection · Open-ended",
              image: "/articles/meet-stranger.png",
            },
          ].map((project) => renderCard(project))}
        </div>
      </section>

      {/* Qiyu-Technology Interaction */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-neutral-900 mb-2">Qiyu–technology interaction</h2>
          <p className="text-neutral-600 text-sm">Vibe-coding projects and creative explorations with code and tools</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Hand gesture interactions",
              description: "Exploring how gesture recognition can make AI feel more natural and human.",
              slug: "hand-gesture-interactions",
              category: "Look & Feel",
              meta: "Motion · Video",
              image: "/articles/hand-gesture-thumb.jpg",
            },
            {
              title: "Making design fun",
              description: "Caltrain, After Effects, and why vibe-coding is the future of creation.",
              slug: "making-design-fun",
              category: "Look & Feel",
              meta: "Collection · 5 sections",
            },
            {
              title: "Motion experiments",
              description: "Playful animations exploring physics and timing.",
              slug: "motion-experiments",
              category: "Look & Feel",
              meta: "Animation",
            },
            {
              title: "Generative visuals",
              description: "Code-driven art pieces that evolve over time.",
              slug: "generative-visuals",
              category: "Look & Feel",
              meta: "Creative coding",
            },
            {
              title: "Interactive sketches",
              description: "Experiments with gesture and real-time input.",
              slug: "interactive-sketches",
              category: "Look & Feel",
              meta: "Interaction",
            },
            {
              title: "Type play",
              description: "Text transformations and typographic experiments.",
              slug: "type-play",
              category: "Look & Feel",
              meta: "Typography",
            },
          ].map((project) => renderCard(project))}
        </div>
      </section>
    </div>
  );
}
