# 🏗️ Architecture

Este documento describe la **arquitectura oficial** del proyecto **CLINICARE**.

La arquitectura fue diseñada con un enfoque **API-First**, priorizando:

- separación de responsabilidades
- trabajo paralelo entre frontend y backend
- mantenibilidad
- seguridad
- aprendizaje real de trabajo en equipo

---

## 🧠 Visión general

CLINICARE es una aplicación **full-stack desacoplada**, donde:

- El **frontend** (Next.js) actúa como un cliente independiente
- El **backend** (Django REST Framework) expone una API REST versionada
- La **API es la fuente de verdad**
- Toda la lógica de negocio y seguridad vive en el backend

---

## 📐 Diagrama lógico de arquitectura

┌──────────────────────────────┐
│ Frontend Client │
│ (Next.js + TS) │
│ │
│ - UI Components │
│ - Hooks │
│ - API Services │
│ - Route Guards │
└──────────────▲───────────────┘
│ HTTP / JSON
│ JWT Auth
▼
┌──────────────────────────────┐
│ API Layer (DRF) │
│ │
│ - Views (Controllers) │
│ - Serializers (DTOs) │
│ - Auth & Permissions │
│ - Versioning (/api/v1) │
└──────────────▲───────────────┘
│
▼
┌──────────────────────────────┐
│ Application Layer │
│ (Services / Use Cases) │
│ │
│ - Business Rules │
│ - Transactions │
│ - Orchestration │
│ - Domain Policies │
└──────────────▲───────────────┘
│
▼
┌──────────────────────────────┐
│ Domain Layer │
│ (Django Models) │
│ │
│ - Entities │
│ - State │
│ - Invariants │
│ - Relationships │
└──────────────▲───────────────┘
│
▼
┌──────────────────────────────┐
│ Infrastructure Layer │
│ │
│ - PostgreSQL │
│ - Redis │
│ - Celery │
│ - Logging / Audit │
└──────────────────────────────┘

---

## 🧩 Arquitectura Backend

El backend sigue una **arquitectura en capas**, inspirada en **Clean Architecture**, aplicada de forma **pragmática** para trabajar correctamente con Django.

> No se implementa Clean Architecture pura para evitar sobre-ingeniería y conflicto con el framework.

---

### 1️⃣ Presentation Layer (HTTP)

**Responsabilidad**

- Manejo de HTTP
- Status codes
- Autenticación (JWT)
- Autorización (roles / permisos)
- Validación básica de input

**Ubicación**

- `views.py`
- `serializers.py`
- `permissions.py`

❌ No contiene lógica de negocio  
❌ No accede directamente a reglas complejas

---

### 2️⃣ Application Layer (Services)

**Responsabilidad**

- Casos de uso
- Reglas de negocio
- Transacciones
- Orquestación entre entidades
- Validaciones complejas

**Ejemplos**

- Crear turno médico
- Validar solapamientos
- Registrar consulta
- Generar factura

**Ubicación**

- `services.py`

📌 **Esta es la capa más importante del sistema**.

---

### 3️⃣ Domain Layer

**Responsabilidad**

- Entidades
- Estados válidos
- Invariantes
- Relaciones entre modelos

**Ubicación**

- `models.py`

📌 El dominio **no conoce HTTP, JWT ni frontend**.

---

### 4️⃣ Infrastructure Layer

**Responsabilidad**

- Persistencia de datos
- Jobs asíncronos
- Cache
- Logs
- Auditoría

**Tecnologías**

- PostgreSQL
- Redis
- Celery
- Logging estructurado

📌 Son detalles técnicos intercambiables.

---

## 🎨 Arquitectura Frontend

El frontend está construido como un **cliente desacoplado**.

### Responsabilidades

- Renderizado de UI
- Manejo de estado
- Experiencia de usuario
- Protección visual de rutas
- Consumo de API

❌ No reglas de negocio  
❌ No validaciones críticas  
❌ No control de permisos reales

---

### Capas del frontend

UI Components
↓
Hooks (Auth, Data, State)
↓
API Services
↓
REST API

---

## 🔐 Seguridad (transversal)

La seguridad es **server-side first**.

- Autenticación → Backend
- Autorización → Backend
- Permisos → Backend
- Auditoría → Backend

El frontend **solo refleja capacidades**, nunca decide.

---

## 🔌 Versionado de API

Todas las APIs están versionadas:

/api/v1/

Cambios incompatibles generan una nueva versión.

---

## 🧠 Decisiones arquitectónicas clave

- API-First para trabajo paralelo
- Frontend desacoplado
- Backend con lógica centralizada
- Clean Architecture aplicada por principios, no dogma
- Seguridad por defecto
- Simplicidad sobre complejidad innecesaria

---

## 📌 Qué NO es esta arquitectura

- ❌ No es MVC clásico
- ❌ No es monolito acoplado
- ❌ No es microservicios
- ❌ No es Clean Architecture pura

---

## 🎯 Beneficios de esta arquitectura

- Escalabilidad conceptual
- Mantenibilidad
- Claridad para el equipo
- Aprendizaje real de arquitectura
- Fácil de explicar en entrevistas
- Simula entornos profesionales

---

## 🧾 Cómo describir esta arquitectura

> _“CLINICARE follows an API-first full-stack architecture with a decoupled Next.js frontend consuming a Django REST backend structured in layered, clean-inspired architecture.”_

---

## 📌 Estado

Arquitectura establecida y validada para la fase MVP.

---
