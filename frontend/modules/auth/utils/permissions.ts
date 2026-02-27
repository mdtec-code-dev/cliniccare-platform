export const PERMISSIONS = {
  PATIENTS_READ: "read.patients",
  PATIENTS_CREATE: "create.patients",
  PATIENTS_UPDATE: "update.patients",
  PATIENTS_DELETE: "delete.patients",

  APPOINTMENTS_READ: "read.appointments",
  APPOINTMENTS_CREATE: "create.appointments",
  APPOINTMENTS_UPDATE: "update.appointments",
  APPOINTMENTS_DELETE: "delete.appointments",

  MEDICAL_RECORDS_READ: "read.medical_records",
  MEDICAL_RECORDS_CREATE: "create.medical_records",
  MEDICAL_RECORDS_UPDATE: "update.medical_records",
  MEDICAL_RECORDS_DELETE: "delete.medical_records",

  USERS_READ: "read.users",
  USERS_CREATE: "create.users",
  USERS_UPDATE: "update.users",
  USERS_DELETE: "delete.users",
  USERS_ROLE: "update.roles"
} as const;
