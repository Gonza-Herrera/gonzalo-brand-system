# Card Layout Integration

## Contexto

PR 26.15 integra la Card Liquid Glass refinada con Hero y el Ambient Background existente. No
rediseña Card ni modifica su API, variantes, contenido, tipografía o comportamiento.

## Problema identificado

El Portfolio ya tenía un único canvas ambiental compartido, pero los wrappers internos
`.gh-hero__section` y `.gh-hero__visual` aplicaban `overflow: hidden`. Ese recorte hacía que la
sombra difusa y los límites exteriores de la Card terminaran dentro de la caja de Hero, reduciendo
la sensación de suspensión y continuidad. El problema no era falta de blur ni una opacidad
incorrecta.

## Background ownership

Antes y después, `PortfolioShellComponent` es el único owner del Ambient Background público. Su
preset `brand/default` envuelve Navigation y Main; Main y el Hero inicial son transparentes. Card
no monta otro Ambient Background ni crea un gradiente de contexto propio.

```text
Portfolio Shell
└── Ambient Background
    ├── Navigation
    └── Main
        └── Hero
            ├── Hero Content
            └── Glass Card
```

## Hero architecture

Hero conserva su Section, Container `wide`, grid, orden del DOM y proyección `ghHeroVisual`. El
único cambio de la implementación pública es que Section y el wrapper visual permiten overflow
visible. Las composiciones de media que necesiten clipping deben resolverlo en su propia capa.

## Card placement

La Card permanece en la segunda celda del grid existente y en flujo normal. No se agregan Surface,
wrappers sólidos, offsets, posiciones absolutas ni `translateY` para simular flotación.

## Ambient continuity

El preset `brand` existente ya ubica Lavender cerca del contenido, Cloud Blue detrás de la región
derecha y Peach en la región inferior. Como Hero y Card están dentro del mismo owner transparente,
esas variaciones constituyen el backdrop real filtrado por Card.

## Backdrop-filter context

Card conserva un único `backdrop-filter` estático definido por sus tokens. Detrás existen la capa
visual absoluta del Ambient Background y ancestros transparentes; no existe una Surface sólida
intermedia. El fallback opaco continúa disponible cuando el navegador no soporta el filtro.

## Stacking context

Ambient Background mantiene `isolation: isolate` para encapsular su canvas. Su visual decorativo se
pinta antes del contenido relativo. La Card conserva su aislamiento interno para ordenar reflejos y
contenido, sin introducir un nuevo fondo ambiental. No se añadieron stacking contexts.

## Z-index

No se modificó la escala. Ambient Effects permanecen detrás de Hero Content y Card; Navigation
conserva su token de z-index; overlays futuros quedan fuera de este trabajo. No se usan valores
arbitrarios.

## Overflow

Se reemplazó el clipping de Section y visual wrapper por `overflow: visible`. Esto permite que
shadow, reflections y focus outlines se proyecten sobre el canvas compartido. Card continúa sin
clipping general y su región de media conserva el clipping específico aprobado.

## Grid alignment

Hero conserva `container.wide`, gap `space.2xl`, columnas `1.05fr / 0.95fr` y alineación central. La
Card sigue la misma grilla y gutters que el Header. No se crearon tokens porque no había valores
repetidos nuevos ni una diferencia de proporción demostrada.

## Light Theme

Light reutiliza el preset ambiental y el material Glass generado. La base translúcida evita que la
Card se convierta en una placa blanca completamente independiente; borde, reflejos y sombra siguen
siendo semánticos.

## Dark Theme

Dark reutiliza la misma estructura con mappings oscuros: Surface Primary translúcida, foreground
claro y preset ambiental de menor intensidad. No hay overrides que conviertan Card en una Surface
blanca.

## Responsive

El grid existente pasa a una columna por debajo del breakpoint `md`. Content y Card permanecen
dentro del mismo Ambient Background. `min-width: 0` y `max-width: 100%` siguen evitando overflow
horizontal sin ocultar sombras o focus.

## Mobile

En mobile el orden continúa siendo Hero Content seguido por Card. No se crea una sección o fondo
separado para la Card y no se alteran tamaños táctiles, orden de foco ni jerarquía de headings.

## SSR

La integración es CSS-only y el markup permanece determinista. No se usan `window`, `document`,
mediciones de viewport, random values ni ramas específicas de plataforma, por lo que SSR e
hidratación conservan el contrato existente.

## Performance

No se agregan JavaScript, listeners, observers, timers, dependencias, imágenes ni filtros. El cambio
elimina clipping y reutiliza el Ambient Background y el filtro ya existentes; el coste de runtime es
prácticamente neutro.

## Comparison with mockup

La implementación coincide conceptualmente en background compartido, Card en flujo normal,
distribución Lavender/Blue/Peach, material translúcido oscuro en Dark y sombra proyectada sobre el
mismo Hero. No se afirma paridad pixel-perfect: el repositorio no contiene el raster medible del
mockup aprobado y la política del navegador del entorno bloqueó las capturas de localhost.

## Remaining differences

- Backdrop blur, color mixing y saturación pueden variar según el motor del navegador.
- Las capturas comparativas Light/Dark, desktop, tablet, mobile y zoom 200% requieren validación
  manual en un navegador con localhost habilitado.
- El fallback sin backdrop-filter es necesariamente más opaco que la experiencia mejorada.

## Recommendations for PR 26.2

PR 26.2 puede abordar Card Motion & Interaction después de completar la revisión visual manual. El
movimiento debe permanecer CSS-only, respetar reduced motion y nunca animar `filter` o
`backdrop-filter`. No debe compensar con motion ninguna diferencia ambiental restante.
