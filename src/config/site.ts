/**
 * Configuración global del sitio.
 * Todo lo que depende de datos externos (dominio, WhatsApp, correo, endpoint del formulario)
 * se lee de variables de entorno. Ver .env.example.
 */
const env = (v: string | undefined) => (v && v.trim() ? v.trim() : '');

export const site = {
  name: 'ODDHERS',
  tagline: 'Otras ideas. Otra estrategia.',
  creed: "We don't think like the others.",
  description:
    'ODDHERS es una firma de estrategia creativa en León, Guanajuato. Combinamos estrategia, creatividad y tecnología para transformar los desafíos de tu negocio en nuevas oportunidades.',
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',
  basePath: env(process.env.NEXT_PUBLIC_BASE_PATH),
  locale: 'es-MX',
  location: { city: 'León', region: 'Guanajuato', country: 'MX', label: 'León, Guanajuato, México' },

  contact: {
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP),
    email: env(process.env.NEXT_PUBLIC_EMAIL),
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK),
  },

  formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
  gaId: env(process.env.NEXT_PUBLIC_GA_ID),

  /** Datos del responsable para el aviso de privacidad. Completar antes de publicar. */
  legal: {
    responsable: 'ODDHERS',
    domicilio: 'León, Guanajuato, México',
    lastUpdated: '16 de noviembre de 2026',
  },

  cta: { label: 'Hablemos de tu próximo movimiento', short: 'Hablemos', href: '/contacto' },
} as const;

export const nav = [
  { href: '/', label: 'Inicio', hint: 'El punto de partida.' },
  { href: '/soluciones', label: 'Soluciones', hint: 'Cuatro frentes, un mismo criterio.' },
  { href: '/enfoque', label: 'Nuestro enfoque', hint: 'Pensar diferente también tiene método.' },
  { href: '/proyectos', label: 'Proyectos', hint: 'Industrias en las que ya hemos jugado.' },
  { href: '/nosotros', label: 'Nosotros', hint: 'De ExtrategIA a ODDHERS.' },
  { href: '/contacto', label: 'Contacto', hint: 'Tu siguiente movimiento empieza aquí.' },
] as const;

/** Antepone el basePath a un archivo de /public. */
export const asset = (path: string) => `${site.basePath}${path}`;

export const WHATSAPP_DEFAULT_MESSAGE = 'Hola, ODDHERS. Quiero explorar una estrategia para mi negocio.';

/** Devuelve el enlace de WhatsApp o '' si no hay número configurado. */
export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const n = site.contact.whatsapp.replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : '';
}
