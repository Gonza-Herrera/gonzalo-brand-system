# Inline

`gh-inline` arranges a small horizontal group such as actions, metadata or a
simple internal toolbar.

## Import

```ts
import { GhInlineComponent } from 'gh-design-system';
```

## API and defaults

| Input       | Type                                            | Default  |
| ----------- | ----------------------------------------------- | -------- |
| `gap`       | `none \| xs \| sm \| md \| lg \| xl \| 2xl`     | `sm`     |
| `align`     | `start \| center \| end \| baseline \| stretch` | `center` |
| `justify`   | `start \| center \| end \| between \| around`   | `start`  |
| `wrap`      | `boolean`                                       | `true`   |
| `fullWidth` | `boolean`                                       | `false`  |

## Example

```html
<gh-inline gap="sm" align="center">
  <gh-badge variant="accent">Angular</gh-badge>
  <span>6 min read</span>
</gh-inline>
```

## Responsive behavior

Inline wraps by default and never assigns child sizes. Its intrinsic width is
capped by the available space; `fullWidth` expands the group when justification
across a row is required.

## Accessibility

Inline adds no role and keeps DOM and visual order aligned. Use semantic
controls, lists or navigation inside it when required by the content.

## Do

- Use Inline for small related groups.
- Leave wrapping enabled for resilient narrow layouts.
- Use baseline alignment for mixed text sizes.

## Don't

- Disable wrapping when content can exceed the viewport.
- Use Inline for data that should be a semantic table or list.
- Use it to force page-wide layouts that should become a Grid or Stack.

## Theme support

Inline is visual-theme neutral.

## Limitations

It does not expose flex basis, order, grow or shrink inputs. Those concerns
remain owned by the composed feature.
