# Feature Grid

## Purpose

`gh-feature-grid` presents capabilities, values or benefits as either structured Cards or a quieter editorial list.

## Import

```ts
import { GhFeatureGridComponent, type GhFeatureItem } from 'gh-design-system';
```

## Public API

| Input               | Type                       | Default                |
| ------------------- | -------------------------- | ---------------------- |
| `features`          | `readonly GhFeatureItem[]` | required               |
| `columns`           | `2 \| 3 \| 4 \| 'auto'`    | `'auto'`               |
| `variant`           | `'cards' \| 'minimal'`     | `'cards'`              |
| `externalLinkLabel` | `string`                   | `'opens in a new tab'` |

There are no outputs. Each feature includes `title`, `description` and optional `eyebrow`, `iconLabel`, `href` and `external`.

## Example and composition

```html
<gh-feature-grid [features]="features" [columns]="3" variant="cards" />
```

Feature Grid always delegates layout to `gh-grid`. The Cards variant composes `gh-card` and `gh-stack`; the minimal variant keeps semantic articles without introducing a second Card implementation.

The optional `iconLabel` is a compact textual symbol and is decorative. Titles and descriptions must communicate the feature without the icon.

## Behavior

- Fixed columns collapse through the public Grid breakpoints; auto uses the shared Grid minimum-width token.
- Cards remain equal-height through the Card API. Minimal items use a semantic border and tokenized rhythm.
- Optional feature links are native anchors inside the item, not an interactive wrapper around the complete surface.
- External links receive safe attributes and a configurable accessible indication.
- Empty arrays render an empty Grid without errors; missing icons reserve no space.

## Internationalization and SSR

Feature content is supplied by the consumer. Localize `externalLinkLabel` when needed. The component does not sort, fetch, measure the viewport or access browser globals.

## Do / Don't / Limitations

- Do use it for parallel capabilities or benefits of similar weight.
- Do keep descriptions concise enough to scan.
- Don't use icons as the only source of meaning.
- Don't use Feature Grid for chronological or deeply nested content.
- The component does not support projected SVG templates; use a textual symbol or omit the icon.
