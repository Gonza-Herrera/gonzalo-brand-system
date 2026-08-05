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

- `outlined`: the safe default, mapped to the Solid Surface material with a visible border.
- `subtle`: mapped to Glass Subtle for editorial grids, previews and secondary grouping.
- `glass`: mapped to Glass for concise feature content over a controlled ambient background.
- `elevated`: mapped to Glass Elevated for prominent summaries and higher local depth.

Every Glass-capable variant paints an opaque fallback first and enhances through CSS `@supports`.
Card component styles consume `--gh-card-*` component tokens that alias the semantic Surface
contract. The component does not render an internal `gh-surface`, preserving its established DOM
and projection regions. See the normative
[Liquid Glass Card documentation](../../../../../../../docs/design/liquid-glass/cards.md).

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

## Unsupported states

Generic Card does not expose `disabled`, `loading` or `skeleton`. An article has no native disabled
behavior, and adding those states without a domain-specific semantic contract would be misleading.
Disable actual descendant controls and use an appropriate busy region in the consuming feature.

## Accessibility

- The root is a semantic `<article>`.
- Non-interactive Cards do not enter the tab order.
- Focus feedback follows interactive descendants through `focus-within`.
- Motion stops under `prefers-reduced-motion`.
- Forced-colors removes decorative Glass while preserving focus and selected structure.
- `ariaLabel` is optional when visible headings already label the article.

## Do

- Keep related content within one Card.
- Use native controls for actions.
- Use glass selectively over a suitable background.
- Use Solid for forms, dense reading and large repeated collections.
- Preserve heading hierarchy in projected content.

## Don't

- Treat `interactive` as navigation.
- Add click handlers to the Card host.
- Nest Glass Cards or animate `backdrop-filter`.
- Nest buttons inside links.
- Use selected without defining the surrounding selection semantics.
