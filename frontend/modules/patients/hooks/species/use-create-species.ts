import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecies } from "../../api/patients.api";
import { patientsKeys } from "../patients/patients.keys";
import type { CreateSpeciesPayload } from "../../types";

export function useCreateSpecies() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSpeciesPayload) => createSpecies(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.species() });
    },
  });
}
