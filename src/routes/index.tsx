import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardIcon } from "./-CardIcon";
import { TextGradientScroll } from "@/components/TextGradientScroll";

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
    title: "How do we design feedback?",
    description: "The gap between intent and expression",
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
    description: "Who we are is constantly shaped by how we interact with the external world.",
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
  "top":          { tag: "1: What I do or say", text: "There's always a gap between what we mean internally and how it actually lands in the world. Design bridges this through careful attention to expression, clarity, and presence." },
  "bottom":       { tag: "3: What others do or say",     text: "Understanding what others mean is a black box. Design minimizes the gap between what is said and what is actually understood through thoughtful communication patterns." },
  "me-loop":      { tag: "2: How I interpret what others do or say", text: "Who we become is constantly shaped by how we interact with others. Every interaction leaves a trace, reshaping our identity, beliefs, and sense of self." },
  "others-loop":  { tag: "4: How others interpret what others do or say",   text: "Understanding others feels impossible, like a black box. But maybe that's where meaningful design happens—honoring what we cannot fully know, while creating space for genuine connection." },
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

// ── Page ──────────────────────────────────────────────────────────────────────

function Index() {
  const [heroGap, setHeroGap] = useState<GapId | null>(null);
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



      {/* Card Modal */}
      {selectedCard && card && !card.externalLink && (
        <>
          {!isFull && (
            <div className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCard(null)} />
          )}
          <div
            className="bg-white transition-all duration-300 relative"
            style={{
              position: "fixed",
              zIndex: 60,
              top: isFull ? 0 : "clamp(24px, 5vh, 48px)",
              right: isFull ? 0 : "clamp(16px, 8vw, 120px)",
              bottom: isFull ? 0 : "clamp(24px, 5vh, 48px)",
              left: isFull ? 0 : "clamp(16px, 8vw, 120px)",
              borderRadius: isFull ? 0 : 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
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
        </>
      )}

      {/* Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center">
        {/* Diagram + Gap tag section — grouped at 20% from top, full screen height */}
        <div className="mt-[20vh] min-h-screen flex flex-col items-center justify-center px-6 gap-6">
          <img
            src="/articles/hello-stranger.png"
            alt="Hello, stranger!!"
            className="block mx-auto w-full max-w-[300px]"
            style={{ mixBlendMode: "multiply", opacity: 0.5 }}
          />
          <div className="flex justify-center w-full">
            <HandDrawnDiagram onHover={setHeroGap} />
          </div>

          {/* Gap tag — shows default or hovered gap tag */}
          <div className="relative w-full flex justify-center px-6 min-h-[28px]">
            {heroGap && (
              <p className="tag-style">
                {HERO_CONTENT[heroGap].tag}
              </p>
            )}
            {!heroGap && (
              <p className="tag-style">in human-human interaction, 1 != 2 != 3 != 4 != 1</p>
            )}
          </div>
        </div>

        {/* Paragraph section — always shows default text */}
        <div className="mx-auto max-w-6xl px-6 py-12 mb-20 text-center">
          <TextGradientScroll
            text={HERO_CONTENT["default"].text}
            type="letter"
            textOpacity="soft"
            className="text-2xl md:text-4xl text-neutral-900 leading-relaxed font-medium justify-center"
          />
        </div>
      </section>

      {/* 4 Pillar sections */}
      {PILLARS.map((pillar) => (
        <PillarSection key={pillar.number} pillar={pillar} onCardClick={setSelectedCard} />
      ))}

      <footer className="mt-4 border-t border-neutral-200/60">
        <p className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-neutral-400">
          © 2026 — sketched with fountain pen & paper
        </p>
      </footer>

    </div>
  );
}
