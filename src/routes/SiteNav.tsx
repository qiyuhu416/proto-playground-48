import { Link } from "@tanstack/react-router";
import { NAV_ITEMS, navHref, type NavItem } from "./navItems";

interface SiteNavProps {
  active: NavItem;
  theme?: "light" | "dark";
  /** Extra props forwarded to the <header> element */
  headerProps?: React.HTMLAttributes<HTMLElement>;
}

export function SiteNav({ active, theme = "light", headerProps }: SiteNavProps) {
  const dark = theme === "dark";
  return (
    <header
      {...headerProps}
      className={[
        "sticky top-0 z-40 backdrop-blur-sm border-b",
        dark
          ? "bg-neutral-900/90 border-neutral-800/50"
          : "bg-background/90 border-neutral-200/50",
        headerProps?.className ?? "",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        <div className="flex-1 flex items-center">
          <Link
            to="/what-do-prototypes-prototype"
            className={[
              "group relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs overflow-hidden transition-all",
              dark
                ? "bg-neutral-800 text-neutral-300 hover:bg-white hover:text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                : "bg-white text-neutral-600 hover:bg-neutral-900 hover:text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
            ].join(" ")}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0 whitespace-nowrap">currently AI prototyper @Apple</span>
            <span className="absolute left-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">What do prototypes prototype?</span>
          </Link>
        </div>
        <nav
          className={[
            "flex items-center gap-1 rounded-full border p-1",
            dark
              ? "border-neutral-700 bg-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              : "border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
          ].join(" ")}
        >
          {NAV_ITEMS.map((l) => (
            <Link
              key={l}
              to={navHref(l)}
              className={[
                "rounded-full px-4 py-1.5 text-sm transition-colors",
                l === active
                  ? dark
                    ? "bg-white text-neutral-900"
                    : "bg-neutral-900 text-white"
                  : dark
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900",
              ].join(" ")}
            >
              {l}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end">
          <Link
            to="/"
            className={`text-sm font-medium ${dark ? "text-white" : "text-neutral-900"}`}
          >
            Qiyu
          </Link>
        </div>
      </div>
    </header>
  );
}
