# Avintech — Proyecto Desacoplado (Next.js + Payload CMS)

Conversión del sitio web de **Avintech** (`https://avintech.com.mx/`) a una arquitectura desacoplada donde el **Blog** es administrado dinámicamente desde **Payload CMS** y el resto del sitio es estático/fijo en **Next.js**:

- **`frontend/`**: Aplicación web en **Next.js (App Router + TypeScript)** con tipografía **Rubik** (`next/font/google`), replicando el diseño, colores, animaciones (Lircle masked text reveal y fadeInDown header) y estructura de la página actual. Las secciones institucionales son fijas; `/blog` y `/blog/[slug]` se renderizan dinámicamente desde Payload CMS y los recursos multimedia se alojan en `frontend/public/`.
- **`backend/`**: **Payload CMS v3** con SQLite (`@payloadcms/db-sqlite`), administrando el Blog (`posts`, `categories`, `media`), formulario de contacto (`contact-submissions`) y usuarios (`users`) con panel de administración estilizado en modo oscuro.

## Inicio rápido

### 1. Backend (Payload CMS — Puerto `3001`)

```bash
cd backend
npm install
npm run seed   # Opcional: ya incluye la base SQLite avintech.db precargada
npm run dev    # Inicia en http://localhost:3001 (Panel Admin: http://localhost:3001/admin)
```

### 2. Frontend (Next.js — Puerto `3000`)

```bash
cd frontend
npm install
npm run dev    # Inicia en http://localhost:3000
```

## Colecciones en Payload CMS

- **Blog**: `posts`, `categories`, `media`
- **Contacto y Acceso**: `contact-submissions`, `users`
