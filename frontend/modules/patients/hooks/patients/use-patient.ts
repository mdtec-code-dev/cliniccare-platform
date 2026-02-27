import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../../api/patients.api";
import { patientsKeys } from "./patients.keys";

export function usePatient(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.detail(patientId),
    queryFn: () => getPatientById(patientId),
    enabled: !!patientId,
  });
}
