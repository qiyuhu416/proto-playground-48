import { ArrowUpRight } from "lucide-react";
import { ARTICLE_META } from "./articleMeta";

type Props = {
  slug: string;
  category: string;
  meta: string;
};

export function ArticleRefCard({ slug, category, meta }: Props) {
  const article = ARTICLE_META[slug];
  if (!article) return null;
  const { title, thumbnail, thumbnailSize } = article;

  return (
    <a
      href={`/${slug}`}
      className="group relative rounded-2xl p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] block"
    >
      <div className="relative flex h-[50vh] items-center justify-center overflow-hidden rounded-xl bg-white">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={
              thumbnailSize === "small"
                ? "w-16 h-16 object-contain"
                : thumbnailSize === "medium"
                ? "w-48 h-48 object-contain"
                : "h-1/2 w-1/2 object-contain"
            }
          />
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{title}</span>
        )}
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span>{category}</span>
          <span>·</span>
          <span>{meta}</span>
        </div>
        <h3 className="mt-1 text-[15px] font-medium text-neutral-900">{title}</h3>
      </div>
    </a>
  );
}
