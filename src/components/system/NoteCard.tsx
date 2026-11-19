import * as React from "react";
import { Panel } from "./Panel";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

/**
 * NoteCard — one card in the Reflection list.
 * Mirrors the Figma component "Note card":
 *   kind="text"   no image: a Panel (kind card) showing the note's content
 *   kind="image"  image fills the card; on hover a dark overlay shows the SAME
 *                 content, laid out and styled exactly like the text card
 *                 (only the background — and so the text colour — differs)
 * Both are a fixed 192px tall and clickable (grow to 105% on hover).
 *
 *   <NoteCard kind="text"  date="Aug 5, 2026" title="…" preview="…" onClick={…} />
 *   <NoteCard kind="image" date="…" title="…" preview="…" image="/articles/…jpg" onClick={…} />
 */
type Handlers = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onClick" | "onMouseEnter" | "onMouseLeave"
>;

type Content = { title: string; date: string; preview: string };

export type NoteCardProps = Handlers &
  Content &
  ({ kind: "image"; image: string } | { kind: "text" });

// The one text layout both kinds share: date on top, title + two-line preview
// at the bottom. `onImage` only swaps the colour tokens for the dark overlay.
function NoteCardContent({ title, date, preview, onImage }: Content & { onImage?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <Eyebrow className={onImage ? "text-primary-foreground" : "text-muted-foreground"}>{date}</Eyebrow>
      <div className="flex flex-col gap-2">
        <p className={cn("text-base font-bold leading-6", onImage ? "text-primary-foreground" : "text-foreground")}>
          {title}
        </p>
        <p
          className={cn(
            "line-clamp-2 whitespace-pre-line text-base leading-6",
            onImage ? "text-primary-foreground" : "text-muted-foreground",
          )}
        >
          {preview}
        </p>
      </div>
    </div>
  );
}

export function NoteCard(props: NoteCardProps) {
  const { title, date, preview, onClick, onMouseEnter, onMouseLeave } = props;
  const handlers = { onClick, onMouseEnter, onMouseLeave };

  if (props.kind === "image") {
    return (
      <div
        {...handlers}
        className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-muted transition-transform duration-150 hover:scale-105"
      >
        <img src={props.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {/* No text at rest. On hover the overlay shows the same content as the text card. */}
        <div className="absolute inset-0 bg-foreground/0 p-6 opacity-0 transition-all duration-150 group-hover:bg-foreground/50 group-hover:opacity-100">
          <NoteCardContent title={title} date={date} preview={preview} onImage />
        </div>
      </div>
    );
  }

  return (
    <Panel kind="card" interactive {...handlers} className="relative h-48 w-full overflow-hidden">
      <NoteCardContent title={title} date={date} preview={preview} />
    </Panel>
  );
}
