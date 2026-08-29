import { useEffect, useRef, useState } from "react";

// ===== TUNABLE CONFIGURATION =====
// Adjust these values to customize the animation behavior

const CONFIG = {
  // Show/hide the entire axis visualization (dots, lines, labels)
  // Set to false to disable animated dots and axis lines completely
  showAxisVisualization: false,

  // Animation trigger: starts animation when Section 1 is at this visibility %
  // 0.7 = 70% visible, 0.5 = 50% visible, etc.
  animationTrigger: 0.7,

  // Target positions for dots (as percentage of container width/height)
  dotTargets: {
    self: { xPercent: 0.1, yPercent: 0.15 },      // top-left
    others: { xPercent: 0.1, yPercent: 0.75 },    // bottom-left
    products: { xPercent: 0.1, yPercent: 0.75 },  // intersection
    futures: { xPercent: 0.9, yPercent: 0.75 },   // bottom-right
  },

  // Clamp dots to viewport (prevents them from going off-screen)
  clampToViewport: true,
  viewportPaddingPx: 50, // Minimum pixels from edge

  // Section 2 height multiplier (1 = normal screen height)
  section2HeightMultiplier: 0.5, // 50vh - reduced to fit within flex container

  // Text fade timing (0-1)
  textFadeStart: 0,
  textFadeEnd: 0.5,

  // Axis opacity timing (0-1)
  axisOpacityStart: 0.5,
  axisOpacityEnd: 1,
};

interface DotState {
  id: string;
  label: string;
  startX: number;
  startY: number;
}

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dots, setDots] = useState<DotState[]>([
    { id: "self", label: "Self", startX: 0, startY: 0 },
    { id: "others", label: "Others", startX: 0, startY: 0 },
    { id: "products", label: "Products", startX: 0, startY: 0 },
    { id: "futures", label: "Futures", startX: 0, startY: 0 },
  ]);

  // Viewport-based animation trigger
  // Starts when dots reach ~50% screen height, ends when Section 2 is visible
  useEffect(() => {
    const handleScroll = () => {
      if (!section1Ref.current || !section2Ref.current) return;

      const viewportHeight = window.innerHeight;
      const section1Rect = section1Ref.current.getBoundingClientRect();
      const section2Rect = section2Ref.current.getBoundingClientRect();

      // Dots are in Section 1 - check if they've reached 50% screen height
      const dotsTriggerPoint = viewportHeight * 0.5;
      const dotsCurrentViewportY = section1Rect.bottom; // Bottom of Section 1

      // Calculate animation progress based on Section 2 visibility
      // 0 = Section 2 not yet visible
      // 1 = Section 2 fully visible
      const section2Top = section2Rect.top;
      const section2Bottom = section2Rect.bottom;

      let progress = 0;
      if (section2Top < viewportHeight) {
        // Section 2 is entering/in view
        progress = 1 - section2Top / viewportHeight;
      } else if (dotsCurrentViewportY < dotsTriggerPoint) {
        // Dots have passed trigger point but Section 2 not in view yet
        progress = (dotsTriggerPoint - dotsCurrentViewportY) / (dotsTriggerPoint * 0.5);
      }

      progress = Math.max(0, Math.min(1, progress));
      setAnimationProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate initial dot positions from text in Section 1
  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current || !section1Ref.current) return;

      const dotElements = section1Ref.current.querySelectorAll("[data-dot-id]");
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const updatedDots = [...dots];

      dotElements.forEach((el) => {
        const dotId = el.getAttribute("data-dot-id");
        const rect = el.getBoundingClientRect();

        const relX = rect.left - containerRect.left;
        const relY = rect.top - containerRect.top;

        const dotIndex = updatedDots.findIndex((d) => d.id === dotId);
        if (dotIndex >= 0) {
          updatedDots[dotIndex].startX = relX;
          updatedDots[dotIndex].startY = relY;
        }
      });

      setDots(updatedDots);
    };

    setTimeout(calculatePositions, 100);
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  // Easing function
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Get target position in Section 2 - using configuration
  const getTargetPosition = (dotId: string) => {
    if (!containerRef.current || !section2Ref.current) return { x: 0, y: 0 };

    const containerRect = containerRef.current.getBoundingClientRect();
    const section2Rect = section2Ref.current.getBoundingClientRect();

    const section2TopInContainer = section2Rect.top - containerRect.top;
    const cw = containerRect.width;
    const s2h = section2Rect.height;

    // Get target from config
    const config = CONFIG.dotTargets[dotId as keyof typeof CONFIG.dotTargets];
    if (!config) return { x: 0, y: 0 };

    let x = cw * config.xPercent;
    let y = section2TopInContainer + s2h * config.yPercent;

    // Clamp to viewport if enabled
    if (CONFIG.clampToViewport) {
      const padding = CONFIG.viewportPaddingPx;
      x = Math.max(padding, Math.min(cw - padding, x));
      // Clamp Y relative to Section 2, not viewport
      const s2StartY = Math.max(0, section2TopInContainer - padding);
      const s2EndY = Math.min(window.innerHeight * 2, section2TopInContainer + s2h + padding);
      y = Math.max(s2StartY, Math.min(s2EndY, y));
    }

    return { x, y };
  };

  // Calculate animated position
  const getAnimatedPosition = (dot: DotState, progress: number) => {
    const eased = easeInOutCubic(progress);
    const target = getTargetPosition(dot.id);
    const x = dot.startX + (target.x - dot.startX) * eased;
    const y = dot.startY + (target.y - dot.startY) * eased;
    return { x, y };
  };

  // Calculate opacity based on configuration
  const textFadeRange = CONFIG.textFadeEnd - CONFIG.textFadeStart;
  const textOpacity = Math.max(0, 1 - (Math.max(0, animationProgress - CONFIG.textFadeStart) / textFadeRange));

  const axisOpacityRange = CONFIG.axisOpacityEnd - CONFIG.axisOpacityStart;
  const axisOpacity = Math.max(0, (animationProgress - CONFIG.axisOpacityStart) / axisOpacityRange);

  const dotOpacity = Math.min(1, animationProgress);

  return (
    <div ref={containerRef} className="w-full">
      {/* SECTION 1: Diagram + Paragraph (OBSERVED) - natural height */}
      <div
        ref={section1Ref}
        className="relative w-full mx-auto max-w-6xl flex flex-col items-center gap-8 px-6 pt-8 pb-12"
      >
        <div
          className="w-full text-center"
        >
          <p className="text-3xl md:text-5xl text-neutral-900 leading-relaxed font-medium">
            Qiyu is exploring future technology for humans to understand{" "}
            <span className="relative">
              Self
              <span
                data-dot-id="self"
                className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </span>
            {" "}
            <span className="relative">
              Others
              <span
                data-dot-id="others"
                className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </span>
            {" "}through{" "}
            <span className="relative">
              Products
              <span
                data-dot-id="products"
                className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </span>
            {" "}and{" "}
            <span className="relative">
              Prototypes
              <span
                data-dot-id="futures"
                className="inline-block w-3 h-3 bg-red-400 rounded-full ml-2 mb-1"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </span>
          </p>
        </div>
      </div>

      {/* SECTION 2: Hidden - dots animate to lanspage section instead */}
      <div
        ref={section2Ref}
        id="axis-section"
        className="hidden"
      >
        {/* HTML text labels positioned near dots */}
        {CONFIG.showAxisVisualization && animationProgress > 0.5 && (() => {
          const selfPos = getAnimatedPosition(dots.find(d => d.id === "self")!, animationProgress);
          const othersPos = getAnimatedPosition(dots.find(d => d.id === "others")!, animationProgress);
          const productsPos = getAnimatedPosition(dots.find(d => d.id === "products")!, animationProgress);
          const futuresPos = getAnimatedPosition(dots.find(d => d.id === "futures")!, animationProgress);

          return (
            <>
              <div
                className="absolute text-xs text-neutral-400 pointer-events-none"
                style={{
                  left: `${selfPos.x - 30}px`,
                  top: `${selfPos.y - 20}px`,
                  opacity: axisOpacity,
                }}
              >
                INDIVIDUAL/SELF
              </div>

              <div
                className="absolute text-xs text-neutral-400 pointer-events-none"
                style={{
                  left: `${othersPos.x - 30}px`,
                  top: `${othersPos.y + 10}px`,
                  opacity: axisOpacity,
                }}
              >
                COMMUNITY/OTHERS
              </div>

              <div
                className="absolute text-xs text-neutral-400 pointer-events-none text-center"
                style={{
                  left: `${productsPos.x}px`,
                  top: `${productsPos.y + 15}px`,
                  transform: "translateX(-50%)",
                  opacity: axisOpacity,
                }}
              >
                PRODUCTION
              </div>

              <div
                className="absolute text-xs text-neutral-400 pointer-events-none text-center"
                style={{
                  left: `${futuresPos.x}px`,
                  top: `${futuresPos.y + 15}px`,
                  transform: "translateX(-50%)",
                  opacity: axisOpacity,
                }}
              >
                FUTURE CONCEPTS
              </div>
            </>
          );
        })()}
      </div>

      {/* Dynamic Axis SVG - lines connect the dots */}
      {CONFIG.showAxisVisualization && containerRef.current && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${containerRef.current.getBoundingClientRect().width} ${containerRef.current.getBoundingClientRect().height}`}
          style={{ opacity: Math.max(0, animationProgress * 0.5) }} // Fade in with animation
          preserveAspectRatio="none"
        >
          {(() => {
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return null;

            // Get current positions of each dot
            const selfPos = getAnimatedPosition(dots.find(d => d.id === "self")!, animationProgress);
            const othersPos = getAnimatedPosition(dots.find(d => d.id === "others")!, animationProgress);
            const productsPos = getAnimatedPosition(dots.find(d => d.id === "products")!, animationProgress);
            const futuresPos = getAnimatedPosition(dots.find(d => d.id === "futures")!, animationProgress);

            return (
              <>
                {/* Vertical axis: Self to Others */}
                <line
                  x1={selfPos.x}
                  y1={selfPos.y}
                  x2={othersPos.x}
                  y2={othersPos.y}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />

                {/* Horizontal axis: Products to Future Concepts */}
                <line
                  x1={productsPos.x}
                  y1={productsPos.y}
                  x2={futuresPos.x}
                  y2={futuresPos.y}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />
              </>
            );
          })()}
        </svg>
      )}

      {/* Animated dots layer - spans both sections */}
      {CONFIG.showAxisVisualization && dots.map((dot) => {
        const pos = getAnimatedPosition(dot, animationProgress);

        return (
          <div
            key={dot.id}
            className="absolute w-3 h-3 bg-red-400 rounded-full pointer-events-none"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              opacity: dotOpacity,
              zIndex: 20,
            }}
          />
        );
      })}
    </div>
  );
}
