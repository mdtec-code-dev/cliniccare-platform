import { BadgeVariant } from '@/components/common/badge';

/** Estados exactos de la tabla appointments_appointment */
export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW';

/** Estructura de la tabla appointments_appointment */
export interface Appointment {
  id: number;
  patient: number;
  doctor?: number | null;
  created_by: number;
  start_time: string; // ISO Datetime
  end_time: string; // ISO Datetime
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Este tipo representa la estructura ideal para el Dashboard,
 * uniendo datos de la cita con información básica del paciente.
 */
export interface AppointmentSummary {
  id: number;
  time: string; // Formateado para UI
  patient: {
    id: number;
    idNum: string; // SKU o ID visual
    name: string;
    species: string;
    breed: string;
  };
  reason: string;
  status: AppointmentStatus;
}

/** Mapeo de estados de DB a colores de la UI */
export const APPOINTMENT_STATUS_VARIANTS: Record<
  AppointmentStatus,
  BadgeVariant
> = {
  SCHEDULED: 'emerald',
  CONFIRMED: 'blue',
  COMPLETED: 'blue',
  NO_SHOW: 'amber',
  CANCELLED: 'red',
};
