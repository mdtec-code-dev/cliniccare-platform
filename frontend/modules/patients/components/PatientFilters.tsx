'use client';

import { Button } from '@/components/ui/button';
import type { Species } from '@/modules/patients/types';

interface PatientFiltersProps {
  speciesList: Species[];
  selectedSpecies: string | 'todos';
  onSpeciesChange: (speciesSlug: string | 'todos') => void;
  patientCount: number;
}

export function PatientFilters({
  speciesList,
  selectedSpecies,
  onSpeciesChange,
  patientCount,
}: PatientFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3 shadow-sm">
      <span className="text-sm font-medium text-muted-foreground">
        Filtrar por especie:
      </span>

      {/* Botón Todos */}
      <Button
        variant={selectedSpecies === 'todos' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSpeciesChange('all')}
      >
        Todos
      </Button>

      {/* Especies dinámicas */}
      {speciesList.map(species => (
        <Button
          key={species.id}
          variant={selectedSpecies === species.slug ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSpeciesChange(species.slug)}
        >
          {species.name}
        </Button>
      ))}

      <span className="ml-auto text-sm text-muted-foreground">
        {patientCount} {patientCount === 1 ? 'paciente' : 'pacientes'}
      </span>
    </div>
  );
}
