import Link from 'next/link';
import { projects, type Project } from '@/content/projects';
import { asset } from '@/config/site';
import { Cta } from '@/components/ui/Cta';
import { Words } from '@/components/ui/Words';

/** Portada de proyecto: usa el material real si existe; si no, una composición tipográfica de marca. */
export function ProjectCover({ project }: { project: Project }) {
  const m = project.media[0];
  if (m?.type === 'image') return <img className="cover__media" src={asset(m.src)} alt={m.alt} loading="lazy" />;
  if (m?.type === 'video') {
    return <video className="cover__media" src={asset(m.src)} aria-label={m.alt} muted loop playsInline preload="metadata" />;
  }
  return (
    <div className="cover__type" aria-hidden="true">
      <span className="cover__index">{project.number}</span>
      <span className="cover__route" />
    </div>
  );
}

export function ProjectGrid() {
  return (
    <ul className="work__grid">
      {projects.map((p) => (
        <li key={p.slug} className={`work__item work__item--${p.size}`} data-reveal="clip">
          <Link href={`/proyectos/${p.slug}`} className="cover">
            <ProjectCover project={p} />
            <div className="cover__info">
              <p className="label">{p.industry}</p>
              <h3 className="h3">{p.title}</h3>
              <p className="cover__summary">{p.summary}</p>
              <span className="cover__more">Ver experiencia <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  return (
    <section className="section work" data-theme="dark" data-tone="deep" aria-labelledby="trabajo-title">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> 05 — Trabajo y experiencia</p>
            <h2 id="trabajo-title" className="h1" data-reveal="words">
              <Words text="Las ideas importan. _Lo que logran, más._" />
            </h2>
          </div>
          <p className="lead" data-reveal="up">
            Industrias en las que ya hemos trabajado. Publicamos nombres, piezas y cifras únicamente con autorización de cada cliente.
          </p>
        </header>
        <ProjectGrid />
        <div className="section-foot" data-reveal="up">
          <Cta href="/proyectos" variant="ghost">Ver toda la experiencia</Cta>
        </div>
      </div>
    </section>
  );
}
