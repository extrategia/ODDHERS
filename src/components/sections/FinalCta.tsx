import { Words } from '@/components/ui/Words';
import { KnightMark } from '@/components/ui/KnightMark';
import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppOption } from '@/components/forms/WhatsAppOption';

export function FinalCta({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const H = heading;
  return (
    <section id="contacto" className="section final" data-theme="dark" data-tone="deep" aria-labelledby="final-title">
      <div className="container">
        <header className="section-head final__head">
          <p className="label" data-reveal="up"><span className="tick" aria-hidden="true" /> Contacto</p>
          <H id="final-title" className="display final__title" data-reveal="words">
            <Words text="Tu siguiente gran movimiento empieza con _una conversación._" />
          </H>
          <p className="lead" data-reveal="up">Cuéntanos qué quieres lograr. Nosotros te ayudamos a explorar cómo hacerlo.</p>
        </header>

        <div className="final__grid">
          <div className="option option--a" data-reveal="path">
            <div className="option__knight" aria-hidden="true">
              <KnightMark />
              <span className="option__route" />
            </div>
            <p className="label">Opción A</p>
            <h3 className="h2">Hablemos</h3>
            <p>Escríbenos por WhatsApp. Te respondemos personalmente y acordamos una primera conversación.</p>
            <WhatsAppOption />
          </div>
          <div className="option option--b" data-reveal="up">
            <p className="label">Opción B</p>
            <h3 className="h2">Cuéntanos tu desafío</h3>
            <p>Déjanos algunos datos y el contexto de tu negocio.</p>
            <ContactForm />
          </div>
        </div>

        <p className="final__sign" data-reveal="clip" lang="en">
          <span>Your next move <span className="serif-accent">starts here.</span></span>
        </p>
      </div>
    </section>
  );
}
