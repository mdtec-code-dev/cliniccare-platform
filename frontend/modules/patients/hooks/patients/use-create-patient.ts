import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../../api/patients.api";
import { patientsKeys } from "./patients.keys";
import type { CreatePatientPayload } from "../../types";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => createPatient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.list() });
    },
  });
}
