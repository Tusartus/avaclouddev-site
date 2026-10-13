'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, MapPin, Award, ArrowRight, AlertTriangle } from 'lucide-react';

export function AboutClient() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">About</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
          About Me
        </h1>

        <div className="max-w-3xl space-y-8">
          {/* Bio */}
          <section className="rounded-xl bg-card border border-border/50 p-6">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Background
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                I am a Cloud and IAM engineer based in Belgium, focused on building secure, automated infrastructure on Microsoft Azure.
                My core work revolves around AKS, Terraform, CI/CD with GitHub Actions, and identity platforms like Entra ID and Keycloak.
              </p>
              <p>
                I come from a Java/Spring Boot backend background, which gives me a practical perspective on how applications actually consume cloud services and authenticate users.
                I bridge the gap between platform engineering and application security.
              </p>
              <p>
                I am currently open to remote, hybrid, or freelance opportunities in Azure Cloud Engineering, Platform/DevOps Engineering, or Cloud IAM Engineering.
              </p>
            </div>
          </section>

          {/* Certifications */}
          <section className="rounded-xl bg-card border border-border/50 p-6">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Certifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">AZ-104: Azure Administrator Associate</p>
                  <p className="text-xs text-muted-foreground">Microsoft · Earned 2023 — expired. Renewal planned.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">AZ-400: Azure DevOps Engineer Expert</p>
                  <p className="text-xs text-muted-foreground">Microsoft · Earned 2023 — expired. Renewal planned.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">HashiCorp Terraform Associate</p>
                  <p className="text-xs text-muted-foreground">[PLANNED — Target 2024]</p>
                </div>
              </div>
            </div>
          </section>

          {/* Working style */}
          <section className="rounded-xl bg-card border border-border/50 p-6">
            <h2 className="font-semibold text-foreground mb-3">How I Work</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Everything I build is infrastructure-as-code. Every lab on this site has a GitHub repo with Terraform, CI/CD pipelines, and documentation.
                I prefer to learn by building, and I share what I learn openly.
              </p>
              <p>
                I value security-first design, cost awareness, clear documentation, and honest communication about what I know and what I am still learning.
              </p>
            </div>
          </section>

          <div className="flex gap-3">
            <Link href="/skills" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              View Skills <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/labs" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Browse Labs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
