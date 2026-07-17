export const PORTFOLIO_LOCALES = ['en', 'es'] as const;

export type PortfolioLocale = (typeof PORTFOLIO_LOCALES)[number];

export function isPortfolioLocale(value: unknown): value is PortfolioLocale {
  return typeof value === 'string' && PORTFOLIO_LOCALES.some((locale) => locale === value);
}
