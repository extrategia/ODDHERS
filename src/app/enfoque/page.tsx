import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { Method } from '@/components/sections/Method';
import { DifferenceTable, OtherPath } from '@/components/sections/Difference';
import { manifesto } from '@/content/method';

export const metadata: Metadata = {
  title: 'Nuestro enfoque',
  description: 'Cómo trabaja ODDHERS: entender, cuestionar, crear y medir. Un método de cuatro etapas para que el pensamiento diferente produzca resultados.',
  alternates: { canonical: '/enfoque/' },
};

export default function EnfoquePage() {
  return (
    <>
      <PageHero
        label="Nuestro enfoque"
        title="We don’t think _like the others._"
        lead="No es una pose. Es una forma de trabajar: entender antes de proponer, cuestionar antes de producir y medir antes de presumir."
      />
      <section className="section" data-theme="dark" data-tone="soft">
        <div className="container creed">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> Manifiesto</p>
          <div className="creed__text">
            {manifesto.map((l, i) => (
              <p key={l} className="h2" data-reveal="up" style={{ '--i': i } as React.CSSProperties}>{l}</p>
            ))}
          </div>
          <p className="creed__close" data-reveal="clip"><span>No seguimos el juego. <span className="hl">Cambiamos la forma de jugar.</span></span></p>
        </div>
      </section>
      <Method showCta={false} />
      <section className="section" data-theme="dark" data-tone="soft">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> Dos formas de trabajar</p>
            <h2 className="h1" data-reveal="up">El mismo punto de partida. <em className="serif-accent">Otra ruta.</em></h2>
          </header>
          <OtherPath />
          <DifferenceTable />
        </div>
      </section>
      <CtaBand cta="Exploremos tu desafío" />
    </>
  );
}
