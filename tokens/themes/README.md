# Themes

Themes map semantic purposes to concrete visual values.

## Light theme

`light.json` explicitly extends `../semantic-tokens.json`. The semantic file is
therefore both the semantic contract and the default light-theme mapping. This
avoids maintaining the same values twice.

## Dark theme

`dark.json` provides a complete value for every semantic token. Its shadows,
surfaces and borders are adapted for dark backgrounds rather than mechanically
inverting the light theme.

## Runtime strategy

Themes are applied to the document root:

```html
<html data-theme="light"></html>
```

```html
<html data-theme="dark"></html>
```

Priority:

1. Explicit `data-theme` selected by the user.
2. `prefers-color-scheme` when no explicit attribute exists.
3. Light theme as the CSS default.

Selecting the `system` preference removes `data-theme`, allowing the media
query to resolve the active theme without a competing explicit selector.

Public components consume semantic variables and work in both themes. Button
action roles include primary, secondary, ghost, danger and disabled mappings,
with hover and active values where interaction requires them.

Badge uses neutral, info, success, warning, danger and accent status families.
Tag reuses those base status roles and adds variant-specific hover, active,
selected and remove-hover values.

Card roles adapt backgrounds, borders, elevation, selection and glass
translucency independently for each theme.
