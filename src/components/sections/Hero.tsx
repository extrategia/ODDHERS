import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';
import { Marquee } from '@/components/ui/Marquee';
import { KnightStage } from '@/components/three/KnightStage';
import { site } from '@/config/site';

const services = ['Estrategia', 'Branding', 'Contenido', 'Video', 'Meta Ads', 'Google Ads', 'Inteligencia artificial'];

export function Hero() {
  return (
    <section className="hero" data-theme="dark" aria-labelledby="hero-title">
      <KnightStage />
      <div className="container hero__content">
        <p className="label hero__label" data-reveal="up">
          <span className="tick" aria-hidden="true" /> Firma de estrategia creativa · {site.location.city}, México
        </p>
        <h1 id="hero-title" className="display hero__title" data-reveal="words">
          <Words text="No necesitas ~más de lo mismo.~ Necesitas *otra forma de pensar.*" />
        </h1>
        <div className="hero__foot">
          <p className="lead hero__lead" data-reveal="up" style={{ '--i': 5 } as React.CSSProperties}>
            Combinamos estrategia, creatividad y tecnología para transformar los desafíos de tu negocio en nuevas oportunidades.
          </p>
          <div className="hero__ctas" data-reveal="up" style={{ '--i': 7 } as React.CSSProperties}>
            <Cta href="#desafio" track="cta_hero_primary">Descubre lo que podemos hacer por tu negocio</Cta>
            <Cta href="/nosotros" variant="text">Conoce ODDHERS</Cta>
          </div>
        </div>
      </div>
      <Marquee className="hero__marquee" items={services} />
    </section>
  );
}
