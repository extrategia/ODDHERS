import { Cta } from '@/components/ui/Cta';
import { KnightMark } from '@/components/ui/KnightMark';
import { Words } from '@/components/ui/Words';

/** Cierre de páginas interiores: el caballo, la ruta lima y una sola acción. */
export function CtaBand({ title = 'Tu siguiente movimiento empieza con _una conversación._', cta = 'Hablemos de tu negocio', href = '/contacto' }: {
  title?: string; cta?: string; href?: string;
}) {
  return (
    <section className="section band" data-theme="dark" data-tone="deep">
      <div className="container band__inner">
        <div className="band__knight" data-reveal="path" aria-hidden="true">
          <KnightMark />
          <span className="band__route" />
        </div>
        <div>
          <h2 className="h1" data-reveal="words"><Words text={title} /></h2>
          <div className="band__actions" data-reveal="up">
            <Cta href={href} track="cta_band">{cta}</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
