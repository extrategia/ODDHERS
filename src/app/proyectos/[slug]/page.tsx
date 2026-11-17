import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ProjectCover } from '@/components/sections/Work';
import { getProject, projects } from '@/content/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.industry}: ${p.title}`, description: p.summary, alternates: { canonical: `/proyectos/${p.slug}/` } };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Inicio', path: '/' }, { name: 'Proyectos', path: '/proyectos/' }, { name: p.industry, path: `/proyectos/${p.slug}/` }]} />
      <PageHero label={`Experiencia ${p.number} · ${p.industry}`} title={p.title} lead={p.summary} />
      <section className="section" data-theme="light">
        <div className="container case">
          <div className="case__cover cover cover--static" data-reveal="clip"><ProjectCover project={p} /></div>
          <dl className="case__facts" data-reveal="up">
            <div><dt className="label">Cliente</dt><dd>{p.client ?? 'Confidencial'}</dd></div>
            <div><dt className="label">Industria</dt><dd>{p.industry}</dd></div>
            <div><dt className="label">Servicios</dt><dd>{p.services.join(' · ')}</dd></div>
          </dl>
          <div className="case__body">
            <div data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Desafío inicial</h2>
              <p className="h3">{p.challenge}</p>
            </div>
            <div data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Solución implementada</h2>
              <p className="h3">{p.solution}</p>
            </div>
          </div>
          {p.results.length > 0 ? (
            <div className="case__results" data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Resultados</h2>
              <ul>{p.results.map((r) => <li key={r.label}><strong>{r.value}</strong><span>{r.label}</span></li>)}</ul>
            </div>
          ) : (
            <p className="case__note" data-reveal="up">
              Los resultados de este trabajo pertenecen a nuestros clientes. Con gusto los comentamos en una conversación, con su autorización.
            </p>
          )}
          <Link href={`/proyectos/${next.slug}`} className="case__next" data-reveal="up">
            <span className="label">Siguiente</span>
            <span className="h2">{next.industry} <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>
      <CtaBand cta="Hablemos de tu negocio" />
    </>
  );
}
