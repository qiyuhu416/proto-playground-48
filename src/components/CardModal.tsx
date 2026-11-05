import { useEffect, useRef, useState } from "react";

// The modal every card click in the quadrant system opens into. One
// component, not duplicated per place a card can be clicked, so a future
// change here applies everywhere uniformly. Two content modes:
// - `slug` (most cards): loads that internal page in an iframe, starting as
//   a floating panel and growing to fill the screen once the iframe's own
//   content has been scrolled past 30px.
// - `description` (prototypes/concepts with no real page yet — just a
//   thumbnail and a line explaining the idea): renders that text directly,
//   no iframe, and stays a floating panel the whole time (nothing in there
//   to scroll-trigger the full-screen grow).
export function CardModal({
  title,
  slug,
  description,
  image,
  onClose,
}: {
  title: string;
  slug?: string;
  description?: string;
  image?: string;
  onClose: () => void;
}) {
  const [isFull, setIsFull] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.body.classList.add("modal-open");
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <>
      {!isFull && <div className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm" onClick={onClose} />}
      <div
        className="transition-all duration-300 relative flex flex-col"
        style={{
          position: "fixed",
          zIndex: 60,
          top: isFull ? 0 : "clamp(24px, 5vh, 48px)",
          right: isFull ? 0 : "clamp(16px, 8vw, 120px)",
          bottom: isFull ? 0 : "clamp(24px, 5vh, 48px)",
          left: isFull ? 0 : "clamp(16px, 8vw, 120px)",
          borderRadius: isFull ? 0 : 16,
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable container with a white background */}
        <div className="w-full h-full overflow-y-auto flex flex-col bg-white" style={{ overscrollBehavior: "contain" }}>
          {/* Sticky header */}
          <header className="sticky top-0 z-10 bg-white border-b border-neutral-200/50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-medium text-neutral-900 truncate">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 cursor-pointer rounded-full bg-transparent hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6 18 18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Scrollable content */}
          <div className="flex-1 w-full">
            {description ? (
              <div className={`max-w-xl mx-auto px-6 pb-8 flex flex-col gap-5 ${image ? "pt-8" : "pt-[14%]"}`}>
                {image && <img src={image} alt={title} className="w-full rounded-xl" />}
                {/* Same body-copy treatment real project pages use
                    (ArticleContent.tsx: text-base md:text-lg leading-8
                    text-neutral-900) — this used to be a smaller, lighter
                    text-sm/text-neutral-700, reading as noticeably different
                    from a project's own body text even though both actually
                    render in the same inherited font (Inter; the real
                    pages' own "font-overusedGrotesk"/"font-calendas" classes
                    have no matching theme definition anywhere in the
                    codebase, so they're inert — size/leading/color were the
                    real mismatch, not the typeface itself). */}
                <p className="whitespace-break-spaces text-base md:text-lg leading-8 text-neutral-900">{description}</p>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={`/${slug}`}
                className="w-full h-full border-0"
                title={title}
                onLoad={() => {
                  const iframe = iframeRef.current;
                  if (!iframe?.contentWindow) return;
                  const handleScroll = () => {
                    const scrolled = iframe.contentWindow?.scrollY || iframe.contentDocument?.documentElement.scrollTop || 0;
                    setIsFull(scrolled > 30);
                  };
                  iframe.contentWindow.addEventListener("scroll", handleScroll, { passive: true });
                  iframe.contentDocument?.addEventListener("scroll", handleScroll, { passive: true });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
