# Variant Pattern System

How to inherit from the base template while customizing specific parts for different article types.

---

## **🎯 Core Concept**

```
Base Template (ArticleContent)
        ↓
   Inherits from
        ↓
┌──────────┬──────────┬──────────┬──────────┐
│ Variant1 │ Variant2 │ Variant3 │ Variant4 │
│  (Wide)  │(Compact) │(Custom)  │(Emphasis)│
└──────────┴──────────┴──────────┴──────────┘
```

**Benefits:**
- All variants inherit base styling (spacing, fonts, highlights)
- Each variant overrides only what it needs
- Changes to base template auto-apply to all variants
- No duplication of styling logic

---

## **📋 Available Variants**

### **Variant 1: WIDE Content**

**When to use:**
- Articles with wide tables
- Complex diagrams that need space
- Multi-column layouts
- Data visualizations

**What it changes:**
- `max-w-3xl` → `max-w-4xl` (wider layout)
- Inherits everything else from base

**Usage:**
```tsx
import { ArticleContentWide } from "@/components/ArticleVariants";

<ArticleContentWide>
  <ArticleHeading2>Complex Data</ArticleHeading2>
  <LargeTable /> {/* Now has more breathing room */}
</ArticleContentWide>
```

**Example articles:**
- `design-as-a-research-tool.tsx` (has multiple wide images)
- `google-cloud.tsx` (has prototype showcases)

---

### **Variant 2: COMPACT Content**

**When to use:**
- Dense research/methodology articles
- Essay-style content
- Minimal whitespace feel
- Lots of paragraphs, less images

**What it changes:**
- `[&>p]:mb-8` → `[&>p]:mb-6` (tighter spacing)
- Inherits everything else from base

**Usage:**
```tsx
import { ArticleContentCompact } from "@/components/ArticleVariants";

<ArticleContentCompact paragraphSpacing="[&>p]:mb-4">
  <ArticleHeading2>Dense Content</ArticleHeading2>
  <p>First paragraph...</p>
  <p>Second paragraph...</p>
  <p>Third paragraph...</p>
</ArticleContentCompact>
```

**Example articles:**
- `claude-code-research.tsx` (essay format)
- `personalization.tsx` (conceptual)

---

### **Variant 3: HEADING with Emphasis**

**When to use:**
- Highlight critical sections
- Differentiate section importance
- Create visual hierarchy for skimming

**Variants:**
```tsx
// Default (standard)
<ArticleHeading2Variant>Section Title</ArticleHeading2Variant>

// Emphasized (with left border + bold)
<ArticleHeading2Variant variant="emphasized">
  Critical Finding
</ArticleHeading2Variant>

// Subtle (smaller, lighter)
<ArticleHeading2Variant variant="subtle">
  Related Note
</ArticleHeading2Variant>

// Large (bigger, more prominent)
<ArticleHeading2Variant variant="large">
  Major Section
</ArticleHeading2Variant>
```

**Example usage:**
```tsx
<ArticleContent>
  <ArticleHeading2Variant variant="default">
    Context
  </ArticleHeading2Variant>
  <p>Standard content...</p>

  <ArticleHeading2Variant variant="emphasized">
    Critical Finding
  </ArticleHeading2Variant>
  <p>This part is really important...</p>

  <ArticleHeading2Variant variant="subtle">
    Related observation
  </ArticleHeading2Variant>
  <p>Minor point...</p>
</ArticleContent>
```

---

### **Variant 4: SUBSECTION with Styles**

**When to use:**
- Different types of subsections need different looks
- Numbered methodologies
- Highlighted callout sections

**Variants:**
```tsx
// Default (standard)
<ArticleHeading3Variant>Subsection</ArticleHeading3Variant>

// Highlighted (with background box)
<ArticleHeading3Variant variant="highlighted">
  Important Subsection
</ArticleHeading3Variant>

// Numbered (with numbered circle)
<ArticleHeading3Variant variant="numbered" number={1}>
  Step One
</ArticleHeading3Variant>

// Subtle (smaller, uppercase)
<ArticleHeading3Variant variant="subtle">
  Minor subsection
</ArticleHeading3Variant>
```

**Example usage:**
```tsx
<ArticleContent>
  <ArticleHeading2>Process</ArticleHeading2>
  
  <ArticleHeading3Variant variant="numbered" number={1}>
    Research Phase
  </ArticleHeading3Variant>
  <p>We researched...</p>

  <ArticleHeading3Variant variant="numbered" number={2}>
    Design Phase
  </ArticleHeading3Variant>
  <p>We designed...</p>

  <ArticleHeading3Variant variant="highlighted">
    Key Finding
  </ArticleHeading3Variant>
  <p>Important discovery...</p>
</ArticleContent>
```

---

### **Variant 5: FULLY CUSTOM**

**When to use:**
- Article needs completely custom styling
- Multiple customizations needed
- Future-proofing for new requirements

**Props you can customize:**
```tsx
<ArticleContentCustom
  maxWidth="max-w-4xl"           // Line length
  fontSize="text-base"            // Font size
  lineHeight="leading-7"          // Line spacing
  paragraphSpacing="mb-6"         // Gap between paragraphs
  font="font-calendas"            // Font family
  highlightColor="hsl(10, 90%, 85%)"  // Highlight color
  highlightOpacity="opacity-90"   // Opacity level
>
  Fully customized content...
</ArticleContentCustom>
```

**Example usage:**
```tsx
// Smaller, tighter article (like a sidebar note)
<ArticleContentCustom
  maxWidth="max-w-2xl"
  fontSize="text-sm"
  lineHeight="leading-6"
  paragraphSpacing="mb-4"
>
  Compact sidebar content...
</ArticleContentCustom>

// Larger, more spacious article (for emphasis)
<ArticleContentCustom
  maxWidth="max-w-5xl"
  fontSize="text-xl"
  lineHeight="leading-9"
  paragraphSpacing="mb-10"
>
  Large, spacious article...
</ArticleContentCustom>
```

---

## **🔄 How Variants Inherit from Base**

### **What STAYS the same (inherited):**
```
✅ Font family (unless overridden)
✅ Text color (neutral-900)
✅ Bold highlight styling
✅ Padding/margins structure
✅ Mobile responsiveness
✅ HighlightedText animations
```

### **What CAN be customized (variants):**
```
🔧 Max-width (line length)
🔧 Font size
🔧 Line height
🔧 Paragraph spacing
🔧 Heading emphasis
🔧 Highlight color
🔧 Heading size
```

---

## **📊 Variant Decision Tree**

```
Do you need custom styling?
│
├─ No → Use ArticleContent (base)
│  └─ Fast, simple, inherits all updates
│
└─ Yes → What type of customization?
   │
   ├─ Just wider/narrower layout?
   │  ├─ Wider → ArticleContentWide
   │  └─ Narrower → ArticleContentCompact
   │
   ├─ Just different heading styles?
   │  ├─ Heading emphasis → ArticleHeading2Variant
   │  └─ Numbered sections → ArticleHeading3Variant
   │
   ├─ Multiple customizations?
   │  └─ ArticleContentCustom (most flexible)
   │
   └─ Full custom control?
      └─ Create new variant (copy ArticleVariants.tsx pattern)
```

---

## **🛠️ Creating a New Variant**

If existing variants don't fit, create your own following the pattern:

```tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ArticleContentSpecialProps {
  children: ReactNode;
  // Add custom props here
  specialFeature?: boolean;
}

export const ArticleContentSpecial = ({
  children,
  specialFeature = false
}: ArticleContentSpecialProps) => (
  <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
    <div
      className={cn(
        // Start with base styling
        "mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900",
        // Inherit standard styling
        "[&>p]:mb-8 [&_strong]:bg-[hsl(25,90%,80%)] [&_strong]:rounded-[0.3em]",
        "[&_strong]:px-0.5 [&_strong]:font-medium [&_strong]:no-underline",
        // Add your custom styling
        specialFeature && "border-l-4 border-neutral-300 pl-6"
      )}
    >
      {children}
    </div>
  </div>
);
```

**Key pattern:**
1. Start with base classes
2. Add inherited styling from ArticleContent
3. Add your custom changes
4. Use `cn()` to conditionally apply styles

---

## **✅ Migration Strategy**

### **Step 1: Use base template (all articles)**
```tsx
import { ArticleContent } from "@/components/ArticleContent";

<ArticleContent>
  {/* All articles use this */}
</ArticleContent>
```

### **Step 2: Identify articles needing variants**
- `design-as-a-research-tool.tsx` → **ArticleContentWide** (wide tables)
- `google-cloud.tsx` → **ArticleContentWide** (prototypes)
- `personalization.tsx` → **ArticleContentCompact** (dense essay)
- `claude-code-research.tsx` → **ArticleContentCompact** (dense)

### **Step 3: Replace with appropriate variant**
```tsx
// Before
<ArticleContent>...</ArticleContent>

// After (if needs customization)
<ArticleContentWide>...</ArticleContentWide>
```

### **Step 4: Add variant styling where needed**
```tsx
// Before
<ArticleHeading2>Critical Finding</ArticleHeading2>

// After (if needs emphasis)
<ArticleHeading2Variant variant="emphasized">
  Critical Finding
</ArticleHeading2Variant>
```

---

## **🎯 Example: Full Article with Variants**

```tsx
import { ArticleContentWide } from "@/components/ArticleVariants";
import { ArticleHeading2Variant, ArticleHeading3Variant } from "@/components/ArticleVariants";
import { ArticleHeading2, ArticleHeading3 } from "@/components/ArticleContent";

function ArticleComponent() {
  return (
    <ArticleContentWide> {/* Wider for tables */}
      
      <ArticleHeading2Variant variant="large">
        Complex Project
      </ArticleHeading2Variant>

      <ArticleHeading2>Context</ArticleHeading2>
      <p>Standard content...</p>

      <ArticleHeading2>Process</ArticleHeading2>
      
      <ArticleHeading3Variant variant="numbered" number={1}>
        Research Phase
      </ArticleHeading3Variant>
      <p>We researched...</p>
      <LargeTable /> {/* Has more space now with ArticleContentWide */}

      <ArticleHeading3Variant variant="numbered" number={2}>
        Design Phase
      </ArticleHeading3Variant>
      <p>We designed...</p>

      <ArticleHeading2Variant variant="emphasized">
        Critical Finding
      </ArticleHeading2Variant>
      <p>Important discovery...</p>

    </ArticleContentWide>
  );
}
```

---

## **Key Principles**

1. **Inheritance:** All variants inherit base template styling
2. **Override selectively:** Only change what's needed
3. **Single source of truth:** Base template changes auto-apply to variants
4. **Composition:** Mix variants (use Wide + Numbered subsections together)
5. **Scalability:** New articles can use variants immediately

---

## **Updating Base Template Affects All**

```
CHANGE ArticleContent.tsx
    ↓
    ├─→ ArticleContent (direct users) ✅ auto-sync
    ├─→ ArticleContentWide (inherits) ✅ auto-sync
    ├─→ ArticleContentCompact (inherits) ✅ auto-sync
    ├─→ ArticleContentCustom (inherits) ✅ auto-sync
    └─→ ArticleHeading2Variant (inherits) ✅ auto-sync
```

**One change = All variants updated automatically!**
