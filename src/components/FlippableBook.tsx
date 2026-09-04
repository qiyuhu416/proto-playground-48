import { useState, type ReactNode } from "react";
import { REFLECTIONS } from "@/data/reflections";

const FBK_STYLES = `
  .fbk-book {
    width: 100%;
    max-width: 360px;
    height: 240px;
    perspective: 1100px;
    position: relative;
  }
  .fbk-spine {
    position: absolute;
    left: 50%;
    width: 8px;
    height: 100%;
    background: #262626;
    z-index: 20;
    transform: translateX(-50%) translateZ(16px);
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
    transition: transform 0.6s ease;
  }
  .fbk-page.fbk-back-half {
    left: 50%;
    transform-origin: left center;
  }
  .fbk-half {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 14px;
    position: relative;
    background: #0a0a0a;
    border: 1px solid #262626;
    backface-visibility: hidden;
  }
  .fbk-half--back {
    transform: rotateY(180deg);
  }
  .fbk-date {
    font-size: 9px;
    color: #a3a3a3;
    margin-bottom: 6px;
    text-align: center;
  }
  .fbk-content {
    font-size: 10px;
    color: #e5e5e5;
    line-height: 1.4;
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
  .fbk-cover-title {
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    text-align: center;
  }
`;

if (typeof document !== "undefined") {
  if (!document.head.querySelector("style[data-fbk-styles]")) {
    const style = document.createElement("style");
    style.textContent = FBK_STYLES;
    style.setAttribute("data-fbk-styles", "true");
    document.head.appendChild(style);
  }
}

const PAGE_COUNT = 4; // 2 reflections per page → 8 entries shown
const TOTAL_FLIPPABLE = PAGE_COUNT + 1; // pages + back cover

export function FlippableBook() {
  const [flipped, setFlipped] = useState(0);

  const next = () => setFlipped((f) => Math.min(TOTAL_FLIPPABLE, f + 1));
  const prev = () => setFlipped((f) => Math.max(0, f - 1));

  const entries = REFLECTIONS.slice(0, PAGE_COUNT * 2);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="fbk-book">
        <div className="fbk-spine" />

        {/* Front cover — static, never flips */}
        <div className="fbk-page" style={{ zIndex: TOTAL_FLIPPABLE + 2 }}>
          <div className="fbk-half">
            <div className="fbk-cover-title">My Journal</div>
          </div>
          <div className="fbk-half fbk-half--back" />
        </div>

        {entries.reduce<ReactNode[]>((acc, _, i) => {
          if (i % 2 !== 0) return acc;
          const pageIdx = i / 2; // 0-based content page index
          const front = entries[i];
          const back = entries[i + 1];
          const isFlipped = flipped > pageIdx + 1;

          acc.push(
            <div
              key={pageIdx}
              className="fbk-page"
              style={{
                zIndex: TOTAL_FLIPPABLE - pageIdx,
                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
              }}
            >
              <div className="fbk-half">
                {front && (
                  <>
                    <div className="fbk-date">{front.date}</div>
                    <p className="fbk-content">{front.content}</p>
                  </>
                )}
              </div>
              <div className="fbk-half fbk-half--back">
                {back && (
                  <>
                    <div className="fbk-date">{back.date}</div>
                    <p className="fbk-content">{back.content}</p>
                  </>
                )}
              </div>
            </div>
          );
          return acc;
        }, [])}

        {/* Back cover */}
        <div
          className="fbk-page fbk-back-half"
          style={{
            zIndex: 1,
            transform: flipped >= TOTAL_FLIPPABLE ? "rotateY(-180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="fbk-half" />
          <div className="fbk-half fbk-half--back" />
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
