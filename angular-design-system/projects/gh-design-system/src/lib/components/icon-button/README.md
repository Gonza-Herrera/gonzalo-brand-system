# Icon Button

`GhIconButtonComponent` is the compact native-button companion to Button. It keeps one projected
decorative icon, one native `<button>`, a stable square target and an accessible name supplied by
the consumer.

## Import and usage

```ts
import { GhIconButtonComponent } from 'gh-design-system';
```

```html
<gh-icon-button aria-label="Open navigation">
  <svg aria-hidden="true"><!-- icon --></svg>
</gh-icon-button>
```

`aria-labelledby` is also supported when an existing text node owns the action name. The component
does not derive a label from an icon name because a graphic identifier is not necessarily an action.

## Inputs

| Input             | Type                                              | Default     |
| ----------------- | ------------------------------------------------- | ----------- |
| `variant`         | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `secondary` |
| `size`            | `'sm' \| 'md' \| 'lg'`                            | `md`        |
| `type`            | `'button' \| 'submit' \| 'reset'`                 | `button`    |
| `disabled`        | `boolean`                                         | `false`     |
| `loading`         | `boolean`                                         | `false`     |
| `aria-label`      | `string \| undefined`                             | `undefined` |
| `aria-labelledby` | `string \| undefined`                             | `undefined` |
| `aria-expanded`   | `boolean \| undefined`                            | `undefined` |
| `aria-controls`   | `string \| undefined`                             | `undefined` |

## Behavior

- Disabled and loading set the native `disabled` attribute; loading also sets `aria-busy`.
- The projected icon stays decorative and disappears visually behind the same-size spinner while
  loading, so the target does not shift.
- The accessible action name is retained during loading.
- Enter and Space behavior come from the native button; no keyboard handlers are recreated.
- Focus uses the shared component token contract and remains an outline in forced colors.
- Disclosure compositions can forward `aria-expanded` and `aria-controls`; the public `focus()`
  method supports deterministic focus restoration after a collapsible region closes.
- Reduced motion removes the active transform and spinner animation without removing state color.

## Material policy

Primary and Danger are solid. Ghost has no filtered material in rest. Secondary is the only variant
that enhances its opaque fallback with the approved bounded glass filter. Icon Button consumes only
`--gh-icon-button-*` component properties and shares the internal material SCSS mixin with Button;
that mixin is not exported as public API.

## Do / don't

- Do provide an action-oriented `aria-label` or `aria-labelledby` every time.
- Do keep the projected SVG decorative with `aria-hidden="true"`.
- Do use a visible Button when the icon is ambiguous or the action is important.
- Don't use a tooltip as the accessible name.
- Don't put visible labels inside Icon Button or use it for navigation links.
