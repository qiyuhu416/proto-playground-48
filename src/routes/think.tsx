import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NAV_ITEMS, navHref } from "./navItems";

export const Route = createFileRoute("/think")({
  head: () => ({
    meta: [
      { title: "Qiyu x AI interaction" },
      {
        name: "description",
        content: "Mental models, thinking frameworks, and written reflections on design and prototyping.",
      },
    ],
  }),
  component: ThinkComponent,
});

function ThinkComponent() {
  const [quadrantOpen, setQuadrantOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <div className="h-9 w-9" />
        <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {NAV_ITEMS.map((l) => (
            <a
              key={l}
              href={navHref(l)}
              className={
                "rounded-full px-4 py-1.5 text-sm transition-colors " +
                (l === "reflect"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900")
              }
            >
              {l}
            </a>
          ))}
        </nav>
        <a href="/" className="text-sm font-medium text-neutral-900">Qiyu</a>
      </header>

      {/* Frameworks section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Frameworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Analysis-synthesis bridge */}
          <a
            href="https://www.dubberly.com/articles/interactions-the-analysis-synthesis-bridge-model.html"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow block group"
          >
            <div className="mb-6">
              <svg viewBox="0 0 120 80" fill="none" className="w-28 h-auto opacity-80">
                <circle cx="35" cy="22" r="9" fill="#1a1a1a"/>
                <circle cx="85" cy="22" r="9" fill="#1a1a1a"/>
                <circle cx="35" cy="58" r="9" fill="#1a1a1a"/>
                <circle cx="85" cy="58" r="9" fill="#1a1a1a"/>
                <line x1="44" y1="22" x2="76" y2="22" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2"/>
                <line x1="44" y1="58" x2="76" y2="58" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2"/>
                <line x1="35" y1="31" x2="35" y2="49" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2"/>
                <line x1="85" y1="31" x2="85" y2="49" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Analysis-synthesis bridge</h3>
            <p className="text-neutral-600 text-sm">The best model by Hugh Dubberly! It has been helping me intentionally practice "thinking outside the box" the mindset</p>
          </a>

          {/* Double diamond */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 140 80" fill="none" className="w-28 h-auto opacity-80">
                <polygon points="15,40 47,12 79,40 47,68" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                <polygon points="61,40 93,12 125,40 93,68" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="79" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="125" cy="40" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Double diamond</h3>
            <p className="text-neutral-600 text-sm">The designer thinking day 1 model. Ya I hear sometimes it could be "too theoretical", but at least it let us know where we are making a leap of faith while we have to.</p>
          </div>

          {/* Me × Others × Think × Do */}
          <button
            onClick={() => setQuadrantOpen(true)}
            className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow text-left group"
          >
            <div className="mb-6">
              <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 opacity-80">
                <circle cx="40" cy="10" r="9" fill="#1a1a1a"/>
                <circle cx="10" cy="40" r="9" fill="#1a1a1a"/>
                <circle cx="70" cy="40" r="9" fill="#1a1a1a"/>
                <circle cx="40" cy="70" r="9" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Me · Others · Think · Do</h3>
            <p className="text-neutral-600 text-sm">2×2 is just a cool way to map out the situations and help me see my own "unknown-unkonwn"s</p>
          </button>

          {/* Service blueprint */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 120 80" fill="none" className="w-28 h-auto opacity-80">
                <line x1="8" y1="18" x2="112" y2="18" stroke="#d4d4d4" strokeWidth="1"/>
                <line x1="8" y1="40" x2="112" y2="40" stroke="#d4d4d4" strokeWidth="1"/>
                <line x1="8" y1="62" x2="112" y2="62" stroke="#d4d4d4" strokeWidth="1"/>
                <circle cx="22" cy="18" r="4" fill="#1a1a1a"/>
                <circle cx="55" cy="18" r="4" fill="#1a1a1a"/>
                <circle cx="88" cy="18" r="4" fill="#1a1a1a"/>
                <circle cx="35" cy="40" r="4" fill="#1a1a1a"/>
                <circle cx="70" cy="40" r="4" fill="#1a1a1a"/>
                <circle cx="100" cy="40" r="4" fill="#1a1a1a"/>
                <circle cx="22" cy="62" r="4" fill="#1a1a1a"/>
                <circle cx="55" cy="62" r="4" fill="#1a1a1a"/>
                <circle cx="88" cy="62" r="4" fill="#1a1a1a"/>
                <line x1="55" y1="22" x2="35" y2="36" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <line x1="70" y1="44" x2="55" y2="58" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <line x1="22" y1="18" x2="55" y2="18" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="55" y1="18" x2="88" y2="18" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="35" y1="40" x2="70" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="70" y1="40" x2="100" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="22" y1="62" x2="55" y2="62" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="55" y1="62" x2="88" y2="62" stroke="#1a1a1a" strokeWidth="1"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Service blueprint</h3>
            <p className="text-neutral-600 text-sm">What are all the stakeholders, what do they do, and how are their actions related to each other. Layer by layer, step by step. Great for service design.</p>
          </div>

        </div>
      </section>

      {/* Blog/Writing section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-medium mb-8 text-neutral-900">Reflections</h2>
        <div className="space-y-4">
          {[
            {
              title: "What do prototypes prototype?",
              excerpt: "A reflection on what we're actually testing when we prototype.",
              date: "Apr 2026",
              readTime: "8 min",
            },
            {
              title: "How I use AI to create",
              excerpt: "Prototyping as research, and why AI should augment—not replace—thinking.",
              date: "Apr 2026",
              readTime: "5 min",
            },
            {
              title: "Making design fun",
              excerpt: "On curiosity, vibe-coding, and why creation should feel like play.",
              date: "Apr 2026",
              readTime: "5 min",
            },
            {
              title: "Designing Next-Gen AI Products",
              excerpt: "Mapping UX to capability. Lessons from conversational AI and human-AI co-writing.",
              date: "Apr 2026",
              readTime: "8 min",
            },
            {
              title: "Cheap edges, expensive corners",
              excerpt: "Where quality actually accrues in an interface.",
              date: "Apr 2026",
              readTime: "5 min",
            },
          ].map((article) => (
            <a
              key={article.title}
              href="/"
              className="block rounded-lg border border-neutral-200 p-4 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-neutral-900">{article.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{article.excerpt}</p>
                  <div className="mt-2 flex gap-2 text-xs text-neutral-500">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <span className="text-neutral-400">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Me × Others × Think × Do modal */}
      {quadrantOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setQuadrantOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuadrantOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors text-lg leading-none"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-neutral-900 mb-1">Me · Others · Think · Do</h2>
            <p className="text-sm text-neutral-500 mb-8">A lens for mapping perspective and agency in any situation.</p>

            <div className="grid grid-cols-2 gap-px bg-neutral-200 rounded-xl overflow-hidden">
              {/* Think / Me */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Me · Think</span>
                </div>
                <p className="text-sm text-neutral-700">My beliefs, assumptions, mental models, and internal narratives about the situation.</p>
              </div>
              {/* Think / Others */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Others · Think</span>
                </div>
                <p className="text-sm text-neutral-700">What others believe, perceive, or assume — often invisible until you look for it.</p>
              </div>
              {/* Do / Me */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Me · Do</span>
                </div>
                <p className="text-sm text-neutral-700">My actions, behaviors, and choices — what I actually control in the situation.</p>
              </div>
              {/* Do / Others */}
              <div className="bg-white p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-3 w-3 rounded-full bg-neutral-900 mt-0.5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Others · Do</span>
                </div>
                <p className="text-sm text-neutral-700">Others' observable behaviors — what they actually do versus what they say they think.</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-neutral-400">Use this to spot where your assumptions about others' thinking diverge from their actual behavior — that gap is often where design problems hide.</p>
          </div>
        </div>
      )}
    </div>
  );
}
