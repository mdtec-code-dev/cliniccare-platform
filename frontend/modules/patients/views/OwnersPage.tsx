'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useOwners } from '../hooks';
import { useMe } from '@/modules/auth/hooks';
import OwnerTable from '../components/OwnerTable';
import OwnerRegistrationForm from '../components/OwnerRegistrationForm';

export default function OwnersPage() {
  const { data: owners = [], isLoading } = useOwners();

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOwners = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return owners.filter(
      owner =>
        owner.name?.toLowerCase().includes(query) ||
        owner.email?.toLowerCase().includes(query) ||
        owner.phone?.toLowerCase().includes(query)
    );
  }, [owners, searchQuery]);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Propietarios</h1>

        <Button onClick={() => setShowRegistrationForm(true)}>
          Nuevo Propietario
        </Button>
      </div>

      {/* Search & Filters */}

      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre,email o telefono..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p>Cargando...</p>
      ) : filteredOwners.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 py-12">
          <h3 className="mb-2 text-lg font-semibold">
            No se encontraron Propietarios
          </h3>
          <p className="text-sm text-muted-foreground">
            Intenta ajustar los filtros
          </p>
        </div>
      ) : (
        <OwnerTable owners={filteredOwners} />
      )}

      <OwnerRegistrationForm
        open={showRegistrationForm}
        onOpenChange={setShowRegistrationForm}
      />
    </main>
  );
}
