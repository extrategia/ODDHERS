import { Fragment, type CSSProperties } from 'react';

/**
 * Tipografía cinética por palabras (line masking).
 * Cada palabra vive dentro de una máscara; el contenedor con data-reveal="words" la revela.
 * Marcado ligero dentro del texto:
 *   *palabras*  → acento (lima)
 *   _palabras_  → serif itálica para frases conceptuales
 *   |           → salto de línea
 */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  let accent = false;
  let serif = false;
  const tokens = text.split(' ').filter(Boolean);
  return (
    <>
      {tokens.map((raw, k) => {
        if (raw === '|') return <br key={k} />;
        let w = raw;
        if (w.startsWith('*')) { accent = true; w = w.slice(1); }
        if (w.startsWith('_')) { serif = true; w = w.slice(1); }
        const endAccent = /\*[.,;:!?…]*$/.test(w);
        const endSerif = /_[.,;:!?…]*$/.test(w);
        w = w.replace(/[*_]/g, '');
        const cls = ['w', accent && 'w--accent', serif && 'w--serif'].filter(Boolean).join(' ');
        if (endAccent) accent = false;
        if (endSerif) serif = false;
        return (
          <Fragment key={k}>
            <span className={cls}>
              <span style={{ '--wi': start + k } as CSSProperties}>{w}</span>
            </span>
            {k < tokens.length - 1 ? ' ' : ''}
          </Fragment>
        );
      })}
    </>
  );
}
