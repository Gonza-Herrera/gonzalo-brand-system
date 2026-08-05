# Liquid Glass Navigation

## 1. Objective

Migrate the existing Navigation pattern and its real Portfolio and Showcase consumers to the
approved Liquid Glass language without introducing a second navigation family, changing routes, or
turning site navigation into an application-menu pattern.

## 2. Architecture

The implementation follows one direction:

```text
GhNavigation / real application shells
  → navigation.* component tokens
  → Surface, Focus, Motion, Button and semantic text roles
  → primitive tokens
```

`GhNavigationComponent` remains the public Angular boundary. Its styles consume only
`--gh-navigation-*` component variables; the existing public Icon Button owns the mobile trigger.
No Surface wrapper is inserted because it would add DOM and complicate sticky positioning.

## 3. Compatibility

The `gh-navigation` selector, all inputs, the `internalNavigate` output, projection markers,
`GhNavigationItem`, native href behavior and deterministic `menuId` contract remain compatible.
Icon Button adds optional `aria-expanded`, `aria-controls` forwarding and an imperative `focus()`
method; existing consumers are unaffected.

## 4. Global vs local navigation

The public Header and primary links are global navigation and receive the strongest containment.
The Showcase Sidebar is an application-specific local navigation consumer and uses Glass Subtle.
Tabs, Breadcrumbs and Pagination are not current library components; this PR does not fabricate
parallel primitives for them.

## 5. Header

The Header keeps its semantic `<header>`, stable height, brand, projected controls and normal-flow
space. Its material is bounded Glass with an opaque fallback, a restrained boundary and quiet
shadow. It remains legible without relying on the content behind it.

## 6. Top Navigation

The Top Navigation remains a labelled `<nav>` containing a native list of links. The component does
not inject Angular Router; consumers may keep native navigation or opt into the existing interception
output while every anchor retains its authored `href`.

## 7. Navigation Item

Navigation Items preserve Default, Hover, Focus and Active states. No blur is created per item. The
active state combines background, border, weight and a structural indicator, and page links expose
`aria-current="page"`.

## 8. Side Navigation

No public Side Navigation exists. The Showcase Sidebar is the real existing local-navigation
consumer: it keeps a labelled nav, native Router links, internal vertical scrolling and CSS-only
mobile placement. One Glass Subtle container surrounds the list; individual items remain unfiltered.

## 9. Mobile Navigation

The existing collapsible panel remains a simple mobile navigation, not a modal Drawer or Dialog. It
starts closed, uses the public Icon Button, exposes `aria-expanded` and `aria-controls`, closes after
selection and restores focus on Escape.

## 10. Tabs

Tabs are not part of the current public API or product navigation. Route links are not relabelled as
tabs, and an in-page tab keyboard model is not introduced in this migration.

## 11. Breadcrumbs

Breadcrumbs do not currently exist in the library or Portfolio. No demonstration-only component,
token family or public selector is added.

## 12. Pagination

Pagination does not currently exist. Future work must first choose links versus buttons, current-page
semantics and URL ownership before adding component tokens or visual treatment.

## 13. Language Selector

The Portfolio keeps its localized `<nav>` with EN/ES Router links, `hreflang`, `lang`, accessible
names, conceptual-page preservation and `aria-current`. Its compact container consumes Navigation
selector tokens and does not add blur inside the filtered Header.

## 14. Theme Selector

The Portfolio retains the native Form Select introduced by PR 27 and the existing Theme Service.
The Showcase button group reuses Navigation selector aliases. Light, Dark and System behavior,
persistence and the pre-render theme bootstrap remain unchanged.

## 15. Skip Link

Portfolio and Showcase keep their first relevant focusable link and stable main target. The hidden
position is removed on focus; a Solid, high-contrast token mapping, shadow and explicit focus ring
keep it above the sticky Header.

## 16. Active state

The consumer continues to own route-derived active state. Only one primary item should set
`active: true`; the component maps that state to `aria-current="page"`, a boundary, weight and a
mobile/desktop indicator rather than color alone.

## 17. Focus

Brand and Navigation links use the shared focus color, width and offset through Navigation aliases.
The Icon Button retains its own approved focus contract. Focus outlines are not clipped by the
Header or mobile panel.

## 18. Keyboard

Links retain native Enter behavior and the Icon Button retains native Enter/Space behavior. Escape
closes an open mobile panel and restores focus. The component does not introduce arrow-key or menu
roles because site navigation is not an application menu.

## 19. Mobile

Desktop/mobile switching remains CSS-only at the shared `lg` breakpoint. Long labels wrap, the panel
uses available container width, controls retain stable targets and the Showcase Side Navigation
keeps its own scroll area. Hover is never the only feedback.

## 20. Component tokens

`navigation.header`, `panel`, `brand`, `item`, `side`, `selector`, `skipLink`, `backdrop` and
`transition` form one component-level contract. They cover material, structure, active/focus state,
selector containment and shell layering without adding tokens for nonexistent Tabs, Breadcrumbs or
Pagination.

## 21. Light, dark and system

Light and Dark expose identical generated keys. Component aliases resolve through the current
Surface, text, action and focus theme mappings. System remains the existing CSS preference resolver;
there is no third theme map and no Navigation-specific runtime detection.

## 22. Solid fallback

Header, mobile panel and Sidebar paint their opaque fallback first. A single `@supports` query per
structural surface enables the approved composed filter. Unsupported filters, SSR and forced colors
therefore retain contrast, boundaries, active state and focus without JavaScript detection.

## 23. Reduced motion

Reduced motion removes item color transitions and the Showcase mobile Sidebar transform transition.
Open/closed state, visibility, focus and active indicators remain explicit. Blur and
`backdrop-filter` are never animated.

## 24. Forced colors

Forced colors neutralizes Glass backgrounds and shadows, restores Canvas/ButtonBorder surfaces and
uses Highlight for active indicators and focus. It does not disable system color adjustment.

## 25. SSR

Navigation keeps a closed deterministic Signal, stable consumer-authored IDs and authored links.
It has no viewport, scroll, resize, storage or theme detection. Element focus is only invoked after a
browser interaction.

## 26. Accessibility

The pattern preserves `<header>`, labelled `<nav>`, `<ul>`, `<li>`, `<a>` and a real native button.
External links retain their accessible context. Tests cover current route, expanded state, Escape,
focus restoration, selectors and Skip Link structure. This support is not a formal WCAG audit.

## 27. Performance

No dependency, scroll listener, resize listener, runtime blur calculation or JavaScript animation is
added. Filters are limited to one persistent Header and one bounded open panel or Sidebar; links and
compact selectors remain unfiltered. The production baseline before this PR is 580.76 kB raw and
117.50 kB estimated transfer. The final production build is 552.48 kB raw (-28.28 kB) and 119.33 kB
estimated transfer (+1.83 kB). Theme-invariant component aliases are emitted once and continue to
resolve through the active semantic theme; the transfer-size increase is reported rather than
characterized as a performance improvement.

## 28. Do / Don't

Do keep links real, pass one active route, localize labels, use stable IDs, preserve the Skip Link and
review both themes. Do not use `role="menu"`, blur every item, add progressive scroll effects, hide
focus, detect viewport in TypeScript, or use `transparent` over an uncontrolled low-contrast
background.

## 29. Migration notes

Existing consumers receive the new material automatically. Custom projected controls remain
consumer-owned. Applications using the explicit transparent variant should re-check contrast. No
selector, input, output, type, route or projection slot is removed or deprecated.

## 30. Portfolio considerations

The persistent shell remains outside routed page components, preventing Header recreation and route
flicker. Internal navigation continues through Angular Router, mobile selection closes the panel,
route focus management still targets `#main-content`, Router scroll restoration remains enabled, and
language changes preserve the equivalent page.

## 31. Recommendations for PR 29

Feedback Components should define status and announcement semantics independently of Navigation.
Toasts or banners must not compete with the Header z-index, trap focus, reuse navigation active
state, or introduce a global overlay before the dedicated Overlay work.
