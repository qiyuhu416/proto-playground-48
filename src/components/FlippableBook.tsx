import { useEffect, useRef, useState } from "react";
import { REFLECTIONS } from "@/data/reflections";

const FBK_STYLES = `
  .fbk-frame {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 18px;
  }
  .fbk-book {
    width: 420px;
    height: 260px;
    perspective: 1400px;
    position: relative;
  }
  .fbk-spine {
    position: absolute;
    left: 50%;
    width: 6px;
    height: 100%;
    background: #0a0a0a;
    z-index: 30;
    transform: translateX(-50%) translateZ(20px);
  }
  .fbk-page {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    transform-style: preserve-3d;
    transform-origin: right center;
  }
  .fbk-half {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 18px;
    background-color: #fdfcf7;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 21px,
      #dfe3ea 22px
    );
    border: 1px solid #d4d4d4;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .fbk-half--back {
    transform: rotateY(180deg);
  }
  .fbk-half--cover {
    background-image: none;
    background-color: #0a0a0a;
  }
  .fbk-date {
    font-size: 9px;
    color: #737373;
    margin-bottom: 6px;
    align-self: flex-start;
  }
  .fbk-content {
    font-size: 10px;
    color: #262626;
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .fbk-image {
    max-width: 100%;
    max-height: 70%;
    object-fit: contain;
    margin-top: 4px;
  }
  .fbk-page-number {
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 9px;
    color: #a3a3a3;
  }
  .fbk-cover-title {
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    text-align: center;
  }
`;

const PAGE_COUNT = 4; // 2 reflections per content leaf → 8 entries shown
// Leaves, in flip order: [0] front cover, [1..PAGE_COUNT] content, [PAGE_COUNT+1] back cover.
const TOTAL_LEAVES = PAGE_COUNT + 2;

type Leaf = {
  frontLabel?: string;
  frontContent?: string;
  frontImage?: string;
  frontPageNumber?: number;
  backLabel?: string;
  backContent?: string;
  backImage?: string;
  backPageNumber?: number;
  isCoverFace?: boolean; // front is the book's title cover
};

export function FlippableBook() {
  const [flipped, setFlipped] = useState(0);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);

  const entries = REFLECTIONS.slice(0, PAGE_COUNT * 2);

  const leaves: Leaf[] = [
    { isCoverFace: true }, // leaf 0: front cover
    ...Array.from({ length: PAGE_COUNT }, (_, contentIdx) => {
      const front = entries[contentIdx * 2];
      const back = entries[contentIdx * 2 + 1];
      return {
        frontLabel: front?.date,
        frontContent: front?.content,
        frontImage: front?.image,
        frontPageNumber: contentIdx * 2 + 1,
        backLabel: back?.date,
        backContent: back?.content,
        backImage: back?.image,
        backPageNumber: contentIdx * 2 + 2,
      };
    }),
    {}, // last leaf: back cover, both faces blank
  ];

  // Load GSAP once (no ScrollTrigger needed — flips are click-driven)
  useEffect(() => {
    if ((window as any).gsap) return;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    document.head.appendChild(script);
  }, []);

  const animateLeaf = (index: number, open: boolean) => {
    const gsap = (window as any).gsap;
    const el = leafRefs.current[index];
    if (!gsap || !el) return;
    gsap.to(el, {
      rotateY: open ? -180 : 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const next = () => {
    if (flipped >= TOTAL_LEAVES) return;
    animateLeaf(flipped, true);
    setFlipped((f) => f + 1);
  };

  const prev = () => {
    if (flipped <= 0) return;
    animateLeaf(flipped - 1, false);
    setFlipped((f) => f - 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{FBK_STYLES}</style>
      <div className="fbk-frame">
        <div className="fbk-book">
          <div className="fbk-spine" />

          {leaves.map((leaf, i) => {
            // Already-flipped leaves stack with the most recently flipped on top
            // (visible on the right); not-yet-flipped leaves stack with the next
            // one up on top (visible on the left) — so both sides update as you
            // flip through, since flipping one leaf away reveals the one beneath it.
            const zIndex = i < flipped ? TOTAL_LEAVES + i : TOTAL_LEAVES - i;

            return (
              <div
                key={i}
                ref={(el) => { leafRefs.current[i] = el; }}
                className="fbk-page"
                style={{ zIndex }}
              >
                <div className={`fbk-half ${leaf.isCoverFace ? "fbk-half--cover" : ""}`}>
                  {leaf.isCoverFace ? (
                    <div className="fbk-cover-title">My Journal</div>
                  ) : (
                    leaf.frontContent !== undefined && (
                      <>
                        <div className="fbk-date">{leaf.frontLabel}</div>
                        {leaf.frontImage ? (
                          <img src={leaf.frontImage} alt="" className="fbk-image" />
                        ) : (
                          <p className="fbk-content">{leaf.frontContent}</p>
                        )}
                        <div className="fbk-page-number">{leaf.frontPageNumber}</div>
                      </>
                    )
                  )}
                </div>
                <div className={`fbk-half fbk-half--back ${leaf.isCoverFace ? "fbk-half--cover" : ""}`}>
                  {leaf.backContent !== undefined && (
                    <>
                      <div className="fbk-date">{leaf.backLabel}</div>
                      {leaf.backImage ? (
                        <img src={leaf.backImage} alt="" className="fbk-image" />
                      ) : (
                        <p className="fbk-content">{leaf.backContent}</p>
                      )}
                      <div className="fbk-page-number">{leaf.backPageNumber}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={flipped === 0}
          className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          disabled={flipped >= TOTAL_LEAVES}
          className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
