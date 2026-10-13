'use client';

import { useEffect, useRef, useState } from 'react';

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!chart) return;
    let cancelled = false;

    async function renderMermaid() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#00d4ff',
            primaryTextColor: '#f9fafb',
            primaryBorderColor: '#1f2937',
            lineColor: '#9ca3af',
            secondaryColor: '#111827',
            tertiaryColor: '#1f2937',
          }
        });
        const id = `mermaid-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(renderedSvg ?? '');
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to render diagram');
      }
    }
    renderMermaid();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-xl bg-card border border-border/50 p-4 text-sm text-muted-foreground">
        <p>Diagram could not be rendered.</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-xl bg-card border border-border/50 p-8 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading diagram...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-xl bg-card border border-border/50 p-4 overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
