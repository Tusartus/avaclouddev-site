import { getAllLabs } from '@/lib/mdx';
import { LabsPageClient } from './_components/labs-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Hands-on cloud engineering labs covering AKS, Terraform, CI/CD, IAM, governance, and more.',
};

export default function LabsPage() {
  const labs = getAllLabs();
  return <LabsPageClient labs={labs} />;
}
