import Link from 'next/link';
import { Github, Linkedin, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-bold text-sm text-foreground">avarthusdevcloud</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/labs" className="hover:text-foreground transition-colors">Labs</Link>
            <Link href="/skills" className="hover:text-foreground transition-colors">Skills</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Tusartus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Built and deployed on Azure — <a href="https://github.com/Tusartus/avaclouddev-site" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">source on GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
