import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Panel — the one container surface of the design system.
 *
 * One rule for every kind: radius-xl, 24px padding, 1px border. Only the
 * surface (white vs tinted) and the optional elevation vary.
 * Prop names mirror the Figma component: Kind · Elevation.
 *
 *   <Panel kind="card">…</Panel>
 *   <Panel kind="callout" elevation="raised">…</Panel>
 *   <Panel kind="card" interactive>…</Panel>   // clickable: standard hover
 */
const panel = cva("rounded-xl border border-border p-6", {
  variants: {
    kind: {
      card: "bg-card",
      "context-box": "bg-muted/50",
      callout: "bg-muted/50",
    },
    elevation: {
      flat: "",
      raised: "shadow-sm",
    },
    // Clickable panels get the one standard hover: grow slightly, nothing else
    // (no overlay, no colour change).
    interactive: {
      true: "cursor-pointer transition-transform duration-150 hover:scale-105",
      false: "",
    },
  },
  defaultVariants: { kind: "card", elevation: "flat", interactive: false },
});

export type PanelProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof panel> & { as?: "div" | "section" | "aside" | "article" };

export function Panel({ as: Tag = "div", kind, elevation, interactive, className, ...props }: PanelProps) {
  return <Tag className={cn(panel({ kind, elevation, interactive }), className)} {...props} />;
}
