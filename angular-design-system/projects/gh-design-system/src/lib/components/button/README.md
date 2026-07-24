# Button

## Purpose

`GhButtonComponent` provides the primary native-button primitive for actions,
forms and calls to action. It keeps visual variants, sizing, interaction states
and accessibility behavior consistent across light and dark themes.

## Import

```ts
import { GhButtonComponent } from 'gh-design-system';

@Component({
  standalone: true,
  imports: [GhButtonComponent],
})
export class ExampleComponent {}
```

Consumers must also load the public token and theme styles globally:

```scss
@use 'gh-design-system/styles';
```

## Basic usage

```html
<gh-button>Continue</gh-button>
```

The internal native button uses `type="button"` by default.

## Inputs

| Input       | Type                                                     | Default     | Purpose                                       |
| ----------- | -------------------------------------------------------- | ----------- | --------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'ghost' \| 'danger'`        | `primary`   | Sets visual hierarchy and intent.             |
| `size`      | `'sm' \| 'md' \| 'lg'`                                   | `md`        | Sets height, spacing, type and icon size.     |
| `type`      | `'button' \| 'submit' \| 'reset'`                        | `button`    | Controls native form behavior.                |
| `disabled`  | `boolean`                                                | `false`     | Applies the native disabled state.            |
| `loading`   | `boolean`                                                | `false`     | Disables interaction and exposes `aria-busy`. |
| `fullWidth` | `boolean`                                                | `false`     | Makes the host and native button fill width.  |
| `ariaLabel` | `string \| undefined` via the `aria-label` template name | `undefined` | Labels icon-only buttons.                     |

Boolean inputs support Angular boolean attribute transformation:

```html
<gh-button disabled fullWidth>Unavailable</gh-button>
```

## Variants

- `primary`: the single highest-priority action in a section.
- `secondary`: supporting actions with medium hierarchy.
- `ghost`: low-emphasis actions that should blend into a surface.
- `danger`: destructive or sensitive actions that require clear context.

## Sizes

- `sm`: compact controls, toolbars and tables.
- `md`: forms and standard application actions.
- `lg`: prominent calls to action and hero sections.

## Loading and disabled states

Loading preserves the projected label width, displays a lightweight CSS
spinner, sets `aria-busy="true"` and disables the native button. Both loading
and disabled states prevent native click and form submission.

```html
<gh-button type="submit" [loading]="isSaving()">Save changes</gh-button>
```

## Icons

Use the projection attributes for decorative start and end icons. Provide icon
dimensions relative to the surrounding text and use `currentColor`.

```html
<gh-button>
  <svg ghButtonIconStart width="1em" height="1em" aria-hidden="true">
    <!-- icon -->
  </svg>
  Save
</gh-button>
```

```html
<gh-button variant="secondary">
  Continue
  <svg ghButtonIconEnd width="1em" height="1em" aria-hidden="true">
    <!-- icon -->
  </svg>
</gh-button>
```

The projection attributes are selectors, not separate directives.

## Accessibility

- The interactive element is always a native `<button>`.
- Keep visible labels concise and action-oriented.
- Icon-only buttons must provide `aria-label`:

  ```html
  <gh-button aria-label="Add project">
    <svg ghButtonIconStart width="1em" height="1em" aria-hidden="true">
      <!-- icon -->
    </svg>
  </gh-button>
  ```

- Loading keeps the existing accessible name and adds `aria-busy`.
- Disabled and loading states use the native `disabled` attribute.
- Focus uses the public focus-ring token and is never removed.
- Spinner motion stops when `prefers-reduced-motion: reduce` is active.
- Use `type="button"` for actions that should not submit a form.

## Theme support

All visual states use public semantic properties. Light, dark and system themes
therefore require no component-specific theme logic.

## Do

- Use primary for the main action.
- Use clear labels such as “Save changes”.
- Use `type="button"` for non-submit actions.
- Add `aria-label` to icon-only buttons.

## Don't

- Place multiple primary actions in the same section.
- Use danger for non-destructive actions.
- Remove or visually hide focus indication.
- Use ambiguous labels such as “Click here”.
- Use disabled controls without explaining how to resolve the state.
