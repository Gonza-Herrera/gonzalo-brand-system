import { EN_PROJECTS_CONTENT } from './en/projects.content';
import { ES_PROJECTS_CONTENT } from './es/projects.content';
import type { PortfolioLocale } from './models/portfolio-locale.type';
import type { PortfolioProjectsContent } from './models/projects-content.model';

const PORTFOLIO_PROJECTS_CONTENT = {
  en: EN_PROJECTS_CONTENT,
  es: ES_PROJECTS_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioProjectsContent>>;

export function getPortfolioProjectsContent(locale: PortfolioLocale): PortfolioProjectsContent {
  return PORTFOLIO_PROJECTS_CONTENT[locale];
}
