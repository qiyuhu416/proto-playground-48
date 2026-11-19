import * as React from "react";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ArticleContent } from "@/components/ArticleContent";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";

/**
 * ModalLayout — the page that opens inside the modal shell.
 *
 * Mirrors the Figma component "Modal Layout":
 *   cover  Slot     optional full-bleed header, e.g. <ArticleHeader heroImage=… />
 *   toc    Boolean  show the floating table-of-contents pill
 *   short  Boolean  short content (inline description): no forced full-screen height
 *   children  Slot  a stack of <Section>s
 *
 *   <ModalLayout toc cover={<ArticleHeader … />}>
 *     <Section heading="Problem" id="problem">…</Section>
 *   </ModalLayout>
 *
 * Both ways a modal gets its content use this same layout: a project page
 * (rendered in an iframe) and an inline description (CardModal) — only the
 * delivery differs, never the look.
 */
export interface ModalLayoutProps {
  cover?: React.ReactNode;
  toc?: boolean;
  short?: boolean;
  children: React.ReactNode;
}

export function ModalLayout({ cover, toc = false, short = false, children }: ModalLayoutProps) {
  return (
    <ArticleLayout short={short} cover={!!cover}>
      {cover}
      <ArticleContent>
        {children}
        {/* The pill is position: fixed, so where it sits in the tree doesn't matter. */}
        {toc && <DynamicIslandTOC visible />}
      </ArticleContent>
    </ArticleLayout>
  );
}
