'use client';

import { cn, tagLabels } from '@/lib/utils';
import { Filter } from 'lucide-react';

const allTags = ['all', 'aks', 'terraform', 'cicd', 'security-iam', 'governance', 'cost', 'backend'];

export function LabFilters({
  activeTag,
  onTagChange
}: {
  activeTag: string;
  onTagChange: (tag: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="h-4 w-4 text-muted-foreground" />
      {allTags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => onTagChange?.(tag)}
          className={cn(
            'inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            activeTag === tag
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-accent'
          )}
        >
          {tag === 'all' ? 'All' : (tagLabels[tag] ?? tag)}
        </button>
      ))}
    </div>
  );
}
