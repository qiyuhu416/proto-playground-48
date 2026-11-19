import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  AXIS_LABELS,
  WORK_SELF_AXIS_LABELS,
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
import { SexyButton } from "@/components/SexyButton";
import { LayeredStack } from "@/components/LayeredStack";

// "Have Fun" (help-others only) photos — recruitment flyers in increasingly
// unintended places. Not DestinationCards (no title/subtitle row, and they
// don't belong to the quadrant's normal card set) — a small pile of circular
// photos that sits piled by default (LayeredStack's own mount behavior:
// `bot` on top, matching the reference), fans out within its own zone on
// hover, and piles back the moment the cursor leaves that zone.
// FUN_PILE_CENTER/FUN_ZONE_SIZE position and size that zone — a box roughly
// 3x a single tile's width, centered away from the quadrant's 3 normal
// cards. Each photo's x/y is a position WITHIN that box (0-1), not the
// quadrant, so the scatter always stays inside the zone.
const FUN_PILE_CENTER = { x: 0.15, y: 0.6 };
const FUN_TILE_SIZE = "clamp(120px, 10vw, 160px)";
const FUN_ZONE_SIZE = "clamp(360px, 30vw, 480px)";
const FUN_PHOTOS: { src: string; x: number; y: number; caption: string }[] = [
  { src: "/articles/recruitment-bot.jpg", x: 0.5, y: 0.5, caption: "Taped to a classroom robot. He didn't seem to mind." },
  { src: "/articles/recruitment-fall.jpg", x: 0.25, y: 0.28, caption: "On the bulletin board... until gravity had other plans." },
  { src: "/articles/recruitment-ground.jpg", x: 0.75, y: 0.28, caption: "Made it exactly as far as the sidewalk outside." },
  { src: "/articles/recruitment-sideways.jpg", x: 0.28, y: 0.75, caption: "No room left standing up — this post made me rotate it 90°." },
  { src: "/articles/recruitment-cool.jpg", x: 0.72, y: 0.72, caption: "A friend's one-word review when I told her where else I put these." },
];

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
  reflectionTab,
  setReflectionTab,
  setReflectionScrollProgress,
  W,
  H,
  hLine,
  vLine,
  onCardClick,
  onDescriptionCard,
  onBackgroundClick,
  onNavigateHHI,
  contentRect,
  cardDelays,
}: {
  quadrant: QuadrantId;
  cards: DestinationCard[];
  workTab: "others" | "self";
  setWorkTab: (tab: "others" | "self") => void;
  // Lifted up to QuadrantSection (not local state here) — same pattern as
  // workTab above, so that component can also see which sub-tab is active
  // (it needs to, to hide the vertical bracket line while List is open).
  reflectionTab: "journal" | "list";
  setReflectionTab: (tab: "journal" | "list") => void;
  // Also owned by QuadrantSection — it repurposes the Qiyu dot as the List
  // grid's own scrollbar thumb, which needs this value.
  setReflectionScrollProgress: (p: number) => void;
  W: number;
  H: number;
  hLine: { top: number; left: number; width: number };
  vLine: { left: number; top: number; height: number };
  onCardClick: (slug: string) => void;
  onDescriptionCard: (card: DestinationCard) => void;
  onBackgroundClick: () => void;
  // jumpTo only exists in QuadrantSection — forwarded down (same idea as
  // onBackgroundClick above) so the Journal quote (ReflectionNotesCarousel)
  // can click-jump to the HHI quadrant without this component needing its
  // own copy of that navigation logic.
  onNavigateHHI: () => void;
  contentRect: { top: number; left: number; width: number; height: number } | null;
  cardDelays: number[];
}) {
  const isReflection = quadrant === "reflection";
  const rootRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  // One rule, derived from whatever's actually under the cursor's own
  // resolved CSS `cursor` value (see onMouseMove below) — not wired up per
  // element/quadrant. True whenever that resolves to anything other than
  // this root's own baseline `cursor-none` (plain `pointer` on a card/tab,
  // or a real `cursor: url(...)` like the per-domain external-link pills) —
  // that element's own cursor IS the visible "clickable" status at that
  // point, so the crosshair's fallback marker gets out of the way instead of
  // sitting redundantly next to it; the two tracking lines still go red,
  // which is the status-change signal everywhere else on screen. Anything
  // that becomes clickable later (a new tab, a new card kind) gets this for
  // free, as long as its own cursor is set the normal way — no new branch
  // needed here.
  const [clickableHover, setClickableHover] = useState(false);
  // Rule: when something draws its OWN cursor (a pill that replaces the pointer),
  // the default cursor marker and the native hand must not also show.
  const [specialCursor, setSpecialCursor] = useState(false);
  // The LinkedIn badge (NavbarWrapper) is fixed outside this component's own
  // DOM subtree, so hovering it never fires this view's own mouse handlers —
  // it broadcasts via this custom event instead, same idea as data-held-stop
  // elsewhere in this system.
  useEffect(() => {
    const onBadgeHover = (e: Event) => setClickableHover((e as CustomEvent<boolean>).detail);
    window.addEventListener("qy:badge-hover", onBadgeHover);
    return () => window.removeEventListener("qy:badge-hover", onBadgeHover);
  }, []);

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
  const axisLabels = quadrant === "work" && workTab === "self" ? WORK_SELF_AXIS_LABELS : AXIS_LABELS[quadrant];
  const vSubX = vOnLeft ? vLine.left - SUB_LABEL_PERP_GAP : vLine.left + SUB_LABEL_PERP_GAP;
  const hSubY = hOnTop ? hLine.top - SUB_LABEL_PERP_GAP : hLine.top + SUB_LABEL_PERP_GAP;
  // A hovered card's own xAxisLabel/yAxisLabel (e.g. "DISCOMFORT LEVEL: 90%")
  // takes over this same axis-intercept marker instead of getting its own
  // separate floating label — it swaps in for whichever generic
  // top/bottom/left/right word would otherwise show there, and goes red
  // (below) so the takeover still reads as hover-driven, not a permanent
  // relabeling of the axis.
  // RULE (same in every quadrant): hovering a card swaps its own axis labels into
  // these markers, in red. Cards that spell their labels out (yAxisLabel/xAxisLabel,
  // like "Qiyu x Do"'s "DISCOMFORT LEVEL: 32%") use them; any other card shows the
  // axis end-word it sits nearest to (e.g. DESIGNED, PHYSICAL) — no number, since a
  // number only makes sense on axes that are literally numeric.
  const hoverY = hovered ? (hovered.yAxisLabel ?? (axisLabels ? (hovered.y < 0.5 ? axisLabels.top : axisLabels.bottom).toUpperCase() : undefined)) : undefined;
  const hoverX = hovered ? (hovered.xAxisLabel ?? (axisLabels ? (hovered.x < 0.5 ? axisLabels.left : axisLabels.right).toUpperCase() : undefined)) : undefined;
  const vSubLabel = hoverY ?? (axisLabels && (cursorPos.y < H / 2 ? axisLabels.top : axisLabels.bottom));
  // "Break the Rule"'s x-axis is a literal percentage (disDISCOMFORT level), so its
  // idle label tracks the cursor continuously instead of flipping between
  // two static words at the midpoint the way every other axis's idle label
  // does — reads as "the cursor's actual position on this axis" the same way
  // the crosshair itself does, rather than a coarse left-half/right-half cue.
  const disDISCOMFORTPct = Math.round(Math.min(1, Math.max(0, cursorPos.x / W)) * 100);
  const hSubLabel =
    hoverX ??
    (quadrant === "work" && workTab === "self"
      ? `DISCOMFORT LEVEL: ${disDISCOMFORTPct}%`
      : axisLabels && (cursorPos.x < W / 2 ? axisLabels.left : axisLabels.right));

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 cursor-none"
      onMouseMove={(e) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        // General rule, not a per-element one: read whatever `cursor` the
        // hovered element actually resolves to (its own, or inherited from
        // an ancestor) rather than asking "is this a card/button/tab/badge".
        const cursor = getComputedStyle(e.target as Element).cursor;
        setClickableHover(cursor === "pointer" || cursor.includes("url("));
      }}
      onMouseLeave={() => setClickableHover(false)}
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
          <CursorCrosshairMarks cursorPos={cursorPos} W={W} H={H} edge={EDGE} active={clickableHover} showMarker={!clickableHover && !specialCursor} />
        </svg>
      )}

      {quadrant === "work" && (
        // Centered — swapped with NavbarWrapper's own badge, which sits in
        // the right corner for this one quadrant (see NavbarWrapper.tsx).
        // Reads `top` straight off BADGE_POSITION (not its own copy of the
        // number) so the two always land on the exact same vertical line,
        // however that shared value changes.
        <div className="absolute flex items-center rounded-full bg-muted p-1 text-sm" style={{ top: BADGE_POSITION.top, left: "50%", transform: "translate(-50%, -50%)" }}>
          <button
            onClick={() => setWorkTab("others")}
            className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${workTab === "others" ? "bg-neutral-800 text-white" : "text-muted-foreground"}`}
          >
            Augment Human Capability
          </button>
          <button
            onClick={() => setWorkTab("self")}
            className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${workTab === "self" ? "bg-neutral-800 text-white" : "text-muted-foreground"}`}
          >
            Break Human Rules
          </button>
        </div>
      )}

      {isReflection && (
        // Same spot/style as the "work" quadrant's tab toggle above — reads
        // BADGE_POSITION.top directly so both land on the exact same
        // vertical line as the badge, whichever quadrant you're in.
        // z-20: ReflectionNotesCarousel's own root div spans this whole
        // quadrant's contentRect (which starts above this toggle's position,
        // only clearing it via inner padding-top) and is rendered after this
        // toggle in the DOM — without an explicit z-index, that later,
        // visually-transparent div would stack on top and swallow clicks
        // meant for these buttons (most noticeable on "List", since "journal"
        // is already the default tab).
        <div className="absolute z-20 flex items-center rounded-full bg-muted p-1 text-sm" style={{ top: BADGE_POSITION.top, left: "50%", transform: "translate(-50%, -50%)" }}>
          <button
            onClick={() => setReflectionTab("journal")}
            className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${reflectionTab === "journal" ? "bg-neutral-800 text-white" : "text-muted-foreground"}`}
          >
            Journal
          </button>
          <button
            onClick={() => setReflectionTab("list")}
            className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${reflectionTab === "list" ? "bg-neutral-800 text-white" : "text-muted-foreground"}`}
          >
            List
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
        contentRect && <ReflectionNotesCarousel rect={contentRect} pageWidth={W} pageHeight={H} tab={reflectionTab} setHoveredCard={setHoveredCard} onBackgroundClick={onBackgroundClick} onDescriptionCard={onDescriptionCard} onScrollProgress={setReflectionScrollProgress} cursorPos={cursorPos} onNavigateHHI={onNavigateHHI} onSpecialCursorChange={setSpecialCursor} />
      ) : (
        <DestinationCards key={`${quadrant}:${workTab}`} cards={cards} onCardClick={onCardClick} onDescriptionCard={onDescriptionCard} setHoveredCard={setHoveredCard} cursorPos={cursorPos} W={W} H={H} cardDelays={cardDelays} />
      )}

      {/* "Have Fun" — piled by default (LayeredStack's own mount behavior),
          layered on top of the quadrant's normal cards (which stay exactly
          as they are, not hidden). Hovering anywhere inside this zone fans
          the photos out within it; leaving the zone piles them back. */}
      {quadrant === "help-others" && (
        <>
          <LayeredStack
            className="absolute"
            style={{
              left: `${FUN_PILE_CENTER.x * 100}%`,
              top: `${FUN_PILE_CENTER.y * 100}%`,
              width: FUN_ZONE_SIZE,
              height: FUN_ZONE_SIZE,
              transform: "translate(-50%, -50%)",
            }}
          >
            {FUN_PHOTOS.map((photo) => (
              <button
                key={photo.src}
                onClick={() => onDescriptionCard({ title: "Have Fun", description: photo.caption, thumbnail: photo.src, x: 0, y: 0 })}
                className="absolute rounded-full overflow-hidden border-4 border-card shadow-lg cursor-pointer"
                style={{ left: `${photo.x * 100}%`, top: `${photo.y * 100}%`, width: FUN_TILE_SIZE, height: FUN_TILE_SIZE, transform: "translate(-50%, -50%)" }}
              >
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </LayeredStack>
          <span
            className="absolute text-2xs font-semibold uppercase tracking-[0.15em] text-neutral-400 pointer-events-none"
            style={{
              left: `${FUN_PILE_CENTER.x * 100}%`,
              top: `calc(${FUN_PILE_CENTER.y * 100}% + ${FUN_TILE_SIZE} / 2 + 16px)`,
              transform: "translate(-50%, 0)",
            }}
          >
            Have Fun
          </span>
        </>
      )}

      {/* Cursor-position markers on each axis — ride along with the cursor-
          tracking lines above, right at their intersection with this
          quadrant's two bracket lines, so each reads as "where the cursor
          currently is" on that axis rather than a fixed caption. */}
      {!isReflection && vSubLabel && (
        <span
          className={`absolute text-2xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap pointer-events-none ${hoverY ? "text-destructive" : "text-neutral-400"}`}
          style={{ left: vSubX, top: cursorPos.y, writingMode: "vertical-rl", transform: "translate(-50%, -50%) rotate(180deg)" }}
        >
          {vSubLabel}
        </span>
      )}
      {!isReflection && hSubLabel && (
        <span
          className={`absolute text-2xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap pointer-events-none ${hoverX ? "text-destructive" : "text-neutral-400"}`}
          style={{ left: cursorPos.x, top: hSubY, transform: "translate(-50%, -50%)" }}
        >
          {hSubLabel}
        </span>
      )}
    </div>
  );
}

function DiagonalArrowIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      />
    </svg>
  );
}

// A circular ring of `quote`'s characters, evenly spaced around a full
// rotation (not a fixed per-character angle — that only lined up for one
// specific string length in the original version this was adapted from),
// spinning slowly around a center icon. Hovering the card (via the shared
// `group` class every card wrapper already has) swaps which of the two
// arrow icons shows, instead of needing its own hover state. The keyframes
// this animation uses (spin-ring) live in styles.css — Tailwind has no
// arbitrary-value syntax for a brand-new @keyframes block.
function SpinningQuoteTile({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <div className="relative w-full h-full rounded-full border border-dotted border-neutral-400 p-1">
      <div className="relative w-full h-full rounded-full overflow-hidden grid place-content-center bg-foreground">
        <div className="absolute inset-0" style={{ animation: "spin-ring 8s linear infinite" }}>
          {chars.map((char, i) => (
            <span
              key={i}
              className="absolute inset-1.5 select-none text-center text-2xs text-white"
              style={{ transform: `rotate(${(360 / chars.length) * i}deg)`, transformOrigin: "50% 50%" }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </div>
        <div className="relative w-9 h-9 rounded-full bg-card text-foreground flex items-center justify-center overflow-hidden">
          <DiagonalArrowIcon
            className="absolute w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%] group-hover:text-black"
            style={{ transform: "translate(0, 0)" }}
          />
          <DiagonalArrowIcon
            className="absolute w-4 h-4 transition-transform duration-300 ease-in-out delay-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black group-hover:delay-100"
            style={{ transform: "translate(-150%, 150%)" }}
          />
        </div>
      </div>
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

  const cardNodes = cards.map((card, i) => {
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
            // The real shadcn Button/style-jsx version (SexyButton) needs
            // to BE the card's only interactive element — it renders its
            // own <a>, so it can't sit inside the generic wrapper below
            // (that would be a nested <a>, invalid HTML) the way every
            // other card's visual does. No title/subtitle row either, to
            // match the reference exactly — just the button itself.
            if (card.spinningQuote && card.externalLink) {
              return <SexyButton text={card.quote ?? card.title} href={card.externalLink} />;
            }
            const inner = (
              <>
                {card.quote && card.spinningQuote ? (
                  // The spinning-ring variant — a genuine circle (not the
                  // rounded-3xl square every other tile uses), since that's
                  // the whole point of this one card reading differently.
                  <span className="relative w-full aspect-square flex items-center justify-center">
                    <SpinningQuoteTile text={card.quote} />
                  </span>
                ) : card.quote ? (
                  // A different-looking tile — dark background, the quote
                  // itself shown directly instead of a thumbnail/"coming
                  // soon" state, so this one card reads as its own
                  // statement rather than a prototype preview.
                  <span className="relative w-full aspect-square rounded-3xl bg-foreground transition-shadow hover:shadow-md flex items-center justify-center p-4 overflow-hidden">
                    <span className="text-white text-xs italic leading-snug text-center">“{card.quote}”</span>
                  </span>
                ) : (
                  <span className="relative w-full aspect-square rounded-3xl bg-muted transition-shadow hover:shadow-md flex items-center justify-center p-[10%] overflow-hidden">
                    {card.thumbnail && (
                      <img src={card.thumbnail} alt={card.title} className="w-full h-full object-cover" />
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
                        className={`absolute inset-0 flex items-center justify-center bg-muted/90 text-2xs uppercase tracking-widest text-neutral-400 transition-opacity ${
                          card.thumbnail ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                        }`}
                      >
                        Coming soon
                      </span>
                    )}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold text-foreground">{card.title}</span>
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
      });

  return <>{cardNodes}</>;
}
