'use client';

import { useEffect, useRef } from 'react';
import { image } from '@/content/images';
import { Cta } from '@/components/ui/Cta';
import { loadEngine } from '@/components/motion/MotionRoot';

/** Imagen que crece hasta ocupar la pantalla conforme se hace scroll (sin detenerlo). */
export function Showreel() {
  const root = useRef<HTMLElement>(null);
  const { src, alt } = image('board');

  useEffect(() => {
    const el = root.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadEngine().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.reel__frame', { clipPath: 'inset(12% 16% 12% 16% round 28px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 10%', scrub: 0.4 },
        });
        gsap.fromTo('.reel__img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      }, el);
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section ref={root} className="reel" data-theme="dark" data-tone="deep" aria-label="Otras ideas. Otra estrategia.">
      <div className="reel__frame">
        <img className="reel__img" src={src} alt={alt} loading="lazy" decoding="async" />
        <div className="reel__veil" aria-hidden="true" />
        <div className="container reel__content">
          <p className="reel__title" data-reveal="words">
            <span className="w"><span>Otras</span></span> <span className="w"><span>ideas.</span></span><br />
            <span className="w w--accent"><span style={{ '--wi': 3 } as React.CSSProperties}>Otra</span></span>{' '}
            <span className="w w--accent"><span style={{ '--wi': 4 } as React.CSSProperties}>estrategia.</span></span>
          </p>
          <div data-reveal="up"><Cta href="/enfoque" variant="ghost">Mira cómo trabajamos</Cta></div>
        </div>
      </div>
    </section>
  );
}
