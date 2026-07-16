# Tag

## Purpose

`GhTagComponent` represents metadata, filters and selections. Its mode controls
whether it remains informative, becomes a selectable native button or exposes
a dedicated removal action.

Use Badge for non-interactive status and count information.

## Import

```ts
import { GhTagComponent, type GhTagMode } from 'gh-design-system';

@Component({
  standalone: true,
  imports: [GhTagComponent],
})
export class ExampleComponent {}
```

Consumers must load the public styles globally:

```scss
@use 'gh-design-system/styles';
```

## Static usage

Static is the default mode and renders a `<span>`.

```html
<gh-tag>Angular</gh-tag>
```

## Selectable usage

Selectable renders a native `button[type="button"]`, exposes `aria-pressed` and
emits the next controlled value.

```html
<gh-tag mode="selectable" [selected]="selected()" (selectedChange)="selected.set($event)">
  Leadership
</gh-tag>
```

The component does not mutate `selected` internally. The consumer remains the
source of truth.

## Removable usage

Removable renders informative tag content with a dedicated native removal
button.

```html
<gh-tag mode="removable" ariaLabel="Remove AI filter" (removed)="removeFilter()"> AI </gh-tag>
```

Always provide a specific `ariaLabel` such as “Remove Angular filter”. A generic
“Remove tag” fallback exists only to prevent an unnamed control.

## Inputs

| Input       | Type                                | Default     | Purpose                                       |
| ----------- | ----------------------------------- | ----------- | --------------------------------------------- |
| `mode`      | `static \| selectable \| removable` | `static`    | Selects one mutually exclusive behavior.      |
| `variant`   | `neutral \| accent \| info`         | `neutral`   | Sets semantic visual emphasis.                |
| `size`      | `sm \| md`                          | `md`        | Sets density and interactive hit area.        |
| `selected`  | `boolean`                           | `false`     | Controlled selectable state.                  |
| `disabled`  | `boolean`                           | `false`     | Disables selectable or removable interaction. |
| `ariaLabel` | `string \| undefined`               | `undefined` | Labels selectable or removal controls.        |

## Outputs

| Output           | Type      | Emitted when                                       |
| ---------------- | --------- | -------------------------------------------------- |
| `selectedChange` | `boolean` | An enabled selectable tag requests a state change. |
| `removed`        | `void`    | An enabled removable tag requests removal.         |

Static mode emits neither event. Selectable and removable behavior cannot be
combined because `mode` is a single discriminating input.

## Accessibility

- Static mode renders a `<span>` without false interactive affordance.
- Selectable mode uses a native button with `type="button"`, native keyboard
  operation, `aria-pressed`, focus ring and native disabled state.
- Removable mode uses a dedicated native button with an accessible label.
- Removal clicks stop propagation to avoid triggering surrounding actions.
- Disabled controls do not emit.
- Labels and selected state remain understandable without color alone.

## Theme support

Tag reuses semantic status roles for its base appearance and tag-specific
hover, active, selected and removal-hover roles in both themes.

## Do

- Use static tags for metadata.
- Treat `selected` as controlled state.
- Provide a precise removal label.
- Keep each tag label concise.

## Don't

- Use Tag as a status replacement when Badge is clearer.
- Combine selection and removal in one tag.
- Make static tags keyboard-focusable.
- Use ambiguous removal labels such as “Close”.
