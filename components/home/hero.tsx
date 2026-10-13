'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, FlaskConical, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Open to remote, hybrid &amp; freelance
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Azure Cloud &amp;{' '}
            <span className="text-primary">IAM Engineer</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
            I build secure, cost-efficient cloud platforms on Azure — AKS clusters, Terraform infrastructure,
            CI/CD pipelines, and identity solutions with Entra ID and Keycloak.
          </p>

          <p className="text-sm text-muted-foreground/80 mb-8 font-mono">
            AKS · Terraform · GitHub Actions · Entra ID · Keycloak · Spring Boot
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              <FlaskConical className="h-4 w-4" />
              View Labs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <a
              href="https://github.com/Tusartus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
