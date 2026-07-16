# Styles

The SCSS entry point maps the repository's primitive and theme tokens to
prefixed CSS custom properties.

```scss
@use 'gh-design-system/styles';
```

Use semantic properties such as `--gh-color-text-primary` in application and
component styles. Primitive properties such as `--gh-color-lavender` are
available for documentation and controlled brand expressions.

Reusable SCSS mixins are exposed separately:

```scss
@use 'gh-design-system/styles/mixins' as gh;
```
