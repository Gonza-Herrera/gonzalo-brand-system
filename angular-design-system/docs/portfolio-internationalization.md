# Portfolio internationalization

Portfolio uses locale-prefixed URLs because language is meaningful navigation state. A localized URL
can be shared, refreshed, indexed and rendered by SSR without depending on browser storage or a
client-only language guess.

## Supported locales and URL shape

The implementation supports exactly:

- `en` — English and the default locale.
- `es` — Spanish.

The prefix is always the first path segment. `/en/projects` and `/es/projects` identify the same
page in different languages. There is no implicit, prefix-free localized page.

## Resolution and fallback

The route contract is deterministic:

1. `/` redirects to `/en`.
2. A valid prefix activates that locale.
3. Known unlocalized legacy routes redirect to English, for example `/about` → `/en/about`.
4. An unsupported prefix falls back to English while retaining the rest of the path, for example
   `/fr/about` → `/en/about`.
5. An unknown page below `en` or `es` renders that locale's Not Found page.

The URL has higher priority than the stored preference. The app never turns an explicit `/en/...`
request into `/es/...` because local storage contains `es`.

## Locale activation flow

```text
Localized route
    ↓
portfolioLocaleGuard validates :locale
    ↓
PortfolioLocaleService activates en or es
    ↓
<html lang> and the locale Signal update
    ↓
PORTFOLIO_CONTENT selects typed copy
    ↓
Shell, page and metadata render in the same locale
```

`PortfolioLocaleService` must not hold a different language from the current validated URL. The
service exposes the current locale and selected content as Signals, plus helpers for localized URLs.

## Changing language

The Language Switcher renders native, router-aware EN and ES links. It replaces only the locale
segment, preserving the current page, query string and fragment:

```text
/en/projects?view=grid#featured
    ↓ select ES
/es/projects?view=grid#featured
```

The selected language is marked with `aria-current="page"`. Clicking a language stores the valid
choice under `gh-portfolio-locale` when local storage is available, but the resulting URL remains the
source of truth. Storage failures are ignored safely.

Project slugs are stable route segments and are preserved in the same way:

```text
/en/projects/angular-design-system
    ↓ select ES
/es/projects/angular-design-system
```

EN/ES project-content validation requires slug parity, so a language change cannot intentionally
target a missing localized project.

## Content structure and parity

`PortfolioSiteContent` is the shared readonly contract. English and Spanish each provide a complete
object with the same identity, shell, navigation, footer and page IDs. Stable IDs and paths are never
translated; labels, copy and metadata are.

```text
content/
├── models/
├── en/site-content.ts
├── es/site-content.ts
└── portfolio-content.registry.ts
```

TypeScript's `satisfies` operator catches missing or invalid fields at compile time. Registry tests
also compare page and navigation keys so a translation cannot silently drift from the other locale.

## Adding a future locale

1. Add its code to `PORTFOLIO_LOCALES` and the `PortfolioLocale` type.
2. Create a complete locale content object satisfying `PortfolioSiteContent`.
3. Register it in `PORTFOLIO_CONTENT`.
4. Add the language label and option to the switcher contract and UI.
5. Extend route, metadata, storage, SSR and parity tests.
6. Document the fallback and review every navigation/footer string and page metadata field.

Do not register a locale until its complete content structure and validation are present.

## Document language and metadata

Locale activation sets the Angular `DOCUMENT` root to `lang="en"` or `lang="es"`. The custom title
strategy reads the stable route `pageId` from the deepest active route and applies the matching
localized title and description without duplicating description tags.

The switcher exposes `hreflang` on its direct alternatives, but complete SEO work—canonical URLs,
document-level alternate links, Open Graph, sitemap and structured data—is owned by PR 18.

Project Detail is the one route whose basic metadata is selected by both `pageId` and `slug`. The
central title strategy resolves the active locale's typed project title and short description; an
unknown slug receives localized Project Not Found metadata without adding duplicate description
tags.

## SSR and hydration implications

Server rendering and first client render must select the same locale. For that reason:

- Direct localized URLs resolve solely from the route.
- `/` and unsupported locales fall back to English on both server and client.
- Browser language is not used during initial rendering.
- Stored locale is not applied behind the URL during hydration.
- Storage and DOM access use platform-safe abstractions.

This prevents an English server response from being immediately replaced with Spanish during
hydration. Supporting request-header negotiation later would require an explicit server redirect and
cache strategy; it is not part of the current two-locale implementation.
