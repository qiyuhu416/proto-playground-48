import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardIcon } from "./-CardIcon";
import { TextGradientScroll } from "@/components/TextGradientScroll";
import { NavbarWrapper } from "./-NavbarWrapper";
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";
import { TextHighlighter } from "@/components/TextHighlighter";
import { CardModal } from "@/components/CardModal";
import { QuadrantSection } from "@/components/QuadrantSection";

import { Eyebrow } from "@/components/system";
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
    title: "How to Understand Others' Mind?",
    description: "Understanding others is another black box.",
    gapLeft: "Assumption",
    gapRight: "Understanding",
    activeGap: "others-loop",
    cards: [
      {
        slug: "design-as-a-research-tool",
        title: "Research Through Design",
        meta: "User-centered service design",
        accent: "bg-gradient-to-br from-teal-100 to-cyan-200",
        thumbnail: "/articles/design-as-research-tool-thumb.png",
      },
      {
        slug: "what-do-prototypes-prototype",
        title: "What Do Prototypes Prototype?",
        meta: "Solve the right problem",
        accent: "bg-gradient-to-br from-amber-100 to-orange-200",
        thumbnail: "/articles/prototype-triangle-thumb.svg",
        thumbnailSize: "medium",
        toc: ["Implementation", "Look & Feel", "Role"],
      },
      {
        slug: "meet-stranger",
        title: "Meet the Stranger Challenge",
        meta: "Connection · Open-ended",
        accent: "bg-gradient-to-br from-rose-100 to-pink-200",
        thumbnail: "/articles/meet-stranger-calendly.png",
      },
      {
        slug: "hello-humans",
        title: "Hello Humans Prototype",
        meta: "Very personal prototype",
        accent: "bg-gradient-to-br from-purple-100 to-pink-200",
        thumbnail: "/articles/hello-humans-notebook.jpg",
      },
      {
        slug: "oh-man",
        title: "Oh Man",
        meta: "Very personal prototype",
        accent: "bg-muted",
        comingSoon: true,
      },
    ],
  },
  {
    number: "02",
    subtitle: "",
    title: "How Might We Design AI's Mind?",
    description: "AI that knows when humans need what",
    gapLeft: "Intent",
    gapRight: "Expression",
    activeGap: "bottom",
    cards: [
      {
        slug: "designing-for-conversations-that-earn-trust",
        title: "Conversational Design for Trust",
        meta: "Bot for multi-stakeholder eldercare",
        accent: "bg-gradient-to-br from-green-100 to-emerald-200",
        thumbnail: "/articles/conversation-trust-icon.svg",
        thumbnailSize: "small",
      },
      {
        slug: "reimagining-the-chatbot",
        title: "The Chatbot Beyond a Tab?",
        meta: "Exploring interface paradigms",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        thumbnail: "/articles/chatbot-thumb.png",
      },
      {
        slug: "google-cloud",
        title: "Launching AI for Assisted Browsing",
        meta: "0-1 for Google",
        accent: "bg-gradient-to-br from-blue-100 to-cyan-200",
        thumbnail: "/articles/google-cloud-hero.png",
      },
      {
        slug: "physical-ai",
        title: "Physical AI for Service Design",
        meta: "Understanding behavioral intent",
        accent: "bg-gradient-to-br from-muted to-border",
        thumbnail: "/articles/physical-ai-thumb.png",
      },
    ],
  },
  {
    number: "03",
    subtitle: "",
    title: "How Might We Know the Real Self?",
    description: "Tech-assisted self augmentation",
    gapLeft: "Unknown",
    gapRight: "Aware",
    activeGap: "me-loop",
    cards: [
      {
        slug: "claude-code-research",
        title: "How Claude Shapes My Thinking",
        meta: "AI workflow",
        accent: "bg-muted",
        comingSoon: true,
      },
      {
        slug: "personalization",
        title: "Personalization? What Is a Person?",
        meta: "Thoughts about the vision",
        accent: "bg-muted",
        comingSoon: true,
      },
      {
        slug: "aios",
        title: "AIOS to See My Unknown-Unknowns",
        meta: "Self-discovery",
        accent: "bg-muted",
        comingSoon: true,
      },
      {
        slug: "ai-journaling",
        title: "AI-Assisted Journaling",
        meta: "Self-discovery through reflection",
        accent: "bg-muted",
        comingSoon: true,
      },
    ],
  },
  {
    number: "04",
    subtitle: "",
    title: "Is There Another Way to Express Yourself?",
    description: "Text is never the only way.",
    gapLeft: "Intent",
    gapRight: "Expression",
    activeGap: "top",
    cards: [
      {
        slug: "product-launch-from-0-1",
        title: "Product Launch from 0–1",
        meta: "Changing through Creating",
        accent: "bg-gradient-to-br from-pink-100 to-red-200",
        thumbnail: "/articles/product-launch-thumb.png",
        externalLink: "https://meetfood.us/",
      },
      {
        slug: "hand-gesture-interactions",
        title: "Hand Gesture Interactions",
        meta: "Physical expression",
        accent: "bg-gradient-to-br from-sky-100 to-blue-200",
        videoPreview: "/articles/hand-gesture.mp4",
        videoStartTime: 0,
      },
      {
        slug: "voice-interaction",
        title: "Voice Interaction",
        meta: "Vocal expression",
        accent: "bg-gradient-to-br from-violet-100 to-purple-200",
        videoPreview: "/articles/voice.mp4",
        videoStartTime: 0,
      },
      {
        slug: "palo-alto-moment",
        title: "Palo Alto Moment",
        meta: "Just for fun",
        accent: "bg-gradient-to-br from-amber-100 to-orange-200",
        videoPreview: "/articles/palo-alto.mp4",
        videoStartTime: 0,
      },
      {
        slug: "birthday-card",
        title: "Birthday Card",
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

  const base = { stroke: "var(--border-strong)", strokeWidth: 1.5, fill: "none" } as const;
  const hi   = { stroke: "var(--foreground)", strokeWidth: 2,   fill: "none" } as const;
  const on   = (gap: GapId) => gap === active ? hi : base;
  const lf   = (gap: GapId) => gap === active ? "#404040" : "#c0c0c0";

  const tip = (pts: string, gap: GapId) => (
    <polyline points={pts} fill="none"
      stroke={gap === active ? "var(--foreground)" : "var(--border-strong)"}
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
      <circle cx={mex} cy={cy} r={r} stroke="var(--border-strong)" strokeWidth="1.5" />
      <text x={mex} y={cy+4} textAnchor="middle" fontSize="12" fill="var(--subtle-foreground)"
        fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500">ME</text>

      <circle cx={otx} cy={cy} r={r} stroke="var(--border-strong)" strokeWidth="1.5" />
      <text x={otx} y={cy+4} textAnchor="middle" fontSize="12" fill="var(--subtle-foreground)"
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
  "top":          { tag: "What one does or says", text: "There's always a gap between what we mean internally and how it actually lands in the world. Design bridges this through careful attention to expression, clarity, and presence." },
  "bottom":       { tag: "What others do or say",     text: "Understanding what others mean is a black box. Design minimizes the gap between what is said and what is actually understood through thoughtful communication patterns." },
  "me-loop":      { tag: "How one make sense of others", text: "Who we become is constantly shaped by how we interact with others. Every interaction leaves a trace, reshaping our identity, beliefs, and sense of self." },
  "others-loop":  { tag: "How others make sense of one",   text: "Understanding others feels impossible, like a black box. But maybe that's where meaningful design happens—honoring what we cannot fully know, while creating space for genuine connection." },
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

export function HandDrawnDiagram({ onHover }: { onHover: (gap: GapId | null) => void }) {
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
      {(Object.entries(SEGMENTS) as [GapId, SegmentDef][]).map(([gap, s]) => {
        const rect = {
          left:    `${(s.x1 / DIAGRAM_W * 100).toFixed(2)}%`,
          top:     `${(s.y1 / DIAGRAM_H * 100).toFixed(2)}%`,
          width:   `${((s.x2 - s.x1) / DIAGRAM_W * 100).toFixed(2)}%`,
          height:  `${((s.y2 - s.y1) / DIAGRAM_H * 100).toFixed(2)}%`,
        };
        return (
          <div key={gap} className="absolute pointer-events-none" style={rect}>
            {/* "2" (others-loop) is red at rest, same as its own number label —
                the source PNG is black ink, so a mask (not a filter/hue guess)
                lets this div's own background-color (bg-red-400) supply the
                color regardless of the ink's real shade. */}
            {gap === "others-loop" && (
              <div
                className="absolute inset-0 bg-red-400"
                style={{
                  WebkitMaskImage: `url(${s.src})`,
                  maskImage: `url(${s.src})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  opacity: visible(gap) ? 0 : 1,
                  transition: "opacity 160ms",
                }}
              />
            )}
            <img
              src={s.src}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: visible(gap) ? 1 : 0,
                transition: "opacity 160ms",
              }}
            />
          </div>
        );
      })}

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
        <text x={mex + 30} y={yT - 20} fontSize="56" fontWeight="700" fill={hovered === "top" ? "var(--foreground)" : "var(--destructive)"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>1</text>
        <text x={otx + 290} y={yT + yB / 2} fontSize="56" fontWeight="700" fill={hovered === "others-loop" ? "var(--foreground)" : "var(--destructive)"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>2</text>
        <text x={otx - 40} y={yB + 30} fontSize="56" fontWeight="700" fill={hovered === "bottom" ? "var(--foreground)" : "var(--destructive)"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>3</text>
        <text x={mex - 170} y={yT + yB / 2} fontSize="56" fontWeight="700" fill={hovered === "me-loop" ? "var(--foreground)" : "var(--destructive)"} fontFamily="Caveat, cursive" style={{ transition: "fill 160ms" }}>4</text>
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
      className={`group relative w-[340px] flex-shrink-0 rounded-2xl bg-card p-3 shadow-sm transition-all block text-left border-0 cursor-pointer ${card.comingSoon ? "cursor-default opacity-40" : "hover:-translate-y-0.5 hover:shadow-md"}`}
    >
      {/* Visual */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-card">
        {card.comingSoon ? (
          <Eyebrow size="2xs">Coming soon</Eyebrow>
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
          <div className="flex items-center gap-1.5 text-xs text-subtle-foreground">
            <span>{card.meta}</span>
          </div>
          <h3 className="mt-1 text-base font-medium text-foreground">
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted/50 disabled:opacity-25 transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollBy("right")}
          disabled={atEnd}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted/50 disabled:opacity-25 transition-all"
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
      className="pb-16 snap-start [scroll-snap-stop:always]"
    >
      {/* Header — constrained to content width */}
      <div className="mx-auto max-w-6xl px-6 pt-14 mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{pillar.title}</h2>
        <p className="text-muted-foreground text-sm">{pillar.description}</p>
      </div>

      {/* Carousel — full bleed to screen edge */}
      <PillarCarousel cards={pillar.cards} onCardClick={onCardClick} />
    </section>
  );
}

// ── 2D Articles Matrix ────────────────────────────────────────────────────────

export interface MatrixArticle {
  slug: string;
  title: string;
  company?: string;
  x: number;
  y: number;
  pillarTheme?: string;
  workType?: string;
  thumbnail?: string;
}

export const MATRIX_ARTICLES: MatrixArticle[] = [
  { slug: "design-as-a-research-tool", title: "Service Design", company: "Pittsburgh Parking Authority", x: 0.70, y: 0.60, pillarTheme: "Perception", workType: "Paper prototypes", thumbnail: "/articles/design-as-research-tool-thumb.png" },
  { slug: "reimagining-the-chatbot", title: "Reimagine Chatbot", company: "Apple", x: 0.50, y: 0.37, pillarTheme: "Expression", workType: "Functional prototypes", thumbnail: "/articles/chatbot-thumb.png" },
  { slug: "google-cloud", title: "Assisted Browsing", company: "Google", x: 0.36, y: 0.50, pillarTheme: "Comprehension", workType: "launched", thumbnail: "/articles/google-cloud-hero.png" },
  { slug: "physical-ai", title: "Physical AI", company: "Archetype AI", x: 0.88, y: 0.68, pillarTheme: "sensing", workType: "mockup & storyboards", thumbnail: "/articles/physical-ai-thumb.png" },
  { slug: "product-launch-from-0-1", title: "0-1 Food Community", company: "Meetfood", x: 0.15, y: 0.25, pillarTheme: "Connection", workType: "launched", thumbnail: "/articles/product-launch-thumb.png" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function Index() {
  const navigate = useNavigate();
  const [heroGap, setHeroGap] = useState<GapId | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
      setSelectedCard(slug);
    } else {
      window.open(card.externalLink, '_blank');
    }
  };

  const card = selectedCard ? findCard(selectedCard) : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarWrapper />

      {/* Card Modal */}
      {selectedCard && card && !card.externalLink && (
        <CardModal title={card.title} slug={card.slug} onClose={() => setSelectedCard(null)} />
      )}

      {/* Hero section - diagram + paragraph, always expanded, fixed to one viewport height */}
      <section className="relative w-full flex flex-col gap-0 pt-[20vh] snap-start [scroll-snap-stop:always] min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 gap-0 bg-background h-auto py-8">
          <img
            src="/articles/hello-stranger.png"
            alt="Hello, stranger!!"
            className="block mx-auto w-full max-w-[220px] h-auto mb-4"
            style={{ mixBlendMode: "multiply", opacity: 0.5 }}
          />
          <div className="flex justify-center w-full scale-75 origin-top">
            <HandDrawnDiagram onHover={setHeroGap} />
          </div>
          <div className="relative w-full flex justify-center px-6 min-h-[20px] mt-4">
            {heroGap && (
              <p className="tag-style text-sm">
                {HERO_CONTENT[heroGap].tag}
              </p>
            )}
            {!heroGap && (
              <p className="tag-style text-sm">when "others = AI", let's <b>break line 2</b></p>
            )}
          </div>
        </div>

        {/* Paragraph section - flexible height */}
        <div className="flex flex-col items-center justify-center overflow-hidden w-full flex-[3]">
          <HeroScrollAnimation />
        </div>
      </section>

      {/* Quadrant grid - Qiyu/Others/Think/Do, with work/tech-self/HHI/help-others/
          Reflection-Notes as its 5 cards. Ported from fun-stuff, forked to drop its
          own "hero" stop (this branch's landing already lives above, in the Hero
          section). Only "work" and "center" sit on the real scroll timeline;
          hhi/help-others/reflection are click-only (see QuadrantSection's own
          top-of-file comment), and "overview" is hidden entirely. */}
      <QuadrantSection onCardClick={handleCardClick} workArticles={MATRIX_ARTICLES} />

      {/* 4 Pillar sections - hidden for now; Overview is the last section.
      {PILLARS.map((pillar) => (
        <PillarSection key={pillar.number} pillar={pillar} onCardClick={handleCardClick} />
      ))}
      */}

      <footer className="mt-4 border-t border-border/60">
        <p className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-subtle-foreground">
          © 2026 — sketched with fountain pen & paper
        </p>
      </footer>

    </div>
  );
}
