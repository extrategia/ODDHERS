'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { asset, nav, site, whatsappUrl } from '@/config/site';
import { KnightArrow } from '@/components/ui/Cta';

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [hint, setHint] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sticky discreto + fondo adaptativo según la sección que queda bajo el header.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 320 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 320) setHidden(false);
      last = y;
      const probe = 36;
      let t: 'dark' | 'light' = 'dark';
      document.querySelectorAll<HTMLElement>('main [data-theme], footer[data-theme]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) t = s.dataset.theme === 'light' ? 'light' : 'dark';
      });
      setTheme(t);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { close(); }, [pathname, close]);

  // Menú a pantalla completa: bloqueo de scroll, Escape y foco contenido.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const menu = menuRef.current!;
    const focusables = () =>
      [toggleRef.current!, ...Array.from(menu.querySelectorAll<HTMLElement>('a[href], button'))].filter(Boolean);
    const first = menu.querySelector<HTMLElement>('a[href]');
    const t = window.setTimeout(() => first?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); toggleRef.current?.focus(); }
      if (e.key === 'Tab') {
        const f = focusables();
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const wa = whatsappUrl();
  const headerTheme = open ? 'dark' : theme;

  return (
    <>
      <header
        className={`header${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}
        data-header-theme={headerTheme}
      >
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="ODDHERS, ir al inicio">
            <img className="logo logo--neg" src={asset('/brand/oddhers-horizontal-negativo.png')} alt="" width={1195} height={298} />
            <img className="logo logo--pos" src={asset('/brand/oddhers-horizontal-positivo.png')} alt="" width={1195} height={298} />
          </Link>

          <nav className="header__nav" aria-label="Principal">
            <ul>
              {nav.slice(1, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="navlink" aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <Link href={site.cta.href} className="header__cta" data-track="cta_header">
              <span className="header__cta-long">{site.cta.label}</span>
              <span className="header__cta-short">{site.cta.short}</span>
              <KnightArrow />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="menu-toggle__label">{open ? 'Cerrar' : 'Menú'}</span>
              <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        ref={menuRef}
        className={`menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!open}
      >
        <div className="menu__grid" aria-hidden="true" />
        <div className="menu__inner">
          <nav aria-label="Menú completo">
            <ol className="menu__list">
              {nav.map((item, i) => (
                <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    className="menu__link"
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    onClick={close}
                    onMouseEnter={() => setHint(i)}
                    onFocus={() => setHint(i)}
                  >
                    <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="menu__label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <aside className="menu__aside">
            <p className="menu__hint" aria-live="polite">
              {hint !== null ? nav[hint].hint : site.tagline}
            </p>
            <div className="menu__contact">
              <p className="label">Contacto</p>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="menu__contact-link" data-track="whatsapp_menu">
                  WhatsApp
                </a>
              )}
              {site.contact.email && (
                <a href={`mailto:${site.contact.email}`} className="menu__contact-link">{site.contact.email}</a>
              )}
              <p className="menu__place">{site.location.label}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
