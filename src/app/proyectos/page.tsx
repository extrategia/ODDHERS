import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { ProjectGrid } from '@/components/sections/Work';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Experiencia de ODDHERS en el sector inmobiliario, calzado, moda y comunicación política.',
  alternates: { canonical: '/proyectos/' },
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        label="Proyectos"
        title="Las ideas importan. _Lo que logran, más._"
        lead="Estas son las industrias en las que hemos trabajado desde nuestra etapa como ExtrategIA. Publicamos nombres, piezas y cifras únicamente con autorización de cada cliente."
      />
      <section className="section work" data-theme="dark" data-tone="deep">
        <div className="container">
          <ProjectGrid />
        </div>
      </section>
      <CtaBand title="¿Tu industria no está aquí? _Mejor: llegamos sin fórmulas._" cta="Hablemos de tu negocio" />
    </>
  );
}
