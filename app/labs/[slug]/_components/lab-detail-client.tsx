'use client';

import { type Lab } from '@/lib/mdx';
import { VideoPlayer, ChapterList } from '@/components/lab/video-player';
import { MdxContent } from '@/components/lab/mdx-content';
import { LabCard } from '@/components/lab/lab-card';
import { cn, formatDuration, tagLabels, difficultyColors } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Clock, Github, ExternalLink, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function LabDetailClient({ lab, relatedLabs }: { lab: Lab; relatedLabs: Lab[] }) {
  const fm = lab?.frontmatter;
  if (!fm) return null;

  return (
    <article className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <Link href="/labs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Labs
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', difficultyColors[fm?.difficulty ?? ''] ?? '')}>
              {fm?.difficulty ?? ''}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {formatDuration(fm?.durationMinutes ?? 0)}
            </span>
            {fm?.monthlyCost && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <DollarSign className="h-3 w-3" /> {fm.monthlyCost}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            {fm?.title ?? ''}
          </h1>

          <p className="text-lg text-muted-foreground mb-4">{fm?.problem ?? ''}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {(fm?.tags ?? []).map((tag: string) => (
              <span key={tag} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {tagLabels[tag] ?? tag}
              </span>
            ))}
          </div>

          {fm?.repoUrl && (
            <a
              href={fm.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Video */}
        {fm?.videoUrl && (
          <div className="mb-8 space-y-4">
            <VideoPlayer videoUrl={fm.videoUrl} title={fm?.title ?? ''} />
            <ChapterList chapters={fm?.chapters ?? []} />
          </div>
        )}

        {/* MDX Content */}
        <div className="mb-12">
          <MdxContent content={lab?.content ?? ''} />
        </div>

        {/* Related Labs */}
        {(relatedLabs ?? []).length > 0 && (
          <section className="border-t border-border/50 pt-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground mb-6">Related Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(relatedLabs ?? []).map((related: Lab, i: number) => (
                <LabCard key={related?.frontmatter?.slug ?? i} lab={related} />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </article>
  );
}
