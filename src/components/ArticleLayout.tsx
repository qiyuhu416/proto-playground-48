import { ReactNode } from "react"

// The modal page shell. There is ONE column width (max-w-3xl, 768px) — text,
// panels and lists all live in it. Media may break out of it (see
// system/Media and system/Carousel); the root is a size container (`@container`)
// so those blocks can size themselves against the modal's width with `cqw` units.
interface ArticleLayoutProps {
  children: ReactNode
  /** short content: don't force a full-screen height (inline description modals) */
  short?: boolean
  /** the page opens with a cover image: only a small gap above it (see below) */
  cover?: boolean
}

export function ArticleLayout({ children, short = false, cover = false }: ArticleLayoutProps) {
  return (
    <div className={`@container ${short ? "" : "min-h-screen"} bg-background text-foreground`}>
      {/* Space above the first thing: 48px normally. With a cover image only a small gap —
          24px, shrinking with the modal width (16px, then 12px) — matching Figma's
          layout/cover-top-gap variable (Desktop 24 · Tablet 16 · Mobile 12). */}
      <article className={`mx-auto max-w-3xl px-6 pb-12 ${cover ? "pt-3 @md:pt-4 @3xl:pt-6" : "pt-12"}`}>
        {children}
      </article>
    </div>
  )
}
