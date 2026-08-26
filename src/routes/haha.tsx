import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HELLO_HUMANS } from "./helloHumansData";
import { MarqueeAlongSvgPath } from "@/components/ui/marquee-along-svg-path";

const SVG_PATH =
  "M1.12756 531.57C28.0893 516.8 74.8013 483.241 115.862 435.167M115.862 435.167C142.71 403.734 167.142 366.095 182.056 323.447C229.212 188.604 -65.6747 303.582 53.6794 397.09C73.8056 412.858 94.5052 425.626 115.862 435.167ZM115.862 435.167C221.157 482.211 342.426 450.85 489.709 314.125C517.752 288.093 540.139 265.319 557.876 245.305M557.876 245.305C652.19 138.884 615.024 110.493 597.546 85.1004C576.782 54.9327 401.867 14.2899 417.559 188.351C424.308 263.214 481.985 261.608 557.876 245.305ZM557.876 245.305C646.667 226.232 760.389 187.041 846.65 226.667M846.65 226.667C858.081 231.918 869.031 238.554 879.376 246.804C1034.5 370.518 957.576 540.884 843.253 562.658C768.137 576.964 767.606 395.943 846.65 226.667ZM846.65 226.667C887.908 138.309 950.848 53.1511 1036.18 0.642822";

export const Route = createFileRoute("/haha")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Vibe-coding projects, playful experiments, and creative explorations.",
      },
    ],
  }),
  component: PlayComponent,
});

const EVENT_IMAGES = [
  "/articles/event-19.png",
  "/articles/event-20.png",
  "/articles/event-21.png",
  "/articles/event-22.png",
  "/articles/event-23.png",
];

function EventModal({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ cursor: "auto" }} onClick={onClose}>
      <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors">✕</button>
        <div className="p-6 pb-4">
          <h2 className="text-xl font-semibold text-neutral-900 mb-1">Hosting events @Apple</h2>
          <p className="text-sm text-neutral-500 mb-4">5 events · Oct 2025 – May 2026</p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-6">
            You can kind of tell how my mindset shifted over a year. It started when the AI hype was still peaking—I was one of the first few people on my team using Claude Code, so I hosted a vibe coding meetup to share it. Then came a more sceptical phase: where should we actually <em>not</em> use AI? And by the end I just wanted to have fun—show and tell, lunch chats, no agenda. The whole arc in five events.
          </p>
        </div>

        {/* Image viewer */}
        <div className="px-6 pb-4">
          <img
            src={EVENT_IMAGES[activeIdx]}
            alt={`Event ${activeIdx + 1}`}
            className="w-full rounded-xl border-2 border-neutral-300 object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="px-6 pb-6 flex gap-2 overflow-x-auto">
          {EVENT_IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${activeIdx === i ? "border-neutral-900" : "border-neutral-300"}`}
            >
              <img src={src} alt={`Event ${i + 1}`} className="w-full h-full object-cover border border-neutral-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayComponent() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const allProjects = [
    {
      title: HELLO_HUMANS.title,
      description: HELLO_HUMANS.description,
      category: HELLO_HUMANS.category,
      meta: HELLO_HUMANS.meta,
      image: HELLO_HUMANS.image,
    },
    {
      title: "Meet the stranger challenge",
      description: "A simple post with a Calendly link: 'Hi all, I'm running a small experiment.' No agenda, just conversation. A real-time experiment in how people connect.",
      category: "Experiment",
      meta: "Connection · Open-ended",
      image: "/articles/meet-stranger-calendly.png",
      thumbnailSize: "medium",
      external: "https://www.linkedin.com/feed/update/urn:li:activity:7404207024164683776/",
    },
    {
      title: "Hosting events @Apple",
      description: "A year of gatherings—from vibe coding to questioning AI to just having fun. 5 events, 1 mental shift.",
      category: "Event",
      meta: "Community · IRL",
      image: "/articles/events-thumb.svg",
      thumbnailSize: "small",
      onCardClick: () => setShowEventModal(true),
    },
    {
      title: "Birthday card",
      description: "A small moment of delight. The joy is in the details, the unexpected animation, the gesture that makes you smile.",
      slug: "birthday-card",
      category: "Vibe-coding",
      meta: "Motion · Delight",
      videoPreview: "/articles/birthday-card.mp4",
      videoStartTime: 1,
    },
    {
      title: "Hand gesture interactions",
      description: "Exploring how gestures can make technology feel natural and embodied.",
      slug: "hand-gesture-interactions",
      category: "Vibe-coding",
      meta: "Gesture · Motion",
      videoPreview: "/articles/hand-gesture.mp4",
    },
    {
      title: "Palo Alto moment",
      description: "A location-based concept. What happens when design meets place?",
      slug: "palo-alto-moment",
      category: "Vibe-coding",
      meta: "Context · Place",
      videoPreview: "/articles/palo-alto.mp4",
    },
    {
      title: "Voice interaction",
      description: "Beyond screens. Exploring how voice can become an interface—natural, conversational, human.",
      slug: "voice-interaction",
      category: "Vibe-coding",
      meta: "Voice · AI",
      videoPreview: "/articles/voice.mp4",
    },
  ];

  const getThumbnail = (project: any) => {
    if (project.image) {
      return project.image;
    }
    // Use default for video projects since <img> can't display video files
    return "/articles/haha-1.png";
  };

  return (
    <div
      className="w-screen h-screen relative bg-zinc-50 flex flex-col overflow-auto"
      ref={(node) => setContainer(node)}
    >
      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} />}

      <div className="absolute h-[120%] sm:h-[150%] top-40 w-full justify-center items-center flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
        <MarqueeAlongSvgPath
          path={SVG_PATH}
          viewBox="0 0 1040 570"
          baseVelocity={4}
          showPath={false}
          slowdownOnHover={true}
          draggable={true}
          dragAwareDirection
          dragVelocityDecay={0.98}
          scrollAwareDirection={true}
          useScrollVelocity={true}
          scrollContainer={{ current: container }}
          repeat={4}
          enableRollingZIndex={true}
          dragSensitivity={0.01}
          className="absolute top-0 w-full h-full"
          responsive
          grabCursor
        >
          {allProjects.map((project, i) => (
            <div key={i} className="w-14 h-full cursor-pointer">
              <img
                src={getThumbnail(project)}
                alt={project.title}
                className="w-full h-full object-cover border border-neutral-300"
                draggable={false}
              />
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </div>
  );
}
