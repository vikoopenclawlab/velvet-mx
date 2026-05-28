# Velvet MX — Pendientes

> Documento para el owner. Cuando quieras activar los pendientes, sigue esta guía.

---

## Item 1: Payment Gateway — Conekta ⏸️

### Por qué no Stripe

Stripe categoriza la industria de acompañantismo/adultos como "alto riesgo" y su política de uso prohibido específicamente bloquea este tipo de plataformas, incluso si el negocio es legal en México. No es un tema de pricing — es directamente prohibido.

### Alternativas

| Gateway | Aprobación | Comisión | Tiempo |
|---------|------------|----------|--------|
| **Conekta** | Estricta pero posible | ~2.9% + $2.50 MXN | 5-7 días |
| **Kushki** | Similar a Conekta | ~2.9% | 5-10 días |
| **OpenPay** | Más rápida | ~3% | 2-3 días |
| **SegPay** | Especializada alto riesgo | variable | 3-5 días |

**Mi recomendación:** Conekta — es la más usada en México para e-commerce y tiene buena documentación.

### Lo que necesitas paradar de alta

1. **RFC con homoclave** (persona física o moral)
2. **Cuenta bancaria mexicana** con CLABE interbancaria a nombre del negocio/titular
3. **Sitio web profesional** con:
   - Términos y condiciones
   - Política de privacidad
   - Políticas de cancelación/reembolso
4. **Correo empresarial** (@tu-dominio.com, no gmail/hotmail)
5. **Identificación oficial** (INE/pasaporte) del representante legal

### Cómo describir el negocio en el formulario

Para evitar bloqueos, describe los servicios como:
> *"Plataforma de reservas de experiencias sociales de lujo con acompañantes. No se ofrecen servicios sexuales."*

### Código ya preparado

Cuando tengas las keys de Conekta, el código que necesitas escribir:

```
src/lib/conekta.ts        → Wrapper del SDK (ya hay stubs)
src/app/api/checkout/     → Crear sesión de pago
src/app/api/webhooks/conekta/ → Confirmar pagos
src/components/payment/   → Botón de pago real
```

### Configurar en k8s

```bash
# Actualizar secrets
kubectl patch secret velvet-mx-secrets -n velvet-mx --type merge -p \
  '{"stringData":{
    "CONEKTA_PUBLIC_KEY":"pk_live_xxx",
    "CONEKTA_PRIVATE_KEY":"sk_live_xxx"
  }}'

# Reiniciar pods
kubectl rollout restart deployment velvet-mx-app -n velvet-mx
```

---

## Item 2: Named Tunnel Cloudflare ⏸️

### Por qué el tunnel actual no sirve para producción

El tunnel `trycloudflare.com` es para pruebas rápidas:
- La URL cambia cada vez que el pod se reinicia
- No hay garantía de uptime
- No puedes apuntar un dominio a ella
- Se puede cerrar en cualquier momento

### Lo que necesitas

1. **Cuenta Cloudflare** — https://dash.cloudflare.com/sign-up (gratis)
2. **Dominio propio** — Necesitas uno para que el tunnel sea estable y puedas usar HTTPS correctamente

### Dominios recomendados

| Dominio | Precio estimado | Registrar en |
|---------|----------------|---------------|
| velvetmx.com | ~$10-15 USD/año | namecheap, godaddy, hover |
| velvetmx.io | ~$12-18 USD/año | namecheap, por supuesto |
| velvetmx.co | ~$8-12 USD/año | namecheap |

### Pasos cuando tengas el dominio

**1. Crear tunnel (en tu máquina local o cualquier servidor):**
```bash
# Instalar cloudflared
brew install cloudflare/cloudflare/cloudflared  # macOS
# o: curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared

# Autenticarse con Cloudflare
cloudflared tunnel login

# Crear tunnel
cloudflared tunnel create velvet-mx-prod
# Te devuelve el TUNNEL_ID (algo como: abc123def-456...)

# Listar tunnels
cloudflared tunnel list
```

**2. Guardar credentials:**
```bash
# El archivo se guarda en ~/.cloudflared/ según las instrucciones del login
# Necesitas el path completo para el paso 4
```

**3. Configurar DNS en Cloudflare Dashboard:**
- Ve a Networks → Tunnels → tu tunnel
- Asigna un subdomain: `velvetmx.com` → `tunnel.velvetmx.com`
- O simplemente apunta `velvetmx.com` → `abc123def-456.cfargotunnel.com`

**4. Agregar el tunnel a k8s:**
```bash
# Guardar credentials como secret
kubectl create secret -n velvet-mx generic cloudflared-creds \
  --from-file=credentials.json=/path/to/your/credentials.json

# Editar devops/k8s/cloudflared.yaml y cambiar:
# args:
#   - tunnel
#   - --config
#   - /etc/cloudflared/config.yml
#   - run

# Con config.yml montado desde el secret:
# tunnel: abc123def-456
# credentials-file: /etc/cloudflared/credentials.json
```

**5. Resultado:**
- URL fija: `https://velvetmx.com`
- No cambia aunque reinicies pods
- HTTPS automático con certificados de Cloudflare

---

## Resumen rápido

| # | Qué | Esfuerzo | Tiempo real |
|---|-----|----------|-------------|
| 1 | Payment (Conekta) | Medio | 5-10 días de aprobación del gateway |
| 2 | Named tunnel | Bajo | 15 min + registro dominio |

Cuando tengas el dominio o las credenciales de Conekta, avísame y lo activamos.