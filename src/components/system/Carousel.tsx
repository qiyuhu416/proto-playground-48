import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Carousel — a horizontal strip of slides, one always centred.
 * Mirrors the Figma component "Outcome" (Variant=carousel).
 *
 * Layout: the carousel breaks out of the text column to the full modal width
 * (100cqw, needs the `@container` that ArticleLayout provides). Each slide is
 * exactly one column wide; the strip is padded by (viewport − slide) / 2 on both
 * ends so even the first and last slide can sit in the centre, and every slide
 * is a scroll-snap point (`snap-center`) so a scroll always settles centred.
 */
export interface CarouselProps {
  slides: { id: string; content: React.ReactNode }[];
  label?: string;
  className?: string;
}

export function Carousel({ slides, label = "Carousel", className }: CarouselProps) {
  const stripRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  // Odd count → start on the middle slide, so it is the centred one with a
  // neighbour peeking on each side. Even count → start on the first slide.
  const startIndex = slides.length % 2 === 1 ? (slides.length - 1) / 2 : 0;
  const [active, setActive] = React.useState(startIndex);
  const activeRef = React.useRef(startIndex);
  activeRef.current = active;
  const [column, setColumn] = React.useState<number | null>(null);

  // The column width = the width this component would have if it did NOT break out.
  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setColumn(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Active slide = the one crossing the vertical centre line of the strip.
  React.useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: strip, rootMargin: "0px -50% 0px -50%", threshold: 0 },
    );
    strip.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length, column]);

  const goTo = React.useCallback((index: number, instant = false) => {
    const strip = stripRef.current;
    const slide = strip?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!strip || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: slide.offsetLeft - (strip.clientWidth - slide.offsetWidth) / 2,
      behavior: reduce || instant ? "auto" : "smooth",
    });
  }, []);

  // Put the starting slide in the centre once the column is measured, and keep
  // the current slide centred if the modal is resized.
  React.useLayoutEffect(() => {
    if (column) goTo(activeRef.current, true);
  }, [column, goTo]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(Math.min(active + 1, slides.length - 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(Math.max(active - 1, 0));
    }
  };

  const slideWidth = column ? `${column}px` : "min(100%, 48rem)";
  const pad = `calc((100cqw - ${slideWidth}) / 2)`;

  return (
    <div className={cn("my-8", className)}>
      <div ref={measureRef} className="h-0 w-full" aria-hidden />
      <section
        aria-roledescription="carousel"
        aria-label={label}
        className="relative left-1/2 w-[100cqw] -translate-x-1/2"
      >
        <div
          ref={stripRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="flex snap-x snap-mandatory items-start gap-8 overflow-x-auto outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: pad, scrollPaddingInline: pad }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              data-index={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="shrink-0 snap-center"
              style={{ width: slideWidth }}
            >
              {slide.content}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === active ? "bg-foreground" : "bg-border-strong",
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
