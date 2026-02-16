'use client';

import { useMe } from '../auth/hooks';
import { PermissionCode } from './permissions';
import { can } from './can';

export function Can({
  permission,
  children,
}: {
  permission: PermissionCode;
  children: React.ReactNode;
}) {
  const { data: user } = useMe();

  if (!user) return null;

  return can(user.permissions, permission) ? <>{children}</> : null;
}
