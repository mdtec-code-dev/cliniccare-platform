class Roles:
    ADMIN = "ADMIN"
    DOCTOR = "DOCTOR"
    RECEPTIONIST = "RECEPTIONIST"


class PermissionCodes:
    # Patients
    READ_PATIENTS = "read.patients"
    CREATE_PATIENTS = "create.patients"
    UPDATE_PATIENTS = "update.patients"
    DELETE_PATIENTS = "delete.patients"

    # Appointments
    READ_APPOINTMENTS = "read.appointments"
    CREATE_APPOINTMENTS = "create.appointments"
    UPDATE_APPOINTMENTS = "update.appointments"
    DELETE_APPOINTMENTS = "delete.appointments"

    # Medical Records
    READ_MEDICAL_RECORDS = "read.medical_records"
    CREATE_MEDICAL_RECORDS = "create.medical_records"
    UPDATE_MEDICAL_RECORDS = "update.medical_records"
    DELETE_MEDICAL_RECORDS = "delete.medical_records"

    # Admin management
    READ_USERS = "read.users"
    CREATE_USERS = "create.users"
    UPDATE_USERS = "update.users"
    DELETE_USERS = "delete.users"
