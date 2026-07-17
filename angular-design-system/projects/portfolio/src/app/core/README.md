# Core

Application-wide configuration and infrastructure belong here when they have a real consumer.
`config/portfolio.config.ts` owns non-translatable identity, URL, locale and storage configuration.
`PortfolioLocaleService`, its small storage abstraction, the locale guard, route helpers and the
localized title strategy own the application-level i18n flow.

The URL locale remains authoritative. Browser-safe theme behavior continues to come directly from
the public `GhThemeService`; Portfolio does not duplicate its storage or system-theme logic. Future
analytics, advanced SEO and platform integrations must remain SSR-safe.
