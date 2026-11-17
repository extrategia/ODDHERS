export const methodSteps = [
  {
    number: '01',
    name: 'Understand',
    title: 'Entendemos antes de proponer.',
    body: 'Analizamos el negocio, los objetivos, los clientes, la comunicación existente y los desafíos reales.',
    output: 'Un diagnóstico por escrito, con hallazgos y prioridades.',
  },
  {
    number: '02',
    name: 'Challenge',
    title: 'Cuestionamos lo evidente.',
    body: 'Revisamos las suposiciones, detectamos oportunidades y exploramos caminos alternativos.',
    output: 'Una ruta estratégica con las alternativas que evaluamos y por qué elegimos una.',
  },
  {
    number: '03',
    name: 'Create & Execute',
    title: 'Convertimos estrategia en acción.',
    body: 'Desarrollamos e implementamos las soluciones seleccionadas.',
    output: 'Marca, contenido, campañas o procesos funcionando, con responsables y fechas.',
  },
  {
    number: '04',
    name: 'Measure & Evolve',
    title: 'Aprendemos, medimos y mejoramos.',
    body: 'Evaluamos resultados y ajustamos las estrategias.',
    output: 'Reportes periódicos con lectura de resultados y siguientes pasos.',
  },
] as const;

export const difference = {
  conventional: ['Ejecutar solicitudes.', 'Repetir tendencias.', 'Priorizar volumen.', 'Medir únicamente actividad.', 'Trabajar por entregables aislados.'],
  oddhers: ['Comprender desafíos.', 'Construir estrategias propias.', 'Priorizar relevancia.', 'Evaluar resultados.', 'Conectar soluciones.'],
} as const;

export const manifesto = [
  'No estamos aquí para hacer lo que todos hacen, pero con otro logo.',
  'Estamos aquí para cuestionar lo evidente.',
  'Para encontrar posibilidades donde otros ven límites.',
  'Para combinar inteligencia estratégica con creatividad.',
  'Y convertir las ideas en acciones que generen valor.',
] as const;
