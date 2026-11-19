import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Media — image or video inside a modal.
 * Mirrors the Figma component "Media" (Kind=media):
 *   width    "column" | "wide"   column = the text column; wide = breaks out of it
 *   caption  Show caption toggle (pass a caption to show it)
 *
 * Every media is capped at 60vh tall (it scales down, never crops taller)
 * and has no border option.
 *
 * "wide" needs a `@container` ancestor (ArticleLayout provides one): it grows to
 * 80% of the modal width, never narrower than the column, capped at 1280px.
 */
export interface MediaProps {
  src: string;
  alt: string;
  type?: "image" | "video";
  /** video that autoplays, loops, muted — reads like an animated screenshot */
  animated?: boolean;
  width?: "column" | "wide";
  /** fixed frame ratio (e.g. 1.78); omit to use the file's own ratio */
  aspectRatio?: number | string;
  caption?: React.ReactNode;
  className?: string;
}

export function Media({
  src,
  alt,
  type = "image",
  animated = false,
  width = "column",
  aspectRatio,
  caption,
  className,
}: MediaProps) {
  const frame = cn(
    "mx-auto block h-auto max-h-[60vh] w-full rounded-lg bg-muted object-contain",
  );
  const style = aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined;

  return (
    <figure
      className={cn(
        "m-0",
        width === "wide" &&
          "relative left-1/2 w-[max(100%,min(80cqw,1280px))] -translate-x-1/2",
        className,
      )}
    >
      {type === "video" ? (
        <video
          src={src}
          className={frame}
          style={style}
          controls
          controlsList="nodownload"
          {...(animated && { autoPlay: true, loop: true, muted: true })}
          playsInline
        />
      ) : (
        <img src={src} alt={alt} className={frame} style={style} draggable={false} />
      )}
      {caption && (
        <figcaption className="mt-3 text-sm leading-5 text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
