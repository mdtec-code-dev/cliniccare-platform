# 📜 OpenAPI Contract (v1)

Este documento define el **contrato inicial de la API** del proyecto **CLINICARE**.

La API sigue un enfoque **API-First**, donde este contrato es la **fuente de verdad** para el desarrollo frontend y backend.

---

## 🧠 Principios del contrato

- La API es **RESTful**
- Todas las respuestas son **JSON**
- Autenticación mediante **JWT**
- Versionado explícito desde el inicio
- Errores consistentes
- Permisos validados en backend

---

## 🔌 Base URL

```
/api/v1
```

---

## 🔐 Autenticación

### POST `/auth/login`

Autentica un usuario y devuelve tokens JWT.

**Request**

```json
{
  "email": "user@clinicare.com",
  "password": "********"
}
```

**Response 200**

```json
{
  "access": "jwt-access-token",
  "refresh": "jwt-refresh-token"
}
```

**Errores**

- `401 Unauthorized` – Credenciales inválidas
- `429 Too Many Requests` – Demasiados intentos

---

### POST `/auth/refresh`

Renueva el access token.

**Request**

```json
{
  "refresh": "jwt-refresh-token"
}
```

**Response 200**

```json
{
  "access": "new-access-token"
}
```

---

### POST `/auth/logout`

Invalida el refresh token.

**Response**

```
204 No Content
```

---

## 👤 Usuarios

### GET `/users/me`

Obtiene el usuario autenticado.

**Response 200**

```json
{
  "id": 1,
  "email": "doctor@clinicare.com",
  "role": "DOCTOR"
}
```

---

## 👥 Pacientes

### GET `/patients`

Lista pacientes.

**Query params**

- `search`
- `page`
- `page_size`

**Response 200**

```json
{
  "results": [
    {
      "id": 10,
      "first_name": "Juan",
      "last_name": "Perez",
      "document": "12345678"
    }
  ]
}
```

---

### POST `/patients`

Crea un paciente.

**Request**

```json
{
  "first_name": "Juan",
  "last_name": "Perez",
  "document": "12345678",
  "birth_date": "1990-01-01"
}
```

**Response 201**

```json
{
  "id": 10
}
```

---

### GET `/patients/{id}`

Obtiene detalle del paciente.

---

## 📅 Turnos

### POST `/appointments`

Crea un turno médico.

**Request**

```json
{
  "patient_id": 10,
  "doctor_id": 3,
  "date": "2026-03-10",
  "time": "10:30"
}
```

**Response 201**

```json
{
  "id": 20,
  "status": "SCHEDULED"
}
```

**Errores**

- `400 Bad Request` – Solapamiento
- `403 Forbidden` – Sin permisos

---

### GET `/appointments`

Lista turnos.

**Query params**

- `doctor_id`
- `date`
- `status`

---

### PATCH `/appointments/{id}/cancel`

Cancela un turno.

**Response 200**

```json
{
  "status": "CANCELLED"
}
```

---

## 🧾 Historia Clínica

### GET `/patients/{id}/records`

Obtiene historia clínica del paciente.

---

### POST `/patients/{id}/records`

Crea un registro médico.

**Request**

```json
{
  "notes": "Paciente con síntomas leves",
  "diagnosis": "Resfriado común"
}
```

**Response 201**

```json
{
  "id": 45
}
```

---

## 🔐 Permisos (resumen)

| Endpoint        | Roles permitidos            |
| --------------- | --------------------------- |
| `/patients`     | ADMIN, DOCTOR               |
| `/appointments` | ADMIN, DOCTOR, RECEPTIONIST |
| `/records`      | DOCTOR                      |
| `/users/me`     | Todos                       |

📌 **Los permisos se validan siempre en backend.**

---

## ⚠️ Errores estándar

Formato común de error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data"
  }
}
```

---

## 📌 Convenciones

- `snake_case` en JSON
- ISO 8601 para fechas
- Paginación estándar
- IDs numéricos

---

## 🔄 Evolución del contrato

- Cambios incompatibles → nueva versión (`/api/v2`)
- Cambios compatibles → misma versión
- Toda modificación se documenta

---

## 📄 Estado del contrato

**🟡 Draft** – válido para MVP

Este contrato puede evolucionar durante el desarrollo del MVP, respetando versionado y compatibilidad.
