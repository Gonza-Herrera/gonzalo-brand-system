# Liquid Glass accessibility

Liquid Glass is a visual enhancement. Semantic HTML, content, keyboard behavior, focus, and state
communication remain the accessibility contract. The system targets WCAG AA outcomes, but no
material may claim conformance without testing its complete rendered context.

## Contrast

- Measure text and non-text contrast after transparency, backdrop, theme, and state are composited.
- Test the lightest, darkest, and most chromatic approved backdrops—not only a neutral screenshot.
- Text, icons, and controls must remain opaque enough to preserve their semantic roles.
- A border or shadow may support separation but cannot rescue unreadable content.
- Status and selection require structure, text, iconography, or another non-color cue.
- When contrast cannot be guaranteed, use a more contained or Solid material.

Automated token checks are not sufficient because backdrop-dependent contrast changes at runtime.

## Focus

- Keep the shared focus-ring contract visible in light and dark themes.
- Focus must sit above reflections, borders, and shadows and must not be clipped by surface overflow.
- Decorative inner highlights must not be mistaken for focus.
- Focus appearance must not wait for a transition.
- Dialogs, popovers, and future composite widgets must define entry, movement, dismissal, and focus
  restoration independently of their material.

## Keyboard and pointer input

- Material containers do not become interactive merely because they appear elevated.
- Preserve native buttons, links, form controls, and their keyboard behavior.
- Do not use hover-only lighting to reveal essential actions.
- Target size, spacing, and tab order remain valid when effects are removed.
- Pointer position must not control a required reflection or reveal state.

## Screen readers and semantics

- Do not expose material names such as "glass" or depth levels through ARIA.
- Use landmarks, headings, lists, dialogs, status regions, and control roles according to behavior.
- Decorative lighting and reflections remain absent from the accessibility tree.
- Reading and interaction order must follow the DOM, not perceived visual depth.
- Announcements for loading, success, and error remain product or component responsibilities.

## High contrast and forced colors

In forced-colors environments:

- allow system colors to replace translucent fills, boundaries, and shadows;
- retain a visible system-color boundary where a surface relationship matters;
- preserve focus indicators and native control appearance;
- remove background images, reflections, and decorative overlays that obscure content;
- do not force authored colors merely to preserve the glass appearance.

A Solid system-color surface is the correct outcome.

## Reduced motion

Follow the [motion rules](motion.md). Removing motion must preserve content, final state, focus, and
task completion. Continuous shimmer, parallax, or cursor-following light is outside the default
language even when reduced motion is not requested.

## Reduced transparency

The web does not provide one universal reduced-transparency contract across all supported
environments. The architecture must nevertheless prepare for it:

- every material defines a Solid semantic fallback;
- product settings may later opt into reduced transparency without component rewrites;
- platform-specific preferences may be adopted when support is stable and testable;
- reduced transparency must not alter information architecture or interaction.

PR 22 should design token aliases so the fallback can be switched at the semantic layer.

## Zoom, reflow, and responsive behavior

- Surface boundaries must expand with content and avoid fixed heights that clip at text zoom.
- Blur and reflection layers must not create horizontal overflow.
- Floating UI must remain reachable and dismissible at narrow widths and high zoom.
- Text wrapping, source order, and touch target spacing take priority over preserving a reflection.
- Mobile fallbacks may use a more Solid material to protect readability and performance.

## Validation matrix for future PRs

Every migrated component must be reviewed with:

- light, dark, and system theme behavior;
- normal, hover, focus, active, selected, disabled, loading, error, and success states as applicable;
- keyboard-only operation;
- zoom and responsive reflow;
- `prefers-reduced-motion`;
- forced colors or a representative high-contrast environment;
- supported, unsupported, and reduced-transparency material paths;
- automated checks plus manual contrast and assistive-technology inspection.

The material fails review if its fallback is less understandable than the default component.
