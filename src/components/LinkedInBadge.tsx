import { ArrowUpRight } from "lucide-react";

// The 3 texts this badge ever shows, co-located with the component itself
// so NavbarWrapper (which cycles between all 3 based on scroll position) and
// QuadrantSection (which only ever needs OVERVIEW_TEXT, for the inline badge
// at the Overview stop) both read the same strings instead of each keeping
// their own copy.
export const MATRIX_TEXT = 'Prototyping @Apple the “what-ifs” of HCI';
export const REFLECTION_TEXT = "Thinking... what is overthinking";
export const OVERVIEW_TEXT = "Hello! I'd rather meet you than the site";

// The LinkedIn pill itself, shared by two call sites: NavbarWrapper (fixed
// to the bottom of the viewport, everywhere the badge normally lives) and
// QuadrantSection's Overview stop (positioned inline, right below the small
// cross, replacing the "thank you" text there). Same component either way —
// only the shown `text` differs per call site, so the two never drift apart
// visually.
export function LinkedInBadge({ text }: { text: string }) {
  return (
    <a
      href="https://www.linkedin.com/in/qiyu-hu/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ cursor: "pointer" }}
      className="group grid items-center overflow-hidden rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-colors duration-300 hover:border-transparent hover:bg-neutral-900 hover:text-white"
    >
      {/* Invisible sizer, always present, never shown — permanently pins the grid
          column's width to the longest possible text (the matrix line), so the
          badge never resizes no matter which text or hover state is showing. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap">
        <span className="size-1.5 shrink-0 rounded-full" />
        {MATRIX_TEXT}
      </span>

      <span className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap group-hover:invisible">
        <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
        {text}
      </span>

      <span className="invisible col-start-1 row-start-1 flex items-center justify-between whitespace-nowrap group-hover:visible">
        <span className="text-[11px] text-neutral-400">
          🔑🫵 Key-You fyi
        </span>
        <span className="flex items-center gap-1">
          Qiyu's LinkedIn
          <ArrowUpRight className="size-3 shrink-0" />
        </span>
      </span>
    </a>
  );
}
