# Divider

`gh-divider` separates content visually and can opt into separator semantics.

## Import

```ts
import { GhDividerComponent } from 'gh-design-system';
```

## API and defaults

| Input         | Type                          | Default      |
| ------------- | ----------------------------- | ------------ |
| `orientation` | `horizontal \| vertical`      | `horizontal` |
| `style`       | `solid \| dashed`             | `solid`      |
| `tone`        | `subtle \| default \| strong` | `subtle`     |
| `decorative`  | `boolean`                     | `true`       |

## Examples

```html
<gh-divider />

<gh-divider orientation="vertical" tone="default" [decorative]="false" />

<gh-divider [style]="'dashed'" />
```

Use property binding for `style`; Angular reserves the static `style` attribute
for native inline CSS.

## Responsive behavior

Horizontal Divider fills available width. Vertical Divider stretches to the
cross-size supplied by its parent; the parent must establish a meaningful
height. Neither orientation introduces viewport measurements.

## Accessibility

Decorative variants render a `<div aria-hidden="true">`. A semantic horizontal
Divider renders `<hr>`. A semantic vertical Divider renders
`role="separator"` with `aria-orientation="vertical"`.

## Do

- Keep `decorative` true when the separation is only visual.
- Set `decorative` false when the boundary helps identify content groups.
- Give vertical Dividers a parent with an established cross-size.

## Don't

- Use Divider when whitespace alone communicates the grouping clearly.
- Rely on tone alone to convey meaning.
- Make Divider focusable or interactive.

## Theme support

All tones use semantic border variables and adapt to light and dark themes.

## Limitations

Divider provides no label, text slot, custom thickness or arbitrary color API.
