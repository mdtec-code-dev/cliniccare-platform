# ClinicCare Platform

**ClinicCare Platform** es una plataforma Full‑Stack orientada a la
gestión clínica, con arquitectura API‑First y estructura monorepo.

## 🧱 Arquitectura

-   Backend: Django + Django REST Framework
-   Frontend: Next.js + React
-   Base de datos: PostgreSQL
-   Monorepo: pnpm + Turborepo

## 📂 Estructura

    cliniccare-platform/
    ├── backend/
    ├── frontend/
    ├── docs/
    ├── scripts/
    ├── pnpm-workspace.yaml
    ├── turbo.json
    ├── package.json
    └── pyproject.toml

## 🚀 Instalación

### 1. Clonar repositorio

    git clone https://github.com/crabcodex/cliniccare-platform.git
    cd cliniccare-platform

### 2. Backend

    cd backend
    poetry install
    poetry run python manage.py migrate
    poetry run python manage.py runserver

### 3. Frontend

    cd frontend
    pnpm install
    pnpm dev

## 📦 Tecnologías

-   Django REST Framework
-   Next.js
-   PostgreSQL
-   Turborepo
-   pnpm

## 🔀 Flujo de trabajo

1.  Crear rama desde develop
2.  Implementar feature o fix
3.  Commit con convención semántica
4.  Push y Pull Request hacia develop

## 📌 Objetivo

Proveer una base sólida, escalable y mantenible para sistemas de gestión
clínica.
