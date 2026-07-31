# Glass Surface primitives

This document defines the implementation contract for `gh-surface` and `gh-glass-panel`. It turns
the semantic material tokens introduced in PR 22 into reusable Angular primitives without migrating
Card, Button, Navigation, forms, feedback or the Portfolio.

## 1. Objective and architecture

Surface provides one semantically neutral host for material, containment, spacing, shape and visual
state. Its dependency direction is deliberately one-way:

```text
GhSurfaceComponent
        ↓
surface.* semantic tokens
        ↓
glass.*, shadow, border, radius and motion primitives
```

Components and applications import only the package root. Surface consumes only semantic material
variables; private `--_gh-surface-*` properties select the current material inside encapsulated CSS
and are not a customization API.

## 2. Public Surface API

```ts
type GhSurfaceVariant = 'solid' | 'glass-subtle' | 'glass' | 'glass-elevated' | 'glass-floating';

type GhSurfacePadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type GhSurfaceRadius = 'none' | 'small' | 'default' | 'large';
```

| Input         | Default   | Responsibility                                                  |
| ------------- | --------- | --------------------------------------------------------------- |
| `variant`     | `solid`   | Selects one complete semantic material contract.                |
| `padding`     | `md`      | Maps to the existing spacing scale.                             |
| `radius`      | `default` | Maps to semantic Surface radius aliases.                        |
| `interactive` | `false`   | Enables visual hover, active and focus-within feedback only.    |
| `disabled`    | `false`   | Enables a visual disabled treatment without changing semantics. |

There is no public elevation or border input. Each material already owns those decisions, and
mixing them independently would allow incoherent combinations. Radius remains independent from
depth. `full` is omitted because pill geometry belongs to compact controls, not a general region.

## 3. Materials and depth

| Variant          | Use                                                       |
| ---------------- | --------------------------------------------------------- |
| `solid`          | Default, nested content, maximum legibility and fallback. |
| `glass-subtle`   | Low-priority groups and restrained repeated surfaces.     |
| `glass`          | Primary bounded panels and simple grouped content.        |
| `glass-elevated` | Important panels that need stronger containment.          |
| `glass-floating` | Compact future menus, popovers or floating actions only.  |

`glass-floating` supplies material depth, not layout behavior. It does not position itself, create
a stacking order, trap focus or implement dismissal. Those contracts belong to future overlay
components.

Every variant maps background, opaque fallback, border width/color/highlight, composed backdrop
filter, outer and inner shadows, foreground and muted foreground. Padding uses `--gh-space-*`; shape
uses `--gh-surface-radius-*`. No local color, blur, opacity, shadow, radius, spacing or duration is
hardcoded.

## 4. DOM and stable state attributes

Surface renders no internal wrapper:

```html
<gh-surface data-variant="solid" data-padding="md" data-radius="default">
  <!-- projected content -->
</gh-surface>
```

A single `::before` layer renders the semantic inner shadow and upper boundary highlight. It is
layout-neutral, cannot receive pointer events or focus, inherits radius and does not require
clipping. Surface deliberately leaves overflow visible so projected focus rings, badges and menus
are not cut off.

`data-interactive="true"` and `data-disabled="true"` appear only when enabled. Surface never adds
`role`, `tabindex`, `aria-label`, `aria-disabled`, click handlers or keyboard listeners.

## 5. Interaction, focus and disabled state

`interactive` changes appearance only. A navigating composition must contain an `<a>` or
`routerLink`; an action must contain a native button or a component that renders one.

```html
<gh-surface variant="glass-elevated" interactive>
  <a href="/projects">View projects</a>
</gh-surface>
```

The host uses `:focus-within` so the visual boundary follows focus on its real child control. Use
this mode for a region with one clear primary action. Leave it off for forms or control-rich panels,
where a shared ring would be ambiguous. The child control retains its own focus treatment.

`disabled` uses semantic background, border, foreground and shadow roles. It does not block pointer
events and does not reduce the opacity of the full content subtree. Projected controls must still be
truly disabled, removed from navigation or guarded according to their native semantics.

## 6. Fallback, backdrop filter and Safari

All variants paint their semantic opaque fallback first. One centralized feature query enhances
only non-Solid variants:

```scss
@supports ((backdrop-filter: none) or (-webkit-backdrop-filter: none)) {
  :host(:not([data-variant='solid'])) {
    background: var(--_gh-surface-background);
    -webkit-backdrop-filter: var(--_gh-surface-backdrop-filter);
    backdrop-filter: var(--_gh-surface-backdrop-filter);
  }
}
```

The internal property always resolves to a PR 22 composed semantic filter; the component never
reassembles blur and saturation. Solid never receives either filter property in the normal path.
This CSS-only enhancement is deterministic in server HTML and does not require browser capability
detection during hydration.

## 7. Themes and preferences

Light and dark values come from the generated semantic theme maps. System mode continues to use the
existing `prefers-color-scheme` resolution; Surface has no theme service, branch or duplicated theme
selector.

Interactive transitions use the Surface duration and easing aliases and never include filter.
`prefers-reduced-motion: reduce` removes the transition while preserving state and focus feedback.

Reduced transparency remains a documented future preference. No interoperable web media query or
approved runtime setting exists in the current system, so this PR does not invent one. The complete
opaque fallback contract allows a future preference layer to remap glass materials to Solid without
changing component markup.

In `forced-colors: active`, Surface uses `Canvas`, `CanvasText`, `ButtonBorder` and `Highlight`, plus
the Solid no-filter/no-shadow tokens. It does not opt out with `forced-color-adjust: none`.

## 8. Accessibility

Surface and Glass Panel are visual containers, not landmarks or controls. Consumers own heading
hierarchy, region labels, form names, keyboard behavior and projected content semantics. Semantic
foreground variables adapt to the theme, but a component cannot guarantee contrast over every
consumer-supplied ambient image or gradient. Choose Solid when composited contrast is uncertain.

Long text, lists, headings, links, buttons and fields may wrap naturally. Neither primitive imposes
a fixed width or height. At 200% zoom and narrow widths, the consumer remains responsible for
content-specific overflow such as unbreakable URLs and data tables.

## 9. Glass Panel

`gh-glass-panel` provides a narrower, intention-revealing composition:

```ts
type GhGlassPanelVariant = 'glass-subtle' | 'glass' | 'glass-elevated';
```

It forwards `variant`, `padding`, `radius`, `interactive` and `disabled` to an actual public
`gh-surface`. It owns no material CSS. `solid` is excluded by name and `glass-floating` is excluded
because floating UI needs an overlay behavior contract.

```html
<gh-glass-panel padding="lg">
  <h2>Related content</h2>
</gh-glass-panel>
```

This explicit composition adds one transparent custom-element host, but keeps the source of truth,
testing and future migration path entirely in Surface. The clearer panel intent justifies the small
DOM cost.

## 10. Divider

The existing `gh-divider` remains unchanged. It already supports horizontal/vertical orientation,
solid/dashed style, tokenized subtle/default/strong tones, and decorative or semantic output. A
glass variant would duplicate `tone` without a dedicated general-purpose token, so this PR does not
add one. Divider can be composed inside any Surface and continues to use its existing public API.

## 11. Composition patterns

Recommended nested structure uses one filtered boundary and a Solid child:

```html
<gh-glass-panel variant="glass-elevated" padding="lg">
  <h2>Account summary</h2>
  <gh-divider />
  <gh-surface variant="solid" padding="sm"> Stable nested content </gh-surface>
</gh-glass-panel>
```

Do:

- select the lowest material depth that expresses hierarchy;
- bound filtered regions and keep scrolling content outside where possible;
- use Solid for nested areas and high-contrast content;
- preserve native links, buttons, form controls and landmarks inside the visual primitive.

Don't:

- put Glass inside Glass or Glass Floating inside Glass Floating;
- filter each list row, chip, table cell or dense card in a collection;
- attach `(click)` to Surface as a button substitute;
- animate blur, saturation, shadows or filter chains;
- override internal `--_gh-surface-*` properties.

## 12. Performance and responsive behavior

Surface has no services, subscriptions, listeners, browser APIs, images or runtime calculations. It
uses one host, one pseudo-element and one CSS feature query. Backdrop filtering can still increase
paint and GPU cost; keep the area bounded, avoid nesting and measure real screens before expanding
usage. No exact instance limit is claimed without device measurements.

Both primitives are block-level, have no fixed dimensions, allow natural wrapping and cap their
inline size to the available space. They require no page-specific breakpoints and work from a 320px
layout when the projected content does.

## 13. Public imports and future reuse

```ts
import {
  GhGlassPanelComponent,
  GhSurfaceComponent,
  type GhGlassPanelVariant,
  type GhSurfacePadding,
  type GhSurfaceRadius,
  type GhSurfaceVariant,
} from 'gh-design-system';
```

PR 24 can place controlled ambient backgrounds behind Surface without making them part of the
material primitive. PR 25 and PR 26 should compose or share the Surface contract when migrating
Button and Card, rather than copying filter recipes; their native semantics and specialized APIs
must remain in those components.

Adding a variant, changing a default, removing a union member or altering host state attributes is a
public breaking change. Internal selector organization may evolve if the rendered contract, token
dependency and accessibility behavior remain compatible.
