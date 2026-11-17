'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';

const KEY = 'oddhers-consent';

function loadGa(id: string) {
  if (document.getElementById('ga-script')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

/** Solo aparece si hay un ID de analítica configurado. Sin consentimiento no se carga nada. */
export function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!site.gaId) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === 'granted') loadGa(site.gaId);
    else if (saved !== 'denied') setShow(true);
  }, []);
  if (!show) return null;
  const decide = (v: 'granted' | 'denied') => {
    try { localStorage.setItem(KEY, v); } catch {}
    if (v === 'granted') loadGa(site.gaId);
    setShow(false);
  };
  return (
    <div className="consent" role="region" aria-label="Medición del sitio">
      <p>
        Usamos analítica para entender cómo se usa este sitio. Solo se activa si lo aceptas.{' '}
        <Link href="/aviso-de-privacidad" className="ulink">Aviso de privacidad</Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn-plain" onClick={() => decide('denied')}>Rechazar</button>
        <button type="button" className="btn-solid" onClick={() => decide('granted')}>Aceptar</button>
      </div>
    </div>
  );
}
