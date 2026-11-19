import { useCallback, useEffect, useRef, useState } from "react";
import { REFLECTIONS } from "@/data/reflections";
import type { DestinationCard } from "@/data/quadrantCards";
import { FlippableBook } from "@/components/FlippableBook";
import { CursorPill, NoteCard } from "@/components/system";

// All of /reflection-notes' content, shown directly inside the matrix's
// "reflection" destination instead of behind an extra click-through to that
// separate route — every entry at once in a scrollable grid (not paged)
// since there are too many to fit on screen together. Reuses the same
// REFLECTIONS data and date-descending sort as that standalone page.
const SORTED = [...REFLECTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function ReflectionNotesCarousel({
  rect,
  pageWidth,
  pageHeight,
  tab,
  setHoveredCard,
  onBackgroundClick,
  onDescriptionCard,
  onScrollProgress,
  cursorPos,
  onNavigateHHI,
  onSpecialCursorChange,
}: {
  rect: { top: number; left: number; width: number; height: number };
  // The reflection quadrant's own contentRect (`rect`) is bracket-bounded —
  // for this particular quadrant that boundary sits well short of the true
  // right edge of the page, so `rect` itself is NOT centered on the page.
  // Symmetric padding within `rect` alone would just center content inside
  // that off-center box. `pageWidth` (QuadrantSection's own full measured
  // width, same coordinate space as `rect` — both ultimately anchored off
  // the fixed-positioned Quadrant Section root) lets the padding below be
  // computed asymmetrically instead, landing the content on the PAGE's true
  // center rather than `rect`'s.
  pageWidth: number;
  // Same idea as pageWidth, but for height — `rect`'s own bottom boundary
  // (the horizontal bracket line) stops short of the true bottom edge too.
  // List's scrollable grid uses this to reach all the way down instead of
  // stopping at that boundary (Journal/the book is unaffected — it's
  // vertically centered either way).
  pageHeight: number;
  // Owned by QuadrantDestinationView (not local state here) so the toggle
  // itself can be positioned up there, on the same line as the badge/work
  // tab (BADGE_POSITION.top) instead of flowing inside this component's own
  // padded content area.
  tab: "journal" | "list";
  setHoveredCard: (title: string | null) => void;
  onBackgroundClick: () => void;
  // Same CardModal every other card on the site opens (description/image
  // mode, not a slug — a reflection note has no routed page of its own).
  onDescriptionCard: (card: DestinationCard) => void;
  // 0 (top) to 1 (bottom) — fed up to QuadrantSection, which repurposes the
  // Qiyu dot as this grid's scrollbar thumb instead of showing a native
  // scrollbar (see the grid's own className below for the native one being
  // hidden).
  onScrollProgress: (p: number) => void;
  // QuadrantDestinationView's own tracked mouse position — reused here (not
  // tracked separately) to position the "how I break the models" pill that
  // follows the cursor while hovering the Jess Hammer quote below.
  cursorPos: { x: number; y: number };
  // jumpTo("hhi"), forwarded from QuadrantSection via QuadrantDestinationView
  // — clicking the quote jumps straight to the HHI quadrant.
  onNavigateHHI: () => void;
  // True while this view draws its own cursor (the quote pill), so the parent
  // can hide the default cursor marker instead of showing both.
  onSpecialCursorChange?: (on: boolean) => void;
}) {
  // Content keeps ~85% of rect's width (wide, closer to full-bleed — the
  // List grid in particular should read as a real scrollable page, not a
  // narrow centered box); only WHERE that width sits within `rect` changes
  // — its left edge is placed so the content block itself is centered on
  // the full page, not on `rect`.
  const contentWidth = rect.width * 0.85;
  const contentLeftOnPage = pageWidth / 2 - contentWidth / 2;
  const paddingLeft = Math.max(0, contentLeftOnPage - rect.left);
  const paddingRight = Math.max(0, rect.width - paddingLeft - contentWidth);
  // List reaches the true bottom edge of the page; Journal keeps rect's own
  // (bracket-bounded) height, since the book is centered within it anyway.
  const containerHeight = tab === "list" ? pageHeight - rect.top : rect.height;

  // The quote's bottom edge needs to land on the book's actual bottom edge —
  // bookFrameRef is passed as FlippableBook's frameRef, landing directly on
  // its .fbk-frame div specifically, NOT the Prev/Next controls below it
  // (those are a separate sibling in FlippableBook's own markup, outside
  // .fbk-frame), so measuring it doesn't include that row's height. Width
  // also needs to shrink as the screen narrows instead of overlapping the
  // book — FlippableBook has a fixed CSS size (not responsive), so on a
  // narrower screen the book (still centered in a shrinking contentWidth)
  // drifts closer to the left edge where the quote sits. Measuring both
  // dimensions live via ResizeObserver, rather than hardcoding either,
  // means this reacts correctly to both the book's own size (if it ever
  // changes) and the screen's.
  //
  // A CALLBACK ref (not useRef + a one-time useEffect) on purpose: Journal's
  // <FlippableBook> fully unmounts/remounts every time you switch away to
  // List and back (it's conditionally rendered, not just hidden), so its
  // .fbk-frame is a BRAND NEW DOM node each time. A useEffect with an empty
  // dep array only ever attaches the observer to whichever node existed on
  // the very first mount — after the first switch back to Journal, it's
  // watching a detached, removed node while the real one goes unobserved,
  // leaving bookSize stale (quoteWidth's math then blows up, overlapping
  // the book instead of sitting beside it). A callback ref fires on EVERY
  // mount, so the observer reattaches to the actual current node each time.
  const bookObserverRef = useRef<ResizeObserver | null>(null);
  const [bookSize, setBookSize] = useState({ width: 0, height: 0 });
  const bookFrameRef = useCallback((el: HTMLDivElement | null) => {
    bookObserverRef.current?.disconnect();
    bookObserverRef.current = null;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setBookSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    observer.observe(el);
    bookObserverRef.current = observer;
  }, []);
  // Half the leftover space to one side of the centered book, minus a fixed
  // gap — shrinks as contentWidth narrows or the book's own width grows,
  // instead of a fixed w-60 that would eventually run into the book. Floor
  // of 120px so the text doesn't get unreadably narrow before there's
  // simply no room left for it at all.
  // 64 (space/16) of clear space between the quote's hover box and the book;
  // +16 because the box extends 16px past the text on each side (p-4 / -m-4).
  const QUOTE_GAP = 64 + 16;
  const quoteWidth = Math.max(120, (contentWidth - bookSize.width) / 2 - QUOTE_GAP);
  const [quoteHovered, setQuoteHovered] = useState(false);
  const specialCursor = tab === "journal" && quoteHovered;
  useEffect(() => {
    onSpecialCursorChange?.(specialCursor);
    return () => onSpecialCursorChange?.(false);
  }, [specialCursor, onSpecialCursorChange]);

  return (
    <div
      // justify-center here is vertical, not horizontal — this is a
      // flex-col container, so justify-content governs its main axis
      // (top-to-bottom), not align-items' usual horizontal job on a row
      // container. Only matters for the Journal tab now (the book is
      // smaller than the available height) — List's grid fills the full
      // height itself via flex-1, so there's rarely leftover space there
      // for this to redistribute.
      className="absolute flex flex-col justify-center gap-4"
      style={{
        ...rect,
        // See containerHeight above — List overrides rect's own height to
        // reach the true bottom edge.
        height: containerHeight,
        // See paddingLeft/paddingRight above — asymmetric on purpose, so the
        // content lands at the page's true center rather than `rect`'s own
        // (off-center, bracket-bounded) center. The outer div itself still
        // spans the FULL contentRect (unchanged) so the margin on either
        // side stays genuine open background — clicking there still goes
        // back to the matrix (see onClick below).
        paddingLeft,
        paddingRight,
        paddingTop: 120,
        paddingBottom: 0,
      }}
      // Same "only the exact open background, not a descendant" check
      // QuadrantDestinationView's own root uses — NOT a blanket
      // stopPropagation, which used to swallow every click anywhere in this
      // rect (including the blank grid gaps between cards) before it could
      // ever reach that check, making "click to go back" only work in the
      // thin strip of true page outside this rect.
      onClick={(e) => {
        if (e.target === e.currentTarget) onBackgroundClick();
      }}
    >
      {/* Extra paddingTop (88 vs 28 on the other 3 sides) keeps the first row
          clear of the fixed badge, which floats independently at the top of
          the viewport. */}
      {/* All cards at once (no pagination), filling the full flex-1 height
          and scrolling within it — a real scrollable page, not a smaller
          box capped partway down. content-start (not content-center) so
          rows read top-down from the scroll position, same as any normal
          scrollable list; centering rows made sense for one fixed page of
          6, not an open-ended list. Without its own matching "exact
          target" check, a background click here would bubble up with
          e.target stuck at this grid div, never matching the root's own
          e.currentTarget — same bug the outer root's check alone can't
          catch, needing the identical check at this level too. */}
      <div
        className={
          tab === "journal"
            ? "relative flex-1 flex items-center justify-center min-h-0"
            // [&::-webkit-scrollbar]:hidden covers Chrome/Safari/Edge; the
            // inline scrollbarWidth/msOverflowStyle below cover Firefox and
            // old Edge — no single CSS property hides it everywhere. Still
            // fully scrollable (wheel, trackpad, touch, keyboard), just
            // -m-3 p-3: a hovered card grows to 105% and would be clipped by
            // this scroll box at its edges. The padding gives it room to grow
            // inside the clip; the equal negative margin cancels it out so the
            // layout doesn't move.
            // without the visible native bar — the Qiyu dot is the visible
            // scroll indicator instead (see onScroll below).
            : "relative flex-1 grid grid-cols-3 content-start justify-center gap-3 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden -m-3 p-3"
        }
        style={tab === "list" ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
        onScroll={
          tab === "list"
            ? (e) => {
                const el = e.currentTarget;
                const max = el.scrollHeight - el.clientHeight;
                onScrollProgress(max > 0 ? el.scrollTop / max : 0);
              }
            : undefined
        }
        onClick={(e) => {
          if (e.target === e.currentTarget) onBackgroundClick();
        }}
      >
        {tab === "journal" && (
          <>
            <FlippableBook frameRef={bookFrameRef} />
            {/* Independently positioned, not a flex sibling of the book —
                the book is centered in this container (via items-center
                above), so its vertical center always sits at the
                container's own 50% mark. `bottom: calc(50% - bookSize.height/2)`
                reaches down from that same center point to the book's
                actual (measured, not guessed) bottom edge — correct at any
                screen size and automatically if the book's own size ever
                changes. Width is the measured leftover space beside the
                book (see quoteWidth above), not a fixed value, so it
                shrinks instead of overlapping the book as the screen
                narrows. */}
            <div
              className="group absolute left-0 box-content -m-4 cursor-none rounded-xl p-4 transition-colors duration-150 hover:bg-foreground"
              style={{ bottom: `calc(50% - ${bookSize.height / 2}px)`, width: quoteWidth }}
              onMouseEnter={() => setQuoteHovered(true)}
              onMouseLeave={() => setQuoteHovered(false)}
              onClick={onNavigateHHI}
            >
              <p className="text-foreground text-base leading-relaxed transition-colors duration-150 group-hover:text-background">
                "Be careful with this urge to model everything, because the real world is very likely to be messier."
                <br />
                — Prof. Jess Hammer
              </p>
            </div>
          </>
        )}
        {tab === "list" && SORTED.map((note, i) => {
          // Same hover-reacts-and-activates-the-crosshair idea as every other
          // quadrant's cards, just via plain CSS :hover rather than the
          // cursor-proximity distance math (cardGrowScale) those use — these
          // sit in a CSS grid, not freely-positioned x/y coordinates, so a
          // hover-triggered scale is the natural fit here instead.
          const id = `reflection-${i}`;
          const onClick = () => onDescriptionCard({ title: note.date, description: note.content, thumbnail: note.image, x: 0, y: 0 });
          const onMouseEnter = () => setHoveredCard(id);
          const onMouseLeave = () => setHoveredCard(null);
          // Both kinds are the design system's NoteCard (fixed height, so every
          // card reads as the same size whether or not it has an image).
          const handlers = { onClick, onMouseEnter, onMouseLeave };
          return note.image ? (
            <NoteCard key={id} kind="image" title={note.title} date={note.date} preview={note.content} image={note.image} {...handlers} />
          ) : (
            <NoteCard key={id} kind="text" title={note.title} date={note.date} preview={note.content} {...handlers} />
          );
        })}
      </div>

      {/* Hovering Jess's quote swaps the cursor for a pill, centred exactly on
          the pointer. Rendered here (a direct child of this root, which is
          absolutely positioned at `rect`) rather than inside the Journal box:
          that box has its own offset, which pushed the pill away from the
          cursor. cursorPos is relative to the destination root, so subtract
          this root's own offset. */}
      {tab === "journal" && quoteHovered && (
        <CursorPill
          tone="light" // the quote turns dark on hover, so the pill inverts to stay visible
          className="absolute z-50"
          style={{ left: cursorPos.x - rect.left, top: cursorPos.y - rect.top, transform: "translate(-50%, -50%)" }}
        >
          how I break the models
        </CursorPill>
      )}
    </div>
  );
}
