import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMedicalRecord } from "../api/medical.records.api";
import type { CreateMedicalRecordPayload,MedicalRecord } from "../types/medical-record.types";

export function useCreateMedicalRecord() {
  const queryClient = useQueryClient();

  return useMutation<MedicalRecord, Error, CreateMedicalRecordPayload>({
    mutationFn: createMedicalRecord,

    onSuccess: (newRecord) => {
      // 1️⃣ Invalidar listado global
      queryClient.invalidateQueries({
        queryKey: ['medical-records'],
      });

      // 2️⃣ Invalidar listado por paciente
      queryClient.invalidateQueries({
        queryKey: ['medical-records', newRecord.patient.id],
      });
    },
  });
}