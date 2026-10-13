'use client';

import { skillCategories, type SkillCategory } from '@/lib/skills';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Code2, GitBranch, Shield, Layout } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Azure Cloud': <Cloud className="h-5 w-5" />,
  'IaC & Automation': <Code2 className="h-5 w-5" />,
  'CI/CD & GitOps': <GitBranch className="h-5 w-5" />,
  'Identity & Backend': <Shield className="h-5 w-5" />,
  'Frontend (supporting)': <Layout className="h-5 w-5" />,
};

export function SkillsGrid() {
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
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Core competencies across cloud infrastructure, automation, and identity management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(skillCategories ?? []).map((cat: SkillCategory, i: number) => (
            <motion.div
              key={cat?.name ?? i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border/50 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cat?.color ?? '#666'}15`, color: cat?.color ?? '#666' }}
                >
                  {categoryIcons[cat?.name ?? ''] ?? <Code2 className="h-5 w-5" />}
                </div>
                <h3 className="font-semibold text-foreground">{cat?.name ?? 'Unknown'}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(cat?.skills ?? []).map((skill: string) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
