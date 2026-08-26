export const NAV_ITEMS = ["create", "reflect"] as const;
export type NavItem = (typeof NAV_ITEMS)[number];

export function navHref(item: NavItem): string {
  if (item === "create") return "/";
  if (item === "reflect") return "/think";
  return `/${item}`;
}
