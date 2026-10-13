import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (!minutes) return '0 min';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export const tagLabels: Record<string, string> = {
  aks: 'AKS',
  terraform: 'Terraform',
  cicd: 'CI/CD',
  'security-iam': 'Security/IAM',
  governance: 'Governance',
  cost: 'Cost',
  backend: 'Backend',
};

export const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const statusColors: Record<string, string> = {
  published: 'bg-green-500/10 text-green-400',
  draft: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-yellow-500/10 text-yellow-400',
};
