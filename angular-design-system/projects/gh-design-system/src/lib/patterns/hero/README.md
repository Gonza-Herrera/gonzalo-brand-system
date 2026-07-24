# Hero

## Purpose

`gh-hero` presents a page identity, value proposition, native navigation actions and an optional visual composition. It contains no personal content.

## Import

```ts
import { GhHeroComponent, GhHeroVisualDirective, type GhHeroAction } from 'gh-design-system';
```

Import `GhHeroVisualDirective` only when using the visual slot.

## Public API

| Input               | Type                                             | Default                |
| ------------------- | ------------------------------------------------ | ---------------------- |
| `eyebrow`           | `string \| undefined`                            | `undefined`            |
| `title`             | `string`                                         | required               |
| `description`       | `string \| undefined`                            | `undefined`            |
| `actions`           | `readonly GhHeroAction[]`                        | `[]`                   |
| `alignment`         | `'start' \| 'center'`                            | `'start'`              |
| `layout`            | `'content-only' \| 'split' \| 'centered'`        | `'split'`              |
| `surface`           | `'default' \| 'subtle' \| 'gradient' \| 'glass'` | `'gradient'`           |
| `minHeight`         | `'auto' \| 'screen'`                             | `'auto'`               |
| `headingLevel`      | `1 \| 2`                                         | `1`                    |
| `externalLinkLabel` | `string`                                         | `'opens in a new tab'` |

There are no outputs. `GhHeroAction` includes `label`, optional `href`, `external`, `variant` and `ariaLabel`. Entries without `href` are not rendered because Hero actions are navigation.

## Slots and example

```html
<gh-hero
  eyebrow="Frontend leadership · Angular · AI"
  title="Think bigger. Build smarter."
  description="Helping teams build better software."
  [actions]="actions"
>
  <div ghHeroVisual>
    <img src="hero.svg" alt="Abstract product composition" />
  </div>
</gh-hero>
```

The `ghHeroVisual` slot accepts an image, illustration, mockup or consumer-owned composition. Hero composes `gh-section`, `gh-container`, `gh-stack` and `gh-inline`.

## Behavior

- Split uses one column below the medium breakpoint and two columns above it.
- Centered and content-only constrain reading width; projected media remains fluid.
- All surfaces consume semantic theme tokens. Gradient variants share `--gh-pattern-accent-gradient`.
- Actions are native anchors. External actions receive safe `target` and `rel` attributes plus a configurable accessible indication.
- The default heading is `h1`; use `headingLevel="2"` when a page already owns its `h1`.
- Rendering and responsive behavior are deterministic and CSS-only, with no browser globals.

## Internationalization and SSR

All content comes from inputs. Localize `externalLinkLabel` when external links are present. Hero does not access `window`, `document`, storage, dates or viewport measurements and is SSR/hydration safe.

## Do / Don't / Limitations

- Do use one primary Hero to communicate the page proposition.
- Do provide meaningful alternative text for informative media.
- Don't use Hero for every section or place multiple `h1` elements on one page.
- Don't pass state-changing operations as actions; Hero only renders navigation links.
- Hero does not fetch media, animate on scroll or create an image composition for the consumer.
