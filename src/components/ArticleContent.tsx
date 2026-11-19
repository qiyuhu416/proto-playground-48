import { TextHighlighter } from "@/components/TextHighlighter"
import { Accordion } from "@/components/Accordion"
import { AnimatedTabs } from "@/components/AnimatedTabs"
import { ReactNode, useState } from "react"

import { Panel } from "@/components/system/Panel";
import { Media } from "@/components/system/Media";
import { Carousel } from "@/components/system/Carousel";
interface ArticleContentProps {
  children: React.ReactNode
}

export const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
      <div
        className={`mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-foreground [&>p]:mb-8 [&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-highlight [&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline`}
      >
        {children}
      </div>
    </div>
  )
}

export const ArticleTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-5xl md:text-5xl font-medium mb-12 font-calendas tracking-tight text-foreground">
    {children}
  </h1>
)

export const ArticleParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="whitespace-break-spaces mb-8 text-base md:text-lg leading-8">
    {children}
  </p>
)

export const ArticleHeading2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="text-3xl font-medium mt-20 mb-8 font-calendas tracking-tight text-foreground">
    {children}
  </h2>
)

export const ArticleHeading3 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h3 id={id} className="text-2xl font-semibold mt-12 mb-6 font-overusedGrotesk text-foreground">
    {children}
  </h3>
)

export const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <TextHighlighter
    triggerType="auto"
    direction="ltr"
    highlightColor="hsl(25, 90%, 80%)"
    className="inline rounded-highlight px-0.5"
  >
    {children}
  </TextHighlighter>
)

export const Bold = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold">{children}</span>
)

interface ContextBoxProps {
  summary: ReactNode;
  role?: string;
  duration?: string;
  team?: string;
}

export const ContextBox = ({ summary, role, duration, team }: ContextBoxProps) => (
  <Panel kind="context-box" className="my-8">
    <div className="mb-6 text-foreground">
      {summary}
    </div>
    {(role || duration || team) && (
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        {role && <li><Bold>Role:</Bold> {role}</li>}
        {duration && <li><Bold>Duration:</Bold> {duration}</li>}
        {team && <li><Bold>Team:</Bold> {team}</li>}
      </ul>
    )}
  </Panel>
)

// ============================================================================
// SECTION-SPECIFIC COMPONENTS (WITH BUILT-IN PATTERNS)
// ============================================================================

interface ProcessSectionItem {
  title: string;
  shortLabel?: string;
  children: ReactNode;
}

interface ProcessSectionProps {
  id?: string;
  items: ProcessSectionItem[];
  variant?: "tabs" | "accordion";
}

export const ProcessSection = ({ id, items, variant = "accordion" }: ProcessSectionProps) => {
  if (variant === "accordion") {
    return (
      <>
        <ArticleHeading2 id={id}>My Role & Research Process</ArticleHeading2>
        <Accordion
          items={items.map((item) => ({
            title: item.title,
            children: item.children,
          }))}
        />
      </>
    );
  }

  const animatedTabs = items.map((item) => ({
    id: item.title,
    label: item.shortLabel || item.title,
    content: (
      <div className="space-y-4">
        <Bold>{item.title}</Bold>
        {item.children}
      </div>
    ),
  }));

  return (
    <>
      <ArticleHeading2 id={id}>My Role & Research Process</ArticleHeading2>
      <AnimatedTabs tabs={animatedTabs} defaultTab={items[0]?.title} />
    </>
  )
}

interface OutcomeTab {
  id: string;
  title: string;
  shortLabel?: string;
  subtitle?: string;
  description?: string;
  src?: string;
  alt?: string;
  type?: "image" | "video";
  children: ReactNode;
}

interface OutcomeSectionProps {
  id?: string;
  tabs: OutcomeTab[];
  title?: string;
  /** carousel (default) — slides that scroll past the column; tabs — only for the AI Caring case study */
  variant?: "carousel" | "tabs";
  aspectRatio?: number | string;
}

export const OutcomeSection = ({ id, tabs, title = "Outcome", variant = "carousel", aspectRatio }: OutcomeSectionProps) => {
  if (variant === "carousel") {
    const slides = tabs.map((tab) => {
      const caption = (
        <>
          <Bold>{tab.title}</Bold>
          {tab.subtitle && <span className="block text-muted-foreground">{tab.subtitle}</span>}
          {tab.description && <span className="mt-1 block">{tab.description}</span>}
        </>
      );
      return {
        id: tab.id,
        content: tab.src ? (
          <>
            <Media
              src={tab.src}
              alt={tab.alt || tab.title}
              type={tab.type}
              aspectRatio={aspectRatio}
              caption={caption}
            />
            {tab.children && <div className="mt-4 space-y-4 text-base leading-7">{tab.children}</div>}
          </>
        ) : (
          // text-only slide: same width as a media slide, content in a card
          <Panel kind="card">
            <div className="space-y-4 text-base leading-7">
              <Bold>{tab.title}</Bold>
              {tab.subtitle && <p className="text-sm text-muted-foreground">{tab.subtitle}</p>}
              {tab.description && <p>{tab.description}</p>}
              {tab.children}
            </div>
          </Panel>
        ),
      };
    });

    return (
      <>
        <ArticleHeading2 id={id}>{title}</ArticleHeading2>
        <Carousel slides={slides} label={title} />
      </>
    );
  }

  const animatedTabs = tabs.map((tab) => ({
    id: tab.id,
    label: tab.shortLabel || tab.title,
    content: (
      <div className="space-y-6">
        {tab.src && (
          <div className="flex justify-center">
            <img
              src={tab.src}
              alt={tab.alt || tab.title}
              className="max-w-full h-auto rounded-lg"
              style={{
                aspectRatio: aspectRatio ? `${aspectRatio}` : "auto",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="space-y-4">
          <div>
            <Bold>{tab.title}</Bold>
            {tab.subtitle && <p className="text-sm text-muted-foreground mt-1">{tab.subtitle}</p>}
          </div>
          {tab.description && <p>{tab.description}</p>}
          {tab.children}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <ArticleHeading2 id={id}>{title}</ArticleHeading2>
      <AnimatedTabs tabs={animatedTabs} defaultTab={tabs[0]?.id} />
    </>
  )
}

// Usage example:
// <ArticleContent>
//   <ContextBox
//     summary={<p>Brief summary of what this project was and why it was special, pulled from full Context section.</p>}
//     role="UX Designer, owned all research and design"
//     duration="4 months"
//     team="1 senior designer, 1 UI designer, 1 engineer"
//   />
//
//   <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>
//   <p>Full context introduction paragraphs with detailed background...</p>
//
//   <DynamicIslandTOC />
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
