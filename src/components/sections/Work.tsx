'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { projects, type Project } from '@/content/projects';
import { image } from '@/content/images';
import { Words } from '@/components/ui/Words';
import { KnightArrow } from '@/components/ui/Cta';
import { loadEngine } from '@/components/motion/MotionRoot';

export function ProjectCard({ project }: { project: Project }) {
  const { src, alt } = image(project.image);
  return (
    <Link href={`/proyectos/${project.slug}`} className="card" data-cursor="Ver">
      <span className="card__media">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        {project.illustrative && <span className="card__flag">Imagen ilustrativa</span>}
        <span className="card__num" aria-hidden="true">{project.number}</span>
      </span>
      <span className="card__info">
        <span className="label">{project.industry}</span>
        <span className="card__title">{project.title}</span>
        <span className="card__summary">{project.summary}</span>
      </span>
    </Link>
  );
}

export function ProjectGrid() {
  return (
    <ul className="work__grid">
      {projects.map((p, i) => (
        <li key={p.slug} data-reveal="up" style={{ '--i': i % 2 } as React.CSSProperties}><ProjectCard project={p} /></li>
      ))}
    </ul>
  );
}

/**
 * Galería horizontal: en escritorio la sección se fija y el scroll vertical desplaza las tarjetas.
 * En táctil o con movimiento reducido es un carrusel con deslizamiento nativo.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = root.current!;
    const tr = track.current!;
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadEngine().then(({ gsap }) => {
      if (cancelled) return;
      el.classList.add('is-pinned');
      ctx = gsap.context(() => {
        const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(tr).paddingLeft));
        gsap.to(tr, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        gsap.to('.work__bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
      }, el);
    });
    return () => { cancelled = true; ctx?.revert(); el.classList.remove('is-pinned'); };
  }, []);

  return (
    <section ref={root} className="work" data-theme="dark" data-tone="deep" aria-labelledby="trabajo-title">
      <div className="container work__head">
        <div>
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 05 — Trabajo y experiencia</p>
          <h2 id="trabajo-title" className="h1" data-reveal="words">
            <Words text="Las ideas importan. _Lo que logran, más._" />
          </h2>
        </div>
        <p className="lead" data-reveal="up">
          Industrias en las que ya hemos trabajado. Publicamos nombres, piezas y cifras únicamente con autorización de cada cliente.
        </p>
      </div>
      <ul ref={track} className="work__track">
        {projects.map((p) => (
          <li key={p.slug} className="work__slide"><ProjectCard project={p} /></li>
        ))}
        <li className="work__slide work__slide--end">
          <Link href="/proyectos" className="endcard" data-cursor="Ver">
            <span className="endcard__title">Ver toda la experiencia</span>
            <span className="endcard__go" aria-hidden="true"><KnightArrow /></span>
          </Link>
        </li>
      </ul>
      <div className="container"><div className="work__bar" aria-hidden="true"><i /></div></div>
    </section>
  );
}
