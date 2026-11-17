import { methodSteps } from '@/content/method';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';
import { KNIGHT_PATH, KNIGHT_VIEWBOX } from '@/lib/knight-shape';

/**
 * THE KNIGHT'S MOVE
 * Cuatro tarjetas que se apilan al hacer scroll (position: sticky, sin secuestrar el scroll).
 * En cada una, el caballo avanza una casilla más en su ruta en L.
 */
const NODES: [number, number][] = [[0, 3], [2, 2], [3, 0], [5, 1]];
const P = (c: [number, number]) => `${c[0] * 100 + 50} ${c[1] * 100 + 50}`;
function routeTo(n: number) {
  let d = `M${P(NODES[0])}`;
  for (let i = 1; i <= n; i++) {
    const a = NODES[i - 1], b = NODES[i];
    const corner: [number, number] = Math.abs(b[0] - a[0]) === 2 ? [b[0], a[1]] : [a[0], b[1]];
    d += `L${P(corner)}L${P(b)}`;
  }
  return d;
}

export function Method({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="section method" data-theme="light" aria-labelledby="metodo-title">
      <div className="container">
        <header className="section-head">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 04 — Método ODDHERS</p>
          <h2 id="metodo-title" className="h1" data-reveal="words">
            <Words text="El pensamiento diferente _también tiene método._" />
          </h2>
        </header>

        <ol className="stack">
          {methodSteps.map((s, i) => (
            <li key={s.number} className={`stack__card stack__card--${i + 1}`} style={{ '--n': i } as React.CSSProperties}>
              <div className="stack__head">
                <span className="stack__num">{s.number}</span>
                <span className="label">{s.name}</span>
              </div>
              <div className="stack__body">
                <h3 className="h2">{s.title}</h3>
                <p>{s.body}</p>
                <p className="stack__out"><span className="label">Qué recibes</span>{s.output}</p>
              </div>
              <svg className="stack__board" viewBox="0 0 600 400" aria-hidden="true" focusable="false">
                <g className="stack__grid">
                  {Array.from({ length: 7 }, (_, k) => <path key={`v${k}`} d={`M${k * 100} 0V400`} />)}
                  {Array.from({ length: 5 }, (_, k) => <path key={`h${k}`} d={`M0 ${k * 100}H600`} />)}
                </g>
                {i > 0 && <path className="stack__route" d={routeTo(i)} />}
                {NODES.map((n, k) => (
                  <rect key={k} className={`stack__node${k <= i ? ' is-on' : ''}`} x={n[0] * 100 + 38} y={n[1] * 100 + 38} width="24" height="24" rx="5" />
                ))}
                <g transform={`translate(${NODES[i][0] * 100} ${NODES[i][1] * 100})`}>
                  <rect className="stack__cell" x="6" y="6" width="88" height="88" rx="12" />
                  <svg x="30" y="20" width="40" height="60" viewBox={KNIGHT_VIEWBOX}><path className="stack__knight" d={KNIGHT_PATH} /></svg>
                </g>
              </svg>
            </li>
          ))}
        </ol>
        {showCta && (
          <div className="section-foot" data-reveal="up">
            <Cta href="/enfoque" variant="ghost">Mira cómo trabajamos</Cta>
          </div>
        )}
      </div>
    </section>
  );
}
