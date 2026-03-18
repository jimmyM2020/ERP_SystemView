# ERP System — Prueba Técnica Next.js + TypeScript

## Stack

| Tecnología | Uso |
|---|---|
| **Next.js 14** App Router | Framework, SSR, file-based routing |
| **TypeScript** | Tipado estático completo |
| **React Hook Form** | Manejo de formularios |
| **Zod** | Validación declarativa con esquemas |
| **DOMPurify** | Sanitización XSS en cliente |
| **Axios** | HTTP con interceptores (refresh automático) |
| **CSS Modules** | Estilos por componente, sin colisiones |
| **Lucide React** | Iconografía |

---

## Cómo correr el proyecto

```bash
npm install
npm run dev
# → http://localhost:8080
```

>  Debe correr en el **puerto 8080** para que el enlace de recuperación de contraseña funcione.

---

## Primer uso (sin contraseña asignada)

1. Ve a `http://localhost:8080/recuperar-contrasena`
2. Ingresa el correo usado en la entrevista
3. Revisa tu bandeja y abre el link recibido
4. Establece una contraseña segura (8+ chars, mayúscula, número, especial)
5. Inicia sesión en `http://localhost:8080/login`

---

## Arquitectura

```
src/
├── app/                          # Next.js App Router (thin wrappers)
│   ├── layout.tsx                # Root layout: ThemeProvider + AuthProvider
│   ├── page.tsx                  # Redirect → /login
│   ├── login/page.tsx
│   ├── recuperar-contrasena/page.tsx
│   ├── restablecer-contrasena/page.tsx
│   └── dashboard/
│       ├── layout.tsx            # Auth guard + Sidebar + Topbar
│       ├── page.tsx
│       ├── ventas/page.tsx
│       ├── rrhh/page.tsx
│       ├── reportes/page.tsx
│       └── ajustes/page.tsx
│
├── pages/                        # Routing logic (connect views ↔ router)
│   ├── auth/   LoginPage · RecuperarPage · RestablecerPage
│   └── dashboard/  DashboardHomePage · VentasPage · RrhhPage
│
├── views/                        # Pure UI — no routing, no side effects
│   ├── auth/   LoginView · RecuperarView · RestablecerView
│   └── dashboard/  HomeView · VentasView · RrhhView
│
├── components/                   # Reusable atoms & molecules
│   ├── auth/   AuthCard · AuthButton · FormField
│   ├── dashboard/  Sidebar · Topbar · StatCard
│   └── ui/     ThemeToggle · Alert
│
├── services/                     # HTTP & data layer
│   ├── apiClient.ts              # Axios instance + interceptores
│   ├── authService.ts            # Auth + health endpoints
│   ├── ventasService.ts          # Datos de ventas
│   └── rrhhService.ts            # Datos de RRHH
│
├── lib/                          # App-level singletons
│   ├── auth-context.tsx
│   ├── theme-context.tsx
│   ├── schemas.ts                # Zod schemas
│   └── sanitize.ts               # DOMPurify wrapper
│
├── types/index.ts                # Shared TypeScript types
└── styles/globals.css            # CSS variables (liquid glass, light/dark)
```

---

## Seguridad

| Medida | Detalle |
|---|---|
| **Zod** | Valida todos los formularios antes de llamar al API |
| **DOMPurify** | Sanitiza inputs en el cliente antes de enviar |
| **Anti-injection regex** | Bloquea `< > " ' ; { } ( ) [ ]` en todos los campos |
| **Contraseña segura** | 8+ chars, mayúscula, minúscula, número, especial, sin patrones comunes |
| **Token oculto** | El token de recuperación NO se muestra en el UI |
| **Refresh automático** | Interceptor Axios renueva el token en 401 transparentemente |
| **Auth guard** | El layout del dashboard redirige a `/login` si no hay sesión activa |

---

## Tema

Detecta automáticamente la preferencia del SO (`prefers-color-scheme`).  
El usuario puede alternarlo con el botón ☀/🌙. Se persiste en `localStorage`.

---

## Endpoints

| Método | URL | Descripción |
|---|---|---|
| POST | `/api/v1/auth/login` | Inicio de sesión |
| POST | `/api/v1/auth/refresh` | Renovar token (automático) |
| POST | `/api/v1/auth/recuperar-contrasena` | Solicitar enlace |
| POST | `/api/v1/auth/restablecer-contrasena` | Nueva contraseña |
| POST | `/api/v1/auth/logout` | Cerrar sesión |
| GET  | `/health` | Probar conexión |

Base URL: `http://178.62.234.17`
