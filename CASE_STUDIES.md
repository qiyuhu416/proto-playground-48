# Case Studies & Articles

## Table of Contents
1. [What do prototypes prototype?](#what-do-prototypes-prototype)
2. [How Claude shapes my thinking](#how-claude-shapes-my-thinking)
3. [Personalization? What is a Person?](#personalization-what-is-a-person)
4. [Conversational Design for Trust](#conversational-design-for-trust)
5. [The Chatbot Beyond a Tab?](#the-chatbot-beyond-a-tab)
6. [Physical AI for Service Design](#physical-ai-for-service-design)
7. [Reimagining the Chatbot](#reimagining-the-chatbot)
8. [Designing Next-Gen AI Products](#designing-next-gen-ai-products)
9. [Making Design Fun](#making-design-fun)
10. [Google Cloud - Launching AI for Assisted Browsing](#google-cloud)

---

## What do prototypes prototype?

**Category:** Implementation  
**Read Time:** 6 min  
**Date:** Apr 2026

### Prototype = Research mindset

The word "prototype" might have been automatically associated with a digital phone frame where people can click around. But we could actually expand the scope here: as creation itself becomes easier, prototypes can be any form of experiments used to test "what to create."

But prototyping = research. It is essentially a mindset to test what to design. Prototypes can be anything that serves those goals:
- Explore more directions
- Test more interactions
- Simulate more edge cases
- Communicate ideas that used to be too expensive to build
- Much more

**Figure 1:** Houde & Hill, "What Do Prototypes Prototype?" (1997). Stanford HCI.
- Role: What it does
- Implementation: How it works
- Look & Feel: How it feels to interact with

### Look & Feel

Prototypes that test how something *feels* to interact with—motion, tone, visual language. Does it feel right? Does it feel trustworthy? You can't answer this with a spec doc.

### Implementation

Prototypes that test the technical feasibility and functionality. Can the concept actually work? What are the constraints?

### Role

Prototypes that test the conceptual model. Does this solve the right problem? Is this the right approach?

---

## How Claude shapes my thinking

**Category:** AI Workflow  
**Read Time:** 5 min  
**Date:** Apr 2026

Building and evolving development tools powered by AI assistance.

### What AI can't do

After collaborating intensely with Claude Code, the limits became very specific. There are three things that stand out:

#### 1. It doesn't stop

Prompt it to "act as a world-class designer, critique the work, and then give suggestions based on the critique" and it will keep going. It will critique, suggest, critique the suggestion, suggest again. Infinitely helpful, infinitely exhausting.

Someone still has to decide: **enough.** That someone is still the human. Knowing when to stop is a human skill that doesn't have a proxy.

#### 2. It generates options, not judgments

A navbar can be designed a hundred good ways. Which one is right depends on whether the tabs have dependencies, whether users navigate by keyboard, whether one client hits a particular button six times a day out of habit. I have a client who lives on the keyboard—Claude would never have thought of that because it's never watched them work.

AI fills the distribution. It generates the options that a competent designer would consider. But it doesn't *judge* which one matters most. That judgment lives in context: the person, their situation, the hidden patterns in how they work.

#### 3. It doesn't feel the consequences

It generates; it doesn't live inside the system afterwards. It doesn't notice a week later that the pattern it suggested is quietly producing support tickets. It doesn't pick up the subtle signals from a person—the hesitation, the habit, the context behind a decision.

Experience over time is something only humans can have. Being in the system, noticing the effects of your decisions on real people, learning from those effects—that's lived knowledge. AI can simulate that knowledge, but it doesn't have it.

### Don't be AI's agent

A lot of things about AI are unteachable lessons — just go and try it out. And you may find it addictive.

The real problem seems to be how to face our FOMO, and find the space where AI leaves room.

#### 1. You either use AI to amplify your thinking, or become the human agent executing for AI

There were moments where I would prompt Claude Code with something like "You are a world-class designer. Analyze this problem, give me options, critique those options, and improve them based on your critique."

Honestly, that feels awful. I was too eager to want that productivity, to trade my own brain. And sometimes we took a long loop, going back to the original point. Intentionally. Practice. To urge. Your impulse. To get that efficiency.

#### 2. Don't chase the tool

One funny thing about AI tools: **"If you learn AI slowly enough, sometimes you realize you didn't even need to learn the majority of them."**

Things are moving so fast. For a while everyone talked about prompt engineering, Claude Code tricks (like `/compact` or `skills.md`). Then a few months later, the product abstracts half of it away:
- Stuff gets baked into the models
- Automatic context handling

Right now: sometimes I use tools like Stitch for fast brainstorming. Sometimes I go back to Figma because visual sketches help the LLM understand direction better. Sometimes I prototype directly in code.

Languages change. Frameworks change. Interfaces change.

You see, this whole process is a prototype. We are all in the prototyping phase of human–AI interaction.

---

## Personalization? What is a Person?

**Category:** AI Philosophy  
**Read Time:** 8 min  
**Date:** NDA Project

When asked to work on "personalization," I started by asking people around me this question: **"What makes you you?"**

### So, what makes a person a person?

My favorite movie "Little Prince" says "what's important is the unseen." I spent time in conversations, asking what people value about their closest relationships, their creative work, their growth—the places where they feel most like themselves. The answers weren't about algorithms or efficiency. They were about presence, consistency, genuine interest, and the freedom to be imperfect.

Most personalization work focuses on data—learning preferences, predicting behavior, optimizing for engagement. But that's not what makes something feel personal. What makes something personal is being seen, understood, and respected as a unique individual.

### Person & Personalization

Out of those conversations, I formed my own simplified version of a roadmap for the future of personalization: **For Me, With Me, As Me.**

#### 1. Learn For Me

AI should serve my specific goals and context, not generic templates. It understands what I'm trying to accomplish and adapts to my situation, not the reverse.

#### 2. Stay With Me

AI should be a collaborator, not a replacement. I should feel like we're thinking together. The system asks me questions, validates my thinking, and invites my perspective. I have agency and a voice.

#### 3. Act As Me

AI should recognize and respect who I am—my values, my boundaries, my inconsistencies. It doesn't try to optimize me or push me toward what it thinks is best. It accepts that being human means being complicated.

### Humanity-centered Design

Yeah, it's a big word... but AI that only understands data will build systems that feel intrusive, prescriptive, or hollow. AI that understands humanity means it knows what we need, how we grow, what we struggle with, and respects our feelings.

The future of AI isn't about knowing everything about you. It's about understanding something essential about what it means to be human, and building systems that respect and support that.

---

## Conversational Design for Trust

**Category:** Bot for Multi-Stakeholder Eldercare  
**Read Time:** 8 min  
**Date:** Apr 2026

Designing conversational interfaces that build trust across multiple stakeholders in healthcare contexts.

### The Challenge

In eldercare settings, you have multiple stakeholders:
- The elderly person using the system
- Family members who care for them
- Healthcare providers managing their care
- Administrators ensuring compliance

Each has different needs, different levels of tech comfort, and different concerns about trust and privacy.

### Conversational Design Principles

1. **Clarity over cleverness** - Complex language breaks trust
2. **Consistency in tone** - Familiarity builds trust
3. **Transparency about limitations** - Being honest about what the AI can and cannot do
4. **Human escalation paths** - Always offer a way to reach a human
5. **Cultural sensitivity** - Language and metaphors matter

---

## The Chatbot Beyond a Tab?

**Category:** Exploring Interface Paradigms  
**Read Time:** 7 min  
**Date:** Apr 2026

What happens when we move conversational AI beyond the traditional chat interface?

The current paradigm for AI interaction is a chat interface in a tab or window. But this may be limiting what these systems can do. What if AI could:
- Interrupt you at the right moment
- Understand the context of what you're working on
- Provide just-in-time information without leaving your current task
- Appear in a more natural, peripheral way

This exploration looks at alternative interface paradigms and their tradeoffs.

---

## Physical AI for Service Design

**Category:** Understanding Behavioral Intent  
**Read Time:** 6 min  
**Date:** Apr 2026

When AI takes physical form, how do we design interactions that feel natural?

Physical manifestations of AI—whether robots, displays, or other devices—create different interaction expectations than software AI.

Key considerations:
- Presence: Physical objects command attention differently
- Embodiment: Movement and physicality affect how we interpret intent
- Trust: Physical presence can either increase or decrease trust depending on design
- Agency: How physical is a device expected to be?

---

## Reimagining the Chatbot

**Category:** Collection · Design System  
**Read Time:** 5 min  
**Date:** Apr 2026

A design system exploration of conversational UI patterns.

Rather than building from scratch each time, what if we could systematize the patterns that work in conversational interfaces?

Patterns explored:
- Confirmation flows
- Error recovery
- Disambiguation
- Context switching
- Multi-turn reasoning

---

## Designing Next-Gen AI Products

**Category:** Mapping UX to Capability  
**Read Time:** 8 min  
**Date:** Apr 2026

Lessons from conversational AI and human-AI co-writing.

The gap between what AI can do and what users expect is where bad experiences happen. Bridging this requires:

1. **Capability Mapping** - Understanding what the model actually does vs. what users think it does
2. **Expectation Setting** - Being clear about limitations upfront
3. **Progressive Disclosure** - Revealing capabilities gradually as users get comfortable
4. **Feedback Loops** - Learning from what users try to do with the system
5. **Fail Gracefully** - When the AI can't do something, the experience should still be coherent

---

## Making Design Fun

**Category:** Vibe-coding and Creative Practice  
**Read Time:** 5 min  
**Date:** Apr 2026

On curiosity, vibe-coding, and why creation should feel like play.

The best design work happens when you're having fun. Not frivolous fun, but the deep satisfaction of exploration and discovery.

Vibe-coding—building things primarily for the joy of building them—is a valid and valuable practice. It's how you learn. It's where inspiration comes from. It's where playful constraints lead to novel solutions.

The future of design is more playful, more exploratory, and less precious about "the right way."

---

## Google Cloud - Launching AI for Assisted Browsing

**Category:** 0→1 GenAI Project  
**Duration:** 4 months  
**Role:** UX Designer  
**Deliverables:** Figma hi-fi prototypes, Research report

Embedding AI into the Product Discovery Experience for Startup Customers

### The Challenge

Google Cloud offers 100+ products with different pricing, integrations, and capabilities. Startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.

### Problem Statement

**"When startup consumers search for solutions that align with their business objectives, how might Google Cloud assist them in differentiating between similar offerings on the platform?"**

### Research Questions

**Understand:** What mental models do startup leaders use when evaluating cloud solutions to purchase?

**Identify:** What are the UX gaps between Google and competitors in supporting cloud solution discovery?

**Compare:** What cognitive biases and trust mechanisms influence digital product purchase decisions?

### The Deliverables: 0→1 Prototypes

Back in 2023 Q3, Google Cloud didn't have a chatbot—everything in this project was new.

#### The Chatbot
Personalized recommendations for product discovery. The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.

#### Dynamic UI
Adaptive interface for user journey stages. Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.

#### Comparison Tool
Side-by-side solution evaluation. The comparison tool enables users to evaluate solutions with "add to compare" selections. Making the comparison process explicit and transparent improves decision confidence.

### Research Methodology

**Semi-Structured Interviews (N=8)**
Recruited startup CTOs, CEOs, and Founders as key decision-makers. In-depth interviews revealed mental models and decision-making processes that surveys couldn't capture.

**Competitive Analysis**
Analyzed AWS and Azure UX patterns for product discovery. Identified where Google Cloud could differentiate through AI-powered recommendations.

**Literature Review**
Researched decision-making psychology, online purchasing behavior, and AI trust mechanisms. Grounded design decisions in behavioral science.

### Key Insights

- **Mental models:** Leaders evaluate solutions through business fit, integration compatibility, and cost predictability—not feature lists
- **Discovery friction:** Comparing similar products requires switching between multiple pages and reading dense documentation
- **Trust mechanisms:** Clear product positioning and social proof (customer testimonials, case studies) drive adoption
- **AI transparency:** Users want to understand WHY an AI recommends something, not just receive the recommendation

### Impact & Outcomes

**Validated Hypothesis:** Final prototype SUS score = **86.3%** (excellent usability). Confirmed that helping users differentiate between similar solutions is critical to improving adoption.

**Comprehensive Hand-offs:** Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.

---

## Additional Case Studies

The following case studies are available in the portfolio:

### Design & Research
- **Research through Design** - User-centered service design
- **Meet the stranger challenge** - Connection and open-ended interaction
- **Hello humans prototype** - Very personal prototype exploration
- **Design as a Research Tool** - Using design methodology for discovery

### AI & Interaction
- **Generative UI** - Personalization through generative design
- **AI-AI Interaction** - When two AI agents communicate
- **Human-AI Research** - Exploring the dynamics of human-AI collaboration
- **AIOS to see my unknown-unknowns** - Self-discovery through AI

### Product & Expression
- **Product launch from 0–1** - Building food delivery marketplace (meetfood)
- **Hand gesture interactions** - Physical expression beyond voice
- **Voice interaction** - Vocal expression as interface
- **Palo Alto moment** - Playful experiments in place-based design

---

## Themes Across Case Studies

### Design Mindset
- Prototyping as research, not just execution
- Understanding problems deeply before solving them
- Playfulness and experimentation as valid practices

### AI & Humans
- AI as augmentation, not replacement
- The importance of clear communication about AI capabilities
- Privacy and trust as foundational

### Expression & Interaction
- Multiple modalities beyond text and screens
- The value of embodied interaction
- Designing for actual user behavior, not idealized usage

---

*Portfolio by Qiyu Hu | 2026*
