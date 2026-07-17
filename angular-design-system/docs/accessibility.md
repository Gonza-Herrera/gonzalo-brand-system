# Accessibility

Accessibility is part of each public API and review workflow. The system uses native semantics, tokenized focus and contrast, unit tests, Storybook interaction tests, and the official accessibility addon. These tools reduce regressions; they do not replace testing with users or constitute a formal WCAG audit.

## Native behavior first

- Use `gh-button` for actions and links for navigation.
- Preserve the Button's native `type`, disabled, form, focus, and keyboard behavior.
- Navigation, Cards, Patterns, and projected actions keep native anchors rather than simulating links with generic elements.
- Use semantic headings, landmarks, lists, sections, and separators before adding ARIA.

ARIA should clarify behavior that HTML alone cannot express. It should not compensate for an incorrect element.

## Focus

Interactive components expose visible token-driven focus styles in light and dark themes. Consumer styles must not remove outlines without providing an equally visible replacement. Modal or composite widgets introduced in future work must document focus entry, movement, escape, and restoration.

## Icon-only controls

Visual icons do not provide an accessible name. Supply `aria-label` when a Button or projected control has no visible text:

```html
<gh-button variant="ghost" aria-label="Add project">
  <span aria-hidden="true">＋</span>
</gh-button>
```

Decorative icons should be hidden from assistive technology. Do not repeat visible labels in an icon's accessible text.

## Disabled and loading

Button uses the native `disabled` state when disabled or loading. Loading also exposes `aria-busy="true"`; provide an accessible label when the visible content alone does not communicate the pending state. Disabled controls must not emit consumer actions.

Selectable and removable Tags also use native disabled controls. Consumers own asynchronous state and status announcements outside the component when an operation completes or fails.

## Images

- Informative images require concise alternative text describing their purpose in context.
- Decorative images use `alt=""`.
- Do not put essential information only inside an image.
- Avoid repeating nearby titles verbatim unless the image itself is a link and needs that name.

## Themes and contrast

Components use semantic text, surface, border, action, status, and focus tokens. Review every visual change in light and dark. Subtle borders or decorative accents must not be the only way to communicate state. The Storybook accessibility panel checks many contrast cases, but manual inspection remains necessary for gradients, images, focus, hover, and custom consumer content.

## Keyboard navigation

All native controls must remain reachable and operable with the keyboard. Navigation's mobile menu supports Enter/Space through its real button, updates `aria-expanded`, closes after link selection, and closes on Escape while restoring focus. Consumers must maintain a logical tab order and must not use positive `tabindex` values.

## Reduced motion

The library's motion contract is intentionally small. New animation must use the shared duration/easing tokens and provide a reduced-motion path with `prefers-reduced-motion`. Motion must not be required to understand state or completion.

## Storybook checks

The accessibility addon runs without globally disabled rules. Interaction tests cover high-value behaviors such as enabled/disabled Button events, Tag selection/removal, mobile Navigation state, and safe external links.

Run Storybook and its test runner in separate terminals:

```bash
npm run storybook
npm run test-storybook
```

Fix failures in the component or story markup. If a legitimate exception exists, document it next to that individual story and scope any rule configuration to that story only.

## Consumer responsibility

The library cannot determine page-level heading order, landmark names, link purpose, image meaning, error announcements, content language, focus flow, or the contrast of arbitrary projected content. Application teams remain responsible for these concerns and for manual keyboard, zoom, screen-reader, and responsive review.
