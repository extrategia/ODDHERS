import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { NameOrigin } from '@/components/sections/About';
import { asset, site } from '@/config/site';
import { Media } from '@/components/ui/Media';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'ODDHERS es la evolución de ExtrategIA: una firma de estrategia creativa en León, Guanajuato, que piensa distinto para resolver problemas de negocio.',
  alternates: { canonical: '/nosotros/' },
};

const team = [
  { area: 'Estrategia & IA', body: 'Diagnóstico, análisis de datos, planeación y uso de inteligencia artificial.' },
  { area: 'Branding & Contenido', body: 'Identidad visual, diseño, narrativa y comunicación de marca.' },
  { area: 'Video & Edición', body: 'Producción audiovisual, edición y animación.' },
];

const commitments = [
  { title: 'Decimos lo que pensamos.', body: 'Si creemos que una idea no va a funcionar, lo vas a saber antes de pagar por ella.' },
  { title: 'Explicamos lo que hacemos.', body: 'Sin tecnicismos para impresionar. Entiendes qué se hizo, por qué y qué resultó.' },
  { title: 'Medimos lo que importa.', body: 'Reportamos contra los objetivos de tu negocio, no contra métricas de vanidad.' },
  { title: 'No prometemos lo que no controlamos.', body: 'Nadie puede garantizar resultados. Sí podemos garantizar criterio, método y trabajo serio.' },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Nosotros"
        title="No empezamos con una fórmula. Empezamos con una pregunta: _¿y si existe otra manera?_"
      />
      <section className="section" data-theme="dark" data-tone="soft">
        <div className="container story">
          <div className="story__text">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> De ExtrategIA a ODDHERS</p>
            <p className="h2" data-reveal="up">
              Empezamos como ExtrategIA, una agencia de marketing digital: estrategia, contenido, video, pauta y los primeros usos de inteligencia artificial.
            </p>
            <div className="prose" data-reveal="up">
              <p>
                Trabajando con inmobiliarias, marcas de calzado, moda y comunicación política aprendimos algo incómodo: la mayoría de los negocios no necesitaba más publicaciones. Necesitaba que alguien cuestionara lo que estaba haciendo.
              </p>
              <p>
                ODDHERS es la respuesta a ese aprendizaje. No es un cambio de nombre: es un cambio de filosofía, de ambición y de enfoque. Dejamos de presentarnos como una agencia que ejecuta para trabajar como un socio creativo y estratégico que primero entiende y después propone.
              </p>
              <p>
                Trabajamos desde {site.location.label}, con clientes en distintas ciudades del país.
              </p>
            </div>
          </div>
          <div className="about__visual story__visual">
            <Media name="team" ratio="4 / 5" decorative />
            <img className="about__seal" data-spin="" src={asset('/brand/oddhers-sello.png')} alt="Sello de ODDHERS con el caballo de ajedrez y la leyenda Jake Mate." width={610} height={610} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" data-theme="dark">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> El nombre</p>
            <h2 className="h1" data-reveal="up">Odd + Others. <em className="serif-accent">Los otros que piensan raro.</em></h2>
            <p className="lead" data-reveal="up">
              El caballo es la única pieza del ajedrez que salta sobre las demás y no se mueve en línea recta. Por eso es nuestro símbolo: representa el pensamiento lateral y la capacidad de encontrar el movimiento que nadie esperaba.
            </p>
          </header>
          <NameOrigin />
        </div>
      </section>

      <section className="section" data-theme="dark" data-tone="soft">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> Equipo</p>
            <h2 className="h1" data-reveal="up">Tres disciplinas. <em className="serif-accent">Una sola mesa.</em></h2>
            <p className="lead" data-reveal="up">Un equipo compacto en el que estrategia, creatividad y producción trabajan juntas desde el primer día.</p>
          </header>
          <ul className="trio">
            {team.map((t, i) => (
              <li key={t.area} data-reveal="up" style={{ '--i': i } as React.CSSProperties}>
                <span className="trio__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3">{t.area}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" data-theme="dark" data-tone="deep">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> Compromiso con los clientes</p>
            <h2 className="h1" data-reveal="up">Lo que puedes <em className="serif-accent">exigirnos.</em></h2>
          </header>
          <ol className="commit">
            {commitments.map((c, i) => (
              <li key={c.title} data-reveal="up" style={{ '--i': i } as React.CSSProperties}>
                <h3 className="h3">{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand cta="Hablemos de tu negocio" />
    </>
  );
}
