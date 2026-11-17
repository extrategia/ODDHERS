'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

/**
 * Sistema de movimiento global (un solo componente cliente):
 *  1. Revelaciones: añade .is-in a cada [data-reveal] cuando entra al viewport.
 *  2. Botones magnéticos discretos en [data-magnetic] (solo con puntero fino).
 *  3. Cursor contextual: un anillo que acompaña al cursor del sistema, nunca lo sustituye.
 *  4. Medición de clics en [data-track] (solo si hay analítica y consentimiento).
 * Con prefers-reduced-motion todo el contenido se muestra de inmediato y no hay cursor ni imán.
 */
export function MotionRoot() {
  const pathname = usePathname();
  const ring = useRef<HTMLDivElement>(null);

  // 1. Revelaciones
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // 2–4. Puntero
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
      if (t?.dataset.track) track(t.dataset.track);
    };
    document.addEventListener('click', onClick);

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return () => document.removeEventListener('click', onClick);

    const el = ring.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, shown = false;
    let magnet: HTMLElement | null = null;

    const frame = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; el.classList.add('is-on'); }
      if (!raf) raf = requestAnimationFrame(frame);

      const target = e.target as HTMLElement;
      const interactive = target.closest?.('a, button, [role="button"], input, select, textarea, label, summary');
      el.classList.toggle('is-hover', !!interactive);

      const m = target.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (magnet && magnet !== m) { magnet.style.transform = ''; }
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        m.style.transform = `translate3d(${dx * 8}px,${dy * 6}px,0)`;
      }
    };
    const onLeave = () => { el.classList.remove('is-on'); shown = false; if (magnet) magnet.style.transform = ''; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
}
