# Brand Patterns

Public Brand Patterns compose Design Tokens, Layout Primitives and existing
components into page-ready structures while keeping content configurable.

## Catalogue

- `gh-hero`: page identity, proposition, navigation actions and optional visual.
- `gh-navigation`: responsive primary navigation with consumer-owned active state.
- `gh-footer`: identity, grouped links and projected closing content.
- `gh-section-heading`: controlled section hierarchy and optional action.
- `gh-feature-grid`: Card or minimal capability collections built on Grid.
- `gh-experience-timeline`: semantic chronology built on Experience Card.
- `gh-content-highlight`: editorial featured content built on Card, Badge and Tag.
- `gh-contact-callout`: closing contact navigation built on Section and Container.

Import every public API from `gh-design-system`; consumers must not reference
internal paths. Each pattern has a colocated README covering inputs, slots,
responsive behavior, theming, accessibility, internationalization and SSR.

Patterns are standalone, CSS-responsive and free of business logic. They do
not hardcode personal content, read browser globals or replace application
routing. Native anchors handle navigation and native buttons handle state
changes such as the Navigation mobile menu.
