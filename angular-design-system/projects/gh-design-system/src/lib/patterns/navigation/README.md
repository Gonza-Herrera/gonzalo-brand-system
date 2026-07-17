# Navigation

## Purpose

`gh-navigation` provides brand navigation for personal sites, portfolios and lightweight landing pages without knowing Angular routes.

## Import

```ts
import { GhNavigationComponent, type GhNavigationItem } from 'gh-design-system';
```

## Public API

| Input               | Type                          | Default                   |
| ------------------- | ----------------------------- | ------------------------- |
| `brand`             | `string`                      | required                  |
| `brandHref`         | `string`                      | `'/'`                     |
| `items`             | `readonly GhNavigationItem[]` | `[]`                      |
| `sticky`            | `boolean`                     | `true`                    |
| `transparent`       | `boolean`                     | `false`                   |
| `showThemeControl`  | `boolean`                     | `false`                   |
| `menuLabel`         | `string`                      | `'Open navigation menu'`  |
| `closeMenuLabel`    | `string`                      | `'Close navigation menu'` |
| `navigationLabel`   | `string`                      | `'Main navigation'`       |
| `menuId`            | `string`                      | `'gh-navigation-menu'`    |
| `externalLinkLabel` | `string`                      | `'opens in a new tab'`    |

There are no outputs. `GhNavigationItem` contains `label`, `href`, optional `external`, `active` and `ariaLabel`.

## Slots and example

```html
<gh-navigation brand="Example Studio" [items]="items" [showThemeControl]="true">
  <span ghNavigationLogo aria-hidden="true">ES</span>
  <a ghNavigationActions href="/contact">Contact</a>
  <app-theme-toggle ghNavigationThemeControl />
</gh-navigation>
```

The projection markers are `ghNavigationLogo`, `ghNavigationActions` and `ghNavigationThemeControl`. The component composes the public Container primitive.

## Behavior

- The consumer determines the active item; active links expose `aria-current="page"` and a non-color underline.
- The mobile menu uses a real button, Signals, `aria-expanded` and `aria-controls`.
- Selecting an item closes the mobile menu. Escape closes it and returns focus to the toggle.
- Desktop/mobile switching is CSS-only. The collapsible layout remains active through tablet widths,
  and the horizontal layout starts at the shared `lg` (1024px) breakpoint so projected controls and
  longer localized labels have enough room. The initial Signal state is closed and deterministic.
- External links receive `target="_blank"`, `rel="noopener noreferrer"` and accessible context.
- Sticky and transparent presentation remain optional and token-driven.

When more than one Navigation exists on a page, pass a unique, stable `menuId`. This avoids duplicate IDs and remains deterministic for SSR.

## Internationalization and SSR

Localize the menu, close, navigation and external-link labels. No router, browser global, storage API or viewport measurement is used. Focus access only occurs in response to a browser interaction.

## Do / Don't / Limitations

- Do pass route-derived active state from the consuming application.
- Do project navigation links or controls into the actions slot.
- Don't use it as an Angular Router abstraction or simulate links with click handlers.
- Don't use the theme slot without `showThemeControl`.
- The mobile menu is intentionally a simple collapsible panel, not a drawer, focus trap or global scroll lock.
