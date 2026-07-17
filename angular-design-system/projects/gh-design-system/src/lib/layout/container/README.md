# Container

`gh-container` constrains page and section content to an official maximum width
and applies responsive horizontal gutters.

## Import

```ts
import { GhContainerComponent } from 'gh-design-system';
```

## API and defaults

| Input      | Type                                   | Default |
| ---------- | -------------------------------------- | ------- |
| `size`     | `sm \| md \| lg \| xl \| wide \| full` | `xl`    |
| `gutters`  | `none \| sm \| md \| lg`               | `md`    |
| `centered` | `boolean`                              | `true`  |

`sm` is intended for narrow text, `md` for articles and forms, `lg` for
content pages, `xl` for the portfolio, `wide` for broad layouts and `full` for
unconstrained width.

## Example

```html
<gh-container size="xl" gutters="md">
  <h1>Think bigger. Build smarter.</h1>
</gh-container>
```

## Responsive behavior

The host always uses `width: 100%` and `box-sizing: border-box`. Gutter tokens
use `clamp()` so they adapt without JavaScript or repeated media queries. No
variant can exceed the available inline size.

## Accessibility

Container is presentational, adds no role and preserves projected DOM order.
Choose semantic elements for its children.

## Do

- Use one Container to align related page content.
- Select the smallest width appropriate for the content.
- Use `full` when a child owns its own width strategy.

## Don't

- Nest Containers without a clear alignment boundary.
- Use Container to add backgrounds, borders or vertical spacing.
- Pass arbitrary CSS widths; the API is intentionally closed.

## Theme support

Container has no color styles and behaves identically in light and dark themes.

## Limitations

The component does not provide responsive per-breakpoint inputs or vertical
spacing. Compose it with `gh-section` and other primitives.
