import Link from 'next/link';
import { solutions } from '@/content/solutions';
import { image } from '@/content/images';
import { Words } from '@/components/ui/Words';
import { KnightArrow } from '@/components/ui/Cta';

/** Retícula tipo "bento": cuatro tarjetas de distinto peso; cada una lleva a su solución. */
export function Solutions() {
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

        <ul className="bento">
          {solutions.map((s, i) => (
            <li key={s.slug} className={`bento__item bento__item--${i + 1}`} data-reveal="up" style={{ '--i': i % 2 } as React.CSSProperties}>
              <Link href={`/soluciones/${s.slug}`} className="tile" data-cursor="Ver" data-track={`cta_solution_${s.slug}`}>
                {i !== 0 && <img className="tile__img" src={image(s.image).src} alt="" loading="lazy" decoding="async" />}
                <span className="tile__top">
                  <span className="tile__num">{s.number}</span>
                  <span className="tile__go" aria-hidden="true"><KnightArrow /></span>
                </span>
                <span className="tile__body">
                  <span className="tile__name">{s.name}</span>
                  <span className="tile__for">{s.forWhom}</span>
                  <span className="tile__quote">{s.quote}</span>
                  <span className="tile__caps">
                    {s.capabilities.slice(0, 4).map((c) => <span key={c.name}>{c.name}</span>)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
