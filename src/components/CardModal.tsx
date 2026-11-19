import { useEffect, useRef, useState } from "react";
import { Carousel, Media, ModalLayout, Section } from "@/components/system";

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
  video,
  gallery,
  onClose,
}: {
  title: string;
  slug?: string;
  description?: string;
  image?: string;
  // Shown instead of `image` when both are set — autoplay/loop/muted so it
  // reads like an animated screenshot rather than something you have to hit
  // play on; `controls` still lets you pause/scrub if you want to.
  video?: string;
  // Rendered after the description text — a captioned walkthrough for a
  // multi-step flow, each screenshot with its own line underneath instead
  // of one image/video trying to carry the whole explanation.
  gallery?: { src: string; caption: string }[];
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
        <div className="w-full h-full overflow-y-auto flex flex-col bg-card" style={{ overscrollBehavior: "contain" }}>
          {/* Sticky header */}
          <header className="sticky top-0 z-10 bg-card border-b border-border/50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-medium text-foreground truncate">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 cursor-pointer rounded-full bg-transparent hover:bg-muted text-subtle-foreground hover:text-foreground transition-colors"
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
              // Same ModalLayout a project page uses, just fed inline instead of
              // through an iframe — so both modes look identical.
              <ModalLayout short>
                <Section>
                  {(video || image) && (
                    <Media
                      className="mb-8"
                      src={video ?? image ?? ""}
                      type={video ? "video" : "image"}
                      animated={!!video}
                      alt={title}
                    />
                  )}
                  {description.split(/\n\n+/).map((paragraph, i) => (
                    <p key={i} className="whitespace-pre-line">{paragraph}</p>
                  ))}
                  {gallery && gallery.length > 0 && (
                    <Carousel
                      label={`${title} screens`}
                      slides={gallery.map((item, i) => ({
                        id: String(i),
                        content: <Media src={item.src} alt={item.caption} caption={item.caption} />,
                      }))}
                    />
                  )}
                </Section>
              </ModalLayout>
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
