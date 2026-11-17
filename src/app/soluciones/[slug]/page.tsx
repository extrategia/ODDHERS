import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getSolution, solutions } from '@/content/solutions';
import { challenges } from '@/content/challenges';
import { methodSteps } from '@/content/method';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return { title: s.name, description: `${s.forWhom} ${s.description}`, alternates: { canonical: `/soluciones/${s.slug}/` } };
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const related = challenges.filter((c) => c.solutions.includes(s.slug));
  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Inicio', path: '/' }, { name: 'Soluciones', path: '/soluciones/' }, { name: s.name, path: `/soluciones/${s.slug}/` }]} />
      <PageHero label={`Solución ${s.number}`} title={s.name} lead={s.forWhom}>
        <p className="page-hero__quote" data-reveal="up">&ldquo;{s.quote}&rdquo;</p>
      </PageHero>

      <section className="section" data-theme="light">
        <div className="container detail">
          <div className="detail__intro" data-reveal="up">
            <p className="label"><span className="tick" aria-hidden="true" /> Qué resolvemos</p>
            <p className="h2 detail__lead">{s.description}</p>
            <p className="detail__outcome"><span className="label">A qué aspiramos</span>{s.outcome}</p>
          </div>

          <div className="detail__block">
            <h2 className="label"><span className="tick" aria-hidden="true" /> Capacidades</h2>
            <ul className="caps">
              {s.capabilities.map((c, i) => (
                <li key={c.name} data-reveal="up">
                  <span className="caps__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h3">{c.name}</h3>
                  <p>{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail__cols">
            <div data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Señales de que lo necesitas</h2>
              <ul className="signals">{s.signals.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Cómo lo trabajamos</h2>
              <ol className="mini-steps">
                {methodSteps.map((m) => <li key={m.number}><span>{m.number}</span>{m.title}</li>)}
              </ol>
              <Link href="/enfoque" className="ulink">Conoce el método completo</Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="detail__block" data-reveal="up">
              <h2 className="label"><span className="tick" aria-hidden="true" /> Desafíos que suele resolver</h2>
              <ul className="chips">
                {related.map((c) => (
                  <li key={c.slug}><Link className="chip" href={`/contacto?desafio=${encodeURIComponent(c.formOption)}`}>{c.title}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <nav className="detail__block" aria-label="Otras soluciones" data-reveal="up">
            <h2 className="label"><span className="tick" aria-hidden="true" /> Se conecta con</h2>
            <ul className="chips">
              {others.map((o) => <li key={o.slug}><Link className="chip" href={`/soluciones/${o.slug}`}>{o.number} · {o.name}</Link></li>)}
            </ul>
          </nav>
        </div>
      </section>
      <CtaBand cta={s.cta} />
    </>
  );
}
