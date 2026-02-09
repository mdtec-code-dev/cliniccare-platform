# Guia de configuracion local — cliniccare-platform

Este documento explica paso a paso como clonar, instalar y ejecutar el proyecto completo (backend Django + frontend Next.js) usando Turborepo como orquestador desde la raiz.

---

## Requisitos previos

Antes de comenzar, asegurate de tener instaladas las siguientes herramientas:

| Herramienta | Version minima | Como verificar         | Como instalar                          |
|-------------|---------------|------------------------|----------------------------------------|
| Node.js     | 20 LTS        | `node -v`              | https://nodejs.org                     |
| pnpm        | 9+            | `pnpm -v`              | `npm install -g pnpm`                  |
| Python      | 3.10+         | `python --version`     | https://www.python.org/downloads       |
| Git         | 2.30+         | `git --version`        | https://git-scm.com                    |

PostgreSQL es opcional para desarrollo local. Por defecto el backend usa SQLite, que no requiere instalacion. Si necesitas PostgreSQL (para staging o produccion), consulta la seccion "Usar PostgreSQL en vez de SQLite" mas abajo.

Nota: Todo el equipo debe usar pnpm como gestor de paquetes de Node. El proyecto tiene un lockfile de pnpm (`pnpm-lock.yaml`) y usar npm o yarn causaria inconsistencias.

---

## Primera vez (configuracion desde cero)

### 1. Clonar el repositorio

```bash
git clone https://github.com/mdtec-code-dev/cliniccare-platform.git
cd cliniccare-platform
```

### 2. Instalar dependencias de Node y Turborepo

Desde la raiz del proyecto:

```bash
pnpm install
```

Esto instala Turborepo, las dependencias del frontend y el wrapper del backend de un solo golpe.

### 3. Crear el entorno virtual de Python

Desde la raiz del proyecto:

```bash
python -m venv .venv
```

### 4. Activar el entorno virtual

En Windows (PowerShell):

```powershell
.venv\Scripts\Activate.ps1
```

En macOS / Linux:

```bash
source .venv/bin/activate
```

Veras que el prompt de tu terminal cambia a algo como `(.venv)`. Esto indica que el venv esta activo.

### 5. Instalar dependencias de Python

Con el entorno virtual activo:

```bash
pip install -r backend/requirements.txt
```

### 6. Configurar variables de entorno del backend

```bash
cp backend/.env.example backend/.env
```

En Windows (PowerShell):

```powershell
Copy-Item backend\.env.example backend\.env
```

Abre `backend/.env` y ajusta los valores si lo necesitas. Por defecto usa SQLite y no requiere cambios para empezar.

### 7. Ejecutar migraciones de Django

Con el entorno virtual activo:

```bash
pnpm migrate
```

O de forma directa:

```bash
cd backend
python manage.py migrate
```

### 8. Arrancar el proyecto

Asegurate de tener el entorno virtual activo y ejecuta desde la raiz:

```bash
pnpm dev
```

Esto arranca en paralelo:
- Frontend (Next.js) en http://localhost:3000
- Backend (Django) en http://localhost:8000

---

## Ya tengo el repo clonado (dia a dia)

Cada vez que retomes el trabajo:

```bash
# 1. Traer ultimos cambios
git pull

# 2. Activar el entorno virtual (si no lo esta)
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# macOS / Linux:
source .venv/bin/activate

# 3. Actualizar dependencias (por si cambiaron)
pnpm install
pip install -r backend/requirements.txt

# 4. Ejecutar migraciones pendientes (por si hay nuevas)
pnpm migrate

# 5. Arrancar todo
pnpm dev
```

---

## Comandos disponibles

Todos estos comandos se ejecutan desde la raiz del proyecto.

| Comando                | Que hace                                           |
|-----------------------|----------------------------------------------------|
| `pnpm dev`            | Arranca frontend + backend en paralelo             |
| `pnpm dev:frontend`   | Solo Next.js en http://localhost:3000               |
| `pnpm dev:backend`    | Solo Django en http://localhost:8000                |
| `pnpm build`          | Build de produccion del frontend                   |
| `pnpm lint`           | Ejecuta lint en todos los workspaces               |
| `pnpm migrate`        | Ejecuta migraciones de Django                      |
| `pnpm makemigrations` | Genera nuevas migraciones de Django                |
| `pnpm seed`           | Inicializa RBAC completo + usuario admin           |
| `pnpm seed:roles`     | Crea roles y permisos base en la BD                |
| `pnpm superuser`      | Crea un superusuario interactivo de Django         |

---

## Activar y desactivar el entorno virtual

El entorno virtual de Python es necesario siempre que trabajes con el backend o ejecutes `pnpm dev` (porque Turborepo invoca `python` y espera que este en el PATH del venv).

Activar:

```powershell
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Desactivar:

```bash
deactivate
```

---

## Solucion de problemas comunes

### "python no se reconoce como comando"

Asegurate de que Python esta en tu PATH del sistema. En Windows, al instalar Python marca la casilla "Add Python to PATH".

### "pnpm: command not found"

Instala pnpm globalmente:

```bash
npm install -g pnpm
```

### Error de conexion a PostgreSQL

Verifica que PostgreSQL esta corriendo y que los datos en `backend/.env` son correctos. Puedes probar la conexion con:

```bash
psql -h localhost -U postgres -d cliniccare
```

### Las migraciones fallan

Si cambiaste de rama y hay migraciones nuevas, ejecuta:

```bash
pnpm migrate
```

Si hay conflictos de migraciones, consulta con el equipo antes de hacer merge manual.

### El frontend no arranca o muestra errores de dependencias

Borra la cache y reinstala:

```bash
rm -rf node_modules frontend/node_modules frontend/.next
pnpm install
```

En Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules, frontend\node_modules, frontend\.next
pnpm install
```

---

## Usar PostgreSQL en vez de SQLite (opcional)

Por defecto el backend usa SQLite para simplificar el desarrollo local. Si necesitas PostgreSQL (por ejemplo para staging, produccion, o para probar queries especificas de Postgres):

### 1. Instalar PostgreSQL

Descarga e instala desde https://www.postgresql.org/download. Verifica con:

```bash
psql --version
```

### 2. Instalar el driver de Python

Con el entorno virtual activo:

```bash
pip install psycopg2-binary==2.9.9
```

### 3. Crear la base de datos

```sql
CREATE DATABASE cliniccare;
```

### 4. Configurar las variables de entorno

Edita `backend/.env` y descomenta/ajusta las lineas de PostgreSQL:

```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=cliniccare
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Ejecutar migraciones

```bash
pnpm migrate
```
