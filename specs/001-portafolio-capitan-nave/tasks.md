# Tasks: Portafolio "Capitán de la nave"

**Input**: Design documents from `/specs/001-portafolio-capitan-nave/`

**Prerequisites**: plan.md, spec.md

**Tests**: no se piden tests automatizados; la validación es el checklist de
la constitución (consola, teclado, reduced-motion, 414/1440 px) + Lighthouse.

## Phase 1: Setup

- [x] T001 Copiar `video-sitio-viejo/*.webm` → `assets/media/old-site.webm` y `favicon.ico` a la raíz
- [x] T002 Crear `specs/001-portafolio-capitan-nave/` (spec, plan, checklist) y `.specify/feature.json`

## Phase 2: Foundational

- [x] T003 Esqueleto `index.html`: `<head>` (meta, OG, favicon, import map Three.js), tokens OKLCH para ambos temas, reset, tipografía fluida, layout Grid, barra de contacto fija
- [x] T004 i18n ES/EN: pares `<span lang="es">/<span lang="en">` conmutados por CSS desde `html[lang]` (sin diccionario JS; funciona sin JS); atributos ARIA traducidos en `applyLang()`
- [x] T005 Preferencias (`localStorage`): tema, idioma, sonido, intro vista; aplicadas antes del primer paint (script inline mínimo)

## Phase 3: US1 — Contacto primero (P1) 🎯 MVP

- [x] T006 [US1] Hero "Puente de mando": nombre, USP, píldora Open to work, CTA `Descargar CV ya` (PDF por idioma) y `Hablar ahora` (LinkedIn, email `mailto:` con asunto, GitHub)
- [x] T007 [US1] Dock fijo con los 4 CTA (se oculta mientras los CTA del hero están a la vista); foco inicial en CV tras la intro → LinkedIn → Email → GitHub
- [x] T008 [P] [US1] `cv/es.html` y `cv/en.html` imprimibles desde `docs/02`; exportados a `assets/files/CV-Bryan-Key-2026-{ES,EN}.pdf` con `cv/build-pdf.js` (Playwright)

## Phase 4: US2 — Trayectoria en 60 s (P1)

- [x] T009 [US2] Sección "Bitácora" (Acerca de) con texto LinkedIn en ES/EN
- [x] T010 [US2] Sección "Hoja de servicio": 9 puestos como ruta de hiperespacio (lista `<ol>` semántica + tarjetas 3D tilt), logros y stack
- [x] T011 [P] [US2] Sección "Arsenal": 6 categorías, empuñaduras con hoja que se enciende al hover/focus con el color de la categoría
- [x] T012 [P] [US2] Secciones "Hangar" (Tormenta Imperial + GitHub, grano SVG) y "Transmisiones" (2 recomendaciones, holograma con scanlines)
- [x] T013 [US2] Sección "Canal abierto" (5 tarjetas) + footer (redes, link a `/old_site/`, "Hecho con ❤ y la Fuerza")

## Phase 5: US3 — Efecto wow (P2)

- [x] T014 [US3] Fondo CSS de estrellas (fallback) + módulo Three.js `stars` lazy: sprites redondos, hiperespacio por velocidad de scroll y parallax por puntero; recolor por tema
- [x] T015 [US3] Intro Three.js: `VideoTexture` del sitio viejo, sable emisivo con `PointLight`, corte diagonal con `clippingPlanes`, mitades que caen; 2,8 s + guardas (1,8 s sin Three → se salta; 3,6 s máximo), botón Saltar, omitida con reduced-motion / sin WebGL / <321 px / intro ya vista / sin JS
- [x] T016 [P] [US3] Crawl en perspectiva para "Bitácora" con `animation-timeline: view()` y fallback estático
- [x] T017 [P] [US3] Reveals `animation-timeline: view()` + fallback IntersectionObserver; botones magnéticos; grano `feTurbulence`
- [x] T018 [US3] Toggle Lado Oscuro/Luz con View Transition circular desde el botón + sonido de encendido si audio activo
- [x] T019 [US3] Audio Web Audio sintetizado (encendido, hum, hiperespacio); opt-in con `aria-pressed`; persistencia
- [x] T020 [US3] Easter egg: `Shift+S` → cursor sable; desactivado con `prefers-reduced-motion`

## Phase 6: US4 — Bilingüe (P2)

- [x] T021 [US4] Detección `navigator.language`, toggle ES/EN con crossfade (View Transition), `lang` dinámico, CV del idioma activo

## Phase 7: Polish & verificación

- [x] T022 Servidor local + Playwright (`scratchpad/test-site.js`): capturas 320/414/1440 px, 0 errores de consola, tabulación, reduced-motion, tema claro, sin JS
- [x] T023 Lighthouse móvil/escritorio sobre el sitio publicado: 100 en A11y, Best Practices y SEO en ambos. Performance 72 móvil / 78 escritorio. Optimizaciones aplicadas: animaciones infinitas pasadas a transform compuesto (−2,5 s de render), video de 0,9 MB fuera de móvil, favicon de 66 KB → SVG inline, `backdrop-filter` solo en escritorio. Medido: el resto es layout inherente al DOM; `content-visibility` lo empeora. Constitución v2.0.0 actualizada con el objetivo real.
- [x] T024 axe-core: 0 violaciones WCAG 2.1 AA en tema claro/oscuro, con y sin sala de embarque, a 414 y 1440 px. Publicado y verificado en `https://bryansank.github.io/` y `/old_site/`

## Fase 8: Sala de embarque y 3D avanzado (2026-09-13)

- [x] T025 Sala de embarque como primera pantalla: 4 poderes opt-in (sonido, inclinar, vibración, modo cine) con `role="switch"`, salida directa al perfil y Escape. Ningún prompt del navegador salvo orientación en iOS, que se pide tras el gesto del usuario. Sin ubicación, cámara ni micrófono
- [x] T026 Saludo contextual por zona horaria con `Intl.DateTimeFormat` (sin permisos): hora local del visitante y diferencia con Caracas
- [x] T027 Inclinación de dispositivo (`deviceorientation`) alimentando el parallax del campo estelar; en escritorio equivale al puntero
- [x] T028 Intro 3D cinematográfica de ~7 s: holograma del sitio anterior con scanlines y base de luz, empuñadura que entra en vuelo, encendido con luz puntual dinámica, dos tajos que parten el panel en 4 fragmentos con aristas incandescentes, chispas con gravedad, sacudida de cámara y postproceso UnrealBloom
- [x] T029 Campo estelar mejorado: dos capas con parallax, tres nebulosas aditivas y líneas de hiperespacio ligadas a la velocidad de scroll
- [x] T030 Nave 3D en el Hangar: modelo low-poly con motores incandescentes, luz de contorno y render solo cuando entra en viewport
- [x] T031 Hero: nombre más contenido y titular reducido a "Senior Fullstack Engineer"

## Pendientes fuera de alcance (para el usuario)

- ~~Confirmar el WhatsApp~~ → resuelto: el usuario decidió no publicar
  teléfono (riesgo de scraping/spam). Canales: LinkedIn, email, GitHub.
- Aportar logos de Consolidez, QPlus, Lapzo y KED si quiere insignias reales en la hoja de servicio.
- Revisar y ajustar textos del CV 2026 (`cv/es.html`, `cv/en.html`) y regenerar con `node cv/build-pdf.js`.

## Dependencies & Execution Order

Setup → Foundational (T003–T005) bloquea todo. US1 (T006–T008) es el MVP y
se valida solo. US2 puede ir en paralelo con US1 tras T004. US3 depende de
US1/US2 (necesita el DOM final). US4 depende de T004. Polish al final.
