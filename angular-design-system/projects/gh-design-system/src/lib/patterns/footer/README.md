# Footer

## Purpose

`gh-footer` creates a consistent semantic closing region with configurable identity, grouped navigation and projected social or legal content.

## Import

```ts
import { GhFooterComponent, type GhFooterGroup } from 'gh-design-system';
```

## Public API

| Input               | Type                       | Default                |
| ------------------- | -------------------------- | ---------------------- |
| `brand`             | `string`                   | required               |
| `description`       | `string \| undefined`      | `undefined`            |
| `linkGroups`        | `readonly GhFooterGroup[]` | `[]`                   |
| `copyright`         | `string \| undefined`      | `undefined`            |
| `showTagline`       | `boolean`                  | `false`                |
| `tagline`           | `string \| undefined`      | `undefined`            |
| `externalLinkLabel` | `string`                   | `'opens in a new tab'` |

There are no outputs. Each group has a `title` and `links`; links contain `label`, `href`, optional `external` and `ariaLabel`.

## Slots and example

```html
<gh-footer
  brand="Example Studio"
  description="Engineering and leadership."
  [linkGroups]="groups"
  copyright="© 2026 Example Studio"
>
  <a ghFooterSocial href="https://example.com">LinkedIn</a>
  <a ghFooterBottom href="/privacy">Privacy</a>
</gh-footer>
```

Use `ghFooterSocial` for social links and `ghFooterBottom` for legal or secondary content. Footer composes Container, Stack and Grid.

## Behavior

- Renders a native `footer`; every link group is a labeled `nav` with a semantic list.
- Groups stack at small widths and distribute across the available Grid space on larger screens.
- External links receive safe attributes and a configurable accessible indication.
- The footer background uses `--gh-pattern-footer-background` in both themes.
- Optional, empty regions do not occupy layout space.

## Internationalization and SSR

All visible copy and dates are supplied by the consumer. Localize `externalLinkLabel`. Footer deliberately does not calculate a year and never reads browser APIs, so server and hydrated markup remain identical.

## Do / Don't / Limitations

- Do prepare copyright text in the application.
- Do use concise group titles that also work as navigation labels.
- Don't hardcode personal identity inside a wrapper around Footer.
- Don't place state-changing buttons in link groups.
- Footer does not provide newsletter forms, live social integrations or automatic date formatting.
