/**
 * Capacidades de IA separadas por madurez.
 * IMPORTANTE: mantener esta lista alineada con lo que ODDHERS realmente ofrece hoy.
 */
export const aiStages = [
  {
    key: 'hoy',
    label: 'Hoy',
    title: 'Lo que ya hacemos',
    items: [
      'Análisis de campañas y contenido asistido por IA.',
      'Variantes de mensajes, formatos y creativos para probar más rápido.',
      'Optimización de campañas publicitarias apoyada en IA.',
    ],
  },
  {
    key: 'desarrollo',
    label: 'En desarrollo',
    title: 'Lo que estamos construyendo',
    items: [
      'Automatización de seguimientos y tareas comerciales.',
      'Flujos que conectan formularios, correo y mensajería.',
      'Tableros de desempeño con lectura asistida.',
    ],
  },
  {
    key: 'vision',
    label: 'Visión',
    title: 'Hacia dónde vamos',
    items: [
      'Herramientas propias de diagnóstico para negocios.',
      'Integración progresiva de asistentes en procesos de marketing y ventas.',
    ],
  },
] as const;
