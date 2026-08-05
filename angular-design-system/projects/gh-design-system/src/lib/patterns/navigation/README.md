# Navigation

## Purpose

`gh-navigation` provides brand navigation for personal sites, portfolios and lightweight landing pages without knowing Angular routes.

## Import

```ts
import { GhNavigationComponent, type GhNavigationItem } from 'gh-design-system';
```

## Public API

| Input                         | Type                          | Default                   |
| ----------------------------- | ----------------------------- | ------------------------- |
| `brand`                       | `string`                      | required                  |
| `brandHref`                   | `string`                      | `'/'`                     |
| `items`                       | `readonly GhNavigationItem[]` | `[]`                      |
| `sticky`                      | `boolean`                     | `true`                    |
| `transparent`                 | `boolean`                     | `false`                   |
| `showThemeControl`            | `boolean`                     | `false`                   |
| `menuLabel`                   | `string`                      | `'Open navigation menu'`  |
| `closeMenuLabel`              | `string`                      | `'Close navigation menu'` |
| `navigationLabel`             | `string`                      | `'Main navigation'`       |
| `menuId`                      | `string`                      | `'gh-navigation-menu'`    |
| `externalLinkLabel`           | `string`                      | `'opens in a new tab'`    |
| `interceptInternalNavigation` | `boolean`                     | `false`                   |

| Output             | Type     | Description                                      |
| ------------------ | -------- | ------------------------------------------------ |
| `internalNavigate` | `string` | Internal `href` selected through a primary click |

`GhNavigationItem` contains `label`, `href`, optional `external`, `active` and `ariaLabel`.

## Slots and example

```html
<gh-navigation brand="Example Studio" [items]="items" [showThemeControl]="true">
  <span ghNavigationLogo aria-hidden="true">ES</span>
  <a ghNavigationActions href="/contact">Contact</a>
  <app-theme-toggle ghNavigationThemeControl />
</gh-navigation>
```

The projection markers are `ghNavigationLogo`, `ghNavigationActions` and `ghNavigationThemeControl`. The component composes the public Container primitive.

Router-aware applications can opt into client-side navigation without coupling the Design System to
Angular Router:

```html
<gh-navigation
  brand="Example Studio"
  [items]="items"
  [interceptInternalNavigation]="true"
  (internalNavigate)="router.navigateByUrl($event)"
/>
```

## Behavior

- The consumer determines the active item; active links expose `aria-current="page"` and a non-color underline.
- The mobile menu composes the public Icon Button, Signals, `aria-expanded` and `aria-controls`.
- Selecting an item closes the mobile menu. Escape closes it and returns focus to the toggle.
- Internal interception is opt-in. When enabled, an unmodified primary click on the brand or an
  internal item prevents full-document navigation and emits `internalNavigate`.
- External links, modified clicks and non-primary clicks preserve native browser behavior, including
  opening destinations in another tab. Every link retains its real `href`.
- Desktop/mobile switching is CSS-only. The collapsible layout remains active through tablet widths,
  and the horizontal layout starts at the shared `lg` (1024px) breakpoint so projected controls and
  longer localized labels have enough room. The initial Signal state is closed and deterministic.
- External links receive `target="_blank"`, `rel="noopener noreferrer"` and accessible context.
- Sticky and transparent presentation remain optional and token-driven.

## Liquid Glass material and tokens

The existing selector and API now consume `--gh-navigation-*` component tokens. The global Header
maps to bounded Glass with an opaque fallback; the open mobile panel maps to Glass Elevated. Blur is
never instantiated per link, selector item or Side Navigation item. `@supports` performs the CSS-only
enhancement and forced colors returns structural surfaces to system colors.

The explicit `transparent` input remains compatible and intentionally disables the Header material.
Consumers should use it only when the authored backdrop preserves contrast. Sticky positioning does
not add scroll listeners, resize listeners, progressive blur or a separate scrolled state.

When more than one Navigation exists on a page, pass a unique, stable `menuId`. This avoids duplicate IDs and remains deterministic for SSR.

## Internationalization and SSR

Localize the menu, close, navigation and external-link labels. The component does not inject a
router, browser global, storage API or viewport measurement. Optional interception emits only the
authored `href`; the consumer owns client-side routing. Focus access only occurs in response to a
browser interaction.

## Do / Don't / Limitations

- Do pass route-derived active state from the consuming application.
- Do project navigation links or controls into the actions slot.
- Do enable interception only when the consumer handles `internalNavigate`.
- Don't remove `href` values or mark external destinations as internal.
- Don't treat the component as an Angular Router abstraction; it emits an authored URL without
  knowing how the consumer resolves it.
- Don't use the theme slot without `showThemeControl`.
- The mobile menu is intentionally a simple collapsible panel, not a drawer, focus trap or global scroll lock.
- Tabs, Breadcrumbs, Pagination, nested navigation and collapsed Side Navigation are not current
  public APIs and are not synthesized by this migration.
