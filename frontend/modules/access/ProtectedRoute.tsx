'use client';

import { useMe } from '../auth/hooks';
import { PermissionCode } from './permissions';
import { can } from './can';

export function ProtectedRoute({
  permission,
  children,
}: {
  permission: PermissionCode;
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (!user) return null;

  if (!can(user.permissions, permission)) {
    return <div className="p-6">Acceso denegado</div>;
  }

  return <>{children}</>;
}
