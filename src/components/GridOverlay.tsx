import { useState, useEffect } from "react";

export const GridOverlay = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "g" || e.key === "G") {
        setShowGrid((prev) => !prev);
      }
    };

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  if (!showGrid) return null;

  const gridSize = 40;
  const margin = 40;
  const { width, height } = dimensions;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <svg width={width} height={height} style={{ display: "block" }}>
        {/* Vertical lines */}
        {Array.from({
          length: Math.ceil((width - margin * 2) / gridSize) + 1,
        }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={margin + i * gridSize}
            y1={0}
            x2={margin + i * gridSize}
            y2={height}
            stroke="#d0d0d0"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({
          length: Math.ceil((height - margin * 2) / gridSize) + 1,
        }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={margin + i * gridSize}
            x2={width}
            y2={margin + i * gridSize}
            stroke="#d0d0d0"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Margin border lines */}
        <line x1={margin} y1={0} x2={margin} y2={height} stroke="#a0a0a0" strokeWidth="1" opacity="0.5" />
        <line x1={width - margin} y1={0} x2={width - margin} y2={height} stroke="#a0a0a0" strokeWidth="1" opacity="0.5" />
        <line x1={0} y1={margin} x2={width} y2={margin} stroke="#a0a0a0" strokeWidth="1" opacity="0.5" />
        <line x1={0} y1={height - margin} x2={width} y2={height - margin} stroke="#a0a0a0" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
};
