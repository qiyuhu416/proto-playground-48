import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REFLECTIONS } from "@/data/reflections";

// All of /reflection-notes' content, shown directly inside the matrix's
// "reflection" destination instead of behind an extra click-through to that
// separate route — paged into a carousel (PAGE_SIZE per page) since there
// are too many notes to fit on screen at once. Reuses the same REFLECTIONS
// data and date-descending sort as that standalone page.
const PAGE_SIZE = 6;

const SORTED = [...REFLECTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const TOTAL_PAGES = Math.ceil(SORTED.length / PAGE_SIZE);

export function ReflectionNotesCarousel({ rect }: { rect: { top: number; left: number; width: number; height: number } }) {
  const [page, setPage] = useState(0);
  const items = SORTED.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="absolute flex flex-col gap-4" style={{ ...rect, padding: 28 }} onClick={(e) => e.stopPropagation()}>
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 min-h-0">
        {items.map((note, i) => (
          <div key={`${page}-${i}`} className="rounded-2xl bg-white/70 border border-neutral-200/70 p-3 flex flex-col gap-1.5 overflow-hidden">
            {note.image && (
              <img src={note.image} alt="" className="w-full h-16 object-cover rounded-lg flex-shrink-0" />
            )}
            <div className="text-[10px] text-neutral-500 font-medium flex-shrink-0">{note.date}</div>
            <p className="text-neutral-700 text-xs leading-snug line-clamp-4">{note.content}</p>
          </div>
        ))}
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
