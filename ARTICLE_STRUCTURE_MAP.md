# Article Structure Map

Complete overview of how all articles are structured, their variants, and relationships to the template.

---

## **📐 Core Structure Hierarchy**

### **Standard Template (IDEAL)**
```
ArticleHeader (hero image + title)
    ↓
DynamicIslandTOC (floating table of contents)
    ↓
ArticleContent wrapper
    ├─ Context
    ├─ Problem / Challenge
    ├─ Outcome / Solution
    ├─ Process / My Role & Research Process
    ├─ Implications / Reflections
    └─ (Optional) Additional sections
```

### **Component Usage per Section**
```
ArticleHeading2  → Main section (mt-20 mb-8)
ArticleHeading3  → Subsection (mt-12 mb-6)
Accordion        → Multi-step Process (3+ items)
HighlightedText  → Key phrases (animated)
<strong>         → Concepts (orange highlight)
<em>             → Definitions (italic)
```

---

## **📊 Article Implementation Matrix**

| Article | Status | Structure Type | Sections | Components Used |
|---------|--------|-----------------|----------|-----------------|
| **designing-for-conversations** | ✅ UPDATED | Standard | Context → Problem → Outcome → Implications → Process (Accordion) → Reflections | ArticleHeading2/3, Accordion, HighlightedText |
| **physical-ai** | ✅ UPDATED | Standard | Context → Outcome → Process | ArticleHeading2/3, HighlightedText |
| **google-cloud** | 🟡 PARTIAL | Hybrid | Context → Deliverables (Tabs) → Process → Impact | HighlightedText, Custom tabs |
| **a2ui-generative** | 🟠 LEGACY | Custom | Non-standard titles (6 sections) | Plain h2 tags |
| **claude-code-research** | 🟠 LEGACY | Essay | 2 sections only | Plain h2 tags |
| **design-as-a-research-tool** | 🟠 LEGACY | Custom | 6 custom sections | Plain h2 tags |
| **designing-next-gen-ai-products** | 🟠 LEGACY | Custom | 4 custom sections | Plain h2 tags |
| **making-design-fun** | 🟠 LEGACY | Custom | 6 custom sections | Plain h2 tags |
| **personalization** | 🟠 LEGACY | Concept | 3 sections | Plain h2 tags |
| **proactive** | 🟠 LEGACY | Concept | 3 sections | Plain h2 tags |
| **reimagining-the-chatbot** | 🟠 LEGACY | Custom | 4 custom sections | Plain h2 tags |
| **what-do-prototypes-prototype** | 🟠 LEGACY | Concept | 3 sections | Plain h2 tags |
| **hello-humans** | 🟠 LEGACY | Essay | Custom structure | Plain h2 tags |

---

## **🎯 Structure Variants Explained**

### **Variant 1: STANDARD (✅ RECOMMENDED)**
**Used by:** designing-for-conversations, physical-ai

```
Context
  └─ Background, team, scope

Problem
  └─ Challenge definition

Outcome
  ├─ Solution overview
  └─ Result 1, 2, 3 (ArticleHeading3)

Process
  ├─ Step 1 (Accordion or ArticleHeading3)
  ├─ Step 2
  └─ Step 3

Reflections
  └─ Learnings and implications
```

**Characteristics:**
- Clear narrative arc
- Follows project flow
- Easy to navigate
- Best for case studies

---

### **Variant 2: HYBRID (🟡 PARTIAL)**
**Used by:** google-cloud

```
Context
  └─ Background and metadata

Deliverables (with TABS)
  ├─ Prototype 1
  ├─ Prototype 2
  └─ Prototype 3

Process
  ├─ Research methodology
  ├─ Interview findings
  └─ Design principles

Impact & Outcomes
  └─ Results and validation
```

**Characteristics:**
- Shows multiple design iterations
- Uses tabs/tabs for comparison
- Process sections not using Accordion yet
- Good for 0→1 projects

**Should update:** Add Accordion to Process section for better UX

---

### **Variant 3: CUSTOM/LEGACY (🟠 NEEDS STANDARDIZATION)**
**Used by:** a2ui-generative, claude-code-research, design-as-a-research-tool, etc.

**Examples:**

**A2UI (Conceptual/Exploratory)**
```
What is A2UI?
Exploring from Use Cases
Interaction Patterns
Research References
The Big Question
```

**Claude Code Research (Essay)**
```
What AI can't do
Don't be AI's agent
```

**Design as a Research Tool (Methodological)**
```
The Challenge
Methodology: Design as Discovery
What Design Revealed
Outcome: From Research to Policy
Research Frameworks Used
Why Design Was Essential
```

**Characteristics:**
- Non-standard section names
- Varied structures per article
- Mix of h2 and h3 tags (inconsistent)
- No ArticleContent component
- No HighlightedText or animations

**Issue:** Harder to navigate, no consistent visual hierarchy

---

## **🔄 Component Usage by Article**

### **✅ Using ArticleContent wrapper:**
- designing-for-conversations-that-earn-trust
- physical-ai

### **❌ NOT using ArticleContent wrapper:**
- All other 10+ articles (using `.prose` div or plain `<div>`)

---

## **📍 Section Name Variants**

### **Context Section Variants:**
- "Context" ← Standard
- "The Challenge" ← design-as-a-research-tool
- "A prototype for prototyping" ← proactive

### **Outcome Section Variants:**
- "Outcome" ← Standard
- "Outcome: From Research to Policy" ← design-as-a-research-tool
- "Explorations" ← reimagining-the-chatbot
- "Interaction Patterns" ← a2ui-generative
- "What Design Revealed" ← design-as-a-research-tool
- "The Deliverables: 0→1 Prototypes" ← google-cloud

### **Process Section Variants:**
- "My Role & Research Process" ← Standard (designing-for-conversations)
- "Process" ← Standard (physical-ai, google-cloud)
- "Research Frameworks Used" ← design-as-a-research-tool
- "Methodology: Design as Discovery" ← design-as-a-research-tool
- Not present ← Many articles

### **Reflections Section Variants:**
- "To my future self" ← designing-for-conversations
- "Three core lessons" ← designing-next-gen-ai-products
- "Why this matters" ← making-design-fun
- "The takeaway" ← proactive
- Not present ← Many articles

---

## **🎨 Component Hierarchy**

### **Currently Used:**
```
✅ ArticleHeader (all articles)
✅ DynamicIslandTOC (all articles)
✅ ArticleContent (2 articles)
✅ ArticleHeading2 (2 articles - NEW)
✅ ArticleHeading3 (2 articles - NEW)
✅ HighlightedText (3 articles - NEW)
✅ Accordion (2 articles - NEW)
```

### **Potential Additions:**
```
🔲 ArticleSection (wrapper for semantic sections)
🔲 ArticleList (standardized list component)
🔲 ArticleImage (standardized image with caption)
🔲 ArticleGrid (standardized image grid)
🔲 ArticleCallout (highlighted concept box)
```

---

## **📋 Recommended Migration Plan**

### **Phase 1: DONE ✅**
- ✅ Create ArticleContent template
- ✅ Create ArticleHeading2/3 components
- ✅ Create Accordion component
- ✅ Update 2 core articles (designing-for-conversations, physical-ai)
- ✅ Add DynamicIslandTOC to all articles

### **Phase 2: IN PROGRESS**
- 🔄 Standardize component naming across legacy articles
- 🔄 Update legacy articles to use ArticleContent wrapper
- 🔄 Replace all plain h2/h3 with ArticleHeading2/3

### **Phase 3: UPCOMING**
- ⏳ Add Accordion to articles with 3+ process steps
- ⏳ Apply HighlightedText to all legacy articles
- ⏳ Create article migration guide for future updates

---

## **🗺️ Article Categorization**

### **Category A: Case Studies** (Project-focused)
- designing-for-conversations-that-earn-trust
- physical-ai
- google-cloud

**Best for:** Context → Problem → Outcome → Process → Reflections

### **Category B: Research/Methodology** (Process-focused)
- design-as-a-research-tool
- designing-next-gen-ai-products

**Best for:** Challenge → Methodology → Findings → Implications

### **Category C: Concepts/Essays** (Idea-focused)
- a2ui-generative
- claude-code-research
- personalization
- making-design-fun

**Best for:** Exploratory structure with custom sections

### **Category D: Explorations/Prototypes** (Experiment-focused)
- proactive
- reimagining-the-chatbot
- what-do-prototypes-prototype

**Best for:** Conceptual breakdown with custom categories

---

## **📐 Visual Structure Comparison**

### **Standard Structure (✅ RECOMMENDED)**
```
┌─────────────────────────────┐
│     ARTICLE HEADER          │  Hero image (60vh)
│   + Floating TOC (pill)     │  ← DynamicIslandTOC
├─────────────────────────────┤
│     CONTEXT                 │  H2: mt-20 mb-8
│     paragraphs              │  P:  mb-8
├─────────────────────────────┤
│     PROBLEM                 │  H2: mt-20 mb-8
│     ├─ Issue 1 (H3)         │  H3: mt-12 mb-6
│     ├─ Issue 2 (H3)         │
│     └─ Issue 3 (H3)         │
├─────────────────────────────┤
│     OUTCOME                 │  H2: mt-20 mb-8
│     ├─ Result 1 (H3)        │  H3: mt-12 mb-6
│     │  + image              │
│     ├─ Result 2 (H3)        │
│     │  + image              │
│     └─ Result 3 (H3)        │
├─────────────────────────────┤
│     PROCESS                 │  H2: mt-20 mb-8
│   ┌───────────────────────┐ │  ACCORDION:
│   │ 1. Step 1      [+]    │ │  • Smooth expand/collapse
│   └───────────────────────┘ │  • ChevronDown icon
│   ┌───────────────────────┐ │  • mt-12 mb-6 items
│   │ 2. Step 2      [+]    │ │
│   └───────────────────────┘ │
│   ┌───────────────────────┐ │
│   │ 3. Step 3      [+]    │ │
│   └───────────────────────┘ │
├─────────────────────────────┤
│     REFLECTIONS             │  H2: mt-20 mb-8
│     • Learning 1            │
│     • Learning 2            │
│     • Learning 3            │
└─────────────────────────────┘
```

### **Legacy Structure (❌ INCONSISTENT)**
```
┌─────────────────────────────┐
│     ARTICLE HEADER          │  No consistent sizing
│   + TOC (inline or none)    │  ← Inconsistent placement
├─────────────────────────────┤
│     Custom Section Name     │  h2 (no ArticleHeading2)
│     paragraphs              │  P: no mb-8 (inconsistent)
│     └─ subsection (h3)      │  h3 (no ArticleHeading3)
├─────────────────────────────┤
│     Another Custom Section  │  No pattern
│     paragraphs              │  
│     ├─ item                 │
│     └─ item                 │
├─────────────────────────────┤
│     Yet Another Section     │  Unpredictable structure
│     ...                     │
└─────────────────────────────┘
```

---

## **🎯 Key Takeaways**

1. **2 articles** follow the new standard (✅ designing-for-conversations, physical-ai)
2. **10+ articles** use legacy structure (❌ needs updating)
3. **Standard structure** = Context → Problem → Outcome → Process → Reflections
4. **Main variants:** Component usage (h2 vs ArticleHeading2) and section naming
5. **Recommended approach:** Gradually migrate legacy articles to use ArticleContent + ArticleHeading components
6. **Accordion pattern:** Use for 3+ process steps (keeps article scannable)

---

## **Next Steps**

To standardize all articles:

1. Replace all `<h2>` with `<ArticleHeading2>`
2. Replace all `<h3>` with `<ArticleHeading3>`
3. Wrap content in `<ArticleContent>`
4. Add Accordion to articles with 3+ process/methodology steps
5. Add HighlightedText to key phrases
6. Rename non-standard sections to match template when possible

**Timeline:** 
- Phase 1 (Core articles): ✅ Done
- Phase 2 (Middle articles): 2-3 articles per session
- Phase 3 (Legacy articles): Gradual migration
