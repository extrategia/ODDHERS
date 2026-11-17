import { site } from '@/config/site';
import { solutions } from '@/content/solutions';

/** Datos estructurados de la organización (SEO local: León, Guanajuato, México). */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}${site.basePath}/brand/oddhers-sello.png`,
    image: `${site.url}${site.basePath}/og.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: [{ '@type': 'City', name: 'León' }, { '@type': 'State', name: 'Guanajuato' }, { '@type': 'Country', name: 'México' }],
    ...(site.contact.whatsapp ? { telephone: `+${site.contact.whatsapp}` } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    sameAs: [site.contact.instagram, site.contact.facebook].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Soluciones',
      itemListElement: solutions.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.description, url: `${site.url}${site.basePath}/soluciones/${s.slug}/` },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${site.basePath}${it.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
