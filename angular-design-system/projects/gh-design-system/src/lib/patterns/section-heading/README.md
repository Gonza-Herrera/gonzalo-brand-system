# Section Heading

## Purpose

`gh-section-heading` standardizes section eyebrow, title, description, reading width and an optional action while preserving the consumer's heading hierarchy.

## Import

```ts
import { GhSectionHeadingComponent } from 'gh-design-system';
```

## Public API

| Input          | Type                  | Default     |
| -------------- | --------------------- | ----------- |
| `eyebrow`      | `string \| undefined` | `undefined` |
| `title`        | `string`              | required    |
| `description`  | `string \| undefined` | `undefined` |
| `alignment`    | `'start' \| 'center'` | `'start'`   |
| `headingLevel` | `2 \| 3 \| 4`         | `2`         |

There are no outputs.

## Slot and example

```html
<gh-section-heading
  eyebrow="Selected work"
  title="Projects"
  description="A focused selection of products and experiments."
  [headingLevel]="2"
>
  <a ghSectionHeadingAction href="/projects">View all projects</a>
</gh-section-heading>
```

`ghSectionHeadingAction` accepts a consumer-owned link or action. The component uses Stack for text rhythm.

## Behavior

- Renders only `h2`, `h3` or `h4` through explicit template branches; invalid dynamic tags cannot be produced.
- Start alignment places a projected action beside the text at larger widths and below it at smaller widths.
- Center alignment constrains and centers the copy and action.
- Typography, spacing, focus and text colors use semantic tokens in light and dark themes.

## Internationalization and SSR

All content is consumer-provided, with no internal UI labels. Layout is CSS-only and the component has no state, browser APIs or hydration-sensitive values.

## Do / Don't / Limitations

- Do select the level from the actual page outline.
- Do use the action slot for a concise related action.
- Don't choose a level for visual size alone or skip heading levels.
- Don't place an unrelated control beside a section heading.
- Section Heading does not create a containing Section or anchor ID; the consumer owns both.
