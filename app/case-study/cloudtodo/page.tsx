import type { Metadata } from 'next';
import { CloudTodoClient } from './_components/cloudtodo-client';

export const metadata: Metadata = {
  title: 'Case Study: CloudTodo',
  description: 'Production-grade Spring Boot application on AKS with App Gateway, ACR, Azure Monitor, ArgoCD, and Terraform.',
};

export default function CloudTodoPage() {
  return <CloudTodoClient />;
}
