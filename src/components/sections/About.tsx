import { asset } from '@/config/site';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';

export function NameOrigin() {
  return (
    <dl className="origin" data-reveal="up">
      <div>
        <dt>Odd</dt>
        <dd>Extraño, inusual, inesperado. Fuera de lo ordinario.</dd>
      </div>
      <div>
        <dt>Others</dt>
        <dd>Los otros. Quienes piensan diferente y no siguen el camino establecido.</dd>
      </div>
      <div className="origin__sum">
        <dt>Oddhers</dt>
        <dd>Quienes encuentran posibilidades donde otros solo ven limitaciones.</dd>
      </div>
    </dl>
  );
}

export function About() {
  return (
    <section className="section about" data-theme="light" aria-labelledby="nosotros-title">
      <div className="container about__grid">
        <div className="about__main">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 08 — Sobre ODDHERS</p>
          <h2 id="nosotros-title" className="h1" data-reveal="words">
            <Words text="No empezamos con una fórmula. Empezamos con una pregunta: _¿y si existe otra manera?_" />
          </h2>
          <div className="about__text" data-reveal="up">
            <p>
              ODDHERS nace de ExtrategIA, una agencia de marketing digital. Con el tiempo entendimos que lo valioso no eran las publicaciones ni las campañas, sino las preguntas que hacíamos antes de producirlas.
            </p>
            <p>
              No cambiamos de nombre: cambiamos de ambición. Hoy trabajamos como un socio creativo y estratégico que primero entiende el negocio y después decide qué construir.
            </p>
          </div>
          <NameOrigin />
          <div data-reveal="up"><Cta href="/nosotros" variant="ghost">Conoce ODDHERS</Cta></div>
        </div>
        <div className="about__seal" data-reveal="up">
          <img src={asset('/brand/oddhers-sello.png')} alt="Sello de ODDHERS: caballo de ajedrez con la leyenda Jake Mate. Otras ideas. Otra estrategia." width={610} height={610} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
