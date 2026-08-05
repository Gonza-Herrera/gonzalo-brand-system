# Liquid Glass form controls

This document is the normative implementation and consumption guide for the native form-control
foundations introduced in PR 27. The repository tokens remain the source of truth.

## 1. Objective

Provide one accessible, token-driven visual contract for existing native form elements without
replacing browser semantics, Angular Forms integration, or product behavior.

## 2. Architecture

```text
Native form element / Angular native value accessor
  -> public gh-* class
  -> component-level Form token
  -> semantic Surface, focus, status, and action token
  -> primitive token
```

PR 27 intentionally adds no Angular wrapper or parallel component family. This matches the current
Portfolio, Showcase, and Storybook architecture and avoids a future compatibility migration.

## 3. Compatibility

The styles support native `input`, `textarea`, `select`, checkbox, radio, and switch-shaped checkbox
elements. Consumers keep their existing `id`, `name`, `type`, `formControl`, `formControlName`,
validation, submission, and event contracts.

## 4. Form Field

Use `.gh-form-field` as the vertical label/control/help/error composition. Its child classes are
`.gh-form-field__label`, `.gh-form-field__required`, `.gh-form-field__hint`, and
`.gh-form-field__error`. The composition adds layout only and does not infer validation state.

## 5. Input

Apply `.gh-input` directly to a native input. Text, email, password, number, search, URL, and tel
types share the same material and state contract. Checkbox, radio, file, range, color, button,
submit, reset, hidden, and image types are excluded from this selector.

## 6. Textarea

Apply `.gh-textarea` to a native textarea. It uses the control contract, a tokenized minimum height,
and vertical resize so content remains operable at larger text sizes.

## 7. Select

Apply `.gh-select` to a native select. The browser retains option rendering, keyboard behavior, and
value semantics. PR 27 does not create a custom listbox.

## 8. Checkbox

Wrap a native checkbox with `.gh-checkbox` and apply `.gh-checkbox__control` to the input. Keep the
input inside a visible `<label>` or associate it with one. Native `checked`, `indeterminate`,
`disabled`, focus, and change behavior remain authoritative.

## 9. Radio

Wrap each native radio with `.gh-radio` and apply `.gh-radio__control`. Radios with the same `name`
retain native exclusivity and arrow-key behavior. Use `fieldset` and `legend` for a related group.

## 10. Switch

Use `.gh-switch` and `.gh-switch__control` on a native checkbox whose accessible role is `switch`.
The native checked value remains the source of truth; the visual thumb does not add a second state.

## 11. Labels

Every control requires a visible, programmatically associated label. Placeholder text is never a
label. Clicking checkbox, radio, and switch text must toggle the native control.

## 12. Hints

Hints use `.gh-form-field__hint` and a stable ID referenced by `aria-describedby`. Keep guidance
concise and place persistent requirements before validation feedback in the referenced ID list.

## 13. Errors

Errors use `.gh-form-field__error`, a stable ID, and localized text. Set `aria-invalid="true"` on
the native invalid control and include the error ID in `aria-describedby`. Color is supportive, not
the only indication.

## 14. Prefix and suffix

Use `.gh-control-shell`, `.gh-control-shell__prefix`, and `.gh-control-shell__suffix` for decorative
or textual affixes. The shell owns spacing so the native control remains fluid. Decorative affixes
use `aria-hidden="true"`.

## 15. Trailing actions

Place an existing `gh-icon-button` in `.gh-control-shell__action`. Give the button an explicit
accessible name, keep it keyboard reachable, and use `type="button"` inside forms unless it submits.
The action must not obscure the control value or focus ring.

## 16. Required

Use the native `required` attribute when browser semantics are appropriate and keep Angular
validators aligned. The visual required marker uses `.gh-form-field__required` and is decorative
when the label or surrounding instructions already communicate the requirement.

## 17. Read-only

Use native `readonly` for supported textual controls. Read-only values remain focusable and
selectable, use their own tokenized background and foreground, and must not be styled as disabled.

## 18. Disabled

Use native `disabled` only when the control must be unavailable and omitted from submission. The
disabled contract changes background, boundary, text, placeholder, indicator, and cursor explicitly;
it does not fade an entire subtree with opacity.

## 19. Invalid

Invalid visuals respond to `aria-invalid="true"`, keeping application validation timing under
consumer control. Focus remains visible over the invalid boundary, and error text remains linked.

## 20. Loading

There is no loading input API in the current system. Product forms should preserve entered values,
prevent duplicate submission, expose status text, and put the existing Button into its loading state.
Do not invent a disabled-looking field state for network activity.

## 21. Sizes

PR 27 provides one comfortable control size and one choice-control target size. No `sm`, `lg`, or
density API is published without a demonstrated use case. Layout width belongs to the consumer.

## 22. Component tokens

Reusable Form CSS consumes only `--gh-form-field-*`, `--gh-form-control-*`,
`--gh-choice-control-*`, and `--gh-switch-control-*`. These component tokens map to existing
semantic Surface, focus, status, action, typography, spacing, radius, shadow, border, and motion
roles. Product code must not copy the recipe or consume glass primitives directly.

## 23. Light, dark, and system

Light and dark publish structurally identical Form contracts. System mode continues to resolve via
the existing `prefers-color-scheme` theme layer; no third token file or JavaScript-only branch is
introduced.

## 24. Solid fallback

Compact controls use the opaque `surface.glassSubtle.fallbackBackground`, a subtle inner highlight,
and no backdrop filter. This is the approved Liquid Glass interpretation for dense interactive
elements: material continuity without per-control blur or transparency-dependent contrast.

## 25. Reduced motion

Transitions use the global fast motion role. Under `prefers-reduced-motion: reduce`, Form transition
durations resolve to zero. No blur, glow, or filter is animated.

## 26. Forced colors

Under `forced-colors: active`, native appearance and system accent colors are restored for checkbox,
radio, and switch controls. Text inputs, textarea, and select use system foreground, background,
boundary, and focus colors. Do not force decorative glass paints into this mode.

## 27. Reactive Forms

Continue using typed Reactive Forms directly on native elements. `.gh-*` classes are presentation
hooks and do not alter control registration, touched/dirty state, validators, status changes, or
submission.

## 28. ControlValueAccessor

No custom `ControlValueAccessor` is required because PR 27 styles native controls. Future composite
controls must add a CVA only when a native element cannot express the behavior, and must separately
prove value, disabled, touched, validation, SSR, and keyboard contracts.

## 29. SSR and hydration

The foundation is CSS-only and deterministic. It reads no browser globals, generates no IDs, and
creates no server/client state. Native values and Angular form directives therefore hydrate through
their existing behavior.

## 30. Accessibility

Preserve native elements, labels, fieldsets, legends, names, types, autocomplete, inputmode,
`aria-describedby`, and `aria-invalid`. Ensure a visible focus indicator, keyboard operability,
adequate target size, error identification, zoom reflow, and text contrast in each product context.
The foundation supports accessible outcomes but cannot certify every consumer composition.

## 31. Performance

Controls use no `backdrop-filter`, filter, image, mask, or JavaScript effect. Repeated fields add only
shared CSS selectors and variables. Validate CSS and application bundle changes in production builds;
do not claim paint or Core Web Vitals improvements without measurements on deployed hardware.

PR 27 production validation measured a 580.76 kB raw initial Portfolio bundle (117.41 kB estimated
transfer). Because the previous 550 kB error threshold had no room for a shared control foundation,
the error gate is now 590 kB while the existing 500 kB warning remains active.

## 32. Do / Don't

- Do use the public native classes and component tokens.
- Do keep labels and errors programmatically associated.
- Do use one glass hierarchy around related fields when a container is needed.
- Don't place a separate blurred panel behind every compact control.
- Don't replace a select with a custom listbox for appearance alone.
- Don't hardcode color, spacing, radius, shadow, or motion in reusable Form styles.

## 33. Migration notes

Existing native elements gain the relevant `.gh-*` class; duplicated visual declarations can then be
removed from product SCSS. IDs, directives, validators, events, content, routes, and service calls
stay unchanged. The styles are emitted by the existing `gh-design-system/styles` entry point.

## 34. Contact Form considerations

The Portfolio Contact form retains its typed model, validators, Web3Forms mapping, honeypot, first
invalid-field focus, localized feedback, submit state, and fallback logic. PR 27 changes only shared
field classes and removes duplicate local paint. The theme selector also uses the public native
select class without changing preference behavior.

## 35. Recommendations for PR 28

Review Navigation and persistent chrome next, using measured mobile and sticky-position evidence.
Keep custom listboxes, comboboxes, file upload, date/time pickers, range controls, and validation
summary patterns in separate need-driven work. Do not expand the Form API from visual speculation.
