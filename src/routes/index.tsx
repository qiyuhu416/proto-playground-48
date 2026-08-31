import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { CardIcon } from "./-CardIcon";
import { TextGradientScroll } from "@/components/TextGradientScroll";
import { NavbarWrapper } from "./-NavbarWrapper";
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";
import { TextHighlighter } from "@/components/TextHighlighter";

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
  toc?: string[];
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
    title: "How to understand others' mind?",
    description: "Understanding others is another black box.",
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
        slug: "what-do-prototypes-prototype",
        title: "What do prototypes prototype?",
        meta: "Solve the right problem",
        accent: "bg-gradient-to-br from-amber-100 to-orange-200",
        thumbnail: "/articles/prototype-triangle-thumb.svg",
        thumbnailSize: "medium",
        toc: ["Implementation", "Look & Feel", "Role"],
      },
      {
        slug: "meet-stranger",
        title: "Meet the stranger challenge",
        meta: "Connection · Open-ended",
        accent: "bg-gradient-to-br from-rose-100 to-pink-200",
        thumbnail: "/articles/meet-stranger-calendly.png",
      },
      {
        slug: "hello-humans",
        title: "Hello humans prototype",
        meta: "Very personal prototype",
        accent: "bg-gradient-to-br from-purple-100 to-pink-200",
        thumbnail: "/articles/hello-humans-notebook.jpg",
      },
      {
        slug: "oh-man",
        title: "Oh man",
        meta: "Very personal prototype",
        accent: "bg-neutral-100",
        comingSoon: true,
      },
    ],
  },
  {
    number: "02",
    subtitle: "",
    title: "How might we design AI's mind?",
    description: "AI that knows when humans need what",
    gapLeft: "Intent",
    gapRight: "Expression",
    activeGap: "bottom",
    cards: [
      {
        slug: "designing-for-conversations-that-earn-trust",
        title: "Conversational Design for trust",
        meta: "Bot for multi-stakeholder eldercare",
        accent: "bg-gradient-to-br from-green-100 to-emerald-200",
        thumbnail: "/articles/conversation-trust-icon.svg",
        thumbnailSize: "small",
      },
      {
        slug: "reimagining-the-chatbot",
        title: "The chatbot beyond a tab?",
        meta: "Exploring interface paradigms",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        thumbnail: "/articles/chatbot-thumb.png",
      },
      {
        slug: "google-cloud",
        title: "Launching AI for assisted browsing",
        meta: "0-1 for Google",
        accent: "bg-gradient-to-br from-blue-100 to-cyan-200",
        thumbnail: "/articles/google-cloud-hero.png",
      },
      {
        slug: "physical-ai",
        title: "Physical AI for service design",
        meta: "Understanding behavioral intent",
        accent: "bg-gradient-to-br from-slate-100 to-gray-200",
        thumbnail: "/articles/physical-ai-thumb.png",
      },
    ],
  },
  {
    number: "03",
    subtitle: "",
    title: "How might we know the real self?",
    description: "Tech-assisted self augmentation",
    gapLeft: "Unknown",
    gapRight: "Aware",
    activeGap: "me-loop",
    cards: [
      {
        slug: "claude-code-research",
        title: "How Claude shapes my thinking",
        meta: "AI workflow",
        accent: "bg-neutral-100",
        comingSoon: true,
      },
      {
        slug: "personalization",
        title: "Personalization? What is a Person?",
        meta: "Thoughts about the vision",
        accent: "bg-neutral-100",
        comingSoon: true,
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
    description: "Text is never the only way.",
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
      {
        slug: "birthday-card",
        title: "Birthday card",
        meta: "Motion · Delight",
        accent: "bg-gradient-to-br from-yellow-100 to-amber-200",
        videoPreview: "/articles/birthday-card.mp4",
        videoStartTime: 1,
      },
    ],
  },
];

// ── Interaction model diagram ─────────────────────────────────────────────────

function InteractionDiagram({ active }: { active: GapId }) {
  // Proportions: arcR ≈ 1.3× circle radius so circles fill the pill snugly
  const mex = 140, otx = 345, cy = 118, r = 58;
  const arcR = 76;          // just big enough to wrap the circle
  const yT = cy - arcR;     // 42
  const yB = cy + arcR;     // 194

  const base = { stroke: "#d8d8d8", strokeWidth: 1.5, fill: "none" } as const;
  const hi   = { stroke: "#171717", strokeWidth: 2,   fill: "none" } as const;
  const on   = (gap: GapId) => gap === active ? hi : base;
  const lf   = (gap: GapId) => gap === active ? "#404040" : "#c0c0c0";

  const tip = (pts: string, gap: GapId) => (
    <polyline points={pts} fill="none"
      stroke={gap === active ? "#171717" : "#d8d8d8"}
      strokeWidth={gap === active ? 2 : 1.5} />
  );

  return (
    <svg viewBox="0 0 490 240" className="block mx-auto w-full max-w-[480px]"
      fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── BASE PILL (always fully visible) ── */}
      <path d={`M ${mex},${yB} A ${arcR},${arcR} 0 0,0 ${mex},${yT}`} {...base} />
      <line x1={mex} y1={yT} x2={otx} y2={yT} {...base} />
      <path d={`M ${otx},${yT} A ${arcR},${arcR} 0 0,1 ${otx},${yB}`} {...base} />
      <line x1={otx} y1={yB} x2={mex} y2={yB} {...base} />

      {/* ── ACTIVE SEGMENT on top ── */}
      {active === "me-loop"     && <path d={`M ${mex},${yB} A ${arcR},${arcR} 0 0,0 ${mex},${yT}`} {...hi} />}
      {active === "top"         && <line x1={mex} y1={yT} x2={otx} y2={yT} {...hi} />}
      {active === "others-loop" && <path d={`M ${otx},${yT} A ${arcR},${arcR} 0 0,1 ${otx},${yB}`} {...hi} />}
      {active === "bottom"      && <line x1={otx} y1={yB} x2={mex} y2={yB} {...hi} />}

      {/* ── ARROWHEADS ── */}
      {/* Top → at right end */}
      {tip(`${otx-8},${yT-5} ${otx},${yT} ${otx-8},${yT+5}`, "top")}
      {/* Right arc ↙ at bottom */}
      {tip(`${otx+6},${yB-7} ${otx},${yB} ${otx-6},${yB-7}`, "others-loop")}
      {/* Bottom ← at left end */}
      {tip(`${mex+8},${yB-5} ${mex},${yB} ${mex+8},${yB+5}`, "bottom")}
      {/* Left arc ↗ at top */}
      {tip(`${mex-6},${yT+7} ${mex},${yT} ${mex+6},${yT+7}`, "me-loop")}

      {/* ── CIRCLES ── */}
      <circle cx={mex} cy={cy} r={r} stroke="#d0d0d0" strokeWidth="1.5" />
      <text x={mex} y={cy+4} textAnchor="middle" fontSize="12" fill="#737373"
        fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500">ME</text>

      <circle cx={otx} cy={cy} r={r} stroke="#d0d0d0" strokeWidth="1.5" />
      <text x={otx} y={cy+4} textAnchor="middle" fontSize="12" fill="#737373"
        fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500">OTHERS</text>

      {/* ── LABELS ── */}
      <text x={(mex+otx)/2} y={yT-11} textAnchor="middle" fontSize="8"
        fill={lf("top")} fontFamily="ui-sans-serif, system-ui, sans-serif">
        Intent → Reception
      </text>
      <text x={(mex+otx)/2} y={yB+18} textAnchor="middle" fontSize="8"
        fill={lf("bottom")} fontFamily="ui-sans-serif, system-ui, sans-serif">
        Form → Meaning
      </text>
      <text x={mex-arcR-10} y={cy-7} textAnchor="end" fontSize="8.5"
        fill={lf("me-loop")} fontFamily="ui-sans-serif, system-ui, sans-serif">assume</text>
      <text x={mex-arcR-10} y={cy+10} textAnchor="end" fontSize="8.5"
        fill={lf("me-loop")} fontFamily="ui-sans-serif, system-ui, sans-serif">aware</text>
      <text x={otx+arcR+10} y={cy-7} textAnchor="start" fontSize="8.5"
        fill={lf("others-loop")} fontFamily="ui-sans-serif, system-ui, sans-serif">expect</text>
      <text x={otx+arcR+10} y={cy+10} textAnchor="start" fontSize="8.5"
        fill={lf("others-loop")} fontFamily="ui-sans-serif, system-ui, sans-serif">reality</text>

    </svg>
  );
}


// ── Hand-drawn interactive diagram ────────────────────────────────────────────

const DIAGRAM_W = 1507, DIAGRAM_H = 572;

const HERO_CONTENT: Record<"default" | GapId, { tag: string; text: string }> = {
  "default":      { tag: "", text: "Qiyu designs technology that brings people together, prototyping new ways for humans, AI, and each other to interact." },
  "top":          { tag: "What I do or say", text: "There's always a gap between what we mean internally and how it actually lands in the world. Design bridges this through careful attention to expression, clarity, and presence." },
  "bottom":       { tag: "What others do or say",     text: "Understanding what others mean is a black box. Design minimizes the gap between what is said and what is actually understood through thoughtful communication patterns." },
  "me-loop":      { tag: "How I interpret what others do or say", text: "Who we become is constantly shaped by how we interact with others. Every interaction leaves a trace, reshaping our identity, beliefs, and sense of self." },
  "others-loop":  { tag: "How others interpret what others do or say",   text: "Understanding others feels impossible, like a black box. But maybe that's where meaningful design happens—honoring what we cannot fully know, while creating space for genuine connection." },
};

type SegmentDef = { src: string; x1: number; y1: number; x2: number; y2: number };

// Crop boxes match the Python crop script exactly
const SEGMENTS: Record<GapId, SegmentDef> = {
  top:            { src: "/articles/diagram-top.png",          x1: 195, y1:  42, x2: 1340, y2: 160 },
  bottom:         { src: "/articles/diagram-bottom.png",       x1: 195, y1: 445, x2: 1340, y2: 535 },
  "me-loop":      { src: "/articles/diagram-me-loop.png",      x1:  77, y1:  58, x2:  195, y2: 540 },
  "others-loop":  { src: "/articles/diagram-others-loop.png",  x1: 1350, y1: 58, x2: 1469, y2: 540 },
};

// SVG hit-area geometry calibrated to new 1507×572 image
// Arc geometry: elliptical (rx ≠ ry) because the drawing is wider than tall
const mex = 195, otx = 1190;
const yT = 73, yB = 485;
const leftRx = 118, rightRx = 275, arcRy = 206;

const GAP_TO_PILLAR: Record<GapId, string> = {
  "others-loop": "01",
  "bottom":      "02",
  "me-loop":     "03",
  "top":         "04",
};

function HandDrawnDiagram({ onHover }: { onHover: (gap: GapId | null) => void }) {
  const [hovered, setHovered] = useState<GapId | null>(null);
  const enter = (g: GapId) => () => { setHovered(g); onHover(g); };
  const leave = () => { setHovered(null); onHover(null); };
  const click = (g: GapId) => () => {
    const el = document.getElementById(`pillar-${GAP_TO_PILLAR[g]}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visible = (gap: GapId) => hovered === gap;

  return (
    <div className="relative block mx-auto w-full max-w-2xl">

      {/* Base — full diagram faded */}
      <img
        src="/articles/diagram-handdrawn.png"
        alt="Human interaction model"
        className="block w-full"
        style={{ opacity: 0.38 }}
      />

      {/* Segment overlays — shown on hover OR when selected */}
      {(Object.entries(SEGMENTS) as [GapId, SegmentDef][]).map(([gap, s]) => (
        <img
          key={gap}
          src={s.src}
          alt=""
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left:    `${(s.x1 / DIAGRAM_W * 100).toFixed(2)}%`,
            top:     `${(s.y1 / DIAGRAM_H * 100).toFixed(2)}%`,
            width:   `${((s.x2 - s.x1) / DIAGRAM_W * 100).toFixed(2)}%`,
            height:  `${((s.y2 - s.y1) / DIAGRAM_H * 100).toFixed(2)}%`,
            opacity: visible(gap) ? 1 : 0,
            transition: "opacity 160ms",
          }}
        />
      ))}

      {/* SVG hit areas + annotations */}
      <svg
        viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        style={{ pointerEvents: "none" }}
      >
        {/* Hit areas */}
        {(["me-loop", "top", "others-loop", "bottom"] as GapId[]).map((gap) => {
          const h = { stroke: "transparent", strokeWidth: 100, fill: "none",
                      style: { pointerEvents: "all" as const, cursor: "pointer" },
                      onMouseEnter: enter(gap), onMouseLeave: leave,
                      onClick: click(gap) };
          if (gap === "top")
            return <line key={gap} x1={mex} y1={yT} x2={otx} y2={yT} {...h} />;
          if (gap === "bottom")
            return <line key={gap} x1={otx} y1={yB} x2={mex} y2={yB} {...h} />;
          if (gap === "me-loop")
            return <path key={gap} d={`M ${mex},${yB} A ${leftRx},${arcRy} 0 0,1 ${mex},${yT}`} {...h} />;
          return <path key={gap} d={`M ${otx},${yT} A ${rightRx},${arcRy} 0 0,1 ${otx},${yB}`} {...h} />;
        })}


        {/* Annotations — bigger and handwritten style, red by default, black on hover */}
        <text x={mex + 30} y={yT - 20} fontSize="56" fontWeight="700" fill={hovered === "top" ? "#171717" : "#d32f2f"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>1</text>
        <text x={otx + 290} y={yT + yB / 2} fontSize="56" fontWeight="700" fill={hovered === "others-loop" ? "#171717" : "#d32f2f"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>2</text>
        <text x={otx - 40} y={yB + 30} fontSize="56" fontWeight="700" fill={hovered === "bottom" ? "#171717" : "#d32f2f"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>3</text>
        <text x={mex - 170} y={yT + yB / 2} fontSize="56" fontWeight="700" fill={hovered === "me-loop" ? "#171717" : "#d32f2f"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>4</text>
      </svg>
    </div>
  );
}


// ── Card ──────────────────────────────────────────────────────────────────────

function CardItem({ card, onCardClick }: { card: PillarCard; onCardClick?: (slug: string) => void }) {
  const href = card.externalLink || `/${card.slug}`;
  const isExternal = !!card.externalLink;
  const Wrapper = card.comingSoon ? "div" : (isExternal ? "a" : "button");

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector("video");
    if (v) { v.currentTime = card.videoStartTime ?? 0; v.play(); }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget.querySelector("video");
    if (v) { v.pause(); v.currentTime = card.videoStartTime ?? 0; }
  };

  const handleClick = isExternal ? undefined : (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick?.(card.slug);
  };

  const wrapperProps = !card.comingSoon
    ? isExternal
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { onClick: handleClick, type: "button" as const }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-[340px] flex-shrink-0 rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all block text-left border-0 cursor-pointer ${card.comingSoon ? "cursor-default opacity-40" : "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"}`}
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

function PillarCarousel({ cards, onCardClick }: { cards: PillarCard[]; onCardClick?: (slug: string) => void }) {
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
            <CardItem key={card.slug} card={card} onCardClick={onCardClick} />
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

const SECTION_ICONS: Record<string, string> = {
  "01": "/articles/section-01-icon.png",
  "02": "/articles/section-02-icon.png",
  "03": "/articles/section-03-icon.png",
  "04": "/articles/section-04-icon.png",
};

function PillarSection({ pillar, onCardClick }: { pillar: Pillar; onCardClick?: (slug: string) => void }) {
  return (
    <section
      id={`pillar-${pillar.number}`}
      className="pb-16"
    >
      {/* Header — constrained to content width */}
      <div className="mx-auto max-w-6xl px-6 pt-14 mb-10">
        <h2 className="text-2xl font-medium text-neutral-900 mb-2">{pillar.title}</h2>
        <p className="text-neutral-600 text-sm">{pillar.description}</p>
      </div>

      {/* Carousel — full bleed to screen edge */}
      <PillarCarousel cards={pillar.cards} onCardClick={onCardClick} />
    </section>
  );
}

// ── 2D Articles Matrix ────────────────────────────────────────────────────────

interface MatrixArticle {
  slug: string;
  title: string;
  company?: string;
  x: number;
  y: number;
  pillarTheme?: string;
  workType?: string;
}

const MATRIX_ARTICLES: MatrixArticle[] = [
  { slug: "design-as-a-research-tool", title: "Service Design", company: "Pittsburgh Parking Authority", x: 0.68, y: 0.40, pillarTheme: "UNDERSTAND OTHERS' MIND", workType: "Design Research" },
  { slug: "designing-for-conversations-that-earn-trust", title: "Conversational Design & AI Affiliation", company: "AI caring", x: 0.85, y: 0.15, pillarTheme: "DESIGN AI'S MIND", workType: "Conversational Design" },
  { slug: "reimagining-the-chatbot", title: "Reimagine Chatbot", company: "Apple", x: 0.75, y: 0.65, pillarTheme: "DESIGN AI'S MIND", workType: "Interface Design" },
  { slug: "google-cloud", title: "Assisted Browsing", company: "Launched @Google", x: 0.20, y: 0.75, pillarTheme: "DESIGN AI'S MIND", workType: "Product Launch" },
  { slug: "physical-ai", title: "Physical AI", company: "Archetype AI", x: 0.55, y: 0.50, pillarTheme: "DESIGN AI'S MIND", workType: "Service Design" },
  { slug: "product-launch-from-0-1", title: "0-1 E-Commerce App", company: "Meetfood", x: 0.10, y: 0.35, pillarTheme: "EXPRESS YOURSELF", workType: "0-1 Launch" },
];

function ArticlesMatrix({ onCardClick }: { onCardClick: (slug: string) => void }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hLineFixed, setHLineFixed] = useState({ top: 0, opacity: 0 });
  const [vLineFixed, setVLineFixed] = useState({ left: 0, opacity: 0 });
  const [matrixContentVisible, setMatrixContentVisible] = useState(true);
  const { scrollY } = useScroll();
  const [dotPositions, setDotPositions] = useState({
    topLeft: { x: 40, y: 40 },
    leftAxis: { x: 40, y: 0 },
    bottomAxis: { x: 40, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });
  const [isInCornerTrigger, setIsInCornerTrigger] = useState(false);

  // Track scroll: both axis lines climb/slide to the 40px edge spacing, then
  // STAY pinned there (fixed to viewport) for the full height of the next section.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const EDGE = 40;
    const VH = window.innerHeight;
    const VW = window.innerWidth;
    const matrixTopDoc = latest + rect.top; // constant document-space position of matrix top
    const scrolledPast = latest - matrixTopDoc; // 0 once matrix exactly fills the viewport
    const dwell = VH * 0.35; // grace period: user can rest here before the transition engages
    const climbDistance = VH * 0.5;
    const pinnedDistance = VH; // matches next section's h-screen height
    const effectivePast = Math.max(0, scrolledPast - dwell);

    let t = 0;
    let opacity = 0;
    if (effectivePast <= 0) {
      t = 0;
      opacity = 0;
    } else if (effectivePast <= climbDistance) {
      t = effectivePast / climbDistance;
      opacity = 1;
    } else if (effectivePast <= climbDistance + pinnedDistance) {
      t = 1;
      opacity = 1;
    } else {
      t = 1;
      opacity = 0;
    }

    // Hide everything in the matrix except the two lines while transitioning/pinned
    setMatrixContentVisible(effectivePast <= 0);

    // Horizontal line: bottom of screen → 40px from top
    const hTop = (VH - EDGE) + t * (EDGE - (VH - EDGE));
    setHLineFixed({ top: hTop, opacity });

    // Vertical line: left edge (40px) → right edge (40px from right)
    const vLeft = EDGE + t * ((VW - EDGE) - EDGE);
    setVLineFixed({ left: vLeft, opacity });
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const margin = 40;
  const plotWidth = containerSize.width - margin * 2;
  const plotHeight = containerSize.height - margin * 2;

  return (
    <section className="bg-white border-t border-neutral-200/40 snap-start">

      <div
        ref={containerRef}
        className="w-full relative"
        style={{ height: "100vh" }}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const margin = 40;
            const gap = 40;
            const moveStrength = 0.08; // Slower easing (lower = slower). Adjust this value to tune speed

            setCursorPos({ x, y });

            // Default dot positions
            const defaultDots = {
              topLeft: { x: margin, y: margin },
              leftAxis: { x: margin, y: containerSize.height - margin - gap },
              bottomAxis: { x: margin + gap, y: containerSize.height - margin },
              bottomRight: { x: containerSize.width - margin, y: containerSize.height - margin }
            };

            // Check corner trigger areas
            const isInBottomLeftCorner = x < margin && y > (containerSize.height - margin);
            const isInBottomRightCorner = x > (containerSize.width - margin) && y > (containerSize.height - margin);
            const isInTopLeftCorner = x < margin && y < margin;
            const isInTopRightCorner = x > (containerSize.width - margin) && y < margin;
            const inAnyCorner = isInBottomLeftCorner || isInBottomRightCorner || isInTopLeftCorner || isInTopRightCorner;

            setIsInCornerTrigger(inAnyCorner);

            const newDots = { ...defaultDots };

            // Responsive shift amount based on screen size (10% of smaller dimension)
            const shiftAmount = Math.min(containerSize.width, containerSize.height) * 0.8;

            if (isInBottomLeftCorner) {
              const centerY = containerSize.height - margin;
              const centerX = margin;
              // All dots move away from center with equal shift on both axes
              newDots.topLeft.y += (centerY + shiftAmount - newDots.topLeft.y) * moveStrength;
              newDots.leftAxis.y += (centerY + shiftAmount - newDots.leftAxis.y) * moveStrength;
              newDots.bottomAxis.x += (centerX - shiftAmount - newDots.bottomAxis.x) * moveStrength;
              newDots.bottomRight.x += (centerX - shiftAmount - newDots.bottomRight.x) * moveStrength;
            } else if (isInBottomRightCorner) {
              const centerX2 = containerSize.width - margin;
              const centerY = containerSize.height - margin;
              newDots.topLeft.y += (centerY + shiftAmount - newDots.topLeft.y) * moveStrength;
              newDots.leftAxis.y += (centerY + shiftAmount - newDots.leftAxis.y) * moveStrength;
              newDots.bottomAxis.x += (centerX2 + shiftAmount - newDots.bottomAxis.x) * moveStrength;
              newDots.bottomRight.x += (centerX2 + shiftAmount - newDots.bottomRight.x) * moveStrength;
            } else if (isInTopLeftCorner) {
              const centerY2 = margin;
              const centerX = margin;
              newDots.topLeft.y += (centerY2 - shiftAmount - newDots.topLeft.y) * moveStrength;
              newDots.leftAxis.y += (containerSize.height - margin + shiftAmount - newDots.leftAxis.y) * moveStrength;
              newDots.bottomAxis.x += (centerX - shiftAmount - newDots.bottomAxis.x) * moveStrength;
              newDots.bottomRight.x += (centerX - shiftAmount - newDots.bottomRight.x) * moveStrength;
            } else if (isInTopRightCorner) {
              const centerX2 = containerSize.width - margin;
              const centerY2 = margin;
              newDots.topLeft.y += (centerY2 - shiftAmount - newDots.topLeft.y) * moveStrength;
              newDots.leftAxis.y += (containerSize.height - margin + shiftAmount - newDots.leftAxis.y) * moveStrength;
              newDots.bottomAxis.x += (centerX2 + shiftAmount - newDots.bottomAxis.x) * moveStrength;
              newDots.bottomRight.x += (centerX2 + shiftAmount - newDots.bottomRight.x) * moveStrength;
            }

            setDotPositions(newDots);
          }
        }}
      >
        {containerSize.width > 0 && (
          <svg
            viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
            className="w-full h-full absolute inset-0"
            style={{
              overflow: "visible",
              pointerEvents: "none",
              opacity: matrixContentVisible ? 1 : 0,
              transition: "opacity 200ms",
            }}
          >

            {/* Resting axis lines - visible before scroll transition begins */}
            <line
              x1={margin}
              y1={dotPositions.topLeft.y}
              x2={margin}
              y2={containerSize.height}
              stroke="#808080"
              strokeWidth="1.5"
              style={{ transition: "y1 800ms ease-out" }}
            />
            <line
              x1={0}
              y1={containerSize.height - margin}
              x2={dotPositions.bottomRight.x}
              y2={containerSize.height - margin}
              stroke="#808080"
              strokeWidth="1.5"
              style={{ transition: "x2 800ms ease-out" }}
            />

            {/* Trigger area - bottom-left corner */}
            <rect x={0} y={containerSize.height - margin} width={margin} height={margin} fill="#000000" opacity="0.3" />

            {/* Axis labels */}
            <text
              x={containerSize.width - margin - 10}
              y={containerSize.height - margin + 25}
              textAnchor="end"
              fontSize="12"
              fill="#737373"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
            >
              FUTURE CONCEPTS
            </text>
            <text
              x={margin + 10}
              y={containerSize.height - margin + 25}
              textAnchor="start"
              fontSize="12"
              fill="#737373"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
            >
              PRODUCTION
            </text>
            <text
              x={margin - 25}
              y={margin}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#737373"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
              transform={`rotate(-90 ${margin - 25} ${margin})`}
            >
              OTHERS
            </text>
            <text
              x={margin - 25}
              y={containerSize.height - margin - 40}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#737373"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
              transform={`rotate(-90 ${margin - 25} ${containerSize.height - margin - 40})`}
            >
              SELF
            </text>

            {/* Axis corner dots - animated */}
            {(() => {
              return (
                <>
                  <circle cx={dotPositions.topLeft.x} cy={dotPositions.topLeft.y} r="6" fill="#d32f2f" style={{ transition: "cy 800ms ease-out" }} />
                  <circle cx={dotPositions.leftAxis.x} cy={dotPositions.leftAxis.y} r="6" fill="#d32f2f" style={{ transition: "cy 800ms ease-out" }} />
                  <circle cx={dotPositions.bottomAxis.x} cy={dotPositions.bottomAxis.y} r="6" fill="#d32f2f" style={{ transition: "cx 800ms ease-out" }} />
                  <circle cx={dotPositions.bottomRight.x} cy={dotPositions.bottomRight.y} r="6" fill="#d32f2f" style={{ transition: "cx 800ms ease-out" }} />
                </>
              );
            })()}

            {/* Cursor tracking lines - color changes on button hover */}
            <line
              x1={cursorPos.x}
              y1={0}
              x2={cursorPos.x}
              y2={containerSize.height}
              stroke={hoveredSlug ? "#d32f2f" : "#d8d8d8"}
              strokeWidth="1"
              opacity={hoveredSlug ? "0.6" : "0.4"}
            />
            <line
              x1={0}
              y1={cursorPos.y}
              x2={containerSize.width}
              y2={cursorPos.y}
              stroke={hoveredSlug ? "#d32f2f" : "#d8d8d8"}
              strokeWidth="1"
              opacity={hoveredSlug ? "0.6" : "0.4"}
            />
            {/* Cursor indicator dot */}
            <rect
              x={cursorPos.x - 4}
              y={cursorPos.y - 4}
              width="8"
              height="8"
              fill={hoveredSlug ? "#d32f2f" : "#ff9800"}
            />

            {/* Hover labels */}
            {hoveredSlug && (() => {
              const article = MATRIX_ARTICLES.find(a => a.slug === hoveredSlug);
              if (!article) return null;
              return (
                <>
                  {/* Y-axis label (pillar theme) */}
                  <text
                    x={margin + 8}
                    y={cursorPos.y - 8}
                    fontSize="12"
                    fill="#d32f2f"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontWeight="500"
                  >
                    {article.pillarTheme}
                  </text>
                  {/* X-axis label (work type) - horizontal along the line */}
                  <text
                    x={cursorPos.x + 12}
                    y={containerSize.height - margin - 8}
                    fontSize="12"
                    fill="#d32f2f"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontWeight="500"
                  >
                    {article.workType?.toUpperCase()}
                  </text>
                </>
              );
            })()}

          </svg>
        )}

        {/* Article pills - hidden while the axis lines are transitioning/pinned */}
        <div
          style={{
            opacity: matrixContentVisible ? 1 : 0,
            pointerEvents: matrixContentVisible ? "auto" : "none",
            transition: "opacity 200ms",
          }}
        >
          {MATRIX_ARTICLES.map((article) => {
            const x = margin + article.x * plotWidth;
            const y = containerSize.height - margin - article.y * plotHeight;

            const distance = Math.sqrt(
              Math.pow(cursorPos.x - x, 2) + Math.pow(cursorPos.y - y, 2)
            );
            const maxDistance = 200;
            const scale = Math.max(1, 1 + (maxDistance - distance) / maxDistance * 0.15);

            return (
              <button
                key={article.slug}
                onClick={() => onCardClick(article.slug)}
                onMouseEnter={() => setHoveredSlug(article.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                style={{
                  position: "absolute",
                  left: `${(x / containerSize.width) * 100}%`,
                  top: `${(y / containerSize.height) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transition: "transform 80ms ease-out, opacity 80ms ease-out",
                  opacity: isInCornerTrigger ? 0.3 : 1,
                }}
                className="px-6 py-4 bg-transparent text-neutral-900 text-sm font-medium rounded-2xl hover:bg-neutral-50 transition-all hover:shadow-lg cursor-pointer border-2 border-neutral-900 flex flex-col items-center gap-1"
              >
                <div>{article.title}</div>
                {article.company && (
                  <div className="text-neutral-500 text-xs">{article.company}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal line: climbs from the bottom of the screen, then stays fixed
          40px from the top of the viewport for the duration of the next section */}
      <div
        className="fixed left-0 w-full h-px bg-neutral-400 pointer-events-none z-30"
        style={{ top: hLineFixed.top, opacity: hLineFixed.opacity }}
      />

      {/* Vertical line: slides from the left edge to 40px from the right edge, then stays
          fixed there, spanning the full viewport height for the duration of the next section */}
      <div
        className="fixed top-0 h-screen w-px bg-neutral-400 pointer-events-none z-30"
        style={{ left: vLineFixed.left, opacity: vLineFixed.opacity }}
      />

      {/* Lower-left area tracked between the two lines - always solid black while they're active */}
      <div
        className="fixed left-0 bg-black pointer-events-none z-20"
        style={{
          top: hLineFixed.top,
          width: vLineFixed.left,
          height: `calc(100vh - ${hLineFixed.top}px)`,
          opacity: hLineFixed.opacity,
        }}
      />

    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function Index() {
  const navigate = useNavigate();
  const [heroGap, setHeroGap] = useState<GapId | null>(null);
  const [diagramExpanded, setDiagramExpanded] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isFull, setIsFull] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const findCard = (slug: string): PillarCard | undefined => {
    for (const pillar of PILLARS) {
      const card = pillar.cards.find(c => c.slug === slug);
      if (card) return card;
    }
    return undefined;
  };

  const handleCardClick = (slug: string) => {
    const card = findCard(slug);
    if (!card?.externalLink) {
      setIsFull(false);
      setSelectedCard(slug);
    } else {
      window.open(card.externalLink, '_blank');
    }
  };

  useEffect(() => {
    if (!selectedCard) {
      document.body.classList.remove("modal-open");
      return;
    }
    document.body.classList.add("modal-open");
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [selectedCard]);

  const card = selectedCard ? findCard(selectedCard) : undefined;

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <NavbarWrapper />

      {/* Card Modal */}
      {selectedCard && card && !card.externalLink && (
        <>
          {!isFull && (
            <div className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCard(null)} />
          )}
          <div
            className="transition-all duration-300 relative flex flex-col"
            style={{
              position: "fixed",
              zIndex: 60,
              top: isFull ? 0 : "clamp(24px, 5vh, 48px)",
              right: isFull ? 0 : "clamp(16px, 8vw, 120px)",
              bottom: isFull ? 0 : "clamp(24px, 5vh, 48px)",
              left: isFull ? 0 : "clamp(16px, 8vw, 120px)",
              borderRadius: isFull ? 0 : 16,
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable container with aiverse pattern */}
            <div
              className="w-full h-full overflow-y-auto flex flex-col bg-white"
              style={{
                overscrollBehavior: "contain",
              }}
            >
              {/* Sticky Header */}
              <header className="sticky top-0 z-10 bg-white border-b border-neutral-200/50 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-sm font-medium text-neutral-900 truncate">{card.title}</h2>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-2 cursor-pointer rounded-full bg-transparent hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                    title="Close"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6 18 18" />
                    </svg>
                  </button>
                </div>
              </header>

              {/* Scrollable Content */}
              <div className="flex-1 w-full">
                <iframe
                  ref={iframeRef}
                  src={`/${card.slug}`}
                  className="w-full h-full border-0"
                  title={card.title}
                  onLoad={() => {
                    const iframe = iframeRef.current;
                    if (!iframe?.contentWindow) return;
                    const handleScroll = () => {
                      const scrolled = iframe.contentWindow?.scrollY || iframe.contentDocument?.documentElement.scrollTop || 0;
                      setIsFull(scrolled > 30);
                    };
                    iframe.contentWindow.addEventListener("scroll", handleScroll, { passive: true });
                    iframe.contentDocument?.addEventListener("scroll", handleScroll, { passive: true });
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero section - diagram + paragraph with expandable diagram */}
      <section className={`relative w-full flex flex-col gap-0 transition-all duration-300 pt-[30vh] ${diagramExpanded ? 'min-h-auto' : 'min-h-screen'}`}>
        {/* Diagram section - expandable */}
        <div
          onClick={() => setDiagramExpanded(!diagramExpanded)}
          className={`flex flex-col items-center justify-center px-6 gap-0 bg-background cursor-pointer transition-all duration-300 ${
            diagramExpanded ? 'h-auto py-8' : 'flex-none h-32 sm:h-40 md:h-48 lg:h-56 py-0'
          }`}
        >
          {diagramExpanded && (
            <img
              src="/articles/hello-stranger.png"
              alt="Hello, stranger!!"
              className="block mx-auto w-full max-w-[120px] h-auto mb-4"
              style={{ mixBlendMode: "multiply", opacity: 0.5 }}
            />
          )}
          <div className={`flex justify-center w-full transition-transform duration-300 ${diagramExpanded ? 'scale-75 origin-top' : 'scale-50 origin-top -my-6'}`}>
            <HandDrawnDiagram onHover={setHeroGap} />
          </div>
          {diagramExpanded && (
            <div className="relative w-full flex justify-center px-6 min-h-[20px] mt-4">
              {heroGap && (
                <p className="tag-style text-sm">
                  {HERO_CONTENT[heroGap].tag}
                </p>
              )}
              {!heroGap && (
                <p className="tag-style text-xs">in human-human interaction, 1 != 2 != 3 != 4 != 1</p>
              )}
            </div>
          )}
        </div>

        {/* Paragraph section - flexible height */}
        <div className={`flex flex-col items-center justify-center overflow-hidden w-full transition-all duration-300 ${diagramExpanded ? 'flex-[3]' : 'flex-[4]'}`}>
          <HeroScrollAnimation />
        </div>
      </section>

      {/* 2D Matrix */}
      <ArticlesMatrix onCardClick={handleCardClick} />

      {/* New Section - the matrix's axis lines (rendered by ArticlesMatrix as fixed overlays) land and pin here */}
      <section className="relative w-full h-screen px-6 snap-start">
        <div className="mx-auto max-w-6xl h-full">
          <div className="h-full flex items-center justify-center text-center">
            <p className="text-neutral-400">Coming soon</p>
          </div>
        </div>
      </section>

      {/* 4 Pillar sections */}
      {PILLARS.map((pillar) => (
        <PillarSection key={pillar.number} pillar={pillar} onCardClick={handleCardClick} />
      ))}

      <footer className="mt-4 border-t border-neutral-200/60">
        <p className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-neutral-400">
          © 2026 — sketched with fountain pen & paper
        </p>
      </footer>

    </div>
  );
}
