import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, LayoutGrid, Wrench, Sparkles, UserRound, FileText, Box } from "lucide-react";
import { ARTICLE_META } from "./articleMeta";

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
  highlightWord?: string;
  externalLink?: string;
  thumbnail?: string;
  thumbnailSize?: "small";
  videoPreview?: string;
};

type ItemWithSlug = Item & { slug: string };

const ITEMS: ItemWithSlug[] = [
  {
    slug: "what-do-prototypes-prototype",
    title: ARTICLE_META["what-do-prototypes-prototype"].title,
    thumbnail: ARTICLE_META["what-do-prototypes-prototype"].thumbnail,
    blurb: "Prototyping as a research mindset, and designing to elicit errors rather than hide them.",
    category: "Implementation",
    kind: "Article",
    meta: "6 min read",
    accent: "bg-gradient-to-br from-amber-100 to-orange-200",
  },
  {
    slug: "ai-ai-interaction",
    title: ARTICLE_META["ai-ai-interaction"].title,
    blurb: "Visualizing how two AI agents communicate and resolve differences in real-time.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "Concept · Motion",
    accent: "bg-gradient-to-br from-sky-100 to-indigo-200",
    videoPreview: "/articles/ai-ai-interaction.mp4",
  },
  {
    slug: "designing-next-gen-ai-products",
    title: ARTICLE_META["designing-next-gen-ai-products"].title,
    thumbnail: ARTICLE_META["designing-next-gen-ai-products"].thumbnail,
    blurb: "Mapping UX to tech capability. Insights from conversational AI, elder care, and human–AI co-writing.",
    category: "Role",
    kind: "Article",
    meta: "8 min read",
    accent: "bg-gradient-to-br from-stone-200 to-stone-300",
  },
  {
    slug: "reimagining-the-chatbot",
    title: ARTICLE_META["reimagining-the-chatbot"].title,
    thumbnail: ARTICLE_META["reimagining-the-chatbot"].thumbnail,
    blurb: "Exploring how prompts reshape design workflows—generative design meets human intent.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Collection · Design system",
    accent: "bg-gradient-to-br from-violet-100 to-purple-200",
  },
  {
    slug: "product-launch-from-0-1",
    title: ARTICLE_META["product-launch-from-0-1"].title,
    thumbnail: ARTICLE_META["product-launch-from-0-1"].thumbnail,
    blurb: "Building Meetfood from concept to launch—a food discovery app connecting people to local cuisine.",
    category: "Role",
    kind: "Article",
    meta: "Case study",
    accent: "bg-gradient-to-br from-pink-100 to-red-200",
    externalLink: "https://www.key-you-who.com/projects/app-launch",
  },
  {
    slug: "knowledge-graph-visualization",
    title: ARTICLE_META["knowledge-graph-visualization"].title,
    blurb: "Turning abstract AI reasoning into tangible, navigable visual structures.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "Data viz · Interaction",
    accent: "bg-gradient-to-br from-neutral-200 to-neutral-300",
    videoPreview: "/articles/chatbot-knowledge-graph.mp4",
  },
  {
    slug: "google-cloud",
    title: ARTICLE_META["google-cloud"].title,
    thumbnail: ARTICLE_META["google-cloud"].thumbnail,
    blurb: "Embedding AI into the product discovery experience for startup customers.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Research · 0→1",
    accent: "bg-gradient-to-br from-blue-100 to-cyan-200",
  },
  {
    slug: "a2ui-generative",
    title: ARTICLE_META["a2ui-generative"].title,
    blurb: "AI-driven user interfaces that generate and adapt components based on intent.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "Research · AI",
    accent: "bg-gradient-to-br from-purple-100 to-pink-200",
  },
  {
    slug: "design-as-a-research-tool",
    title: ARTICLE_META["design-as-a-research-tool"].title,
    thumbnail: ARTICLE_META["design-as-a-research-tool"].thumbnail,
    blurb: "Using design methods to uncover hidden user behaviors and inform transportation policy.",
    category: "Role",
    kind: "Article",
    meta: "Case study",
    accent: "bg-gradient-to-br from-teal-100 to-cyan-200",
  },
  {
    slug: "physical-ai",
    title: ARTICLE_META["physical-ai"].title,
    thumbnail: ARTICLE_META["physical-ai"].thumbnail,
    blurb: "Exploring AI beyond screens—how intelligent systems interact with and shape the physical world.",
    category: "Role",
    kind: "Prototype",
    meta: "Research · Physical",
    accent: "bg-gradient-to-br from-slate-100 to-gray-200",
  },
  {
    slug: "claude-code-research",
    title: ARTICLE_META["claude-code-research"].title,
    thumbnail: ARTICLE_META["claude-code-research"].thumbnail,
    thumbnailSize: ARTICLE_META["claude-code-research"].thumbnailSize,
    blurb: "Building and evolving development tools powered by AI assistance.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Research · Tools",
    accent: "bg-gradient-to-br from-indigo-100 to-blue-200",
  },
  {
    slug: "designing-for-conversations-that-earn-trust",
    title: ARTICLE_META["designing-for-conversations-that-earn-trust"].title,
    blurb: "How to build AI systems that users can depend on—insights from caring AI research.",
    category: "Role",
    kind: "Article",
    meta: "Research · Design",
    accent: "bg-gradient-to-br from-green-100 to-emerald-200",
  },
  {
    slug: "proactive",
    title: ARTICLE_META["proactive"].title,
    blurb: "Using prototypes as testing tools to validate assumptions and iterate with stakeholders in real-time.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Research · Testing",
    accent: "bg-gradient-to-br from-cyan-100 to-blue-200",
  },
  {
    slug: "personalization",
    title: ARTICLE_META["personalization"].title,
    blurb: "Understanding what makes humans human—exploring the future of AI through the lens of personal connection.",
    category: "Role",
    kind: "Article",
    meta: "Research · AI Philosophy",
    accent: "bg-gradient-to-br from-violet-100 to-purple-200",
  },
  {
    slug: "always-here",
    title: ARTICLE_META["always-here"].title,
    blurb: "What if the AI didn't wait to be asked? Exploring proactive presence and reducing cognitive load.",
    category: "Look & Feel",
    kind: "Prototype",
    meta: "Interaction · AI",
    accent: "bg-gradient-to-br from-rose-100 to-orange-200",
    videoPreview: "/articles/chatbot-always-here.mp4",
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
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [showPrototypeModal, setShowPrototypeModal] = useState(false);

  const stageMap: Record<string, string[]> = {
    All: [],
    chatbot: ["select-fill-with-prompts", "google-cloud", "reimagining-the-chatbot", "designing-for-conversations-that-earn-trust"],
    reasoner: ["knowledge-graph-visualization"],
    agent: ["proactive"],
    innovator: ["making-design-fun", "a2ui-generative"],
    human: ["design-as-a-research-tool", "physical-ai", "designing-next-gen-ai-products", "personalization"],
    Organization: ["ai-ai-interaction", "claude-code-research"],
  };

  const stageSections: Record<string, { main: string; sub: string }[]> = {
    chatbot: [
      { main: "how AI communicates", sub: "designing conversations that matter" },
      { main: "building trust through transparency", sub: "when AI asks for feedback" },
    ],
    reasoner: [
      { main: "visualizing complexity", sub: "making abstract thinking visible" },
    ],
    agent: [
      { main: "prototyping as learning", sub: "using tests to understand problems" },
    ],
    innovator: [
      { main: "making things fun", sub: "creativity without friction" },
    ],
    human: [
      { main: "AI beyond screens", sub: "design as a tool, AI beyond screens" },
      { main: "relationship > interactions", sub: "understanding what makes us human" },
    ],
    Organization: [
      { main: "tools that amplify", sub: "building infrastructure for capability" },
    ],
  };

  const tableOfContents: Record<string, string[]> = {
    "what-do-prototypes-prototype": ["§1 · Prototype = Research mindset", "§2 · Not all prototypes need to be coded", "Prototypes Exploring These Dimensions", "§3 · Built to elicit errors"],
    "designing-next-gen-ai-products": ["§1 · Designing the relationship", "§2 · Designing the feeling", "§3 · Where to NOT use AI", "Three core lessons"],
    "designing-for-conversations-that-earn-trust": ["§1 · Designing the relationship", "What this means for designers"],
    "claude-code-research": ["Mission", "Key Learnings", "§2 · What AI can't do", "§3 · Don't let AI bypass your thinking", "Evolution"],
    "design-as-a-research-tool": ["The Challenge", "Approach", "Key Insight", "Outcome", "Research Frameworks Used"],
    "physical-ai": ["The Challenge", "Why AI?", "Mapping AI to Error", "The System", "The User Flow", "Final Design"],
    "google-cloud": ["The Challenge", "Research Methodology", "The Deliverables", "Key Insights", "Impact & Outcomes"],
    "reimagining-the-chatbot": ["Task Analysis", "Assumptions at Each Step", "Prototypes Exploring These Dimensions", "What Gets Tested"],
    "making-design-fun": ["The philosophy", "Curiosity, not FOMO", "The experiments", "One block of prompts", "What makes design playful"],
    "proactive": ["The Concept", "How It Works", "Variables as Questions", "A Note on Sharing", "For others to prototype"],
    "personalization": ["The Starting Question", "Beyond Features", "For Me, With Me, As Me", "Where to NOT use AI", "Why This Matters"],
    "a2ui-generative": ["What is A2UI?", "Exploring from Use Cases", "Interaction Patterns", "Research References", "The Big Question"],
  };

  const filtered = useMemo(
    () =>
      selectedStage === "All"
        ? ITEMS
        : ITEMS.filter((i) => stageMap[selectedStage]?.includes(i.slug)),
    [selectedStage],
  );

  const renderCard = (item: ItemWithSlug) => {
    const href = item.externalLink || `/${item.slug}`;
    const target = item.externalLink ? "_blank" : undefined;
    const rel = item.externalLink ? "noopener noreferrer" : undefined;
    const toc = tableOfContents[item.slug] || [];

    return (
      <a
        key={item.slug}
        href={href}
        target={target}
        rel={rel}
        className={
          "group relative rounded-2xl p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-0 bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] block"
        }
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white">
          {/* TOC overlay on hover */}
          {toc.length > 0 && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col justify-end p-4"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
            >
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-2">Contents</div>
              <ul className="space-y-1">
                {toc.map((section, idx) => (
                  <li key={idx} className="text-white/80 text-[11px] leading-snug">
                    {section}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className={item.thumbnailSize === "small" ? "w-16 h-16 object-contain" : "h-full w-full object-contain p-2"}
            />
          ) : item.videoPreview ? (
            <video
              src={`${item.videoPreview}#t=0.001`}
              preload="metadata"
              muted
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400"
            >
              {item.kind}
            </span>
          )}
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
            <h3 className="mt-1 text-[15px] font-medium text-neutral-900">
              {item.title}
            </h3>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      {/* Nav */}
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
                  (l === "Work"
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

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          currently AI prototyper @Apple
        </span>
        <h1 className="mt-6 text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          Prototyping the What-if
          <br />
          in Human–AI Interactions
        </h1>
        <button
          onClick={() => setShowPrototypeModal(true)}
          className="mx-auto mt-5 max-w-lg text-base text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          What do prototypes prototype?
        </button>
      </section>

      {/* Timeline Filter */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-12">
          {/* Timeline */}
          <div className="relative">
            <svg className="absolute inset-0 w-full h-12" style={{ overflow: "visible", top: "8px" }}>
              {/* Solid line from start to Organization (66%) */}
              <line x1="0%" y1="12" x2="66%" y2="12" stroke="#d1d5db" strokeWidth="2" />
              {/* Dashed line from Organization to Human? (34%) */}
              <line x1="66%" y1="12" x2="100%" y2="12" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4,4" />
            </svg>

            {/* Timeline nodes container with positioning */}
            <div className="relative z-10 mb-8 h-12" style={{ position: "relative" }}>
              {/* All */}
              <button
                onClick={() => setSelectedStage("All")}
                className="absolute flex flex-col items-center gap-2 group"
                style={{ left: "0%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "All" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "All" ? "text-neutral-900" : "text-neutral-600"}`}>All</span>
              </button>

              {/* Chatbot */}
              <button
                onClick={() => setSelectedStage("chatbot")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "13.2%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "chatbot" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "chatbot" ? "text-neutral-900" : "text-neutral-600"}`}>chatbot</span>
              </button>

              {/* Reasoner */}
              <button
                onClick={() => setSelectedStage("reasoner")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "26.4%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "reasoner" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "reasoner" ? "text-neutral-900" : "text-neutral-600"}`}>reasoner</span>
              </button>

              {/* Agent */}
              <button
                onClick={() => setSelectedStage("agent")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "39.6%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "agent" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "agent" ? "text-neutral-900" : "text-neutral-600"}`}>agent</span>
              </button>

              {/* Innovator */}
              <button
                onClick={() => setSelectedStage("innovator")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "52.8%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "innovator" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "innovator" ? "text-neutral-900" : "text-neutral-600"}`}>innovator</span>
              </button>

              {/* Organization */}
              <button
                onClick={() => setSelectedStage("Organization")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "66%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "Organization" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "Organization" ? "text-neutral-900" : "text-neutral-600"}`}>Organization</span>
              </button>

              {/* Human */}
              <button
                onClick={() => setSelectedStage("human")}
                className="absolute flex flex-col items-center gap-2 group -translate-x-1/2"
                style={{ left: "83.2%" }}
              >
                <div className={`h-5 w-5 rounded-full transition-all relative z-20 ${selectedStage === "human" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                <span className={`text-sm font-medium transition-colors whitespace-nowrap ${selectedStage === "human" ? "text-neutral-900" : "text-neutral-600"}`}>human</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-8 pb-24">
        {selectedStage === "human" ? (
          <div className="mb-12">
            <div className="space-y-12">
              {stageSections.human.map((section, idx) => (
                <div key={idx}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-neutral-900">{section.main}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{section.sub}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered
                      .filter((item) => {
                        if (idx === 0) return ["design-as-a-research-tool", "physical-ai"].includes(item.slug);
                        if (idx === 1) return ["designing-next-gen-ai-products", "personalization"].includes(item.slug);
                        return false;
                      })
                      .map((item) => renderCard(item))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedStage !== "All" && stageSections[selectedStage] ? (
          <div className="mb-12">
            <div className="space-y-12">
              {stageSections[selectedStage].map((section, idx) => (
                <div key={idx}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-neutral-900">{section.main}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{section.sub}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item) => renderCard(item))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => renderCard(item))}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-300 py-16 text-center text-sm text-neutral-500">
                Nothing here yet — try another filter.
              </div>
            )}
          </>
        )}
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-neutral-500">
        © 2026 — a small studio of one.
      </footer>

      {/* Prototype Modal */}
      {showPrototypeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-neutral-200 bg-white">
              <h2 className="text-2xl font-medium text-neutral-900">What do prototypes prototype?</h2>
              <button
                onClick={() => setShowPrototypeModal(false)}
                className="text-neutral-500 hover:text-neutral-900 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Triangle diagram */}
              <div>
                <img
                  src="/articles/prototype-triangle.png"
                  alt="What do prototypes prototype triangle diagram"
                  className="w-full rounded-lg border border-neutral-200"
                />
              </div>

              {/* Explanation */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Implementation</h3>
                  <p className="text-neutral-600">
                    Testing whether something is technically possible. What can be built? What are the
                    constraints? How do different technologies and approaches perform?
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Look & Feel</h3>
                  <p className="text-neutral-600">
                    Exploring how something will be perceived and experienced. What does it feel like to
                    use? What's the tone, aesthetic, and emotional response? How does it move and
                    respond?
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Role</h3>
                  <p className="text-neutral-600">
                    Understanding what place this thing occupies in the world. What's its purpose? Who
                    is it for? What problems does it solve? How does it fit into larger systems?
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-3">
                    Read the original paper by Elisa Giaccardi:
                  </p>
                  <a
                    href="https://hci.stanford.edu/courses/cs247/2012/readings/WhatDoPrototypesPrototype.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    What Do Prototypes Prototype? (PDF) →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


