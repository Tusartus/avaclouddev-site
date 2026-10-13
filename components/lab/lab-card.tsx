'use client';

import Link from 'next/link';
import { type Lab } from '@/lib/mdx';
import { cn, formatDuration, tagLabels, difficultyColors, statusColors } from '@/lib/utils';
import { Clock, ExternalLink } from 'lucide-react';

export function LabCard({ lab }: { lab: Lab }) {
  const fm = lab?.frontmatter;
  if (!fm) return null;

  return (
    <Link href={`/labs/${fm?.slug ?? ''}`} className="group block">
      <div className="rounded-xl bg-card border border-border/50 p-5 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', difficultyColors[fm?.difficulty ?? ''] ?? 'bg-muted text-muted-foreground')}>
            {fm?.difficulty ?? 'Unknown'}
          </span>
          <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', statusColors[fm?.status ?? ''] ?? 'bg-muted text-muted-foreground')}>
            {fm?.status === 'in-progress' ? 'In Progress' : (fm?.status ?? 'draft')?.charAt?.(0)?.toUpperCase?.() + (fm?.status ?? 'draft')?.slice?.(1)}
          </span>
        </div>

        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {fm?.title ?? 'Untitled Lab'}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {fm?.summary ?? ''}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(fm?.tags ?? []).slice(0, 4).map((tag: string) => (
            <span key={tag} className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {tagLabels[tag] ?? tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDuration(fm?.durationMinutes ?? 0)}</span>
          </div>
          <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read more</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
