# Velvet MX — Estatus del Proyecto

**Última actualización:** 2026-05-27  
**Repo:** https://github.com/vikoopenclawlab/velvet-mx

---

## ✅ Estado Actual

| Componente | Status | Detalle |
|------------|--------|---------|
| **Build** | ✅ Listo | 31 páginas, 0 errores |
| **Unit Tests** | ✅ 11/11 | vitest passing |
| **E2E Tests** | ✅ 15/15 | Playwright passing |
| **Docker local** | ✅ Corriendo | PostgreSQL 5432, Redis 6379 |
| **GitHub repo** | ✅ 4 commits | main branch |
| **CI/CD workflows** | ✅ Preparados | ci.yml, deploy-staging.yml, deploy-production.yml |

---

## 📋 Pendiente: Secrets GitHub

El CI/CD está listo pero requiere secrets para funcionar. Ver `docs/github-secrets-guide.md`.

### Secrets mínimos para activar CI:

```bash
# Docker
gh secret set DOCKER_USERNAME --body "vikoopenclawlab"
gh secret set DOCKER_TOKEN --body "TU_TOKEN"

# Database
gh secret set STAGING_DATABASE_URL --body "postgresql://..."
gh secret set PROD_DATABASE_URL --body "postgresql://..."

# Kubernetes
KUBECONFIG_B64=$(cat ~/.kube/config | base64 | tr -d '\n')
gh secret set KUBECONFIG_STAGING --body "$KUBECONFIG_B64"
```

### Verificar secrets:
```bash
gh secret list
```

---

## 🔄 Flujo de Deploy

```
push a main
    ↓
CI Pipeline (test → lint → build → e2e)
    ↓
Deploy to Production (manual approval)
    ↓
Docker image → Container registry → k8s

push a develop
    ↓
CI Pipeline (test → lint → build)
    ↓
Deploy to Staging (automatic)
```

---

## 🏗️ Infraestructura

### Kubernetes (k3s)
- **Cluster staging:** Necesita configurarse
- ** manifests:** Listos en `devops/k8s/`

### Docker
- **Registry:** 192.168.64.1:5100 (local)
- **Imágenes:** velvetmx/velvet-mx:staging, velvetmx/velvet-mx:latest

### Base de datos
- **Local:** PostgreSQL 16, seeded con 24 modelos
- **Production:** Necesita PostgreSQL (Neon/Supabase/VPS)

---

## 📁 Estructura

```
velvet-mx/
├── src/app/          # 24 páginas Next.js
├── src/components/   # UI, layout, models, booking
├── src/lib/          # Prisma, auth, stripe, utils, types
├── prisma/           # Schema + seed
├── tests/            # Unit (11) + E2E (15)
├── devops/
│   ├── docker/       # Dockerfile, docker-compose
│   ├── github/       # CI/CD workflows
│   └── k8s/          # K8s manifests
└── docs/
    └── github-secrets-guide.md
```

---

## 🔑 Acceso Local

```bash
# Admin
admin@velvetmx.com / password

# Dev server
npm run dev  # → localhost:3000

# Prisma Studio
npm run db:studio
```

---

## 📦 Variables de Entorno (.env)

Ver `.env.example` para todas las variables necesarias.

**Importante:** No exponer `STRIPE_SECRET_KEY`, `DATABASE_URL`, `NEXTAUTH_SECRET` en el repo.

---

## ⏭️ Próximos Pasos

1. [ ] Configurar GitHub secrets (requerido para CI)
2. [ ] Crear branch `develop` para primer deploy staging
3. [ ] Configurar cluster k8s staging
4. [ ] Configurar PostgreSQL production (Neon/Supabase/VPS)
5. [ ] Implementar payment gateway (Conekta/OpenPay recomendado)
6. [ ] Phase 2: Gift cards, realtime chat, reviews, admin panel