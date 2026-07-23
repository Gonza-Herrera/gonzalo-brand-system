# Experience Timeline

## Purpose

`gh-experience-timeline` renders consumer-ordered professional experiences as a semantic chronology and reuses the public Experience Card model and component.

## Import

```ts
import { GhExperienceTimelineComponent, type GhExperienceCardData } from 'gh-design-system';
```

`experience-timeline.types.ts` re-exports `GhExperienceCardData`; it does not define a competing experience model.

## Public API

| Input              | Type                              | Default      |
| ------------------ | --------------------------------- | ------------ |
| `experiences`      | `readonly GhExperienceCardData[]` | required     |
| `orientation`      | `'vertical' \| 'compact'`         | `'vertical'` |
| `showConnector`    | `boolean`                         | `true`       |
| `cardHeadingLevel` | `2 \| 3`                          | `2`          |
| `cardLabels`       | `GhExperienceCardLabels`          | English      |

There are no outputs or content slots.

## Example and composition

```html
<gh-experience-timeline [experiences]="experiences" orientation="vertical" />
```

The pattern renders an `ol`; each `li` contains a real `gh-experience-card`. Current highlighting follows `experience.current`.

## Behavior

- Input order is preserved exactly. Dates are never parsed, sorted, localized or used to calculate duration.
- The connector is decorative; list semantics communicate sequence without relying on color.
- Compact mode reduces rhythm while retaining the same content and semantics.
- Connector geometry stays outside Card content and does not create horizontal scrolling.
- Empty arrays produce a valid empty ordered list without errors.
- Timeline and Card surfaces consume light/dark semantic tokens.

## Internationalization and SSR

Pass preformatted dates and localized `currentLabel` and `workModeLabel` through
`GhExperienceCardData`. Descriptions may contain ordered paragraphs, while technologies and
capabilities remain separate labelled groups. Pass localized internal headings through
`cardLabels`; use `cardHeadingLevel="3"` when the Timeline sits below a page section `h2`. The
component contains no browser APIs, generated dates or locale logic and is safe for SSR/hydration.

## Do / Don't / Limitations

- Do pass experiences in the exact chronology required by the page.
- Do identify showcase or placeholder companies as demonstrative content.
- Don't rely on the connector alone to explain order.
- Don't pass raw date values expecting automatic formatting.
- Timeline does not group periods, calculate tenure or virtualize long histories.
