import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { MatrixArticle } from "@/routes/index";
import { HandDrawnDiagram, HERO_CONTENT, type GapId } from "@/routes/index";
import { QuadrantDestinationView } from "@/components/QuadrantDestinationView";
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
  SELF_UNDERSTANDING_CARDS,
  getHhiCards,
  HELP_OTHERS_CARDS,
  getReflectionCards,
  type QuadrantId,
  type DestinationCard,
} from "@/data/quadrantCards";

// Single unified, PAGINATED sequence covering the whole front-door experience:
// hero (zoomed-in diagram) -> center (full matrix) -> work -> hhi ->
// help-others -> reflection -> overview. There is exactly ONE stop active at
// a time, reached either by clicking a card on the matrix or by scrolling —
// both just move the same `stopIndex`, so there's one mechanism, not two.
//
// Scrolling is intentionally NOT continuous/proportional here: any wheel
// input, however small or large, advances or retreats exactly ONE stop, with
// a full animated transition every time — the movement itself is the signal
// to transition, not a distance to track. This is why there's no scroll-
// position math in this file at all; `stopIndex` is the only source of truth,
// and every visual consequence of it (line position, opacity, diagram size)
// is a plain CSS transition off that discrete value.
type Stop = "hero" | "center" | QuadrantId | "overview";

const SEED = 36; // small resting cross size at the Overview stop
const TRANSITION_MS = 700;
// Trackpads keep firing 'wheel' events for a while AFTER the physical gesture
// ends (inertial/momentum scrolling) — those trailing events still have a
// non-zero deltaY, so without this, the momentum tail alone can trigger
// several *additional* automatic advances once the TRANSITION_MS lock clears,
// cascading through multiple stops from a single flick. A gap of this many ms
// with no wheel event is treated as "a new physical gesture started"; any
// event arriving sooner is assumed to be the previous gesture's momentum tail
// and is ignored for pagination purposes (though still prevented, so it can't
// leak into real page scroll either).
const GESTURE_GAP_MS = 220;

// "reflection" sits after help-others (not between center and work) so plain
// scrolling from the matrix always hits work -> hhi -> help-others first, in
// that order — reflection stays reachable (by clicking its card, or by
// continuing to scroll past help-others) without interrupting that chain.
const STOPS: Stop[] = ["hero", "center", "work", "hhi", "help-others", "reflection", "overview"];

// Real scroll distance reserved for this whole section: its own 1 viewport-
// height, plus 1 more as a release buffer at the end (pagination itself
// barely consumes real scroll since wheel input is intercepted — this buffer
// just has to be enough for the boundary hand-off scroll, not the whole
// sequence like the old continuous-scroll version needed).
const TOTAL_VH = 2;

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

// A top-level label needs an asymmetric transition: delayed when it's
// APPEARING (wait for the line to settle, per LABEL_DELAY_MS), but immediate
// when it's DISAPPEARING (the old section's label shouldn't still be sitting
// there while the line is already moving away toward the next stop).
function useLabelTransition(opacity: number) {
  const entering = useEntering(opacity);
  const base = `left ${TRANSITION_MS}ms ease-out, top ${TRANSITION_MS}ms ease-out, opacity ${LABEL_DURATION_MS}ms ease-out`;
  return entering ? `${base} ${LABEL_DELAY_MS}ms` : base;
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
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [workTab, setWorkTab] = useState<"others" | "self">("others");
  const [heroGap, setHeroGap] = useState<GapId | null>(null);

  // The single source of truth: which stop we're at. Everything else below
  // (lines, opacities, diagram size/position) is derived from this plus
  // measured container size, and animates via CSS transitions whenever it
  // changes — there's no separate "in-between" state to get stuck in.
  const [stopIndex, setStopIndex] = useState(0);
  // Mirrors `stopIndex`/`pinned` for the wheel listener below, which is
  // attached ONCE (not re-subscribed on every stop/pin change) so it can
  // never be caught mid-reattachment and silently stop receiving events —
  // that gap was the actual cause of "scroll down works, scroll back up
  // sometimes doesn't": releasing the pin past "overview" detaches the old
  // effect-based listener, and re-attaching it depends on a React re-render
  // landing before the next wheel event — not guaranteed, so a scroll-up
  // gesture right at that boundary could arrive with nothing listening.
  // Refs read here are always current, independent of render timing.
  const stopIndexRef = useRef(0);
  const pinnedRef = useRef(true);
  // True for a short window after any jump (click or wheel-triggered), so
  // further wheel input is ignored until the current transition finishes —
  // this is what makes "however big the scroll gesture is" still only ever
  // advance one stop, instead of several stops firing in a burst. A ref
  // (not state) because it's only ever read inside the wheel handler, which
  // needs the synchronous, always-current value a ref gives — a trackpad
  // fires many 'wheel' events per gesture, faster than a re-render could
  // hand it an updated value, and several of those events would otherwise
  // slip through before the lock visually took effect (the original cause of
  // stops like "center"/"hhi" getting skipped).
  const isJumpingRef = useRef(false);
  // Timestamp of the last wheel event counted toward gesture-gap detection —
  // deliberately NOT updated by events that arrive while isJumpingRef is true
  // (see the wheel handler below for why that distinction is load-bearing).
  const lastWheelAtRef = useRef(-Infinity);

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
  const heldStop = STOPS[stopIndex];

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

  // Manual pin/release based on real scroll distance (not the paginated
  // stopIndex) — wheel input is intercepted below while inside the sequence,
  // so real scroll barely moves until a boundary hand-off releases it, at
  // which point this naturally un-pins and the section scrolls away like any
  // other element. Same manual-fixed/absolute technique as before; native
  // `position: sticky` wasn't reliably holding the section on screen.
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;
  const stickRange = Math.max(0, (TOTAL_VH - 1) * viewportH);
  const pinned = scrolledPast >= 0 && scrolledPast <= stickRange;
  const parkedTop = Math.min(Math.max(scrolledPast, 0), stickRange);

  // Keep the refs current every render — cheap plain assignments, not state,
  // so they don't themselves trigger a re-render; the wheel handler below
  // reads these instead of closing over `stopIndex`/`pinned` directly, so it
  // stays correct even though it's attached only once (see below).
  stopIndexRef.current = stopIndex;
  pinnedRef.current = pinned;

  const goTo = (index: number, tab?: "others" | "self") => {
    if (isJumpingRef.current) return; // swallow input mid-transition — one stop per gesture
    if (tab) setWorkTab(tab);
    const clamped = Math.max(0, Math.min(STOPS.length - 1, index));
    if (clamped === stopIndexRef.current) return;
    isJumpingRef.current = true;
    stopIndexRef.current = clamped;
    setStopIndex(clamped);
    // Locked for the FULL entrance (line + label + last-staggered card), not
    // just the line's own TRANSITION_MS — otherwise the next scroll gesture
    // could advance past this stop while its cards were still popping in,
    // which reads as the stop having been skipped even though the index
    // itself only ever moved by one.
    window.setTimeout(() => {
      isJumpingRef.current = false;
    }, FULL_SETTLE_MS);
  };
  const jumpTo = (stop: Stop, tab?: "others" | "self") => goTo(STOPS.indexOf(stop), tab);

  // Wheel capture: attached ONCE (mount only) rather than re-subscribed on
  // every stop/pin change — a prior version re-subscribed per change and
  // could end up briefly unlistened right at the "scroll past overview,
  // release, scroll back up" boundary, which was the actual cause of scroll-
  // up sometimes doing nothing. A single long-lived listener, reading
  // `pinnedRef`/`stopIndexRef` instead of closed-over state, can't get stuck
  // that way. While pinned, any wheel input advances or retreats exactly one
  // stop (magnitude ignored — the gesture itself is the signal). At either
  // end of the sequence, input going PAST the end is left alone (not
  // preventDefault'd) so native scroll releases the pin, handing off to
  // whatever's above/below; once not pinned, every event is left alone.
  //
  // Every in-bounds event while pinned gets preventDefault'd (so a momentum
  // tail can never leak into real scroll and prematurely release the pin).
  // Whether it also triggers `goTo` depends on gesture-gap detection: `goTo`
  // only fires once GESTURE_GAP_MS has passed with no *counted* wheel event —
  // "counted" meaning `isJumpingRef` was false when it arrived. That exclusion
  // is the key fix for two opposite failure modes seen in earlier versions:
  // - Counting events while `isJumpingRef` is true (mid-transition) let a
  //   trackpad's dense momentum stream keep re-arming the gap throughout the
  //   whole 700ms lock, so by the time it cleared the gap had never once
  //   opened — scroll read as permanently stuck until something else (a
  //   click) nudged state directly.
  // - Using a FIXED cooldown timed from when the transition ended (instead of
  //   this sliding, event-driven one) fixed that, but then any leftover
  //   momentum event landing right as that fixed window expired triggered an
  //   extra automatic advance with no new input from the user — i.e. stops
  //   getting silently skipped.
  // Only counting *post-lock* events keeps the window sliding (so it reliably
  // opens once the physical gesture — including its momentum tail — has
  // actually gone quiet) without that quiet period ever starting early.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!pinnedRef.current) return; // not currently pinned — let native scroll do its thing
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir === 0) return;
      const next = stopIndexRef.current + dir;
      if (next < 0 || next > STOPS.length - 1) return; // let native scroll release the pin
      e.preventDefault();
      if (isJumpingRef.current) return; // mid-transition — ignored, and NOT counted toward the gesture gap
      const now = performance.now();
      const isNewGesture = now - lastWheelAtRef.current > GESTURE_GAP_MS;
      lastWheelAtRef.current = now;
      if (!isNewGesture) return; // still the same gesture (or its momentum tail) — ignore
      goTo(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hLine = hLineFor(heldStop, W, H);
  const vLine = vLineFor(heldStop, W, H);

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

  // Top-level labels (Qiyu/Others/Think/Do) sit right at the line itself —
  // same corner as the dot, on the matrix/hero and in a destination alike —
  // rather than centered on their edge. QuadrantDestinationView's per-
  // quadrant sub-labels are the ones that move out of the way, sliding
  // *along* the line away from this same corner, so the two tiers don't
  // compete for the same spot.
  const topLabelVX = vLine.left;
  const topLabelHY = hLine.top;

  const lineTransition = `all ${TRANSITION_MS}ms ease-out`;
  // Top-level labels: position tracks the line immediately, with no delay
  // (same TRANSITION_MS as the line itself — this is what makes an
  // already-visible label like Qiyu/Think "ride along" smoothly rather than
  // teleport). Opacity alone gets the LABEL_DELAY_MS/LABEL_DURATION_MS pair,
  // so a newly-appearing label doesn't start fading in until its position
  // has already finished settling — it just appears where it belongs,
  // instead of visibly sliding into place while also fading in. Each label
  // gets its OWN transition (not a shared one) because useLabelTransition
  // needs to track each one's direction (appearing vs disappearing)
  // independently — see useLabelTransition above for why that matters.
  const qiyuTransition = useLabelTransition(qiyuOpacity);
  const othersTransition = useLabelTransition(othersOpacity);
  const thinkTransition = useLabelTransition(thinkOpacity);
  const doTransition = useLabelTransition(doOpacity);

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

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: `${TOTAL_VH * 100}vh` }}>
      <section
        aria-label="Quadrant Section"
        ref={containerRef}
        className="w-full h-screen bg-white overflow-hidden"
        style={{ position: pinned ? "fixed" : "absolute", top: pinned ? 0 : parkedTop, left: 0 }}
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
            left: matrixOpacity ? W * 0.28 : W / 2,
            top: matrixOpacity ? H * 0.2 : H * 0.42,
            opacity: heroOpacity + matrixOpacity,
            pointerEvents: matrixOpacity >= 0.5 ? "auto" : "none",
          }}
        >
          <div style={{ transition: diagramMorphing ? `width ${TRANSITION_MS}ms ease-out` : "none", width: matrixOpacity ? 112 : 420 }}>
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
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        </div>
        <div className="absolute flex flex-col items-center gap-1.5" style={{ transition: othersTransition, left: topLabelVX, top: H - EDGE, transform: "translateX(-50%)", opacity: othersOpacity, pointerEvents: "none" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Others</span>
        </div>
        <div className="absolute flex items-center gap-2" style={{ transition: thinkTransition, left: EDGE, top: topLabelHY, transform: "translate(-100%, -50%)", opacity: thinkOpacity, pointerEvents: "none" }}>
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-700" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Think</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        </div>
        <div className="absolute flex items-center gap-2" style={{ transition: doTransition, left: W - EDGE, top: topLabelHY, transform: "translateY(-50%)", opacity: doOpacity, pointerEvents: "none" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
        >
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(-108%, -140%)" }}>Understand myself</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(12%, -140%)" }}>Help myself grow</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(-104%, 40%)" }}>Understand Others</div>
          <div className="absolute text-xs text-neutral-400 transition-opacity" style={{ transitionDuration: `${matrixEntering ? TRANSITION_MS : EXIT_DURATION_MS}ms`, opacity: matrixOpacity, left: "50%", top: "50%", transform: "translate(12%, 40%)" }}>Help Others grow</div>

          {/* "Reflection Notes" is not in this list — the morphing diagram
              element above already becomes that card once the matrix is
              active, positioned at the same (28%, 20%) slot, so rendering it
              again here would duplicate it. */}
          {[
            { title: "work", left: "57%", top: "17%", onClick: () => jumpTo("work", "others") },
            { title: "tech for self-understanding", left: "77%", top: "23%", onClick: () => jumpTo("work", "self") },
            { title: "HHI experiments", left: "28%", top: "68%", onClick: () => jumpTo("hhi") },
            { title: "help others grow", left: "68%", top: "65%", onClick: () => jumpTo("help-others") },
          ].map((c, i) => (
            <button
              key={c.title}
              onClick={c.onClick}
              className="absolute flex flex-col items-center gap-3 bg-transparent border-0 cursor-pointer -translate-x-1/2 transition-opacity"
              style={{
                left: c.left,
                top: c.top,
                opacity: matrixOpacity,
                transitionDuration: `${matrixEntering ? CARD_DURATION_MS : EXIT_DURATION_MS}ms`,
                transitionDelay: matrixEntering
                  ? `${CARDS_BASE_DELAY_MS + matrixCardDelays[i]}ms`
                  : `${matrixCardExitDelays[i]}ms`,
              }}
            >
              <span className="w-28 h-28 rounded-3xl bg-neutral-200 transition-colors hover:bg-neutral-300" />
              <span className="text-sm text-neutral-700 whitespace-nowrap">{c.title}</span>
            </button>
          ))}
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
            />
          </div>
        )}

        {/* Overview "thank you" content — the final stop, small centered cross. */}
        <p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-12 text-center text-sm md:text-base text-neutral-500 whitespace-nowrap transition-opacity"
          style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: heldStop === "overview" ? contentOpacity : 0, pointerEvents: heldStop === "overview" ? "auto" : "none" }}
        >
          Thank you for viewing my site. But{" "}
          <a
            href="https://www.linkedin.com/in/qiyu-hu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-neutral-300 px-3 py-1 align-middle text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Human-Human interaction
          </a>{" "}
          is more interesting.
        </p>

        {/* The two lines — always rendered, CSS-animate to the new stop's
            position every time `stopIndex` changes, whether that came from a
            click or from wheel-driven pagination. */}
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ top: hLine.top, left: hLine.left, width: hLine.width, height: 1.5, transition: lineTransition }}
        />
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20"
          style={{ left: vLine.left, top: vLine.top, width: 1.5, height: vLine.height, transition: lineTransition }}
        />
      </section>
    </div>
  );
}
