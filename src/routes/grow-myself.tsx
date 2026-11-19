import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

// A real path-based deep link to the "work" quadrant (QUADRANT_SLUGS in
// quadrantCards.ts), not a query param — renders the exact same page as "/"
// (Index itself reads the URL's own path on mount to decide which quadrant
// to jump straight to, see QuadrantSection's initial-jump effect).
export const Route = createFileRoute("/grow-myself")({
  component: Index,
});
