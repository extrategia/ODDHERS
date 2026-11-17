import { aiStages } from '@/content/ai';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';

export function Ai() {
  return (
    <section className="section ai" data-theme="dark" aria-labelledby="ia-title">
      <div className="container">
        <div className="ai__top">
          <header className="section-head">
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 07 — Inteligencia artificial</p>
            <h2 id="ia-title" className="h1" data-reveal="words">
              <Words text="La inteligencia artificial no es nuestra idea. _Es una de nuestras herramientas._" />
            </h2>
            <p className="lead" data-reveal="up">
              Utilizamos tecnología para analizar mejor, acelerar procesos y descubrir oportunidades. Pero las decisiones importantes siempre necesitan criterio, creatividad y estrategia.
            </p>
          </header>

          <figure className="ai__diagram" data-reveal="path">
            <svg viewBox="0 0 400 360" role="img" aria-labelledby="ai-diagram-title" focusable="false">
              <title id="ai-diagram-title">Criterio humano, datos y tecnología se conectan para llegar a una decisión.</title>
              <g className="ai__links">
                <path d="M200 60 200 190" /><path d="M60 300 200 190" /><path d="M340 300 200 190" />
              </g>
              <g className="ai__frame"><path d="M200 60 60 300H340Z" /></g>
              <g className="ai__flow">
                <path d="M200 60 200 190" /><path d="M60 300 200 190" /><path d="M340 300 200 190" />
              </g>
              <rect className="ai__core" x="176" y="166" width="48" height="48" transform="rotate(45 200 190)" />
              <g className="ai__node"><rect x="188" y="48" width="24" height="24" /><text x="200" y="32" textAnchor="middle">Criterio</text></g>
              <g className="ai__node"><rect x="48" y="288" width="24" height="24" /><text x="60" y="340" textAnchor="middle">Datos</text></g>
              <g className="ai__node"><rect x="328" y="288" width="24" height="24" /><text x="340" y="340" textAnchor="middle">Tecnología</text></g>
              <text className="ai__core-label" x="200" y="252" textAnchor="middle">Decisión</text>
            </svg>
          </figure>
        </div>

        <ol className="ai__stages">
          {aiStages.map((s, i) => (
            <li key={s.key} className={`ai__stage ai__stage--${s.key}`} data-reveal="up" style={{ '--i': i } as React.CSSProperties}>
              <p className="ai__stage-label"><span className="ai__dot" aria-hidden="true" />{s.label}</p>
              <h3 className="h3">{s.title}</h3>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </li>
          ))}
        </ol>
        <div className="section-foot" data-reveal="up">
          <Cta href="/soluciones/ai-optimization" variant="ghost">Conoce nuestras soluciones de IA</Cta>
        </div>
      </div>
    </section>
  );
}
