import type { Gender } from "./patients.types";

export interface CreatePatientPayload {
  owner_id: string;
  species_id: string;

  name: string;
  breed?: string;

  birth_date?: string;
  gender: 'macho';

  microchip?: string;
  weight?: string | number;

  allergies?: string[];
  chronic_conditions?: string[];

  notes?: string;
}

export interface UpdatePatientPayload {
  owner_id?: string;
  species_id?: string;

  name?: string;
  breed?: string;

  birth_date?: string;
  gender?: Gender;

  microchip?: string;
  weight?: string | number;

  allergies?: string[];
  chronic_conditions?: string[];

  notes?: string;

  last_visit?: string;
}

export interface CreateOwnerPayload {
  name: string;
  email: string;
  phone: string;
  address?: string | null;
}

export interface CreateSpeciesPayload {
  name: string;
  slug: string;
}
