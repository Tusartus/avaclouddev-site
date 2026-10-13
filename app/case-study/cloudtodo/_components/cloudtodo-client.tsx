'use client';

import { motion } from 'framer-motion';
import { MermaidDiagram } from '@/components/lab/mermaid-diagram';
import { CodeBlock } from '@/components/lab/code-block';
import { BookOpen, Shield, GitBranch, BarChart3, Lightbulb } from 'lucide-react';

const architectureDiagram = `graph TB
    Users[Users] -->|HTTPS| AG[App Gateway + WAF]
    AG -->|/api/*| AKS[AKS Cluster]
    AG -->|/auth/*| KC[Keycloak]
    AKS -->|Pull| ACR[Azure Container Registry]
    AKS -->|Secrets| KV[Key Vault]
    AKS -->|Logs| MON[Azure Monitor]
    AKS -->|Metrics| MON
    KC -->|Sessions| PG[(PostgreSQL)]
    AKS -->|Data| PG
    GH[GitHub] -->|ArgoCD Sync| ARGO[ArgoCD]
    ARGO -->|Deploy| AKS
    TF[Terraform] -->|Provision All| Azure[Azure Resources]`;

const helmSnippet = `# values-production.yaml
replicaCount: 2

image:
  repository: acr-cloudtodo.azurecr.io/cloudtodo-api
  tag: "1.2.0"

resources:
  requests:
    cpu: 250m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 1Gi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 5
  targetCPUUtilization: 70

ingress:
  enabled: true
  className: azure-application-gateway
  hosts:
    - host: api.cloudtodo.example.com
      paths:
        - path: /
          pathType: Prefix`;

const argoCdSnippet = `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: cloudtodo-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/Tusartus/cloudtodo
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: cloudtodo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`;

export function CloudTodoClient() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">Case Study</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          CloudTodo
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-3">
          A production-grade Spring Boot task management API deployed on AKS, demonstrating the full cloud engineering stack:
          Terraform infrastructure, ArgoCD GitOps, Keycloak authentication, and Azure-native monitoring.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-3 py-1 text-xs font-medium text-yellow-400 mb-10">
          [PLACEHOLDER — This case study uses realistic but fictional content]
        </div>

        <div className="space-y-12 max-w-3xl">
          {/* Overview */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Overview
            </h2>
            <div className="prose-custom">
              <p>CloudTodo is a RESTful task management API built with Spring Boot 3 and Java 17. It serves as a reference implementation for deploying a real Java application on Azure Kubernetes Service with enterprise-grade security, observability, and GitOps-driven deployments.</p>
              <p>The project demonstrates how all the individual lab skills — AKS, Terraform, Keycloak, GitHub Actions, ArgoCD — come together in a cohesive production architecture.</p>
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">Architecture</h2>
            <MermaidDiagram chart={architectureDiagram} />
          </section>

          {/* Security */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Hardening
            </h2>
            <div className="space-y-3">
              {[
                'App Gateway WAF v2 with OWASP 3.2 rule set',
                'Keycloak for OAuth2/OIDC — JWT validation on every API endpoint',
                'AKS workload identity for pod-level Azure resource access',
                'Key Vault CSI driver for secret injection — no secrets in manifests',
                'Calico network policies for microsegmentation between namespaces',
                'PostgreSQL private endpoint — no public access',
              ].map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* CI/CD */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              CI/CD Pipeline
            </h2>
            <div className="prose-custom mb-4">
              <p>The deployment pipeline uses GitHub Actions for CI (build, test, push to ACR) and ArgoCD for CD (GitOps sync to AKS). No kubectl apply in the pipeline — ArgoCD watches the repo and reconciles.</p>
            </div>
            <div className="space-y-4">
              <CodeBlock code={helmSnippet} language="yaml" />
              <CodeBlock code={argoCdSnippet} language="yaml" />
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Deploy time', value: '~3 min', note: 'Push to production' },
                { label: 'Monthly cost', value: '~€45', note: 'Full stack on B-series' },
                { label: 'Uptime', value: '[TBD]', note: 'Lab environment' },
              ].map((stat: any, i: number) => (
                <div key={i} className="rounded-xl bg-card border border-border/50 p-5 text-center">
                  <p className="text-2xl font-bold text-primary">{stat?.value ?? ''}</p>
                  <p className="text-sm font-medium text-foreground">{stat?.label ?? ''}</p>
                  <p className="text-xs text-muted-foreground">{stat?.note ?? ''}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons */}
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Lessons Learned
            </h2>
            <div className="space-y-3">
              {[
                'ArgoCD is a game changer for Kubernetes deployments — the drift detection alone is worth the setup.',
                'App Gateway + AKS integration needs careful subnet sizing — plan IP ranges before deploying.',
                'Keycloak on AKS works well but resource-tune it carefully — JVM memory and startup probes matter.',
                'Azure Monitor + Prometheus metrics give better visibility than either alone.',
              ].map((lesson: string, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <span className="text-primary font-mono text-sm font-bold mt-0.5">{i + 1}.</span>
                  <p className="text-sm text-muted-foreground">{lesson}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
