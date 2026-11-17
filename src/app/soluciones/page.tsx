import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { Glyph } from '@/components/ui/Glyph';
import { KnightArrow } from '@/components/ui/Cta';
import { solutions } from '@/content/solutions';

export const metadata: Metadata = {
  title: 'Soluciones',
  description: 'Brand & Strategy, Content & Experience, Performance & Growth y AI & Optimization: cuatro frentes para resolver problemas reales de negocio.',
  alternates: { canonical: '/soluciones/' },
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        label="Soluciones"
        title="Primero tu necesidad. _Después nuestra capacidad para resolverla._"
        lead="Organizamos lo que hacemos alrededor de cuatro tipos de problema. Elige el que se parece al tuyo; si no estás seguro, empezamos por un diagnóstico."
      />
      <section className="section" data-theme="light">
        <div className="container">
          <ul className="index-list">
            {solutions.map((s) => (
              <li key={s.slug} data-reveal="up">
                <Link href={`/soluciones/${s.slug}`} className="index-row">
                  <span className="index-row__num">{s.number}</span>
                  <span className="index-row__main">
                    <span className="h2">{s.name}</span>
                    <span className="index-row__for">{s.forWhom}</span>
                    <span className="index-row__caps">{s.capabilities.map((c) => c.name).join(' · ')}</span>
                  </span>
                  <span className="index-row__glyph"><Glyph kind={s.glyph} /></span>
                  <span className="index-row__go" aria-hidden="true"><KnightArrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="¿No sabes cuál necesitas? _Esa también es una respuesta._" cta="Empecemos por un diagnóstico" href="/contacto?desafio=Necesito%20orientaci%C3%B3n" />
    </>
  );
}
