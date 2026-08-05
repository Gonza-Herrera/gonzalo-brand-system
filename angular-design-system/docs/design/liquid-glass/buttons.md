# Liquid Glass Button and Icon Button

## 1. Objective

PR 25 migrates the existing `GhButtonComponent` to the approved Liquid Glass language and adds the
missing explicit `GhIconButtonComponent` API. The controls remain clear, native and intention-led;
consumers never choose blur, opacity, highlight or elevation.

## 2. Architecture

```text
Button / Icon Button public inputs
              ↓
button.* / iconButton.* component tokens
              ↓
action.*, surface.*, focus and motion semantic roles
              ↓
approved primitive scales
```

Both components compile the same private SCSS material mixin. It maps component properties into
private `--_gh-control-*` selectors and is not exported. `GhSurfaceComponent` is not rendered inside
either control, so compact controls gain no wrapper or neutral-region semantics.

## 3. Compatibility

Button retains selector `gh-button`, the standalone import, `variant`, `size`, `type`, `disabled`,
`loading`, `fullWidth`, `aria-label`, start/end icon slots, defaults and native form behavior.
Primary, Secondary, Ghost and Danger keep their names. Tertiary is additive.

The pre-existing component renders one internal native `<button>` and did not support `<a>`,
`href`, `routerLink`, pressed state or toggle behavior. This PR does not pretend otherwise and does
not convert navigation to click handlers. Existing icon-only Button markup remains functional;
new compact icon-only actions should use Icon Button.

## 4. Relationship with Surface

Button does not wrap `gh-surface`. Component tokens alias the same semantic material vocabulary,
and the private mixin reuses the proven fallback, highlight, filter and state pattern without adding
DOM. This is the technically appropriate reuse boundary for a compact native control.

## 5. Component tokens

`button.*` owns three sizes, geometry, typography, icon spacing, focus, motion, active offset,
spinner, disabled and complete material/state contracts. `iconButton.*` owns compact geometry and
aliases the matching Button material/state roles. Generated CSS uses `--gh-button-*` and
`--gh-icon-button-*`; component styles do not consume primitive variables directly.

Component aliases are authored once because their references are theme-invariant. Light and dark
generated maps contain identical keys and types, while their referenced action and Surface roles
provide the theme-specific values. System remains CSS resolution, not a third token scale.

## 6. Variants and hierarchy

```text
Primary → Secondary → Tertiary → Ghost
                         Danger is selected by destructive intent, not visual rank.
```

Use one Primary per bounded decision region. Secondary supports the primary path. Tertiary provides
a restrained boundary, Ghost is lowest emphasis, and Danger is reserved for destructive actions.
Liquid Glass is deliberately not a variant name.

## 7. Primary

Primary remains a contained brand material with high foreground contrast, a refined boundary,
one upper highlight, restrained inner depth and small elevation. Hover changes semantic background
and shadow; active reduces elevation and moves by the component offset. It never needs the backdrop
to remain legible and never applies `backdrop-filter`.

## 8. Secondary

Secondary is the only Button or Icon Button variant that uses the approved Glass material. CSS
paints `fallbackBackground` first, then an `@supports` query applies the composed semantic
backdrop-filter and translucent background. Hover and active remain clear semantic colors. The
filter is never transitioned or animated.

## 9. Tertiary

Tertiary is an additive Button-only variant. It has a transparent base, a subtle semantic boundary,
strong foreground and perceptible hover/active fills. It does not apply backdrop blur.

## 10. Ghost

Ghost has a transparent rest surface and boundary, with semantic hover and active fills. It is for
low-priority actions on an existing surface, not critical or primary actions. It does not apply
backdrop blur.

## 11. Danger

Danger remains solid and maps exclusively to destructive action roles. Its foreground, boundary,
hover and active values are explicit; the upper highlight stays restrained and there is no red
glow. Copy and context must still communicate the consequence because color alone is insufficient.

## 12. Sizes

Button preserves `sm`, `md` and `lg` with the existing 40, 48 and 56 CSS-pixel-equivalent target
geometry derived from spacing tokens. Typography, padding, gap and icon dimensions now resolve
through component aliases. Icon Button uses the same target dimensions as square rounded controls.
No responsive media query silently changes size or width.

## 13. Icons

Button keeps the `ghButtonIconStart` and `ghButtonIconEnd` projection selectors. Their containers
inherit component icon size and cannot change control height. Decorative SVGs should use
`aria-hidden="true"`; visible text supplies the action name.

## 14. Loading and spinner

Loading sets native `disabled` and `aria-busy="true"`, preserves the projected content in the
accessibility tree and keeps its layout width while the centered spinner is visible. Icon Button
preserves its fixed target and accessible name. Spinner size, track, radius, duration and easing are
component tokens. Reduced motion stops rotation while retaining the loading indicator.

## 15. Disabled

Disabled uses the native `disabled` attribute, blocks click and form submission, suppresses
hover/active selectors and maps background, foreground, border and shadow independently. The whole
subtree is not faded through component opacity.

## 16. Focus and keyboard

Both controls rely on native Button Enter and Space behavior; no key handlers, roles or tabindex
values are added. `:focus-visible` uses component aliases to the shared ring color, width and offset.
Overflow remains visible so the outline is not clipped.

## 17. Icon Button and accessible name

Icon Button defaults to Secondary and supports Primary, Secondary, Ghost and Danger plus all three
sizes. Every instance must receive an action-oriented `aria-label` or `aria-labelledby`. The
component does not derive a label from the projected icon and a tooltip is not a substitute. Its
projected icon wrapper is decorative; the consumer-owned name reaches the internal native button.

## 18. Hover, active and persistent pressed state

Hover changes only background, border and shadow. Active also applies the one-token downward offset
and lower shadow without changing layout dimensions. Neither component implements persistent
pressed/selected state or `aria-pressed`; that behavior did not exist before this migration.

## 19. DOM and pseudo-element

Each host contains one native `<button>`. Button retains its content, label, icon slots and
conditional spinner. Icon Button has one projected-icon span and conditional spinner. The shared
single `::before` layer renders the tokenized upper highlight and inner shadow with
`pointer-events: none`; no Surface wrapper, glow layer or ripple is introduced.

## 20. Themes and solid fallback

Light and dark publish the same component keys. Explicit themes use `data-theme`; system uses the
existing media-query resolution. Every variant paints a deterministic fallback in SSR markup.
Secondary enhances only when backdrop filters are supported; all other variants are already solid
or intentionally unfiltered.

## 21. Reduced motion and forced colors

`prefers-reduced-motion: reduce` removes transitions, the active translation and spinner rotation
without removing color, focus or loading feedback. In `forced-colors: active`, system Button colors
replace material paint, the decorative highlight disappears, filters resolve to the no-filter
component token, disabled uses `GrayText`, and focus uses `Highlight`. `forced-color-adjust: none`
is not used.

## 22. High contrast and responsive behavior

Strong foreground and focus roles remain theme-aware over base, ambient and Surface contexts.
Forced colors supplies a separate structural fallback. Showcase examples include English and
Spanish long labels, full width, compact icons, Solid, Glass and Glass Elevated contexts. Manual
contrast, zoom and platform checks remain release responsibilities; the token contract alone is not
a claim of universal WCAG conformance.

## 23. Performance

The implementation adds no dependency, service, listener, observable, browser detection, runtime
style generation, ripple or JavaScript animation. Primary, Tertiary, Ghost and Danger never create
a filtered layer. Only Secondary may create one bounded filter, so dense toolbars should prefer
Ghost Icon Buttons unless Secondary containment is necessary. No filter or blur is animated.

## 24. SSR and hydration

Inputs compute deterministic classes and attributes only. Components do not access `window`,
`document`, media queries or random IDs. Initial loading state renders identically on server and
client. A focused `renderApplication` test verifies native server markup for both controls; the
Portfolio prerender remains the integration gate.

## 25. Do

- Use one Primary for the main decision.
- Use Secondary for a contained alternative and Tertiary/Ghost for lower emphasis.
- Use Danger only for destructive actions with clear copy.
- Use loading during requests and preserve the action name.
- Provide every Icon Button with `aria-label` or `aria-labelledby`.
- Keep decorative icons `aria-hidden`.

## 26. Don't

- Don't expose glass, blur, opacity, elevation or highlight as inputs.
- Don't place multiple Primary actions together.
- Don't use Ghost for critical decisions or Danger for decoration.
- Don't animate backdrop filters or add ripple/glow effects.
- Don't use Icon Button without an accessible name or rely on Tooltip for one.
- Don't replace native links with Button click handlers.

## 27. Migration notes

```text
Before: GhButtonVariant = primary | secondary | ghost | danger
After:  GhButtonVariant = primary | secondary | tertiary | ghost | danger
```

All former values and defaults remain valid. No consumer change is required for existing Button
usage. New icon-only actions may migrate from `<gh-button aria-label="…">` to
`<gh-icon-button aria-label="…">`; the former remains supported and is not deprecated in PR 25.
No deprecations are introduced.

## 28. Testing and documentation surfaces

Unit tests cover API defaults, variants, sizes, projection, form type, loading, disabled, full width,
data attributes, accessible names and native semantics. Static tests validate token parity, fallback,
filter policy, forced colors, reduced motion, public exports and absence of local material recipes.
Storybook carries isolated controls and accessibility-aware interaction stories; Showcase provides
full contextual composition.

## 29. Future extensibility

PR 26 should migrate Card against the Surface taxonomy without importing Button's private mixin.
PR 27 form controls may reuse focus/motion roles and Surface material vocabulary, but must define
their own component tokens for fields, validation and readonly states. Toggle Button, Button Group,
Split Button, Tooltip and anchor-button APIs remain separate future decisions.
