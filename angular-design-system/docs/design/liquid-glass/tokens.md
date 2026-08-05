# Liquid Glass design tokens

This document defines the public token contract for Liquid Glass materials. The editable source of
truth remains the repository-level [`/tokens`](../../../../tokens/) directory; generated SCSS
inside the Angular library must never be edited by hand.

PR 22 provides the material values consumed by the Surface primitives introduced in PR 23. PR 25
adds action component mappings and PR 26 adds Card component mappings; Portfolio consumers inherit
those compatible public migrations without a page redesign.

## Architecture

```text
Primitive JSON                     Semantic light / dark JSON
glass.*, ambient.opacity.*,        surface.solid.*, surface.glass.*,
global shadow, radius, border, ->  ambient.background.*, ambient.preset.*,
motion, focus                      overlay, interactive, disabled
                                      |
                                      v
                            generated --gh-* CSS properties
                                      |
                                      v
                         Surface primitives and components
```

- Primitive tokens describe controlled material ingredients. They do not carry product intent.
- Semantic tokens describe a surface role and are the only material layer future components should
  consume.
- Component tokens are added only when a component family demonstrates a real mapping need. PR 25
  adds `button.*` and `iconButton.*`; PR 26 adds `card.*`. Later families remain deferred to their
  own PRs.

Aliases are resolved by the existing generator. Semantic JSON therefore points to primitives or
other semantic roles instead of repeating their literal values.

## Naming

The system retains the existing `--gh-` prefix and uses one vocabulary:

- `glass-*` for material primitives, such as `--gh-glass-blur-sm`;
- `surface-*` for theme-aware intent, such as `--gh-surface-glass-background`.

There are no parallel `liquid-*` aliases. JSON keys use camel case where a nested role needs more
than one word; the generator publishes predictable kebab-case CSS names.

Ambient foundations follow the same vocabulary: `ambient-opacity-*` is the bounded primitive scale,
while `ambient-background-*`, `ambient-preset-*` and `ambient-intensity-*` are the only variables
the public Ambient Background component consumes.

## Primitive scales

### Blur

`glass.blur` has exactly six slots: `none`, `xs`, `sm`, `md`, `lg`, and `xl`. They progress from no
blur to the approved maximum. The scale is deliberately short and capped; there is no `2xl` or
`3xl` escape hatch.

Semantic materials currently use only the lower and middle slots. The larger primitives remain
available for measured overlay experiments, not routine component use.

### Saturation

`glass.saturation` has `none`, `subtle`, `default`, and `strong`. Every value stays close to the
unmodified backdrop so ambient brand colors are not exaggerated. Materials consume saturation only
through their composed semantic backdrop-filter token.

### Opacity

Neutral numeric scales are grouped by purpose:

- `glass.opacity.surface.{subtle|default|strong}` controls material containment;
- `glass.opacity.border.{subtle|default|strong}` controls boundaries;
- `glass.opacity.highlight.{subtle|default|strong}` controls internal light;
- `glass.opacity.overlay.{subtle|default|strong}` controls focus-isolating backdrops;
- `glass.opacity.disabled` is a semantic ingredient, not a whole-component fade.

Light and dark themes map those primitives differently. A stronger material means more containment,
not more transparency.

### Borders, highlights, and shadows

Liquid Glass reuses `borderWidth.default` and `borderWidth.focus`; it does not introduce a material
border scale. Highlights derive from the approved white primitive plus controlled alpha rather than
using an unqualified pure-white edge.

`glass.innerShadow` exposes `none`, `subtle`, and `default`. These create a restrained upper edge and
material thickness, not a neumorphic inset. Outer elevation reuses the global shadow primitives and
semantic `shadow.sm`, `shadow.md`, and `shadow.lg` roles. `shadowPrimitive.none` was added as a
general no-elevation primitive so disabled and Solid materials do not repeat a literal.

Noise is intentionally absent. PR 21 did not approve a texture, and no inactive image or blend-mode
tokens are carried speculatively.

### Motion, focus, and radius

Surface transition aliases map to the global fast duration and standard easing. No Liquid Glass
animation scale, keyframe, or filter animation is introduced.

Interactive focus aliases reuse the shared focus color and global focus border width. Surface radius
aliases reuse `radius.md`, `radius.lg`, and `radius.xl`; visual depth does not create a new geometry
scale. Visual elevation also remains independent from stacking order, so these tokens do not imply
or introduce `z-index`.

### Ambient opacity

`ambient.opacity` contains exactly `subtle`, `default`, and `strong`. The scale is increasing and
capped below fully opaque. Theme-aware preset gradients remain semantic values because their color
balance expresses a reusable environmental intent rather than a component-local ingredient.

## Semantic materials

| Material       | Intended role                                           | Containment strategy                                       |
| -------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Base           | Application canvas                                      | Theme background, no blur                                  |
| Solid          | Maximum legibility and all unsupported-filter paths     | Opaque theme surface, no blur or outer elevation           |
| Glass Subtle   | Low-priority groups and restrained repeated surfaces    | Lowest filter and elevation mapping                        |
| Glass          | Primary panels, navigation, and simple forms            | Balanced filter, border, highlight, and containment        |
| Glass Elevated | Dialog-sized or important floating regions              | More contained background with medium elevation            |
| Glass Floating | Compact menus, popovers, tooltips, and floating actions | Strongest boundary and approved elevation, controlled blur |
| Overlay        | Backdrop behind future modal workflows                  | Theme-aware dimming and a restrained composed filter       |

Every material from Solid through Glass Floating exposes the same property contract:

- `background` and `fallback-background`;
- `border-color`, `border-width`, and `border-highlight`;
- `backdrop-filter`;
- `shadow` and `inner-shadow`;
- `foreground` and `muted-foreground`;
- `radius`.

This parity lets PR 23 switch material without assembling local recipes or adding conditional
property names.

## Semantic ambient environments

`ambient.background.base` supplies the theme-aware solid paint and `ambient.background.none`
supplies the transparent path. `ambient.preset.{none|subtle|brand|cool|warm}` owns the complete
one-to-three-layer radial composition, while `ambient.intensity.{subtle|default|strong}` aliases the
primitive opacity scale. Light and dark contain the same paths and types; system uses the existing
CSS theme resolution.

The preset is emitted as one CSS custom-property value so a component cannot independently remix
colors or positions. It uses only approved palette aliases and no image, filter, blur or animation.

## Interaction and disabled roles

`surface.interactive` provides background, border, and shadow roles for hover, active, and selected
states. Focus provides ring color, width, offset, and a composed shadow. PR 25 maps these roles into
Button component aliases and PR 26 maps them into Card interactive/selected aliases without
exposing Surface state controls to consumers.

`surface.disabled` provides background, border, foreground, opacity, and shadow independently. A
future surface must not reduce the opacity of its entire subtree as a shortcut; text and state
legibility remain explicit responsibilities.

## Theme mappings

The light contract is authored in `tokens/semantic-tokens.json`. It uses bright, theme-aware surface
roles, Deep Ink boundaries, restrained highlights, and the established elevation scale. The dark
override in `tokens/themes/dark.json` uses deep existing surfaces, Lavender Mist boundaries, stronger
containment, and the dark theme's existing shadow mappings. It does not introduce a second palette.

`system` is a preference resolver, not a third visual theme. The existing theme service removes
`data-theme` for system mode and CSS resolves to light or dark through `prefers-color-scheme`.
Consequently there is no `system.json` and no duplicated semantic scale.

## Composed backdrop filters

Each material publishes one composed token, for example
`--gh-surface-glass-backdrop-filter`. It resolves both approved blur and saturation primitives. This
prevents every future component from concatenating its own filter chain while preserving primitive
adjustability at the source.

Surface primitives assign the same token to both `backdrop-filter` and
`-webkit-backdrop-filter`. No prefixed duplicate token is needed.

## Solid fallback

Every material has a theme-aware `fallback-background`. Production Surface CSS uses the opaque
fallback first and enhance the surface in one centralized feature query:

```scss
// Conceptual equivalent. gh-surface encapsulates this recipe.
.example-glass-surface {
  background: var(--gh-surface-glass-fallback-background);
  border: var(--gh-surface-glass-border-width) solid var(--gh-surface-glass-border-color);
  color: var(--gh-surface-glass-foreground);
  box-shadow: var(--gh-surface-glass-shadow), var(--gh-surface-glass-inner-shadow);
}

@supports ((backdrop-filter: none) or (-webkit-backdrop-filter: none)) {
  .example-glass-surface {
    background: var(--gh-surface-glass-background);
    backdrop-filter: var(--gh-surface-glass-backdrop-filter);
    -webkit-backdrop-filter: var(--gh-surface-glass-backdrop-filter);
  }
}
```

This class is intentionally not part of production styles. The fallback appears in SSR output and
does not depend on JavaScript or hydration.

## Reduced transparency policy

There is no invented runtime setting or non-standard media query in this PR. A future, verified
preference layer can remap at the semantic boundary:

- Glass Subtle becomes Solid;
- Glass becomes Solid or the existing Elevated solid surface;
- Glass Elevated and Glass Floating use their opaque fallbacks;
- composed backdrop filters become `none`.

Content structure, states, focus, and interaction must remain unchanged. The identical material
property contract makes this remapping possible without component rewrites.

## Accessibility guidance

Use each material's matching `foreground` and `muted-foreground` roles. Primary text, focus, icons,
and semantic states must not be made translucent to match the glass. If an ambient backdrop can make
composited contrast unpredictable, select the material fallback or Solid.

The token mappings are designed to support WCAG AA outcomes, but tokens alone cannot guarantee
contrast over every backdrop. PR 23 must measure rendered primary text, secondary text, icons,
borders, focus, selected, and disabled states over representative light and dark contexts. Forced
colors should resolve to a solid system-color surface rather than preserve the visual effect.

## Performance limits

- Prefer one filtered region around a related group; do not nest glass by default.
- Do not use backdrop filters per table row, long-list item, chip, or dense grid cell.
- Keep filtered areas bounded and avoid page-sized scrolling filters.
- Do not animate blur, saturation, large shadows, or filter chains.
- Start with the lowest semantic material that communicates hierarchy.
- Measure simultaneous instances, scroll paint, memory/GPU pressure, CSS size, and a representative
  mid-range mobile device before approving a component.

The scale is the hard upper budget; its largest value is not a recommended default. An exact visible
instance limit must be established from PR 23 measurements rather than guessed in a token file.

## Public CSS variables

Consumers load the standard public entry point once:

```scss
@use 'gh-design-system/styles';
```

Surface and future components consume semantic variables such as:

```scss
background: var(--gh-surface-glass-background);
border: var(--gh-surface-glass-border-width) solid var(--gh-surface-glass-border-color);
box-shadow: var(--gh-surface-glass-shadow), var(--gh-surface-glass-inner-shadow);
color: var(--gh-surface-glass-foreground);
backdrop-filter: var(--gh-surface-glass-backdrop-filter);
-webkit-backdrop-filter: var(--gh-surface-glass-backdrop-filter);
```

Components must not consume primitive opacity, blur, highlight, or shadow values directly. Button,
Icon Button and Card consume their `--gh-button-*`, `--gh-icon-button-*` and `--gh-card-*`
component aliases. They also must not hardcode `rgba()`, `blur()`, local opacity, local shadows, or
local fallback colors.

## Extending the system

Add a new material only when an existing semantic material cannot express a distinct, repeatable
intent. Before adding one:

1. Document its use cases and why composition of an existing material is insufficient.
2. Add the same complete property contract to light and dark JSON.
3. Alias existing primitives before adding any new scale value.
4. Provide a legible Solid fallback.
5. Validate naming, references, theme parity, generated CSS, composited contrast, and rendering cost.
6. Add focused documentation and tests without migrating unrelated components.

Do not add a material to capture a one-off screenshot, a single component's local styling, a higher
blur preference, or a new stacking level.
