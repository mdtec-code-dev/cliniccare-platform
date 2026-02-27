// features/appointments/types/appointment.types.ts

export const APPOINTMENT_STATUSES = [
  "programada",
  "confirmada",
  "cancelada",
  "completada",
  "no_show",
] as const;

export type AppointmentStatus =
  typeof APPOINTMENT_STATUSES[number];

export const APPOINTMENT_TYPES = [
  "consulta",
  "revision",
  "vacuna",
  "cirugia",
] as const;

export type AppointmentType =
  typeof APPOINTMENT_TYPES[number];

export interface Appointment {
  id: string;

  patient: {
    id: string;
    name: string;
  };

  owner: {
    id: string;
    name: string;
  };

  doctor: {
    id: string;
    full_name: string;
  } | null;

  created_by: {
    id: string;
    full_name: string;
  };

  date: string;
  time: string;

  type: AppointmentType;
  status: AppointmentStatus;

  notes?: string | null;

  reminder: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentPayload {
  patient_id: string;
  owner_id: string;
  doctor_id?: string | null;

  date: string;
  time: string;

  type: AppointmentType;
  status?: AppointmentStatus;

  notes?: string;
  reminder?: boolean;
  is_active?: boolean;
}

export type UpdateAppointmentPayload =
  Partial<CreateAppointmentPayload>;

export interface AppointmentFilters {
  date?: string;
  doctor_id?: string;
  status?: AppointmentStatus;
  search?: string;
}

export const APPOINTMENT_STATUS_LABELS: Record<
  AppointmentStatus,
  string
> = {
  programada: "Programada",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  completada: "Completada",
  no_show: "No Show",
};

export const APPOINTMENT_TYPE_LABELS: Record<
  AppointmentType,
  string
> = {
  consulta: "Consulta",
  revision: "Revisión",
  vacuna: "Vacuna",
  cirugia: "Cirugía",
};