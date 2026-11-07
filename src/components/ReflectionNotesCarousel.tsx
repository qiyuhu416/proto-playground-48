import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REFLECTIONS } from "@/data/reflections";
import type { DestinationCard } from "@/data/quadrantCards";
import { FlippableBook } from "@/components/FlippableBook";

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
  pageWidth,
  tab,
  setHoveredCard,
  onBackgroundClick,
  onDescriptionCard,
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
}) {
  const [page, setPage] = useState(0);
  const items = SORTED.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  // Content keeps the same ~70%-of-rect width as before; only WHERE that
  // width sits within `rect` changes — its left edge is placed so the
  // content block itself is centered on the full page, not on `rect`.
  const contentWidth = rect.width * 0.7;
  const contentLeftOnPage = pageWidth / 2 - contentWidth / 2;
  const paddingLeft = Math.max(0, contentLeftOnPage - rect.left);
  const paddingRight = Math.max(0, rect.width - paddingLeft - contentWidth);

  return (
    <div
      className="absolute flex flex-col gap-4"
      style={{
        ...rect,
        // See paddingLeft/paddingRight above — asymmetric on purpose, so the
        // content lands at the page's true center rather than `rect`'s own
        // (off-center, bracket-bounded) center. The outer div itself still
        // spans the FULL contentRect (unchanged) so the margin on either
        // side stays genuine open background — clicking there still goes
        // back to the matrix (see onClick below).
        paddingLeft,
        paddingRight,
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
        className={tab === "journal" ? "flex-1 flex items-center justify-center min-h-0" : "flex-1 grid grid-cols-3 content-center justify-center gap-3 min-h-0 max-h-[50vh]"}
        onClick={(e) => {
          if (e.target === e.currentTarget) onBackgroundClick();
        }}
      >
        {tab === "journal" && <FlippableBook />}
        {tab === "list" && items.map((note, i) => {
          // Same hover-reacts-and-activates-the-crosshair idea as every other
          // quadrant's cards, just via plain CSS :hover rather than the
          // cursor-proximity distance math (cardGrowScale) those use — these
          // sit in a CSS grid, not freely-positioned x/y coordinates, so a
          // hover-triggered scale is the natural fit here instead.
          const id = `reflection-${page}-${i}`;
          // No separate title field on a reflection — derived the same way
          // the standalone /reflection-notes page already does (first 7
          // words of content), so both read consistently.
          const words = note.content.split(/\s+/);
          const title = words.slice(0, 7).join(" ") + (words.length > 7 ? "…" : "");
          return (
            <div
              key={id}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onDescriptionCard({ title: note.date, description: note.content, thumbnail: note.image, x: 0, y: 0 })}
              // Fixed height (not content-sized) so every card — whether it
              // has an image or not — reads as the same size, instead of
              // each one being only as tall as its own content needed. No
              // text visible at rest — this is meant to read as a wall of
              // images at a glance; the title only appears as a hover
              // overlay, and the full text lives in the modal after a click.
              className="group relative w-full h-48 rounded-2xl bg-neutral-100 border border-neutral-200/70 overflow-hidden transition-transform duration-150 hover:scale-105 cursor-pointer"
            >
              {note.image ? (
                <>
                  <img src={note.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  {/* Dark overlay + bottom-aligned title, hidden until
                      hover — only for image cards, since a text-only card
                      (below) already shows its text directly, with nothing
                      extra worth revealing on hover. */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-150" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">{title}</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col gap-2 p-4">
                  <div className="text-[10px] text-neutral-500 font-medium flex-shrink-0">{note.date}</div>
                  <p className="text-neutral-700 text-xs leading-snug line-clamp-4">{note.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Page controls — same arrow-button language as the Pillar carousels
          elsewhere on the site, plus a simple "page X of Y" indicator since
          there are too many pages for dots to read well. */}
      {tab === "list" && TOTAL_PAGES > 1 && (
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
