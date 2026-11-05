import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REFLECTIONS } from "@/data/reflections";
import type { DestinationCard } from "@/data/quadrantCards";

// All of /reflection-notes' content, shown directly inside the matrix's
// "reflection" destination instead of behind an extra click-through to that
// separate route — paged into a carousel (PAGE_SIZE per page) since there
// are too many notes to fit on screen at once. Reuses the same REFLECTIONS
// data and date-descending sort as that standalone page.
const PAGE_SIZE = 6;

const SORTED = [...REFLECTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const TOTAL_PAGES = Math.ceil(SORTED.length / PAGE_SIZE);

export function ReflectionNotesCarousel({
  rect,
  setHoveredCard,
  onBackgroundClick,
  onDescriptionCard,
}: {
  rect: { top: number; left: number; width: number; height: number };
  setHoveredCard: (title: string | null) => void;
  onBackgroundClick: () => void;
  // Same CardModal every other card on the site opens (description/image
  // mode, not a slug — a reflection note has no routed page of its own).
  onDescriptionCard: (card: DestinationCard) => void;
}) {
  const [page, setPage] = useState(0);
  const items = SORTED.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div
      className="absolute flex flex-col gap-4"
      style={{
        ...rect,
        // Left/right padding scales with the quadrant's own width (~15% a
        // side) instead of a fixed pixel value — on a wide quadrant that
        // used to let the card grid run almost edge to edge, reading as
        // cramped against the bracket lines; this leaves a real margin
        // whatever the quadrant's actual width ends up being. The outer div
        // itself still spans the FULL contentRect (unchanged) so that
        // margin stays genuine open background — clicking there still goes
        // back to the matrix (see onClick below).
        paddingLeft: rect.width * 0.15,
        paddingRight: rect.width * 0.15,
        paddingTop: 88,
        paddingBottom: 28,
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
      {/* This grid div has its own bounding box spanning the full flex-1
          height (filling whatever's left below the padding-top), which is
          taller than the 2 rows of cards actually need — so blank space
          below/around the cards (not covered by any card's own div) is
          still part of THIS element, not the outer root div above. Without
          its own matching "exact target" check, such a click would bubble
          up with e.target stuck at this grid div, never matching the root's
          own e.currentTarget — same bug the outer root's check alone can't
          catch, needing the identical check at this level too. */}
      <div
        className="flex-1 grid grid-cols-3 grid-rows-2 gap-3 min-h-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) onBackgroundClick();
        }}
      >
        {items.map((note, i) => {
          // Same hover-reacts-and-activates-the-crosshair idea as every other
          // quadrant's cards, just via plain CSS :hover rather than the
          // cursor-proximity distance math (cardGrowScale) those use — these
          // sit in a CSS grid, not freely-positioned x/y coordinates, so a
          // hover-triggered scale is the natural fit here instead.
          const id = `reflection-${page}-${i}`;
          return (
            <div
              key={id}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onDescriptionCard({ title: note.date, description: note.content, thumbnail: note.image, x: 0, y: 0 })}
              // Fixed height (not content-sized) so every card — whether it
              // has an image and 3 lines of text or just one short line —
              // reads as the same size, instead of each row (and even each
              // card within a row) being only as tall as its own content
              // needed.
              className="w-full h-64 rounded-2xl bg-white/70 border border-neutral-200/70 p-4 flex flex-col gap-2 overflow-hidden transition-transform duration-150 hover:scale-105 cursor-pointer"
            >
              {note.image && (
                <img src={note.image} alt="" className="w-full h-24 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="text-[10px] text-neutral-500 font-medium flex-shrink-0">{note.date}</div>
              <p className="text-neutral-700 text-xs leading-snug line-clamp-3">{note.content}</p>
            </div>
          );
        })}
      </div>

      {/* Page controls — same arrow-button language as the Pillar carousels
          elsewhere on the site, plus a simple "page X of Y" indicator since
          there are too many pages for dots to read well. */}
      {TOTAL_PAGES > 1 && (
        <div className="flex items-center justify-center gap-3 flex-shrink-0">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-neutral-500 tabular-nums">
            {page + 1} / {TOTAL_PAGES}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
            disabled={page === TOTAL_PAGES - 1}
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-default"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
