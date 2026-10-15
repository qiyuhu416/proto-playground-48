import { useEffect, useRef, useState } from "react";
import {
  AXIS_LABELS,
  EDGE,
  SUB_LABEL_PERP_GAP,
  CARDS_BASE_DELAY_MS,
  CARD_DURATION_MS,
  CARD_STAGGER_MAX_MS,
  type DestinationCard,
  type QuadrantId,
} from "@/data/quadrantCards";

// Destination content shared by every quadrant reached from QuadrantSection's
// single scroll sequence, however you got there (clicking a matrix card, or
// scrolling down into it) — same cards, same cursor-tracking crosshair, same
// bracket-end dots, same axis labels. No back control — scrolling up is how
// you return to the matrix, consistently across every quadrant.
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

  // Sub-label: not a static word sitting at a fixed point on the line — it's
  // a marker that rides along with the cursor-tracking line, always showing
  // right where that line currently crosses the axis, so it reads as "the
  // cursor's position on this axis" rather than a caption. Which of the two
  // end-words to show (e.g. OTHERS vs SELF) is whichever one the cursor is
  // currently nearer to. A small SUB_LABEL_PERP_GAP nudge keeps it beside the
  // line rather than directly on top of it.
  const axisLabels = AXIS_LABELS[quadrant];
  const vSubX = vOnLeft ? vLine.left - SUB_LABEL_PERP_GAP : vLine.left + SUB_LABEL_PERP_GAP;
  const hSubY = hOnTop ? hLine.top - SUB_LABEL_PERP_GAP : hLine.top + SUB_LABEL_PERP_GAP;
  const vSubLabel = axisLabels && (cursorPos.y < H / 2 ? axisLabels.top : axisLabels.bottom);
  const hSubLabel = axisLabels && (cursorPos.x < W / 2 ? axisLabels.left : axisLabels.right);

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
          <line x1={cursorPos.x} y1={EDGE} x2={cursorPos.x} y2={H - EDGE} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
          <line x1={EDGE} y1={cursorPos.y} x2={W - EDGE} y2={cursorPos.y} stroke={hoveredCard ? "#d32f2f" : "#d8d8d8"} strokeWidth="1" opacity={hoveredCard ? 0.6 : 0.4} />
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

      {quadrant === "work" && (
        <div className="absolute flex items-center rounded-full bg-neutral-100 p-1 text-sm" style={{ top: EDGE, right: EDGE }}>
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

      {/* Keyed so React treats it as a brand-new instance whenever the card
          SET actually changes (a new quadrant, or "work"'s tab toggle) — a
          freshly-mounted DOM node can't CSS-transition from a value it never
          had, so DestinationCards needs a true remount (not just new props)
          to replay its "just arrived" entrance on every switch, not only the
          very first time this view mounts. */}
      <DestinationCards key={`${quadrant}:${workTab}`} cards={cards} onCardClick={onCardClick} setHoveredCard={setHoveredCard} />

      {/* Cursor-position markers on each axis — ride along with the cursor-
          tracking lines above, right at their intersection with this
          quadrant's two bracket lines, so each reads as "where the cursor
          currently is" on that axis rather than a fixed caption. */}
      {vSubLabel && (
        <span
          className="absolute text-[10px] font-medium uppercase tracking-wide text-neutral-400 whitespace-nowrap pointer-events-none"
          style={{ left: vSubX, top: cursorPos.y, writingMode: "vertical-rl", transform: "translate(-50%, -50%) rotate(180deg)" }}
        >
          {vSubLabel}
        </span>
      )}
      {hSubLabel && (
        <span
          className="absolute text-[10px] font-medium uppercase tracking-wide text-neutral-400 whitespace-nowrap pointer-events-none"
          style={{ left: cursorPos.x, top: hSubY, transform: "translate(-50%, -50%)" }}
        >
          {hSubLabel}
        </span>
      )}
    </div>
  );
}

// Split out so it can be remounted fresh (via `key`) on every quadrant/tab
// switch — see the comment at its call site above for why that's necessary.
function DestinationCards({
  cards,
  onCardClick,
  setHoveredCard,
}: {
  cards: DestinationCard[];
  onCardClick: (slug: string) => void;
  setHoveredCard: (title: string | null) => void;
}) {
  // Lazy initializer runs once per mount, i.e. once per remount of this
  // component — a fresh random stagger order each time you arrive here.
  const [cardDelays] = useState(() => cards.map(() => Math.random() * CARD_STAGGER_MAX_MS));
  // Starts false so the very first paint has every card at opacity 0;
  // flipping to true a frame later (not within the same paint) is what
  // gives the browser an actual 0 -> 1 change to animate, rather than a
  // value that was already 1 from the first frame onward (which CSS
  // transitions can't animate — there's no "before" to transition from).
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="absolute transition-opacity"
          style={{
            left: `${card.x * 100}%`,
            top: `${card.y * 100}%`,
            transform: "translate(-50%, -50%)",
            opacity: entered ? 1 : 0,
            transitionDuration: `${CARD_DURATION_MS}ms`,
            transitionDelay: `${CARDS_BASE_DELAY_MS + cardDelays[i]}ms`,
          }}
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
    </>
  );
}
