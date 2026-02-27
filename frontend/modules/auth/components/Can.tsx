'use client';

import type { ReactNode } from 'react';
import type { AuthUser } from '../types/auth.types';
import { can } from '../utils/can';

export function Can({
  user,
  permission,
  children,
}: {
  user: AuthUser | null | undefined;
  permission: string;
  children: ReactNode;
}) {
  if (!can(user, permission)) return null;
  return <>{children}</>;
}
