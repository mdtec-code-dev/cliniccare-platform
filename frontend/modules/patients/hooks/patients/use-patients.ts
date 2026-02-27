import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../api/patients.api";
import { patientsKeys } from "./patients.keys";

export function usePatients() {
  return useQuery({
    queryKey: patientsKeys.list(),
    queryFn: getPatients,
  });
}
