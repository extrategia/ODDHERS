import Link from 'next/link';
import type { ReactNode } from 'react';

/** Flecha con el movimiento del caballo: avanza y gira. Es la firma de los CTA de ODDHERS. */
export function KnightArrow() {
  return (
    <svg className="cta__arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M2 12.5h8.5V3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.6 6.6 10.5 2.7l3.9 3.9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'text';
  external?: boolean;
  className?: string;
  track?: string;
};

export function Cta({ href, children, variant = 'primary', external, className = '', track }: Props) {
  const cls = `cta cta--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="cta__label">{children}</span>
      <KnightArrow />
    </>
  );
  if (external || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        className={cls}
        href={href}
        data-magnetic={variant === 'primary' ? '' : undefined}
        data-track={track}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} data-magnetic={variant === 'primary' ? '' : undefined} data-track={track}>
      {inner}
    </Link>
  );
}
