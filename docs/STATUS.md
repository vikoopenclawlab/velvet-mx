# Velvet MX — Status

> Última actualización: 2026-05-28

## ✅ MVP Completado

Todas las features críticas del MVP están implementadas, build Passing y deployadas en producción.

### Features completadas

| Feature | Ubicación | Notas |
|---------|-----------|-------|
| Age verification gate | `/age-gate`, middleware | Cookie 1 año |
| Terms of Use | `/terms` | 10 secciones, México |
| Privacy Policy | `/privacy` | 11 secciones, GDPR-like |
| Cookie consent | `/layout.tsx` | Banner con aceptar/rechazar |
| Payment placeholder | `/payment` | Stub — gateway pendiente |
| KYC system | `/model-dashboard/kyc`, `/admin/kyc`, `/api/kyc` | INE + selfie, Prisma |
| Reviews | `/api/reviews`, componente en modelo | DB conectada |
| Favorites | `/api/favorites` | DB conectada |
| Gift cards | `/gift-cards`, `/api/gift-cards` | Create/check/redeem |
| Chat real-time | `/chat/[modelId]`, `/api/chat` | SSE + REST |
| Email transactional | `/api/email` | Nodemailer, 4 templates |
| Admin auth | `middleware.ts` | JWT decode, protected routes |
| Image upload | `/api/upload/image`, `Cloudinary` | Stub si no hay creds |
| Prisma migrations | 3 migrations aplicadas | init, kyc, message |

### URLs en producción

| Servicio | URL |
|----------|-----|
| App (tunnel temporal) | https://sum-composer-based-familiar.trycloudflare.com |
| Age gate | https://sum-composer-based-familiar.trycloudflare.com/age-gate |
| Gift cards | https://sum-composer-based-familiar.trycloudflare.com/gift-cards |
| Chat | https://sum-composer-based-familiar.trycloudflare.com/chat/model-001 |

### Infra en k8s

```
Namespace: velvet-mx
├── cloudflared-tunnel    (trycloudflare.com - TEMPORAL)
├── postgres-6cff4c9c7f  (PostgreSQL 16-alpine)
├── redis-545b79c5cf     (Redis 7-alpine)
└── velvet-mx-app-*       (Next.js, 2 replicas)
```

---

## ⏸️ Pendientes — Requieren Acción del Owner

### 1. Payment Gateway (Conekta/Kushki)

**Por qué está pendiente:**
Stripe no aprueba plataformas de acompañantismo/adultos en México. Es política de uso prohibido, no pricing.

**Qué se necesita:**
- RFC con homoclave o acta constitutiva
- Cuenta bancaria mexicana (CLABE)
- Contrato con gateway (Conekta recomendada)
- 5-10 días hábiles de aprobación

**Cómo activarlo cuando tengas las credenciales:**

1. Crear cuenta en https://conekta.com (o Kushki/OpenPay)
2. Obtener: `CONEKTA_PUBLIC_KEY`, `CONEKTA_PRIVATE_KEY`
3. Configurar en k8s:
```bash
kubectl patch secret velvet-mx-secrets -n velvet-mx --type merge -p \
  '{"stringData":{"CONEKTA_PUBLIC_KEY":"pk_live_xxx","CONEKTA_PRIVATE_KEY":"sk_live_xxx"}}'
```
4. Implementar `src/lib/conekta.ts` (SDK wrapper ya preparado en stubs)
5. Cambiar `/payment/page.tsx` de mock → Conekta Checkout

**Código pendiente:**
- `src/lib/conekta.ts` — wrapper del SDK
- `src/app/api/checkout/route.ts` — crear sesión de pago
- `src/app/api/webhooks/conekta/route.ts` — confirmar pagos

---

### 2. Named Tunnel Cloudflare

**Por qué está pendiente:**
El tunnel actual (`trycloudflare.com`) es temporal — cambia si el pod se reinicia. Necesita dominio propio para apuntar DNS.

**Qué se necesita:**
- Cuenta Cloudflare (gratis)
- Dominio propio (ej: `velvetmx.com`, ~$10-15 USD/año)
- 15 minutos de configuración

**Cómo activarlo:**

1. Registrar dominio (namecheap, godaddy, etc.)
2. Crear tunnel en Cloudflare:
```bash
cloudflared tunnel create velvet-mx-prod
cloudflared tunnel credentials <tunnel-id>
```
3. Guardar credentials como Secret en k8s:
```bash
kubectl create secret -n velvet-mx generic cloudflared-creds \
  --from-file=credentials.json=/path/to/credentials.json
```
4. Actualizar `devops/k8s/cloudflared.yaml` con el tunnel ID y credentials path
5. Configurar DNS en Cloudflare dashboard

**Resultado:** URL fija tipo `https://velvetmx.com` que no cambia nunca.

---

## 📁 Documentación

- [README.md](../README.md) — Quick start, stack, config
- [REPORTE_COMPLETO.md](https://github.com/vikoopenclawlab/velvet-mx/blob/main/REPORTE_COMPLETO.md) — Research inicial
- [MEMORY.md](https://github.com/vikoopenclawlab/velvet-mx/blob/main/../../../.openclaw/workspace/MEMORY.md) — Contexto largo plazo