# Navigation Polish and QA

## QA checklist

PR 28.3 is a correction-only pass over the Navigation architecture delivered by PR 28, the
material direction from PR 28.1, the floating integration from PR 28.15 and the CSS-only motion
contract from PR 28.2. It adds no component, route, public input, output or dependency.

The initial audit found five actionable inconsistencies:

- Showcase placed sticky positioning on the visual Header inside a same-height component host, so
  the Header left the viewport while the Sidebar became sticky.
- Showcase's declared Header offset was 80 px while the rendered Header ended at 90 px.
- At 320 px, Showcase controls extended 87 px beyond the capsule and flex-shrunk the GH mark from
  48 px to about 30 px.
- Showcase Sidebar labels all used the active semibold weight, and its duplicated Navigation motion
  demo repeated controls already present in the live Navigation example.
- Changing the Contact route from English to Spanish recreated all three localized privacy list
  items and emitted Angular warning `NG0956` because the translated strings were used as identity
  keys.

The correction keeps sticky ownership on the Showcase Header host, aligns its total offset to the
Navigation height plus floating inset, uses the Navigation brand and item sizing aliases, reserves
semibold for the active Sidebar item and consolidates the Showcase and Storybook demonstrations.
The Contact privacy list now uses its stable order as its key, preserving the three DOM nodes while
their localized text changes.

## Visual checklist

The Header retains the approved floating capsule, radius, material layers, border, highlight, blur
and shadow. Logo, selectors and menu trigger now share one optical center. At narrow widths the
brand link keeps its accessible name while its visible treatment contracts to the GH mark; compact
theme choices retain their original labels and the menu button remains a separate 48 px target.

Navigation Items continue to use one typography family and the existing medium-to-semibold state
hierarchy. Hover, focus, pressed and active recipes are unchanged. Language and Theme selectors
retain equal 58 px outer height in Portfolio and consume the same component-token material.

## Browser review

Interactive inspection is performed with the Codex in-app Chromium browser. This validates the
Chromium implementation of sticky positioning, backdrop filtering, CSS `:has()`, native select
rendering, keyboard activation and responsive layout. Edge, Safari and Firefox are not available in this
workspace session and are not claimed as manually verified. Their expected differences remain
native select chrome, font rasterization and backdrop-filter composition; no browser-specific hack
is introduced.

## Responsive review

The QA matrix uses the Storybook viewport catalogue and the real Portfolio and Showcase:

| Width   | Review target                                                            |
| ------- | ------------------------------------------------------------------------ |
| 320 px  | One-row Showcase chrome, contained Portfolio disclosure and no overflow. |
| 375 px  | Mobile controls, panel material and touch targets.                       |
| 390 px  | Common mobile portrait width and selector containment.                   |
| 768 px  | Long English/Spanish labels inside the opened mobile panel.              |
| 1024 px | Exact desktop Navigation breakpoint with compact Portfolio spacing.      |
| 1280 px | Desktop Portfolio navigation, selectors and active state.                |
| 1440 px | Showcase Sidebar/Header integration and wide Portfolio canvas.           |
| 1920 px | Bounded wide Header and continuous ambient background.                   |

Native 200% and 400% browser zoom remain a separate manual browser setting from viewport
simulation. The 320 px inspection covers the narrow effective layout produced by high zoom on a
1280 px desktop, but is not represented as a complete native zoom certification.

## Accessibility review

The public component retains native anchors, labelled navigation, `aria-current`, `aria-expanded`,
`aria-controls`, Escape dismissal and focus restoration. Touch targets remain at least the existing
48 px Navigation size in the Portfolio; Showcase theme choices now gain the same minimum target
height. Skip Links use `:focus-visible` consistently. Reduced-motion removes travel and pressed
compression, while forced colors removes decorative Glass and preserves system focus and active
state. No formal universal WCAG claim is made by this review.

## Performance review

The correction adds no JavaScript, listener, observer, timer, dependency, filter or shadow. Sticky
behavior is fixed with CSS ownership rather than scroll state. The Header filter remains stable;
items and selectors remain unfiltered; `backdrop-filter` is never animated. Redundant Storybook
aliases, one duplicated Showcase demo and its unused layout rule are removed. The localized Contact
privacy details retain their DOM identity across language changes, eliminating the observed
`NG0956` recreation warning without adding state or scripting.

## Remaining observations

Portfolio's native Theme select intentionally retains browser chrome. Backdrop-filter appearance
can vary by browser and GPU. Navigation component tokens that are not referenced by repository
consumers are retained when they belong to the existing public compatibility contract; PR 28.3 does
not remove public CSS custom properties under the label of cleanup.

Manual Safari, Firefox and Edge comparison, physical-device safe-area inspection and native 200% /
400% zoom remain external QA items. Build budgets, package deprecations and lint availability are
reported from the final validation commands rather than hidden here.

## Final approval notes

Navigation is ready for final approval when token synchronization, focused Navigation tests,
Design System, Showcase, Portfolio, Storybook and production prerender validations complete without
new failures. The next Design System block should be PR 29 — Feedback Components; it must establish
status and announcement semantics without reusing Navigation state or competing with Header
z-index.
