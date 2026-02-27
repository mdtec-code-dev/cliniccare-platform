'use client';

import { useMemo, useState } from 'react';
import { UsersTable } from '../components/UsersTable';
import { useQueryClient } from '@tanstack/react-query';
import { useUsers } from '../hooks/use-users';
import { CreateUserDialog } from '../components/CreateUserDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Can } from '@/modules/auth/components/Can';
import { useMe } from '@/modules/auth/hooks';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { UserPlus, Search } from 'lucide-react';

export function UsersView() {
  const { data: users = [], isLoading } = useUsers();

  const { data: user } = useMe();

  const [openCreate, setOpenCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');

  const filteredCount = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'active'
            ? u.is_active
            : !u.is_active;

      return matchesSearch && matchesStatus;
    }).length;
  }, [users, searchQuery, statusFilter]);

  const queryClient = useQueryClient();

  function refreshUsers() {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra usuarios del sistema y asigna roles.
          </p>
        </div>

        <Can user={user} permission="create.users">
          <Button
            onClick={() => setOpenCreate(true)}
            className="w-full md:w-auto"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo usuario
          </Button>
        </Can>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por username o email..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row md:items-center">
            <Select
              value={statusFilter}
              onValueChange={value =>
                setStatusFilter(value as 'all' | 'active' | 'inactive')
              }
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="w-fit">
              {filteredCount} resultados
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <UsersTable
        users={users}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        isLoading={isLoading}
      />

      {/* Create User Dialog */}
      <CreateUserDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={refreshUsers}
      />
    </div>
  );
}
