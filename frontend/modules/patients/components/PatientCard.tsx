'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, FileText } from 'lucide-react';
import type { Patient } from '@/modules/patients/types';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const age = patient.birth_date
    ? calculateAge(patient.birth_date)
    : 'Edad no registrada';

  const speciesSlug = patient.species?.slug ?? 'otro';

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        {/* Header visual */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-primary/20 text-5xl">🐾</div>
          </div>

          <div className="absolute right-2 top-2">
            <Badge variant="secondary">{patient.species.name}</Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {patient.breed ?? 'Sin raza'} • {age}
            </p>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {patient.owner.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {patient.owner.phone}
              </span>
            </div>

            {patient.last_visit && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Última visita: {formatDate(patient.last_visit)}
                </span>
              </div>
            )}
          </div>

          {/* Alertas médicas */}
          {(patient.allergies.length > 0 ||
            patient.chronic_conditions.length > 0) && (
            <div className="mb-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <p className="text-xs font-medium text-amber-900 dark:text-amber-400">
                Alertas Médicas
              </p>

              {patient.allergies.length > 0 && (
                <p className="text-xs text-amber-700 dark:text-amber-500">
                  Alergias: {patient.allergies.join(', ')}
                </p>
              )}

              {patient.chronic_conditions.length > 0 && (
                <p className="text-xs text-amber-700 dark:text-amber-500">
                  {patient.chronic_conditions.join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-1"
              asChild
            >
              <Link href={`/patients/${patient.id}`}>
                <FileText className="h-4 w-4" />
                Ver Ficha
              </Link>
            </Button>

            <Button variant="outline" size="sm" className="flex-1 gap-1">
              <Calendar className="h-4 w-4" />
              Agendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
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
