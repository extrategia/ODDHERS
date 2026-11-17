/**
 * Portafolio editable.
 *
 * Regla: aquí solo va información real y autorizada.
 * - `client`: nombre del cliente SOLO si autorizó aparecer. Si no, dejar null.
 * - `results`: cifras SOLO si están documentadas y autorizadas. Si no, dejar [].
 * - `image`: fotografía de portada. Hoy son imágenes de stock ILUSTRATIVAS (ver content/stock.json);
 *   mientras `illustrative` sea true, el sitio lo indica en la portada. Al poner material real, cambiar a false.
 */
export type Project = {
  slug: string;
  number: string;
  industry: string;
  title: string;
  client: string | null;
  summary: string;
  challenge: string;
  solution: string;
  services: string[];
  results: { value: string; label: string }[];
  image: import('./images').ImageKey;
  illustrative: boolean;
};

export const projects: Project[] = [
  {
    slug: 'sector-inmobiliario',
    number: '01',
    industry: 'Sector inmobiliario',
    title: 'Prospectos para propiedades de alto valor',
    client: null,
    summary: 'Campañas y contenido para asesores y desarrollos inmobiliarios.',
    challenge:
      'En bienes raíces sobran los curiosos y faltan los compradores. El reto es atraer personas con intención y capacidad real de compra, no solo acumular contactos.',
    solution:
      'Campañas en Meta Ads segmentadas por tipo de propiedad y perfil de comprador, contenido de marca para cada asesor o desarrollo y un seguimiento ordenado de los prospectos.',
    services: ['Meta Ads', 'Captación de prospectos', 'Contenido para redes', 'Producción de video'],
    results: [],
    image: 'house',
    illustrative: true,
  },
  {
    slug: 'calzado',
    number: '02',
    industry: 'Calzado',
    title: 'Marcas de botas con carácter propio',
    client: null,
    summary: 'Desarrollo de marca y campañas visuales para calzado.',
    challenge:
      'León es la capital del calzado: aquí todos fabrican bien. La diferencia tiene que construirse en la marca, la imagen y la forma de presentar cada modelo.',
    solution:
      'Desarrollo de identidad, catálogo y campañas visuales que ponen el producto al centro, con pauta digital para llevarlo a los compradores correctos.',
    services: ['Diseño de marca', 'Contenido para redes', 'Meta Ads', 'Producción de video'],
    results: [],
    image: 'boots',
    illustrative: true,
  },
  {
    slug: 'moda',
    number: '03',
    industry: 'Moda',
    title: 'Moda masculina que vende en línea',
    client: null,
    summary: 'Marca y venta digital para ropa y camisas.',
    challenge:
      'Vender ropa en línea exige que la marca transmita calidad sin que el cliente pueda tocar la prenda.',
    solution:
      'Contenido visual consistente, comunicación de marca y campañas orientadas a venta en canales digitales.',
    services: ['Comunicación de marca', 'Diseño de publicaciones', 'Estrategia publicitaria'],
    results: [],
    image: 'shirt',
    illustrative: true,
  },
  {
    slug: 'comunicacion-politica',
    number: '04',
    industry: 'Comunicación política',
    title: 'Mensajes claros en entornos difíciles',
    client: null,
    summary: 'Gestión de redes, campañas y comunicación en momentos de presión.',
    challenge:
      'En comunicación pública cada mensaje se examina con lupa y los tiempos no perdonan.',
    solution:
      'Estrategia de contenidos, gestión de canales digitales y respuesta oportuna ante situaciones sensibles.',
    services: ['Estrategia de marketing', 'Contenido para redes', 'Asesoría digital'],
    results: [],
    image: 'mics',
    illustrative: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
