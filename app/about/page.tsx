import type { Metadata } from 'next';
import { AboutClient } from './_components/about-client';

export const metadata: Metadata = {
  title: 'About',
  description: 'Cloud & IAM engineer based in Belgium, specializing in Azure, AKS, Terraform, and identity solutions.',
};

export default function AboutPage() {
  return <AboutClient />;
}
