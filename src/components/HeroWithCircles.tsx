import { useEffect, useRef, useState } from "react";

interface CirclePosition {
  id: string;
  label: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  axisX: number;
  axisY: number;
}

export function HeroWithCircles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const circles: CirclePosition[] = [
    {
      id: "self",
      label: "self",
      startX: 15,
      startY: 20,
      targetX: 50,
      targetY: 50,
      axisX: 25,
      axisY: 75,
    },
    {
      id: "others",
      label: "others",
      startX: 85,
      startY: 20,
      targetX: 50,
      targetY: 50,
      axisX: 75,
      axisY: 75,
    },
    {
      id: "products",
      label: "products",
      startX: 15,
      startY: 80,
      targetX: 50,
      targetY: 50,
      axisX: 25,
      axisY: 25,
    },
    {
      id: "futures",
      label: "futures",
      startX: 85,
      startY: 80,
      targetX: 50,
      targetY: 50,
      axisX: 75,
      axisY: 25,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when the element is in view
      // 0 = not yet visible, 1 = fully passed
      let progress = 1 - rect.top / windowHeight;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Easing function for smooth animation
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animProgress = easeInOutCubic(Math.min(scrollProgress * 1.5, 1));

  const getCirclePosition = (circle: CirclePosition) => {
    // Phase 1 (0-0.5): circles converge to center
    // Phase 2 (0.5-1): circles expand to axis positions
    const phase = animProgress;

    if (phase < 0.5) {
      // Converge
      const convergeProgress = phase * 2;
      const x = circle.startX + (circle.targetX - circle.startX) * convergeProgress;
      const y = circle.startY + (circle.targetY - circle.startY) * convergeProgress;
      return { x, y, scale: 1 };
    } else {
      // Expand
      const expandProgress = (phase - 0.5) * 2;
      const x = circle.targetX + (circle.axisX - circle.targetX) * expandProgress;
      const y = circle.targetY + (circle.axisY - circle.targetY) * expandProgress;
      return { x, y, scale: 1 };
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Text content */}
      <div className="mx-auto max-w-4xl px-6 py-12 mb-20">
        <div className="text-2xl md:text-4xl text-neutral-900 leading-relaxed font-medium space-y-4">
          <p>
            I create{" "}
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-900"></span>
              <span className="font-semibold">designs for self</span>
            </span>
            —how people know themselves through technology. I build systems that facilitate{" "}
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-900"></span>
              <span className="font-semibold">understanding others</span>
            </span>
            —empathy across stakeholders. I ship{" "}
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-900"></span>
              <span className="font-semibold">products</span>
            </span>{" "}
            that solve real problems at scale. And I explore{" "}
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-900"></span>
              <span className="font-semibold">future concepts</span>
            </span>
            —prototypes that question what's possible.
          </p>
        </div>
      </div>

      {/* Animated circles visualization */}
      <div className="relative w-full h-96 mb-32 mt-20">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Axis lines (appear on scroll) */}
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="80"
            stroke="#d4d4d4"
            strokeWidth="0.5"
            opacity={Math.max(0, animProgress - 0.5) * 2}
          />
          <line
            x1="20"
            y1="50"
            x2="80"
            y2="50"
            stroke="#d4d4d4"
            strokeWidth="0.5"
            opacity={Math.max(0, animProgress - 0.5) * 2}
          />

          {/* Circles */}
          {circles.map((circle) => {
            const pos = getCirclePosition(circle);
            return (
              <g key={circle.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill="currentColor"
                  className="text-neutral-900"
                  opacity={0.8}
                />
                {/* Labels (only show when expanded) */}
                {animProgress > 0.5 && (
                  <text
                    x={pos.x}
                    y={pos.y + 12}
                    textAnchor="middle"
                    className="text-xs font-medium fill-neutral-500"
                    fontSize="3"
                  >
                    {circle.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Quadrant labels */}
      <div className="relative w-full h-40 mb-12">
        <div className="absolute top-0 left-1/4 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Understanding Self
          </p>
        </div>
        <div className="absolute top-0 right-1/4 translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Understanding Others
          </p>
        </div>
        <div className="absolute bottom-0 left-1/4 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Prototyping
          </p>
        </div>
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Exploring
          </p>
        </div>
      </div>
    </div>
  );
}
