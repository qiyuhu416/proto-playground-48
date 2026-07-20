import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen — A network of people" },
      {
        name: "description",
        content: "Voices that have shaped my thinking. A visual map of mentors, collaborators, and friends.",
      },
    ],
  }),
  component: ListenComponent,
});

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isKey?: boolean;
}

interface Link {
  source: string;
  target: string;
}

const PEOPLE: Node[] = [
  { id: "center", name: "You", x: 400, y: 300, vx: 0, vy: 0, isKey: true },
  { id: "p1", name: "Mentor 1", x: 250, y: 150, vx: 0, vy: 0, isKey: true },
  { id: "p2", name: "Collaborator 1", x: 550, y: 180, vx: 0, vy: 0, isKey: true },
  { id: "p3", name: "Designer 1", x: 300, y: 450, vx: 0, vy: 0, isKey: true },
  { id: "p4", name: "Engineer 1", x: 500, y: 420, vx: 0, vy: 0, isKey: true },
  { id: "p5", name: "Researcher", x: 200, y: 300, vx: 0, vy: 0 },
  { id: "p6", name: "Friend", x: 600, y: 300, vx: 0, vy: 0 },
  { id: "p7", name: "Peer", x: 350, y: 200, vx: 0, vy: 0 },
  { id: "p8", name: "Mentor 2", x: 450, y: 250, vx: 0, vy: 0, isKey: true },
  { id: "p9", name: "Collaborator 2", x: 280, y: 380, vx: 0, vy: 0 },
  { id: "p10", name: "Advisor", x: 520, y: 500, vx: 0, vy: 0 },
];

const LINKS: Link[] = [
  { source: "center", target: "p1" },
  { source: "center", target: "p2" },
  { source: "center", target: "p3" },
  { source: "center", target: "p4" },
  { source: "center", target: "p5" },
  { source: "center", target: "p6" },
  { source: "center", target: "p7" },
  { source: "center", target: "p8" },
  { source: "p1", target: "p5" },
  { source: "p1", target: "p7" },
  { source: "p2", target: "p6" },
  { source: "p3", target: "p9" },
  { source: "p4", target: "p10" },
  { source: "p2", target: "p8" },
];

function ListenComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const nodesRef = useRef<Node[]>(PEOPLE.map((p) => ({ ...p })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animationFrameId = requestAnimationFrame(function animate() {
      // Clear canvas
      ctx.fillStyle = "rgb(15, 15, 15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Simple force simulation
      nodes.forEach((node) => {
        if (node.id === "center") return;
        const centerNode = nodes.find((n) => n.id === "center")!;
        const dx = centerNode.x - node.x;
        const dy = centerNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 0.002;
        node.vx += (dx / distance) * force;
        node.vy += (dy / distance) * force;
      });

      // Damping
      nodes.forEach((node) => {
        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw links
      ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
      ctx.lineWidth = 1;
      LINKS.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source)!;
        const target = nodes.find((n) => n.id === link.target)!;
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isKey = node.isKey;
        const isHovered = hoveredId === node.id;

        if (isKey) {
          ctx.fillStyle = isHovered ? "rgb(100, 200, 100)" : "rgb(150, 180, 100)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, isHovered ? 8 : 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = isHovered ? "rgb(200, 200, 200)" : "rgb(120, 120, 120)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, isHovered ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let closest: string | null = null;
      let minDistance = 15;

      nodesRef.current.forEach((node) => {
        const dx = node.x - x;
        const dy = node.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          minDistance = distance;
          closest = node.id;
        }
      });

      setHoveredId(closest);
      canvas.style.cursor = closest ? "pointer" : "default";
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => setHoveredId(null));

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", () => setHoveredId(null));
    };
  }, [hoveredId]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <a href="/" className="flex h-9 w-9 items-center justify-center text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
          </svg>
        </a>
        <nav className="flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-800 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          {(["Work", "Play", "Think", "Listen"] as const).map((l) => {
            return (
              <a
                key={l}
                href={l === "Work" ? "/" : `/${l.toLowerCase()}`}
                className={
                  "rounded-full px-4 py-1.5 text-sm transition-colors " +
                  (l === "Listen"
                    ? "bg-white text-neutral-900"
                    : "text-neutral-400 hover:text-white")
                }
              >
                {l}
              </a>
            );
          })}
        </nav>
        <div className="h-9 w-9" />
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="mb-8">
          <h1 className="text-4xl font-medium mb-2">Listen</h1>
          <p className="text-neutral-400">
            Voices and ideas that have shaped my thinking. Hover over the nodes to learn more.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full bg-neutral-950"
          />
        </div>

        {hoveredId && (
          <div className="mt-6 p-4 rounded-lg bg-neutral-800 border border-neutral-700">
            <p className="text-neutral-300">
              <span className="font-medium text-white">
                {nodesRef.current.find((n) => n.id === hoveredId)?.name}
              </span>
            </p>
          </div>
        )}

        <div className="mt-12 pb-24">
          <h2 className="text-lg font-medium mb-4">Key influences</h2>
          <div className="space-y-3">
            {PEOPLE.filter((p) => p.isKey && p.id !== "center").map((person) => (
              <div key={person.id} className="p-3 rounded-lg bg-neutral-800 border border-neutral-700">
                <p className="text-white font-medium">{person.name}</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Shaped my thinking on design, prototyping, and what it means to build.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
