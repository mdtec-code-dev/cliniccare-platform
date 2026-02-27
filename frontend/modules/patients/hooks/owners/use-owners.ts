import { useQuery } from "@tanstack/react-query";
import { getOwners } from "../../api/patients.api";
import { patientsKeys } from "../patients/patients.keys";

export function useOwners() {
  return useQuery({
    queryKey: patientsKeys.owners(),
    queryFn: getOwners,
  });
}
