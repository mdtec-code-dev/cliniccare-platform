# 📌 ClinicCare MVP - Database Schema (RBAC + Patients + Appointments + Medical Records)

Este documento define el esquema de base de datos recomendado para el MVP de ClinicCare, incluyendo autenticación RBAC con roles (`ADMIN`, `DOCTOR`, `RECEPTIONIST`) y módulos principales:

- Gestión de pacientes
- Turnos médicos
- Historia clínica básica

---

# 🔐 AUTH / RBAC (Accounts)

## Table: `accounts_user`

| Field        | Type         | Constraints   |
| ------------ | ------------ | ------------- |
| id           | bigint       | PK            |
| username     | varchar(150) | UNIQUE        |
| email        | varchar(254) | UNIQUE, NULL  |
| password     | varchar      | NOT NULL      |
| first_name   | varchar(150) | NULL          |
| last_name    | varchar(150) | NULL          |
| is_active    | bool         | default true  |
| is_staff     | bool         | default false |
| is_superuser | bool         | default false |
| last_login   | datetime     | NULL          |
| date_joined  | datetime     | NOT NULL      |

---

## Table: `accounts_role`

| Field | Type        | Constraints |
| ----- | ----------- | ----------- |
| id    | bigint      | PK          |
| name  | varchar(50) | UNIQUE      |

### Values

- `ADMIN`
- `DOCTOR`
- `RECEPTIONIST`

---

## Table: `accounts_permission`

| Field | Type         | Constraints |
| ----- | ------------ | ----------- |
| id    | bigint       | PK          |
| code  | varchar(100) | UNIQUE      |

### Example values

- `read.patients`
- `create.patients`
- `update.patients`
- `read.appointments`
- `create.appointments`
- `update.appointments`
- `read.medical_records`
- `create.medical_records`
- `update.medical_records`

---

## Table: `accounts_userrole`

| Field   | Type   | Constraints           |
| ------- | ------ | --------------------- |
| id      | bigint | PK                    |
| user_id | bigint | FK → accounts_user.id |
| role_id | bigint | FK → accounts_role.id |

### Constraints

- UNIQUE(user_id, role_id)

---

## Table: `accounts_rolepermission`

| Field         | Type   | Constraints                 |
| ------------- | ------ | --------------------------- |
| id            | bigint | PK                          |
| role_id       | bigint | FK → accounts_role.id       |
| permission_id | bigint | FK → accounts_permission.id |

### Constraints

- UNIQUE(role_id, permission_id)

---

# 👤 PATIENTS (Gestión de pacientes)

## Table: `patients_pet`

| Field       | Type         | Constraints  |
| ----------- | ------------ | ------------ |
| id          | bigint       | PK           |
| owner_name  | varchar(150) | NOT NULL     |
| owner_phone | varchar(50)  | NOT NULL     |
| owner_email | varchar(254) | NULL         |
| name        | varchar(100) | NOT NULL     |
| species     | varchar(20)  | NOT NULL     |
| breed       | varchar(100) | NULL         |
| gender      | varchar(20)  | NULL         |
| birth_date  | date         | NULL         |
| weight      | decimal(6,2) | NULL         |
| notes       | text         | NULL         |
| is_active   | bool         | default true |
| created_at  | datetime     | auto         |
| updated_at  | datetime     | auto         |

### Notes

Para MVP se mantiene el dueño como campos directos (`owner_name`, `owner_phone`).
En una fase 2 se puede normalizar creando tabla `clients_owner`.

---

# 📅 APPOINTMENTS (Turnos médicos)

## Table: `appointments_appointment`

| Field         | Type        | Constraints                 |
| ------------- | ----------- | --------------------------- |
| id            | bigint      | PK                          |
| patient_id    | bigint      | FK → patients_pet.id        |
| doctor_id     | bigint      | FK → accounts_user.id, NULL |
| created_by_id | bigint      | FK → accounts_user.id       |
| start_time    | datetime    | NOT NULL                    |
| end_time      | datetime    | NOT NULL                    |
| status        | varchar(30) | NOT NULL                    |
| reason        | text        | NULL                        |
| notes         | text        | NULL                        |
| created_at    | datetime    | auto                        |
| updated_at    | datetime    | auto                        |

### Appointment Status Values

- `SCHEDULED`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`
- `NO_SHOW`

---

## Overlapping Validation (Doctor)

No se permiten turnos solapados para el mismo doctor:

Un turno se considera solapado si: (new_start < existing_end) AND (new_end > existing_start)

---

# 🧾 MEDICAL RECORDS (Historia clínica básica)

## Table: `medical_records_record`

| Field          | Type     | Constraints                            |
| -------------- | -------- | -------------------------------------- |
| id             | bigint   | PK                                     |
| patient_id     | bigint   | FK → patients_pet.id                   |
| appointment_id | bigint   | FK → appointments_appointment.id, NULL |
| doctor_id      | bigint   | FK → accounts_user.id                  |
| diagnosis      | text     | NULL                                   |
| treatment      | text     | NULL                                   |
| observations   | text     | NULL                                   |
| created_at     | datetime | auto                                   |
| updated_at     | datetime | auto                                   |

### Notes

- `appointment_id` es opcional, para permitir registros médicos sin turno.
- El doctor siempre debe quedar registrado como autor del registro.

---

# 🔐 Permissions (MVP)

## Patients

- `read.patients`
- `create.patients`
- `update.patients`
- `delete.patients` _(opcional / recomendado no usar en MVP)_

## Appointments

- `read.appointments`
- `create.appointments`
- `update.appointments`
- `delete.appointments` _(opcional / recomendado no usar en MVP)_

## Medical Records

- `read.medical_records`
- `create.medical_records`
- `update.medical_records`
- `delete.medical_records` _(no recomendado en MVP)_

---

# 👥 Role Permission Mapping (Recomendado)

## Role: ADMIN

**Patients**

- read / create / update / delete

**Appointments**

- read / create / update / delete

**Medical Records**

- read / create / update / delete

---

## Role: DOCTOR

**Patients**

- `read.patients`
- `update.patients` _(opcional según reglas del negocio)_

**Appointments**

- `read.appointments`
- `update.appointments`

**Medical Records**

- `read.medical_records`
- `create.medical_records`
- `update.medical_records`

---

## Role: RECEPTIONIST

**Patients**

- `read.patients`
- `create.patients`
- `update.patients`

**Appointments**

- `read.appointments`
- `create.appointments`
- `update.appointments`

**Medical Records**

- ❌ Sin acceso

---

# 🔗 Key Relationships (Resumen)

- `accounts_user` ↔ `accounts_role` (N:M via `accounts_userrole`)
- `accounts_role` ↔ `accounts_permission` (N:M via `accounts_rolepermission`)
- `patients_pet` → `appointments_appointment` (1:N)
- `accounts_user` (doctor) → `appointments_appointment` (1:N)
- `patients_pet` → `medical_records_record` (1:N)
- `appointments_appointment` → `medical_records_record` (1:0..1)

---
