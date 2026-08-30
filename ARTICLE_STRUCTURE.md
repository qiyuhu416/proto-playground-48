# Article Structure Template

All articles should follow this standardized structure for consistency across the portfolio.

## Standard Article Sections

### 1. **Context** (Required)
- What was the project about?
- Who were you working with?
- What was the scope?

```tsx
<ArticleContent>
  <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>
  <p>...</p>
</ArticleContent>
```

### 2. **Problem** or **Challenge** (Recommended)
- What problem were you solving?
- Why did it matter?
- What were the constraints?

```tsx
<ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>
<p>...</p>
```

### 3. **Outcome** or **Solution** (Recommended)
- What did you create?
- What was the result?
- How did it solve the problem?

```tsx
<ArticleHeading2 id={sectionId("Outcome")}>Outcome</ArticleHeading2>
<p>...</p>
```

### 4. **Process** or **My Role & Research Process** (Recommended)
- How did you approach it?
- What methods did you use?
- How did you collaborate?

Use `<Accordion>` for subsections to keep it scannable:

```tsx
<ArticleHeading2 id={sectionId("Process")}>My Role & Research Process</ArticleHeading2>

<Accordion
  items={[
    {
      title: "1. First approach",
      children: <p>...</p>,
    },
    {
      title: "2. Second approach",
      children: <p>...</p>,
    },
  ]}
/>
```

### 5. **Reflections** or **Implications** (Optional)
- What did you learn?
- What would you do differently?
- What's the broader impact?

```tsx
<ArticleHeading2 id={sectionId("Reflections")}>To my future self</ArticleHeading2>
<p>...</p>
```

## Styling Rules

### Typography Hierarchy
```tsx
import { ArticleContent, ArticleHeading2, ArticleHeading3, HighlightedText } from "@/components/ArticleContent";

// Wrapped in ArticleContent - auto applies:
<ArticleContent>
  // Major section heading
  <ArticleHeading2 id={sectionId("Section")}>Section Title</ArticleHeading2>

  // Regular paragraph (auto gets mb-8 spacing)
  <p>Text with <strong>bold highlights</strong> and <HighlightedText>animated highlights</HighlightedText>.</p>

  // Subsection heading
  <ArticleHeading3>Subsection</ArticleHeading3>

  // Lists
  <ul className="list-disc pl-5 space-y-2 mb-6">
    <li>Item</li>
  </ul>

  <ol className="list-decimal pl-5 space-y-2 mb-6">
    <li>Item</li>
  </ol>
</ArticleContent>
```

### Emphasis Options
```tsx
// Option 1: Auto-highlighted bold (warm orange)
<strong>Important concept</strong>

// Option 2: Animated highlight with framer-motion
<HighlightedText>Key phrase with animation</HighlightedText>

// Option 3: Italic for definitions or asides
<em>italicized text</em>
```

## Template Article Structure

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { DynamicIslandTOC } from "@/components/DynamicIslandTOC";
import { ArticleHeader } from "./-ArticleHeader";
import { ARTICLE_META, sectionId } from "./-articleMeta";
import { ArticleContent, ArticleHeading2, ArticleHeading3, HighlightedText } from "@/components/ArticleContent";
import { Accordion } from "@/components/Accordion";

export const Route = createFileRoute("/article-slug")({
  head: () => ({
    meta: [
      { title: "Qiyu x [Topic]" },
      { name: "description", content: "..." },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        
        {/* Hero Section */}
        <ArticleHeader
          title={ARTICLE_META["slug"].title}
          meta="Project Type"
          heroImage="/articles/hero.png"
          heroAlt="Alt text"
        />

        {/* Table of Contents (Floating) */}
        <DynamicIslandTOC />

        {/* Main Content */}
        <ArticleContent>
          
          {/* Context Section */}
          <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>
          <p>Introduction and background...</p>

          {/* Problem Section */}
          <ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>
          <p>Problem statement...</p>

          {/* Outcome Section */}
          <ArticleHeading2 id={sectionId("Outcome")}>Outcome</ArticleHeading2>
          <p>Solution overview...</p>
          <ArticleHeading3>Key Result 1</ArticleHeading3>
          <p>Details...</p>

          {/* Process Section with Accordion */}
          <ArticleHeading2 id={sectionId("Process")}>My Role & Research Process</ArticleHeading2>
          <Accordion
            items={[
              {
                title: "1. First step",
                children: <p>Details about first step...</p>,
              },
              {
                title: "2. Second step",
                children: <p>Details about second step...</p>,
              },
            ]}
          />

          {/* Reflections Section */}
          <ArticleHeading2 id={sectionId("Reflections")}>To my future self</ArticleHeading2>
          <p>Reflection and learnings...</p>

        </ArticleContent>

      </article>
    </div>
  );
}
```

## Key Patterns

### Auto-applied Styling (no extra classes needed)
- All `<p>` tags get `mb-8` spacing automatically
- All `<strong>` tags become orange highlights
- All padding/margins handled by `ArticleContent` wrapper

### Spacing System
- Paragraph spacing: `mb-8` (2rem)
- H2 to content: `mt-20 mb-8` (5rem top, 2rem bottom)
- H3 to content: `mt-12 mb-6` (3rem top, 1.5rem bottom)

### When to Use Accordion
- When you have 3+ subsections under a parent heading
- Reduces cognitive load and page clutter
- Keeps the main narrative scannable
- Example: "Process" → "1. Desktop research", "2. Interviews", etc.

### When to Use Images
```tsx
<img
  src="/articles/image.png"
  alt="Descriptive alt text"
  className="w-full rounded-2xl my-8 border border-neutral-200"
/>
```

### Responsive Breakpoints
- Mobile-first by default
- Tailwind `md:` prefix for medium screens and up
- `ArticleContent` handles padding responsiveness
