import type { Metadata } from 'next';
import { WorkWithMeClient } from './_components/work-with-me-client';

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Azure cloud engineering services: AKS platform setup, Terraform IaC, CI/CD pipelines, Keycloak/Entra ID IAM, and more.',
};

export default function WorkWithMePage() {
  return <WorkWithMeClient />;
}
