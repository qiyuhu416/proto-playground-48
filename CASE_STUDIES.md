# Case Studies & Articles

## Table of Contents
[Conversational Design for Trust](#conversational-design-for-trust)
[Physical AI for Service Design](#physical-ai-for-service-design)
[Reimagining the Chatbot](#reimagining-the-chatbot)
[Google Cloud --- Launching AI for Assisted Browsing](#google-cloud--launching-ai-for-assisted-browsing)

------------------------------------------------------------------------

## Conversational Design for Trust

**Category:** Bot for Multi-Stakeholder Eldercare  
**Read Time:** 8 min  
**Date:** Apr 2026

### Context

This was a research project at AI Caring, where I worked as a research assistant. My role included helping design the research method, conducting interviews, and exploring concepts through storyboards. The paper writing is still WIP—and moving very slowly, since my PI switched to industry (and now we are at the same company lol).

The theme of the research was **What if AI *plays* a role beyond a tool, as a caregiver for older adults?**

The trickiest part is that there are many stakeholders and the older adult's health may decline. 
As the bot becomes a party that knows information from both sides. But the elder might not want the bot to tell everything to their caregiver. In social science, *affiliation* is the affective stance of being on someone's side—distinct from *alignment*, which is just structural cooperation. Designing this requires understanding what it means to be loyal to one party while respecting another's autonomy.

### Outcome
Conversational design is not just about *what the bot says*. We designed the conversations for not just single-turn AI response but also focus on the high-level interaction flow to create a decision tree that defines the logics of whether the bot feels trustworthy in the first place.


#### 1. Trust can be scripted

Trust is an important factor in this multi-stakeholer coordination scenarios. Through listerature review, we found a conversational design framework and proposed this decision tree when caregiver and elder goals conflict: 

1. **Acknowledge the instruction** - "I understand you want to [elder's instruction]" and name any conflicts openly
2. **Evaluate the outcome** - Use past interactions to understand values; explain potential consequences
3. **Show affiliation behavior** - Be clear about operational criteria and goals; demonstrate consistent support
4. **Ask to reconfirm** - "Are you sure about [original instruction]?"



#### 2. Trust doesn't always positively correlate with perceived capability

In some situations, an AI saying **"I'm not capable of providing that support"** could create more trust than confidently trying to answer everything.

To answer the question of "when the bot shoudl say I don't know", we maped out the decision tree with different possibile scenarios and metrics to evaluate the outcome for each. 


### Implications

The design goal shifted from simply making the bot feel intelligent to **clearly communicating what it can do, what it cannot do, and when a human should be involved.**

There is a nuance here: being transparent does not mean the bot should constantly remind users that it is limited. The interaction still needs to feel supportive. The question is how to design the right boundary so the AI can be helpful without pretending to have authority it doesn't have.


### Process

#### 1. Desktop research: understand the stakeholders and common scenarios

We started with desktop research to understand the care ecosystem: who is involved, what kinds of decisions they make together, and where their interests might conflict.



#### 2. Research-through-design, with storyboards as the medium

We created storyboards based on the researched scenarios, visualizing different extents of bot involvement in each one. This helped us focus less on **"what should the chatbot screen look like?"** and more on **"what role should the bot play here?"**

We also adopted a speed-dating research method: 10 storyboards across five scenarios, with two levels of bot involvement for each scenario. We showed them to participants in randomized order and asked them to quickly compare and react. The goal was to explore: **to what extent should the bot be involved, and how does that change across different scenarios?**

We then conducted qualitative interviews at a senior center, showing participants the storyboards and asking questions like: **"What would you want the bot to do in this scenario?"**

#### 3. Affinity-cluster the results

After the interviews, we affinity-clustered participants' responses to look for patterns across scenarios—not just whether people liked or disliked a specific bot behavior, but *why* they wanted more or less AI involvement.

That analysis led to the trust findings above, especially around capability, boundaries, and the bot's role in a multi-stakeholder relationship.

There are more nuances here than I can fit into a portfolio page. The paper is still WIP, so: **stay tuned :)**

## Physical AI for Service Design

**Category:** Understanding Behavioral Intent  
**Read Time:** 6 min  
**Date:** Apr 2026

### Context

This was a fast-paced, experimental concept design project in partnership with Strange VC and two clients:


1. **Archetype AI**, focused on physical AI
2. **Roche**, in healthcare

Archetype AI came with the request to map its multimodal AI capabilities to Roche's healthcare use cases.

The team was small—an engineer, a PM, and me. My role was to conduct the research, including creating the service blueprint and analyzing **when to use AI and when *not* to use AI**. The three of us collectively shared ideas and created the final artifacts.

The problems we wanted to solve were:

1. Errors in the hospital-to-lab experience, with the goal of minimizing errors and reducing waste.
2. How to be technology-driven but not tech-centered: finding the right intervention point to maximize the model's capabilities without forcing the technology into the experience.

### Outcome

#### 1. Service blueprint

The service blueprint mapped where humans, existing systems, and AI could coordinate across the hospital-to-lab experience. More importantly, it made the boundaries visible: where AI could increase efficiency, where human judgment still mattered, and where an AI intervention might create more risk than value.

#### 2. Storyboard

Storyboarding helped stakeholders imagine the role of the system in context. The focus was less on a screen and more on **when, where, and why AI should exist in the status quo.**

### Process

#### 1. Understand the problem 

In diagnostic testing, sample collection is critical. A single error cascades through the entire lab process—false results, wasted samples, delayed diagnoses. 

Common pre-analytical errors include:
- Wrong patient info (9%)
- Order misinterpretation (1%)
- Incorrect container (8%)
- Labeling mismatches (9%)
- Tube filling errors (13%)
- Storage failures (7%)

#### 2. Explore whether AI is really needed

AI *could* be a solution, but it might not always be the best solution.

1. understandin the model capabilty

Do we really need AI? Yes. We leverage AI's capacity to store, process, and communicate massive information.

We However, the  the current workflow relies entirely on human attention and memory.
- Tracking multiple variables simultaneously
- Remembering complex sequences
- Validating against large datasets
- Communicating information clearly

Potentail use case of Newton's modal oin phlebotomy include, AI can confirm patient identity against records, validate that selected vials match test orders, verify that labels are correct before they're applied, and monitor the collection process to detect deviations.

2. okay it is feasible, but is it the best solution? 
if not AI, what is an alternative solution? 

For each intervention point, we compared AI with alternatives—including existing workflows and human labor. 

We also looked at the risks of using AI: probabilistic errors, missing context, and the new coordination work created when a human needs to verify or correct the system.

I found it useful to separate those risks into two types:

- **Short-term capability limitations:** problems that may improve as the technology gets better.
- **System-level limitations:** problems around responsibility, workflow, and error correction that don't automatically disappear with a better model.


#### 3. Map tech capability to the service blueprint

The previous analysis helped me reframed the question into: **where does AI create enough efficiency to justify the new uncertainty and coordination cost it introduces?**

Therefore, I created the service blueprint to map out the user flow and corresponding AI interverion point 

#### 4. Understand the limitations

Moving beyond this specific use case, let's think about the bigger service system. AI will "definitely" make errors, and in a service system, someone has to detect it, correct it, communicate the correction, and deal with whatever downstream impact it creates.

So there are questions I was thinning about but didn't have an answer to yet:
- **Who is responsible for error correction?**
- **How does one AI error affect the larger service system?**
- **Does AI remove work, or move the work to someone else?**
- **Where should a human stay in the loop even if the model becomes more capable?**


## Reimagining the Chatbot

**Category:** Collection · Design System  
**Read Time:** 5 min  
**Date:** Apr 2026

### Context

Users often don't know what to ask an AI. Yet most AI products still wait inside a chat tab for the user to initiate.

This collection was inspired by my work at Apple. While I can't directly show the work there because of NDA, I'm sharing some personal explorations around designing AI that **meets users where they are.**

### How to think outside the box?

The first step of thining outside the box is to realize where the box is. There is a cool model called "task analysis" that helped me break out "mandane" interaction into detailed steps. 

I saw there are a lot of assumptions hidden in this flow. 

1. **Awareness** - User forms the awareness of what to ask - assumption: user knows claerly what to ask
2. **Expression** - User the conversation by expressesing the question  - assumpytion: user express trhough typing (or cliking on the prompt buttons)
4. **Processing** - User waits for AI to generate response - assumptionL waiting is bording
5. **Reception** - User realize the AI finished process
6. **Interpretation** - User understands AI response

Once I wrote those assumptions down, the design space became much bigger. Instead of asking **"how do we redesign the chatbot?"**, I could ask: **which part of this interaction flow doesn't have to exist at all?**

### Explorations

So I am sharing this collection, it is less about UI but more about exploring **different relationships between a person and an AI system.**

#### What if AI helps you form the question while you type?

Instead of waiting for a complete prompt, I wanted to explore: **Can AI reduce the work of prompt-writing without taking away the user's control over what they actually want to ask?**

#### What if chat lives inside browsing? 

What if collecting context is part of the interaction, rather than something the user has to reconstruct afterward? 
The user can select information directly in the browsing window and add it to a **question list** to ask later. Instead of repeatedly copying context into a chatbot, the question can build alongside the browsing process.


#### What if AI asks *for you*?

users don't know what to ask, so why now we have AI ask on users behalf if it understand enough about user's preferences. 
Learning can happen in 2 ways: active and passive. If understanidng is the goal, we don't have to rely on users to ask questions for them to learn, they can also learn by "watching 2 AIs chatting". 


### So what's next after those concepts?

Prototypes, in my opinion, serve two goals:

1. **Produce knowledge or principles**
2. **Be turned into production**

Those goals need different next steps.

#### If the goal = production: run more controlled experiments

More business-related factors need to be considered.

For example, in scenarios where intrusiveness matters, we need to be careful about **to what extent AI feels proactive versus intrusive in assisted browsing.**

I created an interactive prototype with Claude Code and tested it using Wizard of Oz. A control panel let me adjust the metrics that defined when and how proactive the AI should be.

The implication was: **don't go with proactivity for now. First, explore better ways to collect contextual data.**

The interesting design problem became less about making AI proactively pop up, and more about **what information it needs before that behavior feels justified.**

#### If the goal = knowledge: look for reusable principles

There is one design-thinking model I really like: the **analysis–synthesis model**. It taught me not to just look at each concept individually, but to derive common themes across them—and then brainstorm again based on those themes.

Across these explorations, a few things kept coming back: make uncertainty visible, preserve user agency, design recovery as carefully as the happy path, and choose the interface based on the task instead of defaulting to chat.

Given those are the actual goals, the "chatbot" is probably just the **current interface**—one of many possible solutions.

More to come. And hopefully, as the technology changes, we get more room to imagine what those other solutions could be.

------------------------------------------------------------------------



------------------------------------------------------------------------

## Google Cloud --- Launching AI for Assisted Browsing

**Category:** 0--1 Product Launch\
**Read Time:** 10 min\
**Date:** Apr 2026

### Context

Back in 2023 Q3, Google Cloud had a static website for their product listing, and they wanted to intergate intelligence to support the browsing experinece. 
I researched and designed an 0-1 prototype, for startup consumers to different between similar offerings on the platform. It was launched on Google Cloud in 2024. 

**Duration:** 4 months  
**Role:** UX Designer, owned all research and the UX design of chatbot interaction. 
**Deliverables:** Figma hi-fi prototypes, Research report
**Collabotio:n** 1 senior designer, 1 UI designer, 1 engineer  

Embedding AI into the Product Discovery Experience for Startup Customers

Google Cloud offers 100+ products with different pricing, integrations, and capabilities. However, Browsing is messy. startup leaders struggle to find the right solution without clear guidance. The challenge was to help customers differentiate between similar offerings and discover solutions aligned with their business objectives.



### The Deliverables: 0→1 Prototypes


#### The Chatbot for contextual recommendation
Personalized recommendations for product discovery. The chatbot enhanced discoverability by providing real-time, personalized recommendations based on user needs. It guides users through complex solution comparisons without requiring them to navigate multiple pages.

#### Dynamic UI for personalized expereinces
Adaptive interface for user journey stages. Dynamic UI adapts based on where users are in their journey—landing, exploring, or comparing solutions. Different interface patterns emerge to support efficient discovery at each stage.

#### Comparison Tool for faster decision making
Side-by-side solution evaluation. The comparison tool enables users to evaluate solutions with "add to compare" selections. Making the comparison process explicit and transparent improves decision confidence.

The broader takeaway was that assisted browsing works only when the
system earns the right to intervene.

### Process

#### 1. Understand real browsing behavior

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

We looked at how people actually move through tasks rather than assuming
a clean search → result → action flow.

Real behavior contains backtracking, hesitation, context switching, and
signals that are ambiguous on their own.

#### 2. Translate behavior into intent carefully

The product needed to infer enough to be useful without treating every
action as a confident signal.

That meant thinking about context, confidence, and what evidence should
be required before the system acts.

#### 3. Design the explanation with the assistance

The AI's reasoning could not stay completely invisible. If the system surfaced a suggestion, the experience needed to help the user understand
why it was relevant and what control they still had.

#### 4. Treat privacy and scale as design constraints

Assisted browsing touches highly contextual behavior, so privacy and
security shaped the experience from the beginning.

At scale, incremental rollout also becomes part of the design process:
launch, observe, learn, and adjust rather than assuming the first
behavior model is final.

### Impact & Outcomes

**Validated Hypothesis:** Final prototype SUS score = **86.3%** (excellent usability). Confirmed that helping users differentiate between similar solutions is critical to improving adoption.

**Comprehensive Hand-offs:** Delivered raw data, interview protocols, coded insights, and ongoing participant connections to support future research and implementation.

------------------------------------------------------------------------
