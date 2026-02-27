'use client';

import type { MedicalRecord } from '../types/medical-record.types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';

interface MedicalRecordDetailProps {
  record: MedicalRecord;
}

function formatType(type: string) {
  const map: Record<string, string> = {
    consulta: 'Consulta',
    vacuna: 'Vacuna',
    cirugia: 'Cirugía',
    desparasitacion: 'Desparasitación',
  };

  return map[type] ?? type;
}

export function MedicalRecordDetail({ record }: MedicalRecordDetailProps) {
  const age = record.patient.birth_date
    ? calculateAge(record.patient.birth_date)
    : 'Edad no registrada';
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-transparent">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {record.patient.name}
              </h2>
              <p className="text-muted-foreground mt-1">Historia Clínica</p>
            </div>

            <Badge className="bg-primary text-primary-foreground py-2 px-3">
              {formatType(record.type)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">FECHA</p>
              <p className="text-sm font-semibold text-foreground">
                {new Date(record.date).toLocaleDateString('es-CO')}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">EDAD</p>
              <p className="text-sm font-semibold text-foreground">{age}</p>
            </div>

            {record.appointment && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  CITA
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(record.appointment.start_time).toLocaleString(
                    'es-CO'
                  )}
                </p>
              </div>
            )}

            {record.follow_up_date && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">
                  PRÓXIMO CONTROL
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(record.follow_up_date).toLocaleDateString('es-CO')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Profesional */}
      <Card className="border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Stethoscope className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-foreground">
            Profesional Responsable
          </h3>
        </div>

        <div className="pl-8">
          <p className="text-sm text-foreground">{record.doctor.username}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {formatType(record.type)}
          </p>
        </div>
      </Card>

      {/* Secciones Clínicas */}
      <div className="space-y-4">
        {/* Diagnóstico */}
        <Card className="border border-border overflow-hidden">
          <div className="bg-secondary/50 px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">DIAGNÓSTICO</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {record.diagnosis ?? 'No registrado'}
            </p>
          </div>
        </Card>

        {/* Tratamiento */}
        <Card className="border border-border overflow-hidden">
          <div className="bg-secondary/50 px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">TRATAMIENTO</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {record.treatment ?? 'No registrado'}
            </p>
          </div>
        </Card>

        {/* Medicamentos */}
        {record.medications.length > 0 && (
          <Card className="border border-border overflow-hidden">
            <div className="bg-secondary/50 px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground">MEDICAMENTOS</h3>
            </div>
            <div className="p-6 space-y-2">
              {record.medications.map((med, index) => (
                <p key={index} className="text-sm text-foreground">
                  • {med}
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* Observaciones */}
        <Card className="border border-border overflow-hidden">
          <div className="bg-secondary/50 px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">
              OBSERVACIONES Y SEGUIMIENTO
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {record.observations ?? 'No registrado'}
            </p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-border pt-4 text-xs text-muted-foreground text-center">
        <p>
          Documento generado el {new Date().toLocaleDateString('es-CO')} -
          Sistema de Gestión Clínica
        </p>
      </div>
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
