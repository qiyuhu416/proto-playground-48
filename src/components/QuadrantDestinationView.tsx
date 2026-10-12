import { useRef, useState } from "react";
import type { DestinationCard, QuadrantId } from "@/data/quadrantCards";

// Shared destination content for both ways of reaching a quadrant: clicking a
// card from the full matrix (QuadrantNav) and auto-advancing via scroll
// (QuadrantScrollSequence). Same cards, same cursor-tracking crosshair, same
// bracket-end dots — the only difference between the two paths is whether a
// "← Back" control makes sense (click path has somewhere to go back to;
// scroll path doesn't, so it omits `onBack`).
export function QuadrantDestinationView({
  quadrant,
  cards,
  workTab,
  setWorkTab,
  W,
  H,
  hLine,
  vLine,
  onCardClick,
  onBack,
}: {
  quadrant: QuadrantId;
  cards: DestinationCard[];
  workTab: "others" | "self";
  setWorkTab: (tab: "others" | "self") => void;
  W: number;
  H: number;
  hLine: { top: number; left: number; width: number };
  vLine: { left: number; top: number; height: number };
  onCardClick: (slug: string) => void;
  onBack?: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const hovered = hoveredCard ? cards.find((c) => c.title === hoveredCard) : undefined;
  // Anchor hover labels to whichever edge this quadrant's bracket actually
  // sits on (vLine may be at the left or right margin, hLine at the top or
  // bottom, depending on BRACKET[quadrant]) — same technique as the original
  // work matrix's pillarTheme/workType hover labels, generalized so it still
  // reads correctly no matter which of the 4 corners is active.
  const vOnLeft = vLine.left < W / 2;
  const hOnTop = hLine.top < H / 2;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0"
      onMouseMove={(e) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {W > 0 && (
        <svg className="absolute inset-0 pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
          <line x1={cursorPos.x} y1={0} x2={cursorPos.x} y2={H} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
          <line x1={0} y1={cursorPos.y} x2={W} y2={cursorPos.y} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
          <rect x={cursorPos.x - 4} y={cursorPos.y - 4} width="8" height="8" fill={hoveredCard ? "#d32f2f" : "#ff9800"} />

          {hovered?.yAxisLabel && (
            <text
              x={vOnLeft ? vLine.left + 8 : vLine.left - 8}
              y={cursorPos.y - 8}
              textAnchor={vOnLeft ? "start" : "end"}
              fontSize="12"
              fill="#d32f2f"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
            >
              {hovered.yAxisLabel}
            </text>
          )}
          {hovered?.xAxisLabel && (
            <text
              x={cursorPos.x + 12}
              y={hOnTop ? hLine.top + 20 : hLine.top - 8}
              fontSize="12"
              fill="#d32f2f"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
            >
              {hovered.xAxisLabel}
            </text>
          )}
        </svg>
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          ← Back
        </button>
      )}

      {quadrant === "work" && (
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

      {cards.map((card) => (
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

      {/* 4 small red dots at the bracket lines' outer ends. */}
      {[
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
  );
}
