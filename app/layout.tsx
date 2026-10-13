import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://avarthusdevcloud.cloud'),
  title: {
    default: 'avarthusdevcloud.cloud — Azure Cloud & IAM Engineer',
    template: '%s | avarthusdevcloud.cloud'
  },
  description: 'Azure Cloud & IAM Engineer specializing in AKS, Terraform, CI/CD, Entra ID, and Keycloak. Hands-on labs, case studies, and cloud security expertise.',
  openGraph: {
    type: 'website',
    siteName: 'avarthusdevcloud.cloud',
    title: 'avarthusdevcloud.cloud — Azure Cloud & IAM Engineer',
    description: 'Azure Cloud & IAM Engineer specializing in AKS, Terraform, CI/CD, Entra ID, and Keycloak.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
        <script defer data-domain="avarthusdevcloud.cloud" src="https://plausible.io/js/script.js" />
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
