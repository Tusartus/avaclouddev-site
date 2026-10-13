import type { Metadata } from 'next';
import { SkillsClient } from './_components/skills-client';

export const metadata: Metadata = {
  title: 'Skills & Certifications',
  description: 'Technical skills across Azure Cloud, IaC, CI/CD, Identity management, and backend development. With evidence links to labs.',
};

export default function SkillsPage() {
  return <SkillsClient />;
}
