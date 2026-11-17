'use client';

import { useState } from 'react';
import { solutions } from '@/content/solutions';
import { Cta } from '@/components/ui/Cta';
import { Glyph } from '@/components/ui/Glyph';
import { Words } from '@/components/ui/Words';

/**
 * Acordeón cinematográfico: cuatro paneles que se expanden.
 * Escritorio: horizontales (clic, teclado o hover). Móvil: verticales, con control táctil claro.
 */
export function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section className="section solutions" data-theme="dark" aria-labelledby="soluciones-title">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 03 — Soluciones</p>
            <h2 id="soluciones-title" className="h1" data-reveal="words">
              <Words text="Cuatro frentes. _Un mismo criterio._" />
            </h2>
          </div>
          <p className="lead" data-reveal="up">
            No vendemos piezas sueltas. Cada solución responde a un tipo de problema y se conecta con las demás cuando tu negocio lo necesita.
          </p>
        </header>

        <div className="panels" data-reveal="up">
          {solutions.map((s, i) => {
            const open = i === active;
            return (
              <article
                key={s.slug}
                className={`panel${open ? ' is-open' : ''}`}
                onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) setActive(i); }}
              >
                <h3 className="panel__heading">
                  <button
                    type="button"
                    className="panel__tab"
                    aria-expanded={open}
                    aria-controls={`panel-${s.slug}`}
                    id={`tab-${s.slug}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="panel__num">{s.number}</span>
                    <span className="panel__name">{s.name}</span>
                    <span className="panel__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="panel__body" id={`panel-${s.slug}`} role="region" aria-labelledby={`tab-${s.slug}`} inert={!open}>
                  <div className="panel__content">
                    <div className="panel__main">
                      <p className="panel__for">{s.forWhom}</p>
                      <p className="panel__quote">&ldquo;{s.quote}&rdquo;</p>
                      <p className="panel__desc">{s.description}</p>
                      <Cta href={`/soluciones/${s.slug}`} variant="ghost" track={`cta_solution_${s.slug}`}>{s.cta}</Cta>
                    </div>
                    <div className="panel__side">
                      <Glyph kind={s.glyph} />
                      <ul className="panel__caps">
                        {s.capabilities.map((c) => <li key={c.name}>{c.name}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
