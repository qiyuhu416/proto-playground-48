import * as React from "react";
import { ArticleHeading2 } from "@/components/ArticleContent";

/**
 * Section — an optional heading followed by any blocks.
 * Mirrors the Figma component "Section": Heading · Show heading · Body slot.
 *
 * It renders NO wrapper element on purpose. ArticleContent styles paragraphs
 * with a direct-child rule ([&>p]:mb-8); a wrapping <section> would stop those
 * paragraphs being direct children and silently drop their spacing.
 * Pass `heading` to show the heading (omit it to hide it).
 */
export interface SectionProps {
  heading?: string;
  /** anchor id, used by the table-of-contents pill */
  id?: string;
  children: React.ReactNode;
}

export function Section({ heading, id, children }: SectionProps) {
  return (
    <>
      {heading && <ArticleHeading2 id={id}>{heading}</ArticleHeading2>}
      {children}
    </>
  );
}
