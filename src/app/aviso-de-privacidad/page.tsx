import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { site, whatsappUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Aviso de privacidad integral de ODDHERS: qué datos personales recabamos, para qué y cómo ejercer tus derechos.',
  alternates: { canonical: '/aviso-de-privacidad/' },
};

export default function AvisoPage() {
  const { responsable, domicilio, lastUpdated } = site.legal;
  const wa = whatsappUrl('Hola, ODDHERS. Quiero ejercer mis derechos sobre mis datos personales.');
  const channel = site.contact.email ? (
    <a className="ulink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
  ) : wa ? (
    <a className="ulink" href={wa} target="_blank" rel="noopener noreferrer">nuestro WhatsApp de contacto</a>
  ) : (
    <>los medios de contacto publicados en este sitio</>
  );

  return (
    <>
      <PageHero label="Legal" title="Aviso de privacidad" lead={`Última actualización: ${lastUpdated}.`} />
      <section className="section" data-theme="dark" data-tone="soft">
        <div className="container"><div className="legal prose">
          <h2>1. Responsable</h2>
          <p>
            {responsable} (en adelante, &ldquo;ODDHERS&rdquo;), con domicilio en {domicilio}, es responsable del tratamiento de los datos personales que nos proporcionas, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente.
          </p>

          <h2>2. Datos personales que recabamos</h2>
          <p>A través del formulario de contacto y de los mensajes que nos envías recabamos:</p>
          <ul>
            <li>Nombre.</li>
            <li>Empresa.</li>
            <li>Correo electrónico.</li>
            <li>Número de teléfono o WhatsApp.</li>
            <li>La información que decidas compartir sobre tu negocio y tu solicitud.</li>
          </ul>
          <p>No solicitamos datos personales sensibles. Te pedimos no incluirlos en tus mensajes.</p>

          <h2>3. Finalidades</h2>
          <p><strong>Finalidades primarias</strong>, necesarias para atender tu solicitud:</p>
          <ul>
            <li>Responder a tu mensaje y ponernos en contacto contigo.</li>
            <li>Entender tu necesidad y preparar una propuesta de servicios.</li>
            <li>Dar seguimiento a la relación comercial que derive de tu solicitud.</li>
          </ul>
          <p><strong>Finalidades secundarias</strong>, que no son necesarias para atenderte:</p>
          <ul>
            <li>Enviarte información sobre nuestros servicios y contenidos.</li>
          </ul>
          <p>
            Si no deseas que tus datos se utilicen para las finalidades secundarias, puedes indicarlo en cualquier momento a través de {channel}. Tu negativa no afecta la atención de tu solicitud.
          </p>

          <h2>4. Transferencias</h2>
          <p>
            No vendemos ni transferimos tus datos personales a terceros para fines propios de esos terceros. Utilizamos proveedores de tecnología (por ejemplo, servicios de mensajería, correo y formularios) que tratan los datos por cuenta nuestra y únicamente para las finalidades descritas. Solo realizaremos transferencias sin tu consentimiento en los supuestos que la ley permite.
          </p>

          <h2>5. Derechos de acceso, rectificación, cancelación y oposición (ARCO)</h2>
          <p>
            Tienes derecho a conocer qué datos personales tenemos de ti y para qué los usamos (acceso); a solicitar su corrección si están desactualizados, son inexactos o están incompletos (rectificación); a que los eliminemos cuando consideres que no se utilizan conforme a la ley (cancelación), y a oponerte a su uso para fines específicos (oposición).
          </p>
          <p>
            Para ejercer cualquiera de estos derechos, o para revocar el consentimiento que nos diste, envía una solicitud a través de {channel} indicando: tu nombre completo, un medio para comunicarte la respuesta, una descripción clara de los datos y del derecho que deseas ejercer, y un documento que acredite tu identidad. Te responderemos en los plazos que establece la ley.
          </p>

          <h2>6. Limitación del uso o divulgación</h2>
          <p>
            Puedes pedir en cualquier momento que dejemos de contactarte o que limitemos el uso de tus datos por el mismo medio señalado en el punto anterior.
          </p>

          <h2>7. Cookies y medición</h2>
          <p>
            Este sitio no instala herramientas de medición sin tu consentimiento. Si se activa la analítica del sitio, se te preguntará antes y podrás rechazarla; en ese caso no se carga ninguna herramienta de medición. Puedes cambiar tu decisión borrando los datos de este sitio en tu navegador.
          </p>

          <h2>8. Cambios al aviso de privacidad</h2>
          <p>
            Cualquier modificación a este aviso se publicará en esta misma página, con su fecha de actualización.
          </p>

          <h2>9. Autoridad</h2>
          <p>
            Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad competente en la materia.
          </p>
        </div></div>
      </section>
    </>
  );
}
