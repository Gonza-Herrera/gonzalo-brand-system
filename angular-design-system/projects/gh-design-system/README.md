# gh-design-system

Reusable Angular and SCSS foundations for the Gonzalo Herrera Design System.

## Public Angular API

- `GhThemeService`
- `GhTheme`
- `GH_THEMES`
- `GH_THEME_ATTRIBUTE`
- `GH_THEME_STORAGE_KEY`
- `isGhTheme`

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
`GhThemeService` to apply and persist the preference.

Semantic tokens such as `--gh-text-primary`, `--gh-surface-primary` and
`--gh-border-default` are the supported styling contract for future
components.

No visual Angular components are published in this release.
