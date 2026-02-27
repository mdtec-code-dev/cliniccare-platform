'use client';

import { useQuery } from '@tanstack/react-query';
import { getMedicalRecordsByPatient } from '../api/medical.records.api';

export function useMedicalRecordsByPatient(patientId: string) {
  return useQuery({
    queryKey: ['medical-records', patientId],
    queryFn: () => getMedicalRecordsByPatient(patientId),
    enabled: !!patientId,
    staleTime: 1000 * 60 * 2,
  });
}