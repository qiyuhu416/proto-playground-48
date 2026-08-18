import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardIcon } from "./-CardIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qiyu Hu — AI Interaction Designer" },
      {
        name: "description",
        content:
          "Qiyu Hu's portfolio — prototypes and articles exploring human–AI interaction, design research, and the future of AI products.",
      },
      { property: "og:title", content: "Qiyu Hu — AI Interaction Designer" },
      {
        property: "og:description",
        content:
          "Prototypes and articles exploring human–AI interaction, design research, and the future of AI products.",
      },
      { property: "og:url", content: "https://key-you.com/" },
    ],
  }),
  component: Index,
});

// ── Types ─────────────────────────────────────────────────────────────────────

type PillarCard = {
  slug: string;
  title: string;
  meta: string;
  accent: string;
  thumbnail?: string;
  thumbnailSize?: "xs" | "small" | "medium";
  videoPreview?: string;
  videoStartTime?: number;
  videoTransform?: string;
  externalLink?: string;
  comingSoon?: boolean;
};

type GapId = "top" | "bottom" | "me-loop" | "others-loop";

type Pillar = {
  number: string;
  subtitle: string;
  title: string;
  description: string;
  gapLeft: string;
  gapRight: string;
  activeGap: GapId;
  cards: PillarCard[];
};

// ── Data ──────────────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    number: "01",
    subtitle: "",
    title: "Human-Human Understanding",
    description: "Understanding others is a black box, just like AI",
    gapLeft: "Assumption",
    gapRight: "Understanding",
    activeGap: "others-loop",
    cards: [
      {
        slug: "design-as-a-research-tool",
        title: "Research through Design",
        meta: "User-centered service design",
        accent: "bg-gradient-to-br from-teal-100 to-cyan-200",
        thumbnail: "/articles/design-as-research-tool-thumb.png",
      },
      {
        slug: "designing-for-conversations-that-earn-trust",
        title: "Who should the bot listen to?",
        meta: "Conversational design in multi-stakeholder cases",
        accent: "bg-gradient-to-br from-green-100 to-emerald-200",
        thumbnail: "/articles/conversation-trust-icon.svg",
        thumbnailSize: "small",
      },
      {
        slug: "what-do-prototypes-prototype",
        title: "What do prototypes prototype?",
        meta: "5 min read",
        accent: "bg-gradient-to-br from-amber-100 to-orange-200",
        thumbnail: "/articles/prototype-triangle-thumb.svg",
        thumbnailSize: "medium",
      },
    ],
  },
  {
    number: "02",
    subtitle: "",
    title: "How do we design feedback?",
    description: "The gap between intent and expression",
    gapLeft: "Intent",
    gapRight: "Expression",
    activeGap: "bottom",
    cards: [
      {
        slug: "google-cloud",
        title: "Launching AI for assisted browsing",
        meta: "0-1 for Google",
        accent: "bg-gradient-to-br from-blue-100 to-cyan-200",
        thumbnail: "/articles/google-cloud-hero.png",
      },
      {
        slug: "reimagining-the-chatbot",
        title: "The chatbot beyond a tab?",
        meta: "Exploring interface paradigms",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        thumbnail: "/articles/chatbot-thumb.png",
      },
      {
        slug: "physical-ai",
        title: "Physical AI for service design",
        meta: "Understanding behavioral intent",
        accent: "bg-gradient-to-br from-slate-100 to-gray-200",
        thumbnail: "/articles/physical-ai-thumb.png",
      },
      {
        slug: "a2ui-generative",
        title: "Generative UI",
        meta: "Personalization",
        accent: "bg-gradient-to-br from-purple-100 to-pink-200",
        thumbnail: "/articles/a2ui-thumb.svg",
        thumbnailSize: "small",
      },
    ],
  },
  {
    number: "03",
    subtitle: "",
    title: "How much do you know about yourself?",
    description: "Who we are is constantly shaped by how we interact with the external world. Sometimes the changes are faster than we realize",
    gapLeft: "Unknown",
    gapRight: "Aware",
    activeGap: "me-loop",
    cards: [
      {
        slug: "claude-code-research",
        title: "How Claude shapes my thinking",
        meta: "AI workflow",
        accent: "bg-gradient-to-br from-indigo-100 to-blue-200",
        thumbnail: "/articles/claude-code-thumb.png",
        thumbnailSize: "small",
      },
      {
        slug: "personalization",
        title: "Personalization? What is a Person?",
        meta: "Thoughts about the vision",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        thumbnail: "/articles/personalization-thumb.svg",
        thumbnailSize: "xs",
      },
      {
        slug: "aios",
        title: "AIOS to see my unknown-unknowns",
        meta: "Self-discovery",
        accent: "bg-neutral-100",
        comingSoon: true,
      },
      {
        slug: "ai-journaling",
        title: "AI-assisted journaling",
        meta: "Self-discovery through reflection",
        accent: "bg-neutral-100",
        comingSoon: true,
      },
    ],
  },
  {
    number: "04",
    subtitle: "",
    title: "Is there another way to express yourself?",
    description: "The gap between internal intent and external expression—technology that augments human voice beyond words",
    gapLeft: "Intent",
    gapRight: "Expression",
    activeGap: "top",
    cards: [
      {
        slug: "product-launch-from-0-1",
        title: "Product launch from 0–1",
        meta: "Changing through Creating",
        accent: "bg-gradient-to-br from-pink-100 to-red-200",
        thumbnail: "/articles/product-launch-thumb.png",
        externalLink: "https://meetfood.us/",
      },
      {
        slug: "hand-gesture-interactions",
        title: "Hand gesture interactions",
        meta: "Physical expression",
        accent: "bg-gradient-to-br from-sky-100 to-blue-200",
        videoPreview: "/articles/hand-gesture.mp4",
        videoStartTime: 0,
      },
      {
        slug: "voice-interaction",
        title: "Voice interaction",
        meta: "Vocal expression",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        videoPreview: "/articles/voice.mp4",
        videoStartTime: 0,
      },
      {
        slug: "palo-alto-moment",
        title: "Palo Alto moment",
        meta: "Just for fun",
        accent: "bg-gradient-to-br from-amber-100 to-orange-200",
        videoPreview: "/articles/palo-alto.mp4",
        videoStartTime: 0,
      },
    ],
  },
];

// ── Interaction model diagram ─────────────────────────────────────────────────

function InteractionDiagram({ active }: { active: GapId }) {
  const dim = (gap: GapId) => ({
    stroke:      gap === active ? "#171717" : "#d1d5db",
    strokeWidth: gap === active ? 2        : 1.2,
    opacity:     gap === active ? 1        : 0.45,
  });
  const labelFill = (gap: GapId) => gap === active ? "#404040" : "#c0c0c0";

  // Geometry constants
  const mex = 108, mey = 126, r = 50;   // ME circle
  const otx = 310, oty = 126;            // OTHERS circle
  const topY = 100, botY = 152;          // Arrow y-positions
  const gapL = mex + r + 2;             // 160
  const gapR = otx - r - 2;             // 258

  return (
    <svg viewBox="0 0 420 252" className="w-full max-w-[400px]" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── ME self-loop (left dashed arc) ── */}
      <path
        d={`M ${mex - 36},${topY} C ${mex - 110},${topY} ${mex - 110},${botY} ${mex - 36},${botY}`}
        strokeDasharray="4 3"
        fill="none"
        {...dim("me-loop")}
      />
      {/* arrowhead at bottom of ME loop */}
      <polyline
        points={`${mex - 40},${botY - 5} ${mex - 36},${botY} ${mex - 31},${botY - 5}`}
        fill="none"
        {...dim("me-loop")}
      />
      {/* ME loop labels */}
      <text x={mex - 72} y={topY - 10} textAnchor="middle" fontSize="8.5" fill={labelFill("me-loop")}
        fontFamily="ui-sans-serif, system-ui, sans-serif">assume</text>
      <text x={mex - 72} y={botY + 18} textAnchor="middle" fontSize="8.5" fill={labelFill("me-loop")}
        fontFamily="ui-sans-serif, system-ui, sans-serif">aware</text>

      {/* ── OTHERS self-loop (right dashed arc) ── */}
      <path
        d={`M ${otx + 36},${topY} C ${otx + 110},${topY} ${otx + 110},${botY} ${otx + 36},${botY}`}
        strokeDasharray="4 3"
        fill="none"
        {...dim("others-loop")}
      />
      {/* arrowhead at bottom of OTHERS loop */}
      <polyline
        points={`${otx + 31},${botY - 5} ${otx + 36},${botY} ${otx + 41},${botY - 5}`}
        fill="none"
        {...dim("others-loop")}
      />
      {/* OTHERS loop labels */}
      <text x={otx + 72} y={topY - 10} textAnchor="middle" fontSize="8.5" fill={labelFill("others-loop")}
        fontFamily="ui-sans-serif, system-ui, sans-serif">expect</text>
      <text x={otx + 72} y={botY + 18} textAnchor="middle" fontSize="8.5" fill={labelFill("others-loop")}
        fontFamily="ui-sans-serif, system-ui, sans-serif">reality</text>

      {/* ── Circles ── */}
      <circle cx={mex} cy={mey} r={r} stroke="#e5e7eb" strokeWidth="1.5" />
      <text x={mex} y={mey + 4} textAnchor="middle" fontSize="11" fill="#6b7280"
        fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500">ME</text>

      <circle cx={otx} cy={oty} r={r} stroke="#e5e7eb" strokeWidth="1.5" />
      <text x={otx} y={oty + 4} textAnchor="middle" fontSize="11" fill="#6b7280"
        fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500">OTHERS</text>

      {/* ── Top arrow ME → OTHERS (Intent → Reception) ── */}
      <line x1={gapL} y1={topY} x2={gapR} y2={topY} {...dim("top")} />
      <polyline points={`${gapR - 5},${topY - 4} ${gapR},${topY} ${gapR - 5},${topY + 4}`}
        fill="none" {...dim("top")} />
      {/* Top gap label */}
      <text x={(gapL + gapR) / 2} y={topY - 10} textAnchor="middle" fontSize="7.5"
        fill={labelFill("top")} fontFamily="ui-sans-serif, system-ui, sans-serif">
        Intent → Reception
      </text>

      {/* ── Bottom arrow OTHERS → ME (Form → Meaning) ── */}
      <line x1={gapR} y1={botY} x2={gapL} y2={botY} {...dim("bottom")} />
      <polyline points={`${gapL + 5},${botY - 4} ${gapL},${botY} ${gapL + 5},${botY + 4}`}
        fill="none" {...dim("bottom")} />
      {/* Bottom gap label */}
      <text x={(gapL + gapR) / 2} y={botY + 16} textAnchor="middle" fontSize="7.5"
        fill={labelFill("bottom")} fontFamily="ui-sans-serif, system-ui, sans-serif">
        Form → Meaning
      </text>

    </svg>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function CardItem({ card }: { card: PillarCard }) {
  const href = card.externalLink || `/${card.slug}`;
  const isExternal = !!card.externalLink;
  const Wrapper = card.comingSoon ? "div" : "a";

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector("video");
    if (v) { v.currentTime = card.videoStartTime ?? 0; v.play(); }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector("video");
    if (v) { v.pause(); v.currentTime = card.videoStartTime ?? 0; }
  };

  const wrapperProps = !card.comingSoon
    ? { href, target: isExternal ? "_blank" : undefined, rel: isExternal ? "noopener noreferrer" : undefined }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-[340px] flex-shrink-0 rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all block text-left ${card.comingSoon ? "cursor-default opacity-40" : "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"}`}
    >
      {/* Visual */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-white">
        {card.comingSoon ? (
          <span className="text-[10px] uppercase tracking-widest text-neutral-400">Coming soon</span>
        ) : card.thumbnail ? (
          <img
            src={card.thumbnail}
            alt={card.title}
            className={
              card.thumbnailSize === "xs"     ? "w-10 h-10 object-contain" :
              card.thumbnailSize === "small"  ? "w-20 h-20 object-contain" :
              card.thumbnailSize === "medium" ? "w-36 h-36 object-contain" :
              "w-full h-full object-cover"
            }
          />
        ) : card.videoPreview ? (
          <video
            src={`${card.videoPreview}#t=${card.videoStartTime ?? 0.001}`}
            preload="metadata"
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: card.videoTransform }}
          />
        ) : null}
        {!card.comingSoon && <CardIcon hasVideo={!!card.videoPreview} />}
      </div>

      {/* Text */}
      <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span>{card.meta}</span>
          </div>
          <h3 className="mt-1 text-[15px] font-medium text-neutral-900">
            {card.title}
          </h3>
        </div>
      </div>
    </Wrapper>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function PillarCarousel({ cards }: { cards: PillarCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const t = setTimeout(updateBounds, 50);
    return () => clearTimeout(t);
  }, [updateBounds, cards]);

  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 316 : -316, behavior: "smooth" });
  };

  // Mirrors mx-auto max-w-6xl px-6 left edge at every viewport width
  const edgePad = "max(24px, calc((100vw - 72rem) / 2 + 24px))";

  return (
    <div>
      {/* Full-bleed scroll — outer clips page scroll, inner scrolls */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={updateBounds}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{
            paddingLeft: edgePad,
            paddingRight: "24px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {cards.map((card) => (
            <CardItem key={card.slug} card={card} />
          ))}
        </div>
      </div>

      {/* Arrows — aligned to right edge of content */}
      <div
        className="flex justify-end gap-2 mt-4"
        style={{ paddingRight: edgePad }}
      >
        <button
          onClick={() => scrollBy("left")}
          disabled={atStart}
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-25 transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollBy("right")}
          disabled={atEnd}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-25 transition-all"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ── Pillar section ─────────────────────────────────────────────────────────────

function PillarSection({ pillar }: { pillar: Pillar }) {
  return (
    <section className="pb-16">
      {/* Header — constrained to content width */}
      <div className="mx-auto max-w-6xl px-6 pt-14 mb-10">
        <h2 className="text-2xl font-medium text-neutral-900 mb-2">{pillar.title}</h2>
        <p className="text-neutral-600 text-sm">{pillar.description}</p>
      </div>

      {/* Carousel — full bleed to screen edge */}
      <PillarCarousel cards={pillar.cards} />
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function Index() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-neutral-200/50">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-4">
          <a href="https://www.linkedin.com/in/qiyu-hu/" className="hidden md:inline-flex group relative items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-neutral-900 hover:text-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all overflow-hidden cursor-pointer" target="_blank" rel="noopener noreferrer">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0 whitespace-nowrap">currently AI prototyper @Apple</span>
            <span className="absolute left-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">Qiyu's LinkedIn</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-full z-10">"key-you" it is 🔑 🫵</div>
          </a>
          <a href="/" className="hidden md:inline text-sm font-medium text-neutral-900">Qiyu</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-center min-h-screen gap-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-neutral-900">
            Qiyu is designing technology that brings humans together
          </h1>
        </div>
        <div className="w-full max-w-[700px]">
          <InteractionDiagram active="me-loop" />
        </div>
      </section>

      {/* 4 Pillar sections */}
      {PILLARS.map((pillar) => (
        <PillarSection key={pillar.number} pillar={pillar} />
      ))}

      <footer className="mt-4 border-t border-neutral-200/60">
        <p className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-neutral-400">
          © 2026 — sketched with fountain pen & paper
        </p>
      </footer>

    </div>
  );
}
