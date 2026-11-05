// The cursor-tracking crosshair (two lines, optionally a circle/arrow "back"
// marker) shared between every place in the quadrant system that tracks the
// mouse — originally built for QuadrantDestinationView's 4 destination
// pages, now also used by QuadrantSection's own full-matrix page, so both
// stay visually identical instead of two hand-maintained copies. Renders
// just the SVG marks (no <svg> wrapper of its own), so callers that need
// extra SVG children alongside it — QuadrantDestinationView adds
// hover-triggered axis-value text — can still share one <svg> element.
export function CursorCrosshairMarks({
  cursorPos,
  W,
  H,
  edge,
  active,
  clipToQuadrant = false,
  showMarker = true,
}: {
  cursorPos: { x: number; y: number };
  W: number;
  H: number;
  edge: number;
  active: boolean;
  // The matrix already has its own pair of quadrant-dividing lines through
  // the center — there, the tracking lines should stop at that divider
  // (the cursor's own quadrant) rather than sweeping the full page like
  // they do on a destination, which has no such divider to stop at.
  clipToQuadrant?: boolean;
  // The circle + back-arrow marker means "click to return to the matrix" —
  // true everywhere EXCEPT the matrix itself, where that affordance
  // wouldn't make sense (you're already there).
  showMarker?: boolean;
}) {
  const vY1 = clipToQuadrant ? (cursorPos.y < H / 2 ? edge : H / 2) : edge;
  const vY2 = clipToQuadrant ? (cursorPos.y < H / 2 ? H / 2 : H - edge) : H - edge;
  const hX1 = clipToQuadrant ? (cursorPos.x < W / 2 ? edge : W / 2) : edge;
  const hX2 = clipToQuadrant ? (cursorPos.x < W / 2 ? W / 2 : W - edge) : W - edge;
  return (
    <>
      <line x1={cursorPos.x} y1={vY1} x2={cursorPos.x} y2={vY2} stroke={active ? "#d32f2f" : "#b3b3b3"} strokeWidth="1.5" opacity={active ? 0.75 : 0.55} />
      <line x1={hX1} y1={cursorPos.y} x2={hX2} y2={cursorPos.y} stroke={active ? "#d32f2f" : "#b3b3b3"} strokeWidth="1.5" opacity={active ? 0.75 : 0.55} />
      {showMarker && (
        <>
          {/* Circle + a proper arrow (shaft + an L-shaped arrowhead at the
              tip, same construction as a standard "arrow-up-left" icon)
              pointing upper-left — reads as a "back" affordance: clicking a
              destination's open background returns to the matrix. */}
          <circle cx={cursorPos.x} cy={cursorPos.y} r="11" fill={active ? "#d32f2f" : "#ff9800"} />
          <path d={`M ${cursorPos.x + 4} ${cursorPos.y + 4} L ${cursorPos.x - 4} ${cursorPos.y - 4}`} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path
            d={`M ${cursorPos.x - 4} ${cursorPos.y + 4} L ${cursorPos.x - 4} ${cursorPos.y - 4} L ${cursorPos.x + 4} ${cursorPos.y - 4}`}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
    </>
  );
}
