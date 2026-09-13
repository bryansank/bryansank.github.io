# Tasks: Portafolio "Capitán de la nave"

**Input**: Design documents from `/specs/001-portafolio-capitan-nave/`

**Prerequisites**: plan.md, spec.md

**Tests**: no se piden tests automatizados; la validación es el checklist de
la constitución (consola, teclado, reduced-motion, 414/1440 px) + Lighthouse.

## Phase 1: Setup

- [x] T001 Copiar `video-sitio-viejo/*.webm` → `assets/media/old-site.webm` y `favicon.ico` a la raíz
- [x] T002 Crear `specs/001-portafolio-capitan-nave/` (spec, plan, checklist) y `.specify/feature.json`

## Phase 2: Foundational

- [ ] T003 Esqueleto `index.html`: `<head>` (meta, OG, favicon, import map Three.js), tokens OKLCH para ambos temas, reset, tipografía fluida, layout Grid, barra de contacto fija
- [ ] T004 Diccionario i18n ES/EN completo (todas las cadenas del sitio) y helper `t()` + `data-i18n`
- [ ] T005 Preferencias (`localStorage`): tema, idioma, sonido, intro vista; aplicar antes del primer paint (script inline mínimo)

## Phase 3: US1 — Contacto primero (P1) 🎯 MVP

- [ ] T006 [US1] Hero "Puente de mando": nombre, USP, píldora Open to work, CTA `Descargar CV` (PDF por idioma) y `Hablar ahora` (WhatsApp con texto, email `mailto:` con asunto, LinkedIn)
- [ ] T007 [US1] Barra fija inferior/lateral con los 4 CTA; orden de tabulación CV → WhatsApp → email → LinkedIn
- [ ] T008 [P] [US1] `cv/es.html` y `cv/en.html` imprimibles desde `docs/02`; exportar a `assets/files/CV-Bryan-Key-2026-{ES,EN}.pdf` con Playwright

## Phase 4: US2 — Trayectoria en 60 s (P1)

- [ ] T009 [US2] Sección "Bitácora" (Acerca de) con texto LinkedIn en ES/EN
- [ ] T010 [US2] Sección "Hoja de servicio": 9 puestos como mapa galáctico (lista `<ol>` semántica + tarjetas 3D tilt), logros y stack, navegable por teclado
- [ ] T011 [P] [US2] Sección "Arsenal": habilidades por categoría como empuñaduras; hover/focus enciende hoja con color de categoría
- [ ] T012 [P] [US2] Secciones "Hangar" (Tormenta Imperial + GitHub) y "Transmisiones" (2 recomendaciones, holograma)
- [ ] T013 [US2] Sección "Canal abierto" + footer (redes, firma, link a `/old_site/`, "Hecho con ❤ y la Fuerza")

## Phase 5: US3 — Efecto wow (P2)

- [ ] T014 [US3] Fondo CSS de estrellas (fallback) + módulo Three.js `stars` lazy: hiperespacio por velocidad de scroll y parallax por puntero
- [ ] T015 [US3] Intro Three.js: `VideoTexture` del sitio viejo, sable emisivo con luz, corte en dos mallas que caen, ≤4 s, botón Saltar, omitida con reduced-motion / sin WebGL / intro ya vista
- [ ] T016 [P] [US3] Crawl en perspectiva para "Bitácora" con `animation-timeline: scroll()` y fallback estático
- [ ] T017 [P] [US3] Reveals `animation-timeline: view()` + fallback IntersectionObserver; micro-interacciones: botón magnético en CTA, grano `feTurbulence` en Hangar
- [ ] T018 [US3] Toggle Lado Oscuro/Luz con View Transition circular desde el botón; sonido de encendido si audio activo
- [ ] T019 [US3] Audio Web Audio sintetizado (encendido, hum en hover, hiperespacio); botón opt-in con estado ARIA; persistencia
- [ ] T020 [US3] Easter egg: `Shift+S` / Konami → cursor sable; `prefers-reduced-motion` lo desactiva

## Phase 6: US4 — Bilingüe (P2)

- [ ] T021 [US4] Detección `navigator.language`, toggle ES/EN con crossfade (View Transition), `lang` dinámico, CV del idioma activo

## Phase 7: Polish & verificación

- [ ] T022 Servidor local + Playwright: capturas 320/414/768/1440 px, consola limpia, tabulación completa, reduced-motion, tema claro
- [ ] T023 Lighthouse móvil/escritorio; ajustar hasta cumplir SC-003
- [ ] T024 Actualizar `docs/` con decisiones finales; commit y push a `main`; verificar `https://bryansank.github.io/` y `/old_site/`

## Dependencies & Execution Order

Setup → Foundational (T003–T005) bloquea todo. US1 (T006–T008) es el MVP y
se valida solo. US2 puede ir en paralelo con US1 tras T004. US3 depende de
US1/US2 (necesita el DOM final). US4 depende de T004. Polish al final.
