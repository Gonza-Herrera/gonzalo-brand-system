# Navigation Motion

## Philosophy

Navigation motion communicates intent, continuity, hierarchy and immediate response. It is quiet
and physical without becoming elastic or decorative. PR 28.2 changes only visual state continuity;
component architecture, layout, spacing, material recipes, routing, public APIs and SSR behavior
remain unchanged.

The Header is the stable reference plane and does not animate. Motion belongs to the interactive
items inside it. No navigation state animates blur, `backdrop-filter`, ambient gradients or layout.

## Timings

Navigation owns a component-specific timing scale:

| Token                               | Value  | Use                                                        |
| ----------------------------------- | ------ | ---------------------------------------------------------- |
| `navigation.motion.duration.fast`   | 120 ms | focus-adjacent color, foreground, opacity and press return |
| `navigation.motion.duration.normal` | 180 ms | hover, active background, border and shadow                |
| `navigation.motion.duration.slow`   | 220 ms | selector thumb and active-indicator continuity             |

No Navigation transition exceeds 300 ms. Tests validate the contract and supported properties,
not exact elapsed time in a browser.

## Easing

`navigation.motion.easing.standard` uses `cubic-bezier(0.22, 0.61, 0.36, 1)` for ordinary material
interpolation. `navigation.motion.easing.emphasized` settles the selector thumb, indicator and
pressed return without overshoot. `navigation.motion.easing.exit` is reserved for direct exits such
as the existing responsive Showcase navigation.

Navigation does not use `ease`, `ease-in-out`, `linear`, spring physics, bounce or elastic curves.

## Hover

Navigation Items interpolate foreground, background color, boundary, opacity and a small shadow.
The rest and hover shadows share the same offsets and blur geometry, so interpolation changes only
their visible intensity. The result should read as received light, not elevation, glow or movement.

Hover does not translate an item, scale it, animate a filter or alter the Header.

## Pressed

Navigation Items, Language Selector choices and Theme Selector controls use
`navigation.motion.scale.pressed`, fixed at `0.985`. This restrained compression is immediate and
does not affect layout. Pressed color and shadow remain token-driven and return through the fast,
emphasized curve.

## Focus

The outline remains the primary focus indicator. It appears immediately, uses the existing
Navigation focus tokens and is never removed or replaced by a shadow. Background, boundary and
foreground may settle around that outline through the fast motion token so focus arrival feels
coherent without delaying accessibility feedback.

## Active

The consumer continues to own `aria-current="page"`. Active background, border, foreground and
shadow interpolate through CSS. The existing structural indicator is present on every item as an
inert pseudo-element and gains opacity and scale only for the active item. Mobile uses the vertical
axis and desktop uses the horizontal axis. There is no JavaScript, DOM measurement or shared
sliding-indicator system.

## Selectors

The Language Selector uses a CSS-only floating thumb when `:has()` is supported. The thumb reuses
the selected material, travels between two equal token-sized choices and interpolates opacity,
background, boundary and shadow. Unsupported browsers retain the selected material on the active
link, so locale behavior and accessibility do not depend on the enhancement.

The Theme Selector retains its native Portfolio `<select>` and the Showcase retains native buttons.
Hover, pressed, focus and selected states use the same Navigation motion scale. Theme persistence,
Light/Dark/System resolution and native form behavior are unchanged.

## Reduced motion

Under `prefers-reduced-motion: reduce`, selector-thumb travel and pressed scale are removed. The
active indicator no longer grows, and state changes are limited to short semantic color and boundary
interpolation. Focus outlines, `aria-current`, selected material and readable foregrounds remain.

## Forced colors

Forced-colors mode removes decorative motion, opacity changes, transforms, Glass shadows and the
floating thumb. Canvas, CanvasText, ButtonBorder, Highlight and platform focus colors preserve only
functional state differences.

## Performance

The implementation is CSS-only. It adds no animation JavaScript, listener, timer,
`requestAnimationFrame`, `IntersectionObserver`, `ResizeObserver` or pointer tracking. Transition
lists are explicit and limited to `color`, `background-color`, `opacity`, `border-color`,
`box-shadow` and `transform`. `transition: all`, animated filters and animated blur are prohibited.

## Good practices

- Keep the Header stable and apply motion only to interactive descendants.
- Reuse Navigation motion tokens; never hardcode component durations or easing in CSS.
- Preserve real links, native controls, `aria-current` and visible outlines.
- Keep pressed scale between `0.985` and `0.99` and avoid translation.
- Keep shadow geometry stable across interpolated states.
- Provide non-moving selected and focus states for reduced motion and forced colors.
- Prefer a simple CSS interpolation over measurement, runtime animation or a shared indicator engine.
- Do not add parallax, progressive blur, scroll animation, pointer glow, magnetic response or spring
  physics to Navigation.
