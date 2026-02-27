import type { AuthUser } from "../types/auth.types";

export function can(user: AuthUser | null | undefined, permission: string) {
  if (!user) return false;
  return user.permissions?.includes(permission) ?? false;
}

export function canAny(user: AuthUser | null | undefined, permissions: string[]) {
  if (!user) return false;
  return permissions.some((p) => user.permissions?.includes(p));
}

export function canAll(user: AuthUser | null | undefined, permissions: string[]) {
  if (!user) return false;
  return permissions.every((p) => user.permissions?.includes(p));
}
