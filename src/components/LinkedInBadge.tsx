import { ArrowUpRight } from "lucide-react";

// The 3 texts this badge ever shows, co-located with the component itself
// so NavbarWrapper (which cycles between all 3 based on scroll position) and
// QuadrantSection (which only ever needs OVERVIEW_TEXT, for the inline badge
// at the Overview stop) both read the same strings instead of each keeping
// their own copy.
export const MATRIX_TEXT = 'Currently Prototyping @Apple AILabs';
export const REFLECTION_TEXT = "Thinking... what is overthinking";
export const OVERVIEW_TEXT = "Hello! I'd rather meet you than the site";
export const HHI_TEXT = "Since when does 'humans' become a word?";
export const HELP_OTHERS_TEXT = "Yoyo";
// "tech for self-understanding" is its own matrix card but shares the
// "work" quadrant/stop with "work" (same destination, different tab) — this
// text is only ever shown on that card's own hover preview in the matrix,
// never by NavbarWrapper (which only varies by stop, not by tab).
export const SELF_UNDERSTANDING_TEXT = "Subject=Qiyu (N=1)";

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
      {/* No fixed-width sizer anymore — the badge now sizes to whichever
          `text` it's actually showing (the grid column still naturally
          accounts for both this layer and the hover-reveal layer below, so
          hovering to reveal "Qiyu's LinkedIn" never clips). Every call site
          positions this with `right` (not `left`), so as the width changes
          per text, the badge grows/shrinks from its left edge while its
          right edge — and everything else "right aligned" means here —
          stays fixed in place. */}
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
