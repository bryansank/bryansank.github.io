# bryansank.github.io Constitution

Sitio personal de Bryan Key Hernández. Objetivo único: que un reclutador
técnico o CTO entienda su perfil en menos de 60 segundos y lo contacte.
Documentos rectores: `docs/00_wowportfolio_agent_system_prompt.md` (agente y
enmiendas) y `docs/02_contexto_bryan_key.md` (perfil real).

## Core Principles

### I. Contacto Primero (NON-NEGOTIABLE)
Descargar el CV y hablar con Bryan (WhatsApp, email, LinkedIn) MUST ser lo
primero visible y accesible en cualquier viewport, sin scroll y sin esperar
ninguna animación. La intro MUST poder saltarse en ≤1 s y MUST NOT ocultar
los CTA de contacto más de 4 s. Cada sección MUST terminar a ≤1 gesto de un
CTA de contacto (barra fija o botón visible).
*Rationale:* el sitio existe para conseguir empleo; todo efecto que retrase
el contacto va en contra del objetivo.

### II. Perfil Real sobre Espectáculo
Todo contenido MUST provenir de `docs/02_contexto_bryan_key.md` (LinkedIn,
CV). MUST NOT inventarse puestos, métricas ni tecnologías. La temática Star
Wars + videojuegos es la envoltura: nombres de sección, copy, color y forma;
nunca sustituye la información profesional. Un reclutador que lea solo el
texto (sin CSS ni JS) MUST obtener el perfil completo.

### III. Vanilla + Three.js como Única Excepción
HTML5 semántico, CSS3 moderno (custom properties, Grid, Flexbox, container
queries, scroll-driven animations) y JavaScript ES2022+ nativo. Three.js es
la ÚNICA librería permitida, exclusivamente para escenas 3D (sable, campo de
estrellas); MUST cargarse como ES module después del primer render y MUST
tener fallback CSS cuando WebGL o el módulo fallen. PROHIBIDOS React, Vue,
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
Lighthouse móvil ≥ 90 en Performance y 100 en Accessibility, Best Practices
y SEO; escritorio 100 en los cuatro. Animaciones solo con `transform`,
`opacity`, `clip-path` y filtros compuestos a 60 fps. Peso inicial (HTML +
CSS + JS crítico) ≤ 150 KB; Three.js y el video del sitio viejo se cargan
diferidos. Cero bloqueos de renderizado por fuentes o scripts externos.

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

**Version**: 1.0.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-13
