# Experience Card

## Purpose

`GhExperienceCardComponent` presents a semantic professional-experience entry
for portfolios, CV pages and leadership profiles.

It continues to compose the public base Card. Standard entries use `outlined` → Solid for dense
professional content; `highlighted` entries use `elevated` → Glass Elevated. No Experience input or
content structure changes as part of the material migration.

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
- One description or an ordered collection of description paragraphs.
- Readonly responsibilities, achievements and technologies.
- Optional capabilities, separated semantically from technologies.
- Optional company logo and alternative text.
- Optional labels for current state and work mode.

The component also accepts `headingLevel` (`2` by default, or `3`) and a
`GhExperienceCardLabels` object. The labels localize the relationship used by
the Card's accessible name plus the Responsibilities, Achievements and
Technologies headings.

The optional `capabilities` label localizes the separate capabilities group and defaults to
`Capabilities` for existing consumers.

`highlighted` changes the visual Card variant without changing document
semantics.

## Dates and localization

Start and end dates are rendered exactly as provided. The component does not
parse dates, assume timezones or select a locale.

English work-mode and Card labels are safe defaults. Supply `workModeLabel`,
`currentLabel` and `labels` when localized copy is required.

## Description, achievements and skills

Responsibilities and achievements render as separate semantic lists.
Description arrays render as separate paragraphs in their supplied order. Technologies and
capabilities render as separate labelled groups of static public `GhTagComponent` instances.
Current and work-mode states reuse `GhBadgeComponent`.

## Logos

Logos are optional and lazy-loaded. Use meaningful alternative text when the
logo contributes information or an empty string when decorative.

## Accessibility

- Role is the Card heading.
- Company and period remain visible text.
- Responsibilities and achievements use separate `<ul>` and `<li>` groups.
- `headingLevel="3"` keeps Card headings below a containing section `h2`.
- Location and work mode are never represented by icon alone.
- Optional content is removed cleanly rather than leaving empty regions.
