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
- `GhIconButtonComponent`
- `GhIconButtonVariant`
- `GhIconButtonSize`
- `GhIconButtonType`
- `GH_ICON_BUTTON_VARIANTS`
- `GH_ICON_BUTTON_SIZES`
- `GH_ICON_BUTTON_TYPES`
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
- `GhContainerComponent`
- `GhContainerSize`
- `GhContainerGutters`
- `GhSectionComponent`
- `GhSectionSpacing`
- `GhSectionSurface`
- `GhStackComponent`
- `GhStackAlign`
- `GhStackJustify`
- `GhInlineComponent`
- `GhInlineAlign`
- `GhInlineJustify`
- `GhGridComponent`
- `GhGridColumns`
- `GhGridMinItemSize`
- `GhGridAlign`
- `GhClusterComponent`
- `GhClusterAlign`
- `GhClusterJustify`
- `GhDividerComponent`
- `GhDividerOrientation`
- `GhDividerStyle`
- `GhDividerTone`
- `GhLayoutGap`
- `GhHeroComponent` and `GhHeroVisualDirective`
- `GhNavigationComponent`
- `GhFooterComponent`
- `GhSectionHeadingComponent`
- `GhFeatureGridComponent`
- `GhExperienceTimelineComponent`
- `GhContentHighlightComponent`
- `GhContactCalloutComponent`
- Brand Pattern data models and controlled variant types
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

The main styles entry point also emits the native Form Control classes (`.gh-form-field`,
`.gh-input`, `.gh-textarea`, `.gh-select`, `.gh-checkbox`, `.gh-radio`, `.gh-switch`, and affix
shells). These classes preserve native elements and Angular Forms value accessors; see the
[`Liquid Glass Form Control contract`](../../docs/design/liquid-glass/form-controls.md).

The existing `GhNavigationComponent` consumes the `navigation.*` component contract, reuses Icon
Button for mobile disclosure and limits filtering to its structural Header and open panel. See the
[`Liquid Glass Navigation contract`](../../docs/design/liquid-glass/navigation.md).

## Theming

Apply `data-theme="light"` or `data-theme="dark"` to the document root, or use
`GhThemeService` to manage `light`, `dark` and `system` preferences.

The service exposes `preference` and `resolvedTheme` signals, persists the
selected preference and avoids browser-only APIs during SSR.

## Button

```ts
import { GhButtonComponent, GhIconButtonComponent } from 'gh-design-system';
```

```html
<gh-button variant="secondary" size="lg">View project</gh-button>

<gh-icon-button aria-label="Open navigation">
  <svg aria-hidden="true"><!-- icon --></svg>
</gh-icon-button>
```

Button supports primary, secondary, tertiary, ghost and danger
variants; small, medium and large sizes; native form types; disabled, loading
and full-width states; and start/end icon projection. Icon Button supports primary, secondary,
ghost and danger variants with a required consumer-supplied accessible name. See
[`src/lib/components/button/README.md`](src/lib/components/button/README.md)
and [`src/lib/components/icon-button/README.md`](src/lib/components/icon-button/README.md)
for their complete APIs and accessibility guidance.

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

`GhCardComponent` owns shared surface, spacing, radius, elevation and visual states. Existing
variants map through Card component tokens to Solid, Glass Subtle, Glass and Glass Elevated while
interactive/selected remain state. Specialized Cards consume typed data models and compose Badge
and Tag without class inheritance. See the
[`Card`](src/lib/components/cards/card/README.md) and
[`Liquid Glass Card`](../../docs/design/liquid-glass/cards.md) documentation.

Article Card supports optional content type, category, topics, intrinsic image dimensions,
preformatted and machine-readable publication dates, external-link safety and a localized
`h2 | h3` composition contract. Locale, routing and editorial status remain consumer concerns.

Semantic tokens such as `--gh-text-primary`, `--gh-action-primary-background`,
`--gh-status-success-background`, `--gh-tag-accent-selected-background` and
`--gh-card-border-selected` are the supported styling contract for public
components.

## Layout primitives

```ts
import {
  GhClusterComponent,
  GhContainerComponent,
  GhDividerComponent,
  GhGridComponent,
  GhInlineComponent,
  GhSectionComponent,
  GhStackComponent,
} from 'gh-design-system';
```

The seven primitives provide constrained widths, semantic section rhythm,
vertical and horizontal flow, responsive grids, wrapping clusters and
accessible separators. They use public layout and spacing tokens, contain no
browser measurement logic and preserve projected DOM order. See the
[`layout`](src/lib/layout) documentation for component-level APIs and guidance.

## Brand Patterns

```ts
import {
  GhContactCalloutComponent,
  GhContentHighlightComponent,
  GhExperienceTimelineComponent,
  GhFeatureGridComponent,
  GhFooterComponent,
  GhHeroComponent,
  GhNavigationComponent,
  GhSectionHeadingComponent,
} from 'gh-design-system';
```

The eight standalone patterns provide page-ready composition without embedding
personal content or application routing. They reuse public Layout Primitives,
Card, Badge, Tag and Experience Card, keep navigation as native links, and use
CSS-only responsive behavior. See the [`patterns`](src/lib/patterns) catalogue
and the colocated README for each public API.
