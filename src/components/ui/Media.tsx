import type { CSSProperties } from 'react';
import { image, type ImageKey } from '@/content/images';

/**
 * Imagen con máscara de entrada, parallax interno y tratamiento en escala de grises.
 * `decorative` oculta la imagen a lectores de pantalla cuando solo acompaña al texto.
 */
export function Media({ name, className = '', ratio, parallax = true, color = false, decorative = false, eager = false }: {
  name: ImageKey; className?: string; ratio?: string; parallax?: boolean; color?: boolean; decorative?: boolean; eager?: boolean;
}) {
  const { src, alt } = image(name);
  return (
    <div className={`media${color ? ' media--color' : ''} ${className}`.trim()} data-reveal="img" style={ratio ? ({ aspectRatio: ratio } as CSSProperties) : undefined}>
      <div className="media__clip">
        <img src={src} alt={decorative ? '' : alt} loading={eager ? 'eager' : 'lazy'} decoding="async" data-parallax={parallax ? '' : undefined} />
      </div>
    </div>
  );
}
