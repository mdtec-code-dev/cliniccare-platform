# 🐾 Patients Module (ClinicCare)

Este documento describe el módulo **Patients** del backend ClinicCare.
Incluye endpoints disponibles, permisos RBAC requeridos y ejemplos de uso.

---

# 📌 Base URL

Todos los endpoints están bajo:

```
/api/patients/
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

## Pet (`patients_pet`)

Representa un paciente (mascota) y la información básica del dueño.

Campos principales:

- `owner_name`
- `owner_phone`
- `owner_email`
- `name`
- `species`
- `breed`
- `gender`
- `birth_date`
- `weight`
- `notes`
- `is_active` (soft delete)
- `created_at`
- `updated_at`

---

# 🔑 Permisos RBAC requeridos

Los endpoints usan permisos basados en scopes.

| Acción                 | Permiso           |
| ---------------------- | ----------------- |
| Listar pacientes       | `read.patients`   |
| Ver detalle paciente   | `read.patients`   |
| Crear paciente         | `create.patients` |
| Editar paciente        | `update.patients` |
| Eliminar (soft delete) | `delete.patients` |

---

# 📌 Endpoints disponibles

---

## ✅ Listar pacientes

### Request

**GET**

```
/api/patients/
```

### Permiso requerido

- `read.patients`

### Response (200)

```json
[
  {
    "id": 1,
    "owner_name": "Carlos Perez",
    "owner_phone": "3009998888",
    "owner_email": "carlos@gmail.com",
    "name": "Max",
    "species": "DOG",
    "breed": "Pitbull",
    "gender": "MALE",
    "birth_date": "2021-06-15",
    "weight": "12.50",
    "notes": "Paciente nervioso",
    "is_active": true,
    "created_at": "2026-02-07T20:10:00Z",
    "updated_at": "2026-02-07T20:10:00Z"
  }
]
```

---

## ✅ Crear paciente

### Request

**POST**

```
/api/patients/
```

### Permiso requerido

- `create.patients`

### Body ejemplo

```json
{
  "owner_name": "Carlos Perez",
  "owner_phone": "3009998888",
  "owner_email": "carlos@gmail.com",
  "name": "Max",
  "species": "DOG",
  "breed": "Pitbull",
  "gender": "MALE",
  "birth_date": "2021-06-15",
  "weight": 12.5,
  "notes": "Paciente nervioso"
}
```

### Response (201)

```json
{
  "id": 1,
  "owner_name": "Carlos Perez",
  "owner_phone": "3009998888",
  "owner_email": "carlos@gmail.com",
  "name": "Max",
  "species": "DOG",
  "breed": "Pitbull",
  "gender": "MALE",
  "birth_date": "2021-06-15",
  "weight": "12.50",
  "notes": "Paciente nervioso",
  "is_active": true,
  "created_at": "2026-02-07T20:10:00Z",
  "updated_at": "2026-02-07T20:10:00Z"
}
```

---

## ✅ Obtener detalle de paciente

### Request

**GET**

```
/api/patients/<id>/
```

Ejemplo:

```
/api/patients/1/
```

### Permiso requerido

- `read.patients`

### Response (200)

```json
{
  "id": 1,
  "owner_name": "Carlos Perez",
  "owner_phone": "3009998888",
  "owner_email": "carlos@gmail.com",
  "name": "Max",
  "species": "DOG",
  "breed": "Pitbull",
  "gender": "MALE",
  "birth_date": "2021-06-15",
  "weight": "12.50",
  "notes": "Paciente nervioso",
  "is_active": true,
  "created_at": "2026-02-07T20:10:00Z",
  "updated_at": "2026-02-07T20:10:00Z"
}
```

---

## ✅ Actualizar paciente (PUT)

### Request

**PUT**

```
/api/patients/<id>/
```

### Permiso requerido

- `update.patients`

### Body ejemplo (completo)

```json
{
  "owner_name": "Carlos Perez",
  "owner_phone": "3009998888",
  "owner_email": "carlos@gmail.com",
  "name": "Max",
  "species": "DOG",
  "breed": "Golden Retriever",
  "gender": "MALE",
  "birth_date": "2021-06-15",
  "weight": 13.2,
  "notes": "Actualizado",
  "is_active": true
}
```

### Response (200)

Devuelve el objeto actualizado.

---

## ✅ Actualizar paciente (PATCH)

### Request

**PATCH**

```
/api/patients/<id>/
```

### Permiso requerido

- `update.patients`

### Body ejemplo (parcial)

```json
{
  "weight": 14.0,
  "notes": "Subió de peso"
}
```

### Response (200)

Devuelve el objeto actualizado.

---

## ✅ Eliminar paciente (Soft Delete)

Este endpoint no elimina el registro físicamente, solo cambia:

```
is_active = False
```

### Request

**DELETE**

```
/api/patients/<id>/
```

### Permiso requerido

- `delete.patients`

### Response (200)

```json
{
  "message": "Paciente desactivado"
}
```

---

# ⚠️ Notas importantes

## Soft Delete

Los pacientes desactivados (`is_active=False`) no se muestran en listados ni en detalle.

## Validación

Actualmente el módulo no valida duplicados por teléfono/mascota.
Se recomienda implementar validaciones adicionales en una fase posterior.

---

# 🧪 Pruebas recomendadas (Postman)

1. Login:
   - `POST /api/auth/login/`

2. Crear paciente:
   - `POST /api/patients/`

3. Listar:
   - `GET /api/patients/`

4. Detalle:
   - `GET /api/patients/<id>/`

5. Editar:
   - `PATCH /api/patients/<id>/`

6. Desactivar:
   - `DELETE /api/patients/<id>/`

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

- Usuario con rol DOCTOR intentando crear paciente.
