import type { ReactNode } from 'react';
import { KnightMark } from './KnightMark';

/** Franja en movimiento continuo. El contenido se duplica para que el ciclo no tenga cortes. */
export function Marquee({ items, className = '', reverse = false, children }: {
  items?: string[]; className?: string; reverse?: boolean; children?: ReactNode;
}) {
  const row = (hidden: boolean) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {children ??
        items!.map((t) => (
          <span key={t} className="marquee__item">
            {t}
            <KnightMark className="marquee__mark" />
          </span>
        ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''} ${className}`.trim()}>
      {row(false)}
      {row(true)}
    </div>
  );
}
