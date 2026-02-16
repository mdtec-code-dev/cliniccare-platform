'use client';

import { useState, useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { appointmentService } from '@/services/appointment.service';
import { patientService } from '@/services/patient.service';
import type { AppointmentSummary } from '@/types/appointment';
import type { ApiError } from '@/types/auth';

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [stats, setStats] = useState({
    appointmentsToday: 0,
    pendingReports: 0,
    activePatients: 0,
    monthlyRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    status?: number;
  } | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [aptData, patientData] = await Promise.all([
        appointmentService.getAll(),
        patientService.getAll(),
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todayAppointmentsCount = aptData.filter(
        apt => new Date(apt.start_time).toISOString().split('T')[0] === today
      ).length;

      const activePatientsCount = patientData.filter(p => p.is_active).length;

      const mapped = aptData.map(apt => {
        const patientId = apt.patient;
        const patient = patientData.find(p => p.id === patientId);

        const date = new Date(apt.start_time);
        const time = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return {
          id: apt.id,
          time,
          patient: {
            id: patient?.id ?? 0,
            idNum: `#${patient?.species?.slice(0, 3).toUpperCase() ?? 'PET'}-${patient?.id ?? '0000'}`,
            name: patient?.name ?? 'Unknown',
            species: patient?.species ?? 'N/A',
            breed: patient?.breed ?? 'N/A',
          },
          reason: apt.reason || 'Consultation',
          status: apt.status,
        };
      });

      setAppointments(mapped);
      setStats({
        appointmentsToday: todayAppointmentsCount,
        pendingReports: 0, // Mocked for now
        activePatients: activePatientsCount,
        monthlyRevenue: 0, // Mocked for now
      });
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError({
        message:
          axiosError.response?.data?.detail ??
          'Error connecting to the server.',
        status: axiosError.response?.status,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return { appointments, stats, isLoading, error, refetch: fetchAppointments };
}
