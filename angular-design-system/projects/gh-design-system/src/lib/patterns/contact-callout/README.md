# Contact Callout

## Purpose

`gh-contact-callout` creates a focused closing section for email, social, scheduling or internal contact navigation. It does not implement a form.

## Import

```ts
import { GhContactCalloutComponent, type GhContactAction } from 'gh-design-system';
```

## Public API

| Input               | Type                                 | Default                |
| ------------------- | ------------------------------------ | ---------------------- |
| `eyebrow`           | `string \| undefined`                | `undefined`            |
| `title`             | `string`                             | required               |
| `description`       | `string \| undefined`                | `undefined`            |
| `actions`           | `readonly GhContactAction[]`         | `[]`                   |
| `alignment`         | `'start' \| 'center'`                | `'center'`             |
| `surface`           | `'subtle' \| 'accent' \| 'gradient'` | `'gradient'`           |
| `externalLinkLabel` | `string`                             | `'opens in a new tab'` |

There are no outputs. Each action contains `label`, `href` and optional `external`, `variant` and `ariaLabel`.

## Example and composition

```html
<gh-contact-callout
  eyebrow="Let's connect"
  title="Let's build something better."
  description="Have a project, opportunity or engineering challenge?"
  [actions]="contactActions"
/>
```

Contact Callout composes `gh-section`, `gh-container`, `gh-stack` and `gh-inline`. Its action styles use the same shared pattern foundation as Hero while retaining native anchor semantics.

## Behavior

- Start and center alignment control content and actions without changing DOM order.
- Actions wrap and stack naturally at narrow widths without viewport JavaScript.
- All three surfaces use semantic tokens; gradient shares `--gh-pattern-accent-gradient` with Hero and Content Highlight.
- External actions receive safe attributes and a configurable accessible indication.
- Empty optional copy or action collections reserve no extra UI.

## Internationalization and SSR

All visible copy comes from the consumer. Localize `externalLinkLabel`. The component never accesses browser globals, storage, dates or viewport measurements and renders deterministically during SSR.

## Do / Don't / Limitations

- Do use it as the closing call to action for a page.
- Do provide direct, specific link labels such as Email or LinkedIn.
- Don't pass state-changing commands or simulate navigation with buttons.
- Don't place a full contact form inside the component.
- Contact Callout does not submit data, validate forms or integrate with calendars and social APIs.
