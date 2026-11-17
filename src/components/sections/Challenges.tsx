'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { challenges } from '@/content/challenges';
import { getSolution } from '@/content/solutions';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';
import { KNIGHT_PATH } from '@/lib/knight-shape';
import { track } from '@/lib/analytics';
import { image } from '@/content/images';

const SIZE = 6;
const ORIGIN: [number, number] = [0, 5];

/** Ruta de casillas: el caballo llega al destino encadenando movimientos legales (búsqueda en anchura). */
function knightRoute(from: [number, number], to: [number, number]) {
  const key = (c: [number, number]) => `${c[0]},${c[1]}`;
  const prev = new Map<string, [number, number] | null>([[key(from), null]]);
  const queue: [number, number][] = [from];
  const jumps = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
  while (queue.length) {
    const c = queue.shift()!;
    if (c[0] === to[0] && c[1] === to[1]) break;
    for (const [dx, dy] of jumps) {
      const n: [number, number] = [c[0] + dx, c[1] + dy];
      if (n[0] < 0 || n[1] < 0 || n[0] >= SIZE || n[1] >= SIZE || prev.has(key(n))) continue;
      prev.set(key(n), c);
      queue.push(n);
    }
  }
  const cells: [number, number][] = [];
  let cur: [number, number] | null | undefined = to;
  while (cur) { cells.unshift(cur); cur = prev.get(key(cur)); }
  return cells;
}

/** Convierte la ruta de casillas en un trazo en L (primero el tramo largo, luego el corto). */
function routePath(cells: [number, number][]) {
  const p = (c: [number, number]) => `${c[0] * 100 + 50} ${c[1] * 100 + 50}`;
  let d = `M${p(cells[0])}`;
  for (let i = 1; i < cells.length; i++) {
    const a = cells[i - 1], b = cells[i];
    const corner: [number, number] = Math.abs(b[0] - a[0]) === 2 ? [b[0], a[1]] : [a[0], b[1]];
    d += `L${p(corner)}L${p(b)}`;
  }
  return d;
}

export function Challenges() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const current = challenges[active];
  const cells = knightRoute(ORIGIN, current.target);
  const d = routePath(cells);

  return (
    <section id="desafio" className="section challenges" data-theme="dark" data-tone="soft" aria-labelledby="desafio-title">
      <div className="container">
        <header className="section-head">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 01 — El problema antes que el servicio</p>
          <h2 id="desafio-title" className="h1" data-reveal="words">
            <Words text="Tu negocio tiene un desafío. _Nosotros vemos posibilidades._" />
          </h2>
          <p className="lead" data-reveal="up">
            Antes de ofrecerte un servicio, queremos entender qué está frenando tu crecimiento. Elige el que más se parece a lo que vives hoy.
          </p>
        </header>

        <div className="challenges__grid">
          <ol className="challenges__list" data-reveal="up">
            {challenges.map((c, i) => {
              const open = i === active;
              return (
                <li key={c.slug} className={`challenge${open ? ' is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-b-${i}`}
                      className="challenge__btn"
                      aria-expanded={open}
                      aria-controls={`${uid}-p-${i}`}
                      onClick={() => { setActive(i); track('challenge_select', { challenge: c.slug }); }}
                    >
                      <span className="challenge__num">{c.number}</span>
                      <span className="challenge__title">{c.title}</span>
                      <span className="challenge__mark" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`${uid}-p-${i}`} className="challenge__panel" role="region" aria-labelledby={`${uid}-b-${i}`} inert={!open}>
                    <div className="challenge__panel-inner">
                      <p className="challenge__scope">{c.scope}</p>
                      <p className="challenge__insight">{c.insight}</p>
                      <p className="challenge__body">{c.body}</p>
                      <p className="label challenge__rel-label">Por dónde empezaríamos</p>
                      <ul className="challenge__rel">
                        {c.solutions.map((slug) => {
                          const s = getSolution(slug)!;
                          return (
                            <li key={slug}>
                              <Link href={`/soluciones/${slug}`} className="chip">{s.name}</Link>
                            </li>
                          );
                        })}
                      </ul>
                      <Cta href={`/contacto?desafio=${encodeURIComponent(c.formOption)}`} variant="primary" track={`cta_challenge_${c.slug}`}>
                        {c.cta}
                      </Cta>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <aside className="challenges__visual" data-reveal="up">
            <div className="shot">
              {challenges.map((c, i) => (
                <img key={c.slug} className={`shot__img${i === active ? ' is-on' : ''}`} src={image(c.image).src} alt="" loading="lazy" decoding="async" />
              ))}
              <span className="shot__tag">Desafío {current.number}</span>
              <div className="board" aria-hidden="true">
                <svg viewBox="0 0 600 600" focusable="false">
                  <g className="board__grid">
                    {Array.from({ length: SIZE + 1 }, (_, i) => (
                      <path key={i} d={`M${i * 100} 0V600M0 ${i * 100}H600`} />
                    ))}
                  </g>
                  {/* key fuerza a reiniciar la animación del trazo al cambiar de desafío */}
                  <path key={current.slug} className="board__route" d={d} pathLength={1} />
                  {cells.slice(1, -1).map((c, i) => (
                    <rect key={`${current.slug}-${i}`} className="board__stop" x={c[0] * 100 + 38} y={c[1] * 100 + 38} width="24" height="24" />
                  ))}
                  <rect className="board__origin" x={ORIGIN[0] * 100 + 36} y={ORIGIN[1] * 100 + 36} width="28" height="28" />
                  <g className="board__knight" style={{ transform: `translate(${current.target[0] * 100}px, ${current.target[1] * 100}px)` }}>
                    <rect className="board__cell" x="4" y="4" width="92" height="92" rx="10" />
                    <g transform="translate(27 14) scale(0.072)"><path d={KNIGHT_PATH} /></g>
                  </g>
                </svg>
                <p className="board__caption">{cells.length - 1} {cells.length - 1 === 1 ? 'movimiento' : 'movimientos'} hasta una primera respuesta</p>
              </div>
            </div>
            <p className="challenges__note">
              Esto es una orientación inicial, no un diagnóstico. El diagnóstico de verdad empieza con una conversación y con tus datos.
            </p>
          </aside>
        </div>
        <p className="challenges__note challenges__note--mobile">
          Esto es una orientación inicial, no un diagnóstico. El diagnóstico de verdad empieza con una conversación y con tus datos.
        </p>
      </div>
    </section>
  );
}
