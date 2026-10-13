'use client';

import { type Lab } from '@/lib/mdx';
import { LabCard } from '@/components/lab/lab-card';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';

export function FeaturedLabs({ labs }: { labs: Lab[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <FlaskConical className="h-4 w-4" />
              <span className="text-sm font-medium">Flagship Labs</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Hands-on Cloud Projects
            </h2>
          </div>
          <Link
            href="/labs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all labs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(labs ?? []).map((lab: Lab, i: number) => (
            <motion.div
              key={lab?.frontmatter?.slug ?? i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <LabCard lab={lab} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/labs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all labs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
