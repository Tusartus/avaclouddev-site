export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Azure Cloud',
    color: '#0078d4',
    skills: [
      'AKS', 'Azure Networking', 'App Gateway', 'ACR', 'Key Vault',
      'Workload Identity', 'Azure Monitor', 'Entra ID', 'Azure Policy',
      'RBAC', 'Management Groups', 'Cost Management'
    ]
  },
  {
    name: 'IaC & Automation',
    color: '#7b42bc',
    skills: ['Terraform', 'Bicep', 'Azure CLI', 'Python scripting']
  },
  {
    name: 'CI/CD & GitOps',
    color: '#f97316',
    skills: ['GitHub Actions (OIDC)', 'Azure Pipelines', 'Jenkins', 'ArgoCD', 'Docker']
  },
  {
    name: 'Identity & Backend',
    color: '#10b981',
    skills: ['Java Spring Boot', 'OAuth2/OIDC', 'Keycloak', 'Entra ID integration']
  },
  {
    name: 'Frontend (supporting)',
    color: '#6366f1',
    skills: ['Angular', 'React', 'Next.js']
  }
];

export const certifications = [
  {
    name: 'AZ-104: Azure Administrator Associate',
    issuer: 'Microsoft',
    year: 2023,
    status: 'expired' as const,
    note: 'Earned 2023 — expired. Renewal planned.'
  },
  {
    name: 'AZ-400: Azure DevOps Engineer Expert',
    issuer: 'Microsoft',
    year: 2023,
    status: 'expired' as const,
    note: 'Earned 2023 — expired. Renewal planned.'
  },
  {
    name: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    year: null,
    status: 'planned' as const,
    note: '[PLANNED — Target 2024]'
  }
];
