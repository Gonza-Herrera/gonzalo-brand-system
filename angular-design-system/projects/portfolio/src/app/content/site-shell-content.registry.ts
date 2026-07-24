import { EN_SITE_SHELL_CONTENT } from './en/site-shell.content';
import { ES_SITE_SHELL_CONTENT } from './es/site-shell.content';
import type { PortfolioLocale } from './models/portfolio-locale.type';
import type { PortfolioSiteShellContent } from './models/site-content.model';

export const PORTFOLIO_SITE_SHELL_CONTENT = {
  en: EN_SITE_SHELL_CONTENT,
  es: ES_SITE_SHELL_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioSiteShellContent>>;

export function getPortfolioSiteShellContent(locale: PortfolioLocale): PortfolioSiteShellContent {
  return PORTFOLIO_SITE_SHELL_CONTENT[locale];
}
