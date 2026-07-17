# Section

`gh-section` renders a semantic `<section>` with consistent vertical spacing
and an optional semantic surface.

## Import

```ts
import { GhSectionComponent } from 'gh-design-system';
```

## API and defaults

| Input        | Type                                                      | Default       |
| ------------ | --------------------------------------------------------- | ------------- |
| `spacing`    | `none \| sm \| md \| lg`                                  | `md`          |
| `surface`    | `transparent \| primary \| secondary \| subtle \| accent` | `transparent` |
| `fullHeight` | `boolean`                                                 | `false`       |

## Example

```html
<gh-section spacing="lg" surface="subtle">
  <gh-container size="xl">
    <h2>Experience</h2>
  </gh-container>
</gh-section>
```

## Responsive behavior

Section spacing uses responsive `clamp()` tokens. `fullHeight` applies
`min-height: 100svh`; it never sets a fixed height and content can continue to
grow.

## Accessibility

The component renders a real `<section>` and does not create a heading. Give
each meaningful section an accessible heading in projected content. DOM order
is unchanged.

## Do

- Use Section for meaningful document regions.
- Compose an explicit Container when constrained content is required.
- Use semantic surfaces that support both themes.

## Don't

- Create a Section only to obtain margin between two controls.
- Assume a Container is added automatically.
- Use `fullHeight` for fixed-height panels.

## Theme support

All non-transparent surfaces resolve through semantic theme variables.

## Limitations

Section does not generate headings, anchors or content widths. It does not
replace semantic elements such as `article`, `aside` or `nav` when those are
more appropriate.
