# gh-design-system

Reusable Angular and SCSS foundations for the Gonzalo Herrera Design System.

## Public API

- `GhThemeService`
- `GhTheme`
- `GH_THEMES`
- `GH_THEME_ATTRIBUTE`
- `GH_THEME_STORAGE_KEY`
- `isGhTheme`

## Global styles

```scss
@use 'gh-design-system/styles';
```

The stylesheet exposes namespaced primitive tokens and theme-aware semantic
tokens. Consumer components should use semantic custom properties whenever
possible.

## Mixins

```scss
@use 'gh-design-system/styles/mixins' as gh;
```

Available foundation mixins:

- `gh.card`
- `gh.section`
- `gh.container`
- `gh.gradient-primary`
- `gh.gradient-technology`

## Theming

Apply `data-gh-theme="light"` or `data-gh-theme="dark"` to the document root,
or use `GhThemeService` to apply and persist the preference.

No visual Angular components are published in the foundations release.
