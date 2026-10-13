import { getAllLabs, getLabBySlug, getRelatedLabs } from '@/lib/mdx';
import { LabDetailClient } from './_components/lab-detail-client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const labs = getAllLabs();
  return (labs ?? []).map((lab: any) => ({ slug: lab?.frontmatter?.slug ?? '' }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  if (!lab) return { title: 'Lab Not Found' };
  return {
    title: lab.frontmatter.title,
    description: lab.frontmatter.summary,
    openGraph: {
      title: lab.frontmatter.title,
      description: lab.frontmatter.summary,
      type: 'article',
    },
  };
}

export default async function LabDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  if (!lab) notFound();

  const relatedLabs = getRelatedLabs(slug, lab?.frontmatter?.tags ?? []);

  return (
    <LabDetailClient
      lab={lab}
      relatedLabs={relatedLabs}
    />
  );
}
