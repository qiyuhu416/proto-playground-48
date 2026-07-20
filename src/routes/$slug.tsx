import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";

export const Route = createFileRoute("/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: formatTitle(params.slug) },
      {
        name: "description",
        content: "An interactive prototype exploring UI interactions and design concepts.",
      },
    ],
  }),
  component: PrototypeComponent,
});

const PROTOTYPES: Record<string, { title: string; category: string; description: string; mediaType: "video" | "image"; media: string }> = {
  "hand-gesture-interactions": {
    title: "Hand gesture interactions",
    category: "Look & Feel",
    description: "Exploring how gesture recognition can make AI feel more natural and human.",
    mediaType: "video",
    media: "/articles/hand-gesture.mov",
  },
  "ai-ai-interaction": {
    title: "AI–AI interaction",
    category: "Look & Feel",
    description: "Visualizing how two AI agents communicate and resolve differences in real-time.",
    mediaType: "video",
    media: "/articles/ai-ai-inetraction.mov",
  },
  "select-fill-with-prompts": {
    title: "Select & fill with prompts",
    category: "Implementation",
    description: "Generative design workflow—select a region, describe intent, watch it fill intelligently.",
    mediaType: "video",
    media: "/articles/select-n-fill-prompt.mov",
  },
  "contextual-ai-assistance": {
    title: "Contextual AI assistance",
    category: "Implementation",
    description: "How context shapes what an AI suggests—the difference between generic and genius.",
    mediaType: "video",
    media: "/articles/contextual-ask.mov",
  },
  "knowledge-graph-visualization": {
    title: "Knowledge graph visualization",
    category: "Look & Feel",
    description: "Turning abstract AI reasoning into tangible, navigable visual structures.",
    mediaType: "video",
    media: "/articles/visualize-knowledge-graph.mov",
  },
  "ai-push-back-affordances": {
    title: "AI push-back affordances",
    category: "Look & Feel",
    description: "Designing moments where AI respectfully disagrees, explains why, and invites collaboration.",
    mediaType: "image",
    media: "/articles/ai-push-back.png",
  },
};

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PrototypeComponent() {
  const { slug } = Route.useParams();
  const proto = PROTOTYPES[slug];

  if (!proto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Not found</h1>
          <a href="/" className="text-primary hover:underline">
            Back to portfolio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{proto.category}</span>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-neutral-900">{proto.title}</h1>
          <p className="mt-4 text-base text-neutral-600">{proto.description}</p>
        </div>

        <div className="rounded-2xl overflow-hidden bg-neutral-100 aspect-video flex items-center justify-center border border-neutral-200">
          {proto.mediaType === "video" ? (
            <video
              src={proto.media}
              controls
              className="w-full h-full"
              poster="/articles/hand-gesture-thumb.jpg"
            />
          ) : (
            <img src={proto.media} alt={proto.title} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="mt-12 max-w-2xl">
          <h2 className="text-2xl font-medium text-neutral-900 mb-4">About this prototype</h2>
          <p className="text-neutral-600 mb-4">
            This is an interactive exploration of a design concept. The prototype above demonstrates the
            interaction, animation, and user experience of the idea in motion.
          </p>
          <p className="text-neutral-600 mb-4">
            The design decisions shown here are informed by research into how users interact with AI, what
            makes interactions feel natural, and how to communicate system capabilities clearly.
          </p>

          <h2 className="text-lg font-medium text-neutral-900 mt-8 mb-3">Key design insights</h2>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Gesture recognition makes AI interactions feel more intuitive</li>
            <li>• Clear feedback loops reduce uncertainty in human-AI collaboration</li>
            <li>• Visual representation of AI reasoning builds trust and understanding</li>
            <li>• Respectful disagreement preserves human agency in the workflow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
