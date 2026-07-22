import { ArrowLeft } from "lucide-react";
import { ARTICLE_META } from "./-articleMeta";

export function BackButton() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const fromSlug = params.get("from");
  const fromTitle = fromSlug ? ARTICLE_META[fromSlug]?.title : null;

  const label = fromTitle ? `Back to ${fromTitle}` : "Back";
  const href = fromSlug ? `/${fromSlug}` : "/";

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </a>
  );
}
