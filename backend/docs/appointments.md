# 📅 Appointments Module (ClinicCare)

Este documento describe el módulo **Appointments** del backend ClinicCare.
Incluye endpoints disponibles, permisos RBAC requeridos, reglas de negocio y ejemplos de uso.

---

# 📌 Base URL

Todos los endpoints están bajo:

```
/api/appointments/
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

## Appointment (`appointments_appointment`)

Representa un turno médico para un paciente (mascota).

Campos principales:

- `patient_id` (FK → patients_pet)
- `doctor_id` (FK → accounts_user, nullable)
- `created_by_id` (FK → accounts_user)
- `start_time`
- `end_time`
- `status`
- `reason`
- `notes`
- `created_at`
- `updated_at`

---

# 👨‍⚕️ Doctor Nullable (Decisión de diseño)

En el MVP, el campo `doctor_id` es **opcional (NULL)**.

Esto permite que la recepcionista cree un turno sin necesidad de asignar doctor en el momento.
Luego, el doctor puede asignarse mediante un endpoint específico.

---

# 🔑 Permisos RBAC requeridos

Los endpoints usan permisos basados en scopes.

| Acción            | Permiso               |
| ----------------- | --------------------- |
| Listar turnos     | `read.appointments`   |
| Ver detalle turno | `read.appointments`   |
| Crear turno       | `create.appointments` |
| Asignar doctor    | `update.appointments` |
| Cambiar estado    | `update.appointments` |

---

# 📌 Estados disponibles

Los turnos soportan los siguientes estados:

- `SCHEDULED`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`
- `NO_SHOW`

---

# 🔥 Reglas de negocio

## 1) Validación de rango horario

Un turno es válido solo si:

```
end_time > start_time
```

Si no se cumple, se retorna error `400`.

---

## 2) Validación de solapamientos (Overlapping)

Si un turno tiene doctor asignado, no se permite solapamiento con otros turnos del mismo doctor.

Se considera solapamiento cuando:

```
(new_start < existing_end) AND (new_end > existing_start)
```

No se valida solapamiento con turnos en estado `CANCELLED`.

---

## 3) Transiciones válidas de estado

Transiciones permitidas:

- `SCHEDULED` → `CONFIRMED`, `CANCELLED`
- `CONFIRMED` → `COMPLETED`, `CANCELLED`, `NO_SHOW`
- `COMPLETED` → ❌ ninguna
- `CANCELLED` → ❌ ninguna
- `NO_SHOW` → ❌ ninguna

---

# 📌 Endpoints disponibles

---

## ✅ Listar turnos

### Request

**GET**

```
/api/appointments/
```

### Permiso requerido

- `read.appointments`

### Response (200)

```json
[
  {
    "id": 1,
    "patient": 1,
    "doctor": null,
    "created_by": 1,
    "start_time": "2026-02-08T10:00:00-05:00",
    "end_time": "2026-02-08T10:30:00-05:00",
    "status": "SCHEDULED",
    "reason": "Vacunación",
    "notes": "Primera cita",
    "created_at": "2026-02-07T21:00:00Z",
    "updated_at": "2026-02-07T21:00:00Z"
  }
]
```

---

## ✅ Crear turno

### Request

**POST**

```
/api/appointments/
```

### Permiso requerido

- `create.appointments`

### Body ejemplo (sin doctor)

```json
{
  "patient_id": 1,
  "start_time": "2026-02-08T10:00:00-05:00",
  "end_time": "2026-02-08T10:30:00-05:00",
  "reason": "Vacunación",
  "notes": "Primera cita"
}
```

### Body ejemplo (con doctor)

```json
{
  "patient_id": 1,
  "doctor_id": 2,
  "start_time": "2026-02-08T10:00:00-05:00",
  "end_time": "2026-02-08T10:30:00-05:00",
  "reason": "Chequeo",
  "notes": "Cita asignada"
}
```

### Response (201)

Devuelve el objeto creado.

---

## ✅ Obtener detalle de turno

### Request

**GET**

```
/api/appointments/<id>/
```

Ejemplo:

```
/api/appointments/1/
```

### Permiso requerido

- `read.appointments`

### Response (200)

Devuelve el turno correspondiente.

---

## ✅ Asignar doctor a un turno

### Request

**PATCH**

```
/api/appointments/<id>/assign-doctor/
```

Ejemplo:

```
/api/appointments/1/assign-doctor/
```

### Permiso requerido

- `update.appointments`

### Body ejemplo

```json
{
  "doctor_id": 2
}
```

### Response (200)

Devuelve el turno actualizado con doctor asignado.

---

## ✅ Cambiar estado del turno

### Request

**PATCH**

```
/api/appointments/<id>/change-status/
```

Ejemplo:

```
/api/appointments/1/change-status/
```

### Permiso requerido

- `update.appointments`

### Body ejemplo

```json
{
  "status": "CONFIRMED"
}
```

### Response (200)

Devuelve el turno actualizado con el nuevo estado.

---

# 🧪 Pruebas recomendadas (Postman)

1. Login:
   - `POST /api/auth/login/`

2. Crear turno sin doctor:
   - `POST /api/appointments/`

3. Listar:
   - `GET /api/appointments/`

4. Asignar doctor:
   - `PATCH /api/appointments/<id>/assign-doctor/`

5. Probar overlap:
   - crear otro turno con mismo doctor y rango solapado (debe fallar)

6. Cambiar estado:
   - `PATCH /api/appointments/<id>/change-status/`

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

- Usuario con rol RECEPTIONIST intentando cancelar un turno si no tiene permiso update.

## 400 Bad Request (Overlapping)

Ejemplo:

```json
{
  "detail": "El doctor ya tiene un turno asignado en ese rango de tiempo"
}
```

---

# 📌 Notas adicionales

- El módulo está diseñado bajo arquitectura estilo Clean:
  - `domain` contiene reglas y entidades
  - `application` contiene casos de uso
  - `infrastructure` implementa repositorios y modelos ORM
  - `interfaces` contiene views/serializers/urls DRF

- La validación de solapamientos se ejecuta:
  - al crear un turno con doctor asignado
  - al asignar doctor posteriormente
