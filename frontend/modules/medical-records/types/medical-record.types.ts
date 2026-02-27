// modules/medical-records/types/medical-record.types.ts

export type MedicalRecordType =
  | 'consulta'
  | 'vacuna'
  | 'cirugia'
  | 'desparasitacion'
  | string; // por si backend agrega más en el futuro

// ---------- Relaciones Reducidas ----------




export interface MedicalRecordPatient {
  id: string;
  name: string;
  birth_date: string
}

export interface MedicalRecordDoctor {
  id: number;
  username: string;
}

export interface MedicalRecordAppointment {
  id: string;
  start_time: string;
  status: string;
}

// ---------- Modelo Principal ----------

export interface MedicalRecord {
  id: number;

  patient: MedicalRecordPatient;
  doctor: MedicalRecordDoctor;
  appointment?: MedicalRecordAppointment | null;

  date: string;
  type: MedicalRecordType;

  diagnosis?: string | null;
  treatment?: string | null;

  medications: string[];

  observations?: string | null;
  follow_up_date?: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateMedicalRecordPayload {
  patient_id: string;
  appointment_id?: string | null;

  date: string;
  type: MedicalRecordType;

  diagnosis?: string | null;
  treatment?: string | null;

  medications: string[];

  observations?: string | null;
  follow_up_date?: string | null;
}