import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "./-SiteNav";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      { name: "description", content: "Voices and values that have shaped my thinking." },
    ],
  }),
  component: ListenComponent,
});

interface NodeData {
  id: string;
  label: string;
  fullLabel: string;
  quote?: string;
  type: "synthesis" | "person";
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const CX = 450, CY = 240;

const INITIAL_NODES: NodeData[] = [
  { id: "joy",       label: "Joy in work",         fullLabel: "Find joy in the work itself",                              type: "synthesis", x: CX - 120, y: CY - 40,  vx: 0, vy: 0 },
  { id: "inspire",   label: "Inspire & be inspired",fullLabel: "Inspire others and let yourself be inspired in return",   type: "synthesis", x: CX + 80,  y: CY - 80,  vx: 0, vy: 0 },
  { id: "action",    label: "Bias to act",          fullLabel: "Have a bias toward action — make things happen",          type: "synthesis", x: CX + 200, y: CY + 60,  vx: 0, vy: 0 },
  { id: "ambiguity", label: "Embrace the mess",     fullLabel: "Hold your urge to solve; sit with the messiness",         type: "synthesis", x: CX - 60,  y: CY + 120, vx: 0, vy: 0 },
  { id: "direction", label: "Direction > pace",     fullLabel: "Being on the right track matters more than being fast",   type: "synthesis", x: CX + 140, y: CY + 150, vx: 0, vy: 0 },
  { id: "mia",    label: "Mia H.",    fullLabel: "Mia H.",    quote: "Make work fun.",                                                                  type: "person", x: CX - 280, y: CY - 100, vx: 0, vy: 0 },
  { id: "samar",  label: "Samar K.",  fullLabel: "Samar K.",  quote: "I am lucky to have a job I would work for even without getting paid.",             type: "person", x: CX - 260, y: CY + 60,  vx: 0, vy: 0 },
  { id: "sharif", label: "Sharif S.", fullLabel: "Sharif S.", quote: "It feels great to inspire people and get inspired.",                               type: "person", x: CX + 20,  y: CY - 200, vx: 0, vy: 0 },
  { id: "yan",    label: "Yan M.",    fullLabel: "Yan M.",    quote: "Make things happen.",                                                               type: "person", x: CX + 340, y: CY - 20,  vx: 0, vy: 0 },
  { id: "jess",   label: "Jess H.",   fullLabel: "Jess H.",   quote: "Hold your tendency to seek solutions; enjoy the messiness.",                        type: "person", x: CX - 180, y: CY + 200, vx: 0, vy: 0 },
  { id: "qian",   label: "Qian Y.",   fullLabel: "Qian Y.",   quote: "It's okay to be a little slow as long as you're on the right track.",              type: "person", x: CX + 300, y: CY + 200, vx: 0, vy: 0 },
];

const LINKS = [
  { source: "mia",       target: "joy"       },
  { source: "samar",     target: "joy"       },
  { source: "sharif",    target: "inspire"   },
  { source: "sharif",    target: "joy"       },
  { source: "yan",       target: "action"    },
  { source: "jess",      target: "ambiguity" },
  { source: "qian",      target: "direction" },
  { source: "joy",       target: "inspire"   },
  { source: "ambiguity", target: "direction" },
];

const SPECIAL_PEOPLE = [
  {
    id: "mia",
    name: "Mia Hu",
    role: "who I currently see every week :)",
    note: "The best job is about making good laugh with good people. Mia makes me like my job",
  },
  {
    id: "huaze",
    name: "Huaze Shao",
    role: "that Buddhist friend, currently in China",
    note: "Someone I always turn to when I navigate through life's uncertainties, drink tea with, or simply yawn together while soaking up the sun.",
  },
  {
    id: "jess",
    name: "Jess Hammer",
    role: "mentor from my college, currently in Pittsburgh",
    note: "still thinking about how to write a proper description about Jess, but EVERYONE has something to say about her. She is a magical person.",
  },
];

function ListenComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodeData[]>(INITIAL_NODES.map(n => ({ ...n })));
  const hoveredIdRef = useRef<string | null>(null);
  const dragRef = useRef<{ id: string } | null>(null);
  const rafRef = useRef<number>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = 900, H = 480;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {
      const nodes = nodesRef.current;

      // Force simulation
      nodes.forEach((a, i) => {
        if (dragRef.current?.id === a.id) return;
        let fx = 0, fy = 0;

        // Repulsion
        nodes.forEach((b, j) => {
          if (i === j) return;
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const f = 4000 / (dist * dist);
          fx += (dx / dist) * f;
          fy += (dy / dist) * f;
        });

        // Spring attraction along links
        LINKS.forEach(link => {
          if (link.source !== a.id && link.target !== a.id) return;
          const otherId = link.source === a.id ? link.target : link.source;
          const b = nodes.find(n => n.id === otherId);
          if (!b) return;
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const stretch = dist - 130;
          fx += (dx / dist) * 0.05 * stretch;
          fy += (dy / dist) * 0.05 * stretch;
        });

        // Gravity toward center
        fx += (W / 2 - a.x) * 0.005;
        fy += (H / 2 - a.y) * 0.005;

        a.vx = (a.vx + fx) * 0.78;
        a.vy = (a.vy + fy) * 0.78;
        a.x = Math.max(24, Math.min(W - 24, a.x + a.vx));
        a.y = Math.max(24, Math.min(H - 24, a.y + a.vy));
      });

      // Render
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, W, H);

      const hov = hoveredIdRef.current;
      const linkedToHov = new Set<string>();
      if (hov) {
        LINKS.forEach(l => {
          if (l.source === hov) linkedToHov.add(l.target);
          if (l.target === hov) linkedToHov.add(l.source);
        });
      }

      // Links
      LINKS.forEach(link => {
        const s = nodes.find(n => n.id === link.source);
        const t = nodes.find(n => n.id === link.target);
        if (!s || !t) return;
        const active = hov && (link.source === hov || link.target === hov);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)";
        ctx.lineWidth = active ? 1.2 : 0.7;
        ctx.stroke();
      });

      // Nodes
      nodes.forEach(node => {
        const isGreen = node.type === "synthesis";
        const isHov = node.id === hov;
        const isLinked = linkedToHov.has(node.id);
        const dimmed = hov && !isHov && !isLinked;
        const r = isGreen ? (isHov ? 9 : 7) : (isHov ? 7 : 4.5);

        // Glow
        if (isHov || isLinked) {
          const grad = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, r + 14);
          grad.addColorStop(0, isGreen ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.12)");
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 14, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        if (isGreen) {
          ctx.fillStyle = dimmed ? "rgba(52,211,153,0.25)" : (isHov ? "#a7f3d0" : "#34d399");
        } else {
          ctx.fillStyle = dimmed
            ? "rgba(115,115,115,0.3)"
            : isHov
            ? "#ffffff"
            : isLinked
            ? "rgba(212,212,212,0.85)"
            : "rgba(163,163,163,0.65)";
        }
        ctx.fill();

        // Label
        const alpha = dimmed ? 0.25 : 1;
        ctx.globalAlpha = alpha;
        ctx.font = `${isHov ? "11px" : "10px"} -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = isGreen
          ? isHov ? "#a7f3d0" : "#6ee7b7"
          : isHov ? "#e5e5e5" : "#737373";
        ctx.fillText(node.label, node.x, node.y + r + 13);
        ctx.globalAlpha = 1;
      });

      // Inline quote tooltip for hovered person node
      if (hov) {
        const hovNode = nodes.find(n => n.id === hov);
        if (hovNode && hovNode.type === "person" && hovNode.quote) {
          const text = `"${hovNode.quote}"`;
          const maxW = 210;
          const pad = 10;
          const lineH = 15;
          ctx.font = "italic 10.5px -apple-system, BlinkMacSystemFont, sans-serif";
          const words = text.split(" ");
          const lines: string[] = [];
          let cur = "";
          for (const w of words) {
            const test = cur ? `${cur} ${w}` : w;
            if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
            else cur = test;
          }
          if (cur) lines.push(cur);
          const bw = Math.min(maxW, Math.max(...lines.map(l => ctx.measureText(l).width))) + pad * 2;
          const bh = lines.length * lineH + pad * 2;
          let bx = hovNode.x + 16;
          if (bx + bw > W - 8) bx = hovNode.x - 16 - bw;
          let by = Math.max(8, Math.min(H - bh - 8, hovNode.y - bh / 2));
          ctx.fillStyle = "rgba(12,12,14,0.93)";
          ctx.strokeStyle = "rgba(255,255,255,0.1)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, 6);
          ctx.fill(); ctx.stroke();
          ctx.fillStyle = "rgba(212,212,212,0.9)";
          ctx.textAlign = "left";
          lines.forEach((line, i) => ctx.fillText(line, bx + pad, by + pad + (i + 1) * lineH - 3));
          ctx.textAlign = "center";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const pick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      let best: NodeData | null = null as NodeData | null, minD = 28;
      nodesRef.current.forEach(n => {
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < minD) { minD = d; best = n; }
      });
      return { best, mx, my };
    };

    const onMove = (e: MouseEvent) => {
      const { best, mx, my } = pick(e);
      hoveredIdRef.current = best?.id ?? null;
      setHoveredId(best?.id ?? null);
      if (dragRef.current) {
        const n = nodesRef.current.find(n => n.id === dragRef.current!.id);
        if (n) { n.x = mx; n.y = my; n.vx = 0; n.vy = 0; }
      }
      canvas.style.cursor = dragRef.current ? "grabbing" : best ? "grab" : "default";
    };
    const onDown = (e: MouseEvent) => {
      const { best } = pick(e);
      if (best) { dragRef.current = { id: best.id }; canvas.style.cursor = "grabbing"; }
    };
    const onUp = () => { dragRef.current = null; };
    const onLeave = () => { hoveredIdRef.current = null; setHoveredId(null); dragRef.current = null; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const hoveredNode = INITIAL_NODES.find(n => n.id === hoveredId);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <SiteNav active="listen" theme="dark" />

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="mb-6">
          <h1 className="text-4xl font-medium mb-3">Listen</h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <canvas ref={canvasRef} width={900} height={480} className="w-full" />
        </div>

        {/* Value strip — only for synthesis nodes */}
        <div className="mt-3 h-8 flex items-center px-1">
          {hoveredNode?.type === "synthesis" ? (
            <div className="flex items-baseline gap-2.5">
              <span className="text-xs text-emerald-600 uppercase tracking-wider shrink-0">Value</span>
              <span className="text-sm text-emerald-300">{hoveredNode.fullLabel}</span>
            </div>
          ) : (
            <span className="text-xs text-neutral-700"></span>
          )}
        </div>
      </section>

      {/* Special people */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <h2 className="text-sm tracking-[0.18em] text-white mb-8">People who shaped how I think</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_PEOPLE.map(p => (
            <div key={p.id} className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
              <div className="mb-4">
                <p className="text-white font-medium text-base">{p.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{p.role}</p>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
