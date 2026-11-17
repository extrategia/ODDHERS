/**
 * Analítica de conversiones.
 * No hace nada hasta que (1) existe NEXT_PUBLIC_GA_ID y (2) la persona aceptó la medición
 * (ver components/layout/ConsentBanner). Así ningún evento se envía sin consentimiento.
 */
type Params = Record<string, string | number | boolean>;
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
