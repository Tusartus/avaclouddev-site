'use client';

import { useState } from 'react';
import { type Lab } from '@/lib/mdx';
import { LabCard } from '@/components/lab/lab-card';
import { LabFilters } from '@/components/lab/lab-filters';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

export function LabsPageClient({ labs }: { labs: Lab[] }) {
  const [activeTag, setActiveTag] = useState('all');

  const filtered = activeTag === 'all'
    ? (labs ?? [])
    : (labs ?? []).filter((lab: Lab) =>
        (lab?.frontmatter?.tags ?? []).includes(activeTag)
      );

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary mb-2">
          <FlaskConical className="h-4 w-4" />
          <span className="text-sm font-medium">Lab Collection</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Cloud Engineering Labs
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Each lab is a documented, reproducible project with architecture diagrams, code, and video walkthroughs.
        </p>
      </div>

      <div className="mb-8">
        <LabFilters activeTag={activeTag} onTagChange={setActiveTag} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((lab: Lab, i: number) => (
          <motion.div
            key={lab?.frontmatter?.slug ?? i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <LabCard lab={lab} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No labs found for this filter.</p>
        </div>
      )}
    </div>
  );
}
