import { useQuery } from "@tanstack/react-query";
import { getSpecies } from "../../api/patients.api";
import { patientsKeys } from "../patients/patients.keys";

export function useSpecies() {
  return useQuery({
    queryKey: patientsKeys.species(),
    queryFn: getSpecies,
  });
}
