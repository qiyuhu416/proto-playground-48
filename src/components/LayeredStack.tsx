import { useEffect, useRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// A deck-of-cards toy: children render at whatever position their own CSS
// already gives them (their "fanned" layout) — this component, once GSAP is
// loaded, pulls them into one overlapping, slightly-rotated stack at the
// container's center (stackCards) or lets them fall back to that fanned
// layout (resetCards). Hovering toggles between the two, same as the
// original component this was ported from; GSAP itself is loaded from a CDN
// script tag (same pattern as FlippableBook.tsx) since this project doesn't
// have it as an npm dependency.
type LayeredStackProps = ComponentProps<"div">;

export function LayeredStack({ children, className, ...props }: LayeredStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gsapReady, setGsapReady] = useState(false);

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

  const stackCards = () => {
    const gsap = (window as any).gsap;
    const container = containerRef.current;
    if (!gsap || !container) return;
    const cards = Array.from(container.children) as HTMLElement[];

    cards.forEach((card, i) => {
      const left = card.offsetLeft;
      const top = card.offsetTop;
      const width = card.offsetWidth;
      const height = card.offsetHeight;

      const offsetX = container.clientWidth / 2 - width / 2 - left;
      const offsetY = container.clientHeight / 2 - height / 2 - top;

      gsap.to(card, {
        x: offsetX,
        y: offsetY,
        rotate: "random(-15,15)",
        zIndex: 100 - i,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  const resetCards = () => {
    const gsap = (window as any).gsap;
    const container = containerRef.current;
    if (!gsap || !container) return;
    const cards = Array.from(container.children);

    gsap.to(cards, {
      x: 0,
      y: 0,
      zIndex: 1,
      duration: 0.6,
      rotate: 0,
      ease: "power3.out",
      stagger: {
        amount: 0.05,
        from: "start",
      },
      overwrite: true,
    });
  };

  // Mounts already stacked (not fanned) — same as the original's mount-time
  // stackCards() call, just gated on GSAP actually being loaded.
  useEffect(() => {
    if (gsapReady) stackCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gsapReady]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={resetCards}
      onMouseLeave={stackCards}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default LayeredStack;
