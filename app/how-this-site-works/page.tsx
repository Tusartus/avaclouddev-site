import type { Metadata } from 'next';
import { HowThisSiteWorksClient } from './_components/how-this-site-works-client';

export const metadata: Metadata = {
  title: 'How This Site Works',
  description: 'This site is itself a lab — static Next.js site deployed to Azure Static Web Apps via GitHub Actions with OIDC.',
};

export default function HowThisSiteWorksPage() {
  return <HowThisSiteWorksClient />;
}
