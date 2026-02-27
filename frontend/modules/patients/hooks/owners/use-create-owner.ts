import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOwner } from "../../api/patients.api";
import { patientsKeys } from "../patients/patients.keys";
import type { CreateOwnerPayload } from "../../types";

export function useCreateOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOwnerPayload) => createOwner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.owners() });
    },
  });
}
