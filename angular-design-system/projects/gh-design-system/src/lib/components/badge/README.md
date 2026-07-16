# Badge

## Purpose

`GhBadgeComponent` displays short, non-interactive status, category and count
information. Badge communicates meaning through text first and uses semantic
color as reinforcement.

Use Tag instead when content can be selected or removed.

## Import

```ts
import { GhBadgeComponent, type GhBadgeVariant } from 'gh-design-system';

@Component({
  standalone: true,
  imports: [GhBadgeComponent],
})
export class ExampleComponent {}
```

Consumers must load the public styles globally:

```scss
@use 'gh-design-system/styles';
```

## Basic usage

```html
<gh-badge>Ready</gh-badge>
```

## Inputs

| Input        | Type                                                        | Default   |
| ------------ | ----------------------------------------------------------- | --------- |
| `variant`    | `neutral \| info \| success \| warning \| danger \| accent` | `neutral` |
| `size`       | `sm \| md`                                                  | `md`      |
| `appearance` | `soft \| solid`                                             | `soft`    |
| `rounded`    | `default \| pill`                                           | `pill`    |

## Variants

- `neutral`: general information and numeric counts.
- `info`: contextual guidance or informational state.
- `success`: positive or completed state.
- `warning`: state requiring attention.
- `danger`: error or critical state.
- `accent`: highlighted brand category.

Labels must remain understandable without color.

## Appearances

Soft is the default and works best for repeated status labels. Solid provides
stronger emphasis and should be used selectively.

```html
<gh-badge variant="warning" appearance="solid">Review required</gh-badge>
```

## Sizes

- `sm`: dense tables, compact metadata and counters.
- `md`: standard status and category labels.

## Start indicator

The `ghBadgeIconStart` projection selector accepts a lightweight decorative
indicator. It is a selector rather than a public directive.

```html
<gh-badge variant="success">
  <svg ghBadgeIconStart width="1em" height="1em" aria-hidden="true">
    <!-- indicator -->
  </svg>
  Ready
</gh-badge>
```

## Accessibility

- The rendered element is a non-interactive `<span>`.
- Badge never adds click handlers, button roles or live-region behavior.
- Use clear text that communicates meaning independently from color.
- Keep decorative indicators hidden from assistive technology.
- Consumers decide when surrounding context requires additional screen-reader
  text.

## Theme support

All six variants use semantic status properties with independent soft and solid
values for light and dark themes.

## Do

- Use badges for concise states, categories and counts.
- Keep labels short and specific.
- Use danger only for genuine errors or critical states.
- Prefer soft appearance for groups of badges.

## Don't

- Use Badge as a clickable filter.
- Add `role="button"` or keyboard interaction.
- Depend on color as the only indication of status.
- Place long sentences inside a badge.
