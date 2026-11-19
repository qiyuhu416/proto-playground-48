import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// The literal component the user supplied, adapted only where the original
// couldn't possibly work standalone:
// - `text`/`href` are now props instead of a hardcoded "SEXY SHADCN BUTTON"
//   string with no link — this card needs its own real text and needs to
//   lead somewhere.
// - The per-character rotation is `360 / text.length` instead of a
//   hardcoded `19deg` — 19deg only closes a full circle for a 19-character
//   string (the original's exact text); any other length needs the general
//   form or the ring overshoots/undershoots.
// - `asChild` + an `<a>` (not a plain `<button>`) so this renders as a real
//   external link, consistent with how every other external-link card on
//   this site works (and gets the site's own per-domain cursor styling).
// Everything else — the Button, the dotted ring, the rotating-text
// mechanism, the two-icon hover swap, <style jsx> itself — matches what was
// given, not a Tailwind-only reimplementation.
export function SexyButton({ text, href }: { text: string; href: string }) {
  return (
    <div className="border p-1 rounded-full border-dotted border-foreground">
      <Button asChild className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-0 grid place-content-center bg-foreground text-background hover:bg-foreground">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <p
            className="absolute inset-0"
            style={{
              animation: "spin-ring 8s linear infinite",
              position: "absolute",
              inset: 0,
            }}
          >
            {Array.from(text).map((char, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  inset: "6px",
                  transform: `rotate(${(360 / text.length) * i}deg)`,
                  transformOrigin: "50% 50%",
                  userSelect: "none",
                  display: "inline-block",
                  // Centre the glyph at the TOP-CENTRE of its box. Without this it sits at the
                  // box's top-left corner, so rotating around the centre throws it outside
                  // the circle, where overflow-hidden clips it.
                  textAlign: "center",
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </p>

          <div className="relative w-[40px] h-[40px] rounded-full text-foreground bg-card flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-4 h-4 transition-transform duration-300 ease-in-out"
              style={{ transform: "translate(0, 0)" }}
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-4 h-4 transition-transform duration-300 ease-in-out"
              style={{ transform: "translate(-150%, 150%)" }}
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
          </div>

          <style jsx>{`
            span {
              user-select: none;
            }
            a:hover svg:first-child {
              transform: translate(150%, -150%);
              color: black;
            }
            a:hover svg:last-child {
              transform: translate(0);
              color: black;
              transition-delay: 0.1s;
            }
          `}</style>
        </a>
      </Button>
    </div>
  );
}
