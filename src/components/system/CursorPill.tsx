import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CursorPill — the dark pill that replaces the cursor while hovering something
 * clickable ("Grow myself ↗"). Position it with left/top + translate(-50%,-50%)
 * so it is centred exactly on the pointer.
 * tone="dark" (default) on light surfaces; tone="light" over a dark surface.
 *
 *   <CursorPill className="absolute z-50" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
 *     how I break the models
 *   </CursorPill>
 */
export function CursorPill({
  tone = "dark",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
        tone === "dark" ? "bg-foreground text-background" : "bg-background text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight className="size-3.5 shrink-0" />
    </div>
  );
}
