import { ReactNode } from "react"

interface ArticleLayoutProps {
  children: ReactNode
}

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        {children}
      </article>
    </div>
  )
}
