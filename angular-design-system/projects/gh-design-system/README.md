# gh-design-system

Reusable Angular components and SCSS foundations for the Gonzalo Herrera Design
System.

## Public Angular API

- `GhThemeService`
- `GhBadgeComponent`
- `GhBadgeVariant`
- `GhBadgeSize`
- `GhBadgeAppearance`
- `GhBadgeRounded`
- `GH_BADGE_VARIANTS`
- `GH_BADGE_SIZES`
- `GH_BADGE_APPEARANCES`
- `GH_BADGE_ROUNDED_OPTIONS`
- `GhButtonComponent`
- `GhButtonVariant`
- `GhButtonSize`
- `GhButtonType`
- `GH_BUTTON_VARIANTS`
- `GH_BUTTON_SIZES`
- `GH_BUTTON_TYPES`
- `GhCardComponent`
- `GhCardVariant`
- `GhCardPadding`
- `GhCardRadius`
- `GH_CARD_VARIANTS`
- `GH_CARD_PADDINGS`
- `GH_CARD_RADII`
- `GhArticleCardComponent`
- `GhArticleCardData`
- `GhExperienceCardComponent`
- `GhExperienceCardData`
- `GhExperienceWorkMode`
- `GH_EXPERIENCE_WORK_MODES`
- `GhProjectCardComponent`
- `GhProjectCardData`
- `GhProjectCardOrientation`
- `GhProjectStatus`
- `GH_PROJECT_CARD_ORIENTATIONS`
- `GH_PROJECT_STATUSES`
- `GhTagComponent`
- `GhTagMode`
- `GhTagVariant`
- `GhTagSize`
- `GH_TAG_MODES`
- `GH_TAG_VARIANTS`
- `GH_TAG_SIZES`
- `GhTheme`
- `GhThemePreference`
- `GH_THEMES`
- `GH_THEME_PREFERENCES`
- `GH_THEME_ATTRIBUTE`
- `GH_THEME_STORAGE_KEY`
- `isGhTheme`
- `isGhThemePreference`

## Public SCSS API

Load tokens and themes:

```scss
@use 'gh-design-system/styles';
```

Opt into safe global foundations:

```scss
@use 'gh-design-system/styles/foundations';
```

Load reusable mixins:

```scss
@use 'gh-design-system/styles/mixins' as gh;
```

The package build includes all three entry points as SCSS assets.

## Theming

Apply `data-theme="light"` or `data-theme="dark"` to the document root, or use
`GhThemeService` to manage `light`, `dark` and `system` preferences.

The service exposes `preference` and `resolvedTheme` signals, persists the
selected preference and avoids browser-only APIs during SSR.

## Button

```ts
import { GhButtonComponent } from 'gh-design-system';
```

```html
<gh-button variant="secondary" size="lg">View project</gh-button>
```

The standalone component supports primary, secondary, ghost and danger
variants; small, medium and large sizes; native form types; disabled, loading
and full-width states; and start/end icon projection. See
[`src/lib/components/button/README.md`](src/lib/components/button/README.md)
for its complete API and accessibility guidance.

## Badge and Tag

```ts
import { GhBadgeComponent, GhTagComponent } from 'gh-design-system';
```

```html
<gh-badge variant="success">Ready</gh-badge>

<gh-tag mode="selectable" [selected]="selected()" (selectedChange)="selected.set($event)">
  Angular
</gh-tag>
```

Badge is always non-interactive. Tag renders a span in static mode, a native
button in selectable mode and a dedicated accessible removal button in
removable mode. See the component-specific
[`Badge`](src/lib/components/badge/README.md) and
[`Tag`](src/lib/components/tag/README.md) documentation.

## Card family

```ts
import {
  GhArticleCardComponent,
  GhCardComponent,
  GhExperienceCardComponent,
  GhProjectCardComponent,
} from 'gh-design-system';
```

`GhCardComponent` owns shared surface, spacing, radius, elevation and visual
states. Specialized Cards consume typed data models and compose Badge and Tag
without class inheritance. See the [`Card family`](src/lib/components/cards)
documentation.

Semantic tokens such as `--gh-text-primary`, `--gh-action-primary-background`,
`--gh-status-success-background`, `--gh-tag-accent-selected-background` and
`--gh-card-border-selected` are the supported styling contract for public
components.
