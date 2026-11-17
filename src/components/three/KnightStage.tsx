'use client';

import { useEffect, useRef, useState } from 'react';
import { KnightMark } from '@/components/ui/KnightMark';
import type { KnightSceneApi } from './knightScene';

/**
 * Contenedor de la escena 3D del hero.
 * - Carga Three.js de forma diferida (no bloquea el primer render ni el LCP).
 * - Sin WebGL o sin JavaScript queda visible el caballo SVG del logotipo.
 * - El render se pausa cuando el hero sale de pantalla o la pestaña se oculta.
 */
export function KnightStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<KnightSceneApi | null>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const total = 4;

  useEffect(() => {
    let cancelled = false;
    let visible = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = async () => {
      try {
        const { createKnightScene } = await import('./knightScene');
        if (cancelled || !canvas.current) return;
        api.current = createKnightScene(canvas.current, { reduced, onMove: (i) => setStep(i + 1) });
        api.current.setRunning(visible && !document.hidden);
        setReady(true);
      } catch {
        /* Sin WebGL: se queda el SVG. */
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 400);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      api.current?.setRunning(visible && !document.hidden);
    });
    if (wrap.current) io.observe(wrap.current);
    const onVis = () => api.current?.setRunning(visible && !document.hidden);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof idle === 'number') window.cancelIdleCallback(idle);
      window.clearTimeout(idle as number);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  return (
    <div ref={wrap} className={`stage${ready ? ' is-ready' : ''}`}>
      <div className="stage__fallback" aria-hidden="true">
        <KnightMark />
      </div>
      <canvas ref={canvas} className="stage__canvas" aria-hidden="true" />
      <div className="stage__ui">
        <p className="stage__caption">
          <span className="label">The unexpected move</span>
          <span className="stage__count" aria-hidden="true">
            {String(step).padStart(2, '0')} <i /> {String(total).padStart(2, '0')}
          </span>
        </p>
        <button
          type="button"
          className="stage__btn"
          onClick={() => api.current?.move()}
          disabled={!ready}
          aria-label="Mover el caballo: ver otro movimiento inesperado"
        >
          <span>Haz otro movimiento</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 12.5h8.5V3M6.6 6.6 10.5 2.7l3.9 3.9" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
      </div>
    </div>
  );
}
