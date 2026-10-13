'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Cloud, Code2, GitBranch, Shield, DollarSign, Server, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Cloud className="h-6 w-6" />,
    title: 'AKS Platform Setup',
    description: 'Production-grade AKS clusters with networking, RBAC, monitoring, and workload identity. From zero to running workloads.'
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'Terraform IaC',
    description: 'Full Azure infrastructure as code with modules, remote state, and CI/CD integration. No click-ops.'
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'CI/CD Pipelines',
    description: 'GitHub Actions or Azure Pipelines with OIDC authentication, automated testing, and staged deployments.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Keycloak / Entra ID IAM',
    description: 'Identity platform design and implementation. SSO, MFA, role mapping, and federation between Keycloak and Entra ID.'
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: 'Spring Boot + OAuth2',
    description: 'Secure Java backends with Spring Security OAuth2/OIDC. Resource server configuration, token validation, role-based access.'
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Azure Cost & Security Review',
    description: 'Audit your Azure environment for cost optimization, security gaps, and governance improvements. Actionable recommendations.'
  }
];

export function WorkWithMeClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Briefcase className="h-4 w-4" />
          <span className="text-sm font-medium">Services</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Work With Me
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          I help teams build secure, automated cloud platforms on Azure. Available for freelance, contract, and remote engagements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {services.map((s: any, i: number) => (
          <motion.div
            key={s?.title ?? i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl bg-card border border-border/50 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              {s?.icon}
            </div>
            <h3 className="font-semibold text-foreground mb-2">{s?.title ?? ''}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s?.description ?? ''}</p>
          </motion.div>
        ))}
      </div>

      {/* Engagement Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl bg-card border border-border/50 p-8 mb-10"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">Engagement Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Freelance', 'Contract', 'Remote'].map((type: string) => (
            <div key={type} className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="font-medium text-foreground">{type}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">Ready to start?</h2>
        <p className="text-muted-foreground mb-6">Let us discuss your cloud engineering needs.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Get in Touch
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
