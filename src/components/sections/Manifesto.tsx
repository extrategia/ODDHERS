'use client';

import { useEffect, useRef } from 'react';
import { manifesto } from '@/content/method';
import { Words } from '@/components/ui/Words';

const COLS = 16;
const ROWS = 9;
/** Cadena de movimientos legales del caballo que atraviesa la retícula. */
const NODES: [number, number][] = [[1, 7], [3, 6], [4, 4], [6, 5], [8, 4], [9, 2], [11, 3], [13, 2], [14, 0]];
const P = (c: [number, number]) => `${c[0] * 100 + 50} ${c[1] * 100 + 50}`;
const ROUTE = NODES.slice(1).reduce((d, b, i) => {
  const a = NODES[i];
  const corner: [number, number] = Math.abs(b[0] - a[0]) === 2 ? [b[0], a[1]] : [a[0], b[1]];
  return `${d}L${P(corner)}L${P(b)}`;
}, `M${P(NODES[0])}`);

/**
 * BREAK THE PATTERN
 * Una retícula ordenada; la trayectoria del caballo la cruza y las casillas cercanas rompen el patrón.
 * El avance del scroll dibuja la ruta y va encendiendo el manifiesto. No hay "pin": el scroll nunca se secuestra.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const route = el.querySelector<SVGPathElement>('.pattern__route')!;
        const lines = gsap.utils.toArray<HTMLElement>('.manifesto__line');
        const cells = gsap.utils.toArray<SVGRectElement>('.pattern__cell');
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 85%', scrub: 0.6 },
        });
        tl.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: NODES.length - 1 }, 0);
        cells.forEach((cell) => {
          const cx = Number(cell.dataset.x), cy = Number(cell.dataset.y);
          let best = Infinity, at = 0;
          NODES.forEach((n, i) => {
            const d = Math.hypot(n[0] - cx, n[1] - cy);
            if (d < best) { best = d; at = i; }
          });
          if (best > 1.6) return;
          const hit = best === 0;
          tl.to(cell, {
            rotation: hit ? 45 : 45 * (1 - best / 2),
            scale: hit ? 3.2 : 1 + (1.6 - best),
            x: (cx - NODES[at][0]) * 14,
            y: (cy - NODES[at][1]) * 14,
            fill: hit ? '#C8FF3D' : 'rgba(245,245,240,0.55)',
            transformOrigin: '50% 50%',
            duration: 0.8,
            ease: 'power2.out',
          }, Math.max(0, at - 0.3));
        });
        gsap.set(lines, { opacity: 0.16 });
        lines.forEach((line, i) => {
          tl.to(line, { opacity: 1, duration: 1.1, ease: 'power1.out' }, 0.6 + i * 1.25);
        });
      }, el);
    })();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section ref={root} className="section manifesto" data-theme="dark" data-tone="deep" aria-labelledby="manifesto-title">
      <svg className="pattern" viewBox={`0 0 ${COLS * 100} ${ROWS * 100}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const x = i % COLS, y = Math.floor(i / COLS);
          return <rect key={i} className="pattern__cell" data-x={x} data-y={y} x={x * 100 + 45} y={y * 100 + 45} width="10" height="10" />;
        })}
        <path className="pattern__route" d={ROUTE} pathLength={1} />
      </svg>

      <div className="container manifesto__inner">
        <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 02 — Manifiesto</p>
        <h2 id="manifesto-title" className="display manifesto__title" data-reveal="words">
          <Words text="We don’t think like _the others._" />
        </h2>
        <div className="manifesto__text">
          {manifesto.map((line) => (
            <p key={line} className="manifesto__line">{line}</p>
          ))}
        </div>
        <p className="manifesto__close" data-reveal="clip">
          <span>No seguimos el juego. <span className="hl">Cambiamos la forma de jugar.</span></span>
        </p>
      </div>
    </section>
  );
}
