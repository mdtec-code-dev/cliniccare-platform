import type { Patient, Owner, Species } from "./patients.types";

export interface PatientsResponse {
  patients: Patient[];
}

export interface OwnersResponse {
  owners: Owner[];
}

export interface SpeciesResponse {
  species: Species[];
}
