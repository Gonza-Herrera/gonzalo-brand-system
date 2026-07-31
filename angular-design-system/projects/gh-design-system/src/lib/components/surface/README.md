# Surface

`gh-surface` is the semantically neutral visual primitive for solid and Liquid Glass materials. It
projects content directly into its host and does not choose an editorial or interactive element for
the consumer.

## Import

```ts
import { GhSurfaceComponent } from 'gh-design-system';
```

## API and defaults

| Input         | Type                                                                 | Default   |
| ------------- | -------------------------------------------------------------------- | --------- |
| `variant`     | `solid \| glass-subtle \| glass \| glass-elevated \| glass-floating` | `solid`   |
| `padding`     | `none \| xs \| sm \| md \| lg \| xl`                                 | `md`      |
| `radius`      | `none \| small \| default \| large`                                  | `default` |
| `interactive` | `boolean`                                                            | `false`   |
| `disabled`    | `boolean`                                                            | `false`   |

`full` radius is intentionally omitted: Surface represents panels and regions, while pill geometry
belongs to compact controls with a more specific API. Elevation and border inputs are also omitted;
each semantic material already owns those decisions.

## Examples

```html
<gh-surface>Solid content</gh-surface>

<gh-surface variant="glass" padding="lg">
  <h2>Glass panel</h2>
  <p>Content remains semantic and fully projected.</p>
</gh-surface>
```

For an action, keep native interaction inside Surface:

```html
<gh-surface variant="glass-elevated" interactive>
  <a href="/projects">View projects</a>
</gh-surface>
```

Do not replace that link with `(click)` on `gh-surface`. `interactive` adds hover, active and
`:focus-within` feedback only. It never adds a role, `tabindex`, keyboard listener or click handler.
For regions containing several controls, leave `interactive` false so the region does not show one
ambiguous shared focus ring.

## Disabled state

`disabled` is visual and publishes `data-disabled="true"`; generic hosts have no native disabled
semantics. Projected buttons, fields and links remain the consumer's responsibility and must be
disabled or removed from interaction correctly. Surface does not block pointer events or fade its
entire content subtree.

## Material guidance

- Use `solid` for maximum legibility, unsupported-filter fallbacks and nested content.
- Use `glass-subtle` for low-priority groups or restrained repetition.
- Use `glass` for a primary bounded panel.
- Use `glass-elevated` for an important panel that needs stronger containment.
- Reserve `glass-floating` for compact floating UI; it does not add positioning or `z-index`.

Avoid glass inside glass. Prefer a solid child within one filtered parent, and avoid filtered rows
or page-sized scrolling regions.

## Accessibility and platform behavior

Surface uses semantic theme variables in light, dark and system modes, provides an opaque background
before a single feature query enhances glass-capable browsers, and assigns the composed filter token
to both standard and WebKit properties. Forced-colors mode uses system colors and removes the glass
effect. Reduced motion removes state transitions; filters are never animated.

The component itself is semantically neutral. The consumer owns headings, landmarks, labels, form
semantics, contrast over custom backdrops and control behavior.
