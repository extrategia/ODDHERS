# ODDHERS — Sitio web oficial

> Otras ideas. Otra estrategia. · *We don't think like the others.*

Sitio multipágina con una homepage narrativa de 10 secciones, escena 3D del caballo y tres animaciones propias
(**The Knight's Move**, **Break the Pattern**, **The Other Path**).

## Stack

| Pieza | Uso |
| --- | --- |
| Next.js 16 (App Router) + React 19 + TypeScript | Arquitectura, rutas, SEO, exportación estática |
| Three.js | Escena 3D del hero (el caballo se extruye desde la silueta del logotipo) |
| GSAP + ScrollTrigger | Salto del caballo y animación del manifiesto ligada al scroll |
| CSS con design tokens | Sistema visual completo, sin framework de estilos |

Decisiones de mínimo necesario: **sin Tailwind, sin React Three Fiber/Drei, sin Framer Motion, sin Lenis**.
Una sola escena 3D no justifica un wrapper; las microinteracciones son CSS; el scroll es nativo (mejor accesibilidad y rendimiento).

## Empezar

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev                  # http://localhost:3000
npm run build                # genera el sitio estático en /out
npm run start                # sirve /out para revisarlo
```

Requiere Node 20 o superior.

## Variables de entorno

Ver `.env.example`. Las importantes:

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio final. Se usa en canonical, sitemap, Open Graph y datos estructurados. |
| `NEXT_PUBLIC_BASE_PATH` | Solo si el sitio vive en subcarpeta (GitHub Pages sin dominio propio: `/nombre-del-repo`). |
| `NEXT_PUBLIC_WHATSAPP` | Número con código de país, solo dígitos. **Confirmar antes de publicar.** |
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL que recibe el formulario por POST (JSON): Formspree, Web3Forms, webhook de Make, etc. |
| `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_FACEBOOK` | Opcionales; si están vacías no se muestran. |
| `NEXT_PUBLIC_GA_ID` | Opcional. Google Analytics 4; solo se carga si la persona acepta el banner. |

### Cómo se comporta el formulario

- **Con** `NEXT_PUBLIC_FORM_ENDPOINT`: envía los datos por POST y muestra confirmación solo si el servidor responde bien; si falla, muestra error y ofrece WhatsApp.
- **Sin** endpoint: el botón dice "Continuar en WhatsApp", arma el mensaje con los datos y abre WhatsApp. El sitio avisa que el mensaje **aún no se ha enviado**. Nunca se simula un envío.

## Estructura

```
src/
  app/                     Rutas (App Router)
    page.tsx               Homepage (10 secciones)
    soluciones/            Índice + /soluciones/[slug]
    enfoque/               Manifiesto, método y diferenciación
    proyectos/             Índice + /proyectos/[slug]
    nosotros/  contacto/  aviso-de-privacidad/
    sitemap.ts  robots.ts  not-found.tsx  icon.png
  config/site.ts           Configuración global, navegación, WhatsApp
  content/                 CONTENIDO EDITABLE (textos, servicios, proyectos)
    solutions.ts  challenges.ts  method.ts  projects.ts  ai.ts
  styles/
    tokens.css             Design tokens: color, tipografía, espacio, movimiento, temas
    base.css               Reset, tipografía, sistema de revelaciones
    components.css         Header, menú, CTA, cursor, tablero, formularios, footer
    sections.css           Secciones de home y páginas interiores
  lib/
    knight-shape.ts        Silueta del caballo trazada del logotipo (SVG + Three.js)
    motion.ts              Tokens de movimiento para JS
    analytics.ts           track() — no hace nada sin ID y sin consentimiento
  components/
    layout/                Header (menú full-screen), Footer, PageHero, CtaBand, ConsentBanner
    ui/                    Cta, Words (tipografía cinética), KnightMark, Glyph
    motion/MotionRoot.tsx  Revelaciones, botones magnéticos, cursor contextual
    three/                 knightScene.ts (escena) + KnightStage.tsx (carga diferida y fallback)
    sections/              Hero, Challenges, Manifesto, Solutions, Method, Work, Difference, Ai, About, FinalCta
    forms/                 ContactForm, WhatsAppOption
    seo/JsonLd.tsx         Datos estructurados (organización y migas)
public/
  brand/                   Logotipos oficiales
  og.png                   Imagen para compartir en redes
```

## Guía de personalización

| Quiero… | Edito… |
| --- | --- |
| Cambiar textos de servicios | `src/content/solutions.ts` |
| Cambiar los 6 desafíos y sus respuestas | `src/content/challenges.ts` |
| Agregar un proyecto o caso | `src/content/projects.ts` (ver reglas en el propio archivo) |
| Poner imagen o video real a un proyecto | Copiar el archivo a `public/proyectos/` y agregarlo en `media` del proyecto |
| Mostrar el nombre de un cliente | `client: 'Nombre'` en el proyecto (solo con autorización) |
| Agregar resultados | `results: [{ value: '+38%', label: 'prospectos calificados' }]` (solo cifras documentadas) |
| Ajustar qué IA se ofrece hoy / en desarrollo / visión | `src/content/ai.ts` |
| Cambiar el método | `src/content/method.ts` |
| Cambiar colores, tipografía, espacios o tiempos | `src/styles/tokens.css` |
| Cambiar el recorrido del caballo 3D | Constante `TOUR` en `src/components/three/knightScene.ts` |
| Datos del responsable en el aviso de privacidad | `legal` en `src/config/site.ts` |

Agregar una solución o un proyecto nuevo crea su página automáticamente (`generateStaticParams`), entra al sitemap y al footer.

## Despliegue

El sitio se exporta como HTML estático (`/out`), así que funciona en cualquier hosting.

**GitHub Pages** (donde vive el sitio anterior): ya está incluido `.github/workflows/deploy.yml`.

1. Sube este proyecto a un repositorio.
2. En *Settings → Pages*, elige **Source: GitHub Actions**.
3. En *Settings → Secrets and variables → Actions → Variables*, crea las variables de `.env.example`
   (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP`, etc.).
   Si no usarás dominio propio, define `NEXT_PUBLIC_BASE_PATH=/nombre-del-repo`.
4. Cada push a `main` publica el sitio.

**Vercel / Netlify**: importar el repositorio, definir las variables de entorno y listo (comando `npm run build`, carpeta `out`).

## Accesibilidad y rendimiento

- HTML semántico, un `h1` por página, navegación por teclado, foco visible, enlace "Saltar al contenido".
- Menú a pantalla completa con foco contenido, `Escape` para cerrar e `inert` cuando está cerrado.
- `prefers-reduced-motion`: se muestra todo el contenido de inmediato, sin cursor, sin imán, y el 3D pinta un solo cuadro.
- Sin JavaScript, todo el contenido es visible y navegable (el 3D se sustituye por el caballo SVG).
- Three.js se carga en diferido, fuera del bundle inicial; el render se pausa fuera de pantalla o con la pestaña oculta.
- Fuentes autoalojadas (Archivo variable e Instrument Serif): no hay llamadas a Google Fonts.

## Preparado para crecer

- Artículos: crear `src/content/articles.ts` y `src/app/articulos/[slug]`, igual que proyectos.
- CMS: `src/content/*` es la única fuente de contenido; puede sustituirse por un CMS sin tocar componentes.
- CRM / agenda: el formulario ya publica a un endpoint configurable (Make, Brevo vía webhook, HubSpot, etc.).
- Multilenguaje: el contenido está separado de los componentes; se puede duplicar por idioma.
