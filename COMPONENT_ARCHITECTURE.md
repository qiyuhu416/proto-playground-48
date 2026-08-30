# Component Architecture: How Templates Work

Understanding how styling templates are applied and what happens when you change them.

---

## **Current Status: NOT FULLY APPLIED**

### **Articles Using New Template System ✅**
```
✅ designing-for-conversations-that-earn-trust
✅ physical-ai
```

**These 2 articles:**
- Use `<ArticleContent>` wrapper
- Use `<ArticleHeading2>` / `<ArticleHeading3>`
- Use `<Accordion>` for Process
- Use `<HighlightedText>` for key phrases
- Get styling from components (NOT hardcoded)

### **Articles NOT Using Template System ❌**
```
❌ google-cloud
❌ a2ui-generative
❌ claude-code-research
❌ design-as-a-research-tool
❌ designing-next-gen-ai-products
❌ making-design-fun
❌ personalization
❌ proactive
❌ reimagining-the-chatbot
❌ what-do-prototypes-prototype
❌ hello-humans
```

**These 10+ articles:**
- Use plain `<div className="prose prose-neutral">` wrapper
- Use plain `<h2>` and `<h3>` tags (hardcoded inline classes)
- No `<Accordion>`
- No `<HighlightedText>`
- Styling IS hardcoded in each article file

---

## **Is It Hardcoded? 🤔**

### **Articles Using Components (NOT Hardcoded) ✅**

**designing-for-conversations-that-earn-trust.tsx:**
```tsx
import { ArticleContent, ArticleHeading2, ArticleHeading3, HighlightedText } from "@/components/ArticleContent";

<ArticleContent>
  <ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>
  <p>...</p>
</ArticleContent>
```

**Styling lives here:**
```
src/components/ArticleContent.tsx
├─ ArticleContent wrapper (max-w-3xl, font, padding, mb-8 spacing)
├─ ArticleHeading2 (text-3xl, font-calendas, mt-20 mb-8)
├─ ArticleHeading3 (text-2xl, font-overusedGrotesk, mt-12 mb-6)
└─ HighlightedText (animation + highlight color)
```

✅ **Advantages:**
- Change 1 component = all articles using it get updated
- Consistent styling across articles
- Easy to maintain
- Easy to update (DRY principle)

---

### **Articles Using Hardcoded Styles (Hardcoded) ❌**

**google-cloud.tsx:**
```tsx
<h2 id={sectionId("Context")} 
    className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">
    Context
</h2>
```

**Styling lives in the article file itself (duplicated in every article)**
```
google-cloud.tsx:    className="mt-20 mb-4 text-2xl font-semibold text-neutral-900"
a2ui-generative.tsx: className="mt-20 mb-4 text-2xl font-semibold text-neutral-900"
claude-code-research.tsx: className="mt-20 mb-4 text-2xl font-semibold text-neutral-900"
... (repeated 10+ times)
```

❌ **Disadvantages:**
- Same styles repeated in 10+ files
- Change needed? Update in 10+ places
- Risk of inconsistency
- Hard to maintain
- Violates DRY principle

---

## **What Happens When You Change Article Structure?**

### **Scenario 1: Change to Articles Using Components (AUTO-APPLIED ✅)**

**If you change ArticleContent.tsx:**
```tsx
// Before
export const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900 [&>p]:mb-8">
        {children}
      </div>
    </div>
  )
}

// After: Change paragraph spacing from mb-8 to mb-10
export const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="mx-auto px-6 md:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-3xl font-overusedGrotesk text-lg leading-8 text-neutral-900 [&>p]:mb-10">
        {children}
      </div>
    </div>
  )
}
```

**Result:**
- ✅ designing-for-conversations → Updated automatically
- ✅ physical-ai → Updated automatically
- 🔄 google-cloud, others → NOT affected (they don't use the component)

**Example: Change heading color from neutral-900 to neutral-800**
```tsx
// ArticleHeading2.tsx
<h2 id={id} className="text-3xl font-medium mt-20 mb-8 font-calendas tracking-tight text-neutral-800">
  {children}
</h2>
```

**Result:**
- ✅ designing-for-conversations → H2s change to neutral-800
- ✅ physical-ai → H2s change to neutral-800
- ❌ google-cloud → Still has hardcoded "text-neutral-900" (no change)

---

### **Scenario 2: Change to Hardcoded Articles (MANUAL UPDATE NEEDED ❌)**

**If you change google-cloud.tsx:**
```tsx
// Before
<h2 id={sectionId("Context")} 
    className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">
    Context
</h2>

// After: Want to change to text-neutral-800
<h2 id={sectionId("Context")} 
    className="mt-20 mb-4 text-2xl font-semibold text-neutral-800">
    Context
</h2>
```

**Result:**
- ✅ google-cloud → Changed manually
- ❌ a2ui-generative → Still has text-neutral-900
- ❌ claude-code-research → Still has text-neutral-900
- ❌ All other articles → Still have text-neutral-900

**You need to manually update 10+ files.**

---

## **The Dependency Graph**

### **Component-Based (Single Source of Truth) ✅**

```
ArticleContent.tsx (SINGLE SOURCE OF TRUTH)
  ├─ ArticleHeading2 class
  ├─ ArticleHeading3 class
  ├─ Paragraph mb-8 spacing
  └─ Strong tag highlight color

    ↓ Used by

designing-for-conversations.tsx (AUTO-UPDATED)
physical-ai.tsx (AUTO-UPDATED)
```

**Change ArticleContent.tsx → Both articles updated automatically**

---

### **Hardcoded (Duplicated Everywhere) ❌**

```
google-cloud.tsx
  └─ className="mt-20 mb-4 text-2xl font-semibold text-neutral-900" (COPY 1)

a2ui-generative.tsx
  └─ className="mt-20 mb-4 text-2xl font-semibold text-neutral-900" (COPY 2)

claude-code-research.tsx
  └─ className="mt-20 mb-4 text-2xl font-semibold text-neutral-900" (COPY 3)

... (repeated 10 more times)
```

**Change google-cloud.tsx → Only google-cloud changes, must manually update all others**

---

## **Visual Comparison**

### **Component-Based System (What We Want)**

```
Change 1 component ─→ ┌─────────────────┐
                      │ ArticleContent  │ ← Single source
                      └────────┬────────┘
                               │
                ┌──────────────┼──────────────┐
                ↓              ↓              ↓
            Article 1      Article 2     Article 3
           (auto-sync)    (auto-sync)   (auto-sync)
```

**Advantages:**
- 1 change = N articles updated
- Scales easily
- Maintainable

---

### **Hardcoded System (Current Legacy)**

```
Change Article 1 ──→ Article 1 (changed)
                     Article 2 (not affected) ❌
Change Article 2 ──→ Article 2 (changed)
                     Article 3 (not affected) ❌
Change Article 3 ──→ Article 3 (changed)
                     Article 1 & 2 (not affected) ❌
```

**Disadvantages:**
- 1 change = need to manually update 10+ articles
- Inconsistency risk
- Hard to scale

---

## **Current Styling Breakdown**

### **In ArticleContent.tsx (Component-based)**
```
ArticleContent
  - max-w-3xl (line width)
  - font-overusedGrotesk (font family)
  - text-lg (font size)
  - leading-8 (line height)
  - [&>p]:mb-8 (paragraph spacing - AUTO-APPLIED)
  - [&_strong]:bg-[hsl(25,90%,80%)] (bold highlights - AUTO-APPLIED)
  - [&_strong]:rounded-[0.3em] (corner radius)
  - [&_strong]:px-0.5 (padding)

ArticleHeading2
  - text-3xl (size)
  - font-calendas (font)
  - mt-20 mb-8 (spacing)

ArticleHeading3
  - text-2xl (size)
  - font-overusedGrotesk (font)
  - mt-12 mb-6 (spacing)

HighlightedText
  - hsl(25, 90%, 80%) (color)
  - Auto-playing animation
  - smooth spring transitions
```

### **In Individual Article Files (Hardcoded)**
```
google-cloud.tsx:
  className="mt-20 mb-4 text-2xl font-semibold text-neutral-900"
  └─ DUPLICATED in 10+ other files

a2ui-generative.tsx:
  className="mt-20 mb-4 text-2xl font-semibold text-neutral-900"
  └─ Same as above

... (pattern repeats 10+ times)
```

---

## **Answer to Your Question: AUTO-APPLIED?**

### **For articles using components: YES ✅**
```tsx
// Change this once...
export const ArticleHeading2 = ({ children, id }) => (
  <h2 className="text-3xl font-medium mt-20 mb-8 font-calendas">
    {children}
  </h2>
)

// ...and ALL articles using it auto-update
✅ designing-for-conversations → Updated
✅ physical-ai → Updated
```

### **For hardcoded articles: NO ❌**
```tsx
// Change one file...
<h2 className="mt-20 mb-4 text-2xl font-semibold text-neutral-900">Context</h2>

// ...doesn't affect others
❌ google-cloud → Changed
❌ a2ui-generative → NOT changed
❌ All others → NOT changed (need manual updates)
```

---

## **What This Means for Your Workflow**

### **Path Forward**

**Phase 1: Standardize Components (Already Started ✅)**
- ✅ Create ArticleContent, ArticleHeading2/3, Accordion, HighlightedText
- ✅ Apply to 2 core articles

**Phase 2: Migrate Legacy Articles (IN PROGRESS)**
- 🔄 Wrap legacy articles in ArticleContent
- 🔄 Replace h2/h3 tags with ArticleHeading2/3
- 🔄 Replace hardcoded classes with components

**Phase 3: Future-Proof (BENEFIT)**
- ⏳ Once migrated: All changes auto-apply
- ⏳ Easy to update site-wide styling
- ⏳ Consistent experience across portfolio

---

## **Example: What Happens If You Change Now**

### **Scenario: Want to change paragraph spacing from mb-8 to mb-12**

**IF articles use ArticleContent:**
```tsx
// Change 1 file
export const ArticleContent = ({ children }) => {
  return (
    <div className="... [&>p]:mb-12">  ← Change once
      {children}
    </div>
  )
}

✅ Result: 2 articles auto-updated (designing-for-conversations, physical-ai)
```

**IF articles use hardcoded classes:**
```tsx
// Change 10+ files
<p className="mb-8">...</p>  // google-cloud.tsx
<p className="mb-8">...</p>  // a2ui-generative.tsx
<p className="mb-8">...</p>  // claude-code-research.tsx
... (9 more files)

❌ Result: Must manually update each file one by one
```

---

## **Recommendation**

**To make changes auto-apply to ALL articles, you must:**

1. **Migrate all legacy articles to use ArticleContent component**
   - Wrap content in `<ArticleContent>`
   - Replace `<h2>` with `<ArticleHeading2>`
   - Replace `<h3>` with `<ArticleHeading3>`

2. **Then changes are automatic**
   - Edit ArticleContent.tsx once
   - All 15+ articles update immediately
   - No manual updates needed

---

## **Summary Table**

| Scenario | Articles Affected | Updates Needed | Status |
|----------|-------------------|----------------|--------|
| Change ArticleContent.tsx | designing-for-conversations, physical-ai | 0 (auto) | ✅ Works |
| Change google-cloud.tsx | Only google-cloud | 9 (manual) | ❌ Fragile |
| Migrate google-cloud to ArticleContent | All future changes | 0 (auto) | ✅ Better |
| Migrate all 10+ articles to ArticleContent | ALL changes auto-apply | 0 (auto) | ✅ Best |

**Bottom line:** Component-based = scalable. Hardcoded = maintenance nightmare.
