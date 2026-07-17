export const PORTFOLIO_PAGE_IDS = [
  'home',
  'about',
  'experience',
  'projects',
  'content',
  'contact',
  'notFound',
] as const;

export type PortfolioPageId = (typeof PORTFOLIO_PAGE_IDS)[number];

export interface PortfolioPageContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}
