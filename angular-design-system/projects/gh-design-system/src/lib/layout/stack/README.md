# Stack

`gh-stack` arranges arbitrary projected content vertically with token-based
spacing.

## Import

```ts
import { GhStackComponent } from 'gh-design-system';
```

## API and defaults

| Input     | Type                                        | Default   |
| --------- | ------------------------------------------- | --------- |
| `gap`     | `none \| xs \| sm \| md \| lg \| xl \| 2xl` | `md`      |
| `align`   | `stretch \| start \| center \| end`         | `stretch` |
| `justify` | `start \| center \| end \| between`         | `start`   |
| `wrap`    | `boolean`                                   | `false`   |

## Example

```html
<gh-stack gap="lg">
  <h2>Think bigger. Build smarter.</h2>
  <p>Helping teams build better software.</p>
  <gh-button>Learn more</gh-button>
</gh-stack>
```

## Responsive behavior

Stack does not require breakpoints. Its column direction, token gap and
optional wrapping respond naturally to available space.

## Accessibility

Stack is presentational and adds no role. Project content in the logical
reading and focus order.

## Do

- Use Stack for vertical content flow and form-like composition.
- Use `align="start"` when children should keep intrinsic width.
- Keep the token gap appropriate to the content relationship.

## Don't

- Use Stack to visually reorder content.
- Add backgrounds, borders or component-specific visuals through this API.
- Enable column wrapping without a constrained block size and a clear need.

## Theme support

Stack has no visual theme dependency.

## Limitations

It does not expose flex growth, order, direction or arbitrary CSS values. Use
component-specific CSS for layouts beyond this small composition contract.
