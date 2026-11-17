import type { Metadata } from 'next';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos qué quieres lograr. Escríbenos por WhatsApp o déjanos tu desafío en el formulario.',
  alternates: { canonical: '/contacto/' },
};

export default function ContactoPage() {
  return <div className="contact-page"><FinalCta heading="h1" /></div>;
}
