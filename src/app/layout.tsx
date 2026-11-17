import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/sections.css';
import { site } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConsentBanner } from '@/components/layout/ConsentBanner';
import { MotionRoot } from '@/components/motion/MotionRoot';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'ODDHERS — Otras ideas. Otra estrategia.', template: '%s — ODDHERS' },
  description: site.description,
  applicationName: site.name,
  keywords: ['estrategia creativa', 'agencia de marketing en León Guanajuato', 'branding', 'Meta Ads', 'contenido para redes', 'producción de video', 'inteligencia artificial para marketing'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: site.name,
    title: 'ODDHERS — Otras ideas. Otra estrategia.',
    description: site.description,
    images: [{ url: `${site.basePath}/og.png`, width: 1200, height: 630, alt: 'ODDHERS. Otras ideas. Otra estrategia.' }],
  },
  twitter: { card: 'summary_large_image', title: 'ODDHERS — Otras ideas. Otra estrategia.', description: site.description, images: [`${site.basePath}/og.png`] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#122046', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript: solo entonces se ocultan los elementos que se revelan al hacer scroll. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <ConsentBanner />
        <MotionRoot />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
