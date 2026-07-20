import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/think")({
  head: () => ({
    meta: [
      { title: "Think — Models & reflections" },
      {
        name: "description",
        content: "Mental models, thinking frameworks, and written reflections on design and prototyping.",
      },
    ],
  }),
  component: ThinkComponent,
});

function ThinkComponent() {
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
                  (l === "Think"
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

      {/* Mental models section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Mental models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "The what-if space",
              description: "Prototyping as exploration of possibility",
              diagram: "◇",
            },
            {
              title: "Capability vs. UX",
              description: "Mapping technology to human experience",
              diagram: "⟷",
            },
            {
              title: "Friction & delight",
              description: "Where design actually lives",
              diagram: "≈",
            },
            {
              title: "Context over features",
              description: "Why what matters depends on when",
              diagram: "◉",
            },
          ].map((model) => (
            <div
              key={model.title}
              className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4 opacity-30">{model.diagram}</div>
              <h3 className="font-medium text-lg text-neutral-900 mb-2">{model.title}</h3>
              <p className="text-neutral-600">{model.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog/Writing section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Writings</h2>
        <div className="space-y-4">
          {[
            {
              title: "What do prototypes prototype?",
              excerpt: "A reflection on what we're actually testing when we prototype.",
              date: "Apr 2026",
              readTime: "8 min",
            },
            {
              title: "How I use AI to create",
              excerpt: "Prototyping as research, and why AI should augment—not replace—thinking.",
              date: "Apr 2026",
              readTime: "5 min",
            },
            {
              title: "Making design fun",
              excerpt: "On curiosity, vibe-coding, and why creation should feel like play.",
              date: "Apr 2026",
              readTime: "5 min",
            },
            {
              title: "Designing Next-Gen AI Products",
              excerpt: "Mapping UX to capability. Lessons from conversational AI and human-AI co-writing.",
              date: "Apr 2026",
              readTime: "8 min",
            },
            {
              title: "Cheap edges, expensive corners",
              excerpt: "Where quality actually accrues in an interface.",
              date: "Apr 2026",
              readTime: "5 min",
            },
          ].map((article) => (
            <a
              key={article.title}
              href="/"
              className="block rounded-lg border border-neutral-200 p-4 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900">{article.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{article.excerpt}</p>
                  <div className="mt-2 flex gap-2 text-xs text-neutral-500">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <span className="text-neutral-400">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
