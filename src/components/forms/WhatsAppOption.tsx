import { KnightArrow } from '@/components/ui/Cta';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/config/site';

export function WhatsAppOption() {
  const url = whatsappUrl();
  if (!url) {
    return <p className="form-note">El número de WhatsApp aún no está configurado. Usa el formulario mientras tanto.</p>;
  }
  return (
    <>
      <blockquote className="option__msg">&ldquo;{WHATSAPP_DEFAULT_MESSAGE}&rdquo;</blockquote>
      <a className="orb" href={url} target="_blank" rel="noopener noreferrer" data-magnetic="0.35" data-track="whatsapp_cta">
        <span>Abrir WhatsApp</span>
        <KnightArrow />
      </a>
    </>
  );
}
