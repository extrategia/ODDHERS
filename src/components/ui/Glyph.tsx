/** Visuales geométricos de cada categoría de solución. Abstractos, hechos con la retícula del tablero. */
export function Glyph({ kind }: { kind: 'compass' | 'frames' | 'steps' | 'nodes' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke' as const };
  return (
    <svg className={`glyph glyph--${kind}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      {kind === 'compass' && (
        <>
          <rect x="20" y="20" width="160" height="160" {...common} opacity=".35" />
          <rect x="50" y="50" width="100" height="100" {...common} opacity=".6" />
          <rect x="80" y="80" width="40" height="40" {...common} />
          <path d="M20 20 180 180M180 20 20 180" {...common} opacity=".25" />
          <rect className="glyph__accent" x="132" y="44" width="24" height="24" />
        </>
      )}
      {kind === 'frames' && (
        <>
          <rect x="20" y="36" width="110" height="74" {...common} opacity=".35" />
          <rect x="45" y="62" width="110" height="74" {...common} opacity=".6" />
          <rect x="70" y="88" width="110" height="74" {...common} />
          <path className="glyph__accent" d="M114 108v34l28-17z" />
        </>
      )}
      {kind === 'steps' && (
        <>
          <path d="M20 180h160M20 140h160M20 100h160M20 60h160M20 20h160" {...common} opacity=".2" />
          <path d="M20 20v160M60 20v160M100 20v160M140 20v160M180 20v160" {...common} opacity=".2" />
          <path className="glyph__line" d="M20 160h40v-40h40V80h40V40h40" fill="none" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <rect className="glyph__accent" x="168" y="28" width="24" height="24" />
        </>
      )}
      {kind === 'nodes' && (
        <>
          <path d="M40 150 100 100 160 150M100 100V40M40 150h120M40 150 100 40l60 110" {...common} opacity=".4" />
          <circle cx="40" cy="150" r="9" {...common} />
          <circle cx="160" cy="150" r="9" {...common} />
          <circle cx="100" cy="40" r="9" {...common} />
          <rect className="glyph__accent" x="88" y="88" width="24" height="24" transform="rotate(45 100 100)" />
        </>
      )}
    </svg>
  );
}
