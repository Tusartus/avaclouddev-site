import { getAllLabs } from '@/lib/mdx';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://avarthusdevcloud.cloud';
  const labs = getAllLabs();

  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/labs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/work-with-me`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/how-this-site-works`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/case-study/cloudtodo`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const labPages = (labs ?? []).map((lab: any) => ({
    url: `${baseUrl}/labs/${lab?.frontmatter?.slug ?? ''}`,
    lastModified: new Date(lab?.frontmatter?.publishedAt ?? new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...labPages];
}
