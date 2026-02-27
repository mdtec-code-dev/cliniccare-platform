// hooks/use-appointments-week.ts

"use client";

import { useMemo } from "react";
import { useAppointments } from "./useAppointments";
import { getWeekRange } from "../utils/date.utils";
import type { AppointmentStatus } from "../types/appointment.types";

interface UseAppointmentsWeekParams {
  date: Date;
  doctor: string | "all";
  status: AppointmentStatus | "all";
}

export function useAppointmentsWeek({
  date,
  doctor,
  status,
}: UseAppointmentsWeekParams) {

  const { start_date, end_date } = useMemo(
    () => getWeekRange(date),
    [date]
  );

  return useAppointments({
    start_date,
    end_date,
    doctor_id: doctor !== "all" ? doctor : undefined,
    status: status !== "all" ? status : undefined,
  });
}