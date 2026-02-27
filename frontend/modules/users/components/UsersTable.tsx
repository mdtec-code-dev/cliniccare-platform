'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, ShieldCheck, UserX, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

import { toast } from 'sonner';

import { useMe } from '@/modules/auth/hooks';
import { Can } from '@/modules/auth/components/Can';

import type { User } from '../types/user.types';
import { AssignRoleDialog } from './AssingRoleDialog';
import { updateUserStatus } from '../api/users.api';

interface UsersTableProps {
  users: User[];
  searchQuery: string;
  statusFilter: 'all' | 'active' | 'inactive';
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function UsersTable({
  users,
  searchQuery,
  statusFilter,
  isLoading = false,
  onRefresh,
}: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: authUser } = useMe();

  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'active'
            ? user.is_active
            : !user.is_active;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const isAllSelected =
    paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length;

  const isSomeSelected =
    selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  const toggleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge
        variant="outline"
        className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      >
        Activo
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20"
      >
        Inactivo
      </Badge>
    );
  };

  async function handleToggleStatus(user: User) {
    if (authUser?.id === String(user.id)) {
      toast.error('No puedes desactivar tu propio usuario');
      return;
    }

    const confirmMessage = user.is_active
      ? `¿Seguro que quieres desactivar a ${user.username}?`
      : `¿Seguro que quieres activar a ${user.username}?`;

    const confirmed = confirm(confirmMessage);
    if (!confirmed) return;

    try {
      await updateUserStatus(user.id, !user.is_active);

      toast.success(
        user.is_active ? 'Usuario desactivado correctamente' : 'Usuario activado correctamente'
      );

      onRefresh?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Error actualizando usuario');
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="rounded-lg overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Seleccionar todos"
                      className={
                        isSomeSelected ? 'data-[state=checked]:bg-primary' : ''
                      }
                    />
                  </TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No se encontraron usuarios
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map(user => (
                    <TableRow
                      key={user.id}
                      className={
                        selectedUsers.includes(user.id) ? 'bg-accent/50' : ''
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleSelectUser(user.id)}
                          aria-label={`Seleccionar ${user.username}`}
                        />
                      </TableCell>

                      <TableCell className="font-medium">
                        {user.username}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {user.role || 'Sin rol'}
                      </TableCell>

                      <TableCell>{getStatusBadge(user.is_active)}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <Can user={authUser} permission="update.users">
                              <DropdownMenuItem
                                onClick={() => setSelectedUser(user)}
                              >
                                <ShieldCheck className="size-4 mr-2" />
                                Asignar Rol
                              </DropdownMenuItem>
                            </Can>

                            <DropdownMenuSeparator />

                            <Can user={authUser} permission="update.users">
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(user)}
                              >
                                {user.is_active ? (
                                  <>
                                    <UserX className="size-4 mr-2" />
                                    Desactivar
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="size-4 mr-2" />
                                    Activar
                                  </>
                                )}
                              </DropdownMenuItem>
                            </Can>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Assign Role Dialog */}
      {selectedUser && (
        <AssignRoleDialog
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </>
  );
}
