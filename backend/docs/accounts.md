# 📦 Accounts Module — Autenticación, Roles y Permisos (RBAC)

## 🎯 Propósito

El módulo **accounts** es responsable de:

- Registro de usuarios
- Autenticación (login, logout, refresh)
- Gestión de sesión mediante **JWT en cookies httpOnly**
- Control de acceso basado en roles y permisos (RBAC)
- Exposición de endpoints para que frontend consuma roles, permisos y usuarios del sistema

Este módulo sigue una **arquitectura por capas** (inspirada en Clean Architecture):

```txt
domain         → reglas de negocio puras (roles, permisos)
application    → casos de uso
interfaces     → API (views, serializers)
infrastructure → ORM, JWT, repositorios
common         → utilidades compartidas (cookies)
```

---

## 🧱 Modelo de datos

### User

Extiende `AbstractUser` de Django.

| Campo    | Tipo   | Descripción            |
| -------- | ------ | ---------------------- |
| id       | int    | Identificador          |
| username | string | Login principal        |
| email    | string | Email único (opcional) |
| password | hash   | Gestionado por Django  |

---

### Role

Representa un rol del sistema.

| Campo | Tipo   | Descripción                                        |
| ----- | ------ | -------------------------------------------------- |
| id    | int    | Identificador                                      |
| name  | string | Nombre del rol (`ADMIN`, `DOCTOR`, `RECEPTIONIST`) |

---

### Permission

Permiso atómico reutilizable.

| Campo | Tipo   | Ejemplo         |
| ----- | ------ | --------------- |
| code  | string | `read.patients` |

---

### Relaciones (RBAC)

- **User ↔ Role** → `UserRole`
- **Role ↔ Permission** → `RolePermission`

Un usuario puede tener múltiples roles.  
Un rol puede tener múltiples permisos.

---

## 🧠 Domain (Entities)

### Roles

```python
ADMIN
DOCTOR
RECEPTIONIST
```

---

### PermissionCodes

Los permisos siguen una estructura estándar CRUD por dominio:

- `read.patients`
- `create.patients`
- `update.patients`
- `delete.patients`

- `read.appointments`
- `create.appointments`
- `update.appointments`
- `delete.appointments`

- `read.medical_records`
- `create.medical_records`
- `update.medical_records`
- `delete.medical_records`

- `read.users`
- `create.users`
- `update.users`
- `delete.users`

- `read.roles`
- `update.roles`

Estos valores son la **fuente de verdad** del sistema RBAC.

---

## 🔐 Autenticación

### Mecanismo

- JWT (`access` + `refresh`)
- Tokens guardados en **cookies httpOnly**
- No se expone token al frontend (JS)

### Cookies

| Cookie          | Propósito                   | TTL                  |
| --------------- | --------------------------- | -------------------- |
| `access_token`  | Token de acceso             | 15 min (recomendado) |
| `refresh_token` | Token para refrescar access | 7 días               |

> El refresh renueva únicamente el access token.

---

## 🔄 Casos de uso (Application Layer)

### RegisterUseCase

Responsable de crear usuarios:

- Crea un usuario
- Hashea password usando `set_password`
- Usa repositorio (`DjangoAuthRepository`)

---

### LoginUseCase

Responsable del login:

- Autentica usando `authenticate()` (Django auth backend)
- Genera tokens con `JwtService.create_tokens_for_user(user)`
- Retorna usuario + tokens

---

### AssignRoleUseCase

Responsable de asignar roles:

- Busca usuario por id
- Busca rol por nombre
- Crea relación `UserRole` evitando duplicados

---

## 🌐 Endpoints (API)

## 🔓 Auth

### `POST /accounts/register/`

Crea un usuario.

**Body**

```json
{
  "username": "juan",
  "email": "juan@mail.com",
  "password": "secret"
}
```

**Responses**

- `201 Created`
- `400 Bad Request` si username/email ya existe

---

### `POST /accounts/login/`

Autentica usuario y setea cookies JWT.

**Body**

```json
{
  "username": "juan",
  "password": "secret"
}
```

**Response**

- `200 OK` login exitoso
- `401 Unauthorized` credenciales inválidas

---

### `POST /accounts/refresh/`

Renueva access token usando cookie `refresh_token`.

**Response**

- `200 OK` token actualizado
- `401 Unauthorized` refresh inválido/expirado o cookie ausente

---

### `POST /accounts/logout/`

Elimina cookies de sesión.

**Response**

- `200 OK`

---

## 👤 Usuario autenticado

### `GET /accounts/me/`

Devuelve información del usuario autenticado, sus roles y permisos efectivos (RBAC custom).

**Response**

```json
{
  "id": 1,
  "username": "juan",
  "email": "juan@mail.com",
  "roles": ["ADMIN"],
  "permissions": ["read.users", "update.roles", "read.patients"]
}
```

---

### `GET /accounts/me/roles/`

Lista los roles asignados al usuario autenticado.

**Response**

```json
{
  "user_id": 1,
  "username": "juan",
  "roles": ["ADMIN", "DOCTOR"]
}
```

---

## 🛡️ Roles y permisos

### `GET /accounts/roles/`

Lista todos los roles disponibles (para dropdowns del frontend).

**Response**

```json
{
  "roles": [
    { "id": 1, "name": "ADMIN" },
    { "id": 2, "name": "DOCTOR" },
    { "id": 3, "name": "RECEPTIONIST" }
  ]
}
```

---

### `POST /accounts/assign-role/`

Asigna un rol a un usuario.

🔒 **Requiere permiso:** `update.roles`

**Body**

```json
{
  "user_id": 5,
  "role": "DOCTOR"
}
```

**Response**

```json
{
  "user_id": 5,
  "username": "maria",
  "role": "DOCTOR",
  "assigned": true
}
```

---

## 👥 Administración de Usuarios (Admin Section)

### `GET /accounts/users/`

Lista todos los usuarios del sistema.

🔒 **Requiere permiso:** `read.users`

**Response**

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@mail.com",
      "is_active": true
    },
    {
      "id": 2,
      "username": "maria",
      "email": "maria@mail.com",
      "is_active": true
    }
  ]
}
```

---

### `GET /accounts/users/<id>/`

Devuelve un usuario específico.

🔒 **Requiere permiso:** `read.users`

**Response**

```json
{
  "id": 2,
  "username": "maria",
  "email": "maria@mail.com",
  "is_active": true
}
```

**Responses**

- `200 OK`
- `404 Not Found` si el usuario no existe

---

## 🔐 Seguridad y Autorización

- Cookies `httpOnly` (mitiga robo de token vía XSS)
- JWT access/refresh con refresh endpoint
- Roles asignados vía DB (`UserRole`)
- Permisos asignados vía DB (`RolePermission`)
- Autorización implementada mediante permission class genérica `HasPermission`

### Permission Class (`HasPermission`)

Cada endpoint protegido define:

```python
permission_classes = [IsAuthenticated, HasPermission]
required_permission = "read.users"
```

Esto evita crear clases específicas por cada permiso.

---

## 🌱 Seed inicial

Existe un comando de Django para poblar roles y permisos iniciales.

Ejecutar:

```bash
python manage.py seed_all
```

Este comando:

- Crea roles
- Crea permisos
- Asigna permisos iniciales a roles
