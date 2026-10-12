// Shared between QuadrantNav (click-to-zoom, instant) and QuadrantScrollSequence
// (scroll-driven auto-advance) — both render the same destination content via two
// different interaction mechanisms, so the data lives here once instead of being
// hand-authored twice.

export type QuadrantId = "work" | "hhi" | "help-others" | "reflection";

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
