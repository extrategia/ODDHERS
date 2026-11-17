import type { ReactNode } from 'react';
import { Words } from '@/components/ui/Words';

export function PageHero({ label, title, lead, children, theme = 'dark' }: {
  label: string; title: string; lead?: string; children?: ReactNode; theme?: 'dark' | 'light';
}) {
  return (
    <section className="page-hero" data-theme={theme} data-tone={theme === 'dark' ? 'deep' : undefined}>
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="container">
        <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> {label}</p>
        <h1 className="display page-hero__title" data-reveal="words"><Words text={title} /></h1>
        {lead && <p className="lead" data-reveal="up">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
