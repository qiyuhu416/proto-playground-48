"use client";
import { useEffect, useState } from "react";
import { LinkedInBadge, MATRIX_TEXT, REFLECTION_TEXT, HHI_TEXT, HELP_OTHERS_TEXT } from "@/components/LinkedInBadge";
import { BADGE_POSITION } from "@/data/quadrantCards";

// Hidden for now (not deleted) — flip back to true to hide the badge again.
const HIDDEN = false;

export function NavbarWrapper() {
  const [pastLanding, setPastLanding] = useState(false);
  const [badgeText, setBadgeText] = useState(MATRIX_TEXT);

  useEffect(() => {
    // QuadrantSection stamps its current stop onto its own root section as
    // a data attribute (`data-held-stop`) — reading that instead of
    // separate per-section aria-label queries, since the whole sequence
    // (hero/center/work/hhi/help-others/reflection/overview) now lives in
    // one unified component, not separate scroll-choreographed sections.
    const quadrantSection = document.querySelector('[aria-label="Quadrant Section"]');
    const update = () => {
      const heldStop = quadrantSection?.getAttribute("data-held-stop");
      // Hidden outright on the full matrix (the one stop where it would
      // otherwise float over the busiest part of the page) and on Overview,
      // where QuadrantSection shows this same badge inline instead, right
      // below the small cross, rather than fixed to the viewport.
      const hideThisBadge = heldStop === "center" || heldStop === "overview";
      setPastLanding(window.scrollY > window.innerHeight * 0.5 && !hideThisBadge);
      setBadgeText(
        heldStop === "reflection"
          ? REFLECTION_TEXT
          : heldStop === "hhi"
          ? HHI_TEXT
          : heldStop === "help-others"
          ? HELP_OTHERS_TEXT
          : MATRIX_TEXT,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    // A `scroll` listener alone misses HHI/help-others/reflection — those
    // are click-only stops (QuadrantSection's own jumpTo never moves real
    // scroll for them, see its own top-of-file comment), so clicking into
    // one changes data-held-stop with NO scroll event to catch it. Watching
    // the attribute directly covers both cases — scroll-driven (work <->
    // center) and click-driven (everything else) — instead of only the
    // former.
    const observer = new MutationObserver(update);
    if (quadrantSection) observer.observe(quadrantSection, { attributes: true, attributeFilter: ["data-held-stop"] });
    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  if (HIDDEN) return null;

  return (
    <div
      className="fixed z-40 transition-opacity duration-300"
      // Same BADGE_POSITION every quadrant uses — including the hover
      // preview on the matrix grid (QuadrantSection) — so the badge never
      // moves between "previewing" and "actually here."
      style={{ ...BADGE_POSITION, opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }}
      // This badge is fixed outside the quadrant views' own DOM subtree, so
      // hovering it never fires their mousemove/mouseenter handlers
      // directly — broadcast instead, the same way data-held-stop signals
      // state across that same boundary. QuadrantDestinationView listens for
      // this to hide its cursor-tracking arrow marker while this badge's own
      // LinkedIn-branded cursor (styles.css) is the one actually showing.
      onMouseEnter={() => window.dispatchEvent(new CustomEvent("qy:badge-hover", { detail: true }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent("qy:badge-hover", { detail: false }))}
    >
      <LinkedInBadge text={badgeText} />
    </div>
  );
}
