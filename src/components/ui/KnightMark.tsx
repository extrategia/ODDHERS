import { KNIGHT_PATH, KNIGHT_VIEWBOX } from '@/lib/knight-shape';

/** Caballo del logotipo como SVG. Decorativo por defecto. */
export function KnightMark({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      className={`knight-mark ${className}`.trim()}
      viewBox={KNIGHT_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={KNIGHT_PATH} fill="currentColor" />
    </svg>
  );
}
