'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

type Lenis = import('lenis').default;
declare global {
  interface Window { __lenis?: Lenis }
}

/** GSAP + ScrollTrigger + Lenis se cargan una sola vez, en diferido, y se comparten entre componentes. */
let enginePromise: Promise<{ gsap: typeof import('gsap').default; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> | null = null;
export function loadEngine() {
  if (!enginePromise) {
    enginePromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      g.default.registerPlugin(st.ScrollTrigger);
      return { gsap: g.default, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return enginePromise;
}

/**
 * Sistema de movimiento global:
 *  1. Scroll suave (Lenis) sincronizado con ScrollTrigger. Solo con puntero fino y sin "reducir movimiento".
 *  2. Revelaciones: .is-in en cada [data-reveal] al entrar al viewport.
 *  3. Parallax interno de imágenes [data-parallax] y giro por scroll de [data-spin].
 *  4. Cursor contextual: punto lima que crece y muestra texto en [data-cursor]. Acompaña al cursor del sistema.
 *  5. Botones magnéticos en [data-magnetic].
 *  6. Medición de clics en [data-track] (solo con analítica y consentimiento).
 */
export function MotionRoot() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  // 1. Scroll suave
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;
    let cancelled = false;
    Promise.all([import('lenis'), loadEngine()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: false });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    });
    return () => {
      cancelled = true;
      if (tick) loadEngine().then(({ gsap }) => gsap.ticker.remove(tick!));
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // 2–3. Revelaciones y parallax (se recalculan en cada página)
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    let io: IntersectionObserver | undefined;
    if (!('IntersectionObserver' in window)) els.forEach((el) => el.classList.add('is-in'));
    else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) { e.target.classList.add('is-in'); io!.unobserve(e.target); }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      );
      els.forEach((el) => io!.observe(el));
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    const onLoad = () => loadEngine().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loadEngine().then(({ gsap }) => {
        if (cancelled) return;
        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
            gsap.fromTo(el, { yPercent: -9 }, {
              yPercent: 9, ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            });
          });
          gsap.utils.toArray<HTMLElement>('[data-spin]').forEach((el) => {
            gsap.to(el, { rotation: 220, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
          });
        });
      });
      window.addEventListener('load', onLoad);
    }
    return () => { cancelled = true; io?.disconnect(); ctx?.revert(); window.removeEventListener('load', onLoad); };
  }, [pathname]);

  // 4–6. Puntero
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
      if (t?.dataset.track) track(t.dataset.track);
    };
    document.addEventListener('click', onClick);

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return () => document.removeEventListener('click', onClick);

    const el = cursor.current!;
    const text = label.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, shown = false;
    let magnet: HTMLElement | null = null;

    const frame = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; el.classList.add('is-on'); }
      if (!raf) raf = requestAnimationFrame(frame);

      const target = e.target as HTMLElement;
      const labelled = target.closest?.<HTMLElement>('[data-cursor]');
      const interactive = target.closest?.('a, button, [role="button"], input, select, textarea, label, summary');
      if (labelled) { text.textContent = labelled.dataset.cursor || ''; }
      el.classList.toggle('is-label', !!labelled);
      el.classList.toggle('is-hover', !labelled && !!interactive);

      const m = target.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (magnet && magnet !== m) magnet.style.transform = '';
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const k = Number(m.dataset.magnetic) || 0.25;
        m.style.transform = `translate3d(${(e.clientX - (r.left + r.width / 2)) * k}px,${(e.clientY - (r.top + r.height / 2)) * k}px,0)`;
      }
    };
    const onLeave = () => { el.classList.remove('is-on', 'is-label', 'is-hover'); shown = false; if (magnet) magnet.style.transform = ''; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={cursor} className="cursor" aria-hidden="true">
      <span ref={label} className="cursor__label" />
    </div>
  );
}
