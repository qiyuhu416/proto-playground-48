import { ReactNode } from "react";
import { ArticleContent } from "./ArticleContent";
import { cn } from "@/lib/utils";

/**
 * VARIANT SYSTEM
 *
 * Base template: ArticleContent (standard layout)
 * Variants: Extended versions for specific use cases
 *
 * Pattern: Inherit from base, override only what's needed
 */

// ============================================================================
// VARIANT 1: Wide Content (for articles with wide tables/diagrams)
// ============================================================================

interface ArticleContentWideProps {
  children: ReactNode;
  maxWidth?: string; // Override max-w-3xl with custom width
}

export const ArticleContentWide = ({
  children,
  maxWidth = "max-w-4xl" // One step wider than base
}: ArticleContentWideProps) => (
  <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
    <div
      className={cn(
        "mx-auto font-overusedGrotesk text-lg leading-8 text-neutral-900",
        "[&>p]:mb-8 [&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-[0.3em]",
        "[&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline",
        maxWidth
      )}
    >
      {children}
    </div>
  </div>
);

// ============================================================================
// VARIANT 2: Compact Content (for dense research/methodology articles)
// ============================================================================

interface ArticleContentCompactProps {
  children: ReactNode;
  paragraphSpacing?: string; // Override mb-8 with mb-6 or mb-4
}

export const ArticleContentCompact = ({
  children,
  paragraphSpacing = "[&>p]:mb-6" // Tighter spacing
}: ArticleContentCompactProps) => (
  <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
    <div
      className={cn(
        "mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900",
        paragraphSpacing,
        "[&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-[0.3em]",
        "[&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline"
      )}
    >
      {children}
    </div>
  </div>
);

// ============================================================================
// VARIANT 3: Narrative Content (for essay-style articles with italics/callouts)
// ============================================================================

interface ArticleContentNarrativeProps {
  children: ReactNode;
  highlightColor?: string; // Override highlight color
}

export const ArticleContentNarrative = ({
  children,
  highlightColor = "hsl(25, 90%, 80%)" // Keep default but make it customizable
}: ArticleContentNarrativeProps) => (
  <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
    <div
      className="mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900 [&>p]:mb-8 [&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-[0.3em] [&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline [&>em]:italic [&>em]:text-neutral-600"
    >
      {children}
    </div>
  </div>
);

// ============================================================================
// VARIANT 4: Heading with Custom Styling (for emphasis variations)
// ============================================================================

interface ArticleHeading2VariantProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "emphasized" | "subtle" | "large";
}

export const ArticleHeading2Variant = ({
  children,
  id,
  variant = "default"
}: ArticleHeading2VariantProps) => {
  const variants = {
    default: "text-3xl font-medium mt-20 mb-8 font-calendas tracking-tight text-neutral-900",
    emphasized: "text-3xl font-bold mt-20 mb-8 font-calendas tracking-tight text-neutral-900 border-l-4 border-neutral-300 pl-4",
    subtle: "text-2xl font-medium mt-16 mb-6 font-calendas tracking-tight text-neutral-600",
    large: "text-4xl font-medium mt-24 mb-10 font-calendas tracking-tight text-neutral-900"
  };

  return (
    <h2 id={id} className={variants[variant]}>
      {children}
    </h2>
  );
};

// ============================================================================
// VARIANT 5: Heading with Custom Styling (for subsection variations)
// ============================================================================

interface ArticleHeading3VariantProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "highlighted" | "numbered" | "subtle";
  number?: number;
}

export const ArticleHeading3Variant = ({
  children,
  id,
  variant = "default",
  number
}: ArticleHeading3VariantProps) => {
  const variants = {
    default: "text-2xl font-medium mt-12 mb-6 font-overusedGrotesk text-neutral-900",
    highlighted: "text-2xl font-medium mt-12 mb-6 font-overusedGrotesk text-neutral-900 bg-neutral-50 p-4 rounded-lg border-l-4 border-neutral-300",
    numbered: "text-2xl font-medium mt-12 mb-6 font-overusedGrotesk text-neutral-900 flex items-center gap-3 before:content-[attr(data-number)] before:w-8 before:h-8 before:bg-neutral-900 before:text-white before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-bold",
    subtle: "text-lg font-medium mt-8 mb-4 font-overusedGrotesk text-neutral-600 uppercase tracking-wide"
  };

  return (
    <h3
      id={id}
      className={variants[variant]}
      data-number={number}
    >
      {children}
    </h3>
  );
};

// ============================================================================
// VARIANT 6: Flexible Article Content (props-based customization)
// ============================================================================

interface ArticleContentCustomProps {
  children: ReactNode;
  maxWidth?: "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "max-w-5xl";
  fontSize?: "text-base" | "text-lg" | "text-xl";
  lineHeight?: "leading-6" | "leading-7" | "leading-8" | "leading-9";
  paragraphSpacing?: "mb-4" | "mb-6" | "mb-8" | "mb-10";
  font?: "font-overusedGrotesk" | "font-calendas" | "font-serif";
  highlightColor?: string;
  highlightOpacity?: "opacity-70" | "opacity-80" | "opacity-90" | "opacity-100";
}

export const ArticleContentCustom = ({
  children,
  maxWidth = "max-w-3xl",
  fontSize = "text-lg",
  lineHeight = "leading-8",
  paragraphSpacing = "mb-8",
  font = "font-overusedGrotesk",
  highlightColor = "hsl(25, 90%, 80%)",
  highlightOpacity = "opacity-100"
}: ArticleContentCustomProps) => (
  <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
    <div
      className={cn(
        "mx-auto",
        maxWidth,
        font,
        fontSize,
        lineHeight,
        "text-neutral-900",
        `[&>p]:${paragraphSpacing}`,
        `[&_strong]:bg-[${highlightColor}]`,
        `[&_strong]:${highlightOpacity}`,
        "[&_strong]:rounded-[0.3em] [&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline"
      )}
      style={{
        "--highlight-color": highlightColor
      } as React.CSSProperties}
    >
      {children}
    </div>
  </div>
);

// ============================================================================
// Usage Examples
// ============================================================================

/*
EXAMPLE 1: Wide content for tables/diagrams
────────────────────────────────────────────
<ArticleContentWide>
  <ArticleHeading2>Complex Diagram</ArticleHeading2>
  <LargeTable /> {/* Takes more space */}
</ArticleContentWide>

EXAMPLE 2: Compact content for dense research
────────────────────────────────────────────────
<ArticleContentCompact paragraphSpacing="[&>p]:mb-4">
  <ArticleHeading2>Dense Methodology</ArticleHeading2>
  <p>Lots of information packed closely...</p>
</ArticleContentCompact>

EXAMPLE 3: Emphasized section headings
──────────────────────────────────────
<ArticleHeading2Variant variant="emphasized">
  Critical Finding
</ArticleHeading2Variant>

EXAMPLE 4: Numbered subsections
────────────────────────────────
<ArticleHeading3Variant variant="numbered" number={1}>
  First Research Phase
</ArticleHeading3Variant>

EXAMPLE 5: Fully customized
─────────────────────────────
<ArticleContentCustom
  maxWidth="max-w-4xl"
  fontSize="text-base"
  lineHeight="leading-7"
  paragraphSpacing="mb-6"
  highlightColor="hsl(10, 90%, 85%)"
>
  Custom styled content...
</ArticleContentCustom>
*/
