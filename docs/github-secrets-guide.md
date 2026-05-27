# GitHub Secrets - Velvet MX CI/CD

Para que los workflows de GitHub Actions funcionen, necesitas configurar estos secrets:

## Secrets requeridos

### DOCKER_REGISTRY (Docker Hub / ghcr.io)

```bash
# Opción 1: Docker Hub
gh secret set DOCKER_USERNAME --body "tu_usuario_dockerhub"
gh secret set DOCKER_TOKEN --body "tu_token_de_dockerhub"

# Opción 2: GitHub Container Registry (gratis para repos públicos)
gh secret set DOCKER_USERNAME --body "vikoopenclawlab"
gh secret set DOCKER_TOKEN --body "ghp_xxxxxx"
```

### KUBECONFIG_STAGING (para deploy a k8s)

```bash
# Generar el secret en base64
cat ~/.kube/config | base64 | tr -d '\n'

# Luego configurar
gh secret set KUBECONFIG_STAGING --body "base64_largo_del_kubeconfig"
```

### DATABASE_URL

```bash
# PostgreSQL staging
gh secret set STAGING_DATABASE_URL --body "postgresql://user:pass@host:5432/velvet_mx"

# PostgreSQL production
gh secret set PROD_DATABASE_URL --body "postgresql://user:pass@host:5432/velvet_mx"
```

### STRIPE (para pagos)

```bash
gh secret set STRIPE_SECRET_KEY --body "sk_live_xxxxxx"
gh secret set STRIPE_WEBHOOK_SECRET --body "whsec_xxxxxx"
```

## Script para configurar todos

```bash
#!/bin/bash
cd ~/.openclaw/workspace/PROJECTS/velvet-mx

# Docker
gh secret set DOCKER_USERNAME --body "vikoopenclawlab"
gh secret set DOCKER_TOKEN --body "ghp_your_token_here"

# Database staging
gh secret set STAGING_DATABASE_URL --body "postgresql://postgres:password@localhost:5432/velvet_mx"

# Database production (cambiar valores)
gh secret set PROD_DATABASE_URL --body "postgresql://user:pass@host:5432/velvet_mx"

# Stripe
gh secret set STRIPE_SECRET_KEY --body "sk_live_xxxx"
gh secret set STRIPE_WEBHOOK_SECRET --body "whsec_xxxx"

# Kubernetes (staging)
KUBECONFIG_B64=$(cat ~/.kube/config | base64 | tr -d '\n')
gh secret set KUBECONFIG_STAGING --body "$KUBECONFIG_B64"

echo "✅ Secrets configurados"
```

## Verificar configuración

```bash
gh secret list
```

## siguiente paso después de secrets

Una vez configurados los secrets, crear branch `develop` para activar deploy staging:

```bash
cd ~/.openclaw/workspace/PROJECTS/velvet-mx
git checkout -b develop
git push origin develop
```