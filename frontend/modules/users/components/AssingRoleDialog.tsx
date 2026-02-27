'use client';

import { useEffect, useState } from 'react';
import type { User } from '../types/user.types';
import { assignRole } from '../api/users.api';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from 'sonner';
import api from '@/lib/api/api';

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
}

type Role = {
  id: number;
  name: string;
};

export function AssignRoleDialog({ user, open, onClose }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
      try {
        // Ajusta esta ruta si tu backend la tiene distinta
        const res = await api.get('/auth/roles/');
        setRoles(res.data.roles || []);
      } catch (error) {
        toast.error('No se pudieron cargar los roles');
      }
    }

    if (open) fetchRoles();
  }, [open]);

  async function handleAssign() {
    if (!selectedRole) {
      toast.error('Selecciona un rol');
      return;
    }

    try {
      setLoading(true);
      await assignRole(user.id, selectedRole);
      toast.success(`Rol asignado a ${user.username}`);
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'Error asignando rol');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Asignar rol</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Usuario: <span className="font-medium">{user.username}</span>
          </p>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAssign} disabled={loading}>
            {loading ? 'Asignando...' : 'Asignar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
