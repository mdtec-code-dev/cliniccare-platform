# 🔄 Development Flow

Este documento define el **flujo de trabajo oficial** del proyecto CLINICARE.

El objetivo es:

- evitar conflictos
- trabajar en paralelo
- mantener calidad
- simular un entorno profesional real

---

## 🌱 Branching Strategy

Ramas oficiales:

- `main` → rama estable
- `develop` → integración continua
- `feature/*` → desarrollo de funcionalidades
- `fix/*` → corrección de bugs

Ejemplos:

- `feature/auth-jwt`
- `feature/appointments-api`
- `fix/login-timeout`

❌ No se permite trabajo directo en `main` ni `develop`.

---

## 🔁 Flujo de desarrollo

1. Crear issue
2. Crear rama desde `develop`
3. Desarrollar feature
4. Abrir Pull Request a `develop`
5. Revisión de código
6. Merge a `develop`
7. Release estable hacia `main`

---

## 🔍 Pull Requests

Todo cambio debe pasar por PR.

Un PR debe:

- Tener descripción clara
- Explicar **qué** y **por qué**
- Estar asociado a un issue
- Ser pequeño y enfocado

---

## 🔐 Reglas de protección

- `main` y `develop` están protegidas por Rulesets
- Force push bloqueado
- Push directo bloqueado
- Review obligatorio

---

## 🧠 Principio clave

> **Nada entra a producción sin revisión.**

---
