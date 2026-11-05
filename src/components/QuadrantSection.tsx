import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { MatrixArticle } from "@/routes/index";
import { QuadrantDestinationView } from "@/components/QuadrantDestinationView";
import { LinkedInBadge, OVERVIEW_TEXT } from "@/components/LinkedInBadge";
import { CursorCrosshairMarks } from "@/components/CursorCrosshair";
import { CardModal } from "@/components/CardModal";
import {
  BRACKET,
  EDGE,
  LABEL_DELAY_MS,
  LABEL_DURATION_MS,
  CARD_DURATION_MS,
  EXIT_DURATION_MS,
  EXIT_STAGGER_MAX_MS,
  FULL_SETTLE_MS,
  DESTINATION_CARD_BASE_DELAY_MS,
  DESTINATION_CARD_STAGGER_MAX_MS,
  DESTINATION_CARD_DELAY_SLOTS,
  cardGrowScale,
  CARD_GROW_DURATION_MS,
  SELF_UNDERSTANDING_CARDS,
  HHI_CARDS,
  HELP_OTHERS_CARDS,
  getReflectionCards,
  type QuadrantId,
  type DestinationCard,
} from "@/data/quadrantCards";

// This is a fork of fun-stuff's QuadrantSection with the "hero" stop removed
// — on this branch, the landing experience is the OLD hero section above
// this component (hello-stranger image, HandDrawnDiagram, paragraph), so a
// second zoomed-diagram intro here would be redundant. This component now
// starts directly at "work" ("Help myself grow"), immediately after Hero —
// the old work matrix (ArticlesMatrix) that used to sit between them, and
// its own scroll-driven climb, has since been removed from the page
// entirely; this is the whole experience past Hero now, straight through to
// the footer.
//
// Only "work" and "center" are on the real, scrollable timeline
// (SCROLL_STOPS below) — scrolling in from Hero lands on "work" first, and
// continuing to scroll blends into "center" (the 2x2 grid), the exact same
// zoom-out blend a click on the back-arrow (return to matrix) produces. The
// other 3 quadrants ("hhi", "help-others", "reflection") are reachable ONLY
// by clicking a card from "center" — they have no reserved scroll real
// estate of their own, so plain scrolling never passes through them.
// "overview" is unreachable on this branch (no card leads to it) — its code
// stays in place, just effectively hidden, rather than deleted, in case it's
// wired back in later.
//
// Real scroll (`scrolledPast`, a plain `scroll` listener, not framer-motion)
// drives the continuous "work" <-> "center" blend; every visual property
// (line position, opacity) is a continuous function of that distance while
// scrolling. Clicking a card jumps via `clickTarget` instead: it overrides
// the displayed stop immediately and the line picks up a CSS transition for
// that one jump (see `hLineTransition`/`vLineTransition` below). If the
// target has a scroll slot (work/center), `jumpTo` also silently scrolls
// real `scrollY` to match once the animation settles, then clears the
// override, handing control back to continuous scroll-tracking with nothing
// left to visibly snap. If the target has no scroll slot (hhi/help-others/
// reflection), `clickTarget` just stays set indefinitely — real scroll is
// left untouched (it's always already resting on "center", the only place
// these are reachable from) — until another `jumpTo` (e.g. the back-arrow,
// to "center") replaces it.
type Stop = "center" | QuadrantId | "overview";
type MatrixQuadrant = "top-left" | "top-right" | "bottom-left" | "bottom-right";

// The matrix's 4 sub-axis labels, keyed by on-screen quadrant — one source
// of truth for both the static label text at each fixed corner and the
// cursor-following pill (below), so the two can never drift out of sync.
const QUADRANT_LABEL: Record<MatrixQuadrant, string> = {
  "top-left": "Understand myself",
  "top-right": "Grow myself",
  "bottom-left": "Understand Humans",
  "bottom-right": "Inspire Others",
};

const SEED = 36; // small resting cross size at the Overview stop
const TRANSITION_MS = 700;
// Gap between a destination's colored background rect and BOTH the two
// bracket lines and the true screen edges, so it reads as a floating card
// rather than a flush-to-edge color fill.
const QUADRANT_BG_GAP = 24;
// Overview's small cross doubles as a "go back to the matrix" control:
// hovering it grows the lines LONGER, partway toward the full matrix shape
// (quick feedback, CROSS_HOVER_MS, previewing what a click fully completes)
// — not thicker; thickness stays constant throughout. Clicking jumps to
// "center" — the click-jump's own TRANSITION_MS animation then continues
// that same growth the rest of the way out to the full matrix, since both
// are driven by the same per-line transition at that point (see below).
const CROSS_HOVER_MS = 150;
const LINE_THICKNESS = 1.5;
// How far toward "center"'s full geometry hovering grows the cross — 0 =
// stays put, 1 = would be fully grown (that full distance is reserved for
// an actual click, so this stays a small nudge, not a real preview).
const CROSS_HOVER_GROW_T = 0.08;
// Overview's badge rests at BADGE_REST_Y (matches the old static
// translate-y-12) and starts from BADGE_OFF_Y while arriving, so it visibly
// rises up into place as part of scrolling/clicking in, instead of just
// fading in already at rest.
const BADGE_REST_Y = 48;
const BADGE_OFF_Y = 112;

// The only 2 stops with reserved real-scroll real estate — see the top-of-
// file comment for why the other 3 quadrants (plus "overview") are
// click-only instead.
const SCROLL_STOPS: Stop[] = ["work", "center"];

// On the matrix ("center"), all 4 top-level labels are active, so both ends
// of each line stop at EDGE — dot-to-dot, never past either labeled dot. But
// every quadrant only has 2 of the 4 labels active (e.g. "work" is Qiyu+Do;
// Others/Think are hidden there) — the line's end that matches an INACTIVE
// label has nothing anchoring it, so it isn't capped at EDGE at all: it runs
// all the way to the true screen edge, undotted. Only the end matching the
// ACTIVE label stays at EDGE with a dot.
function hLineFor(stop: Stop, W: number, H: number) {
  if (stop === "overview") return { top: H * 0.4, left: W / 2 - SEED / 2, width: SEED };
  if (stop === "center") return { top: H / 2, left: EDGE, width: W - 2 * EDGE };
  const b = BRACKET[stop];
  const top = b.hTop === "top" ? EDGE : H - EDGE;
  const activeVSide = b.vSide === "left" ? "right" : "left"; // Think active if "left", Do if "right"
  const left = activeVSide === "left" ? EDGE : 0;
  const right = activeVSide === "left" ? W : W - EDGE;
  return { top, left, width: right - left };
}

function vLineFor(stop: Stop, W: number, H: number) {
  if (stop === "overview") return { left: W / 2, top: H * 0.4 - SEED / 2, height: SEED };
  if (stop === "center") return { left: W / 2, top: EDGE, height: H - 2 * EDGE };
  const b = BRACKET[stop];
  const left = b.vSide === "left" ? EDGE : W - EDGE;
  const activeHSide = b.hTop === "top" ? "bottom" : "top"; // Qiyu active if "top", Others if "bottom"
  const top = activeHSide === "top" ? EDGE : 0;
  const bottom = activeHSide === "top" ? H : H - EDGE;
  return { left, top, height: bottom - top };
}

// The seed both lines grow out of while approaching "work" for the first
// time (see `entering` below) — a small SEED-length mark at the BOTTOM-LEFT
// corner, both lines meeting at the exact same point (EDGE, H - EDGE),
// matching the old work matrix's own Phase 0 seed exactly (ArticlesMatrix,
// index.tsx: cornerX = EDGE, cornerY = VH - EDGE). This is a fixed visual
// starting point, independent of which corner "work"'s own BRACKET entry
// happens to anchor its two (different) dots at — blendRect (below) is what
// reconciles the two, so the seed can stay anchored at one shared corner
// while still landing exactly on hLineFor("work")/vLineFor("work") at t=1.
function hLineSeed(H: number) {
  return { top: H - EDGE, left: EDGE, width: SEED };
}
function vLineSeed(H: number) {
  return { left: EDGE, top: H - EDGE - SEED, height: SEED };
}

// The old work matrix's own Phase 0 end state: both lines already grown to
// their full screen-spanning length, but STILL anchored at the bottom-left
// corner (not yet moved toward wherever they finally come to rest) — h-line
// edge-to-edge at the fixed corner height, v-line edge-to-edge at the fixed
// corner's x. This is the midpoint "entering" below blends through: first
// half of the approach GROWS the seed out to this full cross (pure growth,
// no repositioning, matching the matrix's own Phase 0 exactly); second half
// then SLIDES this full cross into "work"'s actual resting bracket (pure
// reposition/trim, no more growing) — two distinct beats, not one
// simultaneous blend, matching how the matrix's own Phase 0 -> Climb read.
function hLineFullCross(W: number, H: number) {
  return { top: H - EDGE, left: 0, width: W };
}
function vLineFullCross(W: number, H: number) {
  return { left: EDGE, top: 0, height: H };
}

// Linear-blends two same-shaped rects field by field — used for the
// continuous "work" <-> "center" scroll blend (the only pair ever blended
// this way; every other stop change is a click-jump, animated by a CSS
// transition instead — see the top-of-file comment) and for Overview's
// hover-grow blending its resting geometry toward "center"'s.
function blendRect<T extends Record<string, number>>(a: T, b: T, t: number): T {
  const result = {} as T;
  for (const key in a) result[key] = (a[key] + (b[key] - a[key]) * t) as T[typeof key];
  return result;
}

// Tracks a value's previous render so direction-aware choreography (below)
// can tell "this is appearing" apart from "this is disappearing" — a single
// CSS `transition` declaration can't apply a different delay/duration
// depending on which direction the value is moving, so anything that needs
// an asymmetric enter/leave (labels, matrix cards, the diagram) reads this
// instead of the value alone.
function usePrevious<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useEntering(value: number) {
  return value > usePrevious(value);
}

// A top-level label needs an asymmetric OPACITY transition: delayed when
// it's APPEARING (wait for the line to settle, per LABEL_DELAY_MS), but
// immediate when it's DISAPPEARING (the old section's label shouldn't still
// be sitting there while the line is already moving away toward the next
// stop). Position (left/top, tracking vLine.left/hLine.top) gets NO
// transition while scrolling — the line itself is a continuous,
// untransitioned function of scroll then, so a label transitioning its own
// position would just lag behind a constantly-moving target instead of
// riding along with it — but DOES get one during a click-jump (animatePosition
// true), matching the line's own CSS transition for that one jump, so the
// label rides along with it instead of snapping ahead of it.
function useLabelTransition(opacity: number, animatePosition: boolean) {
  const entering = useEntering(opacity);
  const position = animatePosition ? `left ${TRANSITION_MS}ms ease-out, top ${TRANSITION_MS}ms ease-out, ` : "";
  const base = `${position}opacity ${LABEL_DURATION_MS}ms ease-out`;
  return entering ? `${base} ${LABEL_DELAY_MS}ms` : base;
}

// The one dot shape used everywhere a line ends — each top-level label
// (Qiyu/Others/Think/Do) and now the Overview cross's 4 tips too. A single
// shared component instead of repeating the same span's classes at each
// call site, so every dot in this file is guaranteed to stay visually
// identical; `style` lets a call site position it (the label dots sit as
// plain flex children, the cross's dots need absolute coordinates) without
// forking the dot's own appearance.
function Dot({ style }: { style?: CSSProperties }) {
  return <span className="w-1.5 h-1.5 rounded-full bg-red-400" style={style} />;
}

export function QuadrantSection({
  onCardClick,
  workArticles,
}: {
  onCardClick: (slug: string) => void;
  workArticles: MatrixArticle[];
}) {
  const navigate = useNavigate();
  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickSettleTimerRef = useRef<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [workTab, setWorkTab] = useState<"others" | "self">("others");
  // A card with no real page yet (DestinationCard.description) opens the
  // same CardModal every other card does, just rendered right here instead
  // of routed up through index.tsx's slug-based lookup — there's no slug to
  // look up, only the card's own title/description/thumbnail, which this
  // already has in hand.
  const [descriptionCard, setDescriptionCard] = useState<DestinationCard | null>(null);
  // Cursor position for the matrix's own 4 quadrant-selector cards' grow
  // effect (see cardGrowScale) — tracked separately from the destination
  // views' own cursor tracking (QuadrantDestinationView), which also drives
  // their cards' crosshair/grow but is scoped to its own component.
  const [matrixCursorPos, setMatrixCursorPos] = useState({ x: 0, y: 0 });
  // False until the cursor has actually moved over the matrix since this
  // visit — `matrixCursorPos` defaults to (0,0) (the true top-left corner)
  // and only gets a real value from onMouseMove, so arriving here via
  // scroll (no mouse movement involved) left the cursor-following pill and
  // crosshair rendered at that stale (0,0) default, showing as a clipped
  // dark pill stuck in the corner until the mouse actually crossed the
  // matrix. Reset to false on every fresh arrival (see the matrixCardSeed
  // effect below) so nothing cursor-tracked shows until there's a real
  // position to show.
  const [matrixCursorActive, setMatrixCursorActive] = useState(false);
  // Which matrix card (if any) the cursor is currently over — drives the
  // crosshair's active/red color, same as hoveredCard does for the
  // destination pages' own crosshair.
  const [matrixHoveredCard, setMatrixHoveredCard] = useState<string | null>(null);
  // Hovering Overview's small cross (via its invisible hit-area below) —
  // only has any visual/behavioral effect while actually on "overview",
  // but tracked unconditionally since that's cheap and simpler than gating
  // the setters themselves.
  const [overviewCrossHovered, setOverviewCrossHovered] = useState(false);

  // How far real scroll has moved past this component's own top — the single
  // source of truth everything below derives from. A plain `scroll` listener
  // (not framer-motion's useScroll) to stay consistent with the rest of this
  // file, which otherwise has no motion-value machinery.
  const [scrolledPast, setScrolledPast] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      setScrolledPast(-outerRef.current.getBoundingClientRect().top);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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

  const W = containerSize.width;
  const H = containerSize.height;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;
  // Continuous position between the 2 real scroll stops (0 = "work", 1 =
  // "center") — one real viewport height of scroll each, same unit the
  // snap-anchor markers below are placed in.
  const scrollProgress = viewportH > 0 ? Math.max(0, Math.min(SCROLL_STOPS.length - 1, scrolledPast / viewportH)) : 0;
  // A click-triggered jump (see `jumpTo` below) needs the LINE to visibly
  // animate itself from wherever it currently is to the target stop — a
  // deliberate, CSS-eased motion — rather than reading as a page scroll,
  // even though real scroll is still what drives everything the rest of the
  // time. `clickTarget` is non-null for exactly that window: while set, it
  // overrides the scroll-derived stop outright, so `heldStop` and every
  // choreography value just read the target immediately, while the line
  // itself picks up a real CSS transition for that one jump (see
  // `hLineTransition`/`vLineTransition` below). If the target is one of
  // SCROLL_STOPS, `jumpTo` also silently (no native scroll animation) moves
  // real scroll to match once the animation settles and clears the
  // override, so continuous tracking resumes exactly where this left off
  // with nothing left to visibly snap — otherwise (a click-only quadrant)
  // the override just stays set until the next `jumpTo` replaces it.
  const [clickTarget, setClickTarget] = useState<Stop | null>(null);
  const heldStop: Stop = clickTarget ?? SCROLL_STOPS[Math.round(scrollProgress)];
  // Once scrolled past the whole sequence's reserved height, this section's
  // otherwise-always-fixed content should get completely out of the way
  // rather than keep floating over whatever comes next on the page.
  const pastEnd = viewportH > 0 && scrolledPast > SCROLL_STOPS.length * viewportH;
  // On this branch, this component's own document position starts partway
  // down the page (after Hero above it), not at scroll 0 like on fun-stuff —
  // so real scroll can be legitimately BEFORE this component's own top
  // (scrolledPast < 0). Unlike the component being hidden for that whole
  // approach, this section stays visible (just its 2 lines — see `entering`
  // below) all the way from the true top of the page, same as the old work
  // matrix's own Phase 0, which never hid its lines either — only content
  // (cards/labels) waits for arrival. pastEnd mirrors this for the other
  // direction, once scrolled past the whole sequence's reserved height.
  // Exactly the old matrix's own Phase 0 formula (ArticlesMatrix, index.tsx:
  // `heroProgress = latest / matrixTopDoc`) — a fraction of the ENTIRE
  // scroll distance from the true top of the page down to this component's
  // own top, not an arbitrary fixed window. `latest` (current document
  // scrollY) and `matrixTopDoc` (this component's own fixed document-space
  // top) are both derivable from state already tracked: scrolledPast =
  // latest - matrixTopDoc, so matrixTopDoc = latest - scrolledPast.
  const latest = typeof window !== "undefined" ? window.scrollY : 0;
  const matrixTopDoc = latest - scrolledPast;
  const heroProgress = matrixTopDoc > 0 ? Math.max(0, Math.min(1, latest / matrixTopDoc)) : 1;
  // True for the entire approach (not yet arrived at real scroll position 0)
  // as long as a click isn't overriding the display — clicking never wants
  // this growth effect, only a fresh scroll-driven arrival does. 0 (not yet
  // arrived, growth not started) to 1 (arrived, same as hLineFor/vLineFor's
  // own resting value), tracking heroProgress the whole way.
  const entering = clickTarget === null && scrolledPast < 0;
  const entryT = heroProgress;

  // Bumped every time the matrix is freshly arrived at, so the 4 quadrant
  // cards' random entrance order (below) is re-rolled each visit rather than
  // staying fixed for the component's whole lifetime.
  const [matrixCardSeed, setMatrixCardSeed] = useState(0);
  useEffect(() => {
    if (heldStop === "center") setMatrixCardSeed((s) => s + 1);
    // Leaving "center" (for anywhere else) is also when to clear
    // matrixCursorActive, so it's already false by the time of the NEXT
    // arrival, guaranteed to need a real mouse move again before anything
    // cursor-tracked shows.
    else setMatrixCursorActive(false);
  }, [heldStop]);
  const matrixCardDelays = useMemo(
    // Same stagger range as "help myself grow"'s own cards (DESTINATION_CARD_STAGGER_MAX_MS) —
    // re-rolled each visit here though (matrixCardSeed), unlike those, which stay fixed for the session.
    () => Array.from({ length: 5 }, () => Math.random() * DESTINATION_CARD_STAGGER_MAX_MS),
    [matrixCardSeed],
  );
  // Same idea, re-rolled on the same visit, but for the reverse direction —
  // scattering the order the cards disappear in when scrolling away, rather
  // than reusing the entrance order.
  const matrixCardExitDelays = useMemo(
    () => Array.from({ length: 5 }, () => Math.random() * EXIT_STAGGER_MAX_MS),
    [matrixCardSeed],
  );

  // Each destination's own cards (QuadrantDestinationView's DestinationCards)
  // read their per-card entrance delay from here, by position — unlike the 4
  // matrix-selector cards above, this is generated ONCE for the component's
  // whole lifetime (true `[]` deps, no re-roll on each visit), matching the
  // old work matrix's own cardRevealDelays (index.tsx), which stayed fixed
  // for the whole session instead of reshuffling every time you scrolled
  // back to it. DestinationCards itself still remounts on each visit (so the
  // fade-in still replays), it just indexes into this same stable array
  // every time instead of rolling its own.
  const destinationCardDelays = useMemo(
    () => Array.from({ length: DESTINATION_CARD_DELAY_SLOTS }, () => Math.random() * DESTINATION_CARD_STAGGER_MAX_MS),
    [],
  );

  // Clicking jumps via a CSS-animated line reversal, not a page scroll: set
  // `clickTarget` so the line (and everything else) reads the destination
  // immediately and animates there over TRANSITION_MS, same choreography a
  // scroll-triggered stop change gets. If the target is one of SCROLL_STOPS
  // (work/center), once that's had time to fully settle (FULL_SETTLE_MS —
  // the line plus label plus last-staggered card), silently snap real
  // scroll to match (`behavior: "auto"`, no native scroll animation — it's
  // already visually "arrived") and clear the override, so continuous
  // scroll-tracking resumes exactly where this left off with nothing left
  // to visibly snap. If the target is a click-only quadrant (hhi/
  // help-others/reflection), it has no scroll slot to sync to — real scroll
  // is left exactly where it is (always "center", the only place these are
  // reachable from) and `clickTarget` simply stays set until the next
  // `jumpTo` (e.g. the back-arrow, to "center") replaces it.
  const jumpTo = (stop: Stop, tab?: "others" | "self") => {
    if (tab) setWorkTab(tab);
    // A second click before the first has settled replaces the pending
    // settle entirely (not stacks with it) — otherwise the FIRST click's
    // timer would still fire later and silently scroll back to its own
    // (now stale) target after the second click's target had already taken
    // over, undoing it.
    if (clickSettleTimerRef.current) window.clearTimeout(clickSettleTimerRef.current);
    setClickTarget(stop);
    const scrollIdx = SCROLL_STOPS.indexOf(stop);
    if (scrollIdx === -1) return;
    clickSettleTimerRef.current = window.setTimeout(() => {
      const vh = window.innerHeight;
      const docTop = outerRef.current ? window.scrollY + outerRef.current.getBoundingClientRect().top : 0;
      window.scrollTo({ top: docTop + scrollIdx * vh, behavior: "auto" });
      // Set scrolledPast directly, in the same batch as clearing the
      // override, instead of waiting for the 'scroll' listener's own event
      // (dispatched asynchronously) to catch up — otherwise there's a
      // narrow window where clickTarget is already null but scrolledPast
      // still holds its pre-jump value, which would render the line at its
      // OLD scroll-derived position for a stray frame (lineTransition is
      // already "none" again by then, so that stray frame has nothing
      // smoothing it — an instant, visible flicker back and then forward).
      setScrolledPast(scrollIdx * vh);
      setClickTarget(null);
      clickSettleTimerRef.current = null;
    }, FULL_SETTLE_MS);
  };

  // A click-only quadrant (hhi/help-others/reflection — no SCROLL_STOPS slot
  // of its own, see jumpTo above) has no scroll position that corresponds to
  // "being here," so real scroll should do nothing while one is open —
  // otherwise it'd silently drift underneath the locked-in display, with
  // nothing on screen to show for it, until some other interaction snapped
  // the view to wherever it quietly ended up. The only way back to the
  // matrix is the explicit click affordances already built for that
  // (QuadrantDestinationView's back-arrow / open-background click, both of
  // which call jumpTo("center")) — not scrolling.
  useEffect(() => {
    if (clickTarget === null || SCROLL_STOPS.includes(clickTarget)) return;
    // Both html and body — `html { scroll-snap-type: y mandatory }`
    // (styles.css) means the actual scrolling element can be either
    // depending on the browser, so only locking one isn't reliable.
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [clickTarget]);

  // While `entering`, the approach happens in the SAME two beats the old
  // work matrix's own Phase 0 -> Climb did: first half of the window (growT)
  // grows the seed out to a full screen-spanning cross, still anchored at
  // the bottom-left corner (pure growth, no repositioning); second half
  // (slideT) then slides/trims that full cross into "work"'s own resting
  // bracket (pure reposition, no more growing) — not one blend doing both
  // at once, which is what made the very first version of this read as
  // growing and sliding diagonally at the same time instead of two distinct
  // motions.
  const growT = Math.min(1, entryT / 0.5);
  const slideT = Math.max(0, (entryT - 0.5) / 0.5);
  // The old matrix's own cards became visible right when its cross finished
  // growing (heroProgress >= 0.97) — the SAME moment, not after some further
  // slide also finished. Its climb (which DOES hide the cards again while it
  // plays out) is a much bigger, separate transition — sliding the whole
  // cross to a totally different corner for an unrelated held panel
  // (Reflection's FlipBook) — not a continuation of the matrix's own resting
  // shape. "work" has no such further destination to climb toward: slideT
  // above is just a trivial EDGE-sized trim off the same full cross, not a
  // dramatic reposition, so there's no reason to hide content through it —
  // `stillGrowing` (not the broader `entering`) gates content below, so it
  // starts appearing the moment growth reaches that full cross, same as the
  // matrix's own cards did, with the trim finishing around it rather than
  // before it.
  const stillGrowing = entering && growT < 1;

  // 3 cases: while click-jumping, reduces to the target stop's own plain
  // resting position directly — no blend needed, since the CSS "all"
  // transition (see below) is what animates the visible move there. While
  // still approaching "work" for the first time (`entering`), the two-beat
  // grow-then-slide above — instead of reading from scroll position at all,
  // since real scroll hasn't reached a SCROLL_STOPS checkpoint yet for
  // scrollProgress to meaningfully track. Otherwise (ordinary scrolling,
  // already arrived), blended straight off scrollProgress so the line
  // visibly tracks scroll distance in real time between "work" and "center"
  // (see hLineTransition/vLineTransition below for why it gets no CSS
  // transition then).
  const hLine = clickTarget !== null
    ? hLineFor(clickTarget, W, H)
    : entering
    ? entryT <= 0.5
      ? blendRect(hLineSeed(H), hLineFullCross(W, H), growT)
      : blendRect(hLineFullCross(W, H), hLineFor("work", W, H), slideT)
    : blendRect(hLineFor("work", W, H), hLineFor("center", W, H), scrollProgress);
  const vLine = clickTarget !== null
    ? vLineFor(clickTarget, W, H)
    : entering
    ? entryT <= 0.5
      ? blendRect(vLineSeed(H), vLineFullCross(W, H), growT)
      : blendRect(vLineFullCross(W, H), vLineFor("work", W, H), slideT)
    : blendRect(vLineFor("work", W, H), vLineFor("center", W, H), scrollProgress);
  // No transition at all on position/length while scroll (or the pre-arrival
  // growth above) is driving the line — same as the old work matrix's own
  // fixed-overlay lines (ArticlesMatrix, index.tsx): their length/position
  // is plain JS state recalculated every scroll event with NO css
  // transition, so it tracks the scroll position exactly, instantly, frame
  // by frame; only their THICKNESS gets a transition (1px<->2px). Adding any
  // easing on top of that here would make the growth lag behind scroll by
  // that duration instead of tracking it 1:1, reading as mushy rather than
  // crisp. The one exception is Overview's resting cross, which gets a
  // quick, DELIBERATE transition specifically so hovering it can preview a
  // grow toward "center" (see hLineGrown/vLineGrown below) smoothly in both
  // directions — nothing else is scroll-driven there, so a transition is
  // safe (and needed) only on that one stop. A click-jump instead gets the
  // full `all` transition, animating the whole move as one deliberate motion.
  const hLineTransition = clickTarget !== null ? `all ${TRANSITION_MS}ms ease-out` : heldStop === "overview" ? `width ${CROSS_HOVER_MS}ms ease-out` : "none";
  const vLineTransition = clickTarget !== null ? `all ${TRANSITION_MS}ms ease-out` : heldStop === "overview" ? `height ${CROSS_HOVER_MS}ms ease-out` : "none";
  // Hovering Overview's cross blends its current geometry partway toward
  // "center"'s full-matrix geometry (CROSS_HOVER_GROW_T) — a preview of what
  // clicking fully completes. Only applies at rest (not mid click-jump,
  // which already animates toward "center" on its own via the plain
  // hLine/vLine above) — `hLine`/`vLine` themselves stay the
  // plain scroll-derived value throughout, since other things (the top-level
  // labels' position, QuadrantDestinationView) read them too and shouldn't
  // be affected by a hover state that's specific to the Overview cross.
  const overviewGrowing = heldStop === "overview" && overviewCrossHovered && clickTarget === null;
  const hLineGrown = overviewGrowing ? blendRect(hLine, hLineFor("center", W, H), CROSS_HOVER_GROW_T) : hLine;
  const vLineGrown = overviewGrowing ? blendRect(vLine, vLineFor("center", W, H), CROSS_HOVER_GROW_T) : vLine;
  // Overview's 4 end-dots ride the same two speeds as the lines: quick
  // (CROSS_HOVER_MS) position easing while just hovering in place, full
  // TRANSITION_MS during an actual click-jump so they travel outward in
  // step with the lines' own expansion.
  const dotMoveMs = clickTarget !== null ? TRANSITION_MS : CROSS_HOVER_MS;
  const dotTransition = `opacity ${TRANSITION_MS}ms ease-out, left ${dotMoveMs}ms ease-out, top ${dotMoveMs}ms ease-out`;

  // Gated by `!stillGrowing` (not the broader `entering`) so none of this
  // (labels, cards, badge) appears while the seed is still growing to a full
  // cross — same as the old work matrix's own Phase 0 (matrixContentVisible
  // stays false until growth finishes). But it starts appearing as soon as
  // growth finishes, in step with the slide stage that follows, rather than
  // waiting for the slide to finish too — matching how the matrix's own
  // cards were already visible and interactive while its climb/slide was
  // still playing out around them.
  const matrixOpacity = !stillGrowing && heldStop === "center" ? 1 : 0;
  const isDestinationStop =
    !stillGrowing &&
    (heldStop === "reflection" || heldStop === "work" || heldStop === "hhi" || heldStop === "help-others");
  const contentOpacity = isDestinationStop || (!stillGrowing && heldStop === "overview") ? 1 : 0;

  const activeCards: DestinationCard[] =
    heldStop === "work"
      ? workTab === "others"
        ? workArticles.map((a) => ({ title: a.title, subtitle: a.company, x: a.x, y: 1 - a.y, thumbnail: a.thumbnail, slug: a.slug, yAxisLabel: a.pillarTheme, xAxisLabel: a.workType?.toUpperCase() }))
        : SELF_UNDERSTANDING_CARDS
      : heldStop === "hhi"
      ? HHI_CARDS
      : heldStop === "help-others"
      ? HELP_OTHERS_CARDS
      : heldStop === "reflection"
      ? getReflectionCards(navigate)
      : [];

  // Each quadrant's own corner is the OPPOSITE of its bracket corner (the
  // bracket sits diagonally across from the quadrant it describes) — so e.g.
  // "work" (bracket bottom-left) occupies the top-right corner, meaning its
  // 2 relevant top-level labels are Qiyu (top) + Do (right). These are the
  // only 2 of the 4 that stay visible while a destination is open; the other
  // 2 hide, same as the rest of the matrix.
  const activeQuadrant = isDestinationStop ? (heldStop as QuadrantId) : null;
  const activeHSide = activeQuadrant ? (BRACKET[activeQuadrant].hTop === "top" ? "bottom" : "top") : null;
  const activeVSide = activeQuadrant ? (BRACKET[activeQuadrant].vSide === "left" ? "right" : "left") : null;

  const qiyuOpacity = activeQuadrant ? (activeHSide === "top" ? contentOpacity : 0) : matrixOpacity;
  const othersOpacity = activeQuadrant ? (activeHSide === "bottom" ? contentOpacity : 0) : matrixOpacity;
  const thinkOpacity = activeQuadrant ? (activeVSide === "left" ? contentOpacity : 0) : matrixOpacity;
  const doOpacity = activeQuadrant ? (activeVSide === "right" ? contentOpacity : 0) : matrixOpacity;

  // A destination's content region is bounded by the two bracket lines on
  // the bracket's own sides, and the true screen edges on the other two
  // (same "active side" logic the top-level label opacities above use) —
  // inset by QUADRANT_BG_GAP on all 4 sides. Used to position content that
  // needs to stay clear of the lines/screen edges (currently just the
  // Reflection Notes carousel, passed down as `contentRect`).
  const quadrantContentRect = activeQuadrant
    ? (() => {
        const top = (activeHSide === "top" ? 0 : hLine.top) + QUADRANT_BG_GAP;
        const bottom = (activeHSide === "top" ? hLine.top : H) - QUADRANT_BG_GAP;
        const left = (activeVSide === "left" ? 0 : vLine.left) + QUADRANT_BG_GAP;
        const right = (activeVSide === "left" ? vLine.left : W) - QUADRANT_BG_GAP;
        return { top, left, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
      })()
    : null;

  // Top-level labels (Qiyu/Others/Think/Do) sit right at the line itself —
  // same corner as the dot, on the matrix and in a destination alike —
  // rather than centered on their edge. QuadrantDestinationView's per-
  // quadrant sub-labels are the ones that move out of the way, sliding
  // *along* the line away from this same corner, so the two tiers don't
  // compete for the same spot.
  const topLabelVX = vLine.left;
  const topLabelHY = hLine.top;

  // No transition on the line itself — it's a pure, continuous function of
  // scroll (see hLine/vLine above), already getting a new value every
  // scroll frame, so there's nothing to animate between renders.
  // Top-level labels: position (left/top, tracking vLine.left/hLine.top)
  // rides along with that same untransitioned value — see useLabelTransition
  // above. Opacity alone gets the LABEL_DELAY_MS/LABEL_DURATION_MS pair, so a
  // newly-appearing label doesn't start fading in until the line has
  // essentially arrived. Each label gets its OWN transition (not a shared
  // one) because useLabelTransition needs to track each one's direction
  // (appearing vs disappearing) independently.
  const isClickJumping = clickTarget !== null;
  const qiyuTransition = useLabelTransition(qiyuOpacity, isClickJumping);
  const othersTransition = useLabelTransition(othersOpacity, isClickJumping);
  const thinkTransition = useLabelTransition(thinkOpacity, isClickJumping);
  const doTransition = useLabelTransition(doOpacity, isClickJumping);

  // The Overview badge slides up into its resting spot rather than just
  // fading in in place — BADGE_REST_Y is where it settles (matches the
  // div's own translate-y-12), BADGE_OFF_Y is where it starts from while
  // arriving (further down, so the motion reads as "rising up to meet the
  // cross"). Same direction-aware delay as every other entrance here:
  // delayed while appearing (wait for the line to settle first), immediate
  // while disappearing.
  const badgeOpacity = heldStop === "overview" ? contentOpacity : 0;
  const badgeEntering = useEntering(badgeOpacity);
  const badgeOffsetY = heldStop === "overview" ? BADGE_REST_Y : BADGE_OFF_Y;
  const badgeTransition = badgeEntering
    ? `transform ${TRANSITION_MS}ms ease-out ${LABEL_DELAY_MS}ms, opacity ${LABEL_DURATION_MS}ms ease-out ${LABEL_DELAY_MS}ms`
    : `transform ${TRANSITION_MS}ms ease-out, opacity ${LABEL_DURATION_MS}ms ease-out`;

  // Direction for the matrix's own sub-labels/cards: true while matrixOpacity
  // is rising (arriving at "center"), false while it's falling (leaving it
  // for anywhere else) — drives the same asymmetric fast-exit treatment as
  // useLabelTransition above, just for a plain number instead of a transition
  // string, since the 4 cards each need their own per-item exit stagger too.
  const matrixEntering = useEntering(matrixOpacity);
  // Which of the matrix's 4 sub-axis labels the cursor is currently nearest
  // to — same "intercept" idea as the destination pages' axis sub-labels,
  // adapted for 4 fixed corner texts instead of a 2-option-per-axis pair.
  const cursorQuadrant: MatrixQuadrant =
    matrixCursorPos.y < H / 2
      ? matrixCursorPos.x < W / 2
        ? "top-left"
        : "top-right"
      : matrixCursorPos.x < W / 2
      ? "bottom-left"
      : "bottom-right";

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: `${SCROLL_STOPS.length * 100}vh` }}>
      {/* Scroll-snap anchors — one per SCROLL_STOPS entry, at its exact
          checkpoint (an exact multiple of one viewport height into this
          component). Together with the global `scroll-snap-type: y
          mandatory` (styles.css), this is what makes scrolling settle at a
          discrete stop once you stop, purely via native browser scroll-snap
          — no JS debounce/lock of any kind needed. The 3 click-only
          quadrants have no anchor here — they're never reached by scrolling. */}
      {SCROLL_STOPS.map((_, i) => (
        <div key={i} className="absolute left-0 w-px h-px snap-start [scroll-snap-stop:always] pointer-events-none" style={{ top: `${i * 100}vh` }} />
      ))}
      <section
        aria-label="Quadrant Section"
        data-held-stop={heldStop}
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden transition-opacity"
        style={{
          // Transparent (not the usual opaque white) while `stillGrowing` —
          // this section already becomes visible one screen early so its 2
          // lines can grow in (see hLine/vLine above), but an opaque backdrop
          // that early would paint over whatever's still showing underneath
          // (Hero's own diagram/content, not yet fully scrolled away)
          // instead of just overlaying 2 thin lines on it. Snaps to white at
          // the same point content starts appearing (growth finished) —
          // same moment the old matrix's own cards first appeared, overlaid
          // on its now-fully-grown (but not yet further climbing) cross.
          backgroundColor: stillGrowing ? "transparent" : "white",
          transitionDuration: "200ms",
          opacity: pastEnd ? 0 : 1,
          pointerEvents: pastEnd || stillGrowing ? "none" : undefined,
        }}
      >
        {/* Top-level axis labels (Qiyu/Others/Think/Do) — bigger, darker text
            than the per-quadrant sub-labels in QuadrantDestinationView, and
            positioned right at the line/corner itself (topLabelVX/HY just
            track vLine.left/hLine.top). In each pair, the DOT sits exactly at
            EDGE (the same point the line stops at — never crossed by it), and
            the TEXT sits on the far side of the dot, further out toward the
            true screen edge, inside that margin strip. On the matrix all 4
            fade in together; once a destination is open, only the 2
            describing that quadrant's actual corner stay visible — e.g.
            "work" sits in the Qiyu+Do corner, so Others/Think hide.
            Entrance choreography: the label only starts fading in once the
            line has finished moving (LABEL_DELAY_MS = the line's own
            duration), with its own short, snappy fade (LABEL_DURATION_MS) —
            cards (below) wait for this to finish before they start. */}
        <div className="absolute flex flex-col items-center gap-1.5" style={{ transition: qiyuTransition, left: topLabelVX, top: EDGE, transform: "translate(-50%, -100%)", opacity: qiyuOpacity, pointerEvents: "none" }}>
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Qiyu</span>
          <Dot />
        </div>
        <div className="absolute flex flex-col items-center gap-1.5" style={{ transition: othersTransition, left: topLabelVX, top: H - EDGE, transform: "translateX(-50%)", opacity: othersOpacity, pointerEvents: "none" }}>
          <Dot />
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Others</span>
        </div>
        <div className="absolute flex items-center gap-2" style={{ transition: thinkTransition, left: EDGE, top: topLabelHY, transform: "translate(-100%, -50%)", opacity: thinkOpacity, pointerEvents: "none" }}>
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Think</span>
          <Dot />
        </div>
        <div className="absolute flex items-center gap-2" style={{ transition: doTransition, left: W - EDGE, top: topLabelHY, transform: "translateY(-50%)", opacity: doOpacity, pointerEvents: "none" }}>
          <Dot />
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Do</span>
        </div>

        {/* Sub-axis labels + the 5 quadrant cards — visible on the matrix.
            Clicking a card jumps the sequence to that stop; scrolling down
            from here naturally continues the sequence. The wrapper itself no
            longer carries the fade (each child manages its own opacity now)
            — it just gates pointer-events once the matrix is mostly visible.
            Entrance: the 4 small gray sub-axis labels fade in together,
            unstaggered; each quadrant card fades in on its own randomized
            delay — DESTINATION_CARD_BASE_DELAY_MS plus up to
            DESTINATION_CARD_STAGGER_MAX_MS, same timing "help myself grow"'s
            own cards use, firing independently of whether the top-level
            labels above have finished — so they visibly arrive in scattered
            order rather than all at once. Exit (matrixEntering
            false — scrolling away from "center"): no delay and a much
            shorter duration, so everything here starts disappearing the
            instant the line starts moving instead of still sitting fully
            visible throughout its move — the cards use their own separate
            exit stagger (matrixCardExitDelays) so they vanish in a different
            scattered order than they arrived in. */}
        <div
          className="absolute inset-0 cursor-none"
          style={{ pointerEvents: matrixOpacity >= 0.5 ? "auto" : "none" }}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) setMatrixCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setMatrixCursorActive(true);
          }}
          onClick={(e) => {
            // Only the open background, not a card/label/etc. nested inside
            // it (those are separate elements with their own, more specific
            // onClick, or — for the labels — pointer-events-none so this
            // still fires when clicked directly on one). Clicking anywhere
            // in a quadrant jumps to that quadrant's destination, same as
            // clicking one of its cards would — the top-right quadrant
            // (which holds 2 cards, "work" and "tech for self-understanding")
            // defaults to "work" since there's no single card being pointed
            // at here, only a general area.
            if (e.target !== e.currentTarget) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const quadrant: MatrixQuadrant = y < H / 2 ? (x < W / 2 ? "top-left" : "top-right") : x < W / 2 ? "bottom-left" : "bottom-right";
            if (quadrant === "top-left") jumpTo("reflection");
            else if (quadrant === "top-right") jumpTo("work", "others");
            else if (quadrant === "bottom-left") jumpTo("hhi");
            else jumpTo("help-others");
          }}
        >
          {/* Same cursor-tracking crosshair the 4 destination pages use
              (CursorCrosshairMarks), so hovering the matrix reads the same
              way — active (red) while hovering one of the 4 cards below.
              clipToQuadrant stops each line at the matrix's own
              quadrant-dividing lines instead of sweeping the full page
              (which has no such divider to stop at on a destination); no
              back-arrow marker here — that affordance means "return to the
              matrix," which doesn't apply while already on it. Explicitly
              faded by matrixOpacity (with the same fast exit as the rest of
              this wrapper's content) — unlike its siblings here, an SVG
              has no opacity of its own to inherit one from, so without this
              it stayed fully visible even after scrolling away from "center".
              ALSO gated by matrixCursorActive — otherwise, arriving here via
              scroll (no mouse movement involved) draws these at the stale
              (0,0) default cursorPos, in the true top-left corner. */}
          {W > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox={`0 0 ${W} ${H}`}
              style={{ opacity: matrixCursorActive ? matrixOpacity : 0, transition: `opacity ${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms` }}
            >
              <CursorCrosshairMarks cursorPos={matrixCursorPos} W={W} H={H} edge={EDGE} active={!!matrixHoveredCard} clipToQuadrant showMarker={false} />
            </svg>
          )}

          {/* The 4 static corner labels that used to sit permanently at the
              matrix's center are gone — the cursor-following pill below
              already shows the same text (QUADRANT_LABEL), dynamically, so
              the fixed copies just duplicated it. */}

          {/* The cursor itself becomes a pill showing the matching quadrant's
              label — same text as the 4 static corner labels above (one
              shared QUADRANT_LABEL map, read by both), but reading as a
              direct cursor readout rather than something you have to glance
              away to a fixed corner for. Centered exactly on the cursor —
              i.e. on the intersection of the two tracking lines, which both
              pass through that same point by construction. The up-right
              arrow signals "forward, into this quadrant" (the whole quadrant
              is clickable, see the wrapper's onClick above) — the mirror
              image of the destination pages' up-LEFT back-arrow, which means
              the opposite: "back, to the matrix". */}
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 whitespace-nowrap pointer-events-none"
            style={{
              left: matrixCursorPos.x,
              top: matrixCursorPos.y,
              transform: "translate(-50%, -50%)",
              // Same matrixCursorActive gate as the crosshair above — stays
              // invisible at the stale (0,0) default until a real mouse
              // move gives it an actual position to show.
              opacity: matrixCursorActive ? matrixOpacity : 0,
              transition: `opacity ${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`,
            }}
          >
            {QUADRANT_LABEL[cursorQuadrant]}
            <ArrowUpRight className="size-3.5 shrink-0" />
          </div>

          {/* All 5 matrix cards, each with a hand-drawn icon in its
              thumbnail — Qiyu's own sketches (not SF Symbols; those are
              licensed by Apple for use only within Apple-platform software,
              not web content, so real SF Symbol glyphs can't be embedded
              here), matching the same pencil-sketch style the rest of the
              site's illustrations already use (HandDrawnDiagram, the hero
              image). Each card grows slightly as the cursor nears it (same
              cursor-proximity scale technique as the original work matrix
              and the destination cards below — see
              CARD_GROW_MAX_DISTANCE/CARD_GROW_MAX_SCALE). */}
          {[
            { title: "Work", x: 0.57, y: 0.17, onClick: () => jumpTo("work", "others"), thumbnail: "/articles/work-icon.jpg" },
            { title: "Tech for self-understanding", x: 0.77, y: 0.23, onClick: () => jumpTo("work", "self"), thumbnail: "/articles/self-understanding-icon.jpg" },
            { title: "Human-Human Interaction experiments", x: 0.28, y: 0.68, onClick: () => jumpTo("hhi"), thumbnail: "/articles/hhi-icon.jpg" },
            { title: "Life as prototypes", x: 0.68, y: 0.65, onClick: () => jumpTo("help-others"), thumbnail: "/articles/help-others-icon.jpg" },
            { title: "Reflection Notes", x: 0.28, y: 0.2, onClick: () => jumpTo("reflection"), thumbnail: "/articles/reflection-notes-icon.jpg" },
          ].map((c, i) => {
            const scale = cardGrowScale(matrixCursorPos, c.x * W, c.y * H);
            return (
              <button
                key={c.title}
                onClick={c.onClick}
                onMouseEnter={() => setMatrixHoveredCard(c.title)}
                onMouseLeave={() => setMatrixHoveredCard(null)}
                className="absolute flex flex-col items-center gap-3 bg-transparent border-0 cursor-pointer"
                style={{
                  left: `${c.x * 100}%`,
                  top: `${c.y * 100}%`,
                  opacity: matrixOpacity,
                  transform: `translateX(-50%) scale(${scale})`,
                  transition: `opacity ${matrixEntering ? CARD_DURATION_MS : EXIT_DURATION_MS}ms ${
                    matrixEntering ? `${DESTINATION_CARD_BASE_DELAY_MS + matrixCardDelays[i]}ms` : `${matrixCardExitDelays[i]}ms`
                  }, transform ${CARD_GROW_DURATION_MS}ms ease-out`,
                }}
              >
                <span className="w-28 h-28 rounded-3xl bg-neutral-100 flex items-center justify-center p-2 transition-shadow hover:shadow-md overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-contain mix-blend-multiply" />
                </span>
                <span className="text-sm text-neutral-700 whitespace-nowrap">{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* Destination view: work's tab toggle, cursor-tracking crosshair,
            whichever card set is active, the 4 bracket-end dots, and the
            static axis-end labels — one shared component reached identically
            whether you clicked here or scrolled here, since both just move
            the same `heldStop`. No back button — scrolling up is how you
            return to the matrix. */}
        {isDestinationStop && (
          <div
            className="absolute inset-0 transition-opacity"
            style={{ transitionDuration: "200ms", opacity: contentOpacity, pointerEvents: contentOpacity ? "auto" : "none" }}
          >
            <QuadrantDestinationView
              quadrant={heldStop as QuadrantId}
              cards={activeCards}
              workTab={workTab}
              setWorkTab={setWorkTab}
              W={W}
              H={H}
              hLine={hLine}
              vLine={vLine}
              onCardClick={onCardClick}
              onDescriptionCard={setDescriptionCard}
              onBackgroundClick={() => jumpTo("center")}
              contentRect={quadrantContentRect}
              cardDelays={destinationCardDelays}
            />
          </div>
        )}

        {/* Overview — the final stop, small centered cross. The LinkedIn
            badge sits right where the old "thank you" text used to, taking
            over the spot instead of the NavbarWrapper's usual fixed-to-
            viewport position (that badge hides itself on "overview" — see
            NavbarWrapper). It rises up into place (badgeOffsetY/badgeTransition)
            rather than just fading in already at rest, so arriving here —
            whether by scrolling or by a click-jump — visibly reads as motion
            settling into its final position, not a static pop-in. */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, ${badgeOffsetY}px)`,
            opacity: badgeOpacity,
            transition: badgeTransition,
            pointerEvents: heldStop === "overview" ? "auto" : "none",
          }}
        >
          <LinkedInBadge text={OVERVIEW_TEXT} />
        </div>

        {/* Invisible hit-area over Overview's small cross — doubles it as a
            "go back to the full matrix" control, generously sized (80x80)
            well beyond the cross's own ~36px reach so it's an easy target.
            Hovering grows the lines longer (hLineGrown/vLineGrown, toward the
            full matrix shape); clicking reuses the same click-jump path
            every other navigation in this component goes through, so the
            lines visibly continue expanding out to the matrix rather than
            the page scrolling there. */}
        {heldStop === "overview" && (
          <div
            className="absolute cursor-pointer"
            style={{ left: vLine.left, top: hLine.top, width: 80, height: 80, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setOverviewCrossHovered(true)}
            onMouseLeave={() => setOverviewCrossHovered(false)}
            onClick={() => jumpTo("center")}
          />
        )}

        {/* The two lines — always rendered, position/length tracking real
            scroll continuously (hLine/vLine above) with no CSS transition
            while scrolling; length transitions quickly on its own when grown
            by hovering Overview's cross; a click-jump instead CSS-animates
            everything together (hLineTransition/vLineTransition). */}
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ top: hLineGrown.top, left: hLineGrown.left, width: hLineGrown.width, height: LINE_THICKNESS, transition: hLineTransition }}
        />
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ left: vLineGrown.left, top: vLineGrown.top, width: LINE_THICKNESS, height: vLineGrown.height, transition: vLineTransition }}
        />

        {/* Overview's 4 end-dots — same Dot component as the top-level
            labels, just positioned at the cross's 4 tips instead of riding
            along as a flex child. */}
        {[
          { left: hLineGrown.left, top: hLineGrown.top + LINE_THICKNESS / 2 },
          { left: hLineGrown.left + hLineGrown.width, top: hLineGrown.top + LINE_THICKNESS / 2 },
          { left: vLineGrown.left + LINE_THICKNESS / 2, top: vLineGrown.top },
          { left: vLineGrown.left + LINE_THICKNESS / 2, top: vLineGrown.top + vLineGrown.height },
        ].map((d, i) => (
          <Dot
            key={i}
            style={{
              position: "absolute",
              left: d.left,
              top: d.top,
              transform: "translate(-50%, -50%)",
              opacity: heldStop === "overview" ? contentOpacity : 0,
              transition: dotTransition,
              pointerEvents: "none",
            }}
          />
        ))}
      </section>

      {descriptionCard && (
        <CardModal
          title={descriptionCard.title}
          description={descriptionCard.description}
          image={descriptionCard.thumbnail}
          onClose={() => setDescriptionCard(null)}
        />
      )}
    </div>
  );
}
