# Shared

Application-private reusable UI belongs here when it contains Portfolio-specific behavior.
`LanguageSwitcherComponent` understands localized application routes and
`ThemeSwitcherComponent` binds localized labels to the public `GhThemeService`; neither is a generic
Design System primitive.

Reusable brand UI remains in `gh-design-system`. This directory must not become a duplicate
component library.
