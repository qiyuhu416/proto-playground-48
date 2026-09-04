import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { REFLECTIONS } from "@/data/reflections";

export const Route = createFileRoute("/reflection-notes")({
  head: () => ({
    meta: [
      { title: "Reflection Notes — Qiyu x AI interaction" },
      {
        name: "description",
        content: "All reflection notes — dated thoughts, sketches, and observations on design and AI.",
      },
    ],
  }),
  component: ReflectionNotesPage,
});

function ReflectionNotesPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const sorted = [...REFLECTIONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-medium mb-10 text-neutral-900">Reflection Notes</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sorted.map((r, idx) => {
            const isExpanded = expanded.has(idx);
            const words = r.content.split(/\s+/);
            const title = words.slice(0, 7).join(" ") + (words.length > 7 ? "…" : "");
            const rest = words.length > 7 ? words.slice(7).join(" ") : "";
            const preview = rest.length > 100 ? rest.slice(0, 100) + "…" : rest;

            return (
              <div
                key={idx}
                onClick={() => toggle(idx)}
                className="border border-neutral-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow flex flex-col gap-2 cursor-pointer"
              >
                {r.image && (
                  <img
                    src={r.image}
                    alt="Reflection"
                    className="w-full h-24 object-cover rounded-md border border-neutral-200"
                  />
                )}
                <div className="text-[10px] text-neutral-500 font-medium">{r.date}</div>
                <div className="text-neutral-900 text-xs font-medium leading-snug">{title}</div>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {isExpanded ? r.content : preview}
                </p>
                {rest.length > 100 && (
                  <span className="text-[10px] text-neutral-400 self-start">
                    {isExpanded ? "Show less" : "Read more"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
