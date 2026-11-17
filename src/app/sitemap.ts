import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { solutions } from '@/content/solutions';
import { projects } from '@/content/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${site.url}${site.basePath}`;
  const paths = [
    '/', '/soluciones/', '/enfoque/', '/proyectos/', '/nosotros/', '/contacto/', '/aviso-de-privacidad/',
    ...solutions.map((s) => `/soluciones/${s.slug}/`),
    ...projects.map((p) => `/proyectos/${p.slug}/`),
  ];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.7 }));
}
