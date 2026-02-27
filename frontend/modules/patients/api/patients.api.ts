import api from "@/lib/api/api";

import type {
  Patient,
  Owner,
  Species,
  PatientsResponse,
  OwnersResponse,
  SpeciesResponse,
  CreatePatientPayload,
  UpdatePatientPayload,
  CreateOwnerPayload,
  CreateSpeciesPayload,
} from "../types";

export async function createPatient(payload: CreatePatientPayload): Promise<Patient> {
  const res = await api.post<Patient>("/patients/", payload);
  return res.data;
}

export async function getPatients(): Promise<Patient[]> {
  const response = await api.get<Patient[]>("/patients/");
  return response.data ?? [];
}

export async function getPatientById(patientId: string): Promise<Patient> {
  const response = await api.get<Patient>(`/patients/${patientId}/`);
  return response.data;
}

export async function updatePatient(
  patientId: string,
  payload: UpdatePatientPayload
): Promise<Patient> {
  const response = await api.patch<Patient>(`/patients/${patientId}/`, payload);
  return response.data;
}

export async function deletePatient(patientId: string) {
  const response = await api.delete(`/patients/${patientId}/`);
  return response.data;
}

// =======================================================
// OWNERS
// =======================================================

export async function createOwner(payload: CreateOwnerPayload): Promise<Owner> {
  const res = await api.post<Owner>("/owners/", payload);
  return res.data;
}

export async function getOwners(): Promise<Owner[]> {
  const response = await api.get<Owner[]>("/owners/");
  return response.data ?? [];
}

export async function getOwnerById(ownerId: string): Promise<Owner> {
  const response = await api.get<Owner>(`/owners/${ownerId}/`);
  return response.data;
}

// =======================================================
// SPECIES
// =======================================================

export async function createSpecies(payload: CreateSpeciesPayload): Promise<Species> {
  const res = await api.post<Species>("/species/", payload);
  return res.data;
}

export async function getSpecies(): Promise<Species[]> {
  const response = await api.get<Species[]>("/species/");
  return response.data ?? [];
}

export async function getSpeciesById(speciesId: string): Promise<Species> {
  const response = await api.get<Species>(`/species/${speciesId}/`);
  return response.data;
}
