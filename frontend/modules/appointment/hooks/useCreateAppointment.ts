"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api/appointment.api";
import { appointmentKeys } from "./appointment.query-keys";
import type {
  Appointment,
  CreateAppointmentPayload,
} from "../types/appointment.types";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<
    Appointment,
    Error,
    CreateAppointmentPayload
  >({
    mutationFn: createAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.all,
      });
    },
  });
}