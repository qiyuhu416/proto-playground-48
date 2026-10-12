import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { MatrixArticle } from "@/routes/index";

type QuadrantId = "work" | "hhi" | "help-others";

// Which corner the two lines bracket into for each quadrant, mirroring the
// visual language already built for the existing work matrix (bottom-left)
// and the Reflection section's held state (top-right) — plus a new top-left
// variant for the 4th quadrant. The bracket corner is always the one
// diagonally OPPOSITE the quadrant that was clicked.
const BRACKET: Record<QuadrantId, { hTop: "top" | "bottom"; vSide: "left" | "right" }> = {
  work: { hTop: "bottom", vSide: "left" },       // upper-right quadrant clicked -> bottom-left bracket
  hhi: { hTop: "top", vSide: "right" },           // lower-left quadrant clicked -> top-right bracket
  "help-others": { hTop: "top", vSide: "left" },  // lower-right quadrant clicked -> top-left bracket
};

interface DestinationCard {
  title: string;
  subtitle?: string;
  x: number; // 0-1 fraction of container width
  y: number; // 0-1 fraction of container height
  thumbnail?: string;
  comingSoon?: boolean;
  slug?: string; // if present, routed through onCardClick (existing modal)
  onClick?: () => void; // custom handler (external link, route nav) — takes priority over slug
}

const SELF_UNDERSTANDING_CARDS: DestinationCard[] = [
  { title: "Model for Journaling", x: 0.32, y: 0.45, comingSoon: true },
  { title: "Affinity Clustering Wall", x: 0.52, y: 0.6, comingSoon: true },
  { title: "AIOS", x: 0.72, y: 0.4, comingSoon: true },
];

export function QuadrantNav({
  onCardClick,
  workArticles,
}: {
  onCardClick: (slug: string) => void;
  workArticles: MatrixArticle[];
}) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeQuadrant, setActiveQuadrant] = useState<QuadrantId | null>(null);
  const [workTab, setWorkTab] = useState<"others" | "self">("others");

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const margin = 40;
  const W = containerSize.width;
  const H = containerSize.height;

  // Line geometry: centered crosshair at rest, bracket-corner when a quadrant is active.
  // Both states share the same two elements below — only their top/left/width/height
  // change, animated via CSS transition, so this reads as the lines physically moving.
  const hLine = activeQuadrant
    ? { top: BRACKET[activeQuadrant].hTop === "top" ? margin : H - margin, left: 0, width: W }
    : { top: H / 2, left: 0, width: W };
  const vLine = activeQuadrant
    ? { left: BRACKET[activeQuadrant].vSide === "left" ? margin : W - margin, top: 0, height: H }
    : { left: W / 2, top: 0, height: H };

  const hhiCards: DestinationCard[] = [
    {
      title: "Catch Up",
      x: 0.28, y: 0.65,
      thumbnail: "/articles/meet-stranger-calendly.png",
      onClick: () => window.open("https://calendly.com/qiyuhu/new-meeting", "_blank", "noopener,noreferrer"),
    },
    { title: "Give a Stranger a Flower", x: 0.52, y: 0.42, comingSoon: true },
    {
      title: "Hello Humans Table Stand",
      x: 0.75, y: 0.3,
      thumbnail: "/articles/hello-humans-notebook.jpg",
      onClick: () => navigate({ to: "/hello-humans" }),
    },
  ];

  const helpOthersCards: DestinationCard[] = [
    { title: "Friends' Marketplace", x: 0.38, y: 0.48, comingSoon: true },
    { title: "Events I've Hosted @ Apple", x: 0.65, y: 0.42, thumbnail: "/articles/events-thumb.svg", comingSoon: true },
  ];

  const activeCards: DestinationCard[] =
    activeQuadrant === "work"
      ? workTab === "others"
        ? workArticles.map((a) => ({ title: a.title, subtitle: a.company, x: a.x, y: 1 - a.y, thumbnail: a.thumbnail, slug: a.slug }))
        : SELF_UNDERSTANDING_CARDS
      : activeQuadrant === "hhi"
      ? hhiCards
      : activeQuadrant === "help-others"
      ? helpOthersCards
      : [];

  const openQuadrant = (id: QuadrantId, tab: "others" | "self" = "others") => {
    if (id === "work") setWorkTab(tab);
    setActiveQuadrant(id);
  };

  return (
    <section
      aria-label="Quadrant Navigation"
      ref={containerRef}
      className="relative w-full h-screen snap-start [scroll-snap-stop:always] bg-white overflow-hidden"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Cursor-tracking crosshair — only meaningful once inside a destination view,
          where it helps scan a card's position, same technique as the existing work
          matrix (thin lines + small indicator square following the mouse). */}
      {activeQuadrant && W > 0 && (
        <svg className="absolute inset-0 pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
          <line x1={cursorPos.x} y1={0} x2={cursorPos.x} y2={H} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
          <line x1={0} y1={cursorPos.y} x2={W} y2={cursorPos.y} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
          <rect x={cursorPos.x - 4} y={cursorPos.y - 4} width="8" height="8" fill={hoveredCard ? "#d32f2f" : "#ff9800"} />
        </svg>
      )}

      {/* Landing: static crosshair labels + the 5 quadrant cards. */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: activeQuadrant === null ? 1 : 0, pointerEvents: activeQuadrant === null ? "auto" : "none" }}
      >
        <div className="absolute left-1/2 top-6 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-base font-bold text-neutral-900">Qiyu</span>
        </div>
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-base font-bold text-neutral-900">Others</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        </div>
        <div className="absolute top-1/2 left-6 -translate-y-1/2 flex items-center gap-2">
          <span className="text-base font-bold text-neutral-900">Think</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        </div>
        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-base font-bold text-neutral-900">Do</span>
        </div>

        <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(-108%, -140%)" }}>Understand myself</div>
        <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(12%, -140%)" }}>Help myself grow</div>
        <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(-104%, 40%)" }}>Understand Others</div>
        <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(12%, 40%)" }}>Help Others grow</div>

        {[
          { title: "Reflection Notes", left: "28%", top: "20%", onClick: () => navigate({ to: "/reflection-notes" }) },
          { title: "work", left: "57%", top: "17%", onClick: () => openQuadrant("work", "others") },
          { title: "tech for self-understanding", left: "77%", top: "23%", onClick: () => openQuadrant("work", "self") },
          { title: "HHI experiments", left: "28%", top: "68%", onClick: () => openQuadrant("hhi") },
          { title: "help others grow", left: "68%", top: "65%", onClick: () => openQuadrant("help-others") },
        ].map((c) => (
          <button
            key={c.title}
            onClick={c.onClick}
            className="absolute flex flex-col items-center gap-3 bg-transparent border-0 cursor-pointer -translate-x-1/2"
            style={{ left: c.left, top: c.top }}
          >
            <span className="w-28 h-28 rounded-3xl bg-neutral-200 transition-colors hover:bg-neutral-300" />
            <span className="text-sm text-neutral-700 whitespace-nowrap">{c.title}</span>
          </button>
        ))}
      </div>

      {/* Destination view: back control, work's tab toggle, and whichever card set
          is active. Fades in after the lines have had time to settle into place. */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: activeQuadrant !== null ? 1 : 0, transitionDelay: activeQuadrant !== null ? "400ms" : "0ms", pointerEvents: activeQuadrant !== null ? "auto" : "none" }}
      >
        <button
          onClick={() => setActiveQuadrant(null)}
          className="absolute top-6 left-6 text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          ← Back
        </button>

        {activeQuadrant === "work" && (
          <div className="absolute top-6 right-6 flex items-center rounded-full bg-neutral-100 p-1 text-sm">
            <button
              onClick={() => setWorkTab("others")}
              className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${workTab === "others" ? "bg-neutral-800 text-white" : "text-neutral-600"}`}
            >
              For others
            </button>
            <button
              onClick={() => setWorkTab("self")}
              className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${workTab === "self" ? "bg-neutral-800 text-white" : "text-neutral-600"}`}
            >
              Self
            </button>
          </div>
        )}

        {activeCards.map((card) => (
          <div
            key={card.title}
            className="absolute"
            style={{ left: `${card.x * 100}%`, top: `${card.y * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <button
              onClick={() => {
                if (card.onClick) card.onClick();
                else if (card.slug) onCardClick(card.slug);
              }}
              onMouseEnter={() => setHoveredCard(card.title)}
              onMouseLeave={() => setHoveredCard(null)}
              disabled={card.comingSoon}
              className={`bg-transparent border-0 text-left flex flex-col items-start gap-3 w-[clamp(128px,10vw,168px)] ${card.comingSoon ? "cursor-default opacity-50" : "cursor-pointer"}`}
            >
              <span className="w-full aspect-square rounded-3xl bg-neutral-100 transition-shadow hover:shadow-md flex items-center justify-center p-4">
                {card.comingSoon ? (
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Coming soon</span>
                ) : card.thumbnail ? (
                  <img src={card.thumbnail} alt={card.title} className="w-full h-full object-contain bg-transparent" />
                ) : null}
              </span>
              <span>
                <span className="block text-sm font-semibold text-neutral-900">{card.title}</span>
                {card.subtitle && <span className="block text-neutral-500 text-xs mt-0.5">{card.subtitle}</span>}
              </span>
            </button>
          </div>
        ))}

        {/* 4 small red dots at the bracket lines' outer ends — same pattern already
            used for the resting cross on the existing Overview section. */}
        {activeQuadrant &&
          [
            { x: hLine.left, y: hLine.top },
            { x: hLine.left + hLine.width, y: hLine.top },
            { x: vLine.left, y: vLine.top },
            { x: vLine.left, y: vLine.top + vLine.height },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-400 pointer-events-none"
              style={{ left: d.x, top: d.y, width: 10, height: 10, transform: "translate(-50%, -50%)" }}
            />
          ))}
      </div>

      {/* The two lines — always rendered, animate between centered crosshair and
          whichever bracket corner activeQuadrant calls for. */}
      <div
        className="absolute bg-neutral-400 pointer-events-none z-20 transition-all duration-700 ease-out"
        style={{ top: hLine.top, left: hLine.left, width: hLine.width, height: 1.5 }}
      />
      <div
        className="absolute bg-neutral-400 pointer-events-none z-20 transition-all duration-700 ease-out"
        style={{ left: vLine.left, top: vLine.top, width: 1.5, height: vLine.height }}
      />
    </section>
  );
}
