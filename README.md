# Velvet MX by SensualDesireMX

> Plataforma premium de acompañantes para México. Conexiones auténticas, experiencias inolvidables.

![Velvet MX](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js 14](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tests](https://img.shields.io/badge/Tests-26%20total-green)

---

## 🚀 Quick Start

```bash
# Clonar repo
git clone https://github.com/vikoopenclawlab/velvet-mx.git
cd velvet-mx

# Instalar dependencias
npm install

# Levantar Docker (PostgreSQL + Redis)
docker-compose up -d

# Seed base de datos
npm run db:seed

# Dev server
npm run dev
# → http://localhost:3000
```

**Admin:** `admin@velvetmx.com` / `password`

---

## ✨ Features

- **Marketing site:** Home, Catálogo, Perfiles de modelos, Sobre nosotros, Contacto
- **Cliente:** Dashboard, Mis reservas, Favoritos
- **Modelo:** Dashboard personal, Calendario, Galería, Servicios, Ganancias, Mensajes
- **Admin:** Overview, Gestión de modelos, Reservas, Reportes
- **API REST:** Auth, Models, Bookings, Search, Contact, Upload

---

## 🧪 Testing

```bash
# Unit tests (11 passing)
npm run test

# E2E tests (15 passing)
PLAYWRIGHT_BROWSERS_PATH=/tmp/pw-browsers npx playwright test

# Todos los tests
npm run test:all
```

---

## 🏗️ Stack

| Capa | Tech |
|------|------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **UI** | Radix UI, Lucide Icons |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL 16, Redis 7 |
| **Auth** | NextAuth.js |
| **Pagos** | Stripe (requiere gateway de alto riesgo) |
| **Testing** | Vitest (unit), Playwright (e2e) |
| **CI/CD** | GitHub Actions |
| **Infra** | Docker, Kubernetes (k3s) |

---

## 📁 Estructura

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Home, about, contact
│   ├── (auth)/            # Login, register
│   ├── (client)/          # Dashboard, reservations
│   ├── (model)/           # Model dashboard
│   ├── (admin)/           # Admin panel
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn-style components
│   ├── layout/            # Header, Footer
│   ├── models/            # Model cards, gallery, services
│   ├── booking/           # Booking form, calendar
│   └── dashboard/         # Stats, charts
└── lib/
    ├── prisma.ts          # Prisma client
    ├── auth.ts            # NextAuth config
    ├── stripe.ts          # Stripe client
    ├── types.ts           # TypeScript types
    └── seed-data.ts       # 24 modelos seed
```

---

## 🔧 Configuración

### Variables de entorno

```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

### Docker local

```bash
# Levantar PostgreSQL + Redis
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Base de datos

```bash
npm run db:generate   # Generar Prisma client
npm run db:push       # Push schema
npm run db:seed       # Seed 24 modelos
npm run db:studio     # Prisma Studio UI
```

---

## 🚀 Deploy

### GitHub Actions (CI/CD automático)

1. Configurar secrets en GitHub → Settings → Secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_TOKEN`
   - `STAGING_DATABASE_URL`
   - `KUBECONFIG_STAGING`

2. Push a `develop` → deploy automático a staging

3. Push a `main` → deploy a production (con approval)

### Manual

```bash
# Build Docker image
npm run docker:build

# Push a registry
docker tag velvet-mx:latest velvetmx/velvet-mx:latest
docker push velvetmx/velvet-mx:latest

# Deploy a k8s
kubectl set image deployment/velvet-mx-app app=velvetmx/velvet-mx:latest -n velvet-mx
```

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #1A1A2E | Backgrounds, surfaces |
| `secondary` | #C9A96E | Gold accents, CTAs |
| `accent` | #8B5CF6 | Violet highlights |
| `background` | #0D0D14 | Page background |
| `surface` | #16162A | Cards, modals |
| `text` | #F5F5F7 | Primary text |

### Typography

- **Headings:** Playfair Display (elegant, serif)
- **Body:** Inter (clean, readable)

---

## 📊 Calidad

| Metric | Status |
|--------|--------|
| **Build** | ✅ 0 errors |
| **TypeScript** | ✅ 0 type errors |
| **Unit Tests** | ✅ 11/11 |
| **E2E Tests** | ✅ 15/15 |
| **Lint** | ✅ Passing |

---

## 📝 Documentación

- [Estatus del proyecto](./docs/STATUS.md)
- [Guía de GitHub Secrets](./docs/github-secrets-guide.md)
- [REPORTE_COMPLETO.md](https://github.com/vikoopenclawlab/velvet-mx/blob/main/REPORTE_COMPLETO.md) — Research inicial

---

## ⚠️ Notas Importantes

1. **Payment:** Stripe está configurado pero NO recomendado para este tipo de plataforma en México. Considerar Conekta, OpenPay, Kushki o SegPay.

2. **KYC:** La verificación de identidad (INE/selfie) es legalmente obligatoria para modelos en México.

3. **Legal:** Velvet MX es únicamente un intermediario. No es responsable del contenido ni de las transacciones entre usuarios.

4. **Fase 2:** Gift cards, chat realtime, sistema de reseñas y panel admin completo están pendientes.

---

## 📄 Licencia

Proprietary — SensualDesireMX. Todos los derechos reservados.

---

**+18 SOLO** — Este sitio contiene contenido para adultos. No accesibles para menores de 18 años.