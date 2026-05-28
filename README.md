# Velvet MX by SensualDesireMX

> Plataforma premium de acompañantes para México. Conexiones auténticas, experiencias inolvidables.

![Velvet MX](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js 14](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tests](https://img.shields.io/badge/Tests-26%20total-green) ![K8s](https://img.shields.io/badge/K8s-k3s-blue)

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

## ✨ Features — MVP COMPLETO ✅

### Core
- ✅ Catálogo de modelos con filtros (ciudad, tipo, búsqueda)
- ✅ Perfiles detallados con galería, servicios y reseñas
- ✅ Sistema de reservaciones (pendiente → confirmado → completado)
- ✅ Age verification gate (middleware + cookie 1 año)

### Legal Pages
- ✅ Terms of Use — 10 secciones adaptadas México
- ✅ Privacy Policy — 11 secciones, GDPR-like
- ✅ Cookie consent banner (con opción de rechazar)

### Modelo Dashboard
- ✅ Dashboard personal (estadísticas)
- ✅ Calendario de disponibilidad (bloquear fechas)
- ✅ Galería de fotos (Cloudinary upload)
- ✅ Gestión de servicios y precios
- ✅ KYC — Verificación de identidad (INE + selfie)
- ✅ Ganancias y earnings
- ✅ Mensajes (chat real-time)

### Cliente
- ✅ Favoritos (agregar/quitar)
- ✅ Reservaciones (mis reservas)
- ✅ Gift cards (comprar, consultar balance, usar)
- ✅ Reseñas (escribir después de cita)
- ✅ Chat directo con modelo (SSE real-time)

### Admin Panel
- ✅ Overview con métricas
- ✅ Gestión de modelos
- ✅ Revisión KYC (aprobar/rechazar documentos)
- ✅ Reservaciones
- ✅ Reportes

### APIs
- ✅ `/api/models` — Catálogo con filtros
- ✅ `/api/bookings` — Crear/consultar reservaciones
- ✅ `/api/chat` — SSE real-time + REST messages
- ✅ `/api/reviews` — CRUD reseñas
- ✅ `/api/favorites` — CRUD favoritos
- ✅ `/api/gift-cards` — Crear/check/redeem
- ✅ `/api/kyc` — Submit + approve/reject
- ✅ `/api/upload/image` — Cloudinary upload
- ✅ `/api/email` — Nodemailer transactional

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
| **Auth** | NextAuth.js (JWT session) |
| **Image Upload** | Cloudinary (unsigned upload preset) |
| **Email** | Nodemailer (SMTP configurable) |
| **Testing** | Vitest (unit), Playwright (e2e) |
| **CI/CD** | GitHub Actions |
| **Infra** | Docker, Kubernetes (k3s on colima) |

---

## 🔧 Configuración

### Variables de entorno

```bash
# .env.local — desarrollo
DATABASE_URL="postgresql://postgres:password@localhost:5432/velvet_mx"
NEXTAUTH_SECRET="tu-secret-32-chars-minimo"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (obtener de https://cloudinary.com/dashboard)
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"

# SMTP (para emails transactional)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="tu@email.com"
SMTP_PASS="tu_password"
EMAIL_FROM="noreply@velvetmx.com"
```

### K8s Secrets (producción)

```bash
kubectl create secret -n velvet-mx generic velvet-mx-secrets \
  --from-literal=DATABASE_URL="postgresql://postgres:password@postgres.velvet-mx.svc.cluster.local:5432/velvet_mx" \
  --from-literal=NEXTAUTH_SECRET="tu-secret" \
  --from-literal=CLOUDINARY_API_KEY="tu_key" \
  --from-literal=CLOUDINARY_API_SECRET="tu_secret"

kubectl create configmap -n velvet-mx velvet-mx-config \
  --from-literal=CLOUDINARY_CLOUD_NAME="tu_cloud_name"
```

---

## 🚀 Deploy

### GitHub Actions (CI/CD automático)

1. Configurar secrets en GitHub → Settings → Secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_TOKEN`
   - `KUBECONFIG_STAGING`

2. Push a `main` → build → docker push → k8s rollout automático

### Build manual

```bash
# Build Docker image
docker build -t vikoopenclawlab/velvet-mx:staging .

# Push a registry
docker push vikoopenclawlab/velvet-mx:staging

# Deploy a k8s
kubectl rollout restart deployment velvet-mx-app -n velvet-mx
```

### K8s manifests

```bash
kubectl apply -f devops/k8s/
# Recursos: namespace, configmap, secrets, deployment, service, postgres, cloudflared
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
| **Pages** | ✅ 42 páginas |
| **Unit Tests** | ✅ 11/11 |
| **E2E Tests** | ✅ 15/15 |

---

## ⚠️ Pendientes — Requieren Acción del Owner

### Item 1: Payment Gateway ⏸️
**Problema:** Stripe categoriza esta industria como "alto riesgo" y no aprueba negocios de acompañantismo/adultos en México.

**Solución:** Contratar un gateway alternativo en México:

| Gateway | Comisión | Tiempo de aprobación | Notas |
|---------|----------|---------------------|-------|
| **Conekta** | ~2.9% + $2.50 MXN | 5-7 días hábiles | Recomendada |
| **Kushki** | ~2.9% | 5-10 días hábiles | Alternativa |
| **OpenPay** | ~3% | 2-3 días hábiles | Solo OXXO/transferencia |

**Pasos:**
1. Obtener RFC con homoclave o acta constitutiva
2. Crear cuenta en el gateway elegido
3. Configurar `CONEKTA_PUBLIC_KEY`, `CONEKTA_PRIVATE_KEY` en k8s
4. Implementar `src/lib/conekta.ts` (ver docs/conekta-setup.md cuando esté disponible)

### Item 2: Named Tunnel Cloudflare ⏸️
**Problema:** El tunnel actual (`trycloudflare.com`) es temporal — cambia si el pod se reinicia.

**Solución:** Crear named tunnel con cuenta Cloudflare + dominio propio.

**Pasos:**
1. Registrar dominio (ej: `velvetmx.com`, ~$10-15 USD/año)
2. Crear cuenta Cloudflare (gratis)
3. Crear tunnel: `cloudflared tunnel create velvet-mx-prod`
4. Configurar DNS en Cloudflare
5. Guardar credentials como Secret en k8s
6. Actualizar deployment de cloudflared con el tunnel name

---

## 📝 Documentación adicional

- [Estatus del proyecto](./docs/STATUS.md)
- [Guía de GitHub Secrets](./docs/github-secrets-guide.md)
- [REPORTE_COMPLETO.md](https://github.com/vikoopenclawlab/velvet-mx/blob/main/REPORTE_COMPLETO.md) — Research inicial

---

## ⚠️ Notas Legales Importantes

1. **KYC obligatorio:** La verificación de identidad (INE + selfie) es legalmente requerida para modelos en México.

2. **Stripe no disponible:** Stripe no aprueba este tipo de plataforma. Usar Conekta/Kushki/OpenPay.

3. **Intermediario:** Velvet MX es únicamente un intermediario. No es responsable del contenido ni de las transacciones entre usuarios.

4. **+18:** Este sitio contiene contenido para adultos. No accesible para menores de 18 años.

---

## 📄 Licencia

Proprietary — SensualDesireMX. Todos los derechos reservados.