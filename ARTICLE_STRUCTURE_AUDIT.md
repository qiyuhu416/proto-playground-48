# Article Structure Audit

## Target Template Order
```
1. Context (problem setup, background)
2. Outcome (OutcomeSection with tabs)
3. Process (ProcessSection with accordion items)
4. Additional sections (insights, frameworks, reflections)
```

## Current State by Article

### ✅ physical-ai.tsx
- **Width**: max-w-4xl ✓
- **Section Order**: 
  1. Context (intro paragraphs)
  2. Outcome (OutcomeSection - 3 tabs) ✓
  3. Process (ProcessSection - 4 accordion items) ✓
- **Status**: CORRECT

### ✅ google-cloud.tsx
- **Width**: max-w-4xl ✓
- **Section Order**:
  1. Context
  2. Outcome (OutcomeSection - 3 tabs: Chatbot, Dynamic UI, Comparison) ✓
  3. Process (ProcessSection - 4 items) ✓
  4. Impact & Outcomes (additional)
- **Status**: CORRECT

### ⚠️ design-as-a-research-tool.tsx - NEEDS REORDERING
- **Width**: max-w-4xl ✓
- **Current Section Order**:
  1. The Challenge (Context) ✓
  2. **ProcessSection (lines 49-158)** ← MOVE TO #3
  3. What Design Revealed (lines 160-192) ← MOVE TO #4
  4. **OutcomeSection (lines 194-237)** ← MOVE TO #2
  5. Research Frameworks Used (lines 238-270) ← MOVE TO #5
  6. Why Design Was Essential (lines 271+) ← MOVE TO #6

- **Target Order**:
  1. The Challenge (Context)
  2. Outcome: From Research to Policy (OutcomeSection)
  3. My Role & Research Process (ProcessSection)
  4. What Design Revealed (insights section)
  5. Research Frameworks Used
  6. Why Design Was Essential (Reflections)

### ✅ personalization.tsx
- **Width**: max-w-2xl → max-w-4xl ✓ (FIXED)
- **Section Order**:
  1. So, what makes person a person? (Context)
  2. Person & personalization (OutcomeSection - 3 tabs) ✓
  3. WhereNotToUseAI (additional content)
  4. Humanity-centered Design (Reflections)
- **Status**: CORRECT

### ✅ making-design-fun.tsx
- **Width**: max-w-4xl ✓
- **Section Order**:
  1. Intro (Context)
  2. The philosophy: friction-free creation (Context)
  3. Curiosity, not FOMO (Problem)
  4. The experiments (OutcomeSection - 4 tabs) ✓
  5. On creation tools (Process/Pattern)
  6. What makes design playful (Outcome)
  7. Why this matters (Reflections)
- **Status**: ACCEPTABLE (multiple intro sections, but flow is logical)

---

## Styling Consistency

All articles use:
- **ArticleContent wrapper** for base styling ✓
- **ArticleHeading2** for section titles ✓
- **max-w-4xl** container width ✓
- **hsl(25, 90%, 80%)** highlight color for bold text ✓
- **font-overusedGrotesk** body font ✓
- **font-calendas** heading font ✓

### Width Alignment Summary:
| Article | Width | Status |
|---------|-------|--------|
| physical-ai | max-w-4xl | ✅ |
| google-cloud | max-w-4xl | ✅ |
| design-as-a-research-tool | max-w-4xl | ✅ |
| personalization | max-w-4xl | ✅ FIXED |
| making-design-fun | max-w-4xl | ✅ |

---

## Variant Treatment

Currently: **No proper variants are in use**

What was created but not used:
- `ArticleVariants.tsx` (reference/documentation only)
- 6 variant component types defined but never instantiated

### Plan for Variants:
**Option 2 (User Selected)**
- **Base Template**: Context → Outcome → Process → Others
  - Used by: physical-ai, google-cloud
  - Max-width: max-w-4xl
  
- **Variant: Research Article**
  - Used by: design-as-a-research-tool (after reordering), personalization
  - Additional sections after Process: Frameworks, Reflections
  - Inherits base styling but allows custom section flow
  - Max-width: max-w-4xl

- **Variant: Exploratory/Conceptual**
  - Used by: making-design-fun
  - Multiple intro sections before Outcome
  - Flexible subsection structure
  - Inherits base styling

---

## Next Steps

1. **Reorder design-as-a-research-tool.tsx** to Context → Outcome → Process → others
2. **Document variant patterns** in updated VARIANT_PATTERNS.md
3. **Apply consistent styling** to all section container elements
4. **Verify all articles** compile and render correctly

