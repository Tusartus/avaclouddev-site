import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LabChapter {
  time: string;
  title: string;
}

export interface LabFrontmatter {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  tags: string[];
  azureServices: string[];
  tools: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  videoUrl: string;
  repoUrl: string;
  monthlyCost: string;
  status: 'published' | 'draft' | 'in-progress';
  publishedAt: string;
  featured: boolean;
  chapters: LabChapter[];
}

export interface Lab {
  frontmatter: LabFrontmatter;
  content: string;
}

const LABS_DIR = path.join(process.cwd(), 'content', 'labs');

export function getAllLabs(): Lab[] {
  if (!fs.existsSync(LABS_DIR)) return [];
  const files = fs.readdirSync(LABS_DIR).filter((f: string) => f.endsWith('.mdx'));
  return files.map((filename: string) => {
    const filePath = path.join(LABS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { frontmatter: data as LabFrontmatter, content };
  }).filter((lab: Lab) => lab?.frontmatter?.status !== 'draft')
    .sort((a: Lab, b: Lab) => {
      const dateA = new Date(a?.frontmatter?.publishedAt ?? '2000-01-01').getTime();
      const dateB = new Date(b?.frontmatter?.publishedAt ?? '2000-01-01').getTime();
      return dateB - dateA;
    });
}

export function getLabBySlug(slug: string): Lab | null {
  const labs = getAllLabs();
  return labs.find((lab: Lab) => lab?.frontmatter?.slug === slug) ?? null;
}

export function getRelatedLabs(currentSlug: string, tags: string[]): Lab[] {
  const all = getAllLabs();
  return all
    .filter((lab: Lab) => lab?.frontmatter?.slug !== currentSlug)
    .filter((lab: Lab) => (lab?.frontmatter?.tags ?? []).some((t: string) => (tags ?? []).includes(t)))
    .slice(0, 3);
}

export function getFeaturedLabs(): Lab[] {
  return getAllLabs().filter((lab: Lab) => lab?.frontmatter?.featured === true);
}

export function getAllTags(): string[] {
  const labs = getAllLabs();
  const tagSet = new Set<string>();
  labs.forEach((lab: Lab) => (lab?.frontmatter?.tags ?? []).forEach((t: string) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
