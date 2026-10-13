'use client';

import { type LabChapter } from '@/lib/mdx';
import { Play, Clock } from 'lucide-react';

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match?.[1] ?? null;
}

export function VideoPlayer({ videoUrl, title }: { videoUrl: string; title?: string }) {
  const ytId = getYouTubeId(videoUrl ?? '');

  if (ytId) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-card" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={title ?? 'Lab Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-card" style={{ aspectRatio: '16/9' }}>
      <video controls className="absolute inset-0 w-full h-full">
        <source src={videoUrl ?? ''} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export function ChapterList({ chapters }: { chapters: LabChapter[] }) {
  if (!(chapters ?? []).length) return null;

  return (
    <div className="rounded-xl bg-card border border-border/50 p-4">
      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Play className="h-4 w-4 text-primary" />
        Chapters
      </h4>
      <div className="space-y-2">
        {(chapters ?? []).map((ch: LabChapter, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="font-mono text-xs text-primary w-10 shrink-0 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {ch?.time ?? '0:00'}
            </span>
            <span className="text-muted-foreground">{ch?.title ?? ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
