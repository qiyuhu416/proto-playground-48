// Card/bracket/axis data for QuadrantSection's destination stops — kept here
// once instead of hand-authored per stop.

export type QuadrantId = "work" | "hhi" | "help-others" | "reflection";

// Deep-link slugs — match the quadrants' own canonical Overview labels
// (QuadrantSection's OVERVIEW_LABELS: "Grow myself" / "Understand Humans" /
// "Inspire Others" / "Understand myself"), lowercased/hyphenated, so a URL
// like "/?q=inspire-others" reads the same as the label the quadrant already
// shows itself. QuadrantSection reads `q` on mount to jump straight there,
// and keeps it in sync (replacing, not pushing) as you navigate.
export const QUADRANT_SLUGS: Record<QuadrantId, string> = {
  work: "grow-myself",
  hhi: "understand-humans",
  "help-others": "inspire-others",
  reflection: "understand-myself",
};

export const SLUG_TO_QUADRANT: Record<string, QuadrantId> = Object.fromEntries(
  Object.entries(QUADRANT_SLUGS).map(([quadrant, slug]) => [slug, quadrant as QuadrantId])
);

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

// The one shared position the LinkedIn badge ever rests at whenever it's
// tied to a quadrant — both QuadrantSection's own hover-preview (hovering a
// matrix card, before clicking in) and NavbarWrapper's persistent badge
// (once actually in that quadrant) read this SAME constant, so the preview
// shows the badge settling exactly where it'll actually end up, and neither
// call site can drift out of sync with the other by hand-tuning its own
// copy of these numbers. Top-right corner, but inset further than EDGE on
// both sides — lower than the bracket line's own top margin and further in
// from the right edge than the matching bottom-left inset — so the badge
// reads as its own element floating near the corner rather than flush
// against it.
export const BADGE_POSITION = { top: EDGE + 40, right: EDGE + 24, transform: "translateY(-50%)" } as const;

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
  work: { top: "Screen-less", bottom: "On-screen", left: "PRODUCTION", right: "FUTURE CONCEPTS" },
  hhi: { top: "PHYSICAL", bottom: "DIGITAL", left: "IMPROMPTU", right: "DESIGNED" },
  "help-others": { top: "INDIVIDUAL", bottom: "COMMUNITY", left: "ONLINE", right: "IN-PERSON" },
  reflection: { top: "PRIVATE", bottom: "SHARED", left: "PAST", right: "PRESENT" },
};

// The "work" quadrant's two tabs plot cards against different axes
// (Augment Capability: production-stage x pillarTheme y; Break the Rule:
// disDISCOMFORT-level x, target-audience-size y) — so its idle (nothing hovered)
// axis-end words need to be its own set, not AXIS_LABELS.work's. Generalized
// versions of the same per-card yAxisLabel/xAxisLabel text a hovered card
// swaps in (e.g. "N(human) = 2", "DISCOMFORT LEVEL: 90%"), so idle and
// hover read as the same axis, not two unrelated labeling schemes.
export const WORK_SELF_AXIS_LABELS = { top: "Many people", bottom: "One person", left: "UNDISCOMFORTABLE", right: "DISCOMFORTABLE" };

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
  // an image, or `video` below) directly instead of loading a page in an
  // iframe. Takes priority over onClick and slug, but not externalLink.
  description?: string;
  // A screen recording shown in the description modal INSTEAD of
  // `thumbnail` (when both are set, video wins) — for a prototype that's
  // easier to show working than to show a single static frame of.
  video?: string;
  // Rendered after the description text as a system/Carousel (one slide at
  // a time, swipeable) — for a multi-step flow, or just several standalone
  // snapshots, where a single image/video isn't enough to carry it.
  gallery?: { src: string; caption: string }[];
  // Shown on the cursor-tracking crosshair lines while this card is hovered
  // (same technique as the original work matrix's pillarTheme/workType hover
  // labels). Optional — quadrants without this kind of axis data just show
  // no label on hover.
  yAxisLabel?: string;
  xAxisLabel?: string;
  // A different-looking card: a dark tile with this quote text shown
  // directly on it, in place of the usual thumbnail/"coming soon" square —
  // for a card that's more of a standalone statement than a prototype
  // preview. Doesn't change its click behavior — still goes through
  // whichever of externalLink/description/onClick/slug is actually set.
  quote?: string;
  // Swaps the plain dark quote tile above for a circular ring of `quote`'s
  // characters rotating around a center icon (hover swaps which of two
  // arrow icons shows). Requires `quote` — ignored without it.
  spinningQuote?: boolean;
}

export const SELF_UNDERSTANDING_CARDS: DestinationCard[] = [
  // {
  //   title: "Throw It at the Wall",
  //   x: 0.52, y: 0.6,
  //   thumbnail: "/articles/affinity-clustering-wall-thumb.png",
  //   description:
  //     "I know I have many AI stuffs, but technology is NEVER the only solution when it comes to solving human problems. I am trying to solve the problem of ”what's on my mind“ by using 2 walls in my place. /n Wall 1 is the Affinity Clustering Wall, where I jot down things I observed/ do/ think and cluster them. Wall 2 is much less organized, I just stick whatever ideas I have so I won't lose them (e.g. What if my trash bag could resize itself based on how much trash I have）",
  // },
  {
    title: "Cut to the Chase",
    subtitle: "Rational v.s. Irrational Self",
    x: 0.50, y: 0.65,
    yAxisLabel: "N(human) = 1",
    xAxisLabel: "DISCOMFORT LEVEL: 78%",
    thumbnail: "/articles/aios-thumb.png",
    externalLink: "https://www.figma.com/deck/XrETQCua0LT0bqdg8POEw5/Untitled?node-id=1-103&t=hHlDkVSRk3YmBUV9-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
  {
    title: "Ask Harsh Questions",
    subtitle: "Extra Deep Self-Reflection",
    x: 0.72, y: 0.65,
    yAxisLabel: "N(human) = 1",
    xAxisLabel: "DISCOMFORT LEVEL: 84%",
    // TODO: video — recording at ~/Desktop/Screen Recording 2026-11-12 at
    // 3.24.28 PM.mov isn't reachable yet (macOS Desktop-folder privacy; this
    // session can reach Desktop/JOB/❤️portfolio/ but not the Desktop root
    // directly). Add `video: "/articles/ask-harsh-questions-demo.mp4"` here
    // once the file's been moved somewhere reachable and processed.
    description:
      "I built this one (I call it Inquiry) because I kept noticing AI tools jump to conclusions about what I \"really mean\" way too fast — one message in, and it's already confidently handing my own motive back to me. So the whole thing is built around one rule: AI can help me dig into what actually matters to me, through my own writing, but I'M still the one who decides what that writing means. Not the AI.\n\nThe hard part: what I actually need almost never shows up as one clean sentence. It shows up in repeated words, specific moments, the choices I keep making, contradictions I don't notice, the times I quietly change my mind. Just asking \"what do you really want\" gets me an idealized answer back. Having AI announce my \"hidden motive\" shuts the investigation down too early. And normal chat makes it worse — my own thinking gets fragmented across a dozen back-and-forth messages, so I can never actually see how my understanding developed, or go back and revise something I said three messages ago.\n\nSo instead: it's a document, not a chat. I write wherever, revise whenever, connect ideas without following some rigid question list — AI only steps in when I actually ask it to review. Feedback shows up right next to whatever it's about (highlight a passage, get a question on that passage; general stuff shows up inline in the doc), so I can always trace exactly what my own words triggered.\n\nThe AI acts less like an oracle and more like a good qualitative interviewer. It notices patterns, connections, and tensions I've actually written — then asks about whichever one is most unresolved, instead of getting more \"confident\" about who I secretly am. And every earlier answer stays editable — changing one can reshape the rounds that came after it, because that's actually how understanding yourself works. The first answer was never supposed to be the final one.\n\nWhat's actually in it:\n– a big free-write space, no form fields\n– AI review only on-demand, never uninvited\n– visible commentary before every follow-up, so I know WHY it's asking\n– passage-specific + general questions, both living right in the doc\n– consistent multiple-choice / multi-select / free-text response formats\n– color coding so AI feedback, my active answers, and my regular writing never blur together\n– completed answers collapse into footnoted sentences (typed ones stay exactly as I wrote them)\n– footnotes + a Back button to reopen any past round\n– editable past answers that can regenerate later rounds, old version kept around\n– later rounds stay progressive — finished questions show up even while the rest is still generating\n\nEnd goal: a writing space where AI makes my own patterns easier to actually see — and every round leaves me with a better question to sit with, not a more confident answer about who I am.",
  },
  // Moved here from "Augment Capability" (MATRIX_ARTICLES, index.tsx) — same
  // slug, so it still opens through the normal onCardClick -> CardModal
  // path, just reachable from this tab now instead of that one.
  {
    title: "AI= messsenger/ mediator/ caregiver..?",
    subtitle: "AI Caring Inst.",
    x: 0.16, y: 0.30,
    yAxisLabel: "N(human) > 2",
    xAxisLabel: "DISCOMFORT LEVEL: 16%",
    thumbnail: "/articles/conversation-trust-icon.svg",
    slug: "designing-for-conversations-that-earn-trust",
  },
  {
    title: "Don't answer me",
    subtitle: "Claude Code Skill",
    x: 0.32, y: 0.65,
    yAxisLabel: "N(human) = 1",
    xAxisLabel: "DISCOMFORT LEVEL: 32%",
    thumbnail: "/articles/teach-me-skill.jpg",
    description:
      "Challenge: Every time I asked Claude Code to fix something, I'd get a working patch — but I wasn't actually learning anything. I was just collecting fixes.\n\nBoundary I broke: the default AI-coding contract is ask → fix → move on, no memory of it afterward. I rebuilt that into a real teaching loop instead — a \"teach me\" mode that explains the thinking process (not just the fix), logs each exchange to a persistent memory file, and a /reflect skill that quizzes me on past sessions later. The AI isn't just doing the work anymore; it's keeping score on what I've actually retained.\n\nImpact: understanding compounds instead of evaporating. Patches used to disappear the moment the terminal scrolled past them — now every \"teach me\" question becomes something I can get re-quizzed on days later, so the knowledge actually sticks instead of just the code.",
  },
];

export const HHI_CARDS: DestinationCard[] = [
  {
    title: "Skip the Small Talk",
    subtitle: "Multimodal Convo",
    x: 0.28, y: 0.65,
    thumbnail: "/articles/meet-stranger-calendly.png",
    externalLink: "https://calendly.com/qiyuhu/new-meeting",
  },
  { title: "Break the Meaning", subtitle: "Give Strangers Flowers @AlamoSquare", x: 0.52, y: 0.42, comingSoon: true },
  // `slug` (not a custom onClick) — routes through the same onCardClick ->
  // CardModal path every other real card uses, instead of navigating
  // straight to /hello-humans the way this one used to.
  { title: "Break the Time Limit", subtitle: "Async Interaction @Apple", x: 0.75, y: 0.3, thumbnail: "/articles/hello-humans-notebook.jpg", slug: "hello-humans" },
  
  {
    title: "Break the Control",
    subtitle: "Let Strangers Decide Where to Go",
    x: 0.75, y: 0.68,
    description:
      "I ask a stranger where to go, then completely follow their suggestion — no matter where it leads. Full of randomness.",
  },
  // The "different style" card — a ring of rotating text around a center
  // icon (spinningQuote) instead of the plain dark quote tile, and
  // externalLink (not description) so it leads straight out to the Figma
  // board instead of opening the in-site modal. Short/punchy text, not the
  // full question — individual characters spaced around a circle read best
  // as a short phrase, not a long sentence.
  {
    title: "Assumptions I Wanna Break",
    x: 0.3, y: 0.3,
    quote: "ASSUMPTIONS I WANNA BREAK • ",
    spinningQuote: true,
    externalLink: "https://www.figma.com/board/XKmj67Wpwa2w24TS5NTT0B/mental-models-i-wanna-break?node-id=0-1&t=Tu57O9Wz6gbyT5ia-1",
  },
];

export const HELP_OTHERS_CARDS: DestinationCard[] = [
  {
    title: "Friends' Marketplace",
    x: 0.5, y: 0.4,
    thumbnail: "/articles/friends-marketplace-thumb.png",
    description: "My intention is for friends to share their own \"prompt shortcuts\" with each other — this one's still in the prototyping stage.",
  },
  {
    title: "Events I've Hosted @ Apple",
    x: 0.8, y: 0.7,
    thumbnail: "/articles/events-thumb.svg",
    description:
      "I like hosting these because nobody has to prepare anything — just show up, see what people are actually building/thinking about lately, and leave with something to steal. A few I've run:",
    gallery: [
      { src: "/articles/events-apple-1.jpg", caption: "Vibe Coding & Designing — an outdoor AP meetup for anyone using AI in design/dev. 22 people showed up." },
      { src: "/articles/events-apple-2.jpg", caption: "Claude Code Chat — a quick 30-min sync on what's new (agent teams, the AGUI concept) since things move so fast." },
      { src: "/articles/events-apple-3.jpg", caption: "Fun Projects Show and Tell — 5-min demos of whatever people vibe-coded for fun, doesn't have to be work-related." },
      { src: "/articles/events-apple-4.jpg", caption: "Where to Use AI and Where to NOT — an open chat on AI's limits, hallucinations, and when it actually helps vs. just feels easier." },
      { src: "/articles/events-apple-5.jpg", caption: "What's New, Lunch @ Alves — Tracy's idea for a recurring lunch just to talk about what's new in the market, no agenda." },
    ],
  },
  {
    title: "Snack Website",
    x: 0.3, y: 0.3,
    thumbnail: "/articles/snack-website-thumb.png",
    comingSoon: true,
  },
  {
    title: "Guest on a Podcast w/ Professors & Alumni",
    subtitle: "AI, PMs & Design Talk",
    x: 0.55, y: 0.78,
    thumbnail: "/articles/podcast-guest-cover.jpg",
    externalLink: "https://open.spotify.com/episode/5znzVbdH6O0krSQP5hfDTT",
  },
];

export function getReflectionCards(navigate: (opts: { to: string }) => void): DestinationCard[] {
  return [
    { title: "Reflection Notes", x: 0.35, y: 0.38, onClick: () => navigate({ to: "/reflection-notes" }) },
  ];
}
