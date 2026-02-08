# 🧾 Medical Records Module (ClinicCare)

Este documento describe el módulo **Medical Records** del backend ClinicCare.
Incluye endpoints disponibles, permisos RBAC requeridos, reglas de negocio y ejemplos de uso.

---

# 📌 Base URL

Todos los endpoints están bajo:

```
/api/medical-records/
```

---

# 🔐 Autenticación

Este módulo está protegido por autenticación JWT basada en cookies HttpOnly:

- `access_token`
- `refresh_token`

Para consumir los endpoints se requiere haber hecho login previamente:

```
POST /api/auth/login/
```

---

# 🧩 Modelo principal

## MedicalRecord (`medical_records_record`)

Representa un registro médico (historia clínica básica) asociado a un paciente.

Campos principales:

- `patient_id` (FK → patients_pet)
- `appointment_id` (FK → appointments_appointment, nullable)
- `doctor_id` (FK → accounts_user)
- `diagnosis`
- `treatment`
- `observations`
- `created_at`
- `updated_at`

---

# 🔑 Permisos RBAC requeridos

Los endpoints usan permisos basados en scopes.

| Acción                        | Permiso                  |
| ----------------------------- | ------------------------ |
| Listar historial por paciente | `read.medical_records`   |
| Crear registro médico         | `create.medical_records` |
| Editar registro médico        | `update.medical_records` |
| Eliminar registro médico      | `delete.medical_records` |

📌 En el MVP, normalmente solo se usa `read` y `create`.

---

# 👨‍⚕️ Doctor como autor (Regla)

El doctor **no se envía en el request body**.

El backend asigna automáticamente:

```
doctor_id = request.user.id
```

Esto evita manipulación por parte del cliente.

---

# 🔥 Reglas de negocio

## 1) patient_id obligatorio

Siempre debe enviarse `patient_id`.

---

## 2) patient debe existir y estar activo

No se permite crear registros médicos para pacientes inactivos.

---

## 3) appointment_id es opcional

Se permite crear registros médicos sin necesidad de turno.

---

## 4) Si appointment_id existe debe pertenecer al paciente

Si se envía `appointment_id`, el backend valida:

- que el appointment exista
- que el appointment pertenezca al mismo patient_id

Si no coincide, retorna error `400`.

---

# 📌 Endpoints disponibles

---

## ✅ Crear registro médico

### Request

**POST**

```
/api/medical-records/
```

### Permiso requerido

- `create.medical_records`

### Body ejemplo (sin appointment)

```json
{
  "patient_id": 1,
  "diagnosis": "Infección leve",
  "treatment": "Antibiótico por 7 días",
  "observations": "Paciente estable"
}
```

### Body ejemplo (con appointment)

```json
{
  "patient_id": 1,
  "appointment_id": 1,
  "diagnosis": "Chequeo general",
  "treatment": "Vitaminas",
  "observations": "Todo normal"
}
```

### Response (201)

```json
{
  "id": 1,
  "patient": 1,
  "appointment": 1,
  "doctor": 2,
  "diagnosis": "Chequeo general",
  "treatment": "Vitaminas",
  "observations": "Todo normal",
  "created_at": "2026-02-07T21:30:00Z",
  "updated_at": "2026-02-07T21:30:00Z"
}
```

---

## ✅ Listar historial médico por paciente

### Request

**GET**

```
/api/medical-records/patient/<patient_id>/
```

Ejemplo:

```
/api/medical-records/patient/1/
```

### Permiso requerido

- `read.medical_records`

### Response (200)

```json
[
  {
    "id": 2,
    "patient": 1,
    "appointment": null,
    "doctor": 2,
    "diagnosis": "Infección leve",
    "treatment": "Antibiótico por 7 días",
    "observations": "Paciente estable",
    "created_at": "2026-02-07T21:40:00Z",
    "updated_at": "2026-02-07T21:40:00Z"
  }
]
```

📌 Los registros se retornan ordenados por fecha descendente (más reciente primero).

---

# 🧪 Pruebas recomendadas (Postman)

1. Login:
   - `POST /api/auth/login/`

2. Crear registro:
   - `POST /api/medical-records/`

3. Listar historial:
   - `GET /api/medical-records/patient/<patient_id>/`

4. Validar appointment incorrecto:
   - enviar appointment_id que pertenezca a otro paciente (debe fallar con 400)

5. Validar RBAC:
   - login como RECEPTIONIST y probar crear registro (debe fallar con 403)

---

# 📌 Errores comunes

## 401 Unauthorized

Significa que no hay sesión válida (cookie access_token expirada o no enviada).

Solución:

- ejecutar refresh:
  - `POST /api/auth/refresh/`
- o volver a hacer login.

## 403 Forbidden

Significa que el usuario autenticado no tiene permisos RBAC suficientes.

Ejemplo:

- RECEPTIONIST intentando crear medical record.

## 400 Bad Request (Appointment mismatch)

Ejemplo:

```json
{
  "detail": "El appointment no pertenece al paciente enviado"
}
```

---

# 📌 Notas adicionales

- El módulo está diseñado bajo arquitectura estilo Clean:
  - `domain` contiene reglas y entidades
  - `application` contiene casos de uso
  - `infrastructure` implementa repositorios y modelos ORM
  - `interfaces` contiene views/serializers/urls DRF

- `appointment_id` es opcional para permitir registros médicos sin turno (casos manuales o emergencias).
