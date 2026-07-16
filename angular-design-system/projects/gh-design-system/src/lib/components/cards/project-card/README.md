# Project Card

## Purpose

`GhProjectCardComponent` presents portfolio projects, case studies,
open-source work and clearly labelled concepts.

## Import

```ts
import { GhProjectCardComponent, type GhProjectCardData } from 'gh-design-system';
```

```html
<gh-project-card [project]="project" orientation="horizontal" />
```

## Model

`GhProjectCardData` includes:

- Required title and description.
- Readonly technologies.
- Optional image and alternative text.
- Project and repository URLs.
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

Project and repository actions are native anchors. The component does not use
`GhButtonComponent` because Button currently renders only a native button and
must not simulate navigation.

No links are rendered when URLs are absent, and interactive Card feedback is
disabled in that case.

## Status and technologies

Status reuses `GhBadgeComponent` with visible text. Technologies reuse static
`GhTagComponent` instances and wrap responsively.

## Images

Images are optional, lazy-loaded and contained by stable responsive media
regions. Consumers control alternative text.

## Accessibility

- The Card root remains an article.
- Title and description are visible text.
- Action navigation has an accessible label.
- Links are never nested with buttons.
- Status meaning is not communicated by color alone.
