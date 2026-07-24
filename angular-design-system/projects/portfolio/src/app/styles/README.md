# Application styles

This directory contains the smallest application-level layout contract. Global `styles.scss`
loads the public Design System themes and opt-in foundations, then this app-root sizing partial.
Page and shell presentation remains encapsulated with its owning component; no `--gh-*` token is
redeclared here.

The same partial owns the global View Transition pseudo-elements because they cannot be scoped to a
component. Locale navigation receives a short token-based crossfade, while regular route changes
remain immediate. Browsers without View Transition support fall back to normal navigation, and
`prefers-reduced-motion: reduce` disables the effect.
