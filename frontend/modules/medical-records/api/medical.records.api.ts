import api from "@/lib/api/api";

import type {
    MedicalRecord,
    CreateMedicalRecordPayload
} from '../types/medical-record.types'


export async function getMedicalRecordsByPatient(patientId: string): Promise<MedicalRecord> {
    const responde = await api.get<MedicalRecord>(`/medical-records/patient/${patientId}`)
    return responde.data
}


export async function getMedicalRecords(): Promise<MedicalRecord> {
    const response = await api.get("/medical-records/list/")
    return response.data
    
}

export async function createMedicalRecord(
  payload: CreateMedicalRecordPayload
): Promise<MedicalRecord> {
  const response = await api.post<MedicalRecord>(
    '/medical-records/',
    payload
  );
  return response.data;
}