import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Eyebrow — the small uppercase category label (Figma text style Label/eyebrow).
 * One rule: semibold, uppercase, 0.15em tracking, subtle-foreground colour.
 * `size` picks the step: xs (12px, default) or 2xs (10px micro label).
 * Pass `className` only to override the colour on a dark surface.
 */
const eyebrow = cva("font-semibold uppercase tracking-[0.15em] text-subtle-foreground", {
  variants: { size: { xs: "text-xs", "2xs": "text-2xs" } },
  defaultVariants: { size: "xs" },
});

export type EyebrowProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof eyebrow> & { as?: "span" | "p" | "div" };

export function Eyebrow({ as: Tag = "span", size, className, ...props }: EyebrowProps) {
  return <Tag className={cn(eyebrow({ size }), className)} {...props} />;
}
