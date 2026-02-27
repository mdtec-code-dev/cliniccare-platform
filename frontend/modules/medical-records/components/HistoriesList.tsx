import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MedicalRecord } from '../types/medical-record.types';

interface MedicalRecordsListProps {
  records: MedicalRecord[];
  selectedId?: number;
  onSelect: (record: MedicalRecord) => void;
}

export function MedicalRecordsList({
  records,
  selectedId,
  onSelect,
}: MedicalRecordsListProps) {
  return (
    <div className="space-y-3">
      <div className="sticky top-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Historias Clínicas
        </h2>

        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {records.map(record => {
            const age = record.patient.birth_date
              ? calculateAge(record.patient.birth_date)
              : 'Edad no registrada';

            return (
              <Card
                key={record.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedId === record.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary hover:bg-secondary'
                }`}
                onClick={() => onSelect(record)}
              >
                <div className="space-y-2">
                  {/* Paciente */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground leading-tight">
                      {record.patient.name}
                    </h3>

                    {selectedId === record.id && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                    )}
                  </div>

                  {/* Edad y cita */}
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Edad:</span> {age}
                    </p>

                    {record.appointment && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">Cita:</span>{' '}
                        {new Date(record.appointment.start_time).toLocaleString(
                          'es-CO'
                        )}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {new Date(record.date).toLocaleDateString('es-CO')}
                    </span>

                    <Badge variant="outline" className="text-xs capitalize">
                      {record.type}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
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
