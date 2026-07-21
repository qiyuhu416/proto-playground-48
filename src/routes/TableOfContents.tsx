import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Auto-detect h2 headings with IDs from the DOM
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

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed left-8 top-32 w-52 max-h-[calc(100vh-8rem)] overflow-auto">
      <ul className="space-y-2 text-sm pr-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block py-1 transition-all border-l-2 pl-3 ${
                activeId === item.id
                  ? "text-neutral-900 font-semibold border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900 border-transparent"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
