# Liquid Glass performance

Backdrop filtering, translucent compositing, large shadows, and moving ambient layers can increase
paint, memory, and GPU cost. Performance is therefore part of the material contract.

PR 21 sets the constraints. PR 22 adds a deliberately capped token scale but no production effect or
speculative instance count. PR 23 must measure representative surfaces before setting an exact
simultaneous-instance budget, and later component work must enforce it proportionately.

## Rendering rules

- Use one backdrop-filter region for one visual material region.
- Do not nest backdrop-filter surfaces by default.
- Keep filtered regions as small and short-lived as the design allows.
- Avoid glass on long lists, dense grids, virtualized collections, and page-sized scrolling panels.
- Avoid several large, soft shadows on the same surface.
- Do not animate blur, filter chains, large shadows, gradients, or ambient backgrounds continuously.
- Do not add invisible overlays solely to manufacture a backdrop.
- A Solid fallback must use fewer rendering resources and preserve hierarchy.

## Composition strategy

Prefer:

- one shared material behind a group of related elements;
- opaque child content inside a translucent parent;
- static ambient color rather than animated light fields;
- a clear border and modest shadow before increasing blur;
- fewer simultaneous depth levels;
- theme-aware semantic tokens that can simplify effects centrally.

Avoid:

- a glass surface per repeated row or chip;
- glass inside glass;
- fixed full-viewport filters that repaint during scroll;
- broad `will-change` declarations kept active indefinitely;
- multiple pseudo-elements with independent filters and blend modes;
- JavaScript pointer tracking for decorative lighting.

## Measurement requirements

PR 22 and every surface implementation must capture a baseline and compare the proposed treatment on
representative content.

Measure or inspect:

- frame stability during scroll and interaction;
- paint and compositing work;
- GPU and memory pressure where tooling permits;
- main-thread work caused by visual JavaScript;
- layout shift and responsive stability;
- bundle and CSS growth;
- behavior on a representative mid-range mobile device, not only a desktop workstation;
- energy impact of continuous or long-lived animation.

Use browser tooling and production builds. A visually stronger treatment is not acceptable when it
creates a measurable regression without user value.

## Degradation and support

- Detect capability through CSS feature support, not browser-name checks.
- When backdrop filtering is unavailable, use the approved Solid semantic material.
- When performance is constrained by viewport, density, or platform, simplify at the material level
  rather than removing random effects per component.
- Server rendering and hydration must produce deterministic structure; material enhancement remains
  CSS-driven.
- A fallback must not flash through a high-transparency intermediate state during hydration.

## Motion and scrolling

- Do not bind decorative filters to scroll position.
- Avoid parallax and continuous scale on content-bearing surfaces.
- Pause or remove non-essential animation when the surface is not visible.
- Reduced-motion behavior must also reduce rendering work.
- Hover effects must not trigger large repaint regions.

## Acceptance gate

A Liquid Glass implementation is ready only when:

- its effect region and simultaneous instance count are documented;
- a production build has been measured against the prior implementation;
- scroll and interaction remain stable on target hardware;
- its Solid fallback has been verified;
- unsupported and reduced-preference paths do not add unnecessary work;
- no speculative filter, overlay, animation, or `will-change` remains.

If the benefit cannot be observed without exaggerating the effect, the implementation should stay
Solid.
