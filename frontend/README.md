# 🏥 CLINICARE – Arquitectura Frontend

Este documento describe la arquitectura frontend utilizada en **CLINICARE**, una aplicación clínica desarrollada con **Next.js (App Router)**.

El objetivo de esta arquitectura es mantener el código **ordenado, escalable y fácil de entender**, evitando complejidad innecesaria durante la etapa de MVP.

---

## 🎯 Objetivos de la arquitectura

- Separación clara de responsabilidades
- Onboarding rápido para nuevos desarrolladores
- Trabajo paralelo dentro del equipo
- Evitar sobreingeniería en el MVP
- Facilitar la evolución futura del proyecto

---

## 🧠 Enfoque arquitectónico

El frontend sigue una **arquitectura modular basada en responsabilidades**, conocida comúnmente como:

> **Arquitectura Frontend Modular (preparada para features)**

En lugar de organizar el código por funcionalidades desde el inicio, el proyecto se estructura por **capas de responsabilidad**, permitiendo una evolución natural hacia una arquitectura orientada a features cuando el proyecto lo requiera.

---

## 📁 Estructura de carpetas

```txt
app/
components/
services/
hooks/
types/
lib/
styles/
public/
```

---

## 📦 Responsabilidad de cada carpeta

### `app/` — Ruteo y layouts

Gestiona el ruteo, los layouts y los elementos propios del framework usando Next.js App Router.

**Incluye:**

- `layout.tsx`
- `page.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

**Regla:**
Aquí no debe existir lógica de negocio.

---

### `components/` — Componentes UI reutilizables

Componentes presentacionales reutilizables que no están ligados al dominio del negocio.

**Estructura:**

```txt
components/
  (page)     # Componentes de página (dashboard, etc.)
  ui/        # Componentes de shadcn
  common/    # Componentes comunes personalizados
```

**Ejemplos:**

- `ui/Button` (shadcn)
- `ui/Input` (shadcn)
- `common/Card`
- `common/Modal`

**Regla:**
Los componentes deben ser reutilizables y no conocer la lógica de la aplicación.

---

### `services/` — Comunicación con la API

Encapsula toda la comunicación con el backend.

**Responsabilidades:**

- Peticiones HTTP
- Manejo de respuestas
- Transformación básica de datos

**Ejemplos:**

- `auth.service.ts`
- `patients.service.ts`
- `appointments.service.ts`

**Regla:**
Los services no renderizan UI ni dependen de componentes.

---

### `hooks/` — Comportamiento reutilizable

Custom hooks de React utilizados en distintas partes de la aplicación.

**Responsabilidades:**

- Lógica compartida
- Manejo de estado
- Efectos secundarios

**Ejemplos:**

- `useAuth`
- `usePatients`

**Regla:**
Los hooks pueden usar services, pero no deben contener UI.

---

### `types/` — Contratos de datos

Define los tipos e interfaces de TypeScript que representan la forma de los datos.

**Ejemplos:**

- `Patient`
- `Appointment`
- `User`

**Regla:**
Es la fuente única de la verdad para la estructura de datos.

---

### `lib/` — Utilidades y helpers

Funciones genéricas y utilidades reutilizables.

**Ejemplos:**

- Formateo de fechas
- Constantes
- Funciones puras

**Regla:**
No debe contener lógica de negocio ni llamadas a la API.

---

### `styles/` — Estilos globales y tema

Contiene los estilos globales, configuración de Tailwind y design tokens.

**Incluye:**

- Paleta de colores
- Tipografía (Inter)
- Estilos globales

---

### `public/` — Recursos estáticos

Imágenes, íconos y archivos estáticos.

---

## 🔗 Flujo de dependencias (regla clave)

Las dependencias deben fluir siempre en una sola dirección:

```
Componente → Hook → Service → API
```

### ❌ Nunca:

```
Service → Componente
```

Esta regla mantiene la arquitectura clara y mantenible.

---

## 🚀 ¿Por qué no usar `features/` aún?

Durante el MVP, el proyecto no utiliza una carpeta `features/` de forma intencional para:

- Reducir complejidad
- Mantener la estructura simple
- Evitar abstracciones prematuras
- Facilitar la lectura del código

Cuando el proyecto crezca y los dominios se vuelvan más complejos, la arquitectura podrá evolucionar sin romper el código existente.

---

## 🔁 Evolución futura (opcional)

Si el proyecto lo requiere, se podrá migrar a una arquitectura orientada a features:

```txt
features/
  auth/
  patients/
  appointments/
```

Cada feature contendrá sus propios componentes, hooks, services y types.

---

## 🏁 Conclusión

Esta arquitectura proporciona:

- Una base sólida y profesional
- Separación clara de responsabilidades
- Flexibilidad para crecer
- Un enfoque pragmático ideal para un MVP

Está diseñada para evolucionar solo cuando el proyecto lo necesite, no antes.
