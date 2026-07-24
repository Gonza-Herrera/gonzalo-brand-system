import { EN_CONTACT_CONTENT } from './en/contact.content';
import { ES_CONTACT_CONTENT } from './es/contact.content';
import type { PortfolioContactContent } from './models/contact-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

export const PORTFOLIO_CONTACT_CONTENT = {
  en: EN_CONTACT_CONTENT,
  es: ES_CONTACT_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioContactContent>>;

export function getPortfolioContactContent(locale: PortfolioLocale): PortfolioContactContent {
  return PORTFOLIO_CONTACT_CONTENT[locale];
}
