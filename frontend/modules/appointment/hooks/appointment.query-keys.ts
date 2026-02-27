
import type { AppointmentFilters } from "../types/appointment.types";

export const appointmentKeys = {
  all: ["appointments"] as const,

  lists: () =>
    [...appointmentKeys.all, "list"] as const,

  list: (filters: AppointmentFilters) =>
    [...appointmentKeys.lists(), filters] as const,

  detail: (id: string) =>
    [...appointmentKeys.all, "detail", id] as const,
};