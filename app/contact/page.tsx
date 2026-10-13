import type { Metadata } from 'next';
import { ContactClient } from './_components/contact-client';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for cloud engineering projects, freelance work, or collaboration.',
};

export default function ContactPage() {
  return <ContactClient />;
}
