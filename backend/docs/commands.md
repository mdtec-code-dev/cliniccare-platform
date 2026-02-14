# Management Commands (Accounts / RBAC)

Este proyecto utiliza **Django Management Commands** para inicializar y administrar el sistema de roles y permisos (RBAC).

**📂 Ubicación de los comandos:**  
`apps/accounts/management/commands/`

---

## 📌 Requisitos previos

Antes de ejecutar cualquier comando, asegúrate de:

1. ✅ Tener el entorno virtual activado
2. ✅ Tener las dependencias instaladas
3. ✅ Tener las migraciones aplicadas

```bash
pip install -r requirements.txt
python manage.py migrate
```

---

## 🔐 Sistema RBAC (Roles y Permisos)

El sistema implementa un modelo de control de acceso basado en roles (RBAC) con la siguiente estructura:

### Roles disponibles

| Rol            | Descripción               |
| -------------- | ------------------------- |
| `ADMIN`        | Administrador del sistema |
| `DOCTOR`       | Personal médico           |
| `RECEPTIONIST` | Personal de recepción     |

### Formato de permisos

Los permisos siguen la convención `<acción>.<recurso>`:

- `read.patients`
- `create.patients`
- `update.patients`
- `delete.patients`
- `read.appointments`
- etc.

> **ℹ️ Nota:** Un usuario puede tener uno o varios roles, y cada rol puede tener múltiples permisos asignados.

---

## 🛠️ Comandos disponibles

### ✅ `seed_roles`

**Descripción:**  
Crea en la base de datos los roles iniciales y asigna los permisos base a cada rol.

**Uso:**

```bash
python manage.py seed_roles
```

**Resultado:**

- ✅ Inserta roles si no existen
- ✅ Inserta permisos si no existen
- ✅ Relaciona roles con sus permisos correspondientes

---

### ✅ `assign_role`

**Descripción:**  
Asigna un rol existente a un usuario existente.

**Uso:**

```bash
python manage.py assign_role --username <USERNAME> --role <ROLE_NAME>
```

**Ejemplos:**

```bash
python manage.py assign_role --username jasinto --role ADMIN
python manage.py assign_role --username doctor1 --role DOCTOR
python manage.py assign_role --username receptionist1 --role RECEPTIONIST
```

**⚠️ Consideraciones:**

- Si el usuario no existe, el comando falla
- Si el rol no existe, el comando falla
- Si el rol ya estaba asignado, no se duplica

---

### ✅ `create_admin_user`

**Descripción:**  
Crea un usuario administrador inicial con privilegios completos.

**Características del usuario creado:**

- `is_staff = True`
- `is_superuser = True`
- Rol `ADMIN` asignado automáticamente

**Uso:**

```bash
python manage.py create_admin_user --username <USERNAME> --password <PASSWORD> --email <EMAIL>
```

**Ejemplo:**

```bash
python manage.py create_admin_user --username admin --password 123456 --email admin@gmail.com
```

**ℹ️ Notas:**

- Si el usuario ya existe, no lo duplica
- Siempre garantiza que el rol `ADMIN` quede asignado

---

### ✅ `seed_all` (⭐ Recomendado)

**Descripción:**  
Inicializa completamente el sistema de seguridad en un solo comando.

**Este comando ejecuta internamente:**

1. `seed_roles`
2. `create_admin_user`

**Uso:**

```bash
python manage.py seed_all --username <USERNAME> --password <PASSWORD> --email <EMAIL>
```

**Ejemplo:**

```bash
python manage.py seed_all --username admin --password 123456 --email admin@gmail.com
```

**Valores por defecto:**

Si no se pasan argumentos, se utilizan los siguientes valores:

| Parámetro  | Valor por defecto |
| ---------- | ----------------- |
| `username` | `admin`           |
| `password` | `admin123`        |
| `email`    | `admin@gmail.com` |

**Ejemplo con valores por defecto:**

```bash
python manage.py seed_all
```

---

## 🚀 Flujo recomendado para un ambiente nuevo

Para levantar un ambiente desde cero, ejecuta los siguientes comandos en orden:

```bash
# 1. Aplicar migraciones
python manage.py migrate

# 2. Inicializar sistema RBAC y usuario admin
python manage.py seed_all --username admin --password 123456 --email admin@gmail.com

# 3. Iniciar el servidor de desarrollo
python manage.py runserver
```

---

## 🔎 Troubleshooting

### Problema: El comando no aparece en `python manage.py help`

**Verifica lo siguiente:**

1. **Estructura de directorios correcta:**

```
   apps/accounts/management/
   ├── __init__.py
   └── commands/
       ├── __init__.py
       ├── seed_roles.py
       ├── assign_role.py
       ├── create_admin_user.py
       └── seed_all.py
```

2. **La app está en `INSTALLED_APPS`:**

```python
   # settings.py
   INSTALLED_APPS = [
       # ...
       'apps.accounts',
       # ...
   ]
```

3. **Los archivos `__init__.py` existen en:**
   - `apps/accounts/management/`
   - `apps/accounts/management/commands/`

---

## 📚 Recursos adicionales

- [Django Management Commands - Documentación oficial](https://docs.djangoproject.com/en/stable/howto/custom-management-commands/)
- [RBAC Best Practices](https://auth0.com/docs/manage-users/access-control/rbac)
