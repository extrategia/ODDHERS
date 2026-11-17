import { Cta } from '@/components/ui/Cta';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/config/site';

export function WhatsAppOption() {
  const url = whatsappUrl();
  if (!url) {
    return <p className="form-note">El número de WhatsApp aún no está configurado. Usa el formulario mientras tanto.</p>;
  }
  return (
    <>
      <blockquote className="option__msg">&ldquo;{WHATSAPP_DEFAULT_MESSAGE}&rdquo;</blockquote>
      <Cta href={url} external track="whatsapp_cta">Abrir WhatsApp</Cta>
    </>
  );
}
