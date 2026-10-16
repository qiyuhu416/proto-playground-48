import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { MatrixArticle } from "@/routes/index";
import { HandDrawnDiagram, HERO_CONTENT, type GapId } from "@/routes/index";
import { QuadrantDestinationView } from "@/components/QuadrantDestinationView";
import { LinkedInBadge, OVERVIEW_TEXT } from "@/components/LinkedInBadge";
import {
  BRACKET,
  EDGE,
  LABEL_DELAY_MS,
  LABEL_DURATION_MS,
  CARDS_BASE_DELAY_MS,
  CARD_DURATION_MS,
  CARD_STAGGER_MAX_MS,
  EXIT_DURATION_MS,
  EXIT_STAGGER_MAX_MS,
  FULL_SETTLE_MS,
  QUADRANT_COLOR,
  TECH_SELF_COLOR,
  cardGrowScale,
  CARD_GROW_DURATION_MS,
  SELF_UNDERSTANDING_CARDS,
  getHhiCards,
  HELP_OTHERS_CARDS,
  getReflectionCards,
  type QuadrantId,
  type DestinationCard,
} from "@/data/quadrantCards";

// Single unified sequence covering the whole front-door experience: hero
// (zoomed-in diagram) -> center (full matrix) -> work -> hhi -> help-others
// -> reflection -> overview. Reached either by clicking a card on the matrix
// or by scrolling.
//
// Scroll is REAL, native scroll, same technique as the site's original
// scroll-driven matrix (before this was rewritten into a wheel-captured
// pagination model): the outer wrapper below reserves one real viewport
// height of scroll per stop, a plain `scroll` listener measures how far
// you've scrolled past its top (`scrolledPast`), and every visual property
// (line position, opacity, diagram size) is a continuous function of that
// distance — nothing here intercepts or prevents the browser's own scroll.
// `html { scroll-snap-type: y mandatory }` (global, in styles.css) plus a
// tiny snap-anchor div at each stop's checkpoint (rendered at the bottom of
// this component) is what makes scrolling still *settle* at a discrete stop
// once you stop, instead of resting at an arbitrary in-between position —
// the browser does that natively, no JS debounce/lock needed. Clicking a
// card just performs a normal smooth `window.scrollTo` to that stop's
// checkpoint, which drives the same `scrolledPast` -> visual mapping.
type Stop = "hero" | "center" | QuadrantId | "overview";

const SEED = 36; // small resting cross size at the Overview stop
const TRANSITION_MS = 700;
// Gap between a destination's colored background rect and BOTH the two
// bracket lines and the true screen edges, so it reads as a floating card
// rather than a flush-to-edge color fill.
const QUADRANT_BG_GAP = 24;
// Overview's small cross doubles as a "go back to the matrix" control:
// hovering it thickens the lines (quick feedback, CROSS_HOVER_MS) and
// clicking jumps to "center" — the click-jump's own TRANSITION_MS animation
// then naturally eases the thickness back down WHILE the lines expand
// outward to the full matrix, since both are driven by the same
// `lineTransition` at that point (see below).
const CROSS_HOVER_MS = 150;
const LINE_THICKNESS = 1.5;
const LINE_THICKNESS_HOVERED = 4;

// "reflection" sits after help-others (not between center and work) so plain
// scrolling from the matrix always hits work -> hhi -> help-others first, in
// that order — reflection stays reachable (by clicking its card, or by
// continuing to scroll past help-others) without interrupting that chain.
const STOPS: Stop[] = ["hero", "center", "work", "hhi", "help-others", "reflection", "overview"];

// On the matrix ("center"), all 4 top-level labels are active, so both ends
// of each line stop at EDGE — dot-to-dot, never past either labeled dot. But
// hero and every quadrant only have 2 of the 4 labels active (e.g. "work" is
// Qiyu+Do; Others/Think are hidden there) — the line's end that matches an
// INACTIVE label has nothing anchoring it, so it isn't capped at EDGE at all:
// it runs all the way to the true screen edge, undotted. Only the end
// matching the ACTIVE label stays at EDGE with a dot.
function hLineFor(stop: Stop, W: number, H: number) {
  if (stop === "overview") return { top: H * 0.4, left: W / 2 - SEED / 2, width: SEED };
  if (stop === "center") return { top: H / 2, left: EDGE, width: W - 2 * EDGE };
  const b = stop === "hero" ? { hTop: "bottom" as const, vSide: "right" as const } : BRACKET[stop];
  const top = b.hTop === "top" ? EDGE : H - EDGE;
  const activeVSide = b.vSide === "left" ? "right" : "left"; // Think active if "left", Do if "right"
  const left = activeVSide === "left" ? EDGE : 0;
  const right = activeVSide === "left" ? W : W - EDGE;
  return { top, left, width: right - left };
}

function vLineFor(stop: Stop, W: number, H: number) {
  if (stop === "overview") return { left: W / 2, top: H * 0.4 - SEED / 2, height: SEED };
  if (stop === "center") return { left: W / 2, top: EDGE, height: H - 2 * EDGE };
  const b = stop === "hero" ? { hTop: "bottom" as const, vSide: "right" as const } : BRACKET[stop];
  const left = b.vSide === "left" ? EDGE : W - EDGE;
  const activeHSide = b.hTop === "top" ? "bottom" : "top"; // Qiyu active if "top", Others if "bottom"
  const top = activeHSide === "top" ? EDGE : 0;
  const bottom = activeHSide === "top" ? H : H - EDGE;
  return { left, top, height: bottom - top };
}

// The line's position is a pure, continuous function of scroll progress —
// no CSS transition at all (see its render below) — so it has to blend
// between the two stops `progress` sits between itself: linear interpolation
// over each field of hLineFor/vLineFor's result, keyed by the fractional
// part. At an exact integer, lo === hi and this reduces to the plain
// lineFor(stop) value with zero blend.
function interpolateHLine(progress: number, W: number, H: number) {
  const lo = Math.floor(progress);
  const hi = Math.ceil(progress);
  const t = progress - lo;
  const a = hLineFor(STOPS[lo], W, H);
  const b = hLineFor(STOPS[hi], W, H);
  return {
    top: a.top + (b.top - a.top) * t,
    left: a.left + (b.left - a.left) * t,
    width: a.width + (b.width - a.width) * t,
  };
}

function interpolateVLine(progress: number, W: number, H: number) {
  const lo = Math.floor(progress);
  const hi = Math.ceil(progress);
  const t = progress - lo;
  const a = vLineFor(STOPS[lo], W, H);
  const b = vLineFor(STOPS[hi], W, H);
  return {
    left: a.left + (b.left - a.left) * t,
    top: a.top + (b.top - a.top) * t,
    height: a.height + (b.height - a.height) * t,
  };
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
  const [heroGap, setHeroGap] = useState<GapId | null>(null);
  // Cursor position for the matrix's own 4 quadrant-selector cards' grow
  // effect (see cardGrowScale) — tracked separately from the destination
  // views' own cursor tracking (QuadrantDestinationView), which also drives
  // their cards' crosshair/grow but is scoped to its own component.
  const [matrixCursorPos, setMatrixCursorPos] = useState({ x: 0, y: 0 });
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
  // Continuous position across the whole STOPS sequence (e.g. 2.4 = 40% of
  // the way from "work" to "hhi") — one real viewport height of scroll per
  // stop, same unit the snap-anchor markers below are placed in.
  const scrollProgress = viewportH > 0 ? Math.max(0, Math.min(STOPS.length - 1, scrolledPast / viewportH)) : 0;
  // A click-triggered jump (see `jumpTo` below) needs the LINE to visibly
  // animate itself from wherever it currently is to the target stop — a
  // deliberate, CSS-eased motion — rather than reading as a page scroll,
  // even though real scroll is still what drives everything the rest of the
  // time. `clickTarget` is non-null for exactly that window: while set, it
  // overrides the scroll-derived `progress`/`stopIndex` outright (same
  // integer, so `heldStop` and every choreography value just read the
  // target immediately), while the line itself picks up a real CSS
  // transition for that one jump (see `lineTransition` below). Once the
  // override clears, `jumpTo` has already silently (no native scroll
  // animation) moved real scroll to match, so control hands back to
  // continuous tracking with nothing left to visibly snap.
  const [clickTarget, setClickTarget] = useState<number | null>(null);
  const progress = clickTarget ?? scrollProgress;
  const stopIndex = clickTarget ?? Math.round(scrollProgress);
  const heldStop = STOPS[stopIndex];
  // Once scrolled past the whole sequence's reserved height, this section's
  // otherwise-always-fixed content should get completely out of the way
  // rather than keep floating over whatever comes next on the page.
  const pastEnd = viewportH > 0 && scrolledPast > STOPS.length * viewportH;

  // Bumped every time the matrix is freshly arrived at, so the 4 quadrant
  // cards' random entrance order (below) is re-rolled each visit rather than
  // staying fixed for the component's whole lifetime.
  const [matrixCardSeed, setMatrixCardSeed] = useState(0);
  useEffect(() => {
    if (heldStop === "center") setMatrixCardSeed((s) => s + 1);
  }, [heldStop]);
  const matrixCardDelays = useMemo(
    () => Array.from({ length: 4 }, () => Math.random() * CARD_STAGGER_MAX_MS),
    [matrixCardSeed],
  );
  // Same idea, re-rolled on the same visit, but for the reverse direction —
  // scattering the order the cards disappear in when scrolling away, rather
  // than reusing the entrance order.
  const matrixCardExitDelays = useMemo(
    () => Array.from({ length: 4 }, () => Math.random() * EXIT_STAGGER_MAX_MS),
    [matrixCardSeed],
  );

  // Clicking jumps via a CSS-animated line reversal, not a page scroll: set
  // `clickTarget` so the line (and everything else) reads the destination
  // immediately and animates there over TRANSITION_MS, same choreography a
  // scroll-triggered stop change gets. Once that's had time to fully settle
  // (FULL_SETTLE_MS — the line plus label plus last-staggered card), silently
  // snap real scroll to match (`behavior: "auto"`, no native scroll
  // animation — it's already visually "arrived") and clear the override, so
  // continuous scroll-tracking resumes exactly where this left off with
  // nothing left to visibly snap.
  const jumpTo = (stop: Stop, tab?: "others" | "self") => {
    if (tab) setWorkTab(tab);
    const idx = STOPS.indexOf(stop);
    // A second click before the first has settled replaces the pending
    // settle entirely (not stacks with it) — otherwise the FIRST click's
    // timer would still fire later and silently scroll back to its own
    // (now stale) target after the second click's target had already taken
    // over, undoing it.
    if (clickSettleTimerRef.current) window.clearTimeout(clickSettleTimerRef.current);
    setClickTarget(idx);
    clickSettleTimerRef.current = window.setTimeout(() => {
      const vh = window.innerHeight;
      const docTop = outerRef.current ? window.scrollY + outerRef.current.getBoundingClientRect().top : 0;
      window.scrollTo({ top: docTop + idx * vh, behavior: "auto" });
      // Set scrolledPast directly, in the same batch as clearing the
      // override, instead of waiting for the 'scroll' listener's own event
      // (dispatched asynchronously) to catch up — otherwise there's a
      // narrow window where clickTarget is already null but scrolledPast
      // still holds its pre-jump value, which would render the line at its
      // OLD scroll-derived position for a stray frame (lineTransition is
      // already "none" again by then, so that stray frame has nothing
      // smoothing it — an instant, visible flicker back and then forward).
      setScrolledPast(idx * vh);
      setClickTarget(null);
      clickSettleTimerRef.current = null;
    }, FULL_SETTLE_MS);
  };

  // Interpolated straight off `progress` so the line visibly tracks scroll
  // distance in real time while scrolling (see lineTransition below for why
  // it gets no CSS transition then) — while click-jumping, `progress` is
  // already the exact target integer, so this just reduces to that stop's
  // plain resting position, with lineTransition providing the motion.
  const hLine = interpolateHLine(progress, W, H);
  const vLine = interpolateVLine(progress, W, H);
  // No transition on position/length while scroll is driving the line (it
  // already gets a new value every scroll frame, continuously) — but a
  // click-jump needs the line to visibly animate itself from wherever it is
  // to the target, since `progress` just snaps straight to that integer
  // with no intermediate frames of its own the way scrolling provides.
  // Thickness (height on the h-line, width on the v-line — NOT the same
  // property that carries each line's LENGTH, which must stay untransitioned
  // while scrolling) gets its own quick transition independent of the rest —
  // it's what lets Overview's cross visibly "grow" on hover even while
  // otherwise untransitioned. During a click-jump it's folded into the `all`
  // transition instead, so a hover-thickened cross naturally eases back to
  // normal thickness over the same TRANSITION_MS the lines take to expand
  // outward to the matrix. Each line's own property names differ (hLine's
  // length is `width`, its thickness is `height`; vLine is the reverse), so
  // each needs its own transition string — a shared one would also give the
  // LENGTH property a transition, making it lag behind scroll.
  const hLineTransition = clickTarget !== null ? `all ${TRANSITION_MS}ms ease-out` : `height ${CROSS_HOVER_MS}ms ease-out`;
  const vLineTransition = clickTarget !== null ? `all ${TRANSITION_MS}ms ease-out` : `width ${CROSS_HOVER_MS}ms ease-out`;
  const lineThickness = heldStop === "overview" && overviewCrossHovered ? LINE_THICKNESS_HOVERED : LINE_THICKNESS;
  // Overview's 4 end-dots ride the same two speeds as the lines: quick
  // (CROSS_HOVER_MS) position easing while just hovering in place (thickness
  // nudges them slightly), full TRANSITION_MS during an actual click-jump so
  // they travel outward in step with the lines' own expansion.
  const dotMoveMs = clickTarget !== null ? TRANSITION_MS : CROSS_HOVER_MS;
  const dotTransition = `opacity ${TRANSITION_MS}ms ease-out, left ${dotMoveMs}ms ease-out, top ${dotMoveMs}ms ease-out`;

  const heroOpacity = heldStop === "hero" ? 1 : 0;
  const matrixOpacity = heldStop === "center" ? 1 : 0;
  const isDestinationStop =
    heldStop === "reflection" || heldStop === "work" || heldStop === "hhi" || heldStop === "help-others";
  const contentOpacity = isDestinationStop || heldStop === "overview" ? 1 : 0;

  const activeCards: DestinationCard[] =
    heldStop === "work"
      ? workTab === "others"
        ? workArticles.map((a) => ({ title: a.title, subtitle: a.company, x: a.x, y: 1 - a.y, thumbnail: a.thumbnail, slug: a.slug, yAxisLabel: a.pillarTheme, xAxisLabel: a.workType?.toUpperCase() }))
        : SELF_UNDERSTANDING_CARDS
      : heldStop === "hhi"
      ? getHhiCards(navigate)
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

  const qiyuOpacity = activeQuadrant ? (activeHSide === "top" ? contentOpacity : 0) : heroOpacity + matrixOpacity;
  const othersOpacity = activeQuadrant ? (activeHSide === "bottom" ? contentOpacity : 0) : matrixOpacity;
  const thinkOpacity = activeQuadrant ? (activeVSide === "left" ? contentOpacity : 0) : heroOpacity + matrixOpacity;
  const doOpacity = activeQuadrant ? (activeVSide === "right" ? contentOpacity : 0) : matrixOpacity;

  // A destination's content region is bounded by the two bracket lines on
  // the bracket's own sides, and the true screen edges on the other two
  // (same "active side" logic the top-level label opacities above use) —
  // inset by QUADRANT_BG_GAP on all 4 sides for the floating-card look.
  const quadrantBgRect = activeQuadrant
    ? (() => {
        const top = (activeHSide === "top" ? 0 : hLine.top) + QUADRANT_BG_GAP;
        const bottom = (activeHSide === "top" ? hLine.top : H) - QUADRANT_BG_GAP;
        const left = (activeVSide === "left" ? 0 : vLine.left) + QUADRANT_BG_GAP;
        const right = (activeVSide === "left" ? vLine.left : W) - QUADRANT_BG_GAP;
        return { top, left, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
      })()
    : null;

  // Top-level labels (Qiyu/Others/Think/Do) sit right at the line itself —
  // same corner as the dot, on the matrix/hero and in a destination alike —
  // rather than centered on their edge. QuadrantDestinationView's per-
  // quadrant sub-labels are the ones that move out of the way, sliding
  // *along* the line away from this same corner, so the two tiers don't
  // compete for the same spot.
  const topLabelVX = vLine.left;
  const topLabelHY = hLine.top;

  // No transition on the line itself — it's a pure, continuous function of
  // scroll (see interpolateHLine/VLine above), already getting a new value
  // every scroll frame, so there's nothing to animate between renders.
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

  // Direction for the matrix's own sub-labels/cards: true while matrixOpacity
  // is rising (arriving at "center"), false while it's falling (leaving it
  // for anywhere else) — drives the same asymmetric fast-exit treatment as
  // useLabelTransition above, just for a plain number instead of a transition
  // string, since the 4 cards each need their own per-item exit stagger too.
  const matrixEntering = useEntering(matrixOpacity);

  // The diagram only ever visibly morphs (grows/shrinks between its hero size
  // and the Reflection Notes card size) when BOTH ends of a transition are
  // hero or center — any step that starts or ends on a destination stop
  // should just have the diagram snap straight to wherever it belongs and
  // fade, not visibly grow back to hero size while the line is mid-move to
  // an unrelated stop (e.g. leaving center for "work").
  const prevHeldStop = usePrevious(heldStop);
  const diagramMorphing =
    (heldStop === "hero" || heldStop === "center") && (prevHeldStop === "hero" || prevHeldStop === "center");
  const diagramEntering = useEntering(heroOpacity + matrixOpacity);

  // Freezes the diagram's position/size at whatever it last was while ON
  // "hero" or "center" (its only two home states), read instead of the raw
  // matrixOpacity ternary whenever NOT morphing (diagramMorphing false).
  // Without this, leaving "center" for a destination would still recompute
  // left/top/width from matrixOpacity (now 0, same as hero's target) even
  // though the diagram isn't actually morphing — jumping it straight to its
  // large hero size/position while the opacity fade was still mid-flight,
  // which is exactly what read as a brief flash of the big landing-page
  // diagram on every matrix -> destination transition.
  const diagramLayoutRef = useRef({ left: 0, top: 0, width: 420 });
  if (heldStop === "hero" || heldStop === "center") {
    diagramLayoutRef.current = {
      left: matrixOpacity ? W * 0.28 : W / 2,
      top: matrixOpacity ? H * 0.2 : H * 0.42,
      width: matrixOpacity ? 112 : 420,
    };
  }
  const diagramLayout = diagramLayoutRef.current;

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: `${STOPS.length * 100}vh` }}>
      {/* Scroll-snap anchors — one per stop, at its exact checkpoint (an exact
          multiple of one viewport height into this component). Together with
          the global `scroll-snap-type: y mandatory` (styles.css), this is what
          makes scrolling settle at a discrete stop once you stop, purely via
          native browser scroll-snap — no JS debounce/lock of any kind needed. */}
      {STOPS.map((_, i) => (
        <div key={i} className="absolute left-0 w-px h-px snap-start [scroll-snap-stop:always] pointer-events-none" style={{ top: `${i * 100}vh` }} />
      ))}
      <section
        aria-label="Quadrant Section"
        data-held-stop={heldStop}
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          // The landing page's own background matches the Reflection Notes
          // thumbnail color (same QUADRANT_COLOR.reflection the matrix card
          // and the diagram's own background square use) — everywhere else
          // in the sequence stays plain white.
          backgroundColor: heldStop === "hero" ? QUADRANT_COLOR.reflection : "#ffffff",
          transition: `background-color ${TRANSITION_MS}ms ease-out, opacity 200ms`,
          opacity: pastEnd ? 0 : 1,
          pointerEvents: pastEnd ? "none" : undefined,
        }}
      >
        {/* Hero paragraph + "hello stranger" image — fades out once the matrix
            is active. The diagram itself is NOT in here — it's a separate,
            always-present element below that morphs into the Reflection
            Notes card instead of fading out (see below). */}
        <div
          className="absolute inset-0 transition-opacity"
          style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: heroOpacity, pointerEvents: heroOpacity > 0.5 ? "auto" : "none" }}
        >
          <div className="absolute max-w-sm" style={{ left: EDGE, top: EDGE }}>
            <p className="text-base md:text-lg text-neutral-900 leading-snug font-medium">
              Qiyu is exploring the future of human-AI interaction to understand{" "}
              <span className="relative">
                Self
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
              </span>
              {" "}
              <span className="relative">
                Others
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
              </span>
              {" "}through{" "}
              <span className="relative">
                Products
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
              </span>
              {" "}and{" "}
              <span className="relative">
                Prototypes
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1" style={{ display: "inline-block", verticalAlign: "middle" }} />
              </span>
            </p>
          </div>
          <img
            src="/articles/hello-stranger.png"
            alt="Hello, stranger!!"
            className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[180px] h-auto"
            style={{ mixBlendMode: "multiply", opacity: 0.5 }}
          />
        </div>

        {/* The diagram — zooms from its large hero position/size down to the
            Reflection Notes card's thumbnail slot in the matrix (28%, 20%)
            when the matrix activates, literally becoming that card rather
            than fading out separately from a generic placeholder fading in.
            Visible on hero and center, same window as Qiyu/Think, then fades
            with the rest once another stop is active. */}
        <button
          onClick={() => jumpTo("reflection")}
          className="absolute flex flex-col items-center gap-3 bg-transparent border-0 cursor-pointer -translate-x-1/2 -translate-y-1/2"
          style={{
            transition: diagramMorphing
              ? `left ${TRANSITION_MS}ms ease-out, top ${TRANSITION_MS}ms ease-out, opacity ${TRANSITION_MS}ms ease-out`
              : `opacity ${diagramEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms ease-out`,
            left: diagramLayout.left,
            top: diagramLayout.top,
            opacity: heroOpacity + matrixOpacity,
            pointerEvents: matrixOpacity >= 0.5 ? "auto" : "none",
          }}
        >
          {/* On the matrix, this becomes a true 112x112 square (matching the
              other 4 cards) with inner padding around the diagram, so the
              diagram sits contained inside it — not a bare `width`-only box,
              which let the diagram's own natural (wide, short) aspect ratio
              determine the wrapper's actual height, far shorter than the
              112px background square absolutely centered inside it; the
              square then overflowed past the wrapper's real height into the
              "Reflection Notes" label below instead of leaving a clean gap.
              On hero, no height/padding is forced — the diagram keeps its
              natural wide proportions, exactly as before. */}
          <div
            className="relative flex items-center justify-center rounded-3xl"
            style={{
              transition: diagramMorphing ? `width ${TRANSITION_MS}ms ease-out, height ${TRANSITION_MS}ms ease-out, padding ${TRANSITION_MS}ms ease-out` : "none",
              width: diagramLayout.width,
              height: heldStop === "center" ? diagramLayout.width : undefined,
              padding: heldStop === "center" ? 14 : 0,
            }}
          >
            {/* Background square matching the other 4 matrix cards' colored
                placeholders — only visible on the matrix (opacity:
                matrixOpacity), not on hero, where the diagram sits bare over
                the landing page. */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl transition-opacity pointer-events-none"
              style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: matrixOpacity, width: 112, height: 112, backgroundColor: QUADRANT_COLOR.reflection }}
            />
            <HandDrawnDiagram onHover={setHeroGap} />
          </div>
          {/* Tag (hero) and card label (matrix) stacked on the same spot, crossfading — not laid out as separate flex rows, so neither affects the other's position as it fades. */}
          <div className="relative w-full h-5">
            <p className="tag-style text-sm absolute inset-x-0 text-center whitespace-nowrap transition-opacity" style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: heroOpacity }}>
              {heroGap ? HERO_CONTENT[heroGap].tag : "in human-human interaction, 1 != 2 != 3 != 4 != 1"}
            </p>
            <span className="text-sm text-neutral-700 absolute inset-x-0 text-center whitespace-nowrap transition-opacity" style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: matrixOpacity }}>
              Reflection Notes
            </span>
          </div>
        </button>

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
            delay within CARD_STAGGER_MAX_MS of CARDS_BASE_DELAY_MS (after the
            top-level labels above finish), so they visibly arrive in
            scattered order rather than all at once. Exit (matrixEntering
            false — scrolling away from "center"): no delay and a much
            shorter duration, so everything here starts disappearing the
            instant the line starts moving instead of still sitting fully
            visible throughout its move — the cards use their own separate
            exit stagger (matrixCardExitDelays) so they vanish in a different
            scattered order than they arrived in. */}
        <div
          className="absolute inset-0"
          style={{ pointerEvents: matrixOpacity >= 0.5 ? "auto" : "none" }}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) setMatrixCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
        >
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(-108%, -140%)" }}>Understand myself</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(12%, -140%)" }}>Help myself grow</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(-104%, 40%)" }}>Understand Others</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(12%, 40%)" }}>Help Others grow</div>

          {/* "Reflection Notes" is not in this list — the morphing diagram
              element above already becomes that card once the matrix is
              active, positioned at the same (28%, 20%) slot, so rendering it
              again here would duplicate it. Each card grows slightly as the
              cursor nears it (same cursor-proximity scale technique as the
              original work matrix and the destination cards below — see
              CARD_GROW_MAX_DISTANCE/CARD_GROW_MAX_SCALE). */}
          {[
            { title: "work", x: 0.57, y: 0.17, onClick: () => jumpTo("work", "others"), color: QUADRANT_COLOR.work },
            { title: "tech for self-understanding", x: 0.77, y: 0.23, onClick: () => jumpTo("work", "self"), color: TECH_SELF_COLOR },
            { title: "HHI experiments", x: 0.28, y: 0.68, onClick: () => jumpTo("hhi"), color: QUADRANT_COLOR.hhi },
            { title: "help others grow", x: 0.68, y: 0.65, onClick: () => jumpTo("help-others"), color: QUADRANT_COLOR["help-others"] },
          ].map((c, i) => {
            const scale = cardGrowScale(matrixCursorPos, c.x * W, c.y * H);
            return (
              <button
                key={c.title}
                onClick={c.onClick}
                className="absolute flex flex-col items-center gap-3 bg-transparent border-0 cursor-pointer"
                style={{
                  left: `${c.x * 100}%`,
                  top: `${c.y * 100}%`,
                  opacity: matrixOpacity,
                  transform: `translateX(-50%) scale(${scale})`,
                  transition: `opacity ${matrixEntering ? CARD_DURATION_MS : EXIT_DURATION_MS}ms ${
                    matrixEntering ? `${CARDS_BASE_DELAY_MS + matrixCardDelays[i]}ms` : `${matrixCardExitDelays[i]}ms`
                  }, transform ${CARD_GROW_DURATION_MS}ms ease-out`,
                }}
              >
                <span className="w-28 h-28 rounded-3xl transition-[filter] hover:brightness-95" style={{ backgroundColor: c.color }} />
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
            {/* Quadrant identity color — a translucent wash (not a solid
                fill) so it reads as "this quadrant has a color" without
                fighting the thumbnails/icons drawn on top of it, inset from
                both the bracket lines and the screen edges so it reads as a
                floating card rather than a flush background. */}
            {quadrantBgRect && activeQuadrant && (
              <div
                className="absolute rounded-3xl pointer-events-none"
                style={{ ...quadrantBgRect, backgroundColor: QUADRANT_COLOR[activeQuadrant], opacity: 0.35 }}
              />
            )}
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
              onBackgroundClick={() => jumpTo("center")}
              contentRect={quadrantBgRect}
            />
          </div>
        )}

        {/* Overview — the final stop, small centered cross. The LinkedIn
            badge sits right where the old "thank you" text used to, taking
            over the spot instead of the NavbarWrapper's usual fixed-to-
            viewport position (that badge hides itself on "overview" — see
            NavbarWrapper) — so scrolling here reads as the badge having
            risen up to meet the cross, not two different badges swapping. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-12 transition-opacity"
          style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: heldStop === "overview" ? contentOpacity : 0, pointerEvents: heldStop === "overview" ? "auto" : "none" }}
        >
          <LinkedInBadge text={OVERVIEW_TEXT} />
        </div>

        {/* Invisible hit-area over Overview's small cross — doubles it as a
            "go back to the full matrix" control, generously sized (80x80)
            well beyond the cross's own ~36px reach so it's an easy target.
            Hovering thickens the lines (lineThickness); clicking reuses the
            same click-jump path every other navigation in this component
            goes through, so the lines visibly expand back out to the matrix
            rather than the page scrolling there. */}
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
            scroll continuously (interpolateHLine/VLine) with no CSS
            transition while scrolling; thickness transitions quickly on its
            own (hover feedback on Overview's cross); a click-jump instead
            CSS-animates everything together (hLineTransition/vLineTransition). */}
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ top: hLine.top, left: hLine.left, width: hLine.width, height: lineThickness, transition: hLineTransition }}
        />
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ left: vLine.left, top: vLine.top, width: lineThickness, height: vLine.height, transition: vLineTransition }}
        />

        {/* Overview's 4 end-dots — same Dot component as the top-level
            labels, just positioned at the cross's 4 tips instead of riding
            along as a flex child. */}
        {[
          { left: hLine.left, top: hLine.top + lineThickness / 2 },
          { left: hLine.left + hLine.width, top: hLine.top + lineThickness / 2 },
          { left: vLine.left + lineThickness / 2, top: vLine.top },
          { left: vLine.left + lineThickness / 2, top: vLine.top + vLine.height },
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
    </div>
  );
}
