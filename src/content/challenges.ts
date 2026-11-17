export type Challenge = {
  slug: string;
  number: string;
  title: string;
  scope: string;
  insight: string;
  body: string;
  solutions: string[]; // slugs de content/solutions
  cta: string;
  /** Valor que se preselecciona en el formulario de contacto. */
  formOption: string;
  /** Casilla destino del caballo en el tablero (columna, fila) de 6×6. */
  target: [number, number];
};

export const challenges: Challenge[] = [
  {
    slug: 'mas-clientes',
    number: '01',
    title: 'Necesito más clientes.',
    scope: 'Publicidad, generación de prospectos y estrategia de conversión.',
    insight: 'No siempre necesitas más publicidad. Primero necesitamos identificar dónde se está perdiendo la oportunidad.',
    body: 'A veces el problema no es el alcance: es la oferta, el mensaje o el seguimiento. Revisamos el recorrido completo, del anuncio a la conversación de venta, antes de invertir un peso más.',
    solutions: ['performance-growth', 'brand-strategy'],
    cta: 'Exploremos tu estrategia de crecimiento',
    formOption: 'Conseguir más clientes',
    target: [4, 1],
  },
  {
    slug: 'marca-no-destaca',
    number: '02',
    title: 'Mi marca no destaca.',
    scope: 'Identidad, posicionamiento, diseño y comunicación.',
    insight: 'Destacar no es hablar más fuerte. Es tener algo distinto que decir y decirlo con claridad.',
    body: 'Cuando todas las marcas de una categoría prometen lo mismo, gana la que se entiende primero. Buscamos qué te hace realmente distinto y lo convertimos en identidad y mensaje.',
    solutions: ['brand-strategy', 'content-experience'],
    cta: 'Descubre una nueva estrategia',
    formOption: 'Mejorar mi marca',
    target: [1, 0],
  },
  {
    slug: 'redes-sin-resultados',
    number: '03',
    title: 'Mis redes no generan resultados.',
    scope: 'Contenido estratégico, gestión digital y análisis de desempeño.',
    insight: 'Publicar seguido no es una estrategia. La pregunta es qué debe provocar cada publicación.',
    body: 'Revisamos qué publicas, para quién y con qué objetivo. Después definimos qué vale la pena medir: los "me gusta" casi nunca son la respuesta.',
    solutions: ['content-experience', 'performance-growth'],
    cta: 'Revisemos tu contenido',
    formOption: 'Crear contenido',
    target: [5, 3],
  },
  {
    slug: 'contenido-que-conecte',
    number: '04',
    title: 'Necesito contenido que conecte.',
    scope: 'Producción audiovisual, storytelling y creatividad.',
    insight: 'El contenido conecta cuando parte de lo que le importa a tu audiencia, no de lo que quieres presumir.',
    body: 'Encontramos las historias que tu negocio ya tiene y les damos forma: video, diseño y texto con una idea clara detrás, pensados para el lugar donde se van a ver.',
    solutions: ['content-experience', 'brand-strategy'],
    cta: 'Hablemos de tu contenido',
    formOption: 'Crear contenido',
    target: [3, 0],
  },
  {
    slug: 'aprovechar-tecnologia',
    number: '05',
    title: 'Quiero aprovechar mejor la tecnología.',
    scope: 'Optimización con inteligencia artificial, análisis y automatización.',
    insight: 'La herramienta es lo de menos. Lo importante es qué decisión te ayuda a tomar mejor.',
    body: 'Empezamos por lo que hoy te quita tiempo o te deja sin información. A partir de ahí definimos qué conviene automatizar, qué analizar y qué dejar en manos de personas.',
    solutions: ['ai-optimization', 'performance-growth'],
    cta: 'Exploremos dónde suma la tecnología',
    formOption: 'Incorporar IA',
    target: [5, 1],
  },
  {
    slug: 'no-se-que-necesito',
    number: '06',
    title: 'No sé qué necesita mi negocio.',
    scope: 'Diagnóstico y asesoría estratégica.',
    insight: 'No saberlo es un buen punto de partida. Es más honesto que comprar una solución antes de entender el problema.',
    body: 'Una conversación de diagnóstico ordena el panorama: qué está pasando, qué importa primero y qué puede esperar. Sales con claridad, trabajes con nosotros o no.',
    solutions: ['brand-strategy'],
    cta: 'Encuentra tu siguiente movimiento',
    formOption: 'Necesito orientación',
    target: [2, 2],
  },
];

/** Opciones del campo "Principal desafío" del formulario. */
export const formChallengeOptions = [
  'Conseguir más clientes',
  'Mejorar mi marca',
  'Crear contenido',
  'Publicidad digital',
  'Incorporar IA',
  'Necesito orientación',
] as const;
