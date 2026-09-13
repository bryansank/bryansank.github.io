# bryansank.github.io Constitution

Sitio personal de Bryan Key Hernández. Objetivo único: que un reclutador
técnico o CTO entienda su perfil en menos de 60 segundos y lo contacte.
Documentos rectores: `docs/00_wowportfolio_agent_system_prompt.md` (agente y
enmiendas) y `docs/02_contexto_bryan_key.md` (perfil real).

## Core Principles

### I. Contacto Primero (NON-NEGOTIABLE)
Descargar el CV y hablar con Bryan (LinkedIn, email, GitHub) MUST ser lo
primero visible del contenido, sin scroll. Cada sección MUST terminar a ≤1
gesto de un CTA de contacto (barra fija o botón visible). La experiencia
previa (sala de embarque + intro) MUST ofrecer siempre una salida directa al
perfil en un clic o con Escape, MUST recordarse para no repetirse en visitas
siguientes, y MUST omitirse por completo con `prefers-reduced-motion`, sin
WebGL, bajo 321 px o sin JavaScript.
*Rationale:* el sitio existe para conseguir empleo. La puesta en escena es
un diferenciador deliberado, pero nunca puede ser una barrera: quien tiene
prisa llega al CV en un clic.

### I-bis. Nada de datos personales ni permisos innecesarios
El sitio MUST NOT publicar el teléfono personal ni solicitar permisos de
ubicación, cámara, micrófono o notificaciones. Los "poderes" opcionales
(sonido, inclinación, vibración, pantalla completa) MUST ser opt-in
explícito y MUST funcionar sin prompts del navegador, salvo el de
orientación en iOS, que solo se pide tras un gesto del usuario.
*Rationale:* el teléfono expuesto se scrapea y genera spam; los prompts de
permisos destruyen la confianza del reclutador y penalizan Best Practices.

### II. Perfil Real sobre Espectáculo
Todo contenido MUST provenir de `docs/02_contexto_bryan_key.md` (LinkedIn,
CV). MUST NOT inventarse puestos, métricas ni tecnologías. La temática Star
Wars + videojuegos es la envoltura: nombres de sección, copy, color y forma;
nunca sustituye la información profesional. Un reclutador que lea solo el
texto (sin CSS ni JS) MUST obtener el perfil completo.

### III. Vanilla + Three.js como Única Excepción
HTML5 semántico, CSS3 moderno (custom properties, Grid, Flexbox, container
queries, scroll-driven animations) y JavaScript ES2022+ nativo. Three.js y
sus addons oficiales de postproceso son la ÚNICA dependencia permitida,
exclusivamente para escenas 3D (intro del sable, campo de estrellas, nave
del Hangar); MUST cargarse como ES module después del primer render y MUST
tener fallback cuando WebGL o el módulo fallen. PROHIBIDOS React, Vue,
Angular, GSAP, jQuery, Tailwind y cualquier build step. El sitio MUST
desplegarse como archivos estáticos desde la raíz del repo (GitHub Pages).

### IV. Accesibilidad y Movimiento Respetuoso
WCAG 2.1 AA mínimo, AAA en contraste de texto. Navegación completa por
teclado con foco visible; landmarks y ARIA en toggles, intro y regiones
dinámicas. `prefers-reduced-motion: reduce` MUST desactivar intro 3D,
hiperespacio, crawl y parallax (contenido visible de inmediato). Sonido MUST
ser opt-in, apagado por defecto y sin autoplay. Bilingüe ES/EN sin recarga
con `lang` correcto en el documento.

### V. Rendimiento Medible
Accessibility, Best Practices y SEO MUST ser 100 en móvil y escritorio (medido
sobre el sitio publicado, no sobre el servidor local sin compresión).
Performance: objetivo ≥ 70 en móvil y ≥ 75 en escritorio, con LCP < 2,5 s y
CLS < 0,1. *Nota:* el objetivo original de ≥ 90 se rebajó el 2026-09-13 tras
medir que el coste restante es el layout inherente a una página larga y rica
bajo throttling 4×, no un cuello de botella corregible sin amputar el diseño.
Animaciones solo con `transform`, `opacity`, `clip-path` y filtros
compuestos; toda animación infinita MUST ser compuesta (nunca
`background-position` ni propiedades que repinten). Peso inicial (HTML + CSS
+ JS crítico) ≤ 25 KB comprimido. Three.js, el postproceso y el video del
sitio viejo MUST cargarse diferidos y solo en escritorio; en móvil la intro
MUST resolverse con Web Animations API y un póster de ≤ 15 KB.

### VI. Propiedad Intelectual Limpia
MUST NOT usarse logos, personajes, tipografías oficiales, música ni audio de
Lucasfilm/Disney ni de videojuegos comerciales. Sables, estrellas, hologramas
y sonidos MUST ser originales (CSS/Three.js/Web Audio sintetizado). Nombres
de secciones y guiños son referencias culturales, no assets ajenos.

## Restricciones Técnicas

- Un solo `index.html` en la raíz con CSS en `<style>` y JS en `<script>`;
  assets en `assets/` (video del sitio viejo, CV PDF, favicon). Three.js vía
  import map desde CDN pinneado a versión exacta.
- Paleta en OKLCH definida en `:root`; tema por defecto Lado Oscuro
  (`data-theme="dark"`), Lado Luz con `data-theme="light"`; ambos MUST pasar
  contraste AAA en texto de cuerpo.
- Responsive de 200 px (smartwatch) a 3840 px: `clamp()` para tipografía y
  espaciado; bajo 320 px el sitio MUST degradar a lista vertical sin 3D.
- Contenido ES/EN en diccionario JS único; el idioma inicial se infiere de
  `navigator.language` y se persiste en `localStorage`.
- Video del sitio viejo (`assets/media/old-site.webm`) se reproduce muteado,
  `preload="none"`, solo en la intro y solo si no hay reduced-motion.
- `old_site/` MUST permanecer intacto y accesible en `/old_site/`.

## Flujo de Trabajo

- Spec Kit: constitución → `/speckit-specify` → `/speckit-plan` →
  `/speckit-tasks` → `/speckit-implement`. Cada feature vive en
  `specs/NNN-nombre/`.
- Antes de cada push a `main` (que es producción en GitHub Pages) MUST
  verificarse: carga sin errores de consola, teclado recorre todos los CTA,
  reduced-motion muestra el perfil completo, y el sitio se ve correcto en
  414 px y 1440 px.
- Commits en español, concisos; la raíz del repo MUST servir siempre una
  página funcional (nunca un estado roto en producción).

## Governance

Esta constitución prevalece sobre cualquier otra práctica del repo. Una
enmienda requiere: registrar el cambio en `docs/00_…` (sección "Enmiendas
del usuario") con fecha, actualizar este archivo y subir la versión
(MAJOR: quitar/redefinir un principio; MINOR: añadir principio o sección;
PATCH: aclaraciones). Todo plan y spec MUST incluir un "Constitution Check"
que cite qué principio satisface o viola cada decisión; las violaciones se
justifican en "Complexity Tracking" o se descartan.

**Version**: 2.0.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-13

<!-- v2.0.0: I redefinido (sala de embarque e intro larga permitidas si son
saltables y recordadas), I-bis añadido (sin datos personales ni permisos),
III ampliado a los addons de postproceso, V con objetivos de rendimiento
medidos en producción en vez de aspiracionales. -->

