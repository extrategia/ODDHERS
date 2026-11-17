import { Cta } from '@/components/ui/Cta';
import { KnightMark } from '@/components/ui/KnightMark';

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center" data-theme="dark" data-tone="deep">
      <div className="container">
        <KnightMark className="notfound__knight" />
        <p className="label">Error 404</p>
        <h1 className="display">Este movimiento <em className="serif-accent">no existe.</em></h1>
        <p className="lead">La página que buscas cambió de casilla o nunca estuvo en el tablero.</p>
        <Cta href="/">Volver al inicio</Cta>
      </div>
    </section>
  );
}
