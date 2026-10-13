'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator?.clipboard?.writeText?.(code ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative group rounded-xl bg-card border border-border/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-secondary/30">
        <span className="text-xs font-mono text-muted-foreground">{language ?? 'code'}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground">
        <code>{code ?? ''}</code>
      </pre>
    </div>
  );
}
