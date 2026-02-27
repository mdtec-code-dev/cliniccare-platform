import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../../api/patients.api";
import { patientsKeys } from "./patients.keys";
import type { UpdatePatientPayload } from "../../types";

export function useUpdatePatient(patientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePatientPayload) =>
      updatePatient(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.list() });
      queryClient.invalidateQueries({ queryKey: patientsKeys.detail(patientId) });
    },
  });
}
