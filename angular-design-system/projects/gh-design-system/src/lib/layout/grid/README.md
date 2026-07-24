# Grid

`gh-grid` creates responsive collection layouts for Cards, projects, articles,
skills and features.

## Import

```ts
import { GhGridComponent } from 'gh-design-system';
```

## API and defaults

| Input         | Type                                        | Default   |
| ------------- | ------------------------------------------- | --------- |
| `columns`     | `auto \| 1 \| 2 \| 3 \| 4`                  | `auto`    |
| `minItemSize` | `sm \| md \| lg`                            | `md`      |
| `gap`         | `none \| xs \| sm \| md \| lg \| xl \| 2xl` | `lg`      |
| `align`       | `stretch \| start \| center \| end`         | `stretch` |

## Examples

```html
<gh-grid columns="auto" minItemSize="md" gap="lg">
  @for (project of projects; track project.title) {
  <gh-project-card [project]="project" />
  }
</gh-grid>
```

Numeric columns use a property binding:

```html
<gh-grid [columns]="3">
  <!-- collection items -->
</gh-grid>
```

## Responsive behavior

`auto` uses `auto-fit` with a tokenized minimum item width and never exceeds
the container. Fixed variants start at one column, progress to two at the
shared small breakpoint, three at medium and four at large. Breakpoints are
generated from the repository token source; TypeScript never measures the
viewport.

## Accessibility

Grid adds no role and does not reorder items. Use a semantic list when the
collection relationship matters, or keep semantic Cards and articles in DOM
reading order.

## Do

- Prefer `auto` for naturally fluid Card collections.
- Choose the minimum item size based on content density.
- Use fixed variants only when the composition requires an exact desktop grid.

## Don't

- Use Grid instead of a semantic data table.
- Depend on four columns remaining visible on small screens.
- Pass arbitrary `minmax()` or CSS strings.

## Theme support

Grid has no visual theme dependency.

## Limitations

This version intentionally omits per-breakpoint inputs, masonry, subgrid and
container-query APIs.
