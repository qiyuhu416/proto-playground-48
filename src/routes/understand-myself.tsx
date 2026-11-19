import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

// A real path-based deep link to the "reflection" quadrant — see
// grow-myself.tsx for how this works.
export const Route = createFileRoute("/understand-myself")({
  component: Index,
});
