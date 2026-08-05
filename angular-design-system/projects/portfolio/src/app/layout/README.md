# Layout

`PortfolioShellComponent` owns the page-height frame, localized skip link, public
`gh-navigation`, `main#main-content` and public `gh-footer`. It projects app-private language and
theme controls into the Design System pattern and derives exact active state from the localized URL.

Child pages and localized Not Found render inside the shell. After client-side route navigation,
focus moves to main content without disrupting initial SSR rendering or fragment navigation.

PR 28 keeps this structure and behavior while the public Header and mobile panel inherit the
Navigation Liquid Glass contract. The localized language selector and Skip Link consume the same
component tokens; theme selection remains the native Form Select from PR 27.
