# Layout

`PortfolioShellComponent` owns the page-height frame, localized skip link, public
`gh-navigation`, `main#main-content` and public `gh-footer`. It projects app-private language and
theme controls into the Design System pattern and derives exact active state from the localized URL.

PR 28.15 makes this shell the owner of one public `gh-ambient-background`. The ambient canvas wraps
Navigation and transparent Main so it begins behind the Header and continues through the leading
Hero and first section. Footer remains outside the ambient region with its own semantic surface.
Header safe-area insets and the Main offset use existing spacing tokens; no viewport measurement or
runtime layout logic is introduced.

Child pages and localized Not Found render inside the shell. After client-side route navigation,
focus moves to main content without disrupting initial SSR rendering or fragment navigation.

PR 28 keeps this structure and behavior while the public Header and mobile panel inherit the
Navigation Liquid Glass contract. The localized language selector and Skip Link consume the same
component tokens; theme selection remains the native Form Select from PR 27.

See [Floating Layout Integration](../../../../../docs/design/liquid-glass/floating-layout.md) for the
measured diagnosis, hierarchy and validation contract.
