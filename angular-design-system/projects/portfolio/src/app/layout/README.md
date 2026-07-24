# Layout

`PortfolioShellComponent` owns the page-height frame, localized skip link, public
`gh-navigation`, `main#main-content` and public `gh-footer`. It projects app-private language and
theme controls into the Design System pattern and derives exact active state from the localized URL.

Child pages and localized Not Found render inside the shell. After client-side route navigation,
focus moves to main content without disrupting initial SSR rendering or fragment navigation.
