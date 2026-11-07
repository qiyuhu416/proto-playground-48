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
      // hover:min-w-[220px] — since the hover layer below is `absolute` (see
      // comment above it), its content can't grow this pill on its own, so
      // on short resting texts the hover content would get crushed by
      // `justify-between`. 220px is sized to fit both hover-layer halves
      // with >=8px between "Key-You fyi" and "Qiyu's LinkedIn".
      className="group relative grid items-center overflow-hidden rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-colors duration-300 hover:min-w-[220px] hover:border-transparent hover:bg-neutral-900 hover:text-white"
    >
      {/* No fixed-width sizer anymore — the badge sizes to whichever `text`
          it's actually showing. The hover-reveal layer below is `absolute`
          (on top of its col/row placement) specifically so it's excluded
          from grid track sizing — a plain grid-stacked sibling, even while
          `invisible`, still counts toward how wide the shared column needs
          to be, which was quietly pinning every badge to the width of
          "Qiyu's LinkedIn" regardless of its own actual text. `relative` on
          this `<a>` gives the absolute layer a containing block to anchor
          `inset-0` against. */}
      <span className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap group-hover:invisible">
        <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
        {text}
      </span>

      <span className="invisible absolute inset-0 flex items-center justify-between whitespace-nowrap px-3 group-hover:visible">
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
