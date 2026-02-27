import { UsersView } from '@/modules/users/views/UsersView';
import { RequirePermission } from '@/modules/auth/components/RequirePermission';

export default function UsersPage() {
  return (
    <RequirePermission permissions={['read.users', 'update.users']}>
      <UsersView />
    </RequirePermission>
  );
}
