import { ArrowUpRight } from "lucide-react";
import { ARTICLE_META } from "./-articleMeta";

import { Eyebrow } from "@/components/system";
type Props = {
  slug: string;
  category: string;
  meta: string;
  /** Slug of the article this card is embedded in — appended as ?from= so the back button knows where to return */
  fromSlug?: string;
};

export function ArticleRefCard({ slug, category, meta, fromSlug }: Props) {
  const article = ARTICLE_META[slug];
  if (!article) return null;
  const { title, thumbnail, thumbnailSize } = article;
  const href = fromSlug ? `/${slug}?from=${fromSlug}` : `/${slug}`;

  return (
    <a
      href={href}
      className="group relative rounded-2xl p-3 shadow-sm bg-card transition-all hover:-translate-y-0.5 hover:shadow-md block"
    >
      <div className="relative flex h-[50vh] items-center justify-center overflow-hidden rounded-xl bg-card">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={
              thumbnailSize === "xs"
                ? "w-8 h-8 object-contain"
                : thumbnailSize === "small"
                ? "w-16 h-16 object-contain"
                : thumbnailSize === "medium"
                ? "w-48 h-48 object-contain"
                : "h-1/2 w-1/2 object-contain"
            }
          />
        ) : (
          <Eyebrow>{title}</Eyebrow>
        )}
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-subtle-foreground">
          <span>{category}</span>
          <span>·</span>
          <span>{meta}</span>
        </div>
        <h3 className="mt-1 text-base font-medium text-foreground">{title}</h3>
      </div>
    </a>
  );
}
