import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, LayoutGrid, Wrench, Sparkles, UserRound, FileText, Box } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "What do prototypes prototype — a personal showcase" },
      {
        name: "description",
        content:
          "A curated collection of prototypes and articles exploring implementation, look & feel, and role.",
      },
      { property: "og:title", content: "What do prototypes prototype" },
      {
        property: "og:description",
        content:
          "A curated collection of prototypes and articles across implementation, look & feel, and role.",
      },
    ],
  }),
  component: Index,
});

type Kind = "Prototype" | "Article";
type Category = "Implementation" | "Look & Feel" | "Role";

type Item = {
  title: string;
  blurb: string;
  category: Category;
  kind: Kind;
  meta: string;
  accent: string; // tailwind bg for the visual tile
};

const ITEMS: Item[] = [
  {
    title: "Snap-to-grid layout engine",
    blurb: "A minimal engine exploring how snapping affects perceived precision.",
    category: "Implementation",
    kind: "Prototype",
    meta: "React · Canvas",
    accent: "bg-gradient-to-br from-neutral-200 to-neutral-300",
  },
  {
    title: "On soft defaults",
    blurb: "Why the resting state of a UI matters more than any hover.",
    category: "Look & Feel",
    kind: "Article",
    meta: "6 min read",
    accent: "bg-gradient-to-br from-amber-100 to-orange-200",
  },
  {
    title: "The prototyper's role",
    blurb: "Sitting between design and engineering, and why that seam matters.",
    category: "Role",
    kind: "Article",
    meta: "4 min read",
    accent: "bg-gradient-to-br from-stone-200 to-stone-300",
  },
  {
    title: "Elastic drag interactions",
    blurb: "Rubber-band physics for lists that feel alive but not chaotic.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "Motion · TS",
    accent: "bg-gradient-to-br from-rose-100 to-rose-200",
  },
  {
    title: "Streaming server components",
    blurb: "A working sketch of a partial-render pattern for slow data.",
    category: "Implementation",
    kind: "Prototype",
    meta: "React · RSC",
    accent: "bg-gradient-to-br from-sky-100 to-indigo-200",
  },
  {
    title: "What is a prototyper?",
    blurb: "A short manifesto on the craft, and what it isn't.",
    category: "Role",
    kind: "Article",
    meta: "3 min read",
    accent: "bg-gradient-to-br from-neutral-100 to-neutral-200",
  },
  {
    title: "Type in motion",
    blurb: "Studies of text that reveals, settles, and recomposes.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "GSAP",
    accent: "bg-gradient-to-br from-emerald-100 to-teal-200",
  },
  {
    title: "Cheap edges, expensive corners",
    blurb: "A note on where quality actually accrues in an interface.",
    category: "Look & Feel",
    kind: "Article",
    meta: "5 min read",
    accent: "bg-gradient-to-br from-yellow-100 to-amber-200",
  },
  {
    title: "Local-first sync sketch",
    blurb: "A tiny CRDT playground for two-tab collaborative editing.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Yjs · Vite",
    accent: "bg-gradient-to-br from-violet-100 to-purple-200",
  },
];

const CATEGORIES = [
  { label: "All", icon: LayoutGrid },
  { label: "Implementation", icon: Wrench },
  { label: "Look & Feel", icon: Sparkles },
  { label: "Role", icon: UserRound },
] as const;

const KINDS = [
  { label: "All", icon: LayoutGrid },
  { label: "Prototype", icon: Box },
  { label: "Article", icon: FileText },
] as const;

function Index() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["label"]>("All");
  const [kind, setKind] = useState<(typeof KINDS)[number]["label"]>("All");
  // About panel: "closed" | "peek" (diagram only) | "open" (4 quadrants)
  const [about, setAbout] = useState<"closed" | "peek" | "open">("closed");
  const aboutRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      ITEMS.filter(
        (i) =>
          (category === "All" || i.category === category) &&
          (kind === "All" || i.kind === kind),
      ),
    [category, kind],
  );

  // Reveal on scroll-up at top of page
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY <= 2 && e.deltaY < -8 && about === "closed") {
        setAbout("peek");
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [about]);

  useEffect(() => {
    if (about !== "closed") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [about]);

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-neutral-900">
      {/* About panel (above the fold) */}
      <div
        ref={aboutRef}
        className={
          "overflow-hidden transition-all duration-700 ease-out " +
          (about === "closed" ? "max-h-0 opacity-0" : about === "peek" ? "max-h-[80vh] opacity-100" : "max-h-[140vh] opacity-100")
        }
      >
        <AboutPanel state={about} onToggle={() => setAbout(about === "open" ? "peek" : "open")} onClose={() => setAbout("closed")} />
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <a href="/" className="flex h-9 w-9 items-center justify-center text-neutral-900">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
          </svg>
        </a>
        <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {(["Work", "Writing", "About"] as const).map((l) => {
            const isAbout = l === "About";
            const active = (l === "Work" && about === "closed") || (isAbout && about !== "closed");
            return (
              <button
                key={l}
                onClick={() => {
                  if (isAbout) setAbout(about === "closed" ? "peek" : "closed");
                }}
                className={
                  "rounded-full px-4 py-1.5 text-sm transition-colors " +
                  (active
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900")
                }
              >
                {l}
              </button>
            );
          })}
        </nav>
        <div className="h-9 w-9" />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Updated occasionally
        </span>
        <h1 className="mt-6 text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          What do prototypes
          <br />
          prototype?
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-neutral-600">
          A personal archive of prototypes and short writing — sorted by what they're
          actually testing: implementation, look & feel, or role.
        </p>
        <button
          onClick={() => setAbout("peek")}
          className="mt-6 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
        >
          ↑ scroll up for about
        </button>
      </section>


      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(({ label, icon: Icon }) => {
              const active = category === label;
              return (
                <button
                  key={label}
                  onClick={() => setCategory(label)}
                  className={
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all " +
                    (active
                      ? "border-neutral-900 bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                      : "border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900")
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>Type:</span>
            <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1">
              {KINDS.map(({ label, icon: Icon }) => {
                const active = kind === label;
                return (
                  <button
                    key={label}
                    onClick={() => setKind(label)}
                    className={
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors " +
                      (active
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:text-neutral-900")
                    }
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-8 pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-neutral-200/60 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div
                className={
                  "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl " +
                  item.accent
                }
              >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500/80">
                  {item.kind}
                </span>
                <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.meta}</span>
                  </div>
                  <h3 className="mt-1 truncate text-[15px] font-medium text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{item.blurb}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 py-16 text-center text-sm text-neutral-500">
            Nothing here yet — try another filter.
          </div>
        )}
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} — a small studio of one.
      </footer>
    </div>
  );
}
