# gh-design-system

Reusable Angular components and SCSS foundations for the Gonzalo Herrera Design
System.

## Public Angular API

- `GhThemeService`
- `GhButtonComponent`
- `GhButtonVariant`
- `GhButtonSize`
- `GhButtonType`
- `GH_BUTTON_VARIANTS`
- `GH_BUTTON_SIZES`
- `GH_BUTTON_TYPES`
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

Semantic tokens such as `--gh-text-primary`, `--gh-surface-primary`,
`--gh-action-primary-background` and `--gh-focus-ring` are the supported
styling contract for public components.
