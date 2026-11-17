'use client';

import { useEffect, useRef } from 'react';
import { manifesto } from '@/content/method';
import { Words } from '@/components/ui/Words';
import { Media } from '@/components/ui/Media';
import { loadEngine } from '@/components/motion/MotionRoot';

/**
 * Manifiesto con lectura guiada por el scroll: cada palabra pasa de gris a blanco conforme se avanza.
 * Sin "pin": el scroll nunca se detiene. Con movimiento reducido el texto aparece completo.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadEngine().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLElement>('.fill__w');
        gsap.fromTo(words, { opacity: 0.16 }, {
          opacity: 1, ease: 'none', stagger: 0.5,
          scrollTrigger: { trigger: '.fill', start: 'top 78%', end: 'bottom 55%', scrub: 0.5 },
        });
      }, el);
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section ref={root} className="section manifesto" data-theme="dark" data-tone="deep" aria-labelledby="manifesto-title">
      <div className="container manifesto__grid">
        <div className="manifesto__main">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 02 — Manifiesto</p>
          <h2 id="manifesto-title" className="display manifesto__title" data-reveal="words">
            <Words text="We don’t think ~like~ _the others._" />
          </h2>
          <p className="fill">
            {manifesto.join(' ').split(' ').map((w, i) => (
              <span key={i} className="fill__w">{w} </span>
            ))}
          </p>
          <p className="manifesto__close" data-reveal="clip">
            <span>No seguimos el juego. <span className="hl">Cambiamos la forma de jugar.</span></span>
          </p>
        </div>
        <Media name="knight" className="manifesto__media" ratio="3 / 4" decorative />
      </div>
    </section>
  );
}
