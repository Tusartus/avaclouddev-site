'use client';

import { MermaidDiagram } from './mermaid-diagram';
import { CodeBlock } from './code-block';

interface MdxSection {
  type: 'heading' | 'paragraph' | 'code' | 'mermaid' | 'list';
  level?: number;
  content?: string;
  language?: string;
  items?: string[];
}

function parseMdxContent(content: string): MdxSection[] {
  if (!content) return [];
  const lines = content.split('\n');
  const sections: MdxSection[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? '';

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? '').startsWith('```')) {
        codeLines.push(lines[i] ?? '');
        i++;
      }
      i++;
      const code = codeLines.join('\n');
      if (lang === 'mermaid') {
        sections.push({ type: 'mermaid', content: code });
      } else {
        sections.push({ type: 'code', content: code, language: lang || 'text' });
      }
      continue;
    }

    if (line.startsWith('## ')) {
      sections.push({ type: 'heading', level: 2, content: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      sections.push({ type: 'heading', level: 3, content: line.slice(4) });
      i++;
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && ((lines[i] ?? '').startsWith('- ') || (lines[i] ?? '').startsWith('* '))) {
        items.push((lines[i] ?? '').slice(2));
        i++;
      }
      sections.push({ type: 'list', items });
      continue;
    }

    if (line.trim()) {
      sections.push({ type: 'paragraph', content: line });
    }
    i++;
  }

  return sections;
}

export function MdxContent({ content }: { content: string }) {
  const sections = parseMdxContent(content ?? '');

  return (
    <div className="prose-custom space-y-4">
      {sections.map((section: MdxSection, i: number) => {
        switch (section?.type) {
          case 'heading':
            if (section.level === 2) return <h2 key={i}>{section?.content ?? ''}</h2>;
            if (section.level === 3) return <h3 key={i}>{section?.content ?? ''}</h3>;
            return null;
          case 'paragraph':
            return <p key={i}>{section?.content ?? ''}</p>;
          case 'code':
            return <CodeBlock key={i} code={section?.content ?? ''} language={section?.language ?? 'text'} />;
          case 'mermaid':
            return <MermaidDiagram key={i} chart={section?.content ?? ''} />;
          case 'list':
            return (
              <ul key={i}>
                {(section?.items ?? []).map((item: string, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
