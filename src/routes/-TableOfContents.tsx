import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ARTICLE_META } from "./-articleMeta";

interface TOCItem {
  id: string;
  title: string;
}

export function TableOfContents({ backHref = "/" }: { backHref?: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Resolve contextual back link from ?from= param
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const fromSlug = params.get("from");
  const fromTitle = fromSlug ? ARTICLE_META[fromSlug]?.title : null;
  const resolvedBackHref = fromSlug ? `/${fromSlug}` : backHref;
  const backLabel = fromTitle ? `Back to ${fromTitle}` : "Back";

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2[id]"));
    setItems(headings.map((h) => ({ id: h.id, title: h.textContent ?? "" })));
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.getBoundingClientRect().top < 120) {
          setActiveId(items[i].id);
          return;
        }
      }
      setActiveId("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <nav className="not-prose hidden xl:flex flex-col gap-4 fixed left-8 top-20 w-52 max-h-[calc(100vh-5rem)] overflow-auto">
      <a
        href={resolvedBackHref}
        className="no-underline inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        {backLabel}
      </a>
      {items.length > 0 && (
        <ul className="space-y-1 text-xs pr-4 border-l border-neutral-200 pl-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`no-underline block py-1 transition-all border-l-2 pl-3 -ml-px ${
                  activeId === item.id
                    ? "text-neutral-900 font-medium border-neutral-900"
                    : "text-neutral-400 hover:text-neutral-700 border-transparent"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
