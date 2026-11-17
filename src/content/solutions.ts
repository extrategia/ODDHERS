export type Solution = {
  slug: string;
  number: string;
  name: string;
  forWhom: string;
  quote: string;
  description: string;
  capabilities: { name: string; detail: string }[];
  signals: string[];
  outcome: string;
  cta: string;
  glyph: 'compass' | 'frames' | 'steps' | 'nodes';
};

export const solutions: Solution[] = [
  {
    slug: 'brand-strategy',
    number: '01',
    name: 'Brand & Strategy',
    forWhom: 'Para negocios que necesitan claridad y diferenciación.',
    quote: 'Antes de comunicar mejor, necesitamos saber qué te hace diferente.',
    description:
      'Definimos qué lugar debe ocupar tu marca, a quién le habla y con qué argumentos. De ahí salen la identidad, el mensaje y el plan; no al revés.',
    capabilities: [
      { name: 'Estrategia de marketing', detail: 'Un plan con objetivos, prioridades y presupuesto, construido sobre la realidad de tu negocio.' },
      { name: 'Diagnóstico de marca', detail: 'Cómo te perciben hoy, qué dices, qué dice tu competencia y dónde está el hueco.' },
      { name: 'Diseño de marca', detail: 'Identidad visual, sistema gráfico y lineamientos para usarla con consistencia.' },
      { name: 'Posicionamiento', detail: 'La idea central que te distingue y cómo sostenerla en cada punto de contacto.' },
      { name: 'Asesoría digital', detail: 'Acompañamiento para decidir en qué canales estar, con qué recursos y en qué orden.' },
    ],
    signals: [
      'Tu oferta es buena, pero cuesta explicar por qué elegirte.',
      'Tu marca se ve distinta en cada canal.',
      'Compites por precio porque no hay otro argumento sobre la mesa.',
    ],
    outcome: 'Una marca con una posición clara y un plan para defenderla.',
    cta: 'Descubre una nueva estrategia',
    glyph: 'compass',
  },
  {
    slug: 'content-experience',
    number: '02',
    name: 'Content & Experience',
    forWhom: 'Para marcas que necesitan conectar con su audiencia.',
    quote: 'No creamos contenido para llenar calendarios. Creamos contenido con intención.',
    description:
      'Cada pieza responde a una pregunta: ¿qué debe pensar, sentir o hacer quien la ve? Producimos video, diseño y texto con ese criterio, y lo medimos contra ese objetivo.',
    capabilities: [
      { name: 'Producción de video', detail: 'Planeación, grabación y dirección de piezas para redes, campañas y marca.' },
      { name: 'Edición audiovisual', detail: 'Ritmo, narrativa y formato pensados para la plataforma donde se va a ver.' },
      { name: 'Contenido para redes', detail: 'Líneas editoriales y gestión de canales con un propósito por publicación.' },
      { name: 'Diseño de publicaciones', detail: 'Sistemas gráficos reconocibles, no plantillas sueltas.' },
      { name: 'Copywriting', detail: 'Textos claros que suenan a tu marca y mueven a la acción.' },
      { name: 'Comunicación de marca', detail: 'Un mismo tono y un mismo mensaje en todo lo que publicas.' },
    ],
    signals: [
      'Publicas con constancia y la conversación no llega.',
      'Tu contenido se parece al de tu competencia.',
      'Tienes historias que contar y no el formato para contarlas.',
    ],
    outcome: 'Contenido reconocible, con un propósito medible detrás de cada pieza.',
    cta: 'Hablemos de tu contenido',
    glyph: 'frames',
  },
  {
    slug: 'performance-growth',
    number: '03',
    name: 'Performance & Growth',
    forWhom: 'Para empresas que buscan atraer prospectos y convertir oportunidades.',
    quote: 'No se trata de llegar a más personas. Se trata de conectar con las correctas.',
    description:
      'Diseñamos y operamos campañas con una lógica completa: a quién buscamos, qué le ofrecemos, a dónde llega y qué pasa después. La pauta es una parte del sistema, no el sistema.',
    capabilities: [
      { name: 'Meta Ads', detail: 'Campañas en Facebook e Instagram, de la estructura a la optimización.' },
      { name: 'Google Ads', detail: 'Presencia frente a quien ya está buscando lo que ofreces.' },
      { name: 'Estrategia publicitaria', detail: 'Presupuesto, audiencias y mensajes ordenados por etapa de decisión.' },
      { name: 'Optimización de campañas', detail: 'Ajustes continuos con base en datos, no en intuiciones.' },
      { name: 'Captación de prospectos', detail: 'Formularios, conversaciones y páginas pensadas para calificar, no solo para acumular.' },
      { name: 'Medición de desempeño', detail: 'Reportes que explican qué pasó, por qué y qué sigue.' },
    ],
    signals: [
      'Inviertes en anuncios y no sabes qué está funcionando.',
      'Llegan prospectos, pero pocos son clientes potenciales reales.',
      'Dependes de recomendaciones y quieres un canal predecible.',
    ],
    outcome: 'Un sistema de captación que puedes leer, cuestionar y mejorar.',
    cta: 'Exploremos tu estrategia de crecimiento',
    glyph: 'steps',
  },
  {
    slug: 'ai-optimization',
    number: '04',
    name: 'AI & Optimization',
    forWhom: 'Para organizaciones que quieren utilizar mejor la tecnología.',
    quote: 'La tecnología no reemplaza la estrategia. La hace llegar más lejos.',
    description:
      'Usamos inteligencia artificial donde aporta: para analizar más rápido, probar más variantes y quitar trabajo repetitivo. La integramos de forma gradual, empezando por lo que hoy ya te quita tiempo.',
    capabilities: [
      { name: 'Optimización de campañas con IA', detail: 'Variantes de mensajes y creativos, y lectura de resultados asistida.' },
      { name: 'Análisis asistido por IA', detail: 'Hallazgos en tus datos de campañas, contenido y audiencia en menos tiempo.' },
      { name: 'Automatización de tareas comerciales', detail: 'Seguimientos, respuestas y registros que no deberían depender de la memoria de nadie.' },
      { name: 'Mejora de procesos digitales', detail: 'Revisamos cómo trabajas hoy y dónde una herramienta sí cambia el resultado.' },
      { name: 'Integración progresiva', detail: 'Paso a paso, con pruebas pequeñas antes de comprometer tu operación.' },
    ],
    signals: [
      'Tu equipo repite tareas que podrían resolverse solas.',
      'Tienes datos, pero no tiempo para leerlos.',
      'Quieres usar IA y no sabes por dónde empezar sin perder el control.',
    ],
    outcome: 'Tecnología al servicio de decisiones mejor informadas.',
    cta: 'Exploremos dónde suma la tecnología',
    glyph: 'nodes',
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
