# Feature Specification: Portafolio "Capitán de la nave"

**Feature Branch**: `001-portafolio-capitan-nave`

**Created**: 2026-09-13

**Status**: Approved (arquitectura aprobada por el usuario el 2026-09-13)

**Input**: User description: "Nuevo sitio personal con temática 100 % Star
Wars y videojuegos, animaciones 3D e iluminación avanzada, donde un sable de
luz rebana el video del sitio viejo y nace el nuevo. El foco es el impacto de
ver mi perfil de trabajo. El contacto debe ser SÍ O SÍ lo primero: descargar
mi CV YA y hablar conmigo YA. Bilingüe ES/EN, accesible, rápido."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reclutador contacta en menos de 10 segundos (Priority: P1)

Un reclutador técnico abre el sitio desde LinkedIn (móvil o escritorio). Sin
esperar ni desplazarse ve el nombre, la propuesta de valor, el estado "Open
to work" y tres acciones: descargar CV, escribir por LinkedIn, abrir
email/GitHub. Mientras lee, una barra fija mantiene esas acciones a un
toque.

**Why this priority**: es el único objetivo de negocio del sitio; sin esto,
lo demás no vale.

**Independent Test**: abrir la página en 414 px y 1440 px; en ≤10 s y sin
scroll el CV se descarga y LinkedIn/email/GitHub se abren (el email con
asunto prellenado).

**Acceptance Scenarios**:

1. **Given** primera visita en móvil, **When** carga la página, **Then** los
   CTA de CV y contacto son visibles sobre el pliegue en ≤4 s aunque la
   intro siga reproduciéndose, y un botón "Saltar" la termina al instante.
2. **Given** el usuario está en cualquier sección, **When** quiere contactar,
   **Then** la barra fija ofrece CV + LinkedIn + email + GitHub sin volver
   arriba.
3. **Given** un usuario con teclado, **When** pulsa Tab desde el inicio,
   **Then** el primer foco cae en "Descargar CV" y el segundo en "Hablar
   ahora".

---

### User Story 2 - Reclutador entiende la trayectoria en 60 segundos (Priority: P1)

El reclutador baja por la "hoja de servicio": nueve puestos 2018→2026 con
empresa, rol, fechas, impacto medible y stack, más la sección "Acerca de",
el arsenal tecnológico y dos recomendaciones reales.

**Why this priority**: la decisión de contactar depende de que el perfil se
entienda rápido y sea creíble (datos reales de LinkedIn).

**Independent Test**: sin CSS/JS (modo lectura), el texto contiene los 9
puestos con fechas, el "Acerca de" y el stack; con CSS/JS, se leen en ≤60 s
en móvil.

**Acceptance Scenarios**:

1. **Given** la sección Experiencia, **When** el usuario enfoca o pasa el
   cursor por una empresa, **Then** la tarjeta muestra rol, fechas, 1–3
   logros con métrica y las tecnologías, en el idioma activo.
2. **Given** modo lectura o lector de pantalla, **When** recorre el
   documento, **Then** los encabezados siguen el orden Hero → Acerca →
   Experiencia → Stack → Proyecto → Recomendaciones → Contacto.

---

### User Story 3 - Visitante vive el "efecto wow" Star Wars (Priority: P2)

Al entrar, el sitio anterior aparece como holograma y un sable de luz lo
rebana; las mitades caen y del corte nace el nuevo sitio. El fondo es un
campo de estrellas que salta al hiperespacio al desplazarse. El "Acerca de"
se lee como crawl en perspectiva. El stack son empuñaduras que se encienden.
El visitante puede elegir Lado Oscuro/Luz (tema) e idioma con transiciones
de barrido, y activar sonido sintetizado.

**Why this priority**: diferencia el perfil y demuestra dominio frontend,
pero nunca a costa de P1/P2.

**Independent Test**: en un navegador con WebGL y sin reduced-motion, la
intro dura ≤4 s, el fondo reacciona al scroll y al mouse, y el toggle de tema
cambia toda la paleta con barrido circular.

**Acceptance Scenarios**:

1. **Given** reduced-motion activo o sin WebGL, **When** carga, **Then** no
   hay intro ni 3D: el hero con CTA aparece de inmediato y el fondo es
   estático.
2. **Given** el sonido está apagado por defecto, **When** el usuario lo
   activa, **Then** suena el encendido del sable y el hover del arsenal; al
   recargar, la preferencia se recuerda.
3. **Given** tema Lado Oscuro, **When** pulsa el toggle, **Then** la paleta
   pasa a Lado Luz (crema/verde/dorado) con contraste AAA y la elección se
   persiste.

---

### User Story 4 - Reclutador angloparlante lee todo en inglés (Priority: P2)

Un CTO de EE. UU. abre el sitio; detecta su idioma y todo el contenido
(secciones, tarjetas, CTA, CV) está en inglés; puede cambiar a español con
un toggle.

**Independent Test**: con `navigator.language = en-US` todo el texto visible
está en inglés y el atributo `lang` del documento es `en`; el CV descargado
corresponde al idioma.

**Acceptance Scenarios**:

1. **Given** idioma inglés, **When** cambia a ES, **Then** no hay recarga,
   la transición es un crossfade y `lang="es"`.

### Edge Cases

- Viewport ≤320 px (smartwatch): sin 3D, lista vertical, CTA apilados,
  tipografía ≥14 px.
- Pantalla ≥2560 px: el contenido no supera 1280 px de ancho de lectura;
  el campo de estrellas cubre todo.
- Falla la carga de Three.js (CDN caído/offline): la intro se salta sola y el
  fondo usa CSS; ningún error visible.
- El video del sitio viejo no carga: la intro corta un póster estático.
- JavaScript deshabilitado: el perfil completo y los CTA funcionan (enlaces
  `mailto:`, LinkedIn, PDF).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El hero MUST mostrar nombre, USP, estado "Open to work" y los
  CTA "Descargar CV" y "Hablar ahora" (LinkedIn, email, GitHub) sobre el
  pliegue en móvil y escritorio.
- **FR-002**: Una barra de contacto fija MUST estar disponible en toda la
  página con CV, LinkedIn, email y GitHub.
- **FR-002b**: El sitio y el CV MUST NOT exponer el número de teléfono
  personal, para evitar scraping y spam (decisión del usuario, 2026-09-13).
- **FR-003**: El CV MUST descargarse como PDF actualizado (2026) en el idioma
  activo; los enlaces de contacto MUST llevar un mensaje prellenado.
- **FR-004**: La intro (video viejo rebanado) MUST durar ≤4 s, ser saltable
  y omitirse con reduced-motion, sin WebGL o en visitas repetidas.
- **FR-005**: La sección Experiencia MUST listar los 9 puestos de
  `docs/02_contexto_bryan_key.md` con empresa, rol, fechas, logros y stack.
- **FR-006**: Las secciones Acerca de, Stack, Proyecto (Tormenta Imperial),
  Recomendaciones y Contacto MUST existir con contenido real.
- **FR-007**: Toggle de tema Lado Oscuro/Luz y toggle ES/EN MUST persistir la
  elección y funcionar por teclado con estado anunciado (ARIA).
- **FR-008**: Sonido MUST ser opt-in, sintetizado, recordado entre visitas.
- **FR-009**: Todo el sitio MUST ser navegable por teclado con foco visible
  y cumplir WCAG 2.1 AA (AAA en contraste de texto).
- **FR-010**: `old_site/` MUST seguir accesible y enlazado desde el footer
  ("Ver la nave anterior").

### Key Entities

- **Perfil**: nombre, USP, estado laboral, ubicación, contactos, idiomas.
- **Puesto**: empresa, rol, inicio, fin, ubicación, logros[], stack[].
- **Habilidad**: nombre, categoría (core/móvil/backend/infra/IA), color.
- **Recomendación**: autor, cargo, cita, idioma original.
- **Preferencias**: tema, idioma, sonido, intro vista.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario nuevo puede descargar el CV o abrir WhatsApp en ≤10
  s desde la carga, sin scroll, en móvil y escritorio.
- **SC-002**: Los 9 puestos con fechas y métricas se leen en ≤60 s en móvil
  (prueba con 3 lectores).
- **SC-003**: Lighthouse móvil ≥90 Performance y 100 A11y/BP/SEO; escritorio
  100/100/100/100.
- **SC-004**: 0 errores de consola en Chrome, Firefox y Safari; 0 errores
  axe-core.
- **SC-005**: Con reduced-motion el perfil completo es visible en ≤1 s tras
  la carga.
- **SC-006**: El sitio funciona sin JavaScript para leer el perfil y usar los
  4 CTA de contacto.

## Assumptions

- Resuelto: no se publica teléfono. Los canales son LinkedIn (principal),
  email y GitHub.
- El CV 2026 se genera desde `docs/02_contexto_bryan_key.md` (ES y EN) como
  PDF estático en `assets/files/`.
- No hay logos nuevos de Consolidez/QPlus/Lapzo/KED; se usan iniciales en
  insignias hasta que el usuario los aporte.
- Three.js se sirve desde un CDN con versión fija; sin conexión, el sitio
  degrada a CSS.
- Hosting: GitHub Pages desde `main` raíz, sin build.
