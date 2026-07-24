import { EN_EXPERIENCE_CONTENT } from './en/experience.content';
import { ES_EXPERIENCE_CONTENT } from './es/experience.content';
import type { PortfolioExperienceContent } from './models/experience-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_EXPERIENCE_CONTENT = {
  en: EN_EXPERIENCE_CONTENT,
  es: ES_EXPERIENCE_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioExperienceContent>>;

export function getPortfolioExperienceContent(locale: PortfolioLocale): PortfolioExperienceContent {
  return PORTFOLIO_EXPERIENCE_CONTENT[locale];
}
