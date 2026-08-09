# Card Material Refinement

## Objetivo

Refinar la capa visual de `GhCardComponent` para que se perciba como una placa suspendida de
Liquid Glass, en continuidad con Navigation y con el fondo ambiental. La API, el DOM, los slots,
el layout, la semántica y el comportamiento permanecen sin cambios.

## Material Strategy

Card sigue resolviendo sus cuatro variantes desde los roles de Surface: `outlined` conserva Solid,
`subtle` usa Glass Subtle, `glass` usa Glass y `elevated` usa Glass Elevated. Sobre esos roles, cada
variante incorpora una receta de Card compuesta por fondo material, reflejo, límite exterior,
borde interior, filtro y una única sombra ambiental exterior. La receta se publica mediante
tokens `card.*` y el SCSS no consume valores primitivos.

## Transparency

Las variantes filtradas conservan suficiente masa para sostener el contraste, pero su capa base
se mezcla con transparencia para que Lavender, Cloud Blue y Peach continúen detrás de la Card.
`outlined` mantiene un fondo opaco porque sigue siendo la opción segura para formularios, lectura
densa y contextos no controlados.

## Blur

El blur es estático y progresa con la jerarquía: `subtle` usa `glass.blur.sm`, `glass` usa
`glass.blur.md` y `elevated` usa `glass.blur.lg`. Los tres combinan saturación `default` para
preservar el color ambiental sin volverlo intenso. `outlined` continúa con `none`. Ningún filtro
forma parte de una transición.

## Reflections

El fondo material aporta luz superior y una reflexión diagonal de marca. Un segundo pseudo-elemento
pointer-inert añade una reflexión localizada en la esquina superior izquierda y una presencia muy
tenue en el lateral derecho. Las intensidades crecen de forma controlada entre Solid, Subtle, Glass
y Elevated; no se añaden nodos al DOM.

## Inner Border

El espesor se construye mediante una línea superior de baja opacidad y un `innerShadow` compuesto:
luz superior, una señal fría a la izquierda y un borde inferior apenas visible. Este tratamiento
ocupa cero espacio de layout y no recorta los anillos de foco. El alias `dividerColor` reduce la
opacidad de separadores internos sin eliminar su estructura; el Hero de Home lo consume para su
lista de highlights.

## Outer Border

El borde exterior deriva del límite de cada Surface y se mezcla nuevamente con transparencia. Su
función es cerrar la silueta, no dominarla. `outlined` conserva una delimitación algo más clara por
ser Solid; las variantes Glass dependen también de reflejo, blur y borde interior.

## Shadows

Cada variante usa una sola sombra exterior amplia, difusa y de baja opacidad. El radio y la caída
aumentan con la jerarquía, evitando el aspecto compacto y duro asociado a una Card Material elevada.
Los inset shadows se consideran tratamiento del borde interior, no elevaciones adicionales.

## Ambient Integration

La Card se renderiza dentro del mismo plano ambiental que Hero y Navigation. Las capas translúcidas
modifican cómo se percibe ese fondo en lugar de sustituirlo. Storybook incluye una integración con
el Hero real, Showcase ofrece una etapa de diagnóstico sobre `GhAmbientBackgroundComponent` y los
paneles Hero del Portfolio consumen la misma receta mediante una utilidad visual privada, sin
cambiar su contenido ni layout.

## Light Theme

Ivory y las superficies claras permanecen como base, sin depender de blanco puro como única señal.
Los reflejos de Lavender, Cloud Blue y Peach usan alphas bajos, el borde se vuelve secundario y el
texto conserva los roles semánticos existentes.

## Dark Theme

Las mismas claves resuelven a Deep Ink y blue-gray mediante el tema oscuro generado. La mayor masa
de las Surface oscuras conserva legibilidad mientras el blur, el reflejo frío y la sombra mantienen
profundidad sin convertir la Card en negro sólido.

## Performance

La implementación es CSS-only: no agrega JavaScript, listeners, observers ni dependencias. Solid no
filtra. Cada variante Glass crea como máximo un filtro delimitado, tres capas de fondo y un overlay
decorativo de dos capas. El blur no se anima y se mantiene la recomendación de evitar Glass anidado
o grandes grillas filtradas sin medición.

## Comparación con el mockup

La implementación reproduce la dirección documentada: placa suspendida, continuidad ambiental,
luz superior, reflexión superior izquierda, señal lateral tenue, borde exterior secundario, espesor
interior y sombra difusa. No se afirma paridad exacta: el mockup aprobado no forma parte de los
assets versionados de esta rama y el resultado final depende del motor de `backdrop-filter`, el
fondo real y la pantalla.

## Limitaciones

`backdrop-filter` puede variar entre navegadores y se reemplaza por una receta opaca cuando no está
disponible. Forced Colors elimina reflejos, gradientes, blur y sombras en favor de colores del
sistema. La validación automatizada cubre contrato, SSR y generación de temas, pero no sustituye una
revisión humana de contraste y material sobre cada dispositivo físico.

## Recomendaciones para PR 26.2

Mantener el DOM y los tokens actuales. Si se aprueba motion, limitarlo a color, opacidad, elevación
o una traslación mínima; preservar `prefers-reduced-motion`; medir el costo; y nunca animar blur,
`backdrop-filter`, gradientes ambientales o layout. Los estados avanzados deben seguir apoyándose
en controles nativos y no convertir el `<article>` en un botón sintético.
