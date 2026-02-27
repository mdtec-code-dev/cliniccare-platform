'use client';

import { useMemo } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import type { AppointmentStatus } from '../types/appointment.types';
import { APPOINTMENT_STATUS_LABELS } from '../types/appointment.types';

interface AppointmentsListProps {
  selectedDate: Date;
  selectedDoctor: string | 'all';
  selectedStatus: AppointmentStatus | 'all';
  searchPatient: string;
}

export function AppointmentsList({
  selectedDate,
  selectedDoctor,
  selectedStatus,
  searchPatient,
}: AppointmentsListProps) {
  // 🔥 Convertimos Date a string YYYY-MM-DD
  const formattedDate = useMemo(() => {
    return selectedDate.toISOString().split('T')[0];
  }, [selectedDate]);

  const { data: appointments = [], isLoading } = useAppointments({
    date: formattedDate,
    doctor_id: selectedDoctor !== 'all' ? selectedDoctor : undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    search: searchPatient || undefined,
  });

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border p-6">Cargando citas...</div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6 text-muted-foreground">
        No hay citas para los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="divide-y">
        {appointments.map(appointment => (
          <div
            key={appointment.id}
            className="p-4 hover:bg-muted/40 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{appointment.patient.name}</p>

                <p className="text-sm text-muted-foreground">
                  {appointment.time} • {appointment.type}
                </p>

                <p className="text-sm text-muted-foreground">
                  Doctor: {appointment.doctor?.full_name ?? 'Sin asignar'}
                </p>
              </div>

              <span className="text-sm font-medium">
                {APPOINTMENT_STATUS_LABELS[appointment.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
