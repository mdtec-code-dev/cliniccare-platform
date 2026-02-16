

export function can(
  userPermissions: string[] | undefined,
  permission: string
): boolean {
  if (!userPermissions) return false;
  return userPermissions.includes(permission);
}
