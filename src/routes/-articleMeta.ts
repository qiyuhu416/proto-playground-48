/** Convert a section label to a URL-safe id */
export function sectionId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const ARTICLE_META: Record<string, { title: string; thumbnail?: string; thumbnailSize?: "xs" | "small" | "medium"; sections?: string[] }> = {
  "what-do-prototypes-prototype": {
    title: "What do prototypes prototype?",
    thumbnail: "/articles/prototype-triangle-thumb.svg",
    thumbnailSize: "medium",
    sections: ["Prototype = Research mindset", "Prototypers for prototyping", "Not all prototypes need to be software"],
  },
  "ai-ai-interaction": {
    title: "AI–AI interaction",
  },
  "designing-next-gen-ai-products": {
    title: "Designing Next-Gen AI Products",
    thumbnail: "/articles/trust-thumb.png",
    thumbnailSize: "medium",
    sections: ["Designing the relationship", "Designing the feeling", "Where to NOT use AI", "Three core lessons"],
  },
  "reimagining-the-chatbot": {
    title: "A collection of reimagining the chatbot",
    thumbnail: "/articles/chatbot-thumb.png",
    sections: ["The Promise", "Task Analysis: What \"Asking a Question\" Takes", "Prototypes Exploring These Dimensions", "What Gets Tested", "The Challenge", "Next Steps"],
  },
  "product-launch-from-0-1": {
    title: "Product launch from 0–1",
    thumbnail: "/articles/product-launch-thumb.png",
  },
  "contextual-ai-assistance": {
    title: "Contextual AI assistance",
  },
  "knowledge-graph-visualization": {
    title: "What if knowledge graph is user-facing?",
  },
  "google-cloud": {
    title: "Google Cloud - Conversational AI",
    thumbnail: "/articles/google-cloud-hero.png",
    sections: ["The Challenge", "Problem Statement", "Research Questions", "The Deliverables: 0→1 Prototypes", "Research Methodology", "Key Insights", "Impact & Outcomes", "Key Learnings"],
  },
  "a2ui-generative": {
    title: "A2UI & Generative UI",
    thumbnail: "/articles/a2ui-thumb.svg",
    thumbnailSize: "small",
    sections: ["What is A2UI?", "Exploring from Use Cases", "Interaction Patterns", "Research References", "The Big Question"],
  },
  "design-as-a-research-tool": {
    title: "Service Design & Physical prototypes",
    thumbnail: "/articles/design-as-research-tool-thumb.png",
    sections: ["The Challenge", "Methodology: Design as Discovery", "What Design Revealed", "Outcome: From Research to Policy", "Research Frameworks Used", "Why Design Was Essential"],
  },
  "physical-ai": {
    title: "Physical AI",
    thumbnail: "/articles/physical-ai-thumb.png",
    sections: ["The Challenge: Human Error in Phlebotomy", "Why AI?", "Mapping AI to Error: Short-term vs. Long-term", "The System: Hardware & Design", "The User Flow: 8-Step Collection Journey", "Team & Collaboration", "Key Takeaway"],
  },
  "claude-code-research": {
    title: "My story with Claude Code",
    thumbnail: "/articles/claude-code-thumb.png",
    thumbnailSize: "small" as const,
    sections: ["What AI can't do", "Don't be AI's agent"],
  },
  "designing-for-conversations-that-earn-trust": {
    title: "Conversation Design for Human-AI trust",
    thumbnail: "/articles/conversation-trust-icon.svg",
    thumbnailSize: "small",
    sections: ["Designing the relationship", "Trust can be scripted", "Trust means knowing your limits", "What this means for designers"],
  },
  "proactive": {
    title: "Proactive",
    thumbnail: "/articles/proactive-thumb.svg",
    thumbnailSize: "small",
    sections: ["A prototype for prototyping", "The demo", "Variables as questions", "The takeaway"],
  },
  "personalization": {
    title: "Personalization",
    thumbnail: "/articles/personalization-thumb.svg",
    thumbnailSize: "xs",
    sections: ["So, what makes person a person?", "Person & personalization", "Humanity-centered Design"],
  },
  "making-design-fun": {
    title: "Making design fun",
    sections: ["The philosophy: friction-free creation", "Curiosity, not FOMO", "The experiments", "One block of prompts", "What makes design playful", "Why this matters"],
  },
  "always-here": {
    title: "I Am Always Here—Just Let Me Know",
  },
};
