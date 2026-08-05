# Ambient Background

`gh-ambient-background` supplies calm, decorative environmental context behind projected content.
It is a visual primitive, not a layout container, so consumers continue to own padding, width and
the semantic structure inside it.

## Import

```ts
import { GhAmbientBackgroundComponent } from 'gh-design-system';
```

## API

| Input       | Type                                      | Default   |
| ----------- | ----------------------------------------- | --------- |
| `preset`    | `none \| subtle \| brand \| cool \| warm` | `subtle`  |
| `intensity` | `subtle \| default \| strong`             | `default` |

`subtle` is the default because using this explicit environmental wrapper communicates an intent
to render ambience. Use `none` when a stable wrapper is needed without decoration. `strong` remains
within the approved calm visual range.

```html
<gh-ambient-background preset="brand" intensity="default">
  <gh-surface variant="glass" padding="lg">
    <h2>Project summary</h2>
    <p>Projected content preserves its own semantics.</p>
  </gh-surface>
</gh-ambient-background>
```

## Deliberate omissions

- There is no custom glow component yet. The five presets cover the approved initial compositions
  without exposing low-level placement, color, size or blur choices.
- There is no `motion` input. Ambient fields are static by design to preserve calmness, rendering
  cost and reduced-motion safety.
- There is no `contained` input. Visual paint is always bounded to the host without clipping
  projected focus rings, shadows or overlays.

## Accessibility and resilience

The one visual node is `aria-hidden`, cannot receive focus and never captures pointer events. The
host adds no role or keyboard behavior. A theme-aware solid color paints before gradients, while
forced-colors mode removes the decoration and uses system colors. The component uses semantic CSS
variables only, so light, dark and system modes require no JavaScript or alternate DOM.

## Composition guidance

Use one ambient background for a section or hero and place a bounded Surface inside it. Prefer a
solid Surface for dense content or when contrast is uncertain. Avoid nesting ambient backgrounds,
placing one behind every card, or combining many floating glass surfaces above the fold.
