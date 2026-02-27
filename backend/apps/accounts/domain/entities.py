from enum import Enum


class Roles(str, Enum):
    ADMIN = "ADMIN"
    DOCTOR = "DOCTOR"
    RECEPTIONIST = "RECEPTIONIST"


class PermissionCodes(str, Enum):
    # Patients
    READ_PATIENTS = "read.patients"
    CREATE_PATIENTS = "create.patients"
    UPDATE_PATIENTS = "update.patients"
    DELETE_PATIENTS = "delete.patients"

    READ_OWNERS = "read.owners"
    CREATE_OWNERS = "create.owners"
    UPDATE_OWNERS = "update.owners"
    DELETE_OWNERS = "delete.owners"

    READ_SPECIES = "read.species"
    CREATE_SPECIES = "create.species"
    UPDATE_SPECIES = "update.species"
    DELETE_SPECIES = "delete.species"

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

    # Users / Admin
    READ_USERS = "read.users"
    CREATE_USERS = "create.users"
    UPDATE_USERS = "update.users"
    UPDATE_ROLES = "update.roles"
    DELETE_USERS = "delete.users"
