# Article Alignment Summary

## Overview
All primary articles (in the metrics) are now **aligned** in structure, styling, and width.

---

## ✅ Section Order Standardization

All articles now follow this structure:
```
ArticleHeader (cover image)
  ↓
ContextBox (summary + key facts: role, duration, team)
  ↓
ArticleContent
  1. Context heading + full narrative paragraphs
  2. DynamicIslandTOC
  3. Outcome (OutcomeSection with tabs)
  4. Process (ProcessSection with accordion)
  5. Additional sections (frameworks, insights, reflections)
```

### Verified Articles:
| Article | Context | Outcome | Process | Others | ✓ |
|---------|---------|---------|---------|--------|---|
| physical-ai | The Challenge | 3 tabs | 4 items | (none) | ✓ |
| google-cloud | Context | 3 tabs | 4 items | Impact & Outcomes | ✓ |
| design-as-a-research-tool | The Challenge | 2 tabs | 3 items | Findings, Frameworks, Reflections | ✓ |
| personalization | Context question | 3 tabs | (visual) | WhereNotToUseAI, Reflections | ✓ |
| making-design-fun | Philosophy + Curiosity | 4 tabs | (visual) | Tools, Playful design, Reflections | ✓ |

---

## ✅ Width Alignment

**ALL articles now use max-w-4xl (consistent)**

```tsx
<article className="mx-auto max-w-4xl px-6 py-12">
```

Fixed:
- ❌ personalization.tsx had max-w-2xl → ✅ Now max-w-4xl

---

## ✅ Styling Consistency

**All articles inherit from ArticleContent base:**

| Style Element | Value | Applied |
|---------------|-------|---------|
| Base wrapper | ArticleContent | All 5 ✓ |
| Main headings | ArticleHeading2 | All 5 ✓ |
| Body font | font-overusedGrotesk | All 5 ✓ |
| Heading font | font-calendas | All 5 ✓ |
| Bold/highlight color | hsl(25, 90%, 80%) | All 5 ✓ |
| Highlight opacity | solid | All 5 ✓ |
| Paragraph spacing | [&>p]:mb-8 | All 5 ✓ |
| Bold styling | rounded-[0.3em], px-0.5 | All 5 ✓ |

---

## 📦 ContextBox Component

**ContextBox** displays at the top of every article (right after cover image) with:
- Narrative summary paragraph (pulled from full Context section)
- Bullet points: Role, Duration, Team

```jsx
<ContextBox
  summary={<p>Brief summary of what this project was and why it was special.</p>}
  role="UX Designer, owned all research and design"
  duration="4 months"
  team="1 senior designer, 1 UI designer, 1 engineer"
/>
```

**Features:**
- ✅ Styled box with border (neutral-50 background, rounded corners)
- ✅ Narrative summary + metadata bullet points
- ✅ Positioned at top of article (right after ArticleHeader)
- ✅ Quick overview before diving into full Context section
- ✅ All fields optional (only renders what's provided)

**Styling:**
- bg-neutral-50 background
- border-neutral-200 
- Rounded corners, padding
- Bullet list for metadata

**Structure in article:**
```
ArticleHeader (cover image)
  ↓
ContextBox (summary + quick facts)
  ↓
ArticleContent
  ├─ Context section (full narrative)
  ├─ DynamicIslandTOC
  ├─ Outcome
  ├─ Process
  └─ Additional sections
```

---

## 🎨 Variant Approach (Option 2: Template + Variants)

### Base Template (Strict)
Used by case studies requiring standard structure:
- **Articles**: physical-ai, google-cloud
- **Structure**: Context → Outcome → Process (no variations)
- **Components**: ArticleContent + ProcessSection + OutcomeSection
- **Width**: max-w-4xl

### Variant: Research Article
Used by research-focused articles with additional sections:
- **Articles**: design-as-a-research-tool, personalization
- **Inherits from**: Base template styling (fonts, colors, spacing)
- **Adds**: Custom sections after Process (Frameworks, Insights, Reflections)
- **Flexibility**: Can have different subsection structures
- **Width**: max-w-4xl (inherited)

### Variant: Exploratory/Conceptual
Used by articles with multiple exploration paths:
- **Articles**: making-design-fun
- **Inherits from**: Base template styling
- **Adds**: Multiple intro sections, flexible spacing
- **Flexibility**: Can have visual components in place of traditional Process
- **Width**: max-w-4xl (inherited)

---

## 📋 Component Usage Matrix

| Component | physical-ai | google-cloud | design-as-research-tool | personalization | making-design-fun |
|-----------|-------------|--------------|-------------------------|-----------------|-------------------|
| ContextBox | (needs) | (needs) | (needs) | (needs) | (needs) |
| ArticleContent | ✓ | ✓ | ✓ | ✓ | ✓ |
| DynamicIslandTOC | ✓ | ✓ | ✓ | ✓ | ✓ |
| OutcomeSection | ✓ (3 tabs) | ✓ (3 tabs) | ✓ (2 tabs) | ✓ (3 tabs) | ✓ (4 tabs) |
| ProcessSection | ✓ (4 items) | ✓ (4 items) | ✓ (3 items) | — | — |
| HighlightedText | ✓ | ✓ | ✓ | ✓ | — |

---

## 🔄 Auto-Sync Benefits

**When ArticleContent is updated:**
- ✅ All 5 articles inherit new styling immediately
- ✅ No need to update individual articles
- ✅ Consistent visual language across portfolio
- ✅ ProcessSection changes apply to all articles using it
- ✅ OutcomeSection changes apply to all articles using it

---

## 📊 Summary

| Metric | Status | Details |
|--------|--------|---------|
| **Section Order** | ✅ Standardized | All follow Context → Outcome → Process → Others |
| **Width Alignment** | ✅ Consistent | All use max-w-4xl |
| **Styling** | ✅ Unified | ArticleContent + ArticleHeading2 + design system |
| **Components** | ✅ Structured | ProcessSection + OutcomeSection used appropriately |
| **Variants** | ✅ Documented | Base + Research Article + Exploratory variants |
| **Auto-sync** | ✅ Enabled | Changes to base template apply to all articles |

---

## Next Steps (When Ready)

1. Apply same structure to remaining Priority 2 articles
2. Document variant creation process in VARIANT_PATTERNS.md
3. Create examples of each variant type
4. Test that changes to base template sync correctly across all articles

