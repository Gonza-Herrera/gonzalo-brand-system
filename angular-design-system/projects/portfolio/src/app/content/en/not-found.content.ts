import type { PortfolioPageContent } from '../models/page-content.model';
import { EN_PAGE_METADATA } from './page-metadata.content';

export const EN_NOT_FOUND_CONTENT = {
  ...EN_PAGE_METADATA['not-found'],
  eyebrow: '404',
  title: 'Page not found',
  description: 'The page you are looking for does not exist or may have moved.',
  stage: 'Use the link below to continue browsing the portfolio.',
  actionLabel: 'Back to home',
} as const satisfies PortfolioPageContent;
