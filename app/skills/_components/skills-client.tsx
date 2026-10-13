'use client';

import { motion } from 'framer-motion';
import { skillCategories, certifications, type SkillCategory } from '@/lib/skills';
import { useInView } from 'react-intersection-observer';
import { Code2, Award, AlertTriangle, Cloud, GitBranch, Shield, Layout, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const categoryIcons: Record<string, React.ReactNode> = {
  'Azure Cloud': <Cloud className="h-5 w-5" />,
  'IaC & Automation': <Code2 className="h-5 w-5" />,
  'CI/CD & GitOps': <GitBranch className="h-5 w-5" />,
  'Identity & Backend': <Shield className="h-5 w-5" />,
  'Frontend (supporting)': <Layout className="h-5 w-5" />,
};

const skillLabLinks: Record<string, string> = {
  'AKS': '/labs/aks-terraform-github-oidc',
  'Terraform': '/labs/aks-terraform-github-oidc',
  'GitHub Actions (OIDC)': '/labs/aks-terraform-github-oidc',
  'Keycloak': '/labs/keycloak-spring-boot-aks',
  'Java Spring Boot': '/labs/keycloak-spring-boot-aks',
  'OAuth2/OIDC': '/labs/keycloak-spring-boot-aks',
  'Azure Policy': '/labs/azure-governance-policy-budgets',
  'RBAC': '/labs/azure-governance-policy-budgets',
  'Management Groups': '/labs/azure-governance-policy-budgets',
  'Cost Management': '/labs/azure-governance-policy-budgets',
};

export function SkillsClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-medium">Expertise</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Skills &amp; Certifications
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Skills grouped by category with evidence links to hands-on labs.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="space-y-6 mb-16">
        {(skillCategories ?? []).map((cat: SkillCategory, i: number) => (
          <motion.div
            key={cat?.name ?? i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl bg-card border border-border/50 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${cat?.color ?? '#666'}15`, color: cat?.color ?? '#666' }}
              >
                {categoryIcons[cat?.name ?? ''] ?? <Code2 className="h-5 w-5" />}
              </div>
              <h2 className="font-semibold text-lg text-foreground">{cat?.name ?? ''}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {(cat?.skills ?? []).map((skill: string) => {
                const labLink = skillLabLinks[skill];
                return labLink ? (
                  <Link
                    key={skill}
                    href={labLink}
                    className="inline-flex items-center justify-between gap-1 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:bg-accent hover:text-primary transition-colors group"
                  >
                    <span>{skill}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ) : (
                  <span key={skill} className="inline-flex items-center rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Certifications
        </h2>
        <div className="space-y-3">
          {(certifications ?? []).map((cert: any, i: number) => (
            <div key={i} className="rounded-xl bg-card border border-border/50 p-5 flex items-start gap-3">
              {cert?.status === 'expired' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5 shrink-0" />
              )}
              <div>
                <p className="font-medium text-foreground">{cert?.name ?? ''}</p>
                <p className="text-sm text-muted-foreground">{cert?.issuer ?? ''} {cert?.year ? `· ${cert.year}` : ''}</p>
                <p className="text-xs text-muted-foreground mt-1">{cert?.note ?? ''}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
