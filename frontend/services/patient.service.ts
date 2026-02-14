import api from '@/lib/axios';
import type { Pet } from '@/types/patient';

export const patientService = {
  async getAll(): Promise<Pet[]> {
    const { data } = await api.get<Pet[]>('/patients/');
    return data;
  },
};
