# Content

Portfolio copy is typed and kept separate from page templates. English and Spanish implement the
same `PortfolioSiteContent` structure, including identity, shell, navigation, footer, placeholder
pages, Not Found and metadata. Stable IDs and paths remain locale-independent.

`portfolio-content.registry.ts` selects content by validated route locale. Compile-time contracts and
parity tests prevent either locale from drifting. There is no HTTP-loaded JSON, external translation
library, CMS, Markdown parser or backend.
