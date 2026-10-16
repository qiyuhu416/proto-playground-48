"use client";
import { useEffect, useState } from "react";
import { LinkedInBadge, MATRIX_TEXT, REFLECTION_TEXT } from "@/components/LinkedInBadge";

// Hidden for now (not deleted) — flip back to true to hide the badge again.
const HIDDEN = false;

export function NavbarWrapper() {
  const [pastLanding, setPastLanding] = useState(false);
  const [badgeText, setBadgeText] = useState(MATRIX_TEXT);

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
      setBadgeText(heldStop === "reflection" ? REFLECTION_TEXT : MATRIX_TEXT);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (HIDDEN) return null;

  return (
    <div
      className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
      style={{ opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }}
    >
      <LinkedInBadge text={badgeText} />
    </div>
  );
}
