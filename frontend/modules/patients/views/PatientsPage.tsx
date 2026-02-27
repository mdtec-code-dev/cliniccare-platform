'use client';

import { useState, useMemo } from 'react';
import { Search, LayoutGrid, Table as TableIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { usePatients } from '../hooks/patients/use-patients';
import { useSpecies } from '../hooks/species/use-species';

import { PatientCard } from '../components/PatientCard';
import { PatientTable } from '../components/PatientTable';
import { PatientFilters } from '../components/PatientFilters';
import { PatientRegistrationForm } from '../components/PatientRegistrationForm';
import { Can } from '@/modules/auth/components/Can';
import { useMe } from '@/modules/auth/hooks';

export function PatientsPage() {
  // ✅ Hooks SIEMPRE arriba
  const { data: patients = [], isLoading } = usePatients();
  const { data: speciesList = [] } = useSpecies();
  const {data: user} = useMe()

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // ✅ useMemo SOLO usa variables ya definidas
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.breed ?? '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecies =
        selectedSpecies === 'all'
          ? true
          : patient.species.slug === selectedSpecies;

      return matchesSearch && matchesSpecies;
    });
  }, [patients, searchQuery, selectedSpecies]);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pacientes</h1>

       <Can user={user} permission='create.patients'>
           <Button onClick={() => setShowRegistrationForm(true)}>
          Nuevo Paciente
        </Button>
       </Can>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, propietario o raza..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <PatientFilters
          speciesList={speciesList}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
          patientCount={filteredPatients.length}
        />
      </div>

      {/* List */}
      {isLoading ? (
        <p>Cargando...</p>
      ) : filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 py-12">
          <h3 className="mb-2 text-lg font-semibold">
            No se encontraron pacientes
          </h3>
          <p className="text-sm text-muted-foreground">
            Intenta ajustar los filtros
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <PatientTable patients={filteredPatients} />
      )}

      <PatientRegistrationForm
        open={showRegistrationForm}
        onOpenChange={setShowRegistrationForm}
      />
    </main>
  );
}
