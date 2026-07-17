# Layout

`PortfolioShellComponent` owns the page-height frame, skip link and semantic header, main and
footer landmarks. It renders child routes but deliberately contains no final navigation, footer
content, language selector or theme controls; those belong to PR 11.

The Not Found route stays inside the shell so every public route receives the same accessibility
and layout foundation.
