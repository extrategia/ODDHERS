'use client';

import { useEffect, useRef, useState } from 'react';
import { methodSteps } from '@/content/method';
import { KNIGHT_PATH } from '@/lib/knight-shape';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';

/** Cuatro casillas unidas por tres movimientos de caballo: la ruta nunca es una línea recta. */
const NODES: [number, number][] = [[0, 3], [2, 2], [3, 0], [5, 1]];
const P = (c: [number, number]) => `${c[0] * 100 + 50} ${c[1] * 100 + 50}`;
const ROUTE = NODES.slice(1).reduce((d, b, i) => {
  const a = NODES[i];
  const corner: [number, number] = Math.abs(b[0] - a[0]) === 2 ? [b[0], a[1]] : [a[0], b[1]];
  return `${d}L${P(corner)}L${P(b)}`;
}, `M${P(NODES[0])}`);

/**
 * THE KNIGHT'S MOVE
 * La trayectoria avanza conforme se leen los pasos (el paso más cercano al centro de la pantalla manda).
 */
export function Method({ showCta = true }: { showCta?: boolean }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section method" data-theme="light" aria-labelledby="metodo-title">
      <div className="container">
        <header className="section-head">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 04 — Método ODDHERS</p>
          <h2 id="metodo-title" className="h1" data-reveal="words">
            <Words text="El pensamiento diferente _también tiene método._" />
          </h2>
        </header>

        <div className="method__grid">
          <div className="method__visual" aria-hidden="true">
            <div className="board board--method">
              <svg viewBox="0 0 600 400" focusable="false">
                <g className="board__grid">
                  {Array.from({ length: 7 }, (_, i) => <path key={`v${i}`} d={`M${i * 100} 0V400`} />)}
                  {Array.from({ length: 5 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100}H600`} />)}
                </g>
                <path className="board__route board__route--ghost" d={ROUTE} />
                <path className="board__route board__route--progress" d={ROUTE} pathLength={3} style={{ strokeDashoffset: 3 - active }} />
                {NODES.map((n, i) => (
                  <g key={i} className={`board__node${i <= active ? ' is-on' : ''}${i === active ? ' is-current' : ''}`} transform={`translate(${n[0] * 100} ${n[1] * 100})`}>
                    <rect x="6" y="6" width="88" height="88" />
                    <text x="14" y="28">{methodSteps[i].number}</text>
                  </g>
                ))}
                <g className="board__piece" style={{ transform: `translate(${NODES[active][0] * 100}px, ${NODES[active][1] * 100}px)` }}>
                  <g transform="translate(30 22) scale(0.064)"><path d={KNIGHT_PATH} /></g>
                </g>
              </svg>
            </div>
          </div>

          <ol className="method__steps">
            {methodSteps.map((s, i) => (
              <li
                key={s.number}
                ref={(el) => { steps.current[i] = el; }}
                data-index={i}
                className={`step${i === active ? ' is-current' : ''}`}
              >
                <p className="step__meta"><span className="step__num">{s.number}</span><span className="label">{s.name}</span></p>
                <h3 className="h3">{s.title}</h3>
                <p className="step__body">{s.body}</p>
                <p className="step__out"><span className="label">Qué recibes</span>{s.output}</p>
              </li>
            ))}
          </ol>
        </div>
        {showCta && (
          <div className="section-foot" data-reveal="up">
            <Cta href="/enfoque" variant="ghost">Mira cómo trabajamos</Cta>
          </div>
        )}
      </div>
    </section>
  );
}
