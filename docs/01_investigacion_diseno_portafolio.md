# Investigación: portafolio "flex" de diseño frontend (sin proyectos aún) — 2026

Notas de investigación que alimentan `/speckit-constitution` y
`/speckit-specify`. Contexto: portafolio básico cuyo único objetivo es
demostrar dominio de animación, color y forma — no muestra proyectos reales
todavía. Debe respetar las restricciones de
[00_wowportfolio_agent_system_prompt.md](./00_wowportfolio_agent_system_prompt.md)
(vanilla HTML/CSS/JS, WCAG AA/AAA, responsive extremo, bilingüe ES/EN,
Lighthouse 100/100).

## 1. Tendencias visuales vigentes

- **Bento grids**: ya son la base esperada (~67% de sitios destacados), no el
  "wow" en sí — úsalo para estructurar, no para sorprender.
- **Tipografía cinética** es el diferenciador dominante: titulares enormes con
  fuentes variables que se construyen letra por letra o mutan al hacer
  scroll/hover. Viable 100% en CSS (ejes de variable fonts + `animation-timeline`).
- Glassmorphism/neumorphism pasaron a ser textura de fondo, no protagonistas.
  Lo que los reemplaza: **"tactile brutalism"** (grillas crudas, estructura
  expuesta, tipografía editorial con confianza) y **"invisible architecture"**
  (contenido primero, movimiento contenido hasta que se "gana" el momento).
- **OKLCH** reemplazó a HSL para sistemas de color en 2026 (soporte >96%):
  pasos de luminosidad perceptualmente uniformes, ideal para paletas
  accesibles y defendibles ante WCAG.
- Referencias reales (Awwwards): *Mat Voyce* (portafolio de tipografía
  cinética basada en scroll), *By-Kin* (tipografía editorial + transiciones de
  "superficie continua", contención sobre espectáculo).

## 2. Animación por scroll: CSS nativo vs IntersectionObserver

- `animation-timeline: view()` / `scroll()` (spec de Scroll-Driven Animations)
  ya es **viable en producción**: Chrome/Edge 115+, Safari 18+ (sep 2025),
  Firefox aún tras flag (~84% soporte global a mediados de 2026).
- Corre fuera del hilo principal (compositor), dando 60fps reales sin JS y sin
  jank — objetivamente mejor que IntersectionObserver para reveals de
  scroll con transform/opacity.
- Patrón recomendado: `view()`/`scroll()` como mecanismo primario, envuelto en
  `@supports not (animation-timeline: ...)` con fallback ligero a
  `IntersectionObserver` para Firefox. Cumple "cero librerías" +
  progressive enhancement a la vez.

## 3. View Transitions API para el toggle ES/EN y tema

- Totalmente viable en vanilla JS hoy: `document.startViewTransition(() => …)`
  con guard de `prefers-reduced-motion`. Transiciones same-document son
  shippable como mejora progresiva (feature-detect, fallback a cambio
  instantáneo).
- Patrón "wow" común: revelado circular expandiéndose desde el botón del
  toggle usando `::view-transition-new(root)` + `clip-path` circular — el
  mismo mecanismo sirve tanto para dark/light como para el cambio de idioma
  (crossfade o circle-wipe del bloque de texto).

## 4. "Portafolio sin proyectos"

- No existe un patrón documentado específico, pero la guía adyacente es
  consistente: presentar el sitio explícitamente como demostración de
  concepto/habilidad, sin esconder la ausencia de proyectos de cliente — que
  el oficio (motion, tipografía, sistema de color) sea el caso de estudio en
  sí mismo.

## 5. Ideas "wow" frescas en vanilla CSS/JS (2026)

- **SVG `feTurbulence` + `feDisplacementMap`** como filtro inline (data-URI)
  para grano orgánico / distorsión / ripple en scroll o hover — casi cero
  bytes, acelerado por GPU, sin frameworks.
- **Tipografía cinética "scramble" ligada a scroll**: letras dispersas en
  `<span>` individuales vía `transform`/`opacity`, dirigidas por
  `animation-timeline: view()`, que se "resuelven" en texto legible a medida
  que la sección entra en viewport.

## Fuentes

- [2026 web design guide: Bento grids and kinetic typography (B12)](https://www.b12.io/resource-center/website-design/web-design-guide-bento-grids-and-kinetic-typography/)
- [Web Design Trends 2026: Tactile Brutalism & Invisible Architecture (Fireart)](https://fireart.studio/blog/the-best-web-design-trends/)
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [CSS Scroll-Driven Animations Guide 2026 (CSSAWWWARDS)](https://cssawwwards.com/blog/css-scroll-driven-animations-guide-2026)
- [Full-page theme toggle with View Transitions API](https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/)
- [Why I Use OKLCH in Every Brand System Now](https://www.pravinkumar.co/blog/oklch-color-webflow-brand-system-2026)
- [10 Best Award-Winning Websites of 2026 (hontran.dev)](https://www.hontran.dev/blog/best-award-winning-websites-2026)
- [Scroll-based SVG Filter Animations on Text (Codrops)](https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/)
- [Awwwards Portfolio Websites](https://www.awwwards.com/websites/portfolio/)
