# Content Highlight

## Purpose

`gh-content-highlight` creates one prominent editorial composition for an article, project, LinkedIn post, resource or talk without duplicating Article Card or Project Card behavior.

## Import

```ts
import { GhContentHighlightComponent, type GhContentHighlightData } from 'gh-design-system';
```

## Public API

| Input               | Type                                               | Default                |
| ------------------- | -------------------------------------------------- | ---------------------- |
| `content`           | `GhContentHighlightData`                           | required               |
| `orientation`       | `'horizontal' \| 'vertical'`                       | `'horizontal'`         |
| `surface`           | `'default' \| 'accent' \| 'gradient'`              | `'default'`            |
| `headingLevel`      | `2 \| 3`                                           | `2`                    |
| `typeLabels`        | `Readonly<Record<GhContentHighlightType, string>>` | English labels         |
| `tagsLabel`         | `string`                                           | `'Content tags'`       |
| `externalLinkLabel` | `string`                                           | `'opens in a new tab'` |

There are no outputs or content slots. Data includes `type`, `title`, `href`, `linkLabel` and optional eyebrow, description, external flag, image metadata and tags.

## Example and composition

```html
<gh-content-highlight
  [content]="featuredArticle"
  orientation="horizontal"
  surface="gradient"
  [headingLevel]="2"
/>
```

The pattern composes `gh-card`, `gh-badge`, `gh-tag`, `gh-stack` and `gh-cluster`. The single call-to-action is a native anchor, separate from the Card surface.

## Behavior

- Horizontal content becomes a single column below the medium breakpoint.
- Images are optional, lazy loaded and fluid; consumers must provide meaningful alt text unless the image is decorative.
- The Card is not itself clickable, preventing invalid nested interactions.
- Tags remain non-interactive metadata and are exposed as a named group. External links use safe attributes and accessible context.
- Accent and gradient surfaces use shared semantic roles in both themes.

## Internationalization and SSR

Override `typeLabels`, `tagsLabel` and `externalLinkLabel` for the active language. All dates and copy are consumer-owned. The component uses no browser APIs, requests or hydration-sensitive values.

## Do / Don't / Limitations

- Do highlight a single high-priority content item.
- Do choose `headingLevel` from the containing page outline.
- Don't wrap the entire Card in a link or add interactive Tags.
- Don't use a Highlight as a substitute for a collection grid.
- The pattern does not download resources, embed social posts or infer media dimensions.
