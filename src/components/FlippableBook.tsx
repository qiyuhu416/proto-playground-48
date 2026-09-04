import { useEffect, useRef, useState, type ReactNode } from "react";
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
  .fbk-page.fbk-back-half {
    left: 50%;
    transform-origin: left center;
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

const PAGE_COUNT = 4; // 2 reflections per page → 8 entries shown
const TOTAL_FLIPPABLE = PAGE_COUNT + 1; // content pages + back cover

// z-index bands: unflipped pages < front cover < flipped pages < flipped back cover,
// so a freshly flipped page always lands unambiguously above the cover.
const UNFLIPPED_Z = TOTAL_FLIPPABLE; // pages resting, unflipped: descending by index
const COVER_Z = UNFLIPPED_Z + 1;
const FLIPPED_Z_BASE = COVER_Z + 1; // flipped pages: ascending by index from here
const BACK_COVER_FLIPPED_Z = FLIPPED_Z_BASE + PAGE_COUNT;

export function FlippableBook() {
  const [flipped, setFlipped] = useState(0);
  const [gsapReady, setGsapReady] = useState(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backCoverRef = useRef<HTMLDivElement | null>(null);

  const entries = REFLECTIONS.slice(0, PAGE_COUNT * 2);

  // Load GSAP once (no ScrollTrigger needed — flips are click-driven)
  useEffect(() => {
    if ((window as any).gsap) {
      setGsapReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.onload = () => setGsapReady(true);
    document.head.appendChild(script);
  }, []);

  const animatePage = (index: number, open: boolean) => {
    const gsap = (window as any).gsap;
    const el = index === TOTAL_FLIPPABLE - 1 ? backCoverRef.current : pageRefs.current[index];
    if (!gsap || !el) return;
    gsap.to(el, {
      rotateY: open ? -180 : 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const next = () => {
    if (flipped >= TOTAL_FLIPPABLE) return;
    animatePage(flipped, true);
    setFlipped((f) => f + 1);
  };

  const prev = () => {
    if (flipped <= 0) return;
    animatePage(flipped - 1, false);
    setFlipped((f) => f - 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{FBK_STYLES}</style>
      <div className="fbk-frame">
        <div className="fbk-book">
          <div className="fbk-spine" />

          {/* Front cover — static, never flips */}
          <div className="fbk-page" style={{ zIndex: COVER_Z }}>
            <div className="fbk-half fbk-half--cover">
              <div className="fbk-cover-title">My Journal</div>
            </div>
            <div className="fbk-half fbk-half--cover fbk-half--back" />
          </div>

          {entries.reduce<ReactNode[]>((acc, _, i) => {
            if (i % 2 !== 0) return acc;
            const pageIdx = i / 2; // 0-based content page index
            const front = entries[i];
            const back = entries[i + 1];

            // Already-flipped pages stack with the most recently flipped on top;
            // not-yet-flipped pages stack with the next one to flip on top.
            const zIndex = pageIdx < flipped
              ? FLIPPED_Z_BASE + pageIdx
              : UNFLIPPED_Z - pageIdx;

            acc.push(
              <div
                key={pageIdx}
                ref={(el) => { pageRefs.current[pageIdx] = el; }}
                className="fbk-page"
                style={{ zIndex }}
              >
                <div className="fbk-half">
                  {front && (
                    <>
                      <div className="fbk-date">{front.date}</div>
                      {front.image ? (
                        <img src={front.image} alt="" className="fbk-image" />
                      ) : (
                        <p className="fbk-content">{front.content}</p>
                      )}
                      <div className="fbk-page-number">{pageIdx * 2 + 1}</div>
                    </>
                  )}
                </div>
                <div className="fbk-half fbk-half--back">
                  {back && (
                    <>
                      <div className="fbk-date">{back.date}</div>
                      {back.image ? (
                        <img src={back.image} alt="" className="fbk-image" />
                      ) : (
                        <p className="fbk-content">{back.content}</p>
                      )}
                      <div className="fbk-page-number">{pageIdx * 2 + 2}</div>
                    </>
                  )}
                </div>
              </div>
            );
            return acc;
          }, [])}

          {/* Back cover */}
          <div
            ref={backCoverRef}
            className="fbk-page fbk-back-half"
            style={{ zIndex: flipped >= TOTAL_FLIPPABLE ? BACK_COVER_FLIPPED_Z : 1 }}
          >
            <div className="fbk-half fbk-half--cover" />
            <div className="fbk-half fbk-half--cover fbk-half--back" />
          </div>
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
          disabled={flipped >= TOTAL_FLIPPABLE}
          className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
