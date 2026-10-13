// Card/bracket/axis data for QuadrantSection's destination stops — kept here
// once instead of hand-authored per stop.

export type QuadrantId = "work" | "hhi" | "help-others" | "reflection";

// Shared layout constants so every page aligns to the same margin, instead of
// each component picking its own arbitrary number:
// - EDGE: distance from the true page edge to the bracket line/dot — content
//   that reads as "main content" (paragraphs, tab toggles) sits flush against
//   this same margin, starting at EDGE and growing inward. Top-level labels
//   (Qiyu/Others/Think/Do) sit right at this same corner point, next to the
//   dot — they ARE the line's label, not a separate edge-centered element.
// - SUB_LABEL_ALONG_GAP: per-quadrant sub-labels (OTHERS/SELF/etc.) don't
//   compete with the top-level label for that same corner — instead they
//   slide this far *along* the line, away from the corner, reading beside
//   the line as it runs toward the middle of the screen.
// - SUB_LABEL_PERP_GAP: a small nudge perpendicular to the line (toward the
//   true edge), just enough that the sub-label sits beside the line rather
//   than directly on top of it.
export const EDGE = 40;
export const SUB_LABEL_ALONG_GAP = 72;
export const SUB_LABEL_PERP_GAP = 10;

// Per-stop entrance choreography: the line finishes moving (LINE_DURATION_MS,
// matching QuadrantSection's own line-transition duration) before the
// top-level Qiyu/Others/Think/Do label starts fading in; cards wait for the
// label to finish too, then each fades in on its own randomized delay within
// CARD_STAGGER_MAX_MS of CARDS_BASE_DELAY_MS — so with more than one card
// they visibly arrive in a scattered, non-simultaneous order each time.
export const LINE_DURATION_MS = 700;
export const LABEL_DELAY_MS = LINE_DURATION_MS;
export const LABEL_DURATION_MS = 250;
export const CARDS_BASE_DELAY_MS = LABEL_DELAY_MS + LABEL_DURATION_MS;
export const CARD_DURATION_MS = 300;
export const CARD_STAGGER_MAX_MS = 250;
// The worst-case total time for a stop's whole entrance (line + label + the
// last-staggered card) to finish settling. QuadrantSection's scroll lock uses
// this — not just LINE_DURATION_MS — so the next wheel gesture can't advance
// past a stop until everything in it has actually finished appearing; locking
// only for the line's own duration let people scroll on while cards were
// still popping in, which read as the section getting skipped.
export const FULL_SETTLE_MS = CARDS_BASE_DELAY_MS + CARD_DURATION_MS + CARD_STAGGER_MAX_MS;

// Which corner the two lines bracket into for each quadrant, mirroring the visual
// language already built for the original work matrix (bottom-left) and the
// Reflection section's held state (top-right) — plus top-left and bottom-right
// variants for the other two. The bracket corner is always the one diagonally
// OPPOSITE the quadrant that was clicked/scrolled to.
export const BRACKET: Record<QuadrantId, { hTop: "top" | "bottom"; vSide: "left" | "right" }> = {
  work: { hTop: "bottom", vSide: "left" },         // upper-right quadrant -> bottom-left bracket
  hhi: { hTop: "top", vSide: "right" },             // lower-left quadrant -> top-right bracket
  "help-others": { hTop: "top", vSide: "left" },    // lower-right quadrant -> top-left bracket
  reflection: { hTop: "bottom", vSide: "right" },   // upper-left quadrant -> bottom-right bracket
};

// Static axis-end labels for each destination view (always visible, unlike
// yAxisLabel/xAxisLabel on DestinationCard below which only show on hover).
// "work"'s pair is the original copy from the old single-view matrix; the
// other three are placeholders — swap the words here when there's real copy.
export const AXIS_LABELS: Record<QuadrantId, { top: string; bottom: string; left: string; right: string }> = {
  work: { top: "OTHERS", bottom: "SELF", left: "PRODUCTION", right: "FUTURE CONCEPTS" },
  hhi: { top: "DIGITAL", bottom: "PHYSICAL", left: "IMPROMPTU", right: "DESIGNED" },
  "help-others": { top: "COMMUNITY", bottom: "INDIVIDUAL", left: "ONLINE", right: "IN-PERSON" },
  reflection: { top: "PRIVATE", bottom: "SHARED", left: "PAST", right: "PRESENT" },
};

export interface DestinationCard {
  title: string;
  subtitle?: string;
  x: number; // 0-1 fraction of container width
  y: number; // 0-1 fraction of container height
  thumbnail?: string;
  comingSoon?: boolean;
  slug?: string; // if present, routed through onCardClick (existing article modal)
  onClick?: () => void; // custom handler (external link, route nav) — takes priority over slug
  // Shown on the cursor-tracking crosshair lines while this card is hovered
  // (same technique as the original work matrix's pillarTheme/workType hover
  // labels). Optional — quadrants without this kind of axis data just show
  // no label on hover.
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export const SELF_UNDERSTANDING_CARDS: DestinationCard[] = [
  { title: "Model for Journaling", x: 0.32, y: 0.45, comingSoon: true },
  { title: "Affinity Clustering Wall", x: 0.52, y: 0.6, comingSoon: true },
  { title: "AIOS", x: 0.72, y: 0.4, comingSoon: true },
];

export function getHhiCards(navigate: (opts: { to: string }) => void): DestinationCard[] {
  return [
    {
      title: "Catch Up",
      x: 0.28, y: 0.65,
      thumbnail: "/articles/meet-stranger-calendly.png",
      onClick: () => window.open("https://calendly.com/qiyuhu/new-meeting", "_blank", "noopener,noreferrer"),
    },
    { title: "Give a Stranger a Flower", x: 0.52, y: 0.42, comingSoon: true },
    {
      title: "Hello Humans Table Stand",
      x: 0.75, y: 0.3,
      thumbnail: "/articles/hello-humans-notebook.jpg",
      onClick: () => navigate({ to: "/hello-humans" }),
    },
  ];
}

export const HELP_OTHERS_CARDS: DestinationCard[] = [
  { title: "Friends' Marketplace", x: 0.38, y: 0.48, comingSoon: true },
  { title: "Events I've Hosted @ Apple", x: 0.65, y: 0.42, thumbnail: "/articles/events-thumb.svg", comingSoon: true },
];

export function getReflectionCards(navigate: (opts: { to: string }) => void): DestinationCard[] {
  return [
    { title: "Reflection Notes", x: 0.35, y: 0.38, onClick: () => navigate({ to: "/reflection-notes" }) },
  ];
}
