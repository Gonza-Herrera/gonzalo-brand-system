# Navigation Material Refinement

## 1. Objective

PR 28.1 refines the approved Navigation architecture so the Header reads as a suspended Liquid
Glass sheet rather than a conventional full-width Glass Card. Routing, DOM, public API, keyboard,
focus management, locale behavior and theme behavior remain unchanged.

## 2. PR 28 vs PR 28.1

PR 28 established the component contract, semantics, responsive panel, selectors, fallbacks and
tests. PR 28.1 changes only component tokens and visual CSS: floating geometry, layered material,
softer boundaries, ambient depth, lighter active state and integrated selectors.

## 3. Visual reference

The approved direction is a restrained horizontal capsule with warm Ivory, Lavender, Cloud Blue and
Peach reflections. The implementation prioritizes legibility and platform resilience over literal
simulation; it does not claim pixel-perfect reproduction of the mockup.

## 4. Material strategy

The material is composed from a semantic fallback, up to three background layers, one primary
backdrop filter, one outer shadow token and one compound inset-shadow token. No additional wrapper,
pseudo-element, runtime calculation or dependency is required.

## 5. Background layers

The Header recipe uses a vertical top-light layer, a diagonal brand reflection and a theme-aware
Glass base. The mobile panel uses the same restrained light direction over Glass Elevated. Brand
colors remain low-alpha accents rather than visible rainbow bands.

## 6. Transparency

The filtered light Header inherits the 0.8 Glass surface while dark inherits the stronger 0.9 dark
Glass surface. This intentional theme difference allows ambient color in light while maintaining
containment and readable text in dark.

## 7. Blur

The Header uses the medium Glass blur and default saturation through
`navigation.header.backdropFilter`. The open mobile panel keeps Glass Elevated. Links and compact
selectors never instantiate their own filter.

## 8. Saturation

Default Glass saturation preserves ambient Lavender, Cloud Blue and Peach without increasing them
to neon intensity. Saturation is static and never transitions.

## 9. Highlight

A low-alpha top-light gradient spans part of the Header and fades before competing with content. A
second diagonal layer supplies a restrained lateral reflection. Both are token-authored background
layers with no hit-testing or accessibility surface.

## 10. Inner border

The inset shadow combines a theme-aware top edge, a minimal cool left reflection and a faint lower
edge. It occupies no layout space and does not clip focus outlines.

## 11. Outer border

The former bottom rule becomes a complete low-alpha boundary derived from the Glass border role.
It remains slightly clearer in dark through the existing theme mapping and is replaced by system
colors in forced-colors mode.

## 12. Shadows

The Header maps to the existing large semantic shadow to create broad ambient separation. The open
panel retains medium elevation and compact selectors use the small shadow. No item receives a hover
elevation shadow.

## 13. Active Navigation Item

The active item changes from the shared selected-surface recipe to a 12% Lavender wash, transparent
boundary and semibold foreground. `aria-current="page"` and the independent focus ring are
preserved.

The structural active indicator changes from the 3 px focus width to the 1 px default border width.
It remains vertical on mobile and horizontal on desktop, does not affect layout and does not slide.

## 14. Language Selector

The segmented container uses a solid fallback first, then a translucent Glass Subtle background
when filtering is supported by the Header. The active language has a soft boundary, top inset light
and compact shadow. Locale URLs, labels and keyboard behavior remain owned by Portfolio.

## 15. Theme Selector

Showcase buttons and Portfolio's native `<select>` share selector containment, radius, boundary and
active material. The native control is intentionally retained; theme persistence, initial SSR
state and Light/Dark/System logic are not reimplemented.

## 16. Light Theme

Ivory and white Glass remain the base, with small Lavender, Cloud Blue and Peach reflections and
Deep Ink text. The Header is translucent without becoming milky or dependent on a specific Hero.

## 17. Dark Theme

Deep Ink and blue-gray Surface mappings provide the base. The same aliases resolve to stronger dark
opacity, restrained cool boundary and light text. No flat black, electric blue or opaque Lavender
selector is introduced.

## 18. Solid fallback

Unsupported `backdrop-filter` paints the same three-layer recipe over the opaque semantic fallback.
Geometry, outer border, inset edge, shadow, active indicator and selectors remain present. Support is
detected only with CSS `@supports`.

## 19. Forced colors

Forced colors neutralizes gradients, translucency, Glass shadows and filters in favor of Canvas,
CanvasText, ButtonBorder, Highlight and LinkText. Focus and active structure remain visible; the
Liquid Glass appearance is intentionally not preserved.

## 20. Performance

There is one persistent Header filter and one conditional mobile-panel filter, no nested selector
filter, no animated blur, no new JavaScript, listener or dependency, and at most three gradients per
material. The six directly refined authored stylesheets increased from 19,123 to 24,560 bytes
(+5,437 raw bytes) before minification. The production initial bundle increased from the PR 28
baseline of 552.48 kB / 119.33 kB estimated transfer to 559.71 kB / 120.02 kB (+7.23 kB raw /
+0.69 kB transfer); it remains above the existing 500 kB Angular warning budget.

## 21. Comparison with mockup

Achieved similarities are the floating capsule, viewport inset, broad radius, layered top/diagonal
light, quieter active item, elevated selector thumb and ambient integration.

## 22. Limitations

Intentional differences include native Theme select chrome and conservative blur/shadow budgets.
Browser rendering of backdrop filtering varies, and no claim is made for 100% visual parity, every
browser or every physical display.

## 23. Recommendations for PR 28.2

Keep the current DOM and tokens. If motion is approved, limit it to color, opacity and indicator
continuity; measure before adding a sliding indicator, avoid spring/scale effects on primary links,
retain reduced-motion behavior and never animate `backdrop-filter`, layout or ambient gradients.
