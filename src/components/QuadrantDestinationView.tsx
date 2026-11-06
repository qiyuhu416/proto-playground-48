import { useEffect, useRef, useState } from "react";
import {
  AXIS_LABELS,
  EDGE,
  BADGE_POSITION,
  SUB_LABEL_PERP_GAP,
  DESTINATION_CARD_BASE_DELAY_MS,
  CARD_DURATION_MS,
  cardGrowScale,
  CARD_GROW_DURATION_MS,
  type DestinationCard,
  type QuadrantId,
} from "@/data/quadrantCards";
import { ReflectionNotesCarousel } from "@/components/ReflectionNotesCarousel";
import { CursorCrosshairMarks } from "@/components/CursorCrosshair";

// Destination content shared by every quadrant reached from QuadrantSection's
// single scroll sequence, however you got there (clicking a matrix card, or
// scrolling down into it) — same cards, same cursor-tracking crosshair, same
// bracket-end dots, same axis labels. Scrolling up returns to the matrix;
// clicking anywhere on the open background (not on a card or the tab toggle)
// does the same thing instantly, via onBackgroundClick below.
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
  onDescriptionCard,
  onBackgroundClick,
  contentRect,
  cardDelays,
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
  onDescriptionCard: (card: DestinationCard) => void;
  onBackgroundClick: () => void;
  contentRect: { top: number; left: number; width: number; height: number } | null;
  cardDelays: number[];
}) {
  const isReflection = quadrant === "reflection";
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
      className="absolute inset-0 cursor-none"
      onMouseMove={(e) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onClick={(e) => {
        // Only the open background, not a card/button/etc. nested inside it —
        // those are separate elements, so a click landing on one of THEM
        // never has this root div as its exact target, only as an ancestor.
        if (e.target === e.currentTarget) onBackgroundClick();
      }}
    >
      {/* Same cursor-tracking crosshair as every other destination,
          including reflection — originally suppressed there on the theory
          that it'd read as clutter over something meant to be read, but
          that left reflection as the one page with no visible cursor at all
          (cursor-none on the root above, with nothing drawn to replace it). */}
      {W > 0 && (
        <svg className="absolute inset-0 pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
          <CursorCrosshairMarks cursorPos={cursorPos} W={W} H={H} edge={EDGE} active={!!hoveredCard} />

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
        // Centered — swapped with NavbarWrapper's own badge, which sits in
        // the right corner for this one quadrant (see NavbarWrapper.tsx).
        // Reads `top` straight off BADGE_POSITION (not its own copy of the
        // number) so the two always land on the exact same vertical line,
        // however that shared value changes.
        <div className="absolute flex items-center rounded-full bg-neutral-100 p-1 text-sm" style={{ top: BADGE_POSITION.top, left: "50%", transform: "translate(-50%, -50%)" }}>
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

      {/* Reflection notes are shown directly here, no extra click-through to
          a separate route — everything else still gets the usual card grid.
          Keyed so React treats it as a brand-new instance whenever the card
          SET actually changes (a new quadrant, or "work"'s tab toggle) — a
          freshly-mounted DOM node can't CSS-transition from a value it never
          had, so DestinationCards needs a true remount (not just new props)
          to replay its "just arrived" entrance on every switch, not only the
          very first time this view mounts. */}
      {isReflection ? (
        contentRect && <ReflectionNotesCarousel rect={contentRect} setHoveredCard={setHoveredCard} onBackgroundClick={onBackgroundClick} onDescriptionCard={onDescriptionCard} />
      ) : (
        <DestinationCards key={`${quadrant}:${workTab}`} cards={cards} onCardClick={onCardClick} onDescriptionCard={onDescriptionCard} setHoveredCard={setHoveredCard} cursorPos={cursorPos} W={W} H={H} cardDelays={cardDelays} />
      )}

      {/* Cursor-position markers on each axis — ride along with the cursor-
          tracking lines above, right at their intersection with this
          quadrant's two bracket lines, so each reads as "where the cursor
          currently is" on that axis rather than a fixed caption. */}
      {!isReflection && vSubLabel && (
        <span
          className="absolute text-[10px] font-medium uppercase tracking-wide text-neutral-400 whitespace-nowrap pointer-events-none"
          style={{ left: vSubX, top: cursorPos.y, writingMode: "vertical-rl", transform: "translate(-50%, -50%) rotate(180deg)" }}
        >
          {vSubLabel}
        </span>
      )}
      {!isReflection && hSubLabel && (
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
  onDescriptionCard,
  setHoveredCard,
  cursorPos,
  W,
  H,
  cardDelays,
}: {
  cards: DestinationCard[];
  onCardClick: (slug: string) => void;
  onDescriptionCard: (card: DestinationCard) => void;
  setHoveredCard: (title: string | null) => void;
  cursorPos: { x: number; y: number };
  W: number;
  H: number;
  // Per-POSITION delay slots, owned by QuadrantSection and fixed for its
  // whole lifetime (not re-rolled on each visit) — matches the old work
  // matrix's own cardRevealDelays. This component still remounts on every
  // quadrant/tab switch (see the `key` at its call site) so the fade-in
  // itself replays, it just reads a stable value per card index instead of
  // rolling its own on each remount.
  cardDelays: number[];
}) {
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
      {cards.map((card, i) => {
        const scale = cardGrowScale(cursorPos, card.x * W, card.y * H);
        return (
        <div
          key={card.title}
          className="absolute"
          style={{
            left: `${card.x * 100}%`,
            top: `${card.y * 100}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: entered ? 1 : 0,
            transition: `opacity ${CARD_DURATION_MS}ms ${DESTINATION_CARD_BASE_DELAY_MS + cardDelays[i]}ms, transform ${CARD_GROW_DURATION_MS}ms ease-out`,
          }}
        >
          {(() => {
            const inner = (
              <>
                <span className="relative w-full aspect-square rounded-3xl bg-neutral-100 transition-shadow hover:shadow-md flex items-center justify-center p-4 overflow-hidden">
                  {card.thumbnail && (
                    <img src={card.thumbnail} alt={card.title} className="w-full h-full object-contain bg-transparent" />
                  )}
                  {/* With a thumbnail, it shows normally at rest — "Coming
                      soon" only reveals on hover, as an overlay (plain CSS
                      :hover via `group`, not the lifted hoveredCard state
                      above, which only ever holds ONE title for the whole
                      destination's crosshair and isn't passed down into this
                      component). With NO thumbnail, there's nothing else to
                      show in that box at rest, so "Coming soon" is just
                      always visible instead of hidden until hover. */}
                  {card.comingSoon && (
                    <span
                      className={`absolute inset-0 flex items-center justify-center bg-neutral-100/90 text-[10px] uppercase tracking-widest text-neutral-400 transition-opacity ${
                        card.thumbnail ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      Coming soon
                    </span>
                  )}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-neutral-900">{card.title}</span>
                  {card.subtitle && <span className="block text-neutral-500 text-xs mt-0.5">{card.subtitle}</span>}
                </span>
              </>
            );
            const sharedClassName = `group bg-transparent border-0 text-left flex flex-col items-start gap-3 w-[clamp(128px,10vw,168px)] ${
              card.comingSoon ? "cursor-default" : "cursor-pointer"
            }`;
            // A real `<a target="_blank">` for genuinely external links —
            // not a button with a window.open onClick — so the site's
            // existing cursor rules (styles.css: a[target="_blank"], plus
            // per-domain variants like LinkedIn's) apply automatically on
            // hover, exactly like any other external link on the site.
            return card.externalLink ? (
              <a
                href={card.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredCard(card.title)}
                onMouseLeave={() => setHoveredCard(null)}
                className={sharedClassName}
              >
                {inner}
              </a>
            ) : (
              <button
                onClick={() => {
                  if (card.description) onDescriptionCard(card);
                  else if (card.onClick) card.onClick();
                  else if (card.slug) onCardClick(card.slug);
                }}
                onMouseEnter={() => setHoveredCard(card.title)}
                onMouseLeave={() => setHoveredCard(null)}
                disabled={card.comingSoon}
                className={sharedClassName}
              >
                {inner}
              </button>
            );
          })()}
        </div>
        );
      })}
    </>
  );
}
