'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Code2, FileText, DollarSign } from 'lucide-react';

const pillars = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Security-first',
    description: 'Every architecture starts with identity, network segmentation, and least-privilege access. Security is not an afterthought.'
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'IaC for everything',
    description: 'If it exists in Azure, it exists in Terraform. No click-ops. Infrastructure is versioned, reviewed, and repeatable.'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Documented',
    description: 'Every lab has a README, architecture diagram, and decision log. If it is not documented, it does not exist.'
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Cost-aware',
    description: 'Cloud costs spiral fast. I track spend from day one with budgets, alerts, and right-sized resources.'
  }
];

export function HowIWork() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-card/30" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-3">
            How I Work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Four principles that guide every project and lab.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p: { icon: React.ReactNode; title: string; description: string }, i: number) => (
            <motion.div
              key={p?.title ?? i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border/50 p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                {p?.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{p?.title ?? ''}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p?.description ?? ''}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
