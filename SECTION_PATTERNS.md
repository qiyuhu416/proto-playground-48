# Section Styling Patterns

Standardized patterns for common article sections across all articles.

---

## **1. CONTEXT Section**

**Purpose:** Introduce the project, team, and scope

**Pattern:** Simple paragraphs with metadata (optional)

```tsx
<ArticleHeading2 id={sectionId("Context")}>Context</ArticleHeading2>

<p>What was the project about? Who were you working with?</p>

<p>Key details about scope and constraints...</p>

{/* Optional: Metadata grid */}
<div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 my-6 text-sm">
  <p className="m-0"><strong>Duration:</strong> X months</p>
  <p className="m-0"><strong>Role:</strong> Your role here</p>
  <p className="m-0"><strong>Deliverables:</strong> What you created</p>
  <p className="m-0"><strong>Collaboration:</strong> Who you worked with</p>
</div>

<p>More context if needed...</p>
```

**Styling:** No special styling needed—ArticleContent handles it all.

---

## **2. PROBLEM or CHALLENGE Section**

**Purpose:** Define the problem you were solving

**Pattern A: Simple problem statement**

```tsx
<ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>

<p>Problem statement with <strong>key challenge highlighted</strong>.</p>

<p>Why it matters and what constraints exist...</p>
```

**Pattern B: Problem with sub-problems**

```tsx
<ArticleHeading2 id={sectionId("Problem")}>Problem</ArticleHeading2>

<p>Main problem overview...</p>

<ArticleHeading3>Challenge 1: First issue</ArticleHeading3>
<p>Details about this challenge...</p>

<ArticleHeading3>Challenge 2: Second issue</ArticleHeading3>
<p>Details about this challenge...</p>

<ArticleHeading3>Challenge 3: Third issue</ArticleHeading3>
<p>Details about this challenge...</p>
```

**When to use:** Use sub-headings if you have 3+ distinct problems to cover.

---

## **3. OUTCOME or SOLUTION Section** ⭐ MOST VARIED

### **Pattern A: Multi-part outcome (most common)**

```tsx
<ArticleHeading2 id={sectionId("Outcome")}>Outcome</ArticleHeading2>

<p>Overview of what was created...</p>

<ArticleHeading3>1. First deliverable</ArticleHeading3>
<p>Description of first result...</p>
<img src="/articles/image1.png" alt="..." className="w-full rounded-2xl my-8 border border-neutral-200" />

<ArticleHeading3>2. Second deliverable</ArticleHeading3>
<p>Description of second result...</p>
<img src="/articles/image2.png" alt="..." className="w-full rounded-2xl my-8 border border-neutral-200" />

<ArticleHeading3>3. Third deliverable</ArticleHeading3>
<p>Description of third result...</p>
```

### **Pattern B: Outcome with tabs (for prototypes)**

```tsx
<ArticleHeading2 id={sectionId("Outcome")}>The Deliverables</ArticleHeading2>

{/* Tab component if showing multiple prototypes */}
<div className="flex gap-2 mb-6 border-b border-neutral-200">
  {deliverables.map((del) => (
    <button
      key={del.id}
      onClick={() => setActive(del.id)}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active === del.id
          ? "border-neutral-900 text-neutral-900"
          : "border-transparent text-neutral-500"
      }`}
    >
      {del.title}
    </button>
  ))}
</div>

{/* Active deliverable content */}
{activeDeliverable && (
  <div className="space-y-4">
    <img src={activeDeliverable.image} alt="..." className="w-full rounded-2xl my-6" />
    <p>{activeDeliverable.description}</p>
  </div>
)}
```

### **Pattern C: Simple outcome (less common)**

```tsx
<ArticleHeading2 id={sectionId("Outcome")}>Outcome</ArticleHeading2>

<p>What was created and how it solved the problem...</p>

<img src="/articles/outcome.png" alt="..." className="w-full rounded-2xl my-8 border border-neutral-200" />

<p>Impact and results...</p>
```

**When to use each:**
- **Pattern A:** 3+ distinct deliverables or research findings
- **Pattern B:** Multiple prototype states or comparison views
- **Pattern C:** Single unified outcome

---

## **4. PROCESS or MY ROLE & RESEARCH PROCESS Section** ⭐ KEY PATTERN

### **Pattern A: Accordion (RECOMMENDED for 3+ subsections)**

**When to use:**
- You have 3+ distinct process steps or methodologies
- Content is detailed enough to warrant hiding initially
- You want to keep the article scannable (reduce cognitive load)

```tsx
import { Accordion } from "@/components/Accordion";

<ArticleHeading2 id={sectionId("Process")}>My Role & Research Process</ArticleHeading2>

<Accordion
  items={[
    {
      title: "1. Desktop research: understanding the ecosystem",
      children: (
        <>
          <p>First paragraph of research details...</p>
          <p>Second paragraph continuing the narrative...</p>
          <img src="..." alt="..." className="w-full rounded-2xl my-8 border border-neutral-200" />
          <p>More findings...</p>
        </>
      ),
    },
    {
      title: "2. User interviews: talking to stakeholders",
      children: (
        <>
          <p>Interview methodology...</p>
          <p>Key insights from interviews...</p>
        </>
      ),
    },
    {
      title: "3. Analysis: synthesizing findings",
      children: (
        <>
          <p>How you analyzed the data...</p>
          <p>Key patterns and themes...</p>
        </>
      ),
    },
  ]}
/>
```

**Accordion Styling (auto-applied):**
- Smooth expand/collapse with framer-motion
- ChevronDown icon rotates on open
- `mt-12 mb-6` spacing between items
- Border dividers between sections

### **Pattern B: Linear flow (for simpler processes)**

**When to use:**
- You have 2-3 distinct steps
- Content is concise
- Process is sequential and should be read linearly

```tsx
<ArticleHeading2 id={sectionId("Process")}>My Approach</ArticleHeading2>

<ArticleHeading3>1. Research phase</ArticleHeading3>
<p>What you did in research...</p>

<ArticleHeading3>2. Design phase</ArticleHeading3>
<p>What you did in design...</p>

<ArticleHeading3>3. Validation phase</ArticleHeading3>
<p>How you validated the solution...</p>
```

### **Pattern C: Narrative with callouts**

**When to use:**
- Single flowing narrative that doesn't need subsections
- Process is more story-based than structured

```tsx
<ArticleHeading2 id={sectionId("Process")}>My Process</ArticleHeading2>

<p>Started with research to understand...</p>

<div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 my-8">
  <p className="font-medium mb-2">Key insight from this phase:</p>
  <p>Important discovery that shaped the direction...</p>
</div>

<p>Then moved into design by...</p>
```

---

## **5. IMPLICATIONS or REFLECTIONS Section**

**Purpose:** Share learnings and broader impact

**Pattern A: Bulleted learnings**

```tsx
<ArticleHeading2 id={sectionId("Reflections")}>To my future self</ArticleHeading2>

<p>Reflection and context...</p>

<ul className="list-disc pl-5 space-y-2 mb-6">
  <li><strong>Learning 1:</strong> What you learned and why it matters</li>
  <li><strong>Learning 2:</strong> Another key insight</li>
  <li><strong>Learning 3:</strong> Third reflection</li>
</ul>

<p>Closing thoughts...</p>
```

**Pattern B: Narrative reflections**

```tsx
<ArticleHeading2 id={sectionId("Reflections")}>To my future self</ArticleHeading2>

<p>First reflection and insight...</p>

<ArticleHeading3>About the work</ArticleHeading3>
<p>What you learned about the domain...</p>

<ArticleHeading3>About the process</ArticleHeading3>
<p>What you learned about your process...</p>

<ArticleHeading3>About collaboration</ArticleHeading3>
<p>What you learned about working with others...</p>

<p>Concluding thoughts...</p>
```

---

## **Decision Tree: Which Pattern to Use?**

```
PROCESS Section
│
├─ Do you have 3+ subsections? 
│  ├─ YES → Use ACCORDION (Pattern A)
│  │  └─ Keeps article scannable
│  └─ NO → Go to next question
│
├─ Is each step concise (< 1 paragraph)?
│  ├─ YES → Use LINEAR FLOW (Pattern B)
│  │  └─ Quick sequential reading
│  └─ NO → Use NARRATIVE (Pattern C)
│     └─ Story-based explanation

OUTCOME Section
│
├─ How many deliverables/results?
│  ├─ 3+ items → MULTI-PART (Pattern A)
│  ├─ Multiple states → TABS (Pattern B)
│  └─ Single unified → SIMPLE (Pattern C)
```

---

## **Current Article Implementation**

### **Using Accordion:**
- ✅ `designing-for-conversations-that-earn-trust.tsx` - 4 process steps
- ✅ `physical-ai.tsx` - Should use Accordion (but currently doesn't)

### **Should Use Accordion (needs update):**
- `google-cloud.tsx` - Has multiple research steps

### **Linear Flow (working well):**
- Most other articles

---

## **Recommended Updates**

For consistency, articles with 3+ process subsections should use Accordion:

```tsx
// BEFORE: All expanded
<ArticleHeading2 id={sectionId("Process")}>Process</ArticleHeading2>
<ArticleHeading3>1. Research</ArticleHeading3>
<p>...</p>
<ArticleHeading3>2. Design</ArticleHeading3>
<p>...</p>
<ArticleHeading3>3. Testing</ArticleHeading3>
<p>...</p>

// AFTER: Collapsible
<ArticleHeading2 id={sectionId("Process")}>Process</ArticleHeading2>
<Accordion
  items={[
    { title: "1. Research", children: <p>...</p> },
    { title: "2. Design", children: <p>...</p> },
    { title: "3. Testing", children: <p>...</p> },
  ]}
/>
```

---

## **Image Styling (consistent across all sections)**

```tsx
// Standard article image
<img
  src="/articles/image.png"
  alt="Descriptive text"
  className="w-full rounded-2xl my-8 border border-neutral-200"
/>

// Caption (optional)
<p className="text-sm text-neutral-500 italic">
  Image caption explaining what's shown
</p>

// Grid of images
<div className="grid md:grid-cols-2 gap-6 my-8">
  <img src="..." alt="..." className="w-full rounded-2xl border border-neutral-200" />
  <img src="..." alt="..." className="w-full rounded-2xl border border-neutral-200" />
</div>
```

---

## **Summary Table**

| Section | Pattern | Style | Use When |
|---------|---------|-------|----------|
| **Context** | Paragraphs + Metadata | Simple | Always first |
| **Problem** | Paragraphs or H3 subsections | Simple or Structured | Problem-driven work |
| **Outcome** | Multi-part OR Tabs OR Simple | Flexible | Always needed |
| **Process** | Accordion OR Linear OR Narrative | Varies | Methodologies |
| **Reflections** | Bullets OR Narrative H3s | Simple or Structured | Always last |

**Key rule:** If a section has 3+ subsections, consider using Accordion for better scannability.
