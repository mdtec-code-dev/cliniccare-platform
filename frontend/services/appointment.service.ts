import api from '@/lib/axios';
import type { Appointment } from '@/types/appointment';

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>('/appointments/');
    return data;
  },
};
