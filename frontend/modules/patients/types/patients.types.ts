export type Gender = "macho" | "hembra";

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  created_at: string;
}

export interface Species {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;

  name: string;
  breed?: string | null;

  birth_date?: string | null;
  gender: Gender;

  microchip?: string | null;
  weight?: string | null; // viene como "32.50" en tu API

  allergies: string[];
  chronic_conditions: string[];

  notes?: string | null;

  registration_date: string;
  last_visit?: string | null;

  created_at: string;

  owner: Owner;
  species: Species;
}
