import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { REFLECTIONS } from "@/data/reflections";

const DEMOS = [
  { name: 'Kitkat', id: 'LYpNyvm' },
  { name: 'Newton', id: 'abzeaWJ' },
  { name: 'Launch', id: 'rNOqzbN' },
  { name: 'Birthday', id: 'BaobKOJ' },
  { name: 'Impossible', id: 'ZjLKGY' },
  { name: 'Care', id: 'RwPrOoz' },
  { name: 'Cubes', id: 'QWbRxXb' },
  { name: 'Elon', id: 'RwWMwvY' },
  { name: 'Gun', id: 'GRoKOyg' },
  { name: 'Moon', id: 'NWqemYK' },
  { name: 'Pokedex', id: 'eYpGQxr' },
  { name: 'Record', id: 'RwraKYZ' },
  { name: 'Tcannon', id: 'eYpmBxQ' },
  { name: 'Cloud', id: 'MWwRKvd' },
  { name: 'Fireflies', id: 'zYGQYWJ' },
  { name: 'Train', id: 'eYpdPWa' },
  { name: 'Pancake', id: 'jJVpWZ' },
  { name: 'Earth', id: 'aPzVme' },
  { name: 'Matryoshka', id: 'jOOYMLm' },
  { name: 'Truck', id: 'MWWowEb' },
];

const PAGES = 10;

interface SketchProps {
  idx: number;
  shuffledDemos: typeof DEMOS;
}

const Sketch: React.FC<SketchProps> = ({ idx, shuffledDemos }) => {
  const src = shuffledDemos[idx - 1]?.name;
  const id = shuffledDemos[idx - 1]?.id;

  return (
    <a href={`https://codepen.io/jh3y/full/${id}`} target="_blank" rel="noreferrer noopener">
      <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/${src || 'Book'}-sketch.svg`} alt={src} />
    </a>
  );
};

const BookComponent: React.FC = () => {
  const [shuffledDemos, setShuffledDemos] = useState<typeof DEMOS>(DEMOS);

  useEffect(() => {
    // Shuffle only on client to avoid hydration mismatch
    setShuffledDemos([...DEMOS].sort(() => 0.5 - Math.random()));
  }, []);

  useEffect(() => {
    // Load GSAP
    const loadGSAP = async () => {
      // Check if GSAP is already loaded
      if ((window as any).gsap) {
        initializeAnimations();
        return;
      }

      // Load GSAP script
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.onload = () => {
        // Load ScrollTrigger after GSAP
        const scrollScript = document.createElement('script');
        scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollScript.onload = () => {
          initializeAnimations();
        };
        document.head.appendChild(scrollScript);
      };
      document.head.appendChild(gsapScript);
    };

    const initializeAnimations = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      const bookEl = document.querySelector('.book');
      if (!bookEl) return;

      // Create a timeline that flips pages as user scrolls
      const pageEls = gsap.utils.toArray('.book__page');

      pageEls.forEach((page: any, index: number) => {
        if (index === 0) return; // Skip cover

        gsap.to(page, {
          rotateY: -180,
          scrollTrigger: {
            trigger: '.book',
            start: `top+=${index * 400}px top`,
            end: `top+=${(index + 1) * 400}px top`,
            scrub: 1,
            markers: false,
          },
        });
      });
    };

    loadGSAP();

    return () => {
      // Cleanup
      const gsap = (window as any).gsap;
      if (gsap?.ticker) {
        gsap.ticker.remove(() => {});
      }
    };
  }, []);

  const renderPages = () => {
    const pages = [];
    for (let p = 0; p < PAGES; p++) {
      pages.push(
        <div key={p} className="page book__page" style={{ '--page-index': p + 2 } as React.CSSProperties}>
          <div className="page__half page__half--front">
            <Sketch idx={p * 2 + 1} shuffledDemos={shuffledDemos} />
            <div className="page__number">{p * 2 + 1}</div>
          </div>
          <div className="page__half page__half--back">
            <Sketch idx={p * 2 + 2} shuffledDemos={shuffledDemos} />
            <div className="page__number">{p * 2 + 2}</div>
          </div>
        </div>
      );
    }
    return pages;
  };

  return (
    <>
      <h1>Scroll</h1>
      <div className="book">
        <div className="book__spine"></div>
        <div className="page book__page book__cover book__cover--front" style={{ '--page-index': 1 } as React.CSSProperties}>
          <div className="page__half page__half--front">
            <span className="code">
              {`.set(FOLD,{transformOrigin:"50% 100%",scaleY:0}),set(CLIPS,{transformOrigin:"50% 0"})`}
            </span>
          </div>
          <div className="page__half page__half--back">
            <div className="book__insert">
              <img className="logo" src="https://assets.codepen.io/605876/bear-with-cap.svg" alt="Logo" />
            </div>
          </div>
        </div>
        {renderPages()}
        <div className="page book__page book__cover book__cover--back" style={{ '--page-index': PAGES + 2 } as React.CSSProperties}>
          <div className="page__half page__half--front"></div>
          <div className="page__half page__half--back">
            <span className="code">
              {`.set(FOLD,{transformOrigin:"50% 100%",scaleY:0})`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

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

const bookStyles = `
  .book {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 500px;
    perspective: 1000px;
    position: relative;
  }

  .book__spine {
    position: absolute;
    left: 50%;
    width: 20px;
    height: 100%;
    background: #e5e5e5;
    z-index: 10;
    transform: translateX(-50%) translateZ(40px);
  }

  .book__page {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    transform-style: preserve-3d;
    transform-origin: right center;
  }

  .book__page.book__cover--back {
    left: 50%;
    transform-origin: left center;
  }

  .page {
    background: white;
    border: 1px solid #e5e5e5;
  }

  .page__half {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    position: relative;
    background: white;
  }

  .page__half img {
    max-width: 90%;
    max-height: 80%;
    object-fit: contain;
  }

  .page__number {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 12px;
    color: #999;
  }

  .book__insert {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 100px;
    height: 100px;
    opacity: 0;
  }

  .code {
    font-size: 8px;
    font-family: monospace;
    line-height: 1.2;
    color: #666;
    white-space: pre-wrap;
    word-break: break-all;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #111;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = bookStyles;
  if (!document.head.querySelector('style[data-book-styles]')) {
    style.setAttribute('data-book-styles', 'true');
    document.head.appendChild(style);
  }
}

function ThinkComponent() {
  const [quadrantOpen, setQuadrantOpen] = useState(false);
  const [expandedReflections, setExpandedReflections] = useState<Set<number>>(new Set());
  const [reflectionsWithImages, setReflectionsWithImages] = useState<Array<{content: string; date: string; image?: string}>>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setReflectionsWithImages(REFLECTIONS);
  }, []);

  const toggleReflection = (idx: number) => {
    const newSet = new Set(expandedReflections);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedReflections(newSet);
  };

  const isLongContent = (content: string) => {
    const lines = content.split('\n').length;
    return lines > 3 || content.length > 250;
  };

  return (
    <div className="min-h-screen bg-background text-neutral-900">

      {/* Book Component Section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <BookComponent />
      </section>

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
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <circle cx="16" cy="12" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="12" r="3" fill="#1a1a1a"/>
                <circle cx="16" cy="38" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="38" r="3" fill="#1a1a1a"/>
                <line x1="19" y1="12" x2="61" y2="12" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="19" y1="38" x2="61" y2="38" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="16" y1="15" x2="16" y2="35" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
                <line x1="64" y1="15" x2="64" y2="35" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 2"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Analysis-synthesis bridge</h3>
            <p className="text-neutral-600 text-sm">The best model by Hugh Dubberly! It has been helping me intentionally practice "thinking outside the box" the mindset</p>
          </a>

          {/* Me × Others × Think × Do */}
          <button
            onClick={() => setQuadrantOpen(true)}
            className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow text-left group"
          >
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <line x1="40" y1="0" x2="40" y2="50" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="0" y1="25" x2="80" y2="25" stroke="#e5e5e5" strokeWidth="1"/>
                <circle cx="40" cy="8" r="3" fill="#1a1a1a"/>
                <circle cx="8" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="72" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="42" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2 group-hover:underline">Me · Others · Think · Do</h3>
            <p className="text-neutral-600 text-sm">2×2 is just a cool way to map out the situations and help me see my own "unknown-unkonwn"s</p>
          </button>

          {/* Double diamond */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <polygon points="4,25 22,8 40,25 22,42" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
                <polygon points="40,25 58,8 76,25 58,42" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
                <circle cx="4" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="76" cy="25" r="3" fill="#1a1a1a"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Double diamond</h3>
            <p className="text-neutral-600 text-sm">The designer thinking day 1 model. Ya I hear sometimes it could be "too theoretical", but at least it let us know where we are making a leap of faith while we have to.</p>
          </div>

          {/* Service blueprint */}
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <svg viewBox="0 0 80 50" fill="none" className="w-24 h-auto opacity-75">
                <line x1="4" y1="10" x2="76" y2="10" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="4" y1="25" x2="76" y2="25" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="4" y1="40" x2="76" y2="40" stroke="#e5e5e5" strokeWidth="1"/>
                <line x1="14" y1="10" x2="40" y2="10" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="10" x2="64" y2="10" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="22" y1="25" x2="54" y2="25" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="14" y1="40" x2="40" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="40" x2="64" y2="40" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="40" y1="13" x2="22" y2="22" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <line x1="54" y1="28" x2="40" y2="37" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2"/>
                <circle cx="14" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="10" r="3" fill="#1a1a1a"/>
                <circle cx="22" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="54" cy="25" r="3" fill="#1a1a1a"/>
                <circle cx="14" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="40" cy="40" r="3" fill="#1a1a1a"/>
                <circle cx="64" cy="40" r="3" fill="#1a1a1a"/>
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
          {(reflectionsWithImages as any).sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          }).map((reflection, idx) => {
            const isExpanded = expandedReflections.has(idx);
            const isLong = isLongContent(reflection.content);
            const displayContent = isExpanded ? reflection.content : reflection.content.substring(0, 250);

            return (
              <div
                key={idx}
                className={`rounded-lg border border-neutral-200 p-4 transition-all bg-white ${isLong && !isExpanded ? 'cursor-pointer hover:border-neutral-400' : ''}`}
                onClick={() => isLong && toggleReflection(idx)}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-xs text-neutral-500 font-medium">{reflection.date}</div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {displayContent}
                    {isLong && !isExpanded && <span className="text-neutral-400">...</span>}
                  </p>
                  {reflection.image && (
                    <img
                      src={reflection.image}
                      alt="Reflection image"
                      onClick={() => setSelectedImage(reflection.image!)}
                      className="w-full max-w-xs rounded-lg mt-3 border border-neutral-200 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  )}
                  {isLong && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReflection(idx);
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors self-start mt-1"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
            <p className="text-sm text-neutral-500 mb-2">A lens for mapping perspective and agency in any situation.</p>
            <p className="text-xs text-neutral-400 mb-8">This is also how I created the 4 tabs for this site: <span className="font-medium text-neutral-600">Work · Play · Think · Listen</span> — me doing, others doing, me reflecting, others reflecting.</p>

            {/* Interactive Quadrant */}
            <div
              className="w-full h-64 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg mb-6 cursor-crosshair shadow-lg shadow-amber-200/50 ring-2 ring-amber-200/30"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Axes */}
                <line x1="50" y1="0" x2="50" y2="100" stroke="#d1d5db" strokeWidth="0.5"/>
                <line x1="0" y1="50" x2="100" y2="50" stroke="#d1d5db" strokeWidth="0.5"/>

                {/* Quadrant backgrounds */}
                <rect x="0" y="0" width="50" height="50" fill="#f3f4f6" opacity="0.5"/>
                <rect x="50" y="0" width="50" height="50" fill="#f3f4f6" opacity="0.3"/>
                <rect x="0" y="50" width="50" height="50" fill="#f3f4f6" opacity="0.3"/>
                <rect x="50" y="50" width="50" height="50" fill="#f3f4f6" opacity="0.5"/>

                {/* Axis dots */}
                {/* Top (Others · Think) */}
                <circle cx={mousePos.x} cy="0" r="2" fill="#1f2937" opacity="0.8"/>
                {/* Bottom (Others · Do) */}
                <circle cx={mousePos.x} cy="100" r="2" fill="#1f2937" opacity="0.8"/>
                {/* Left (Me · Think) */}
                <circle cx="0" cy={mousePos.y} r="2" fill="#1f2937" opacity="0.8"/>
                {/* Right (Me · Do) */}
                <circle cx="100" cy={mousePos.y} r="2" fill="#1f2937" opacity="0.8"/>

                {/* Center intersection */}
                <circle cx="50" cy="50" r="1.5" fill="#9ca3af"/>
              </svg>
            </div>

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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Expanded reflection"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
