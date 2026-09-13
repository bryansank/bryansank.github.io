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

- [x] T006 [US1] Hero "Puente de mando": nombre, USP, píldora Open to work, CTA `Descargar CV ya` (PDF por idioma) y `Hablar ahora` (WhatsApp con texto, email `mailto:` con asunto, LinkedIn)
- [x] T007 [US1] Dock fijo con los 4 CTA (se oculta mientras los CTA del hero están a la vista); foco inicial en CV tras la intro → WhatsApp → Email → LinkedIn
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
- [ ] T023 Lighthouse móvil/escritorio; ajustar hasta cumplir SC-003
- [ ] T024 Actualizar `docs/` con decisiones finales; commit y push a `main`; verificar `https://bryansank.github.io/` y `/old_site/`

## Pendientes fuera de alcance (para el usuario)

- Confirmar que +58 424-201-4704 sigue siendo el WhatsApp correcto.
- Aportar logos de Consolidez, QPlus, Lapzo y KED si quiere insignias reales en la hoja de servicio.
- Revisar y ajustar textos del CV 2026 (`cv/es.html`, `cv/en.html`) y regenerar con `node cv/build-pdf.js`.

## Dependencies & Execution Order

Setup → Foundational (T003–T005) bloquea todo. US1 (T006–T008) es el MVP y
se valida solo. US2 puede ir en paralelo con US1 tras T004. US3 depende de
US1/US2 (necesita el DOM final). US4 depende de T004. Polish al final.
