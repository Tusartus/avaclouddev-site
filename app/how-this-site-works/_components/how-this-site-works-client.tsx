'use client';

import { motion } from 'framer-motion';
import { MermaidDiagram } from '@/components/lab/mermaid-diagram';
import { CodeBlock } from '@/components/lab/code-block';
import { FlaskConical, ExternalLink } from 'lucide-react';

const architectureDiagram = `graph LR
    Dev[Developer] -->|git push| GH[GitHub Repo]
    GH -->|GitHub Actions| Build[Next.js Build]
    Build -->|Static Export| SWA[Azure Static Web Apps]
    SWA -->|CDN| Users[Visitors]
    GH -->|OIDC| AAD[Entra ID]
    AAD -->|Deploy Token| SWA
    TF[Terraform] -->|Provision| SWA
    TF -->|State| Blob[Azure Blob Storage]`;

const cicdSnippet = `name: Deploy to Azure Static Web Apps
on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci && npm run build
      - name: Azure Login (OIDC)
        uses: azure/login@v2
        with:
          client-id: \${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: \${{ secrets.AZURE_TENANT_ID }}
          subscription-id: \${{ secrets.AZURE_SUBSCRIPTION_ID }}
      - name: Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: \${{ secrets.SWA_TOKEN }}
          app_location: "out"
          skip_app_build: true`;

const terraformSnippet = `resource "azurerm_static_web_app" "portfolio" {
  name                = "swa-avarthusdevcloud"
  resource_group_name = azurerm_resource_group.main.name
  location            = "westeurope"
  sku_tier            = "Free"
  sku_size            = "Free"
}

resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.portfolio.id
  domain_name       = "avarthusdevcloud.cloud"
  validation_type   = "dns-txt-token"
}`;

export function HowThisSiteWorksClient() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <FlaskConical className="h-4 w-4" />
          <span className="text-sm font-medium">Meta-Lab</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          How This Site Works
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          This portfolio site is itself a lab — a statically exported Next.js application deployed to Azure Static Web Apps via GitHub Actions with OIDC authentication and Terraform-managed infrastructure.
        </p>

        <div className="space-y-10 max-w-3xl">
          {/* Architecture */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">Architecture</h2>
            <MermaidDiagram chart={architectureDiagram} />
          </section>

          {/* CI/CD */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">CI/CD Pipeline</h2>
            <p className="text-muted-foreground mb-4">
              Every push to <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded">main</code> triggers a GitHub Actions workflow that builds the site and deploys it using OIDC federated credentials — no stored secrets.
            </p>
            <CodeBlock code={cicdSnippet} language="yaml" />
          </section>

          {/* Terraform */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">Terraform Infrastructure</h2>
            <p className="text-muted-foreground mb-4">
              The Azure Static Web App resource and custom domain are managed entirely through Terraform with remote state in Azure Blob Storage.
            </p>
            <CodeBlock code={terraformSnippet} language="hcl" />
          </section>

          {/* Source Link */}
          <section className="rounded-xl bg-card border border-border/50 p-6">
            <h2 className="font-semibold text-foreground mb-2">Source Code</h2>
            <p className="text-sm text-muted-foreground mb-3">
              The full source code including the Terraform infra, GitHub Actions workflows, and Remotion video project is open source.
            </p>
            <a
              href="https://github.com/Tusartus/avaclouddev-site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View on GitHub <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
