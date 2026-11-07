import { useEffect, useRef, useState } from "react";
import { REFLECTIONS, type Reflection } from "@/data/reflections";

const FBK_STYLES = `
  .fbk-frame {
    background: #1a1a1a;
    border-radius: 20px;
    padding: 26px;
  }
  .fbk-book {
    width: 640px;
    height: 400px;
    perspective: 1800px;
    position: relative;
  }
  .fbk-spine {
    position: absolute;
    left: 50%;
    width: 8px;
    height: 100%;
    background: #0a0a0a;
    z-index: 30;
    transform: translateX(-50%) translateZ(20px);
  }
  .fbk-page {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 50%;
    top: 0;
    display: flex;
    transform-style: preserve-3d;
    transform-origin: left center;
  }
  .fbk-half {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 28px;
    background-color: #fdfcf7;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 27px,
      #dfe3ea 28px
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
    font-size: 12px;
    color: #737373;
    margin-bottom: 8px;
    align-self: flex-start;
  }
  .fbk-content {
    font-size: 13px;
    color: #262626;
    line-height: 1.6;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
  }
  .fbk-image {
    max-width: 100%;
    max-height: 70%;
    object-fit: contain;
    margin-top: 6px;
  }
  .fbk-page-number {
    position: absolute;
    bottom: 10px;
    right: 14px;
    font-size: 11px;
    color: #a3a3a3;
  }
  .fbk-cover-title {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
  }
`;

// ALL reflections, not a slice — every entry gets a page. REFLECTIONS itself
// is newest-first (same order the List tab sorts to); reversed here so page
// 1 is the OLDEST entry, growing forward to the most recent at the back —
// reading like an actual journal, not newest-first.
const ENTRIES = [...REFLECTIONS].reverse();

// One "face" = one half-page. A text-only entry is a single face. An entry
// WITH an image needs its image on the left page and its text on the right
// page of the SAME spread — which, in a page-flip book, only ever happens
// for a (back-of-leaf-N, front-of-leaf-N+1) pair, never a leaf's own front
// and back (those are opposite sides of one sheet, never visible together).
// So an image's face must land on a "back" (odd) position; if the running
// face count is currently "front" (even), a blank face is inserted first to
// shift onto the back position before placing [image, text].
type Face =
  | { kind: "blank" }
  | { kind: "text"; entry: Reflection; label: string; content: string }
  | { kind: "image"; entry: Reflection; label: string; image: string };

function buildFaces(entries: Reflection[]): Face[] {
  const faces: Face[] = [];
  for (const entry of entries) {
    if (entry.image) {
      if (faces.length % 2 === 0) faces.push({ kind: "blank" });
      faces.push({ kind: "image", entry, label: entry.date, image: entry.image });
      faces.push({ kind: "text", entry, label: entry.date, content: entry.content });
    } else {
      faces.push({ kind: "text", entry, label: entry.date, content: entry.content });
    }
  }
  return faces;
}

const FACES = buildFaces(ENTRIES);
const PAGE_COUNT = Math.ceil(FACES.length / 2); // 2 faces per content leaf
// Leaves, in flip order: [0] front cover, [1..PAGE_COUNT] content, [PAGE_COUNT+1] back cover.
const TOTAL_LEAVES = PAGE_COUNT + 2;

// Opens directly to the spread showing this page number on the left (and
// DEFAULT_OPEN_LEFT_PAGE + 1 on the right) — left-page numbers are always
// even (backPageNumber = contentIdx*2 + 2), so leafIndex = page/2, and that
// leaf needs to already be flipped (+1) to show its back as the left page.
const DEFAULT_OPEN_LEFT_PAGE = 10;
const DEFAULT_FLIPPED = DEFAULT_OPEN_LEFT_PAGE / 2 + 1;

type Leaf = {
  front?: Face;
  back?: Face;
  frontPageNumber?: number;
  backPageNumber?: number;
  isCoverFace?: boolean; // front is the book's title cover
};

function FaceContent({ face, pageNumber }: { face: Face | undefined; pageNumber: number | undefined }) {
  if (!face || face.kind === "blank") return null;
  return (
    <>
      <div className="fbk-date">{face.label}</div>
      {face.kind === "image" ? (
        <img src={face.image} alt="" className="fbk-image" />
      ) : (
        <p className="fbk-content">{face.content}</p>
      )}
      <div className="fbk-page-number">{pageNumber}</div>
    </>
  );
}

export function FlippableBook() {
  const [flipped, setFlipped] = useState(DEFAULT_FLIPPED);
  const [gsapReady, setGsapReady] = useState(false);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);

  const leaves: Leaf[] = [
    { isCoverFace: true }, // leaf 0: front cover
    ...Array.from({ length: PAGE_COUNT }, (_, contentIdx) => ({
      front: FACES[contentIdx * 2],
      back: FACES[contentIdx * 2 + 1],
      frontPageNumber: contentIdx * 2 + 1,
      backPageNumber: contentIdx * 2 + 2,
    })),
    {}, // last leaf: back cover, both faces blank
  ];

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

  // Apply the default open-to spread instantly (no animation) once GSAP is ready —
  // this is a one-time initial pose, distinct from the click-driven animateLeaf below.
  useEffect(() => {
    if (!gsapReady) return;
    const gsap = (window as any).gsap;
    leafRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { rotateY: i < DEFAULT_FLIPPED ? 180 : 0 });
    });
  }, [gsapReady]);

  const animateLeaf = (index: number, open: boolean) => {
    const gsap = (window as any).gsap;
    const el = leafRefs.current[index];
    if (!gsap || !el) return;
    gsap.to(el, {
      rotateY: open ? 180 : 0,
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
            // Clicking a page flips it, same as Prev/Next below — the
            // topmost not-yet-flipped leaf (i === flipped) is the "right"
            // page, click to flip forward; the topmost already-flipped leaf
            // (i === flipped - 1) is the "left" page, click to flip back.
            // Any other leaf is currently stacked underneath one of those
            // two and isn't the one that would visually flip, so it's not
            // clickable.
            const onLeafClick = i === flipped ? next : i === flipped - 1 ? prev : undefined;

            return (
              <div
                key={i}
                ref={(el) => { leafRefs.current[i] = el; }}
                className="fbk-page"
                style={{ zIndex, cursor: onLeafClick ? "pointer" : "default" }}
                onClick={onLeafClick}
              >
                <div className={`fbk-half ${leaf.isCoverFace ? "fbk-half--cover" : ""}`}>
                  {leaf.isCoverFace ? (
                    <div className="fbk-cover-title">My Journal</div>
                  ) : (
                    <FaceContent face={leaf.front} pageNumber={leaf.frontPageNumber} />
                  )}
                </div>
                <div className={`fbk-half fbk-half--back ${leaf.isCoverFace ? "fbk-half--cover" : ""}`}>
                  {!leaf.isCoverFace && <FaceContent face={leaf.back} pageNumber={leaf.backPageNumber} />}
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
          className="text-xs text-neutral-400 hover:text-black disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          disabled={flipped >= TOTAL_LEAVES}
          className="text-xs text-neutral-400 hover:text-black disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
