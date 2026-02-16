import { ProtectedRoute } from '@/modules/access/ProtectedRoute';
import { PERMISSIONS } from '@/modules/access/permissions';

export default function UsersPage() {
  return (
    <ProtectedRoute permission={PERMISSIONS.USERS_READ}>
      <div>Usuarios</div>
    </ProtectedRoute>
  );
}
