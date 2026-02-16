/** Estructura de la tabla patients_pet */
export interface Pet {
  id: number;
  owner_name: string;
  owner_phone: string;
  owner_email?: string;
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  birth_date?: string; // ISO Date
  weight?: number;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
