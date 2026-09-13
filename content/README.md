# Textos del sitio

Todo el texto visible (español e inglés) vive en **`textos.json`**. Son 94
entradas con una clave por sección, por ejemplo `servicio.04` o `canal.02`.

## Cambiar un texto

1. Abre `content/textos.json` y edita el valor `es` y/o `en`.
2. Ejecuta desde la raíz del proyecto:

   ```bash
   node content/aplicar.js
   ```

3. Listo: el texto ya está en `index.html`. Haz commit y push.

## Por qué no se carga el JSON en el navegador

Sería más cómodo que el sitio leyera el JSON en tiempo real, pero eso tiene
dos costes que no valen la pena en un portafolio:

- **Sin JavaScript el sitio quedaría vacío.** Hoy el perfil completo se lee
  aunque el JS falle o esté bloqueado.
- **Google indexaría una página en blanco**, y el objetivo del sitio es que
  te encuentren.

Con este sistema el JSON es la fuente de verdad para editar, pero el texto
final queda escrito dentro del HTML. Lo mejor de los dos mundos.

## Cómo funciona por dentro

Cada texto del HTML está marcado con `data-t="clave"`:

```html
<span lang="es" data-t="arsenal.01">Un sable por cada batalla</span>
<span lang="en" data-t="arsenal.01">A saber for every battle</span>
```

- `aplicar.js` lee el JSON y reescribe el contenido de cada elemento marcado.
- `extraer.js` hace lo contrario: recorre el HTML, marca los textos nuevos y
  regenera el JSON. Úsalo **solo si añades secciones nuevas** al HTML a mano.

## Reglas

- **No cambies las claves** (`data-t`) ni en el HTML ni en el JSON: son el
  puente entre ambos.
- Puedes usar HTML dentro de los textos (`<b>`, `<a href="…">`). Se respeta
  tal cual.
- Si añades un texto nuevo, ponle `lang="es"`/`lang="en"` en el HTML y corre
  `node content/extraer.js` para que se registre.
- Mantén ambos idiomas. Si dejas uno vacío, esa sección se verá en blanco
  para quien tenga ese idioma.

## Otros textos que NO están aquí

- El **CV en PDF**: se edita en `cv/es.html` y `cv/en.html` y se regenera con
  `node cv/build-pdf.js`.
- Los **rótulos de la intro** (el HUD que dice "Archivo recuperado") están en
  el JavaScript de `index.html`, porque se generan durante la animación.
- El **contexto de perfil** (experiencia, fechas, logros) está documentado en
  `docs/02_contexto_bryan_key.md`.

## Cuidado con las claves duplicadas

Cada clave debe aparecer **exactamente 2 veces** en el HTML: una en el
`lang="es"` y otra en el `lang="en"`. Si dos textos distintos comparten
clave, `aplicar.js` sobrescribe uno con el otro y se pierde texto.

`extraer.js` lo verifica y avisa:

```
⚠  CLAVES MAL USADAS (deberían aparecer 2 veces, una por idioma):
   data-t="transmisiones.01" aparece 4 veces
```

Si sale ese aviso, corrige el HTML **antes** de ejecutar `aplicar.js`.

## Reiniciar la experiencia

El sitio guarda 4 cosas en `localStorage`: `bk-theme`, `bk-lang`,
`bk-sound` y `bk-intro` (si ya viste la intro). Para volver a verlo todo
desde cero hay dos formas:

- El botón **«Reiniciar experiencia»** al final de la página.
- Añadir `?reset` a la URL: `https://bryansank.github.io/?reset`
  (útil como marcador para demos; la URL se limpia sola).

No se borra en cada recarga a propósito: un reclutador que vuelve no
debería tragarse la intro de 11 segundos otra vez.
