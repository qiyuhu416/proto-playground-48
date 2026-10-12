import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useScroll, useMotionValueEvent } from "motion/react";
import type { MatrixArticle } from "@/routes/index";
import { HandDrawnDiagram, HERO_CONTENT, type GapId } from "@/routes/index";
import { QuadrantDestinationView } from "@/components/QuadrantDestinationView";
import {
  BRACKET,
  SELF_UNDERSTANDING_CARDS,
  getHhiCards,
  HELP_OTHERS_CARDS,
  getReflectionCards,
  type QuadrantId,
  type DestinationCard,
} from "@/data/quadrantCards";

// Total scroll distance this section occupies — the intro zoom (hero diagram ->
// full matrix) plays out over the first INTRO_VH of it; the remainder is a
// "settled" dwell where the matrix sits still and fully interactive before
// QuadrantScrollSequence (the next section) takes over.
const INTRO_VH = 0.9; // fraction of one viewport height the zoom itself takes
const DWELL_VH = 0.8; // extra pinned scroll distance to interact with the matrix after the zoom completes
// The section needs its own 1vh of height PLUS the full pinned scroll distance
// (INTRO_VH + DWELL_VH) — the pin/release logic below only has (TOTAL_VH - 1)vh
// of scroll to work with, so leaving out that extra 1vh causes the section to
// release and start sliding away before the intro animation even finishes.
const TOTAL_VH = 1 + INTRO_VH + DWELL_VH;

export function QuadrantNav({
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
  const [activeQuadrant, setActiveQuadrant] = useState<QuadrantId | null>(null);
  const [workTab, setWorkTab] = useState<"others" | "self">("others");
  const [heroGap, setHeroGap] = useState<GapId | null>(null);
  const [introProgress, setIntroProgress] = useState(0);
  // Signed px distance into this section — negative while it hasn't been
  // scrolled to yet, 0 right when it's reached. Kept signed (not clamped to 0)
  // so the pin logic below can tell "not reached yet" apart from "just
  // arrived"; both would otherwise read as 0 and the section would render
  // `position: fixed` (pinned on screen) before you've scrolled anywhere
  // near it. Drives the manual pin/release below instead of relying on
  // native `position: sticky` (which wasn't reliably holding the section).
  const [scrolledPast, setScrolledPast] = useState(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const past = -rect.top;
    setScrolledPast(past);
    const VH = window.innerHeight;
    const progress = Math.min(1, Math.max(0, past / (VH * INTRO_VH)));
    setIntroProgress(progress);
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

  const margin = 40;
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

  // Line geometry: at introProgress 0 the lines sit tight in the bottom-right
  // bracket (zoomed into the upper-left quadrant); as introProgress -> 1 they
  // pull back to the centered crosshair of the full matrix. Past that, clicking
  // a quadrant takes over with its own bracket target — same two elements the
  // whole time, only the target coordinates change.
  const introHTop = (H - margin) + introProgress * (H / 2 - (H - margin));
  const introVLeft = (W - margin) + introProgress * (W / 2 - (W - margin));

  const hLine = activeQuadrant
    ? { top: BRACKET[activeQuadrant].hTop === "top" ? margin : H - margin, left: 0, width: W }
    : { top: introProgress < 1 ? introHTop : H / 2, left: 0, width: W };
  const vLine = activeQuadrant
    ? { left: BRACKET[activeQuadrant].vSide === "left" ? margin : W - margin, top: 0, height: H }
    : { left: introProgress < 1 ? introVLeft : W / 2, top: 0, height: H };

  const activeCards: DestinationCard[] =
    activeQuadrant === "work"
      ? workTab === "others"
        ? workArticles.map((a) => ({ title: a.title, subtitle: a.company, x: a.x, y: 1 - a.y, thumbnail: a.thumbnail, slug: a.slug, yAxisLabel: a.pillarTheme, xAxisLabel: a.workType?.toUpperCase() }))
        : SELF_UNDERSTANDING_CARDS
      : activeQuadrant === "hhi"
      ? getHhiCards(navigate)
      : activeQuadrant === "help-others"
      ? HELP_OTHERS_CARDS
      : activeQuadrant === "reflection"
      ? getReflectionCards(navigate)
      : [];

  const openQuadrant = (id: QuadrantId, tab: "others" | "self" = "others") => {
    if (id === "work") setWorkTab(tab);
    setActiveQuadrant(id);
  };

  // Matrix-proper content (axis labels other than Qiyu/Think, sub-axis labels,
  // the 5 quadrant cards) fades in as the intro zoom completes.
  const matrixOpacity = activeQuadrant === null ? introProgress : 1;
  // Hero diagram + paragraph fade out over the same stretch, in reverse.
  const heroOpacity = activeQuadrant === null ? 1 - introProgress : 0;

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: `${TOTAL_VH * 100}vh` }}>
      <section
        aria-label="Quadrant Navigation"
        ref={containerRef}
        className="w-full h-screen bg-white overflow-hidden"
        style={{ position: pinned ? "fixed" : "absolute", top: pinned ? 0 : parkedTop, left: 0 }}
      >
        {/* Hero diagram + paragraph — the zoomed-in intro content, living in the
            open area of the bottom-right bracket (i.e. the upper-left quadrant's
            territory). Fades out as the view zooms out to the full matrix. */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: heroOpacity, pointerEvents: activeQuadrant === null && introProgress < 0.5 ? "auto" : "none" }}
        >
          <div className="absolute left-6 top-20 max-w-sm">
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-6">
            <img
              src="/articles/hello-stranger.png"
              alt="Hello, stranger!!"
              className="block mx-auto w-full max-w-[180px] h-auto mb-2"
              style={{ mixBlendMode: "multiply", opacity: 0.5 }}
            />
            <div className="scale-90 origin-top">
              <HandDrawnDiagram onHover={setHeroGap} />
            </div>
            <div className="relative w-full flex justify-center mt-2">
              <p className="tag-style text-sm">
                {heroGap ? HERO_CONTENT[heroGap].tag : "in human-human interaction, 1 != 2 != 3 != 4 != 1"}
              </p>
            </div>
          </div>
        </div>

        {/* Landing: axis labels + the 5 quadrant cards — Qiyu/Think are always
            visible (even during the zoomed-in intro); the rest fade in with the
            zoom-out, then everything fades out together once a quadrant is active. */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: activeQuadrant === null ? 1 : 0, pointerEvents: activeQuadrant === null && introProgress >= 0.5 ? "auto" : "none" }}
        >
          <div className="absolute left-1/2 top-6 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Qiyu</span>
          </div>
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ opacity: matrixOpacity }}>
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Others</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          </div>
          <div className="absolute top-1/2 left-6 -translate-y-1/2 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Think</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2" style={{ opacity: matrixOpacity }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Do</span>
          </div>

          <div style={{ opacity: matrixOpacity }}>
            <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(-108%, -140%)" }}>Understand myself</div>
            <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(12%, -140%)" }}>Help myself grow</div>
            <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(-104%, 40%)" }}>Understand Others</div>
            <div className="absolute text-xs text-neutral-400" style={{ left: "50%", top: "50%", transform: "translate(12%, 40%)" }}>Help Others grow</div>

            {[
              { title: "Reflection Notes", left: "28%", top: "20%", onClick: () => openQuadrant("reflection") },
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
        </div>

        {/* Destination view: back control, work's tab toggle, cursor-tracking
            crosshair, whichever card set is active, and the 4 bracket-end dots —
            shared with QuadrantScrollSequence's held stops (only `onBack` differs:
            the scroll path has nowhere to click back to). Fades in after the
            lines have had time to settle into place. */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: activeQuadrant !== null ? 1 : 0, transitionDelay: activeQuadrant !== null ? "400ms" : "0ms", pointerEvents: activeQuadrant !== null ? "auto" : "none" }}
        >
          {activeQuadrant && (
            <QuadrantDestinationView
              quadrant={activeQuadrant}
              cards={activeCards}
              workTab={workTab}
              setWorkTab={setWorkTab}
              W={W}
              H={H}
              hLine={hLine}
              vLine={vLine}
              onCardClick={onCardClick}
              onBack={() => setActiveQuadrant(null)}
            />
          )}
        </div>

        {/* The two lines — always rendered, animate between the zoomed-in bottom-right
            bracket, the centered crosshair, and whichever bracket corner a clicked
            quadrant calls for. */}
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20 transition-all duration-700 ease-out"
          style={{ top: hLine.top, left: hLine.left, width: hLine.width, height: 1.5 }}
        />
        <div
          className="absolute bg-neutral-400 pointer-events-none z-20 transition-all duration-700 ease-out"
          style={{ left: vLine.left, top: vLine.top, width: 1.5, height: vLine.height }}
        />
      </section>
    </div>
  );
}
