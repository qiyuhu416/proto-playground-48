import { TextHighlighter } from "@/components/TextHighlighter"
import { Accordion } from "@/components/Accordion"
import { ReactNode, useState } from "react"

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

// ============================================================================
// SECTION-SPECIFIC COMPONENTS (WITH BUILT-IN PATTERNS)
// ============================================================================

interface ProcessSectionItem {
  title: string;
  children: ReactNode;
}

interface ProcessSectionProps {
  id?: string;
  items: ProcessSectionItem[];
}

export const ProcessSection = ({ id, items }: ProcessSectionProps) => (
  <>
    <ArticleHeading2 id={id}>My Role & Research Process</ArticleHeading2>
    <Accordion items={items} />
  </>
)

interface OutcomeTab {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

interface OutcomeSectionProps {
  id?: string;
  tabs: OutcomeTab[];
  title?: string;
}

export const OutcomeSection = ({ id, tabs, title = "Outcome" }: OutcomeSectionProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <>
      <ArticleHeading2 id={id}>{title}</ArticleHeading2>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <div className="font-semibold">{tab.title}</div>
            {tab.subtitle && <div className="text-xs text-neutral-500 mt-1">{tab.subtitle}</div>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {tabs.map((tab) => (
          activeTab === tab.id && (
            <div key={tab.id} className="space-y-4">
              {tab.children}
            </div>
          )
        ))}
      </div>
    </>
  )
}

// Usage example:
// <ArticleContent>
//   <ArticleTitle>Your Title</ArticleTitle>
//   <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>
//   <p>Introduction...</p>
//
//   <OutcomeSection
//     id={sectionId("Outcome")}
//     tabs={[
//       { id: "result1", title: "First Result", children: <p>...</p> },
//       { id: "result2", title: "Second Result", children: <p>...</p> },
//     ]}
//   />
//
//   <ProcessSection
//     id={sectionId("Process")}
//     items={[
//       { title: "1. Research", children: <p>...</p> },
//       { title: "2. Design", children: <p>...</p> },
//       { title: "3. Testing", children: <p>...</p> },
//     ]}
//   />
// </ArticleContent>
