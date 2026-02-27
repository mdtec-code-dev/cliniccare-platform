'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar } from 'lucide-react';
import type { Patient } from '@/modules/patients/types';
import Link from 'next/link';

const speciesColors: Record<string, string> = {
  perro: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  gato: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  conejo: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  ave: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  otro: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

interface PatientTableProps {
  patients: Patient[];
}

export function PatientTable({ patients }: PatientTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Especie</TableHead>
            <TableHead>Raza</TableHead>
            <TableHead>Edad</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Última Visita</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map(patient => {
            const speciesSlug = patient.species?.slug ?? 'otro';
            const hasAlerts =
              patient.allergies.length > 0 ||
              patient.chronic_conditions.length > 0;

            return (
              <TableRow key={patient.id}>
                {/* Paciente */}
                <TableCell className="font-medium">
                  <div>
                    <p className="font-semibold">{patient.name}</p>

                    {hasAlerts && (
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        ⚠ Alertas médicas
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Especie */}
                <TableCell>
                  <Badge className={speciesColors[speciesSlug]}>
                    {patient.species.name}
                  </Badge>
                </TableCell>

                {/* Raza */}
                <TableCell className="text-muted-foreground">
                  {patient.breed ?? '—'}
                </TableCell>

                {/* Edad */}
                <TableCell className="text-muted-foreground">
                  {patient.birth_date ? calculateAge(patient.birth_date) : '—'}
                </TableCell>

                {/* Propietario */}
                <TableCell className="text-muted-foreground">
                  {patient.owner.name}
                </TableCell>

                {/* Teléfono */}
                <TableCell className="text-muted-foreground">
                  {patient.owner.phone}
                </TableCell>

                {/* Última visita */}
                <TableCell className="text-muted-foreground">
                  {patient.last_visit
                    ? formatDate(patient.last_visit)
                    : 'Sin visitas'}
                </TableCell>

                {/* Acciones */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Link href={`/patients/${patient.id}`}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  return `${months} ${months === 1 ? 'mes' : 'meses'}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
