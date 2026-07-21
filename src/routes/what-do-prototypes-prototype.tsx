import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ARTICLE_META } from "./articleMeta";

export const Route = createFileRoute("/what-do-prototypes-prototype")({
  head: () => ({
    meta: [
      { title: "What do prototypes prototype" },
      {
        name: "description",
        content: "Prototyping as a research mindset, and designing to elicit errors rather than hide them.",
      },
    ],
  }),
  component: ArticleComponent,
});

function ArticleComponent() {
  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <a
          href="/"
          className="xl:hidden inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Implementation</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            {ARTICLE_META["what-do-prototypes-prototype"].title}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
            Prototyping as a research mindset, and why designing for errors matters more than hiding them.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>6 min read</span>
            <span className="text-neutral-300">·</span>
            <span>Apr 2026</span>
          </div>
        </div>

        <TableOfContents />

        <div className="prose prose-neutral max-w-2xl">

          {/* ── SECTION 1 ── */}
          <h2 id="research-mindset" className="mt-12 mb-4 text-2xl font-semibold text-neutral-900">Prototype = Research mindset</h2>

          <p>
            The word "prototype" might have been automatically associated with a digital phone frame where people can click around. But we could actually expand the scope here: as creation itself becomes easier, prototypes can be any form of experiments used to test "what to create."
          </p>

          <p>
            But prototyping = research. It is essentially a mindset to test what to design. Prototypes can be anything that serves those goals:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>explore more directions</li>
            <li>test more interactions</li>
            <li>simulate more edge cases</li>
            <li>communicate ideas that used to be too expensive to build</li>
            <li>much more</li>
          </ul>

          <div className="not-prose my-10">
            <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-8 flex flex-col items-center gap-4">
              <img
                src="/articles/prototype-triangle.png"
                alt="Figure 1. A model of what prototypes prototype — Role, Implementation, Look and feel"
                className="w-full max-w-md mx-auto"
              />
              <p className="text-xs text-neutral-400 text-center">
                Fig. 1 — Houde & Hill,{" "}
                <a href="https://hci.stanford.edu/courses/cs247/2012/readings/WhatDoPrototypesPrototype.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700">
                  "What Do Prototypes Prototype?"
                </a>
                {" "}(1997). Stanford HCI.
              </p>
            </div>
          </div>

          {/* Category sections — image then text */}
          <div className="not-prose space-y-16 my-10">

            {/* Look & Feel */}
            <div>
              <h3 id="look-and-feel" className="text-lg font-semibold text-neutral-900 mb-6">Look & Feel</h3>
              <a href="/reimagining-the-chatbot" className="group block rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow mb-4">
                <img src="/articles/task-analysis-flow.png" alt="Look & Feel prototype" className="w-full object-contain p-6" />
              </a>
              <p className="text-sm text-neutral-600">Prototypes that test how something <em>feels</em> to interact with—motion, tone, visual language. Does it feel right? Does it feel trustworthy? You can't answer this with a spec doc.</p>
              <a href="/reimagining-the-chatbot" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors mt-2 block">See example: Reimagining the chatbot →</a>

              <div className="space-y-3 mt-6">
                <a href="/ai-ai-interaction" className="group flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-4 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">AI–AI Interaction</p>
                    <p className="text-xs text-neutral-500 mt-0.5">When two AI agents communicate, what happens? Invisible communication made visible.</p>
                  </div>
                  <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors text-sm ml-4">→</span>
                </a>
                <a href="/always-here" className="group flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-4 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">I Am Always Here—Just Let Me Know</p>
                    <p className="text-xs text-neutral-500 mt-0.5">What if the AI didn't wait to be asked? Exploring proactive presence.</p>
                  </div>
                  <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors text-sm ml-4">→</span>
                </a>
                <a href="/knowledge-graph-visualization" className="group flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-4 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">Knowledge Graph Visualization</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Making AI reasoning visible, tangible, and navigable.</p>
                  </div>
                  <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors text-sm ml-4">→</span>
                </a>
              </div>
            </div>

            {/* Implementation */}
            <div>
              <h3 id="implementation" className="text-lg font-semibold text-neutral-900 mb-6">Implementation</h3>
              <a href="/a2ui-generative" className="group block rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow mb-4">
                <img src="/articles/task-analysis-flow.png" alt="Implementation prototype" className="w-full object-contain p-6" />
              </a>
              <p className="text-sm text-neutral-600">Prototypes that test whether it actually <em>works</em>—the underlying logic, the data flow, the edge cases. These expose what can't be assumed and what the tech genuinely can and can't do.</p>
              <a href="/a2ui-generative" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors mt-2 block">See example: A2UI & Generative UI →</a>
            </div>

            {/* Role */}
            <div>
              <h3 id="role" className="text-lg font-semibold text-neutral-900 mb-6">Role</h3>
              <a href="/designing-for-conversations-that-earn-trust" className="group block rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow mb-4">
                <img src="/articles/testing-session.png" alt="Role prototype" className="w-full object-contain p-6" />
              </a>
              <p className="text-sm text-neutral-600">Prototypes that test what role the AI <em>plays</em>—is it a tool, a collaborator, or a caregiver? When AI supports elder care, it can't just be accurate. It has to be present, patient, and human in the ways that matter most.</p>
              <a href="/designing-for-conversations-that-earn-trust" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors mt-2 block">See example: Conversations that earn trust →</a>

              <div className="mt-6 p-5 rounded-xl border border-neutral-200 bg-neutral-50">
                <p className="text-sm font-semibold text-neutral-900 mb-1">A specific case: Audio AI — built to elicit errors</p>
                <p className="text-sm text-neutral-600">The goal wasn't to prove AI works. It was to surface what could go wrong before it actually goes wrong—designing around errors, not hiding them.</p>
                <a href="/designing-for-conversations-that-earn-trust" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors mt-2 block">See example: Conversations that earn trust →</a>
              </div>
            </div>

          </div>

          {/* ── SECTION 2 ── */}
          <h2 id="three-types" className="mt-16 mb-4 text-2xl font-semibold text-neutral-900">3 types of prototypes I've created</h2>

          <p>
            Over time, I've noticed I build three distinct types. Each serves a different purpose, with different audiences, for different questions.
          </p>

          <div className="not-prose space-y-10 my-8">
            {/* Explore what-ifs */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Type 1 · Explore "what-if"s</h3>
              <p className="text-sm text-neutral-600 mb-4"><strong>Purpose:</strong> To wonder. To play. To expand the solution space before narrowing it.</p>
              <div className="w-full rounded-2xl overflow-hidden bg-[#fdf4ff] flex items-center justify-center" style={{ height: "200px" }}>
                <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="120" cy="100" r="48" fill="#e9d5ff" />
                  <circle cx="230" cy="160" r="36" fill="#f0abfc" opacity="0.7" />
                  <circle cx="310" cy="90" r="28" fill="#c084fc" opacity="0.5" />
                  <circle cx="400" cy="150" r="56" fill="#e9d5ff" opacity="0.8" />
                  <circle cx="500" cy="90" r="32" fill="#f0abfc" opacity="0.6" />
                  <circle cx="170" cy="190" r="20" fill="#c084fc" opacity="0.4" />
                  <circle cx="460" cy="200" r="22" fill="#e9d5ff" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Explain the prototype */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Type 2 · Explain the prototype</h3>
              <p className="text-sm text-neutral-600 mb-4"><strong>Purpose:</strong> To understand. To get feedback. To see how others interpret what you've built.</p>
              <div className="w-full rounded-2xl overflow-hidden bg-[#eef0f3] flex items-center justify-center" style={{ height: "200px" }}>
                <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="60" y="90" width="200" height="28" rx="14" fill="#d1d5db" />
                  <rect x="60" y="132" width="200" height="28" rx="14" fill="#d1d5db" />
                  <rect x="60" y="174" width="200" height="28" rx="14" fill="#d1d5db" />
                  <rect x="330" y="40" width="200" height="180" rx="28" fill="#2d527c" />
                </svg>
              </div>
            </div>

            {/* For others to prototype */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Type 3 · For others to prototype</h3>
              <p className="text-sm text-neutral-600 mb-4"><strong>Purpose:</strong> To enable. To hand over control. To let others build on your foundation.</p>
              <div className="w-full rounded-2xl overflow-hidden bg-white border border-neutral-100 flex items-center justify-center" style={{ height: "200px" }}>
                <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="60" y="96" width="80" height="36" rx="18" fill="#d1d5db" />
                  <circle cx="82" cy="114" r="15" fill="#4b5563" />
                  <rect x="60" y="148" width="80" height="36" rx="18" fill="#d1d5db" />
                  <circle cx="82" cy="166" r="15" fill="#4b5563" />
                  <rect x="200" y="36" width="320" height="188" rx="28" fill="#fbbf24" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── SECTION 3 ── */}
          <h2 id="not-software" className="mt-16 mb-4 text-2xl font-semibold text-neutral-900">Not all prototypes need to be software</h2>

          <p>
            The best prototypes often aren't software at all. They're spaces, conversations, sketches, and stories.
          </p>

          <div className="not-prose space-y-3 my-8">
            {[
              {
                title: "Office space",
                description: "A notebook on a stand, a paper exchange — using the physical workplace as a lab for async human interaction.",
                href: "/hello-humans",
              },
              {
                title: "Role play",
                description: "Engineer = the LLM, Manager = the User. Assign roles, simulate the system, reveal assumptions instantly.",
                href: null,
              },
              {
                title: "Paper prototyping",
                description: "When testing the interaction. Cheap, fast, disposable. Perfect for testing flow without commitment.",
                href: null,
              },
              {
                title: "Storyboarding",
                description: "When testing the concept. Show the emotion and context, not the interface.",
                href: "/physical-ai",
              },
            ].map((item) => {
              const Tag = item.href ? "a" : "div";
              const props = item.href ? { href: item.href } : {};
              return (
                <Tag
                  key={item.title}
                  {...(props as any)}
                  className={`flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-5 ${item.href ? "group hover:border-neutral-300 hover:shadow-sm transition-all" : ""}`}
                >
                  <div>
                    <p className="font-semibold text-neutral-900 text-[15px]">{item.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{item.description}</p>
                  </div>
                  {item.href && (
                    <span className="text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0 text-lg">→</span>
                  )}
                </Tag>
              );
            })}
          </div>


        </div>

        <div className="mt-20 border-t border-neutral-200 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 font-semibold">Related reading</div>
          <ul className="space-y-3 text-sm text-neutral-600">
<li><a href="/claude-code-research" className="font-medium hover:underline">My story with Claude Code</a> — How AI can amplify thinking</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
