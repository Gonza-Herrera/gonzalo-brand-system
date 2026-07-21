# Content Detail

`ContentDetailPage` resolves a stable, untranslated slug from the active localized Content Hub
registry. Only published internal items with a typed `detail` are rendered. External items without
detail, planned content and unknown slugs use the localized Content Not Found state; SSR never
redirects a manual detail request to an external website.

The template renders discriminated text, list, callout, code and comparison sections without
`innerHTML`, Markdown parsing or dynamic components. Code remains escaped text inside
`pre > code`; wide code and comparison tables scroll inside their own containers. Related content
uses the shared selector and public Article Card.

The URL remains the source of truth for locale and slug, so the global Language Switcher preserves
the same item between `/en/content/:slug` and `/es/content/:slug`.
