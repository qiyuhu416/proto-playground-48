import { TextHighlighter } from "@/components/TextHighlighter"

interface ArticleContentProps {
  children: React.ReactNode
}

export const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
      <div
        className="mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900 [&>p]:mb-8 [&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-[0.3em] [&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline"
      >
        {children}
      </div>
    </div>
  )
}

export const ArticleTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-5xl md:text-5xl font-medium mb-12 font-calendas tracking-tight text-neutral-900">
    {children}
  </h1>
)

export const ArticleParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="whitespace-break-spaces mb-8 text-base md:text-lg leading-8">
    {children}
  </p>
)

export const ArticleHeading2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="text-3xl font-medium mt-20 mb-8 font-calendas tracking-tight text-neutral-900">
    {children}
  </h2>
)

export const ArticleHeading3 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h3 id={id} className="text-2xl font-medium mt-12 mb-6 font-overusedGrotesk text-neutral-900">
    {children}
  </h3>
)

export const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <TextHighlighter
    triggerType="auto"
    direction="ltr"
    highlightColor="hsl(25, 90%, 80%)"
    className="inline rounded-[0.3em] px-0.5"
  >
    {children}
  </TextHighlighter>
)

// Usage example:
// <ArticleContent>
//   <ArticleTitle>Your Title</ArticleTitle>
//   <ArticleParagraph>
//     Some text with <HighlightedText>highlighted key phrase</HighlightedText> in it.
//   </ArticleParagraph>
// </ArticleContent>
