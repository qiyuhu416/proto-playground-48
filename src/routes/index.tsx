import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { ArrowUpRight, LayoutGrid, Wrench, Sparkles, UserRound, FileText, Box } from "lucide-react";
import { ARTICLE_META } from "./articleMeta";
import { NAV_ITEMS, navHref } from "./navItems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
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
  thumbnailSize?: "small" | "medium";
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
    thumbnail: "/articles/a2ui-thumb.svg",
    thumbnailSize: "small",
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
    thumbnail: ARTICLE_META["designing-for-conversations-that-earn-trust"].thumbnail,
    thumbnailSize: ARTICLE_META["designing-for-conversations-that-earn-trust"].thumbnailSize,
    blurb: "How to build AI systems that users can depend on—insights from caring AI research.",
    category: "Role",
    kind: "Article",
    meta: "Research · Design",
    accent: "bg-gradient-to-br from-green-100 to-emerald-200",
  },
  {
    slug: "proactive",
    title: ARTICLE_META["proactive"].title,
    thumbnail: "/articles/proactive-thumb.svg",
    thumbnailSize: "small",
    blurb: "Using prototypes as testing tools to validate assumptions and iterate with stakeholders in real-time.",
    category: "Implementation",
    kind: "Prototype",
    meta: "Research · Testing",
    accent: "bg-gradient-to-br from-cyan-100 to-blue-200",
  },
  {
    slug: "personalization",
    title: ARTICLE_META["personalization"].title,
    thumbnail: "/articles/personalization-thumb.svg",
    thumbnailSize: "small",
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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [timelineCollapsed, setTimelineCollapsed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = fully expanded, 1 = fully collapsed
  const lockedOpen = useRef(false);
  const rafId = useRef(0);
  // collapse only when there's more than one row of cards (lg = 3 cols)
  const canCollapse = useRef(true);

  useEffect(() => {
    const SCROLL_START = 80;
    const SCROLL_END   = 300;

    const handleScroll = () => {
      if (!canCollapse.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const p = Math.max(0, Math.min(1, (y - SCROLL_START) / (SCROLL_END - SCROLL_START)));
        setScrollProgress(p);
        const down = y >= SCROLL_END;
        setScrolledDown(down);
        if (y < SCROLL_START) {
          lockedOpen.current = false;
          setTimelineCollapsed(false);
        } else if (down) {
          lockedOpen.current = false;
          setTimelineCollapsed(true);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleHeaderMouseLeave = () => {
    if (scrolledDown && !lockedOpen.current) setTimelineCollapsed(true);
  };
  const handleDotHover = () => {
    if (scrolledDown) setTimelineCollapsed(false);
  };
  const handleDotClick = () => {
    lockedOpen.current = true;
    setTimelineCollapsed(false);
  };

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

  const tableOfContents: Record<string, string[]> = Object.fromEntries(
    Object.entries(ARTICLE_META)
      .filter(([, meta]) => meta.sections)
      .map(([slug, meta]) => [slug, meta.sections!])
  );

  const filtered = useMemo(
    () =>
      selectedStage === "All"
        ? ITEMS
        : ITEMS.filter((i) => stageMap[selectedStage]?.includes(i.slug)),
    [selectedStage],
  );

  // Keep canCollapse in sync with filtered count; reset if falling to 1 row
  useEffect(() => {
    const moreThanOneRow = filtered.length > 3;
    canCollapse.current = moreThanOneRow;
    if (!moreThanOneRow) {
      lockedOpen.current = false;
      setScrolledDown(false);
      setTimelineCollapsed(false);
      setScrollProgress(0);
    }
  }, [filtered.length]);

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
        onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.currentTime = 0; v.play(); } }}
        onMouseMove={(e) => { setCursorPos({ x: e.clientX, y: e.clientY }); setHoveredSlug(item.slug); }}
        onMouseLeave={(e) => { setHoveredSlug(null); const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0; } }}
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className={item.thumbnailSize === "small" ? "w-16 h-16 object-contain" : item.thumbnailSize === "medium" ? "w-32 h-32 object-contain" : "h-full w-full object-contain p-2"}
            />
          ) : item.videoPreview ? (
            <video
              src={`${item.videoPreview}#t=0.001`}
              preload="metadata"
              muted
              loop
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

  const hoveredToc = hoveredSlug ? (tableOfContents[hoveredSlug] || []) : [];

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      {/* Cursor TOC tooltip */}
      {hoveredSlug && hoveredToc.length > 0 && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: cursorPos.x + 16, top: cursorPos.y + 16 }}
        >
          <div className="bg-neutral-900 text-white rounded-2xl px-5 py-4 shadow-xl max-w-[220px]">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-3">Article</p>
            <ul className="space-y-2">
              {hoveredToc.map((section, idx) => (
                <li key={idx} className="text-[12px] font-semibold text-white leading-snug">{section}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Nav */}
      <header
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-neutral-200/50"
        onMouseLeave={handleHeaderMouseLeave}
      >
        {!scrolledDown ? (
          /* ── At top: badge + nav + Qiyu ── */
          <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
            <div className="flex-1 flex items-center">
              <a href="/what-do-prototypes-prototype" className="hidden md:inline-flex group relative items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-neutral-900 hover:text-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all overflow-hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0 whitespace-nowrap">currently AI prototyper @Apple</span>
                <span className="absolute left-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">What do prototypes prototype?</span>
              </a>
            </div>
            <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {NAV_ITEMS.map((l) => (
                <Link key={l} to={navHref(l)} className={"rounded-full px-4 py-1.5 text-sm transition-colors " + (l === "work" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900")}>{l}</Link>
              ))}
            </nav>
            <div className="flex-1 flex justify-end">
              <div className="hidden md:flex group relative h-9 items-center">
                <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-full z-10">"key-you" it is 🔑 🫵</div>
                <a href="/" className="text-sm font-medium text-neutral-900 transition-opacity duration-150 group-hover:opacity-0 group-hover:pointer-events-none">Qiyu</a>
                <a href="https://www.linkedin.com/in/qiyu-hu/" className="absolute inset-0 flex items-center justify-end text-sm font-medium text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                  Qiyu<span className="translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 delay-100">'s LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* ── Scrolled: two panels, fixed height ── */
          <div className="relative h-[72px]">

            {/* Panel A: dot + nav + Qiyu — fades out when expanded */}
            <div className={`absolute inset-0 flex items-center transition-opacity duration-200 ${timelineCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="mx-auto flex w-full max-w-6xl items-center px-6">
                <div className="flex-1 flex items-center">
                  <button onMouseEnter={handleDotHover} onClick={handleDotClick} className="flex items-center gap-2 group">
                    <div className="h-5 w-5 rounded-full bg-neutral-900 transition-transform group-hover:scale-125 shrink-0" />
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-900 transition-colors">{selectedStage}</span>
                  </button>
                </div>
                <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  {NAV_ITEMS.map((l) => (
                    <Link key={l} to={navHref(l)} className={"rounded-full px-4 py-1.5 text-sm transition-colors " + (l === "work" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900")}>{l}</Link>
                  ))}
                </nav>
                <div className="flex-1 flex justify-end">
                  <div className="hidden md:flex group relative h-9 items-center">
                    <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-full z-10">"key-you" it is 🔑 🫵</div>
                    <a href="/" className="text-sm font-medium text-neutral-900 transition-opacity duration-150 group-hover:opacity-0 group-hover:pointer-events-none">Qiyu</a>
                    <a href="https://www.linkedin.com/in/qiyu-hu/" className="absolute inset-0 flex items-center justify-end text-sm font-medium text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                      Qiyu<span className="translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 delay-100">'s LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel B: animated timeline — always mounted, dots transition from origin */}
            <div className={`absolute inset-0 transition-opacity duration-200 ${!timelineCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="mx-auto max-w-6xl px-6 h-full flex items-center">
                <div className="relative w-full h-12">
                  {/* connecting lines */}
                  <svg className="absolute inset-0 w-full" style={{ overflow: "visible", height: "20px", top: "2px" }}>
                    <line x1="0%" y1="10" x2="76%" y2="10" stroke="#d1d5db" strokeWidth="2"
                      style={{ opacity: timelineCollapsed ? 0 : 1, transition: "opacity 200ms ease 300ms" }} />
                    <line x1="76%" y1="10" x2="100%" y2="10" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4,4"
                      style={{ opacity: timelineCollapsed ? 0 : 1, transition: "opacity 200ms ease 300ms" }} />
                  </svg>
                  {/* dots — CSS left+transform transitions for the fly-out effect */}
                  {[
                    { key: "All",          toLeft: "0%",    toTx: "translateX(0)",      delay: 0   },
                    { key: "chatbot",      toLeft: "22%",   toTx: "translateX(-50%)",   delay: 35  },
                    { key: "reasoner",     toLeft: "36%",   toTx: "translateX(-50%)",   delay: 70  },
                    { key: "agent",        toLeft: "50%",   toTx: "translateX(-50%)",   delay: 105 },
                    { key: "innovator",    toLeft: "63%",   toTx: "translateX(-50%)",   delay: 140 },
                    { key: "Organization", toLeft: "76%",   toTx: "translateX(-50%)",   delay: 175 },
                    { key: "human",        toLeft: "100%",  toTx: "translateX(-100%)",  delay: 210 },
                  ].map(({ key, toLeft, toTx, delay }) => {
                    const exp = !timelineCollapsed;
                    const expandEase = "cubic-bezier(0.34,1.56,0.64,1)";
                    const collapseEase = "cubic-bezier(0.55,0,1,0.45)";
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedStage(key)}
                        className="absolute flex flex-col items-center gap-2 group"
                        style={{
                          left: exp ? toLeft : "0%",
                          transform: exp ? toTx : "translateX(0)",
                          opacity: exp ? 1 : 0,
                          transition: exp
                            ? `left 380ms ${expandEase} ${delay}ms, transform 380ms ${expandEase} ${delay}ms, opacity 180ms ease ${delay}ms`
                            : `left 260ms ${collapseEase}, transform 260ms ${collapseEase}, opacity 120ms ease`,
                          pointerEvents: exp ? "auto" : "none",
                        }}
                      >
                        <div className={`h-5 w-5 rounded-full transition-colors relative z-20 ${selectedStage === key ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                        <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-150 ${selectedStage === key ? "text-neutral-900 opacity-100" : "opacity-0"}`}>{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-28 text-center">
        <h1 className="text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          Prototyping "What-if"
          <br />
          in Human–AI Interactions
        </h1>
      </section>

      {/* Timeline — separate sticky row, visible while scrolling (scroll-progress collapse) */}
      {!scrolledDown && (
        <div className="sticky top-[69px] z-40 bg-background/90 backdrop-blur-sm border-b border-neutral-200/50">
          <section className="mx-auto max-w-6xl px-6 py-6">
            <div className="relative">
              {/* Lines fade as dots converge */}
              <svg className="absolute inset-0 w-full h-12" style={{ overflow: "visible", top: "0", opacity: 1 - scrollProgress }}>
                <line x1="0%" y1="10" x2="76%" y2="10" stroke="#d1d5db" strokeWidth="2" />
                <line x1="76%" y1="10" x2="100%" y2="10" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4,4" />
              </svg>
              <div className="relative z-10 h-12">
                {/* All — anchor at left:0, stays put */}
                <button onClick={() => setSelectedStage("All")} className="absolute flex flex-col items-center gap-2 group" style={{ left: "0%" }}>
                  <div className={`h-5 w-5 rounded-full transition-colors relative z-20 ${selectedStage === "All" ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                  <span className="text-sm font-medium whitespace-nowrap text-neutral-900 transition-opacity duration-150" style={{ opacity: selectedStage === "All" ? Math.max(0, 1 - scrollProgress * 2) : 0 }}>All</span>
                </button>
                {/* All other dots converge toward left:0 proportionally */}
                {([
                  { key: "chatbot",      nat: 22,  txFull: -50  },
                  { key: "reasoner",     nat: 36,  txFull: -50  },
                  { key: "agent",        nat: 50,  txFull: -50  },
                  { key: "innovator",    nat: 63,  txFull: -50  },
                  { key: "Organization", nat: 76,  txFull: -50  },
                  { key: "human",        nat: 100, txFull: -100 },
                ] as { key: string; nat: number; txFull: number }[]).map(({ key, nat, txFull }) => {
                  const p = scrollProgress;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedStage(key)}
                      className="absolute flex flex-col items-center gap-2 group"
                      style={{
                        left: `${nat * (1 - p)}%`,
                        transform: `translateX(${txFull * (1 - p)}%)`,
                        opacity: 1 - p,
                        pointerEvents: p > 0.85 ? "none" : "auto",
                      }}
                    >
                      <div className={`h-5 w-5 rounded-full transition-colors relative z-20 ${selectedStage === key ? "bg-neutral-900" : "bg-white border-2 border-neutral-400 hover:border-neutral-900"}`} />
                      <span className="text-sm font-medium whitespace-nowrap text-neutral-900 transition-opacity duration-150" style={{ opacity: selectedStage === key ? Math.max(0, 1 - p * 2.5) : 0 }}>{key}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

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
              {stageSections[selectedStage].map((section, idx) => {
                const sectionSlugs: Record<string, string[][]> = {
                  chatbot: [
                    ["reimagining-the-chatbot", "google-cloud", "select-fill-with-prompts"],
                    ["designing-for-conversations-that-earn-trust"],
                  ],
                };
                const slugsForSection = sectionSlugs[selectedStage]?.[idx];
                const cards = slugsForSection
                  ? filtered.filter((item) => slugsForSection.includes(item.slug))
                  : filtered;
                return (
                  <div key={idx}>
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-neutral-900">{section.main}</h3>
                      <p className="text-sm text-neutral-600 mt-1">{section.sub}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {cards.map((item) => renderCard(item))}
                    </div>
                  </div>
                );
              })}
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
        © 2026 — sketched with fountain pen & paper
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


