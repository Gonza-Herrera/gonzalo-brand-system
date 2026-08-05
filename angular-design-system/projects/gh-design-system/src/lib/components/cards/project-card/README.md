# Project Card

## Purpose

`GhProjectCardComponent` presents portfolio projects, case studies,
open-source work and clearly labelled concepts.

It continues to compose one public base Card. Standard projects use `outlined` → Solid and featured
projects use `elevated` → Glass Elevated. Material does not change the typed data, native links or
orientation API.

## Import

```ts
import { GhProjectCardComponent, type GhProjectCardData } from 'gh-design-system';
```

```html
<gh-project-card [project]="project" orientation="horizontal" />
```

## Public inputs

| Input               | Type                         | Default           |
| ------------------- | ---------------------------- | ----------------- |
| `project`           | `GhProjectCardData`          | required          |
| `orientation`       | `'vertical' \| 'horizontal'` | `'vertical'`      |
| `headingLevel`      | `2 \| 3`                     | `2`               |
| `ariaLabel`         | `string \| undefined`        | generated English |
| `featuredLabel`     | `string`                     | `'Featured'`      |
| `technologiesLabel` | `string`                     | `'Technologies'`  |
| `linksLabel`        | `string`                     | `'Project links'` |

## Model

`GhProjectCardData` includes:

- Required title and description.
- Optional visible category label.
- Readonly technologies.
- Optional image, alternative text and intrinsic dimensions.
- Project and repository URLs.
- Optional external-link flags for safe new-tab behavior.
- Optional localized link labels.
- Typed status and optional status label.
- Featured state.

Statuses are `concept`, `in-progress`, `completed` and `archived`.

## Orientation

- `vertical`: standard grid presentation.
- `horizontal`: featured desktop presentation.

Horizontal orientation collapses to one column on smaller viewports without
changing content order.

## Links

Project and repository actions are native anchors. Set `projectExternal` or `repositoryExternal`
for verified external destinations; the component then adds `_blank` with
`rel="noopener noreferrer"`. The component does not use
`GhButtonComponent` because Button currently renders only a native button and
must not simulate navigation.

No links are rendered when URLs are absent, and interactive Card feedback is
disabled in that case.

## Status and technologies

Status and the optional category reuse `GhBadgeComponent` with visible text. Technologies reuse
static `GhTagComponent` instances and wrap responsively.

## Images

Images are optional, lazy-loaded and contained by stable responsive media regions. Consumers control
alternative text and should provide `imageWidth` plus `imageHeight` to reserve the correct aspect
ratio. The Card remains complete without media.

## Accessibility

- The Card root remains an article.
- Title and description are visible text. Consumers set `[headingLevel]="3"` when the Card is nested
  below a section `h2`.
- Action navigation has an accessible label.
- Links are never nested with buttons.
- Status meaning is not communicated by color alone.
- Consumer-provided labels localize the Card name, featured badge, technology list and link
  navigation without changing the project model.
