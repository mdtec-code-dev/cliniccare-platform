// features/appointments/api/appointment.api.ts

import api from "@/lib/api/api";
import type {
  Appointment,
  AppointmentFilters,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types/appointment.types";
import { cleanFilters } from "../utils/appointment.utils";

export async function getAppointments(
  filters: AppointmentFilters
): Promise<Appointment[]> {
  const cleaned = cleanFilters(filters);

  const { data } = await api.get("/appointments/", {
    params: cleaned,
  });

  return data;
}

export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<Appointment> {
  const { data } = await api.post(
    "/appointments/",
    payload
  );

  return data;
}

export async function updateAppointment(
  id: string,
  payload: UpdateAppointmentPayload
): Promise<Appointment> {
  const { data } = await api.patch(
    `/appointments/${id}/`,
    payload
  );

  return data;
}

export async function deleteAppointment(
  id: string
): Promise<void> {
  await api.delete(`/appointments/${id}/`);
}