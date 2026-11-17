import { difference } from '@/content/method';
import { Words } from '@/components/ui/Words';

/**
 * THE OTHER PATH
 * Dos rutas avanzan juntas. Una se detiene ante el obstáculo; la otra encuentra un recorrido alternativo.
 * Animación en CSS (se dispara con .is-in); con movimiento reducido se muestra el estado final.
 */
export function OtherPath() {
  return (
    <div className="otherpath" data-reveal="path" aria-hidden="true">
      <svg viewBox="0 0 1000 320" focusable="false">
        <g className="otherpath__grid">
          {Array.from({ length: 26 }, (_, i) => <path key={`v${i}`} d={`M${i * 40} 0V320`} />)}
          {Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 40}H1000`} />)}
        </g>
        <rect className="otherpath__wall" x="560" y="40" width="40" height="240" />
        <path className="otherpath__a" d="M40 120H548" pathLength={1} />
        <rect className="otherpath__stop" x="540" y="112" width="16" height="16" />
        <path className="otherpath__b" d="M40 200H440V300H680V160H920" pathLength={1} />
        <rect className="otherpath__start" x="32" y="112" width="16" height="16" />
        <rect className="otherpath__start" x="32" y="192" width="16" height="16" />
        <g className="otherpath__goal">
          <rect x="900" y="140" width="40" height="40" />
          <rect x="912" y="152" width="16" height="16" />
        </g>
        <text className="otherpath__label" x="40" y="100">Ruta convencional</text>
        <text className="otherpath__label otherpath__label--b" x="40" y="236">Otra ruta</text>
      </svg>
    </div>
  );
}

export function DifferenceTable() {
  return (
    <div className="versus" data-reveal="up">
      <div className="versus__col versus__col--a">
        <p className="label">Enfoque convencional</p>
        <ul>{difference.conventional.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="versus__col versus__col--b">
        <p className="label">Enfoque ODDHERS</p>
        <ul>{difference.oddhers.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

export function Difference() {
  return (
    <section className="section difference" data-theme="light" aria-labelledby="diferencia-title">
      <div className="container">
        <header className="section-head">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 06 — Diferenciación</p>
          <h2 id="diferencia-title" className="h1" data-reveal="words">
            <Words text="No somos otra agencia. _Y no queremos parecernos a una._" />
          </h2>
        </header>
        <OtherPath />
        <DifferenceTable />
        <p className="difference__note" data-reveal="up">
          No es una crítica a nadie: es una decisión sobre cómo queremos trabajar.
        </p>
      </div>
    </section>
  );
}
