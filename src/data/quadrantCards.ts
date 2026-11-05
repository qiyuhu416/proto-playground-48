// Card/bracket/axis data for QuadrantSection's destination stops — kept here
// once instead of hand-authored per stop.

export type QuadrantId = "work" | "hhi" | "help-others" | "reflection";

// Cursor-proximity "grow" effect, ported from the original work matrix
// (commit adb5b2d) and shared by every card grid in this system — the
// matrix's own 4 quadrant-selector cards (QuadrantSection) and each
// destination's cards (QuadrantDestinationView). A card scales up slightly
// as the cursor nears its center, linearly falling back to 1x once the
// cursor is CARD_GROW_MAX_DISTANCE away or further — reads as the cards
// "paying attention" to the cursor, not a hover-only on/off state.
export const CARD_GROW_MAX_DISTANCE = 200;
export const CARD_GROW_MAX_SCALE = 0.15;
export const CARD_GROW_DURATION_MS = 80;

export function cardGrowScale(cursorPos: { x: number; y: number }, cardX: number, cardY: number) {
  const distance = Math.hypot(cursorPos.x - cardX, cursorPos.y - cardY);
  return Math.max(1, 1 + ((CARD_GROW_MAX_DISTANCE - distance) / CARD_GROW_MAX_DISTANCE) * CARD_GROW_MAX_SCALE);
}

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
// top-level Qiyu/Others/Think/Do label starts fading in; cards start a short
// beat after that — CARDS_SETTLE_GAP_MS, not the label's full fade duration —
// so they read as following close behind the line settling rather than
// waiting for the label to completely finish first. Each card then fades in
// on its own randomized delay within CARD_STAGGER_MAX_MS of CARDS_BASE_DELAY_MS,
// so with more than one card they visibly arrive in a scattered,
// non-simultaneous order each time.
export const LINE_DURATION_MS = 700;
export const LABEL_DELAY_MS = LINE_DURATION_MS;
export const LABEL_DURATION_MS = 250;
export const CARDS_SETTLE_GAP_MS = 80;
export const CARDS_BASE_DELAY_MS = LABEL_DELAY_MS + CARDS_SETTLE_GAP_MS;
export const CARD_DURATION_MS = 300;
export const CARD_STAGGER_MAX_MS = 250;

// A destination's own cards (QuadrantDestinationView's DestinationCards) use
// the OLD work matrix's original, snappier timing instead of the above —
// 250ms + up to 350ms of stagger, firing independently of the line/label
// settling rather than chained behind it (matches ArticlesMatrix, index.tsx:
// `revealDelay = 250 + cardRevealDelays[index]`, cardRevealDelays random in
// [0, 350)).
export const DESTINATION_CARD_BASE_DELAY_MS = 250;
export const DESTINATION_CARD_STAGGER_MAX_MS = 350;
// How many fixed delay slots to generate up front (QuadrantSection owns
// this, see its own comment) — matches the old matrix's own behavior of
// randomizing the stagger ONCE per session (its cardRevealDelays is a
// useMemo with an empty dep array) rather than re-rolling on every visit.
// Sized to the largest card set across all 4 destinations (currently
// "work"'s 6 articles) with a little headroom.
export const DESTINATION_CARD_DELAY_SLOTS = 8;
// The worst-case total time for a stop's whole entrance (line + label + the
// last-staggered card) to finish settling. QuadrantSection's click-jump uses
// this to know how long to keep its CSS-animated override active before
// silently handing control back to continuous scroll-tracking.
export const FULL_SETTLE_MS = CARDS_BASE_DELAY_MS + CARD_DURATION_MS + CARD_STAGGER_MAX_MS;

// Exit choreography is the mirror image of the entrance above, but faster and
// undelayed: once you start scrolling away from a stop, its cards shouldn't
// still be sitting there fully visible while the line is already moving to
// the next one — they should start disappearing immediately, each on its own
// short randomized stagger (scattered order, same idea as the entrance, just
// compressed) rather than all vanishing in lockstep.
export const EXIT_DURATION_MS = 200;
export const EXIT_STAGGER_MAX_MS = 150;

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
  hhi: { top: "PHYSICAL", bottom: "DIGITAL", left: "IMPROMPTU", right: "DESIGNED" },
  "help-others": { top: "INDIVIDUAL", bottom: "COMMUNITY", left: "ONLINE", right: "IN-PERSON" },
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
  onClick?: () => void; // custom handler (route nav, etc.) — takes priority over slug
  // A genuinely external URL — renders as a real `<a target="_blank">`
  // instead of a button-with-onClick, so the site's existing cursor rules
  // (styles.css `a[target="_blank"]` / per-domain variants like LinkedIn's)
  // apply automatically on hover, same as any other external link on the
  // site. Takes priority over both onClick and slug.
  externalLink?: string;
  // A prototype/concept with no real page built yet — opens the same
  // CardModal as `slug` would, but rendering this text (plus `thumbnail` as
  // an image) directly instead of loading a page in an iframe. Takes
  // priority over onClick and slug, but not externalLink.
  description?: string;
  // Shown on the cursor-tracking crosshair lines while this card is hovered
  // (same technique as the original work matrix's pillarTheme/workType hover
  // labels). Optional — quadrants without this kind of axis data just show
  // no label on hover.
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export const SELF_UNDERSTANDING_CARDS: DestinationCard[] = [
  { title: "Digital Twin", x: 0.32, y: 0.45, comingSoon: true },
  {
    title: "Affinity Clustering Wall",
    x: 0.52, y: 0.6,
    thumbnail: "/articles/affinity-clustering-wall-thumb.png",
    externalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7515069508798189569/",
  },
  {
    title: "/question-me",
    x: 0.72, y: 0.4,
    thumbnail: "/articles/aios-thumb.png",
    externalLink: "https://www.figma.com/deck/XrETQCua0LT0bqdg8POEw5/Untitled?node-id=1-103&t=hHlDkVSRk3YmBUV9-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
];

export const HHI_CARDS: DestinationCard[] = [
  {
    title: "Catch Up",
    x: 0.28, y: 0.65,
    thumbnail: "/articles/meet-stranger-calendly.png",
    externalLink: "https://calendly.com/qiyuhu/new-meeting",
  },
  { title: "Give a Stranger a Flower", x: 0.52, y: 0.42, comingSoon: true },
  // `slug` (not a custom onClick) — routes through the same onCardClick ->
  // CardModal path every other real card uses, instead of navigating
  // straight to /hello-humans the way this one used to.
  { title: "Hello Humans Table Stand", x: 0.75, y: 0.3, thumbnail: "/articles/hello-humans-notebook.jpg", slug: "hello-humans" },
];

export const HELP_OTHERS_CARDS: DestinationCard[] = [
  {
    title: "Friends' Marketplace",
    x: 0.5, y: 0.4,
    thumbnail: "/articles/friends-marketplace-thumb.png",
    description: "My intention is for friends to share their own \"prompt shortcuts\" with each other — this one's still in the prototyping stage.",
  },
  { title: "Events I've Hosted @ Apple", x: 0.8, y: 0.7, thumbnail: "/articles/events-thumb.svg", comingSoon: true },
  {
    title: "Snack Website",
    x: 0.3, y: 0.3,
    thumbnail: "/articles/snack-website-thumb.png",
    comingSoon: true,
  },
];

export function getReflectionCards(navigate: (opts: { to: string }) => void): DestinationCard[] {
  return [
    { title: "Reflection Notes", x: 0.35, y: 0.38, onClick: () => navigate({ to: "/reflection-notes" }) },
  ];
}
