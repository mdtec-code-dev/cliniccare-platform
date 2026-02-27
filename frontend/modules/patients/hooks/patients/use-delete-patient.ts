import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "../../api/patients.api";
import { patientsKeys } from "./patients.keys";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patientId: string) => deletePatient(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.list() });
    },
  });
}
