# Cluster

`gh-cluster` groups compact inline items that must always wrap, especially Tags,
Badges, filters and small actions.

## Import

```ts
import { GhClusterComponent } from 'gh-design-system';
```

## API and defaults

| Input     | Type                                            | Default  |
| --------- | ----------------------------------------------- | -------- |
| `gap`     | `none \| xs \| sm \| md \| lg \| xl \| 2xl`     | `sm`     |
| `align`   | `start \| center \| end \| baseline \| stretch` | `center` |
| `justify` | `start \| center \| end \| between \| around`   | `start`  |

Wrapping is permanent and intentionally has no input.

## Example

```html
<gh-cluster gap="sm">
  <gh-tag>Angular</gh-tag>
  <gh-tag>TypeScript</gh-tag>
  <gh-tag>Signals</gh-tag>
  <gh-tag>AI</gh-tag>
</gh-cluster>
```

## Responsive behavior

Cluster uses intrinsic sizing capped at the available width and always wraps.
It needs no viewport JavaScript or breakpoint-specific input.

## Accessibility

Cluster adds no role. If items form a semantic list, project a list and apply
feature-owned list reset styles instead of losing that relationship.

## Do

- Use Cluster for an unknown or changing number of compact items.
- Keep DOM order meaningful when wrapping creates additional rows.
- Use token gaps rather than margins on individual Tags.

## Don't

- Use Cluster for a toolbar that must remain on one line.
- Disable wrapping with external overrides.
- Use it for page-level columns.

## Theme support

Cluster itself is theme neutral; projected Badge and Tag components resolve
their own semantic colors.

## Limitations

Cluster does not expose `fullWidth` or a no-wrap mode. Use `gh-inline` when
those controls are necessary.
