# Implementation Plan: Portafolio "Capitán de la nave"

**Branch**: `main` (spec dir `001-portafolio-capitan-nave`) | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portafolio-capitan-nave/spec.md`

## Summary

Un solo `index.html` estático que pone el contacto primero (CTA en hero +
barra fija), presenta el perfil real de LinkedIn como "hoja de servicio" de
una nave, y envuelve todo en una capa Star Wars/videojuegos: intro con sable
de luz que rebana el video del sitio viejo (Three.js, ≤4 s, saltable), campo
de estrellas con hiperespacio al scroll, crawl en perspectiva, empuñaduras
de sable como stack, temas Lado Oscuro/Luz e idioma ES/EN con View
Transitions, sonido sintetizado opt-in. Investigación de base:
`docs/01_investigacion_diseno_portafolio.md`.

## Technical Context

**Language/Version**: HTML5, CSS3 (custom properties, OKLCH, Grid, container
queries, `animation-timeline`, View Transitions), JavaScript ES2022 (modules)

**Primary Dependencies**: Three.js 0.170.x vía import map desde
`cdn.jsdelivr.net` (única librería, carga diferida). Sin build.

**Storage**: `localStorage` para tema, idioma, sonido e "intro vista".

**Testing**: Playwright (ya instalado con @playwright/mcp) para capturas en
414/768/1440/320 px, consola sin errores y recorrido por teclado; Lighthouse
vía `npx lighthouse` si está disponible; axe-core inyectado desde CDN en la
sesión de prueba.

**Target Platform**: GitHub Pages (estático, HTTPS), navegadores evergreen;
Firefox sin `animation-timeline` recibe fallback IntersectionObserver.

**Project Type**: sitio web estático de una página.

**Performance Goals**: Lighthouse móvil ≥90 / A11y 100; escritorio 100×4;
60 fps en animaciones; LCP <2.5 s en 4G.

**Constraints**: peso crítico ≤150 KB; Three.js (~150 KB gz) y video (0.9 MB)
diferidos; sin fuentes bloqueantes (system stack + una variable font con
`font-display: swap` opcional); IP limpia.

**Scale/Scope**: 1 página, 8 secciones, 2 idiomas, 2 temas, 1 PDF por idioma.

## Constitution Check

| Decisión | Principio | Estado |
|---|---|---|
| CTA de CV/WhatsApp/email/LinkedIn en hero + barra fija; intro saltable ≤4 s | I Contacto Primero | ✅ |
| Contenido tomado de `docs/02`; secciones con nombres de nave pero datos reales | II Perfil Real | ✅ |
| Vanilla + Three.js solo en intro y fondo, import map, lazy tras `load` | III Vanilla + Three.js | ✅ |
| reduced-motion → sin intro/3D; teclado; ARIA; sonido opt-in; `lang` dinámico | IV Accesibilidad | ✅ |
| Presupuesto de peso, transform/opacity, video `preload=none` | V Rendimiento | ✅ |
| Sables/estrellas/sonidos generados; sin assets de Disney | VI IP limpia | ✅ |

Sin violaciones → Complexity Tracking vacío.

## Project Structure

### Documentation (this feature)

```text
specs/001-portafolio-capitan-nave/
├── plan.md
├── spec.md
├── tasks.md
└── checklists/requirements.md
```

### Source Code (repository root)

```text
index.html              # sitio completo: <style> + contenido + <script type="module">
favicon.ico
assets/
├── media/old-site.webm # video del sitio anterior (intro)
└── files/
    ├── CV-Bryan-Key-2026-ES.pdf
    └── CV-Bryan-Key-2026-EN.pdf
cv/                     # fuente HTML imprimible del CV (para regenerar el PDF)
├── es.html
└── en.html
old_site/               # sitio anterior intacto (constitución)
docs/                   # prompt, investigación, contexto
```

**Structure Decision**: un único `index.html` por mandato del prompt del
agente (despliegue trivial). El CV se mantiene como HTML imprimible en `cv/`
y se exporta a PDF con Playwright para que sea regenerable desde los datos.

## Diseño técnico

### Capas de renderizado

1. **Base sin JS**: HTML semántico con todo el contenido ES (y EN oculto por
   `hidden` hasta que JS elija). CTA como enlaces reales (`mailto:`,
   LinkedIn, PDF). Sin teléfono público.
2. **CSS**: tokens OKLCH en `:root[data-theme]`; layout Grid; hero con
   `min-height: 100svh`; crawl con `animation-timeline: scroll()`; reveals
   con `animation-timeline: view()` y `@supports not` → clase `.in-view` por
   IntersectionObserver.
3. **JS (module, tras `load`)**: i18n (diccionario `{es,en}` + `data-i18n`),
   preferencias, View Transitions para tema/idioma, sonido Web Audio,
   Konami/`Shift+S` para cursor-sable, carga condicional de Three.js.
4. **Three.js (lazy)**: `scene-intro`: plano con `VideoTexture` del webm,
   sable = cilindro emisivo + `PointLight` + sprite aditivo; corte = dos
   mallas con `clippingPlanes` opuestos que reciben velocidad angular; ≤4 s,
   luego `dispose()`. `scene-stars`: `Points` 4k estrellas, `z` escalado por
   velocidad de scroll (hiperespacio), parallax por `pointermove`.

### Paleta OKLCH

| Token | Lado Oscuro | Lado Luz |
|---|---|---|
| `--bg` | `oklch(13% 0.02 275)` | `oklch(97% 0.01 90)` |
| `--fg` | `oklch(96% 0.01 90)` | `oklch(18% 0.02 275)` |
| `--saber` | `oklch(62% 0.25 25)` rojo | `oklch(72% 0.21 145)` verde |
| `--accent` | `oklch(80% 0.16 85)` dorado | `oklch(55% 0.15 85)` dorado |
| `--muted` | `oklch(70% 0.02 275)` | `oklch(45% 0.02 275)` |

### Orden y nombres de sección

Hero "Puente de mando" → Acerca "Bitácora" → Experiencia "Hoja de
servicio" → Stack "Arsenal" → Proyecto "Hangar" → Recomendaciones
"Transmisiones" → Contacto "Canal abierto" → Footer (link a `/old_site/`).

## Complexity Tracking

Sin violaciones de la constitución.
