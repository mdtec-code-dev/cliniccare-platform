import type { AuthUser } from "../types/auth.types";
import type { SidebarItem } from "@/components/layout/sidebar.items";

export function filterSidebarItems(user: AuthUser | null, items: SidebarItem[]) {
  if (!user) return [];

  return items.filter((item) => {
    if (!item.permission) return true;
    return user.permissions.includes(item.permission);
  });
}
