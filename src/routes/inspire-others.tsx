import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

// A real path-based deep link to the "help-others" quadrant — see
// grow-myself.tsx for how this works.
export const Route = createFileRoute("/inspire-others")({
  component: Index,
});
