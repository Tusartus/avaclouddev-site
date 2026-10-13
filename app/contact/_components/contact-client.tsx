'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle } from 'lucide-react';

export function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault?.();
    const subject = encodeURIComponent(`Contact from ${name ?? 'Someone'}`);
    const body = encodeURIComponent(`From: ${name ?? ''} (${email ?? ''})\n\n${message ?? ''}`);
    window?.open?.(`mailto:contact@avarthusdevcloud.cloud?subject=${subject}&body=${body}`, '_self');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Mail className="h-4 w-4" />
          <span className="text-sm font-medium">Contact</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Get In Touch
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Interested in working together or have a question about one of my labs? Reach out below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          {/* Contact Form */}
          <div className="rounded-xl bg-card border border-border/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e?.target?.value ?? '')}
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e?.target?.value ?? '')}
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e: any) => setMessage(e?.target?.value ?? '')}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell me about your project or question..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full justify-center"
              >
                {sent ? <CheckCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {sent ? 'Opening email client...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="rounded-xl bg-card border border-border/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Direct Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@avarthusdevcloud.cloud"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span suppressHydrationWarning>contact@avarthusdevcloud.cloud</span>
                </a>
                <a
                  href="https://github.com/Tusartus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  github.com/Tusartus
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  [LINKEDIN_URL]
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">Looking for</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Freelance cloud engineering projects</li>
                <li>• Contract Azure platform roles</li>
                <li>• Remote or hybrid positions in Belgium/EU</li>
                <li>• Collaboration on open-source cloud tooling</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
