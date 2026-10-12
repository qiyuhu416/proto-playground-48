import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useScroll, useMotionValueEvent } from "motion/react";
import { QuadrantDestinationView } from "@/components/QuadrantDestinationView";
import {
  BRACKET,
  SELF_UNDERSTANDING_CARDS,
  getHhiCards,
  HELP_OTHERS_CARDS,
  type QuadrantId,
  type DestinationCard,
} from "@/data/quadrantCards";
import type { MatrixArticle } from "@/routes/index";

type Stop = "center" | QuadrantId | "overview";

const EDGE = 40;
const SEED = 36; // small resting cross size at the final Overview stop

// Checkpoints, expressed as multiples of one viewport height (VH), each pairing
// a "climb" (lines travel between two stops) with a "held" dwell at the arrival
// stop — same proportions already proven on the original work-matrix scroll
// sequence (dwell/climbDistance ratios), just repeated across 4 stops instead of 1.
const CHECKPOINTS = [0, 0.7, 1.7, 2.35, 3.35, 4.0, 5.0, 5.5, 6.3] as const;
const STOPS: Stop[] = ["center", "work", "hhi", "help-others", "overview"];
// CHECKPOINTS[2*i] -> CHECKPOINTS[2*i+1] is the climb from STOPS[i] to STOPS[i+1];
// CHECKPOINTS[2*i+1] -> CHECKPOINTS[2*i+2] is the held dwell at STOPS[i+1].

// The section needs its own 1vh of height PLUS the full pinned scroll distance
// (every checkpoint plus a small fade-out buffer) — the pin/release logic below
// only has (TOTAL_VH - 1)vh of scroll to work with, so leaving out that extra
// 1vh causes the section to release and start sliding away before the last
// checkpoint is reached.
const TOTAL_VH = CHECKPOINTS[CHECKPOINTS.length - 1] + 1.3;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hLineFor(stop: Stop, W: number, H: number) {
  if (stop === "center") return { top: H / 2, left: 0, width: W };
  if (stop === "overview") return { top: H * 0.4, left: W / 2 - SEED / 2, width: SEED };
  const b = BRACKET[stop];
  return { top: b.hTop === "top" ? EDGE : H - EDGE, left: 0, width: W };
}

function vLineFor(stop: Stop, W: number, H: number) {
  if (stop === "center") return { left: W / 2, top: 0, height: H };
  if (stop === "overview") return { left: W / 2, top: H * 0.4 - SEED / 2, height: SEED };
  const b = BRACKET[stop];
  return { left: b.vSide === "left" ? EDGE : W - EDGE, top: 0, height: H };
}

export function QuadrantScrollSequence({
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

  const [hLine, setHLine] = useState({ top: 0, left: 0, width: 0 });
  const [vLine, setVLine] = useState({ left: 0, top: 0, height: 0 });
  const [heldStop, setHeldStop] = useState<Stop | null>(null); // non-null only while dwelling at a stop
  const [contentOpacity, setContentOpacity] = useState(0);
  // Signed px distance into this section — negative while it hasn't been
  // scrolled to yet, 0 right when it's reached. Kept signed (not clamped to 0)
  // so the pin logic below can tell "not reached yet" apart from "just
  // arrived"; both would otherwise read as 0 and the section would render
  // `position: fixed` (pinned on screen, full-bleed, on top of QuadrantNav)
  // before you've scrolled anywhere near it. Drives the manual pin/release
  // below instead of relying on native `position: sticky` (which wasn't
  // reliably holding the section).
  const [scrolledPast, setScrolledPast] = useState(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const rawScrolledPast = -rect.top;
    setScrolledPast(rawScrolledPast);
    const VH = window.innerHeight;
    const W = containerRef.current?.offsetWidth ?? 0;
    const H = containerRef.current?.offsetHeight ?? 0;
    if (W === 0 || H === 0) return;

    const cpPx = CHECKPOINTS.map((c) => c * VH);
    const past = Math.max(0, Math.min(rawScrolledPast, cpPx[cpPx.length - 1]));

    // Find which segment we're in: even index = climb (STOPS[i] -> STOPS[i+1]),
    // odd index = held dwell at STOPS[(i+1)/2].
    let segment = cpPx.length - 2;
    for (let i = 0; i < cpPx.length - 1; i++) {
      if (past >= cpPx[i] && past <= cpPx[i + 1]) {
        segment = i;
        break;
      }
    }

    const segStart = cpPx[segment];
    const segEnd = cpPx[segment + 1];
    const t = segEnd > segStart ? (past - segStart) / (segEnd - segStart) : 1;
    const isClimb = segment % 2 === 0;
    const stopIndex = isClimb ? segment / 2 : (segment - 1) / 2 + 1;

    if (isClimb) {
      const from = STOPS[segment / 2];
      const to = STOPS[segment / 2 + 1];
      const h1 = hLineFor(from, W, H);
      const h2 = hLineFor(to, W, H);
      const v1 = vLineFor(from, W, H);
      const v2 = vLineFor(to, W, H);
      setHLine({ top: lerp(h1.top, h2.top, t), left: lerp(h1.left, h2.left, t), width: lerp(h1.width, h2.width, t) });
      setVLine({ left: lerp(v1.left, v2.left, t), top: lerp(v1.top, v2.top, t), height: lerp(v1.height, v2.height, t) });
      setHeldStop(null);
      setContentOpacity(0);
    } else {
      const stop = STOPS[stopIndex];
      setHLine(hLineFor(stop, W, H));
      setVLine(vLineFor(stop, W, H));
      setHeldStop(stop);
      setContentOpacity(1);
    }
  });

  // `useMotionValueEvent` only fires on scroll *changes* — if the page loads
  // already at the right scroll position (e.g. scrollY genuinely 0, nothing
  // scrolled yet), the handler above may never run, leaving `scrolledPast` at
  // its default. Compute the real value once on mount so the pin logic below
  // is correct from the very first paint, not just after the first scroll.
  useEffect(() => {
    if (!outerRef.current) return;
    setScrolledPast(-outerRef.current.getBoundingClientRect().top);
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

  // Manual pin/release: this section should sit fixed on screen for the first
  // (TOTAL_VH - 1) viewport-heights of scroll (the "stickRange"), then park at
  // the bottom of the outer TOTAL_VH wrapper for the remainder — the same
  // visual result `position: sticky` is supposed to give, computed ourselves.
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;
  const stickRange = Math.max(0, (TOTAL_VH - 1) * viewportH);
  const pinned = scrolledPast >= 0 && scrolledPast <= stickRange;
  const parkedTop = Math.min(Math.max(scrolledPast, 0), stickRange);

  const activeCards: DestinationCard[] =
    heldStop === "work"
      ? workTab === "others"
        ? workArticles.map((a) => ({ title: a.title, subtitle: a.company, x: a.x, y: 1 - a.y, thumbnail: a.thumbnail, slug: a.slug, yAxisLabel: a.pillarTheme, xAxisLabel: a.workType?.toUpperCase() }))
        : SELF_UNDERSTANDING_CARDS
      : heldStop === "hhi"
      ? getHhiCards(navigate)
      : heldStop === "help-others"
      ? HELP_OTHERS_CARDS
      : [];

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: `${TOTAL_VH * 100}vh` }}>
      <section
        aria-label="Quadrant Scroll Sequence"
        ref={containerRef}
        className="w-full h-screen overflow-hidden bg-white"
        style={{ position: pinned ? "fixed" : "absolute", top: pinned ? 0 : parkedTop, left: 0 }}
      >
        {/* Same destination content QuadrantNav shows for a clicked quadrant
            (cursor-tracking crosshair, tab toggle, cards, bracket-end dots) —
            just without a back control, since there's nowhere to click back to
            on the scroll path. */}
        {(heldStop === "work" || heldStop === "hhi" || heldStop === "help-others") && (
          <div className="transition-opacity duration-300" style={{ opacity: contentOpacity, pointerEvents: contentOpacity ? "auto" : "none" }}>
            <QuadrantDestinationView
              quadrant={heldStop}
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-12 text-center text-sm md:text-base text-neutral-500 whitespace-nowrap transition-opacity duration-300"
          style={{ opacity: heldStop === "overview" ? contentOpacity : 0, pointerEvents: heldStop === "overview" ? "auto" : "none" }}
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

        {/* The two lines — always rendered, animate continuously through every
            checkpoint above via the same hLine/vLine state. */}
        <div className="absolute bg-neutral-400 pointer-events-none z-20" style={{ top: hLine.top, left: hLine.left, width: hLine.width, height: 1.5 }} />
        <div className="absolute bg-neutral-400 pointer-events-none z-20" style={{ left: vLine.left, top: vLine.top, width: 1.5, height: vLine.height }} />
      </section>
    </div>
  );
}
