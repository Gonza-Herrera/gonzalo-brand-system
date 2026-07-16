# Experience Card

## Purpose

`GhExperienceCardComponent` presents a semantic professional-experience entry
for portfolios, CV pages and leadership profiles.

## Import

```ts
import { GhExperienceCardComponent, type GhExperienceCardData } from 'gh-design-system';
```

```html
<gh-experience-card [experience]="experience" [highlighted]="true" />
```

## Model

`GhExperienceCardData` includes:

- Required role, company and preformatted start date.
- Optional end date and current state.
- Location and typed work mode.
- Description.
- Readonly achievements and technologies.
- Optional company logo and alternative text.
- Optional labels for current state and work mode.

`highlighted` changes the visual Card variant without changing document
semantics.

## Dates and localization

Start and end dates are rendered exactly as provided. The component does not
parse dates, assume timezones or select a locale.

English work-mode labels are safe defaults. Supply `workModeLabel` and
`currentLabel` when localized copy is required.

## Achievements and technologies

Achievements render as a semantic list. Technologies render as static public
`GhTagComponent` instances. Current and work-mode states reuse
`GhBadgeComponent`.

## Logos

Logos are optional and lazy-loaded. Use meaningful alternative text when the
logo contributes information or an empty string when decorative.

## Accessibility

- Role is the Card heading.
- Company and period remain visible text.
- Achievements use `<ul>` and `<li>`.
- Location and work mode are never represented by icon alone.
- Optional content is removed cleanly rather than leaving empty regions.
