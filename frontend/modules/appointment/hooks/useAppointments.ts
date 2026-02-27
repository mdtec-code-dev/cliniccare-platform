"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAppointments } from "../api/appointment.api";
import { appointmentKeys } from "./appointment.query-keys";
import type { AppointmentFilters } from "../types/appointment.types";

export function useAppointments(filters: AppointmentFilters) {
  return useQuery({
    queryKey: appointmentKeys.list(filters),
    queryFn: () => getAppointments(filters),
    placeholderData: keepPreviousData,
  });
}