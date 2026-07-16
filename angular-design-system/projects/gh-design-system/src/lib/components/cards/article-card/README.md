# Article Card

## Purpose

`GhArticleCardComponent` presents educational content, blog articles and
external publications using a native linked title and optional media.

## Import

```ts
import { GhArticleCardComponent, type GhArticleCardData } from 'gh-design-system';
```

```ts
const article: GhArticleCardData = {
  title: 'Reactive Forms vs Signal Forms',
  href: '/articles/forms',
  category: 'Angular',
  readingTime: '6 min read',
};
```

```html
<gh-article-card [article]="article" />
```

## Model

`GhArticleCardData` contains:

- Required `title` and `href`.
- Optional `excerpt`.
- Optional `imageSrc` and `imageAlt`.
- Preformatted `publishedAt`.
- `readingTime` and `category`.
- `external` and `featured`.
- Optional localized `linkLabel`.

The component deliberately uses one required data input instead of duplicating
an object API and individual inputs.

## Images

Images use lazy loading, a stable aspect-ratio container and
`object-fit: cover`. Provide descriptive alt text or `imageAlt: ''` when the
image is decorative.

## Links

The title is a native anchor. When `external` is true it receives:

- `target="_blank"`
- `rel="noopener noreferrer"`
- An accessible label announcing that it opens in a new tab.

Navigation is never simulated through a click handler.

## Metadata

Dates are accepted as preformatted strings. Consumers remain responsible for
locale, timezone and translation.

Category and featured state reuse `GhBadgeComponent`.

## Accessibility

- The composed root remains an `<article>`.
- The title is the primary heading and link.
- External navigation is announced.
- Image alternative text remains consumer-controlled.
- The decorative CTA does not create a duplicate link target.
