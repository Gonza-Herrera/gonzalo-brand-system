# Card

## Purpose

`GhCardComponent` is the foundational visual surface for grouping related
content. It owns surface, border, elevation, radius, padding and optional visual
states without knowing product concepts such as articles or projects.

## Import

```ts
import { GhCardComponent } from 'gh-design-system';

@Component({
  standalone: true,
  imports: [GhCardComponent],
})
export class ExampleComponent {}
```

## Basic usage

```html
<gh-card>
  <h2>Card title</h2>
  <p>Card content.</p>
</gh-card>
```

## Inputs

| Input         | Type                                      | Default     |
| ------------- | ----------------------------------------- | ----------- |
| `variant`     | `outlined \| elevated \| subtle \| glass` | `outlined`  |
| `padding`     | `none \| sm \| md \| lg`                  | `md`        |
| `radius`      | `sm \| md \| lg \| xl`                    | `lg`        |
| `interactive` | `boolean`                                 | `false`     |
| `selected`    | `boolean`                                 | `false`     |
| `fullHeight`  | `boolean`                                 | `false`     |
| `ariaLabel`   | `string \| undefined`                     | `undefined` |

## Variants

- `outlined`: default semantic surface and visible border.
- `elevated`: elevated surface and soft semantic shadow.
- `subtle`: lower-hierarchy background without elevation.
- `glass`: limited translucent surface with moderate blur.

## Projection slots

The static projection selectors are:

- `ghCardMedia`
- `ghCardHeader`
- `ghCardContent`
- `ghCardFooter`

They are selectors, not Angular directives.

```html
<gh-card>
  <div ghCardHeader><h2>Design Systems</h2></div>
  <div ghCardContent><p>Reusable visual foundations.</p></div>
  <div ghCardFooter>Supporting action</div>
</gh-card>
```

Unmatched content is projected into the padded body between content and footer.
Prefer either `ghCardContent` or unmatched body content for the same content
block to avoid duplication.

## Interactive

`interactive` adds hover and `focus-within` feedback only. It does not:

- Add `tabindex`.
- Add a click listener.
- Convert the article into a link or button.
- Change native keyboard semantics.

Real interaction must come from native links or buttons inside the Card.

## Selected

`selected` changes surface, border and inset thickness so the indication is not
only a hue change. Card does not add `aria-selected`; consumers must provide the
correct semantics when Cards participate in a listbox, grid or other selection
pattern.

## Accessibility

- The root is a semantic `<article>`.
- Non-interactive Cards do not enter the tab order.
- Focus feedback follows interactive descendants through `focus-within`.
- Motion stops under `prefers-reduced-motion`.
- `ariaLabel` is optional when visible headings already label the article.

## Do

- Keep related content within one Card.
- Use native controls for actions.
- Use glass selectively over a suitable background.
- Preserve heading hierarchy in projected content.

## Don't

- Treat `interactive` as navigation.
- Add click handlers to the Card host.
- Nest buttons inside links.
- Use selected without defining the surrounding selection semantics.
