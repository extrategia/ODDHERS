/**
 * Tokens de movimiento (espejo de los definidos en styles/tokens.css).
 * Microinteracciones 150–300 ms · componentes 300–650 ms · revelaciones 600–1100 ms.
 */
export const duration = { micro: 0.2, component: 0.5, reveal: 0.9, knight: 0.95 } as const;
export const ease = { out: 'power3.out', inOut: 'power2.inOut', knight: 'power2.inOut' } as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
