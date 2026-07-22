export const NAV_ITEMS = ["work", "play", "reflect", "listen"] as const;
export type NavItem = (typeof NAV_ITEMS)[number];

export function navHref(item: NavItem): string {
  if (item === "work") return "/";
  if (item === "reflect") return "/think";
  return `/${item}`;
}
