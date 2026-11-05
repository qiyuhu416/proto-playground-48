"use client";
import { useEffect, useState } from "react";
import { LinkedInBadge, MATRIX_TEXT, REFLECTION_TEXT, HHI_TEXT, HELP_OTHERS_TEXT } from "@/components/LinkedInBadge";
import { EDGE } from "@/data/quadrantCards";

// Hidden for now (not deleted) — flip back to true to hide the badge again.
const HIDDEN = false;

export function NavbarWrapper() {
  const [pastLanding, setPastLanding] = useState(false);
  const [badgeText, setBadgeText] = useState(MATRIX_TEXT);
  // "work" swaps this badge's position with its own tab toggle (see
  // QuadrantDestinationView: the toggle moves from the right corner to
  // center when quadrant === "work") — tracked here so the two stay in
  // sync without each needing to know about the other directly.
  const [isWork, setIsWork] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // QuadrantSection stamps its current stop onto its own root section as
      // a data attribute (`data-held-stop`) — reading that instead of
      // separate per-section aria-label queries, since the whole sequence
      // (hero/center/work/hhi/help-others/reflection/overview) now lives in
      // one unified component, not separate scroll-choreographed sections.
      const quadrantSection = document.querySelector('[aria-label="Quadrant Section"]');
      const heldStop = quadrantSection?.getAttribute("data-held-stop");
      // Hidden outright on the full matrix (the one stop where it would
      // otherwise float over the busiest part of the page) and on Overview,
      // where QuadrantSection shows this same badge inline instead, right
      // below the small cross, rather than fixed to the viewport.
      const hideThisBadge = heldStop === "center" || heldStop === "overview";
      setPastLanding(window.scrollY > window.innerHeight * 0.5 && !hideThisBadge);
      setIsWork(heldStop === "work");
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
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (HIDDEN) return null;

  return (
    <div
      className="fixed z-40 transition-opacity duration-300"
      style={
        isWork
          ? // Right corner, vertically centered at EDGE from the top — the
            // same distance the lower bracket line sits from the bottom
            // edge (mirrored), matching QuadrantDestinationView's own
            // vertical placement for the "work" tab toggle it swapped with.
            { top: EDGE, right: EDGE, transform: "translateY(-50%)", opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }
          : { top: 64, left: "50%", transform: "translateX(-50%)", opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }
      }
    >
      <LinkedInBadge text={badgeText} />
    </div>
  );
}
